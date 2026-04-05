const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "👑", 
    desc: "Get bot owner contact",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME || "_ 𝐈ᴍᴍυ Mᴅ_";

        // vCard
        const vcard = 
`BEGIN:VCARD
VERSION:2.0
FN:${ownerName}
ORG: 𝐈ᴍᴍυ Mᴅ;
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

        // Styled caption message
        const caption = `
*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣̣*
*│👑 𝐎𝐖𝐍𝐄𝐑 𝐂𝐎𝐍𝐓𝐀𝐂𝐓*
*│*
*│📛 ɴᴀᴍᴇ:* ${ownerName}
*│📞 ɴᴜᴍʙᴇʀ:* ${ownerNumber}
*│💬 Tap contact to chat*
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ
`;

        // Send styled text
        await conn.sendMessage(from, {
            text: caption
        }, { quoted: mek });

        // Send contact card (ONLY contact, no extra data)
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("OWNER CMD ERROR:", error);
        await conn.sendMessage(from, {
            text: "❌ Owner command error, please try again later."
        }, { quoted: mek });
    }
});
