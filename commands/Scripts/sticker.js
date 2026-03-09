// Frank dev




















const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const tmpFolder = path.resolve(__dirname, './temp');

if (!fs.existsSync(tmpFolder)) {
  fs.mkdirSync(tmpFolder);
}

module.exports = {
    name: 'sticker',
    desc: 'Convert image or video to WhatsApp sticker',
    aliases: ['s', 'stiker', 'stk'],
    category: 'Media',
    cooldown: 3,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            if (!m.quoted && !(m.msg && m.msg.mimetype)) {
                return m.reply(
                    '╭────❒ ℹ️ Sticker Maker ❒\n' +
                    '├⬡ Reply to an image or video\n' +
                    '├⬡ Usage: !sticker or !s\n' +
                    '╰────────────❒'
                );
            }
            
            const stickerAuthor = "IMMU | IMMU MD";
            const stickerPackName = args.join(' ') || "IMMU MD";
            
            const quoted = m.quoted ? m.quoted : m;
            const mime = quoted.mimetype || '';
            
            if (!/image|video|webp/.test(mime)) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Please reply to an image or video\n' +
                    '├⬡ Supported formats: jpg, png, mp4, webp\n' +
                    '╰────────────❒'
                );
            }
            
            let mediaData;
            let buffer;
            
            try {
                if (quoted.isAnimated || quoted.message?.imageMessage || quoted.message?.videoMessage) {
                    const stream = await downloadContentFromMessage(quoted.message.imageMessage || quoted.message.videoMessage || quoted.message.stickerMessage, mime.split('/')[0]);
                    buffer = Buffer.alloc(0);
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk]);
                    }
                } else {
                    buffer = await quoted.download();
                }
            } catch (e) {
                console.error('Error downloading media:', e);
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Failed to download media\n' +
                    '├⬡ Please try again later\n' +
                    '╰────────────❒'
                );
            }
            
            const timestamp = new Date().getTime();
            const tempFilePath = path.join(tmpFolder, `temp_${timestamp}`);
            const outputPath = path.join(tmpFolder, `sticker_${timestamp}.webp`);
            
            if (/video/.test(mime)) {
                
                fs.writeFileSync(`${tempFilePath}.mp4`, buffer);
                
                const maxDuration = 10; 
                
                ffmpeg.ffprobe(`${tempFilePath}.mp4`, async (err, metadata) => {
                    if (err) {
                        console.error('Error reading video metadata:', err);
                        return m.reply(
                            '╭────❒ ❌ Error ❒\n' +
                            '├⬡ Failed to process video\n' +
                            '├⬡ Please try again with a different video\n' +
                            '╰────────────❒'
                        );
                    }
                    
                    const duration = metadata.format.duration;
                    
                    if (duration > maxDuration) {
                        fs.unlinkSync(`${tempFilePath}.mp4`);
                        return m.reply(
                            '╭────❒ ❌ Video Too Long ❒\n' +
                            `├⬡ Video must be ${maxDuration} seconds or less\n` +
                            `├⬡ Your video is ${Math.round(duration)} seconds\n` +
                            '╰────────────❒'
                        );
                    }
                    
                    exec(`ffmpeg -i ${tempFilePath}.mp4 -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15" -vcodec libwebp -filter:v fps=fps=15 -lossless 0 -compression_level 5 -q:v 65 -loop 0 -preset default -an -vsync 0 ${outputPath}`, async (error) => {
                        fs.unlinkSync(`${tempFilePath}.mp4`);
                        
                        if (error) {
                            console.error('Error converting video to sticker:', error);
                            return m.reply(
                                '╭────❒ ❌ Error ❒\n' +
                                '├⬡ Failed to convert video to sticker\n' +
                                '├⬡ Please try again with a different video\n' +
                                '╰────────────❒'
                            );
                        }
                        
                        await sock.sendMessage(m.chat, { 
                            sticker: { url: outputPath },
                            packname: stickerPackName,
                            author: stickerAuthor
                        }, { quoted: m });
                        
                        fs.unlinkSync(outputPath);
                    });
                });
                
            } else if (/image/.test(mime)) {
                
                fs.writeFileSync(`${tempFilePath}.jpeg`, buffer);
                
                exec(`ffmpeg -i ${tempFilePath}.jpeg -vf scale=512:512 -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${outputPath}`, async (error) => {
                    fs.unlinkSync(`${tempFilePath}.jpeg`);
                    
                    if (error) {
                        console.error('Error converting image to sticker:', error);
                        return m.reply(
                            '╭────❒ ❌ Error ❒\n' +
                            '├⬡ Failed to convert image to sticker\n' +
                            '├⬡ Please try again with a different image\n' +
                            '╰────────────❒'
                        );
                    }
                    
                    await sock.sendMessage(m.chat, { 
                        sticker: { url: outputPath },
                        packname: stickerPackName,
                        author: stickerAuthor
                    }, { quoted: m });
                    
                    fs.unlinkSync(outputPath);
                });
                
            } else if (/webp/.test(mime)) {
                
                fs.writeFileSync(outputPath, buffer);
                
                await sock.sendMessage(m.chat, { 
                    sticker: { url: outputPath },
                    packname: stickerPackName,
                    author: stickerAuthor
                }, { quoted: m });
                
                fs.unlinkSync(outputPath);
            }
            
        } catch (err) {
            console.error('Error in sticker command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while processing the command\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};