const axios = require('axios');

module.exports = {
    name: 'venice',
    desc: 'Interacts with the Venice AI model.',
    aliases: ['askvenice', 'veniceai'],
    category: 'AI',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a question to ask Venice AI.\n' +
                '├⬡ Usage: !venice [your question]\n' +
                '╰────────────❒'
            );
        }

        const question = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Thinking ❒\n' +
                '├⬡ Asking Venice AI: ' + question + '\n' +
                '├⬡ Please wait for the response...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/venice-ai?ask=${encodeURIComponent(question)}&uid=${encodeURIComponent(m.sender.split('@')[0])}`;
            const response = await axios.get(apiUrl);
            const veniceData = response.data;

            if (veniceData && veniceData.response) {
                await sock.sendMessage(
                    m.chat,
                    { text: `🎭 Venice AI says:\n\n${veniceData.response}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Venice AI did not provide a response.\n' +
                    '├⬡ Please try asking again later.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error asking Venice AI:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while communicating with Venice AI.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};