module.exports = {
    name: 'link',
    alias: ['grouplink', 'gclink', 'invitelink'],
    description: 'Get the group invite link',
    usage: `${global.prefix}link`,
    cooldowns: 10,
category: 'admin',
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

            const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            
            // Check if bot is admin
            const isBotAdmin = groupMetadata.participants.some(
                p => p.id === botId && ['admin', 'superadmin'].includes(p.admin)
            );

            if (!isBotAdmin) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Bot must be admin to get invite link\n' +
                    '╰────────────❒'
                );
            }

            const code = await sock.groupInviteCode(m.key.remoteJid);
            const inviteLink = `https://chat.whatsapp.com/${code}`;
            
            await m.reply(
                '╭────❒ 🔗 Group Link ❒\n' +
                `├⬡ ${groupMetadata.subject}\n` +
                `├⬡ ${inviteLink}\n` +
                '╰────────────❒'
            );

        } catch (err) {
            console.error('Link error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to get group link\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};