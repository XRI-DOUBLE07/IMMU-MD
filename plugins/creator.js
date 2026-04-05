const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "creator",
    alias: ["coder", "dev", "owner"],
    desc: "Show bot creator information",
    category: "info",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {

        const ownerInfo = {
            name: " 𝐈ᴍAD Ali",
            number: "+923493114170",
            photo: "https://i.postimg.cc/MTyQYsmm/Picsart-26-04-05-20-38-22-130.png",
            bio: "Developer of  𝐈ᴍᴍυ Mᴅ"
        };

        const caption = `
*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣*
*│♲︎︎︎ 👑 ᴄʀᴇᴀᴛᴇʀ:* ${ownerInfo.name}
*│♲︎︎︎ 📞 ɴᴜᴍʙᴇʀ:* ${ownerInfo.number}
*│♲︎︎︎ 📝 ʙɪᴏ:* ${ownerInfo.bio}
*│*
*│♲︎︎︎ 🤖 ʙᴏᴛ:* ${config.BOT_NAME}
*│♲︎︎︎ ⚡ ᴠᴇʀsɪᴏɴ:* ${config.VERSION || "5.0.0"}
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ
`;

        await conn.sendMessage(from, {
            image: { url: ownerInfo.photo },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363341506278064@newsletter',
                    newsletterName: '𝐈ᴍᴍυ Mᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("CREATOR ERROR:", err);
        reply(
`*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣*
*│❌ ᴄʀᴇᴀᴛᴏʀ ᴄᴏᴍᴍᴀɴᴅ ᴇʀʀᴏʀ*
*│⏳ Please try again later*
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ`
        ); 
    }
});
