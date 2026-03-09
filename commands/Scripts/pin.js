module.exports = {
    name: 'pinterest',
    desc: 'Search and display images from Pinterest',
    aliases: ['pin', 'pins'],
    category: 'Media',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            const query = args.join(" ");
            
            if (!query) {
                return m.reply("╭────❒ ❌ Error ❒\n├⬡ Please provide a search query\n├⬡ Example: !pinterest sunset\n╰────────────❒");
            }
            
            m.reply("╭────❒ 🔍 Pinterest Search ❒\n├⬡ Query: " + query + "\n├⬡ Please wait...\n╰────────────❒");
            
            const apiUrl = `https://lance-frank-asta.onrender.com/api/pinterest?text=${encodeURIComponent(query)}`;
            
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('API response error');
                
                const data = await response.json();
                
                if (!data.status || !data.result || data.result.length === 0) {
                    return m.reply("╭────❒ ❌ Error ❒\n├⬡ No images found for your query\n├⬡ Please try a different search term\n╰────────────❒");
                }
                
                // Get a random image from the results
                const randomIndex = Math.floor(Math.random() * data.result.length);
                const imageUrl = data.result[randomIndex];
                
                await sock.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `╭────❒ 📌 Pinterest Image ❒\n├⬡ Search: ${query}\n╰────────────❒\n\n> EF-PRIME-MD V2`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363419090892208@newsletter',
                            newsletterName: "EF-PRIME",
                            serverMessageId: 143
                        }
                    }
                }, {
                    quoted: m
                });
                
            } catch (apiError) {
                console.error('Pinterest API error:', apiError);
                return m.reply("╭────❒ ❌ Error ❒\n├⬡ Failed to fetch Pinterest images\n├⬡ Please try again later\n╰────────────❒");
            }
            
        } catch (err) {
            console.error('Error in pinterest command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to process your request\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};