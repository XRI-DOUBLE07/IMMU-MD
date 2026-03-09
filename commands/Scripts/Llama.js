const axios = require('axios');

module.exports = {
    name: 'llama',
    desc: 'Interacts with the Llama 3 Turbo model.',
    aliases: ['askllama', 'llamaai'],
    category: 'AI',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a question to ask Llama 3 Turbo.\n' +
                '├⬡ Usage: !llama [your question]\n' +
                '╰────────────❒'
            );
        }

        const question = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Thinking ❒\n' +
                '├⬡ Asking Llama 3 Turbo: ' + question + '\n' +
                '├⬡ Please wait for the response...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/llama3-turbo?ask=${encodeURIComponent(question)}&uid=${encodeURIComponent(m.sender.split('@')[0])}`;
            const response = await axios.get(apiUrl);
            const llamaData = response.data;

            if (llamaData && llamaData.response) {
                await sock.sendMessage(
                    m.chat,
                    { text: `🦙 Llama 3 Turbo says:\n\n${llamaData.response}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Llama 3 Turbo did not provide a response.\n' +
                    '├⬡ Please try asking again later.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error asking Llama 3 Turbo:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while communicating with Llama 3 Turbo.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};