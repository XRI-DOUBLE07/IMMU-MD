const axios = require('axios');


const gojoUserStates = {};

module.exports = {
    name: 'gojo',
    desc: 'Interacts with the Satoru Gojo AI character.',
    aliases: ['askgojo'],
    category: 'Fun',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide something to say to Gojo.\n' +
                '├⬡ Usage: !gojo [your message]\n' +
                '╰────────────❒'
            );
        }

        const message = args.join(' ');
        const userId = m.sender;

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Talking to Gojo ⏳ ❒\n' +
                '├⬡ Sending your message to the strongest sorcerer...\n' +
                '├⬡ Please wait for his divine response!\n' +
                '╰──────────────────'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/gojo?ask=${encodeURIComponent(message)}&uid=${encodeURIComponent(userId)}`;
            const response = await axios.get(apiUrl);
            const gojoData = response.data;

            if (gojoData && gojoData.response && gojoData.character === 'Satoru Gojo') {
                
                await sock.sendMessage(
                    m.chat,
                    { text: `🔵 Satoru Gojo says:\n\n${gojoData.response}` },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Gojo didn\'t respond this time or something went wrong.\n' +
                    '├⬡ Maybe try saying something else, *mou ii yo*?\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error talking to Gojo:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while trying to talk to Gojo.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};