const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')

const AXIOS = axios.create({
    timeout: 60000,
    headers: { 'User-Agent': 'Mozilla/5.0' }
})

// 🔹 Fetch video function with new API + old API fallback
async function fetchVideo(url) {
    try {
        // New API
        const newApi = `https://api.nexoracle.com/downloader/yt-video2?apikey=e9183ccf459da37e5f&url=${encodeURIComponent(url)}`
        const newRes = await AXIOS.get(newApi)

        if (newRes.data?.status && newRes.data?.result?.download) {
            return {
                url: newRes.data.result.download,
                title: newRes.data.result.title || "Unknown Title",
                thumb: newRes.data.result.thumbnail || "",
                quality: newRes.data.result.quality || "HD"
            }
        }

        throw new Error("New API failed")

    } catch (e) {
        console.log("New API failed, using old API:", e.message)

        // Old API fallback
        const oldApi = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`
        const oldRes = await AXIOS.get(oldApi)

        if (oldRes.data?.status && oldRes.data?.result?.status && oldRes.data?.result?.download?.url) {
            return {
                url: oldRes.data.result.download.url,
                title: oldRes.data.result.metadata.title,
                thumb: oldRes.data.result.metadata.thumbnail,
                quality: oldRes.data.result.download.quality || "720p"
            }
        }

        throw new Error("Both APIs failed")
    }
}

// 🔹 Drama Command
cmd({
    pattern: "drama",
    react: "⛓️",
    desc: "Download Drama / YouTube Video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {

    try {

        if (args.length < 2) {
            return reply(`
*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣*
*│♲︎︎︎ 🎬 ᴜsᴀɢᴇ:* .drama video <name>
*│♲︎︎︎ 📄 ᴅᴏᴄ ᴍᴏᴅᴇ:* .drama doc <name>
*╰━━━━━━━━━━━━━━━━━━━━⬣*
> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ
`)
        }

        const mode = args[0].toLowerCase()
        const query = args.slice(1).join(" ")

        await conn.sendMessage(from, { react: { text: "⏳", key: m.key } })

        let video
        if (query.startsWith("http")) {
            video = { url: query }
        } else {
            const search = await yts(query)
            if (!search.videos.length) return reply("❌ No result found")
            video = search.videos[0]
        }

        const data = await fetchVideo(video.url)

        const caption = `
*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣*
*│♲︎︎︎ 🎬 ᴛɪᴛʟᴇ:* ${data.title}
*│♲︎︎︎ 🎞 ǫᴜᴀʟɪᴛʏ:* ${data.quality}
*│♲︎︎︎ 📥 ᴍᴏᴅᴇ:* ${mode === "doc" ? "Document" : "Video"}
*│♲︎︎︎ ⚙️ sᴛᴀᴛᴜs:* Downloaded
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ  𝐈ᴍᴍυ Mᴅ
`

        const messageData = mode === "doc"
            ? {
                document: { url: data.url },
                mimetype: "video/mp4",
                fileName: `${data.title}.mp4`,
                caption,
                contextInfo: {
                    externalAdReply: {
                        title: data.title,
                        body: "Drama / YouTube",
                        thumbnailUrl: data.thumb,
                        sourceUrl: video.url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }
            : {
                video: { url: data.url },
                mimetype: "video/mp4",
                caption,
                contextInfo: {
                    externalAdReply: {
                        title: data.title,
                        body: "Drama / YouTube",
                        thumbnailUrl: data.thumb,
                        sourceUrl: video.url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }

        await conn.sendMessage(from, messageData, { quoted: mek })
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } })

    } catch (e) {

        console.log(e)

        reply(`
*╭━〔 🌐  𝐈ᴍᴍυ Mᴅ 〕━⬣*
*│❌ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ*
*│❤️‍🔥 ʀᴇᴀsᴏɴ:* API Error
*╰━━━━━━━━━━━━━━━━━━━━⬣*
> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐇ᴀsɪ 𝐌ᴅ
`)
        await conn.sendMessage(from, { react: { text: "❌", key: m.key } })
    }

})
