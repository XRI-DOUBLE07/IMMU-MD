const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const cacheFolder = path.resolve(__dirname, './cache');

if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
}

async function uploadToCatbox(imagePath) {
    try {
        const formData = new FormData();
        formData.append('fileToUpload', fs.createReadStream(imagePath));
        const response = await axios.post('https://catbox.moe/user/api.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        return response.data.url;
    } catch (error) {
        console.error('Error uploading to Catbox:', error);
        return null;
    }
}

module.exports = {
    name: 'gemini',
    desc: 'Interacts with the Gemini Flash 2.0 model or analyzes an image.',
    aliases: ['ai', 'googleai'],
    category: 'AI',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        const isImageAnalysis = m.hasQuotedImage || (m.type === 'imageMessage' && m.msg.url);

        if (!args[0] && !isImageAnalysis) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a question or quote an image to analyze.\n' +
                '├⬡ Usage (Question): !gemini [your question]\n' +
                '├⬡ Usage (Image Analysis): Reply to an image with !gemini [optional question]\n' +
                '╰────────────❒'
            );
        }

        const question = args.join(' ');
        let imageUrl = null;

        if (isImageAnalysis) {
            const processingImageMsg = await m.reply(
                '╭────❒ ⏳ Processing Image ❒\n' +
                '├⬡ Downloading and preparing the image for analysis...\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            try {
                const media = await sock.downloadAndSaveMediaMessage(
                    m.hasQuotedImage ? m.quoted : m,
                    path.join(cacheFolder, crypto.randomBytes(16).toString('hex'))
                );
                const catboxUrl = await uploadToCatbox(media);
                await fs.unlink(media); // Clean up cached image
                if (catboxUrl) {
                    imageUrl = catboxUrl;
                    await sock.sendMessage(m.chat, { delete: processingImageMsg.key });
                } else {
                    await sock.sendMessage(m.chat, { delete: processingImageMsg.key });
                    return m.reply(
                        '╭────❒ ❌ Upload Error ❒\n' +
                        '├⬡ Failed to upload the image for analysis.\n' +
                        '├⬡ Please try again later.\n' +
                        '╰────────────❒'
                    );
                }
            } catch (error) {
                console.error('Error processing image:', error);
                await sock.sendMessage(m.chat, { delete: processingImageMsg.key });
                return m.reply(
                    '╭────❒ ❌ Image Error ❒\n' +
                    '├⬡ An error occurred while processing the image.\n' +
                    '├⬡ Please try again later.\n' +
                    '╰────────────❒'
                );
            }
        }

        const processingMsg = await m.reply(
            `╭────❒ ⏳ Thinking ❒\n├⬡ Querying Gemini Flash 2.0${imageUrl ? ' with image analysis' : ''}:\n├⬡ ${question || 'Analyzing image...'}\n├⬡ Please wait for the response...\n╰────────────❒`
        );

        try {
            const apiUrl = `https://kaiz-apis.gleeze.com/api/gemini-flash-2.0?q=${encodeURIComponent(question || 'Describe this image.')}&uid=${encodeURIComponent(m.sender.split('@')[0])}&imageUrl=${encodeURIComponent(imageUrl || '')}`;
            const response = await axios.get(apiUrl);
            const geminiData = response.data;

            if (geminiData && geminiData.response) {
                await sock.sendMessage(
                    m.chat,
                    { text: `🤖 Gemini Flash 2.0 says:\n\n${geminiData.response}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Gemini Flash 2.0 did not provide a response.\n' +
                    '├⬡ Please try asking again later.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error querying Gemini:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while communicating with Gemini Flash 2.0.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};