const axios = require('axios');

module.exports = {
    name: 'wiki',
    desc: 'Searches Wikipedia for a given query.',
    aliases: ['wikipedia', 'wikisearch'],
    category: 'Information',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a search term for Wikipedia.\n' +
                '├⬡ Usage: !wiki [search term]\n' +
                '╰────────────❒'
            );
        }

        const query = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Searching ❒\n' +
                '├⬡ Searching Wikipedia for: ' + query + '\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/wikipedia?search=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);
            const wikiData = response.data;

            if (wikiData && wikiData.shortMeaning) {
                let message = `
╭────❒ 📚 Wikipedia Search 📚 ❒────
├⬡ Search Query: ${query}
├⬡ Short Meaning: ${wikiData.shortMeaning}
`;
                if (wikiData.longMeaning && wikiData.longMeaning.length > 0) {
                    message += `\n├⬡ Long Meaning:\n`;
                    wikiData.longMeaning.forEach((paragraph, index) => {
                        message += `├⬡ ${paragraph}\n`;
                    });
                }
                message += '╰────────────────────────────';

                const imageUrl = wikiData.imageUrls && wikiData.imageUrls.length > 0 ? wikiData.imageUrls[0] : null;

                if (imageUrl) {
                    await sock.sendMessage(
                        m.chat,
                        {
                            image: { url: imageUrl },
                            caption: message,
                        },
                        { quoted: m }
                    );
                } else {
                    await sock.sendMessage(m.chat, { text: message }, { quoted: m });
                }
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❌ Not Found ❒\n' +
                    '├⬡ No results found for: ' + query + ' on Wikipedia.\n' +
                    '├⬡ Please try a different search term.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error searching Wikipedia:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while searching Wikipedia.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};