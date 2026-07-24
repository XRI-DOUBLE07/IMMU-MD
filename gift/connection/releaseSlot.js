// releaseSlot.js — free this bot's resources when the user logs out.
//
// Each bot is its own PM2 process in /root/bots/live/<number>. A WhatsApp
// logout kills the session for good, so the bot removes its own folder and
// PM2 entry instead of restarting into a crash loop.
//
// The cleanup runs under setsid so it is reparented to init: PM2 kills the
// bot's whole child tree, and a plain detached child would die with it.
// The folder is removed BEFORE the PM2 delete for the same reason.

const path = require("path");
const { spawn } = require("child_process");

// this file sits at gift/connection/ — the bot folder is two levels up
const BOT_DIR = path.resolve(__dirname, "..", "..");
const LIVE_ROOT = process.env.BOTS_DIR || "/root/bots/live";
const LOG = "/root/bots/cleanup.log";

const NUMBER =
    (process.env.BOT_NUMBER || "").replace(/[^0-9]/g, "") ||
    path.basename(BOT_DIR).replace(/[^0-9]/g, "") ||
    (process.env.OWNER_NUMBER || "").replace(/[^0-9]/g, "");

// Guard: only ever delete a folder that really sits under the live root.
const canDeleteDir =
    BOT_DIR.startsWith(LIVE_ROOT + "/") && BOT_DIR.length > LIVE_ROOT.length + 1;

let done = false;

async function releaseSlot(reason) {
    if (done) return true;
    done = true;

    if (!NUMBER) {
        console.log("[SLOT] cleanup skipped — could not work out this bot's number");
        return false;
    }

    const pmName = `bot-${NUMBER}`;
    console.log(`[SLOT] ${pmName} released (${reason}) — removing process and files`);

    const steps = [
        `sleep 3`,
        `echo "$(date) cleanup start ${pmName} (${reason})" >> ${LOG}`,
        canDeleteDir ? `rm -rf ${BOT_DIR} && echo "$(date) folder removed" >> ${LOG}` : `true`,
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

    return true;
}

// Kept so the Heroku build of connectionHandler still loads cleanly.
async function sleepSlot() {
    return true;
}

module.exports = { releaseSlot, sleepSlot };
