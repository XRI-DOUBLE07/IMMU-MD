const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

cmd({
    pattern: "video",
    alias: ["ytvideo", "mp4", "ytmp4"],
    desc: "Download YouTube videos",
    category: "download",
    react: "🌈",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) {
            return reply(`╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│❌ Please provide a video name or link
│📌 Example: .video Alan Walker Faded
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
        }

        await react("⏳");
        
        // Check if input is URL or search query
        let videoUrl, videoTitle, videoThumb;
        
        if (q.startsWith('http://') || q.startsWith('https://')) {
            videoUrl = q;
        } else {
            // Search YouTube
            const search = await yts(q);
            if (!search.videos || !search.videos.length) {
                await react("❌");
                return reply(`╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│❌ No videos found for "${q}"
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
            }
            
            const video = search.videos[0];
            videoUrl = video.url;
            videoTitle = video.title;
            videoThumb = video.thumbnail;
        }

        // Extract video ID from URL
        const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
        if (!videoIdMatch) {
            await react("❌");
            return reply("❌ Invalid YouTube link!");
        }
        
        const videoId = videoIdMatch[1];
        const thumbUrl = videoThumb || `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;

        // Send info message
        await conn.sendMessage(from, {
            image: { url: thumbUrl },
            caption: `╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│🎬 *${videoTitle || q}*
│⬇️ Downloading video...
│⏳ Please wait (may take 30s)
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`
        }, { quoted: mek });

        // Multiple API endpoints for reliability
        const apis = [
            `https://api.qasimdev.dpdns.org/api/loaderto/download?apiKey=qasim-dev&format=mp4&url=${videoUrl}`,
            `https://api.agatz.xyz/api/ytmp4?url=${videoUrl}`,
            `https://api.siputzx.my.id/api/d/ytmp4?url=${videoUrl}`
        ];

        let downloadUrl = null;
        let finalTitle = videoTitle || 'YouTube Video';

        for (const api of apis) {
            try {
                const { data } = await axios.get(api, { timeout: 30000 });
                
                if (api.includes('qasimdev')) {
                    if (data?.data?.downloadUrl) {
                        downloadUrl = data.data.downloadUrl;
                        finalTitle = data.data.title || finalTitle;
                        break;
                    }
                } else if (api.includes('agatz')) {
                    if (data?.data?.download?.url) {
                        downloadUrl = data.data.download.url;
                        finalTitle = data.data.data?.title || finalTitle;
                        break;
                    }
                } else if (api.includes('siputzx')) {
                    if (data?.data?.download?.url) {
                        downloadUrl = data.data.download.url;
                        finalTitle = data.data.metadata?.title || finalTitle;
                        break;
                    }
                }
            } catch (e) {
                console.log(`API ${api} failed, trying next...`);
            }
        }

        if (!downloadUrl) {
            await react("❌");
            return reply(`╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│❌ Download failed!
│⏳ Please try again later
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
        }

        // Send video
        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            mimetype: 'video/mp4',
            fileName: `${finalTitle}.mp4`,
            caption: `╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│✅ *Download Complete!*
│🎬 ${finalTitle}
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`
        }, { quoted: mek });

        await react("✅");

    } catch (e) {
        console.error("Video plugin error:", e);
        await react("❌");
        reply(`╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣
│❌ Error: ${e.message}
╰━━━━━━━━━━━━━━━━━━━━⬣

> 📌𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ`);
    }
});
