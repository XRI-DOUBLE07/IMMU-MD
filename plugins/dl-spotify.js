const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

cmd({
    pattern: "spotify",
    alias: ["splay", "spot"],
    react: "🎵",
    desc: "Direct Spotify Song Downloader",
    category: "downloader",
    use: '.spotify <song name>',
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("❌ Please provide a song name.\nExample: .spotify pasoori");

        // Step 1: Search for best match
        const searchUrl = `https://jerrycoder.oggyapi.workers.dev/spotify?search=${encodeURIComponent(q)}`;
        const searchRes = await axios.get(searchUrl, { timeout: 20000 });

        if (!searchRes.data || !searchRes.data.tracks || searchRes.data.tracks.length === 0) {
            return reply("❌ No song found!");
        }

        const bestSong = searchRes.data.tracks[0];

        // Step 2: Get download link
        const dlUrl = `https://jerrycoder.oggyapi.workers.dev/dspotify?url=${encodeURIComponent(bestSong.spotifyUrl)}`;
        const dlRes = await axios.get(dlUrl, { timeout: 20000 });

        if (!dlRes.data || !dlRes.data.status || !dlRes.data.download_link) {
            return reply("❌ Failed to fetch download link");
        }

        const dlData = dlRes.data;
        const audioUrl = dlData.download_link;
        const title = dlData.title || bestSong.trackName;
        const artist = dlData.artist || bestSong.artist;
        const thumbnail = dlData.thumbnail || bestSong.thumbnail;

        // Step 3: Download audio to temp file
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const tempFile = path.join(tempDir, `spotify_${Date.now()}.mp3`);
        const audioResponse = await axios({
            method: 'GET',
            url: audioUrl,
            responseType: 'stream',
            timeout: 120000,
        });

        await pipeline(audioResponse.data, fs.createWriteStream(tempFile));
        const audioBuffer = fs.readFileSync(tempFile);

        // Step 4: Send audio with metadata
        await conn.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            fileName: `${title.replace(/[^\w\s]/gi, '')}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title.substring(0, 70),
                    body: artist.substring(0, 70),
                    thumbnailUrl: thumbnail,
                    sourceUrl: bestSong.spotifyUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // Cleanup
        fs.unlinkSync(tempFile);

    } catch (error) {
        console.error('Spotify Error:', error);
        reply("❌ Something went wrong. Please try again later.");
    }
});
