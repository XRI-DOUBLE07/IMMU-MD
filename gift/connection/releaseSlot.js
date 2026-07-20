// Releases this slot back into the pair-site pool.
//
// Clearing SESSION_ID makes the slot look free to the pair site again.
// Heroku restarts the dyno automatically on a config-var change, and the
// bot then sits waiting for a new pairing instead of holding the slot.
//
// Needs two config vars on the slot:
//   HEROKU_API_KEY  — to edit its own config vars
//   APP_NAME        — this slot's Heroku app name (e.g. v2-immumd-slot7)

const axios = require("axios");

const HEROKU_API_KEY = process.env.HEROKU_API_KEY;
const APP_NAME = process.env.APP_NAME || process.env.HEROKU_APP_NAME;

let released = false;

async function releaseSlot(reason) {
    if (released) return true;            // never release twice
    if (!HEROKU_API_KEY || !APP_NAME) {
        console.log("[SLOT] release skipped — HEROKU_API_KEY or APP_NAME not set");
        return false;
    }

    try {
        // Setting a var to null removes it, so SESSION_ID becomes absent
        // and the pair site counts this slot as free.
        await axios.patch(
            `https://api.heroku.com/apps/${APP_NAME}/config-vars`,
            { SESSION_ID: null, DEPLOYED_NUMBER: null },
            {
                headers: {
                    Authorization: `Bearer ${HEROKU_API_KEY}`,
                    Accept: "application/vnd.heroku+json; version=3",
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            },
        );
        released = true;
        console.log(`[SLOT] ${APP_NAME} released (${reason}) — free for the next user`);
        return true;
    } catch (err) {
        const detail = err.response?.data?.message || err.message;
        console.log(`[SLOT] release failed: ${detail}`);
        return false;
    }
}

module.exports = { releaseSlot };
