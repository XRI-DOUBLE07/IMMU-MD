const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
    pattern: "play3",
    react: "🎶",
    desc: "Play song (stable)",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Song name do\nExample: .play3 jane tu");

        await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

        const search = await yts(q);
        if (!search.videos.length) {
            return reply("❌ No song found");
        }

        const video = search.videos[0];

        // ❌ stream removed
        const apiUrl = `http://31.220.82.203:2029/api/yta?url=${encodeURIComponent(video.url)}`;

        const res = await axios.get(apiUrl, {
            responseType: "arraybuffer",
            timeout: 60000
        });

        const caption = `
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│🎶 ${video.title}
*│⏱️ ${video.timestamp}
*╰━━━━━━━━━━━━━━━━━━━━⬣*
`;

        await conn.sendMessage(from, {
            audio: Buffer.from(res.data),
            mimetype: "audio/mp4",
            ptt: false,
            caption
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (err) {
        console.error("PLAY3 ERROR:", err?.message || err);
        reply("❌ Play3 failed (API / network issue)");
    }
});
