const axios = require("axios");
const { cmd } = require("../command");

cmd(
{
pattern: "movie",
alias: ["moviedl","film"],
react: "🎬",
desc: "Download movie from IMMU API",
category: "downloader",
use: ".movie avatar",
filename: __filename
},
async (conn, mek, m, { args, reply }) => {

const query = args.join(" ");
if (!query) {
return reply(`
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ ❌ ᴇɴᴛᴇʀ ᴍᴏᴠᴇ ɴᴀᴍᴇ!
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
}

try {

await reply(`
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ 🎬 𝐒𝐞𝐚𝐫𝐜𝐡𝐢𝐧𝐠 𝐌𝐨𝐯𝐢𝐞...
│ ⏳ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭...
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);

const api = `https://arslan-apis.vercel.app/movie/moviesdl?q=${encodeURIComponent(query)}`;
const { data } = await axios.get(api);

if (!data.status) {
return reply(`
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ ❌ 𝐌𝐨𝐯𝐢𝐞 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝!
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
}

const movie = data.result;

// If download link NOT available
if (!movie.download) {

await conn.sendMessage(m.chat,{
image: { url: movie.image },
caption: `
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ 🎬 𝐌𝐎𝐕𝐈𝐄 𝐃𝐄𝐓𝐀𝐈𝐋𝐒
│
│ 🎞 Title: ${movie.title}
│ ⭐ IMDB: ${movie.imdb}
│ ⏱ Runtime: ${movie.runtime}
│ 📅 Release: ${movie.date}
│ 🎥 Quality: ${movie.quality}
╰━━━━━━━━━━━━━━━━━━━━⬣

⚠️ 𝐃𝐢𝐫𝐞𝐜𝐭 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐋𝐢𝐧𝐤 𝐍𝐨𝐭 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`
},{quoted:m});

return;
}

// If download link exists
await conn.sendMessage(m.chat,{
document: { url: movie.download },
mimetype: "video/mp4",
fileName: `${movie.title}.mkv`,
caption: `
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ 🎬 𝐌𝐎𝐕𝐈𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃
│
│ 🎞 ${movie.title}
│ ⭐ IMDB: ${movie.imdb}
│ ⏱ ${movie.runtime}
│ 📅 ${movie.date}
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`
},{quoted:m});

} catch (e) {

console.log(e);

reply(`
╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│ ❌ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐄𝐫𝐫𝐨𝐫!
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
}
});
