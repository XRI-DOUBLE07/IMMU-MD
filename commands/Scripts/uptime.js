const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {
    name: 'uptime',
    desc: 'Displays bot uptime status with an image',
    aliases: ['alive', 'runtime'],
    category: 'General',
    cooldown: 5,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m }) => {
        try {
            
            const uptimeSeconds = process.uptime();
            const days = Math.floor(uptimeSeconds / (3600 * 24));
            const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeSeconds % 60);
            
            
            const ramUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
            
            
            const instagram = "imadalidir";
            const github = "XRI-DOUBLE07";
            const facebook = "imadalidir";
            const botName = "IMMU MD";
            
            
            const apiUrl = `https://kaiz-apis.gleeze.com/api/uptime?instag=${instagram}&ghub=${github}&fb=${facebook}&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${encodeURIComponent(botName)}`;
            
            
            const statusMessage = `╭────❒ *🤖 ${botName}* ❒
├⬡ ✅ *Online & Operational*
├⬡ ⏱️ *Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s*
├⬡ 🌐 *Prefix: ${global.prefix || '/'}*
├⬡ ⚡ *Server: Active*
├⬡ 🔋 *RAM: ${ramUsage}MB*
╰────────────❒

BOT ＢＹ I M A D - A L I`;
            
            try {
                
                await sock.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: statusMessage,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363341506278064@newsletter',
                            newsletterName: "IMMU MD",
                            serverMessageId: 143
                        }
                    }
                }, {
                    quoted: m
                });
            } catch (error) {
                console.error("Error fetching uptime image:", error);
                
                
                await sock.sendMessage(m.chat, {
                    text: `${statusMessage}\n\n⚠️ Image generation failed`,
                    contextInfo: {
                        mentionedJid: [m.sender]
                    }
                }, {
                    quoted: m
                });
            }
        } catch (err) {
            console.error('Error in uptime command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while processing the command\n' +
                '╰────────────❒'
            );
        }
    }
};