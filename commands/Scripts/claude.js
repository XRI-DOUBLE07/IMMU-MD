const axios = require('axios');

module.exports = {
    name: 'claude',
    desc: 'Asks Claude 3 Haiku a question.',
    aliases: ['askclaude', 'claudeai'],
    category: 'AI',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a question to ask Claude 3 Haiku.\n' +
                '├⬡ Usage: !claude [your question]\n' +
                '╰────────────❒'
            );
        }

        const question = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Thinking ❒\n' +
                '├⬡ Asking Claude 3 Haiku: ' + question + '\n' +
                '├⬡ Please wait for the response...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/claude3-haiku?ask=${encodeURIComponent(question)}`;
            const response = await axios.get(apiUrl);
            const claudeData = response.data;

            if (claudeData && claudeData.response) {
                await sock.sendMessage(
                    m.chat,
                    { text: `🤖 Claude 3 Haiku says:\n\n${claudeData.response}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Claude 3 Haiku did not provide a response.\n' +
                    '├⬡ Please try asking again later.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error asking Claude 3 Haiku:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while communicating with Claude 3 Haiku.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};