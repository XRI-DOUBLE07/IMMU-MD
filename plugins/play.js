const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')

cmd({
    pattern: "play",
    alias: ["psong", "playsong", "song"],
    desc: "Download YouTube Song (Auto Quality)",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, reply, text }) => {

    try {

        if (!text) {
            return reply("❌ Song name likho\nExample:\n.play perfect")
        }

        const search = await yts(text)

        if (!search.videos || !search.videos.length) {
            return reply("❌ Song nahi mila")
        }

        const vid = search.videos[0]

        // 🎯 AUTO QUALITY LOGIC
        let quality = "128kbps"
        if (vid.seconds && vid.seconds <= 240) {
            quality = "320kbps"
        }

        const caption = `
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│☢︎︎ 🎵 ᴛɪᴛʟᴇ:* ${vid.title}
*│☢︎︎ ⏱ ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
*│☢︎︎ 📀 ǫᴜᴀɪʟᴛʏ:* ${quality}
*│☢︎︎ 📁 ғᴏʀᴍᴀᴛ:* mp3
*│☢︎︎ ⚙️ sᴛᴀᴛᴜs:* Auto Quality Enabled...
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption
        }, { quoted: mek })

        const api = `https://api.qasimdev.dpdns.org/api/loaderto/download?apiKey=qasim-dev&format=mp3&url=${encodeURIComponent(vid.url)}`
        const { data } = await axios.get(api, { timeout: 60000 })

        if (!data?.success || !data?.data?.downloadUrl) {
            return reply("❌ Download error, thori dair baad try karo")
        }

        const result = data.data

        await conn.sendMessage(from, {
            audio: { url: result.downloadUrl },
            mimetype: "audio/mpeg",
            fileName: `${result.title || vid.title}.mp3`,
            ptt: false
        }, { quoted: mek })

    } catch (err) {

        console.error("PLAY ERROR:", err)
        reply("❌ Song download error, thori dair baad try karo")
    }
})
