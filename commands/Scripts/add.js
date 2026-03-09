module.exports = {
    name: 'add',
    alias: ['invite', 'join'],
    description: 'Add a member to the group',
    usage: `${global.prefix}add number (example: ${global.prefix}add 1234567890)`,
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

            if (!args[0]) {
                return m.reply(
                    '╭────❒ ℹ️ Add Member ❒\n' +
                    '├⬡ Please provide a phone number\n' +
                    `├⬡ Usage: ${global.prefix}add 1234567890\n` +
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
                    '├⬡ Bot must be admin to add members\n' +
                    '╰────────────❒'
                );
            }

            // Process numbers to add
            let users = [];
            for (let i = 0; i < args.length; i++) {
                // Clean the number and ensure it has only digits
                let number = args[i].replace(/[^0-9]/g, '');
                
                // Skip if number is empty
                if (!number) continue;

                // Format the number to WhatsApp ID
                if (number.startsWith('0')) number = number.substring(1);
                if (!number.includes('@s.whatsapp.net')) {
                    number = `${number}@s.whatsapp.net`;
                }

                users.push(number);
            }

            if (users.length === 0) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Invalid phone number format\n' +
                    '╰────────────❒'
                );
            }

            // Add users to group
            const response = await sock.groupParticipantsUpdate(
                m.key.remoteJid, 
                users,
                "add"
            );

            // Check response for successful adds and failures
            let successMessage = '';
            let failMessage = '';
            
            if (Array.isArray(response) && response.length > 0) {
                for (const res of response) {
                    if (res.status === "200") {
                        successMessage += `@${res.jid.split('@')[0]} ✓\n`;
                    } else {
                        failMessage += `@${res.jid.split('@')[0]} ✗\n`;
                    }
                }
            } else {
                // If response format is different, assume success
                successMessage = users.map(u => `@${u.split('@')[0]}`).join('\n');
            }
            
            let resultText = '╭────❒ 👥 Add Results ❒\n';
            
            if (successMessage) {
                resultText += '├⬡ Successfully added:\n' + successMessage;
            }
            
            if (failMessage) {
                resultText += '├⬡ Failed to add:\n' + failMessage;
                resultText += '├⬡ (May be private or invalid number)\n';
            }
            
            resultText += '╰────────────❒';
            
            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: resultText,
                    mentions: users
                },
                { quoted: m }
            );

        } catch (err) {
            console.error('Add error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to add member\n' +
                '├⬡ Number may be private or invalid\n' +
                '╰────────────❒'
            );
        }
    }
};