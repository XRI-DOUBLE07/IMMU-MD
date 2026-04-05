const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

// Safe fetch for all Node versions
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about bot GitHub repository",
    react: "🩷",
    category: "info",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {

    const githubRepoURL = 'https://github.com/XRI-DOUBLE07/IMMU-MD';

    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return reply("❌ Invalid GitHub repository URL");

        const username = match[1];
        const repoName = match[2];

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

        const repoData = await response.json();

        const caption = `
❛ ━━━━･🍁❪ 𝐈ᴍᴍυ 𝐌𝐃 𝐆𝐈𝐓 ❫🍁･━━━━ ❜

🍁 𝐁𝐨𝐭   : ${repoData.name}
👑 𝐎𝐰𝐧𝐞𝐫 : ${repoData.owner.login}
⭐ 𝐒𝐭𝐚𝐫𝐬  : ${repoData.stargazers_count}
🍴 𝐅𝐨𝐫𝐤𝐬  : ${repoData.forks_count}

🔗 𝐆𝐢𝐭𝐡𝐮𝐛 𝐔𝐫𝐥 :
${repoData.html_url}

╭━━━〔 📞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 〕━━━╮
👨🏻‍💻𝐃𝐞𝐯 : https://wa.me/message/SEJ7BM7MWCRBC1
╰━━━━━━━━━━━━━━━━━╯

╭━〔 📢 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 〕━╮
https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42
╰━━━━━━━━━━━━━━━━━━━╯

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`;

        await conn.sendMessage(from, {
            image: { url: 'https://i.postimg.cc/MTyQYsmm/Picsart-26-04-05-20-38-22-130.png' },
            caption,
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

        // Optional voice
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: mek });
        }

    } catch (err) {
        console.error("REPO ERROR:", err);
        reply(`
╔═══════════╗
║🍁 𝐈ᴍᴍυ 𝐌𝐃 𝐆𝐈𝐓 🍁║
╠═══════════╣
║ ❎ 𝐑𝐞𝐩𝐨 𝐅𝐞𝐭𝐜𝐡 𝐅𝐚𝐢𝐥𝐞𝐝 
║ ⏳ 𝐓𝐫𝐲 𝐀𝐠𝐚𝐢𝐧 𝐋𝐚𝐭𝐞r   
╚═══════════╝

`);
    }
});
