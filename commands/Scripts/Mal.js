const axios = require('axios');

module.exports = {
    name: 'anime',
    desc: 'Fetches information about an anime from MyAnimeList.',
    aliases: ['mal', 'anisearch'],
    category: 'Information',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide the name of an anime to search for.\n' +
                '├⬡ Usage: !anime [anime name]\n' +
                '╰────────────❒'
            );
        }

        const query = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Searching ❒\n' +
                '├⬡ Fetching anime information for: ' + query + '\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/mal?title=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);
            const animeData = response.data;

            if (animeData && animeData.title) {
                const message = `
╭────❒ 🎬 Anime Info 🎬 ❒────
├⬡ Title: ${animeData.title} (${animeData.japanese})
├⬡ Type: ${animeData.type}
├⬡ Status: ${animeData.status}
├⬡ Premiered: ${animeData.premiered}
├⬡ Aired: ${animeData.aired}
├⬡ Episodes: ${animeData.episodes}
├⬡ Duration: ${animeData.duration}
├⬡ Genres: ${animeData.genres}
├⬡ Score: ${animeData.score} (${animeData.scoreStats})
├⬡ Ranked: ${animeData.ranked}
├⬡ Popularity: ${animeData.popularity}
├⬡ Rating: ${animeData.rating}
├⬡ Members: ${animeData.members}
├⬡ Favorites: ${animeData.favorites}
├⬡ URL: ${animeData.url}
╰───────────────────────────
${animeData.description ? `\nSynopsis:\n${animeData.description}` : ''}
`;

                await sock.sendMessage(
                    m.chat,
                    {
                        image: { url: animeData.picture },
                        caption: message,
                    },
                    { quoted: m }
                );
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❌ Not Found ❒\n' +
                    '├⬡ No anime found with the title: ' + query + '\n' +
                    '├⬡ Please try a different search term.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error fetching anime:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while fetching anime data.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};