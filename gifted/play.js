const { gmd, toPtt } = require("../gift");
const yts = require("yt-search");
const axios = require("axios");

function extractButtonId(msg) {
    if (!msg) return null;
    if (msg.templateButtonReplyMessage?.selectedId)
        return msg.templateButtonReplyMessage.selectedId;
    if (msg.buttonsResponseMessage?.selectedButtonId)
        return msg.buttonsResponseMessage.selectedButtonId;
    if (msg.listResponseMessage?.singleSelectReply?.selectedRowId)
        return msg.listResponseMessage.singleSelectReply.selectedRowId;
    if (msg.interactiveResponseMessage) {
        const nf = msg.interactiveResponseMessage.nativeFlowResponseMessage;
        if (nf?.paramsJson) {
            try { const p = JSON.parse(nf.paramsJson); if (p.id) return p.id; } catch {}
        }
        return msg.interactiveResponseMessage.buttonId || null;
    }
    return null;
}
const {
  downloadContentFromMessage,
  generateWAMessageFromContent,
  normalizeMessageContent,
} = require("gifted-baileys");
const { sendButtons } = require("gifted-btns");


gmd(
  {
    pattern: "sendaudio",
    aliases: ["sendmp3", "dlmp3", "dlaudio"],
    category: "downloader",
    react: "🎶",
    description: "Download Audio from url",
  },
  async (from, Gifted, conText) => {
    const { q, mek, reply, react, sender, botFooter, gmdBuffer, formatAudio } =
      conText;

    if (!q) {
      await react("❌");
      return reply("Please provide audio url");
    }

    try {
      const buffer = await gmdBuffer(q);
      const convertedBuffer = await formatAudio(buffer);
      if (buffer instanceof Error) {
        await react("❌");
        return reply("Failed to download the audio file.");
      }
      await Gifted.sendMessage(
        from,
        {
          audio: convertedBuffer,
          mimetype: "audio/mpeg",
          caption: `> *${botFooter}*`,
        },
        { quoted: mek },
      );
      await react("✅");
    } catch (error) {
      console.error("Error during download process:", error);
      await react("❌");
      return reply("Oops! Something went wrong. Please try again.");
    }
  },
);

gmd(
  {
    pattern: "sendvideo",
    aliases: ["sendmp4", "dlmp4", "dvideo"],
    category: "downloader",
    react: "🎥",
    description: "Download Video from url",
  },
  async (from, Gifted, conText) => {
    const { q, mek, reply, react, sender, botFooter, gmdBuffer, formatVideo } =
      conText;

    if (!q) {
      await react("❌");
      return reply("Please provide video url");
    }

    try {
      const buffer = await gmdBuffer(q);
    //  const convertedBuffer = await formatVideo(buffer);
      if (buffer instanceof Error) {
        await react("❌");
        return reply("Failed to download the video file.");
      }
      await Gifted.sendMessage(
        from,
        {
          document: buffer,
          fileName: "Video.mp4",
          mimetype: "video/mp4",
          caption: `> *${botFooter}*`,
        },
        { quoted: mek },
      );
      await react("✅");
    } catch (error) {
      console.error("Error during download process:", error);
      await react("❌");
      return reply("Oops! Something went wrong. Please try again.");
    }
  },
);


// Valid audio/video files are always at least 10 KB.
// Anything smaller is a JSON error body served with HTTP 200.
const isValidBuffer = (buf) => Buffer.isBuffer(buf) && buf.length > 10240;

async function queryAPI(query, endpoints, conText, timeout = 20000) {
  const { GiftedTechApi, GiftedApiKey } = conText;
  const t0 = Date.now();

  const attempts = endpoints.map(endpoint => {
    const apiUrl = `${GiftedTechApi}/api/download/${endpoint}?apikey=${GiftedApiKey}&url=${encodeURIComponent(query)}`;
    return axios.get(apiUrl, { timeout })
      .then(res => {
        if (res.data?.success && res.data?.result?.download_url) {
          return { success: true, data: res.data, endpoint, download_url: res.data.result.download_url };
        }
        throw new Error(`${endpoint}: no download_url`);
      });
  });

  try {
    return await Promise.any(attempts);
  } catch {
    return { success: false, error: "All endpoints failed" };
  }
}

const audioEndpoints = [
  'ytmp3v2',
  'ytaudio',
  'yta',
  'ytmp3',
  'savetubemp3',
  'savemp3'
];

const videoEndpoints = [
  'ytmp4v2',
  'ytvideo',
  'ytv',
  'ytmp4',
  'savetubemp4',
  'savemp4'
];

