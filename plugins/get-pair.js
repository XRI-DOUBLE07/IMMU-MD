const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair"],
    react: "🔑",
    desc: "Generate Pair Code",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { reply, q, senderNumber }) => {

    try {

        const phone = q
            ? q.replace(/[^0-9]/g, '')
            : senderNumber.replace(/[^0-9]/g, '');

        if (!phone || phone.length < 10) {
            return reply("❌ Enter valid number\nExample: .pair 923xxxxxxxxx");
        }

        const url = `https://mafiamdpair-6b21b2f6849b.herokuapp.com⁠/pair?number=${phone}`;
        const res = await axios.get(url, { timeout: 20000 });

        if (!res.data || !res.data.success || !res.data.code) {
            return reply("❌ Pairing Failed. Try again later.");
        }

        const code = res.data.code;

        // 🔥 1️⃣ Styled Box Message
        await reply(`
╭━〔 🌐  𝐈ᴍᴍυ Mᴅ〕━⬣
│🔑 ᴘᴀɪʀ ᴄᴏᴅᴇ
│
│  ${code}
│
│📲 Enter in WhatsApp
╰━━━━━━━━━━━━━━━━━━━━⬣

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ
`);

        // 🔥 2️⃣ Plain Copy Version (After 2 Seconds)
        setTimeout(async () => {
            await reply(code);
        }, 2000);

    } catch (err) {

        console.log("PAIR ERROR:", err.message);
        reply("❌ Pairing Service Error.");
    }

});
