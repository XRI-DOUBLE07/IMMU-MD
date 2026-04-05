const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "playstore",
    desc: "Search apps from PlayStore",
    category: "search",
    react: "📱",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) {
            return reply("❌ *App name likho*\n\nExample:\n.playstore whatsapp");
        }

        // 🔎 API (same – no change)
        const api = `https://api.princetechn.com/api/search/playstore?apikey=prince&query=${q}`;
        const res = await axios.get(api);
        const data = res.data.results;

        if (!data || data.length === 0) {
            return reply("❌ *Koi app nahi mila*");
        }

        const app = data[0];

        // 🎨 FAIZAN-MD STYLE (ONLY STYLE CHANGED)
        const msg = `*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣̣*
*│☢︎︎ 📱 ᴀᴘᴘ ɴᴀᴍᴇ:* ${app.name}
*│☢︎︎ 👨‍💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ:* ${app.developer}
*│☢︎︎ ⭐ ʀᴀᴛɪɴɢ:* ${app.rating}
*│☢︎︎ 📥 ɪɴsᴛᴀʟʟ:* ${app.installs}
*│☢︎︎ 💰 ᴘʀɪᴄᴇ:* ${app.price}
*│☢︎︎ 📝 ᴀʙᴏᴜᴛ:* ${app.summary}
*│☢︎︎ 🔗 ʟɪɴᴋ:* ${app.link}
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`;

        await conn.sendMessage(from, {
            image: { url: app.img },
            caption: msg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ PlayStore search error, please try again later");
    }
});