gmd(
  {
    pattern: "play",
    aliases: ["ytmp3", "ytmp3doc", "audiodoc", "yta"],
    category: "downloader",
    react: "🎶",
    description: "Download Audio from Youtube",
  },
  async (from, Gifted, conText) => {
    const {
      q,
      reply,
      react,
      botPic,
      botName,
      botFooter,
      gmdBuffer,
      formatAudio,
    } = conText;

    if (!q) {
      await react("❌");
      return reply("Please provide a song name");
    }

    try {
      const searchResponse = await yts(q);

      if (!searchResponse.videos.length) {
        return reply("No video found for your query.");
      }

      const firstVideo = searchResponse.videos[0];
      const videoUrl = firstVideo.url;
      
      await react("🔍");
      const endpointResult = await queryAPI(videoUrl, audioEndpoints, conText);
      
      if (!endpointResult.success) {
        await react("❌");
        return reply("All download services are currently unavailable. Please try again later.");
      }
      
      let bufferRes = await gmdBuffer(endpointResult.download_url);

      // If the winning endpoint's download URL failed or returned a tiny error body, retry the rest
      if (!isValidBuffer(bufferRes)) {
        const remaining = audioEndpoints.filter(e => e !== endpointResult.endpoint);
        const retry = await queryAPI(videoUrl, remaining, conText);
        if (retry.success) bufferRes = await gmdBuffer(retry.download_url);
      }

      if (!isValidBuffer(bufferRes)) {
        await react("❌");
        return reply("Failed to download audio. Please try again later.");
      }

      // Large file — skip buttons, send directly as document
      if (bufferRes.length > 60 * 1024 * 1024) {
        await react("📄");
        const convertedBuffer = await formatAudio(bufferRes);
        await Gifted.sendMessage(from, {
          document: convertedBuffer,
          mimetype: "audio/mpeg",
          fileName: `${firstVideo.title}.mp3`.replace(/[^\w\s.-]/gi, ""),
          caption: `⿻ *Title:* ${firstVideo.title}\n⿻ *Duration:* ${firstVideo.timestamp}\n\n_File too large for audio streaming — sent as document_`,
        });
        return;
      }

      const dateNow = Date.now();
      const buttonId = `play_${firstVideo.id}_${dateNow}`;
      
      await sendButtons(Gifted, from, {
        title: `${botName} 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑`,
        text: `⿻ *Title:* ${firstVideo.title}\n⿻ *Duration:* ${firstVideo.timestamp}\n\n*Select download format:*`,
        footer: botFooter,
        image: { url: firstVideo.thumbnail || botPic },
        buttons: [
          { id: `audio_${buttonId}`, text: "Audio 🎶" },
          { id: `doc_${buttonId}`, text: "Audio Document 📄" },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Watch on Youtube",
              url: firstVideo.url,
            }),
          },
        ],
      });

      const handleResponse = async (event) => {
        const messageData = event.messages[0];
        if (!messageData.message) return;

        const selectedButtonId = extractButtonId(messageData.message);
        if (!selectedButtonId) return;

        const isFromSameChat = messageData.key?.remoteJid === from;
        if (!isFromSameChat || !selectedButtonId.includes(dateNow.toString())) return;

        await react("⬇️");

        if (!isValidBuffer(bufferRes)) {
          await react("❌");
          return reply("Download failed. Please try .play again.");
        }

        try {
          if (selectedButtonId.startsWith('audio_')) {
            const convertedBuffer = await formatAudio(bufferRes);
            await Gifted.sendMessage(
              from,
              {
                audio: convertedBuffer,
                mimetype: "audio/mpeg",
              },
              { quoted: messageData }
            );
          } 
          else if (selectedButtonId.startsWith('doc_')) {
            const convertedBuffer = await formatAudio(bufferRes);
            await Gifted.sendMessage(
              from,
              {
                document: convertedBuffer,
                mimetype: "audio/mpeg",
                fileName: `${firstVideo.title}.mp3`.replace(/[^\w\s.-]/gi, ""),
                caption: `${firstVideo.title}`,
              },
              { quoted: messageData }
            );
          } 
          else {
            return;
          }

          await react("✅");
        } catch (error) {
          console.error("Error sending media:", error);
          await react("❌");
          await Gifted.sendMessage(from, { text: "Failed to send media. Please try again." }, { quoted: messageData });
        }
      };

      Gifted.ev.on("messages.upsert", handleResponse);

      setTimeout(() => {
        Gifted.ev.off("messages.upsert", handleResponse);
      }, 300000);
      
    } catch (error) {
      console.error("Error during download process:", error);
      await react("❌");
      return reply("Oops! Something went wrong. Please try again.");
    }
  },
);

