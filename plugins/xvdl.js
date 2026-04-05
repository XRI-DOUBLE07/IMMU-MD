import { xvideosSearch, xvideosdl } from '../lib/scraper.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  // NSFW Check
  let chat = global.db.data.chats[m.chat];
  if (!chat.nsfw) throw `🚫 *𝐈ᴍᴍυ MD: NSFW Disabled*\n\nYeh group NSFW content support nahi karta. Enable karne ke liye type karein: *${usedPrefix}enable* nsfw`;

  // Age Check
  let userAge = global.db.data.users[m.sender].age;
  if (userAge < 18) throw `❎ Aapki umar 18 saal se kam hai. Yeh feature aapke liye nahi hai.`;

  // Input Check
  if (!text) throw `✳️ Aap kya search karna chahte hain?\n📌 *Usage:* ${usedPrefix + command} <query/link>\n\n*Example:* ${usedPrefix + command} hot video`;

  await m.react('⌛');

  try {
    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);

    if (isURL) {
      // Direct Link Download Logic
      const res = await xvideosdl(text);
      const { title, url, views, duration } = res.result;

      let caption = `🎬 *𝐈ᴍᴍυ MD DOWNLOADER*\n\n📌 *Title:* ${title}\n👁️ *Views:* ${views}\n\n_Video send ho rahi hai, baraye meherbani intezar karein..._`;
      
      // Sending video buffer directly
      const response = await fetch(url);
      const buffer = Buffer.from(await response.arrayBuffer());

      await conn.sendFile(m.chat, buffer, `${title}.mp4`, caption, m);
      await m.react('✅');

    } else {
      // Search Logic
      const results = await xvideosSearch(text);
      if (results.length === 0) return m.reply('❌ Koi results nahi mile.');

      let searchResults = results.map((v, i) => {
        return `*${i + 1}.* ${v.title}\n⏱️ *Duration:* ${v.duration}\n🔗 *Link:* ${v.url}`
      }).join('\n\n---\n\n');

      let mainCaption = `✨ *𝐈ᴍᴍυ MD SEARCH RESULTS* ✨\n\nQuery: _"${text}"_\n\n${searchResults}\n\n📌 *Note:* Video download karne ke liye link copy karke *${usedPrefix + command} <link>* bhejien.`;
      
      m.reply(mainCaption);
      await m.react('🔍');
    }
  } catch (error) {
    console.error(error);
    throw `❌ *𝐈ᴍᴍυ MD Error:* Video fetch karne mein masla hua.`;
  }
};

handler.help = ['xvid <query>'];
handler.tags = ['nsfw'];
handler.command = ['xvid', 'xvideo'];
handler.group = true;
handler.register = true;

export default handler;
    
