const NodeCache = require("node-cache");

const groupCache = new NodeCache({
    stdTTL: 10 * 60,
    useClones: false,
    checkperiod: 60,
});

// Every group used to be cached with the same 5 minute TTL, and they were all
// written at the same moment during startup — so on a big account they all
// expired together and the next message in each group fired a fresh
// groupMetadata call at once. A jittered TTL spreads those refreshes out.
const GROUP_TTL_BASE = 10 * 60;
const GROUP_TTL_JITTER = 5 * 60;
const jitteredTtl = () =>
    GROUP_TTL_BASE + Math.floor(Math.random() * GROUP_TTL_JITTER);

// Groups the server refuses to describe (kicked, deleted, no permission).
// Without this every incoming message retried the same failing lookup.
const failedGroups = new NodeCache({ stdTTL: 5 * 60, checkperiod: 120 });

// One shared metadata request per group, and at most a few in flight at once.
// getGroupMetadata is called up to six times for a single group message
// (antilink, antibad, antigroupmention, the command handler and more), so a
// cache miss used to fan out into six identical requests to WhatsApp.
const inFlight = new Map();
const MAX_CONCURRENT_FETCHES = 3;
let activeFetches = 0;
const fetchQueue = [];

const acquireSlot = () =>
    new Promise((resolve) => {
        if (activeFetches < MAX_CONCURRENT_FETCHES) {
            activeFetches++;
            return resolve();
        }
        fetchQueue.push(resolve);
    });

const releaseSlot = () => {
    const next = fetchQueue.shift();
    if (next) next();
    else activeFetches--;
};

const lidToJidStore = new NodeCache({
    stdTTL: 24 * 60 * 60,
    useClones: false,
    checkperiod: 300,
});

const storeLidMapping = (lid, jid) => {
    if (lid && jid && lid.endsWith("@lid") && jid.endsWith("@s.whatsapp.net")) {
        lidToJidStore.set(lid, jid);
    }
};

const getLidMapping = (lid) => {
    return lidToJidStore.get(lid);
};

const updateLidMappingsFromMetadata = (metadata) => {
    if (!metadata?.participants) return;
    for (const p of metadata.participants) {
        const lid = p.lid || p.id;
        const jid = p.pn || p.jid;
        if (lid && jid) {
            storeLidMapping(lid, jid);
        }
    }
};

const isExpectedError = (errorMsg) => {
    const expectedErrors = [
        "forbidden",
        "item-not-found",
        "not-authorized",
        "gone",
    ];
    return expectedErrors.some((e) => errorMsg?.toLowerCase().includes(e));
};

const getGroupMetadata = async (Gifted, jid) => {
    if (!jid || !jid.endsWith("@g.us")) return null;

    const cached = groupCache.get(jid);
    if (cached) {
        updateLidMappingsFromMetadata(cached);
        return cached;
    }

    if (failedGroups.get(jid)) return null;

    // Another caller is already fetching this group — wait on their request
    // instead of opening a second one.
    const pending = inFlight.get(jid);
    if (pending) return pending;

    const request = (async () => {
        await acquireSlot();
        try {
            const fresh = groupCache.get(jid);
            if (fresh) {
                updateLidMappingsFromMetadata(fresh);
                return fresh;
            }
            const metadata = await Gifted.groupMetadata(jid);
            if (metadata) {
                groupCache.set(jid, metadata, jitteredTtl());
                updateLidMappingsFromMetadata(metadata);
            }
            return metadata;
        } catch (error) {
            failedGroups.set(jid, true);
            if (!isExpectedError(error.message)) {
                console.error(
                    `Failed to get group metadata for ${jid}:`,
                    error.message,
                );
            }
            return null;
        } finally {
            releaseSlot();
            inFlight.delete(jid);
        }
    })();

    inFlight.set(jid, request);
    return request;
};

const updateGroupCache = (jid, metadata) => {
    if (jid && metadata) {
        groupCache.set(jid, metadata, jitteredTtl());
        failedGroups.del(jid);
        updateLidMappingsFromMetadata(metadata);
    }
};

