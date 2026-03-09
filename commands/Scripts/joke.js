const axios = require('axios');

module.exports = {
    name: 'joke',
    desc: 'Tells a random joke.',
    aliases: ['funfact', 'laugh'],
    category: 'Fun',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m }) => {
        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Thinking ❒\n' +
                '├⬡ Let me find a good joke for you...\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = 'https://kaiz-apis.gleeze.com/api/joke';
            const response = await axios.get(apiUrl);
            const jokeData = response.data;

            if (jokeData && jokeData.joke) {
                await sock.sendMessage(
                    m.chat,
                    { text: `😂 Here's a joke for you:\n\n${jokeData.joke}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❌ Oops! ❒\n' +
                    '├⬡ Couldn\'t fetch a joke right now.\n' +
                    '├⬡ Maybe try again later!\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while trying to get a joke.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};