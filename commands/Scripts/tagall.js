module.exports = {
    name: 'tagall',
    desc: 'Tag all members in the group',
    aliases: ['everyone', 'all', 'mention'],
    category: 'Admin',
    cooldown: 10,
    permission: 1,
category: 'admin',
    dmUser: false,
    run: async ({ sock, m, args }) => {
        try {
            if (!m.isGroup) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ This command can only be used in groups\n' +
                    '╰────────────❒'
                );
            }

            const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
            const participants = groupMetadata.participants;
            
            const message = args.join(' ') || 'Hello everyone it's efprime md by frank dev!';
            
            let mentions = participants.map(p => p.id);
            let mentionText = `╭────❒ 📢 Announcement ❒\n`;
            mentionText += `├⬡ *${message}*\n`;
            mentionText += `╰────────────❒\n\n`;
            
            for (let member of participants) {
                mentionText += `@${member.id.split('@')[0]}\n`;
            }
            
            await sock.sendMessage(
                m.key.remoteJid,
                { 
                    text: mentionText,
                    mentions: mentions
                },
                { quoted: m }
            );
            
        } catch (err) {
            console.error('TagAll error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to tag members\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};