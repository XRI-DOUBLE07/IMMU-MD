const { cmd } = require("../command");
const os = require("os");

cmd({
    pattern: "Immu",
    alias: ["immu"],
    desc: "Immu full introduction",
    category: "info",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {

        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const min = Math.floor((uptime % 3600) / 60);
        const sec = Math.floor(uptime % 60);

        const text = `
╭━〔 🌐 𝐈ᴍᴍυ 𝐈ɴғᴏ 〕━⬣
│♲︎︎︎ 👤 *Name:* ɪᴍᴀᴅ ᴀʟɪ
│♲︎︎︎ 🧑‍💼 *Nick:* 𝐈ᴍᴍυ
│♲︎︎︎ 🎂 *Age:* 20
│♲︎︎︎ 🧬 *Caste:* ᴘᴀᴛʜᴀᴀɴ 
│♲︎︎︎ 🌍 *Country:* ᴘᴀᴋɪsᴛᴀɴ
│♲︎︎︎ 🏙️ *City:* ᴅɢᴋ > ᴜᴘᴘᴇʀ ᴅɪʀ
│
│♲︎︎︎ 🤖 *Bot Name:*  𝐈ᴍᴍυ Mᴅ
│♲︎︎︎ 👑 *Owner:* ɪᴍᴀᴅ ᴀʟɪ
│♲︎︎︎ 📞 *Owner No:* +923493114170
│♲︎︎︎ 🔣 *Prefix:* .
│♲︎︎︎ ⚙️ *Mode:* ᴘᴜʙʟɪᴄ
│♲︎︎︎ 🔌 *Baileys:* ᴍᴜʟᴛɪ ᴅᴀᴠɪᴄᴇ
│
│♲︎︎︎ ⏳ *Uptime:* ${h}h ${min}m ${sec}s
│♲︎︎︎ 💻 *Platform:* ${os.platform()}
╰━━━━━━━━━━━━━━━━━━━━━━⬣

>  ᴘᴏᴡᴇʀ ʙʏ  𝐈ᴍᴍυ Mᴅ*
`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
    }
});
