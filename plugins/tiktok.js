const { cmd } = require("../command")
const axios = require("axios")
const crypto = require("crypto")
const Buffer = require("buffer").Buffer

// ===== Encryption Keys =====
const KEY_MAP = {
  enc: "GJvE5RZIxrl9SuNrAtgsvCfWha3M7NGC",
  dec: "H3quWdWoHLX5bZSlyCYAnvDFara25FIu",
}

// ===== Crypto Processor =====
const cryptoProc = (type, data) => {
  const key = Buffer.from(KEY_MAP[type], "utf8")
  const iv = Buffer.from(KEY_MAP[type].slice(0, 16), "utf8")

  const cipher =
    type === "enc"
      ? crypto.createCipheriv("aes-256-cbc", key, iv)
      : crypto.createDecipheriv("aes-256-cbc", key, iv)

  let output =
    type === "enc"
      ? cipher.update(data, "utf8", "base64")
      : cipher.update(data, "base64", "utf8")

  output += cipher.final(type === "enc" ? "base64" : "utf8")
  return output
}

// ===== Savetik API =====
async function tiktokCrypto(url) {

  if (!/tiktok\.com/.test(url))
    throw new Error("Invalid TikTok URL")

  const encrypted = cryptoProc("enc", url)

  const { data } = await axios.post(
    "https://savetik.app/requests",
    { bdata: encrypted },
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/json",
      },
      timeout: 25000,
    }
  )

  if (!data || data.status !== "success")
    throw new Error(data.message || "API Error")

  const decryptedVideo = cryptoProc("dec", data.data)

  return {
    title: data.title || "Unknown",
    author: data.username || "Unknown",
    thumbnail: data.thumbnailUrl || "",
    video: decryptedVideo,
    audio: data.mp3 || null,
  }
}

// ===== Download Video Buffer =====
async function fetchPlayableVideo(url) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" }
  })
  return Buffer.from(res.data)
}

// ===== MAIN COMMAND =====

cmd({
  pattern: "tiktok",
  alias: ["tt", "ttdl"],
  desc: "Download TikTok Video (Encrypted)",
  category: "download",
  react: "🎬",
  filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {

  try {

    if (!args[0] || !/tiktok\.com/.test(args[0])) {
      return reply(`
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│ 🎬 𝐔𝐬𝐚𝐠𝐞:* .tiktok <url>
*│ 📌 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:* .tt https://vt.tiktok.com/xxxx
*╰━━━━━━━━━━━━━━━━━━━━⬣*
> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`)
    }

    const url = args[0]

    await reply("⏳ 𝐃𝐞𝐜𝐫𝐲𝐩𝐭𝐢𝐧𝐠 & 𝐏𝐫𝐞𝐩𝐚𝐫𝐢𝐧𝐠 𝐕𝐢𝐝𝐞𝐨...")

    const result = await tiktokCrypto(url)

    const videoBuffer = await fetchPlayableVideo(result.video)

    const caption = `
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│ 🎬 𝐓𝐢𝐭𝐥𝐞:* ${result.title}
*│ 👤 𝐀𝐮𝐭𝐡𝐨𝐫:* @${result.author}
*│ 🔐 𝐌𝐨𝐝𝐞:* Encrypted API
*│ ✅ 𝐒𝐭𝐚𝐭𝐮𝐬:* Downloaded
*╰━━━━━━━━━━━━━━━━━━━━⬣*

> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`

    await conn.sendMessage(from, {
      video: videoBuffer,
      mimetype: "video/mp4",
      caption
    }, { quoted: mek })

    if (result.audio) {
      await conn.sendMessage(from, {
        audio: { url: result.audio },
        mimetype: "audio/mpeg",
        fileName: "tiktok_audio.mp3"
      }, { quoted: mek })
    }

  } catch (err) {

    console.error("TT ERROR:", err.message)

    reply(`
*╭━〔 🌐 𝐈ᴍᴍυ 𝐌ᴅ 〕━⬣*
*│❌ 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐅𝐚𝐢𝐥𝐞𝐝*
*│ 𝐄𝐫𝐫𝐨𝐫:* ${err.message}
*╰━━━━━━━━━━━━━━━━━━━━⬣*
> 📌 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐈ᴍᴍυ 𝐌ᴅ
`)
  }

})
