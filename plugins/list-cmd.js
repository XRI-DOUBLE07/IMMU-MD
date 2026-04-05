const config = require('../config')
const { cmd, commands } = require('../command');

cmd({
    pattern: "list",
    alias: ["listcmd","commands"],
    desc: "menu the bot",
    category: "menu",
    react: "📃",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━〔  *DOWNLOAD CMD*〕━━⬣
┃
┃.play
┃.yt
┃.song
┃.apk
┃.video
┃.fb
┃.tk
┃.ig
┃.gdrive
┃.twitter
┃.img
┃.darama
┃.play2
┃.video2
┃.baiscope
┃.mfire
╰━━━━━━━━━━━━━━━⬣

╭━━〔  *INFO CMD* 〕━━⬣
┃
┃.alive
┃.ping
┃.menu
┃.menu2
┃.ai
┃.system
┃.owner
┃.status
┃.about
┃.list
┃.script
╰━━━━━━━━━━━━━━━⬣

╭━〔 *OTHER CMD* 〕━━⬣
┃
┃.joke 
┃.fact
┃.githubstalk 
┃.gpass
┃.hack
┃.srepo 
┃.define 
╰━━━━━━━━━━━━━━━⬣

╭━〔 *GROUP CMD* 〕━━⬣
┃
┃.mute
┃.unmute
┃.left
┃.jid
┃.remove
┃.delete 
┃.add
┃.kick
┃.kickall
┃.setgoodbye
┃.setwelcome 
┃.demote 
┃.tagall
┃.getpic
┃.invite 
┃.revoke 
┃.joinrequests
┃.allreq
┃.lockgc
┃.unlockgc
┃.leave 
┃.updategname
┃.updategdesc
┃.joim
┃.hidetag
┃.ginfo
┃.disappear on
┃.disappear off
┃.senddm
┃.disappear 7d 24h 90d
╰━━━━━━━━━━━━━━━⬣

╭━〔 *OWNER CMD* 〕━━⬣
┃
┃.update
┃.restart 
┃.settings
┃.owner 
┃.repo 
┃.system 
┃.block
┃.unblock 
┃.shutdown 
┃.clearchats 
┃.setpp
┃.broadcast 
┃.jid
┃.gjid 
╰━━━━━━━━━━━━━━━⬣

╭━〔 *CONVERT CMD* 〕━━⬣
┃
┃.sticker
┃.tts
┃.trt 
╰━━━━━━━━━━━━━━━⬣

> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.postimg.cc/MTyQYsmm/Picsart-26-04-05-20-38-22-130.png` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: '𝐈ᴍᴍυ 𝐌ᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/zjdphm.mp3' },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
