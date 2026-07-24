// releaseSlot.js — frees this bot's slot when the user logs out.
//
// The same file runs in two places, so it works out where it is:
//
//   Heroku — HEROKU_API_KEY + APP_NAME are set as config vars.
//            Clearing SESSION_ID hands the slot back to the pair site's
//            pool; Heroku restarts the dyno by itself on a config change.
//
//   VPS    — the bot lives in /root/bots/live/<number> under PM2.
//            The folder and the PM2 entry are removed so the RAM is freed.
//
// If neither applies the caller falls back to process.exit(1), which is
// what the bot did before any of this existed.

const path = require("path");
const { spawn } = require("child_process");
const axios = require("axios");

const HEROKU_API_KEY = process.env.HEROKU_API_KEY;
const APP_NAME = process.env.APP_NAME || process.env.HEROKU_APP_NAME;

// this file sits at gift/connection/ — the bot folder is two levels up
const BOT_DIR = path.resolve(__dirname, "..", "..");
const LIVE_ROOT = process.env.BOTS_DIR || "/root/bots/live";
const LOG = "/root/bots/cleanup.log";

const NUMBER =
    (process.env.BOT_NUMBER || "").replace(/[^0-9]/g, "") ||
    path.basename(BOT_DIR).replace(/[^0-9]/g, "") ||
    (process.env.OWNER_NUMBER || "").replace(/[^0-9]/g, "");

const onHeroku = Boolean(HEROKU_API_KEY && APP_NAME);
// Guard: only ever delete a folder that really sits under the live root.
const onVps =
    BOT_DIR.startsWith(LIVE_ROOT + "/") && BOT_DIR.length > LIVE_ROOT.length + 1;

let done = false;

// ── Heroku: clear the session so the slot returns to the pool ──
async function releaseOnHeroku(reason) {
    try {
        await axios.patch(
            `https://api.heroku.com/apps/${APP_NAME}/config-vars`,
            { SESSION_ID: null, DEPLOYED_NUMBER: null, SLOT_CLAIM: null },
            {
                headers: {
                    Authorization: `Bearer ${HEROKU_API_KEY}`,
                    Accept: "application/vnd.heroku+json; version=3",
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            },
        );
        console.log(`[SLOT] ${APP_NAME} session cleared (${reason}) — slot is free`);
        return true;
    } catch (err) {
        const detail = err.response?.data?.message || err.message;
        console.log(`[SLOT] Heroku release failed: ${detail}`);
        return false;
    }
}

// ── VPS: drop the folder and the PM2 entry ──
// Runs under setsid so it is reparented to init. PM2 kills the bot's whole
// child tree, and a plain detached child would die along with it. The folder
// is removed before the PM2 delete for the same reason.
function releaseOnVps(reason) {
    const pmName = `bot-${NUMBER}`;
    const steps = [
        `sleep 3`,
        `echo "$(date) cleanup start ${pmName} (${reason})" >> ${LOG}`,
        `rm -rf ${BOT_DIR} && echo "$(date) folder removed" >> ${LOG}`,
        `pm2 delete ${pmName} >/dev/null 2>&1`,
        `sleep 2`,
        `pm2 save >/dev/null 2>&1`,
        `echo "$(date) cleanup done ${pmName}" >> ${LOG}`,
    ].join("; ");

    const child = spawn("setsid", ["sh", "-c", steps], {
        detached: true,
        stdio: "ignore",
        cwd: "/",
    });
    child.unref();

    console.log(`[SLOT] ${pmName} released (${reason}) — removing process and files`);
    return true;
}

async function releaseSlot(reason) {
    if (done) return true;
    done = true;

    if (onHeroku) return releaseOnHeroku(reason);

    if (onVps) {
        if (!NUMBER) {
            console.log("[SLOT] cleanup skipped — could not work out this bot's number");
            return false;
        }
        return releaseOnVps(reason);
    }

    console.log("[SLOT] no release method for this environment — leaving it to the caller");
    return false;
}

// Only meaningful on Heroku, where a slot can sit at 0 dynos.
async function sleepSlot() {
    if (!onHeroku) return true;
    try {
        await axios.patch(
            `https://api.heroku.com/apps/${APP_NAME}/formation/web`,
            { quantity: 0 },
            {
                headers: {
                    Authorization: `Bearer ${HEROKU_API_KEY}`,
                    Accept: "application/vnd.heroku+json; version=3",
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            },
        );
        console.log(`[SLOT] ${APP_NAME} dyno stopped`);
        return true;
    } catch (err) {
        const detail = err.response?.data?.message || err.message;
        console.log(`[SLOT] could not stop dyno: ${detail}`);
        return false;
    }
}

module.exports = { releaseSlot, sleepSlot };
