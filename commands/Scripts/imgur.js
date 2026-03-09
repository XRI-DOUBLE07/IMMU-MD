const axios = require('axios');
        const FormData = require('form-data');
        const fs = require('fs');

        module.exports = {
            name: 'imgur',
            desc: 'Uploads an image to Imgur.',
            aliases: ['upload', 'imageupload'],
            category: 'Media',
            cooldown: 10,
            permission: 0,
            dmUser: false,
            run: async ({ sock, m, args }) => {
                if (!args[0] && !m.quoted && !(m.type === 'imageMessage')) {
                    return m.reply(
                        '╭────❒ ❌ Error ❒\n' +
                        '├⬡ Please provide an image URL or reply to an image.\n' +
                        '├⬡ Usage: !imgur [image URL]\n' +
                        '╰────────────❒'
                    );
                }

                let imageUrl = args[0];
                let imageBuffer;

                try {
                    const processingMsg = await m.reply(
                        '╭────❒ ⏳ Uploading ❒\n' +
                        '├⬡ Uploading image to Imgur...\n' +
                        '├⬡ Please wait a moment...\n' +
                        '╰────────────❒'
                    );

                    if (!imageUrl) {
                         const quoted = m.quoted ? m.quoted : m;
                         imageBuffer = await sock.downloadAndSaveMediaMessage(
                             quoted,
                             `imgur_${Date.now()}`
                         );
                         imageUrl = imageBuffer; 
                     } else {
                         
                         const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                         imageBuffer = Buffer.from(imageResponse.data, 'binary');
                         
                         const tempFilePath = `imgur_${Date.now()}.jpg`;
                         await fs.promises.writeFile(tempFilePath, imageBuffer);
                         imageUrl = tempFilePath; 
                     }

                    const formData = new FormData();
                    formData.append('image', fs.createReadStream(imageUrl));

                    const imgurResponse = await axios.post('https://kaiz-apis.gleeze.com/api/imgur', formData, {
                        headers: {
                            ...formData.getHeaders(),
                        },
                    });

                    if (imgurResponse.data && imgurResponse.data.uploaded && imgurResponse.data.uploaded.status === 'success') {
                        await sock.sendMessage(
                            m.chat,
                            { image: { url: imgurResponse.data.uploaded.image }, caption: 'Image uploaded to Imgur!' },
                            { quoted: m }
                        );
                    } else {
                        return m.reply(
                            '╭────❒ ❌ Upload Failed ❒\n' +
                            '├⬡ Failed to upload the image to Imgur.\n' +
                            '├⬡ Please try again later.\n' +
                            '╰────────────❒'
                        );
                    }
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });

                    
                    if (imageBuffer && fs.existsSync(imageUrl)) {
                        await fs.promises.unlink(imageUrl);
                    }

                } catch (error) {
                    console.error('Error uploading to Imgur:', error);
                     if (fs.existsSync(imageUrl)) {
                        await fs.promises.unlink(imageUrl);
                    }
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    return m.reply(
                        '╭────❒ ❌ Error ❒\n' +
                        '├⬡ An error occurred while uploading the image to Imgur.\n' +
                        '├⬡ Please try again later.\n' +
                        '╰────────────❒'
                    );
                }
            },
        };
        