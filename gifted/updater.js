const { gmd, copyFolderSync } = require("../gift");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

gmd(
    {
        pattern: "update",
        alias: ["updatenow", "updt", "sync", "update now"],
        react: "🆕",
        desc: "Update the bot to the latest version.",
        category: "owner",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        const {
            q,
            mek,
            react,
            reply,
            isSuperUser,
            setCommitHash,
            getCommitHash,
            giftedRepo,
        } = conText;

        if (!isSuperUser) {
            await react("❌");
            return reply("❌ Owner Only Command!");
        }

        let zipPath, extractPath;

        // Source repo — used internally only, never shown to user / logs
        const REAL_REPO = "XRI-DOUBLE07/IMMU-MD";
        const BRANCH = "main";

        try {
            await reply("🔍 Checking for updates...");

            // 1) Get latest commit hash (silent)
            const { data: commitData } = await axios.get(
                `https://api.github.com/repos/${REAL_REPO}/commits/${BRANCH}`,
            );
            const latestCommitHash = commitData.sha;
            const currentHash = await getCommitHash();

            if (latestCommitHash === currentHash) {
                return reply("✅ Bot is already on the latest version!");
            }

            // No commit author / repo details shown — just a clean status
            await reply("🔄 Updating...");

            // 2) Download repo zip (silent)
            zipPath = path.join(__dirname, "..", "update-latest.zip");
            const { data: zipData } = await axios.get(
                `https://github.com/${REAL_REPO}/archive/${BRANCH}.zip`,
                { responseType: "arraybuffer" },
            );
            fs.writeFileSync(zipPath, zipData);

            // 3) Extract
            extractPath = path.join(__dirname, "..", "latest");
            const zip = new AdmZip(zipPath);
            zip.extractAllTo(extractPath, true);

            // 4) Auto-detect extracted folder (casing-safe)
            const entries = fs
                .readdirSync(extractPath, { withFileTypes: true })
                .filter((e) => e.isDirectory())
                .map((e) => e.name);

            if (entries.length === 0) {
                throw new Error("update package invalid");
            }
            const sourcePath = path.join(extractPath, entries[0]);
            const destinationPath = path.join(__dirname, "..");

            // 5) Preserve user data (never overwrite)
            const excludeList = [
                ".env",
                "gift/database/database.db",
                "gift/session/session.db",
            ];

            // 6) Apply update
            copyFolderSync(sourcePath, destinationPath, excludeList);
            await setCommitHash(latestCommitHash);

            // 7) Cleanup
            if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
            if (fs.existsSync(extractPath))
                fs.rmSync(extractPath, { recursive: true, force: true });

            await reply("✅ Update Complete! Bot is restarting...");

            setTimeout(() => {
                process.exit(0);
            }, 2000);
        } catch (error) {
            // Log only a generic message — no repo details leaked
            console.error("Update error:", error.message);

            try {
                if (zipPath && fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
                if (extractPath && fs.existsSync(extractPath))
                    fs.rmSync(extractPath, { recursive: true, force: true });
            } catch (_) {}

            return reply("❌ Update failed. Please try again later.");
        }
    },
);
