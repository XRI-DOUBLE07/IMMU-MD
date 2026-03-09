module.exports = {
    name: 'promote',
    alias: ['admin'],
    description: 'Promote a member to admin',
    usage: `${global.prefix}promote @user/reply`,
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
            
            // Get mentioned users
            if (m.mentionedJid && m.mentionedJid.length > 0) {
                users = m.mentionedJid;
            } 
            // If replying to a message
            else if (m.quoted && m.quoted.sender) {
                users.push(m.quoted.sender);
            }
            // If user ID is provided as argument
            else if (args[0]) {
                // Handle the case where number is given without @ symbol
                const userInput = args[0].replace(/[^0-9]/g, '');
                if (userInput) {
                    users.push(`${userInput}@s.whatsapp.net`);
                }
            }

            if (users.length === 0) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Please mention a user or reply to their message\n' +
                    '├⬡ Usage: !promote @user\n' +
                    '╰────────────❒'
                );
            }

            const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            
            // Check if bot is admin
            const isBotAdmin = groupMetadata.participants.some(
                p => p.id === botId && ['admin', 'superadmin'].includes(p.admin)
            );

            if (!isBotAdmin) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Bot must be admin to promote members\n' +
                    '╰────────────❒'
                );
            }

            // Check if users are already admins
            for (const userId of users) {
                const isAlreadyAdmin = groupMetadata.participants.some(
                    p => p.id === userId && ['admin', 'superadmin'].includes(p.admin)
                );

                if (isAlreadyAdmin) {
                    return m.reply(
                        '╭────❒ ❌ Error ❒\n' +
                        '├⬡ User is already an admin\n' +
                        '╰────────────❒'
                    );
                }
            }

            // Promote user
            await sock.groupParticipantsUpdate(
                m.key.remoteJid,
                users,
                "promote"
            );

            // Send success message
            const userStr = users.map(u => `@${u.split('@')[0]}`).join(', ');
            
            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `╭────❒ 👑 Promoted ❒\n├⬡ ${userStr} is now an admin\n╰────────────❒`,
                    mentions: users
                },
                { quoted: m }
            );

        } catch (err) {
            console.error('Promote error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to promote member\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};