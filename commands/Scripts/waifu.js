const axios = require('axios');

        module.exports = {
            name: 'waifu',
            desc: 'Fetches a random waifu image.',
            aliases: ['wife'],
            category: 'Fun',
            cooldown: 5,
            permission: 0,
            dmUser: false,
            run: async ({ sock, m }) => {
                try {
                    const processingMsg = await m.reply(
                        '╭────❒ ⏳ Fetching ❒\n' +
                        '├⬡ Getting your waifu...\n' +
                        '├⬡ Please wait a moment...\n' +
                        '╰────────────❒'
                    );

                    const apiUrl = 'https://kaiz-apis.gleeze.com/api/waifu';
                    const response = await axios.get(apiUrl);
                    const waifuData = response.data;

                    if (waifuData && waifuData.imageUrl) {
                        await sock.sendMessage(
                            m.chat,
                            {
                                image: { url: waifuData.imageUrl }},
                                caption: 'Here is your waifu!',
                            },
                            { quoted: m }
                        );
                        await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    } else {
                        await sock.sendMessage(m.chat, { delete: processingMsg.key });
                        return m.reply(
                            '╭────❒ ❌ Error ❒\n' +
                            '├⬡ Could not fetch waifu image.\n' +
                            '├⬡ Please try again later.\n' +
                            '╰────────────❒'
                        );
                    }
                } catch (error) {
                    console.error('Error fetching waifu:', error);
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    return m.reply(
                        '╭────❒ ❌ Error ❒\n' +
                        '├⬡ An error occurred while fetching the waifu image.\n' +
                        '├⬡ Please try again later.\n' +
                        '╰────────────❒'
                    );
                }
            },
        };