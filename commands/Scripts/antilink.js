module.exports = {
    name: 'antilink',
    alias: ['antilinkmode'],
    description: 'Toggle antilink mode for the group',
    usage: `${global.prefix}antilink on/off`,
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

            const groupId = m.key.remoteJid;
            
            // Initialize db structure if not exists
            if (!global.db) global.db = {};
            if (!global.db.groups) global.db.groups = {};
            if (!global.db.groups[groupId]) {
                global.db.groups[groupId] = {
                    antilink: false,
                    warnedUsers: {}
                };
            }

            if (!args[0] || !['on', 'off'].includes(args[0].toLowerCase())) {
                const status = global.db.groups[groupId].antilink ? 'ON' : 'OFF';
                return m.reply(
                    '╭────❒ ℹ️ Antilink Status ❒\n' +
                    `├⬡ Current status: ${status}\n` +
                    `├⬡ Usage: ${global.prefix}antilink on/off\n` +
                    '╰────────────❒'
                );
            }

            const isEnable = args[0].toLowerCase() === 'on';
            global.db.groups[groupId].antilink = isEnable;
            
            await m.reply(
                '╭────❒ ✅ Antilink Mode ❒\n' +
                `├⬡ Antilink has been ${isEnable ? 'activated' : 'deactivated'}\n` +
                '╰────────────❒'
            );

        } catch (err) {
            console.error('Antilink toggle error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to toggle antilink mode\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};

module.exports.event = async function ({ sock, m, sender }) {
    try {
        if (!m.isGroup) return;
        
        const groupId = m.key.remoteJid;
        
        // Initialize db structure if not exists
        if (!global.db) global.db = {};
        if (!global.db.groups) global.db.groups = {};
        if (!global.db.groups[groupId]) global.db.groups[groupId] = { antilink: false, warnedUsers: {} };
        
        // If antilink is not enabled for this group, return early
        if (!global.db.groups[groupId].antilink) {
            return;
        }

        const body = (
            m.mtype === 'conversation' && m.message.conversation ||
            m.mtype === 'imageMessage' && m.message.imageMessage.caption ||
            m.mtype === 'documentMessage' && m.message.documentMessage.caption ||
            m.mtype === 'videoMessage' && m.message.videoMessage.caption ||
            m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text
        ) || '';

        const linkRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        
        if (!linkRegex.test(body)) return;

        const groupMetadata = await sock.groupMetadata(groupId);
        
        const isSenderAdmin = groupMetadata.participants.some(
            p => p.id === sender && ['admin', 'superadmin'].includes(p.admin)
        );
        
        if (isSenderAdmin) return;
        
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        
        const isBotAdmin = groupMetadata.participants.some(
            p => p.id === botId && ['admin', 'superadmin'].includes(p.admin)
        );
        
        if (!isBotAdmin) {
            return m.reply(
                '╭────❒ ⚠️ Warning ❒\n' +
                '├⬡ Link detected but I need admin rights\n' +
                '├⬡ to delete messages and remove users\n' +
                '╰────────────❒'
            );
        }

        await sock.sendMessage(groupId, { delete: m.key });
        
        if (!global.db.groups[groupId].warnedUsers) {
            global.db.groups[groupId].warnedUsers = {};
        }
        
        if (!global.db.groups[groupId].warnedUsers[sender]) {
            global.db.groups[groupId].warnedUsers[sender] = 1;
            
            await sock.sendMessage(
                groupId,
                {
                    text: `╭────❒ ⚠️ Warning (1/2) ❒\n├⬡ @${sender.split('@')[0]} please don't send links\n├⬡ Next violation will result in another warning\n╰────────────❒`,
                    mentions: [sender]
                }
            );
            
        } else if (global.db.groups[groupId].warnedUsers[sender] === 1) {
            global.db.groups[groupId].warnedUsers[sender] = 2;
            
            await sock.sendMessage(
                groupId,
                {
                    text: `╭────❒ ⚠️ Final Warning (2/2) ❒\n├⬡ @${sender.split('@')[0]} please don't send links\n├⬡ Next violation will result in removal\n╰────────────❒`,
                    mentions: [sender]
                }
            );
            
        } else {
            await sock.groupParticipantsUpdate(
                groupId,
                [sender],
                "remove"
            );
            
            delete global.db.groups[groupId].warnedUsers[sender];
            
            await sock.sendMessage(
                groupId,
                {
                    text: `╭────❒ 🚫 User Removed ❒\n├⬡ @${sender.split('@')[0]} was removed for\n├⬡ repeatedly sending links\n╰────────────❒`,
                    mentions: [sender]
                }
            );
        }
        
    } catch (err) {
        console.error('Antilink event error:', err);
    }
};