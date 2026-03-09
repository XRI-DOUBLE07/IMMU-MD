const acrcloud = require('acrcloud');
const fs = require('fs').promises;
const path = require('path');

const acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: '6ab51323d0971429efbc32743c3b6e01',
    access_secret: 'iFbOFUI9rVrQPf7WN5BzcpPnQoCTPJ3JdMkAgrU8',
});

const cacheFolder = path.resolve(__dirname, './cache');

if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
}

module.exports = {
    name: 'shazam',
    desc: 'Identifies music in a replied-to audio or video.',
    aliases: ['identify', 'whatsong'],
    category: 'Media',
    cooldown: 15,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m }) => {
        const quoted = m.quoted;
        if (!quoted || (!quoted.type === 'audioMessage' && !quoted.type === 'videoMessage')) {
            return m.reply(
                '╭────❒ 🎧 Usage 🎧 ❒────\n' +
                '├⬡ Reply to an audio or video message to identify the song.\n' +
                '╰───────────────────'
            );
        }

        try {
            const processingMsg = await m.reply(
                '╭────❒ 🎶 Identifying 🎶 ❒────\n' +
                '├⬡ Analyzing the audio/video...\n' +
                '├⬡ Please wait a moment...\n' +
                '╰───────────────────'
            );

            const media = await sock.downloadAndSaveMediaMessage(
                quoted,
                path.join(cacheFolder, `acrcloud_${Date.now()}`)
            );

            const fileBuffer = await fs.readFile(media);

            acr.identify(fileBuffer)
                .then(async (results) => {
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    if (results && results.status.code === 0 && results.metadata && results.metadata.music && results.metadata.music.length > 0) {
                        const track = results.metadata.music[0];
                        const message = `
╭────❒ 🎵 Song Identified! 🎵 ❒────
├⬡ Title: ${track.title}
├⬡ Artist: ${track.artists.map(artist => artist.name).join(', ')}
${track.album ? `├⬡ Album: ${track.album.name}\n` : ''}${track.genres ? `├⬡ Genre: ${track.genres.map(genre => genre.name).join(', ')}\n` : ''}├⬡ Confidence: ${(results.status.msg === 'Success' ? 'High' : 'Low')}
╰───────────────────────────
`;
                        await sock.sendMessage(m.chat, { text: message }, { quoted: m });
                    } else {
                        await sock.sendMessage(
                            m.chat,
                            { text: '🎧 Could not identify the song. Please try again with a clearer audio.' },
                            { quoted: m }
                        );
                    }
                    await fs.unlink(media);
                })
                .catch(async (error) => {
                    console.error('ACRCloud identification error:', error);
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    await sock.sendMessage(
                        m.chat,
                        { text: '❌ Error identifying the song. Please try again later.' },
                        { quoted: m }
                    );
                    await fs.unlink(media);
                });

        } catch (error) {
            console.error('Error processing media for identification:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            await sock.sendMessage(
                m.chat,
                { text: '❌ An error occurred while processing the audio/video.' },
                { quoted: m }
            );
        }
    },
};