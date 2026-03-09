const axios = require('axios');
const fs = require('fs');
const path = require('path');
const yts = require('yt-search');

const cacheFolder = path.resolve(__dirname, './cache');

if (!fs.existsSync(cacheFolder)) {
  fs.mkdirSync(cacheFolder);
}

module.exports = {
    name: 'song',
    desc: 'Search and download audio from YouTube',
    aliases: ['ytplay', 'ytsearch', 'music'],
    category: 'Media',
    cooldown: 5,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            if (!args[0]) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Please provide a song name or YouTube URL\n' +
                    '├⬡ Usage: !play [song name/YouTube URL]\n' +
                    '╰────────────❒'
                );
            }

            const processingMsg = await m.reply(
                '╭────❒ ⏳ Processing ❒\n' +
                '├⬡ Searching and downloading your song...\n' +
                '├⬡ Please wait a moment\n' +
                '╰────────────❒'
            );

            const query = args.join(' ');
            let videoUrl;
            let videoInfo;
            
            if (query.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/)) {
                videoUrl = query;
                const videoId = query.includes('youtu.be') 
                    ? query.split('/').pop() 
                    : new URL(query).searchParams.get('v');
                const videoSearch = await yts({ videoId });
                videoInfo = videoSearch;
            } else {
                const searchResults = await yts(query);
                
                if (!searchResults.videos || searchResults.videos.length === 0) {
                    return m.reply(
                        '╭────❒ ❌ Not Found ❒\n' +
                        '├⬡ No songs found for your query\n' +
                        '├⬡ Try a different search term\n' +
                        '╰────────────❒'
                    );
                }
                
                videoInfo = searchResults.videos[0];
                videoUrl = videoInfo.url;
            }

            const apiResponse = await axios.get(`https://kaiz-apis.gleeze.com/api/ytdown-mp3?url=${encodeURIComponent(videoUrl)}`);
            
            if (!apiResponse.data || !apiResponse.data.download_url) {
                return m.reply(
                    '╭────❒ ❌ API Error ❒\n' +
                    '├⬡ Failed to download the song\n' +
                    '├⬡ Please try again later or use a different query\n' +
                    '╰────────────❒'
                );
            }
            
            const downloadUrl = apiResponse.data.download_url;
            const title = apiResponse.data.title || videoInfo.title;
            const duration = apiResponse.data.duration || videoInfo.timestamp || "Unknown";

            const audioFilePath = path.join(cacheFolder, `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`);
            const audioResponse = await axios.get(downloadUrl, { responseType: 'stream' });
            const writer = fs.createWriteStream(audioFilePath);
            
            audioResponse.data.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(m.chat, {
                    audio: { url: audioFilePath },
                    mimetype: 'audio/mp4',
                    fileName: `${title}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: title,
                            body: `Channel: IMMU MD | Duration: ${duration}`,
                            thumbnailUrl: videoInfo.thumbnail || '',
                            sourceUrl: videoUrl,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                            showAdAttribution: false
                        },
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363341506278064@newsletter',
                            newsletterName: "IMMU MD",
                            serverMessageId: 143
                        }
                    }
                }, { quoted: m });
                
                sock.sendMessage(m.chat, { delete: processingMsg.key });
            });

            writer.on('error', async (error) => {
                console.error('Error saving audio file:', error.message);
                await m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ An error occurred while downloading the audio file\n' +
                    '├⬡ Please try again later\n' +
                    '╰────────────❒'
                );
            });
            
        } catch (err) {
            console.error('Error in play command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while processing the command\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};