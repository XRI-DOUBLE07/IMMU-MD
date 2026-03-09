const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    name: 'bible',
    desc: 'Fetches random bible verses',
    aliases: ['verse', 'scripture'],
    category: 'Religion',
    cooldown: 5,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            
            const processingMsg = await m.reply("╭────❒ 📖 Finding Bible Verse ❒\n├⬡ Please wait...\n╰────────────❒");
            
           
            const apiUrl = 'https://kaiz-apis.gleeze.com/api/bible';
            const response = await axios.get(apiUrl);
            const data = response.data;
            
            if (!data || !data.verse || data.verse.length === 0) {
                
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                
                return m.reply("╭────❒ ❌ Error ❒\n├⬡ Failed to fetch bible verse\n├⬡ Please try again later\n╰────────────❒");
            }
            
            const verse = data.verse[0];
            const reference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
            const text = verse.text.trim();
            
           
            const formattedMsg = `╭────❒ 📖 Bible Verse ❒
├⬡ *${reference}*
├⬡ 
${text.split('\n').map(line => '├⬡ ' + line).join('\n')}
╰────────────❒

> EF-PRIME-MD V2`;
            
           
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            
            
            await sock.sendMessage(m.chat, {
                text: formattedMsg,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: "IMMU-MD",
                        serverMessageId: 143
                    }
                }
            }, {
                quoted: m
            });
            
        } catch (err) {
            console.error('Error in bible command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to fetch bible verse\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};