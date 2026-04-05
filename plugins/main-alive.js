const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "🧞",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {

        const aliveMsg = `
•───✦❪ 𝐈ᴍᴍυ Mᴅ𝐒𝐓𝐀𝐓𝐔𝐒 ❫ ✦───•

👋 @${m.sender.split('@')[0]} *🦋*

*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 𝐈ᴍᴍυ Mᴅ ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 🤖 𝐒𝐭𝐚𝐭𝐮𝐬:* Online
*│❀ 💻 𝐇𝐨𝐬𝐭:* Heroku
*│❀ 💾 𝐑𝐀𝐌:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
*│❀ ⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞:* ${runtime(process.uptime())}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ Mᴅ
`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption: aliveMsg,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363341506278064@newsletter',
                    newsletterName: '𝐈ᴍᴍυ 𝐌ᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("ALIVE ERROR:", err);

        const errorMsg = `
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│❌ 𝐀𝐥𝐢𝐯𝐞 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐄𝐫𝐫𝐨𝐫*
*│⏳ Please try again later*
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`;

        await reply(errorMsg);
    }
});
