const axios = require('axios');

module.exports = {
    name: 'name',
    desc: 'Predicts the gender of a given name.',
    aliases: ['guessgender', 'namegender'],
    category: 'Fun',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a name to guess the gender.\n' +
                '├⬡ Usage: !genderize [name]\n' +
                '╰────────────❒'
            );
        }

        const name = args[0];

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Predicting ❒\n' +
                '├⬡ Trying to guess the gender of: ' + name + '\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/genderize?name=${encodeURIComponent(name)}`;
            const response = await axios.get(apiUrl);
            const genderData = response.data;

            if (genderData && genderData.gender) {
                const probabilityPercentage = (genderData.probability * 100).toFixed(2);
                await sock.sendMessage(
                    m.chat,
                    {
                        text: `🤔 Based on the name "${genderData.name}", I'd say it's likely **${genderData.gender}** with a probability of **${probabilityPercentage}%**.`,
                    },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❓ Hmm... ❒\n' +
                    '├⬡ Could not determine the gender for the name: ' + name + '.\n' +
                    '├⬡ Maybe try a different name!\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error predicting gender:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while trying to predict the gender.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};