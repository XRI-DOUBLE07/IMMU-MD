module.exports = {
    name: 'prefix',
    desc: 'Shows the current bot prefix',
    category: 'general',
    cooldown: 3,
    permission: 0,
    dmUser: true,
    isNonPrefix: true, 
    run: async ({ sock, m, botNumber }) => {
        const prefixMessage = `🤖 *Bot Prefix*\n\n` +
            `Current prefix: \*${global.prefix}\*\n
To change prefix use ${global.prefix}setprefix newprefix`;
            
        await sock.sendMessage(m.key.remoteJid, { text: prefixMessage }, { quoted: m });
    }
};