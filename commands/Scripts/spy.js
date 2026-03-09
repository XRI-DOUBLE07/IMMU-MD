module.exports = {
    name: 'spy',
    desc: 'Retrieves some public information about a tagged or replied-to user.',
    aliases: ['userinfo', 'profileinfo'],
    category: 'Information',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m }) => {
        const quoted = m.quoted ? m.quoted : m.msg.contextInfo ? m.msg.contextInfo.participant : null;
        const targetId = quoted ? quoted : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

        if (!targetId) {
            return m.reply('╭────❒ 👤 Info ❒\n├⬡ Please tag or reply to a user to get their public information.\n╰────────────❒');
        }

        try {
            const processingMsg = await m.reply('╭────❒ ⏳ Fetching ❒\n├⬡ Retrieving public information...\n╰────────────❒');

            const user = await sock.getUser(targetId);
            const pushName = user?.pushName || 'N/A';
            const jid = user?.jid || targetId;

            let adminStatus = 'Not available in this context.';
            if (m.isGroup) {
                const groupMetadata = await sock.groupMetadata(m.chat);
                const participant = groupMetadata.participants.find(p => p.id === targetId);
                adminStatus = participant?.admin === 'admin' || participant?.admin === 'superadmin' ? 'Yes' : 'No';
            }

            const profilePictureUrl = await sock.profilePictureUrl(targetId, 'image').catch(() => null);

            let message = `
╭────❒ 👤 Public User Info 👤 ❒────
├⬡ Name: ${pushName}
├⬡ JID: ${jid}
├⬡ Admin in this group: ${adminStatus}
`;

            if (profilePictureUrl) {
                await sock.sendMessage(m.chat, { image: { url: profilePictureUrl }, caption: message }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: message }, { quoted: m });
            }

            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('Error fetching user info:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            m.reply('╭────❒ ❌ Error ❒\n├⬡ Could not retrieve public information for this user.\n╰────────────❒');
        }
    },
};