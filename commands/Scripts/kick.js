module.exports = {
    name: 'kick',
    alias: ['remove', 'ban'],
    description: 'Kick a member from the group',
    usage: `${global.prefix}kick @user/reply`,
    cooldowns: 10,
    permission: 1,
    dmUser: false,
    run: async ({ sock, m, args, sender }) => {
        try {
            if (!m.isGroup) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ This command can only be used in groups\n' +
                    '╰────────────❒'
                );
            }

            let users = [];
            
            
            if (m.mentionedJid && m.mentionedJid.length > 0) {
                users = m.mentionedJid;
            } 
           
            else if (m.quoted && m.quoted.sender) {
                users.push(m.quoted.sender);
            }
            
            else if (args[0]) {
               
                const userInput = args[0].replace(/[^0-9]/g, '');
                if (userInput) {
                    users.push(`${userInput}@s.whatsapp.net`);
                }
            }

            if (users.length === 0) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Please mention a user or reply to their message\n' +
                    '├⬡ Usage: !kick @user\n' +
                    '╰────────────❒'
                );
            }

            const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            
            
            const isBotAdmin = groupMetadata.participants.some(
                p => p.id === botId && ['admin', 'superadmin'].includes(p.admin)
            );

            if (!isBotAdmin) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Bot must be admin to kick members\n' +
                    '╰────────────❒'
                );
            }

            
            for (const userId of users) {
                const isUserAdmin = groupMetadata.participants.some(
                    p => p.id === userId && ['admin', 'superadmin'].includes(p.admin)
                );

                if (isUserAdmin) {
                    return m.reply(
                        '╭────❒ ❌ Error ❒\n' +
                        '├⬡ Cannot kick an admin\n' +
                        '╰────────────❒'
                    );
                }
            }

            
            await sock.groupParticipantsUpdate(
                m.key.remoteJid,
                users,
                "remove"
            );

            
            const userStr = users.map(u => `@${u.split('@')[0]}`).join(', ');
            
            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `╭────❒ 👢 Kicked ❒\n├⬡ ${userStr} has been removed\n╰────────────❒`,
                    mentions: users
                },
                { quoted: m }
            );

        } catch (err) {
            console.error('Kick error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to kick member\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};