gmd(
  {
    pattern: "video",
    aliases: ["ytmp4doc", "mp4", "ytmp4", "dlmp4"],
    category: "downloader",
    react: "🎥",
    description: "Download Video from Youtube",
  },
  async (from, Gifted, conText) => {
    const {
      q,
      reply,
      react,
      botPic,
      botName,
      botFooter,
      gmdBuffer,
      formatVideo,
    } = conText;

    if (!q) {
      await react("❌");
      return reply("Please provide a video name");
    }

    try {
      const searchResponse = await yts(q);

      if (!searchResponse.videos.length) {
        return reply("No video found for your query.");
      }

      const firstVideo = searchResponse.videos[0];
      const videoUrl = firstVideo.url;
      
      await react("🔍");
      const endpointResult = await queryAPI(videoUrl, videoEndpoints, conText);
      
      if (!endpointResult.success) {
        await react("❌");
        return reply("All download services are currently unavailable. Please try again later.");
      }
      
      let buffer = await gmdBuffer(endpointResult.download_url);

      // If the winning endpoint's download URL failed or returned a tiny error body, retry the rest
      if (!isValidBuffer(buffer)) {
        const remaining = videoEndpoints.filter(e => e !== endpointResult.endpoint);
        const retry = await queryAPI(videoUrl, remaining, conText);
        if (retry.success) buffer = await gmdBuffer(retry.download_url);
      }

      if (!isValidBuffer(buffer)) {
        await react("❌");
        return reply("Failed to download video. Please try again later.");
      }

      const sizeMB = buffer.length / (1024 * 1024);

      // Large file — skip buttons, send directly as document
      if (sizeMB > 100) {
        await react("📄");
        const convertedBuffer = await formatVideo(buffer);
        await Gifted.sendMessage(from, {
          document: convertedBuffer,
          mimetype: "video/mp4",
          fileName: `${firstVideo.title}.mp4`.replace(/[^\w\s.-]/gi, ""),
          caption: `⿻ *Title:* ${firstVideo.title}\n⿻ *Duration:* ${firstVideo.timestamp}\n\n_File too large for video streaming — sent as document_`,
        });
        return;
      }

      if (sizeMB > 20) {
        await reply("File is large, processing might take a while...");
      }

      const dateNow = Date.now();
      const buttonId = `video_${firstVideo.id}_${dateNow}`;
      
      await sendButtons(Gifted, from, {
        title: `${botName} 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑`,
        text: `⿻ *Title:* ${firstVideo.title}\n⿻ *Duration:* ${firstVideo.timestamp}\n\n*Select download format:*`,
        footer: botFooter,
        image: { url: firstVideo.thumbnail || botPic },
        buttons: [
          { id: `vid_${buttonId}`, text: "Video 🎥" },
          { id: `doc_${buttonId}`, text: "Video Document 📄" },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Watch on Youtube",
              url: firstVideo.url,
            }),
          },
        ],
      });

      const handleResponse = async (event) => {
        const messageData = event.messages[0];
        if (!messageData.message) return;

        const selectedButtonId = extractButtonId(messageData.message);
        if (!selectedButtonId) return;

        const isFromSameChat = messageData.key?.remoteJid === from;
        if (!isFromSameChat || !selectedButtonId.includes(dateNow.toString())) return;

        await react("⬇️");

        try {
          if (selectedButtonId.startsWith('vid_')) {
            const formattedVideo = await formatVideo(buffer);
            await Gifted.sendMessage(
              from,
              {
                video: formattedVideo,
                mimetype: "video/mp4",
                fileName: `${firstVideo.title}.mp4`.replace(/[^\w\s.-]/gi, ""),
                caption: `🎥 ${firstVideo.title}`,
              },
              { quoted: messageData }
            );
          } 
          else if (selectedButtonId.startsWith('doc_')) {
            await Gifted.sendMessage(
              from,
              {
                document: buffer,
                mimetype: "video/mp4",
                fileName: `${firstVideo.title}.mp4`.replace(/[^\w\s.-]/gi, ""),
                caption: `📄 ${firstVideo.title}`,
              },
              { quoted: messageData }
            );
          } 
          else {
            return;
          }

          await react("✅");
        } catch (error) {
          console.error("Error sending media:", error);
          await react("❌");
          await Gifted.sendMessage(from, { text: "Failed to send media. Please try again." }, { quoted: messageData });
        }
      };

      Gifted.ev.on("messages.upsert", handleResponse);

      setTimeout(() => {
        Gifted.ev.off("messages.upsert", handleResponse);
      }, 300000);
      
    } catch (error) {
      console.error("Error during download process:", error);
      await react("❌");
      return reply("Oops! Something went wrong. Please try again.");
    }
  },
);
