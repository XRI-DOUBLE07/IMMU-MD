module.exports = {
    name: 'close',
    desc: 'Close the group (only admins can send messages)',
    aliases: [],
    category: 'Admin',
    cooldown: 5,
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
            const isAdmin = participants.find(p => p.id === m.sender)?.admin === 'admin' || participants.find(p => p.id === m.sender)?.admin === 'superadmin';
            
            if (!isAdmin) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ This command can only be used by admins\n' +
                    '╰────────────❒'
                );
            }
            
            await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
            
            await m.reply(
                `╭────❒ ✅ Success ❒\n` +
                `├⬡ Group has been closed\n` +
                `╰────────────❒`
            );
            
        } catch (err) {
            console.error('Close group error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to close group\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};