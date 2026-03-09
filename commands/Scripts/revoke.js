module.exports = {
    name: 'revoke',
    alias: ['resetlink', 'resetgclink', 'newlink'],
    description: 'Revoke and reset the group invite link',
    usage: `${global.prefix}revoke`,
    cooldowns: 10,
    permission: 1,
category: 'admin',
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
                    '├⬡ Bot must be admin to revoke invite link\n' +
                    '╰────────────❒'
                );
            }

            // Revoke invite link
            await sock.groupRevokeInvite(m.key.remoteJid);
            
            // Get new code
            const newCode = await sock.groupInviteCode(m.key.remoteJid);
            const newInviteLink = `https://chat.whatsapp.com/${newCode}`;
            
            await m.reply(
                '╭────❒ 🔄 Link Revoked ❒\n' +
                '├⬡ Group invite link has been reset\n' +
                `├⬡ New link: ${newInviteLink}\n` +
                '╰────────────❒'
            );

        } catch (err) {
            console.error('Revoke error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to revoke group link\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};