const deleteGroupCache = (jid) => {
    groupCache.del(jid);
};

const clearGroupCache = () => {
    groupCache.flushAll();
};

// Matches a participant entry against a jid in any of the forms WhatsApp
// uses for the same person (phone jid, lid, or the plain id).
const isSameParticipant = (participant, jid) =>
    participant?.id === jid ||
    participant?.pn === jid ||
    participant?.lid === jid ||
    participant?.phoneNumber === jid;

const setupGroupCacheListeners = (Gifted) => {
    // Both handlers used to call groupMetadata() on every event. On an account
    // with a lot of groups these events arrive constantly, so the bot flooded
    // WhatsApp with requests and got rate limited into a disconnect loop.
    // The events already carry everything needed to patch the cached copy, so
    // no network call is made here at all — a stale entry simply expires and
    // is refetched lazily by getGroupMetadata.
    Gifted.ev.on("groups.update", (updates) => {
        // This used to destructure as ([event]), silently discarding every
        // update after the first one in the batch.
        const list = Array.isArray(updates) ? updates : [updates];
        for (const event of list) {
            try {
                if (!event?.id) continue;
                const cached = groupCache.get(event.id);
                if (!cached) continue;
                Object.assign(cached, event);
                updateGroupCache(event.id, cached);
            } catch (error) {
                deleteGroupCache(event?.id);
                if (!isExpectedError(error.message)) {
                    console.error("Group cache update failed:", error.message);
                }
            }
        }
    });

    Gifted.ev.on("group-participants.update", (event) => {
        try {
            if (!event?.id) return;
            const cached = groupCache.get(event.id);
            // Nothing cached yet: leave it. The next message in this group
            // fetches it once, through the deduplicated path.
            if (!cached?.participants) return;

            const changed = event.participants || [];
            const action = event.action;

            if (action === "add") {
                for (const jid of changed) {
                    if (!cached.participants.some((p) => isSameParticipant(p, jid))) {
                        cached.participants.push({ id: jid, admin: null });
                    }
                }
            } else if (action === "remove") {
                cached.participants = cached.participants.filter(
                    (p) => !changed.some((jid) => isSameParticipant(p, jid)),
                );
            } else if (action === "promote" || action === "demote") {
                const rank = action === "promote" ? "admin" : null;
                for (const p of cached.participants) {
                    if (changed.some((jid) => isSameParticipant(p, jid))) {
                        p.admin = rank;
                    }
                }
            } else {
                // Unknown action — drop the entry so it is refetched lazily
                // rather than serving something wrong.
                deleteGroupCache(event.id);
                return;
            }

            updateGroupCache(event.id, cached);
        } catch (error) {
            deleteGroupCache(event?.id);
            if (!isExpectedError(error.message)) {
                console.error("Participant cache update failed:", error.message);
            }
        }
    });
};

const cachedGroupMetadata = async (jid) => {
    return groupCache.get(jid);
};

const initializeLidStore = async (Gifted) => {
    try {
        const groups = await Gifted.groupFetchAllParticipating();
        if (groups) {
            const jids = Object.keys(groups);
            for (let i = 0; i < jids.length; i++) {
                const meta = groups[jids[i]];
                if (meta?.participants) {
                    updateLidMappingsFromMetadata(meta);
                    groupCache.set(jids[i], meta, jitteredTtl());
                }
                // Yield every 50 groups so an account with hundreds of them
                // does not block the event loop while this runs.
                if (i % 50 === 49) await new Promise((r) => setImmediate(r));
            }
            console.log(
                `✅ LID store initialized => ${lidToJidStore.keys().length} Mappings from ${Object.keys(groups).length} Groups`,
            );
        }
    } catch (error) {
        console.error("Failed to initialize LID store:", error.message);
    }
};

module.exports = {
    groupCache,
    getGroupMetadata,
    updateGroupCache,
    deleteGroupCache,
    clearGroupCache,
    setupGroupCacheListeners,
    cachedGroupMetadata,
    getLidMapping,
    storeLidMapping,
    updateLidMappingsFromMetadata,
    initializeLidStore,
};
