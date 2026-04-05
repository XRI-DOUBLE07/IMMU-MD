const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path'); 
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu2",
    alias: ["allmenu","fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "menu",
    react: "📜",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 🚀 *${config.BOT_NAME}* 〕━━┈⬣
┃◈╭─────────────────⬣
┃◈┃• 👑 Owner : *${config.OWNER_NAME}*
┃◈┃• ⚙️ Prefix : *[${config.PREFIX}]*
┃◈╰─────────────────┈⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 📥 *DOWNLOAD MENU* 〕━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🟦 ғᴀᴄʙᴏᴏᴋ
┃◈┃• 📁 ᴍᴇᴅɪᴀғɪʀᴇ
┃◈┃• 🎵 ᴛɪᴋᴛᴏᴋ
┃◈┃• 🐦 ᴛᴡɪᴛᴛᴇʀ
┃◈┃• 📷 ɪɴsᴛᴀ
┃◈┃• 📦 ᴀᴘᴋ
┃◈┃• 🖼️ ɪᴍɢ
┃◈┃• ▶️ ᴛᴛ2
┃◈┃• 📌 ᴘɪɴs
┃◈┃• 🔄 ᴀᴘᴋ2
┃◈┃• 🔵 ғʙ2
┃◈┃• 📍 ᴘɪɴᴛᴇʀᴇsᴛ
┃◈┃• 🎶 sᴘᴏᴛɪғʏ
┃◈┃• 🎧 ᴘʟᴀʏ
┃◈┃• 🎧 ᴘʟᴀʏ2
┃◈┃• 🔉 ᴀᴅɪᴏᴜ
┃◈┃• 🎬 ᴠɪᴅᴇᴏ
┃◈┃• 📹 ᴠɪᴅᴇᴏ2
┃◈┃• 🎵 ʏᴛᴍᴘ3
┃◈┃• 📹 ʏᴛᴍᴏ4
┃◈┃• 🎶 sᴏɴɢ
┃◈┃• 🎬 ᴅᴀʀᴀᴍᴀ
┃◈┃• ☁️ ɢᴅʀɪᴠᴇ
┃◈┃• 🌐 ssᴡᴇʙ
┃◈┃• 🎵 ᴛɪᴋs
┃◈╰─────────────────┈⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 👥 *GROUP MENU* 〕━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🔗 ɢʀᴏᴜᴘʟɪɴᴋ
┃◈┃• 🚪 ᴋɪᴄᴋᴀʟʟ
┃◈┃• 🚷 ᴋɪᴄᴋᴀʟʟ2
┃◈┃• 🚫 ᴋᴀᴄᴋᴀʟʟ3
┃◈┃• ➕ ᴀᴅᴅ
┃◈┃• ➖ ʀᴇᴍᴏᴠᴇ
┃◈┃• 👢 ᴋɪᴄᴋ
┃◈┃• ⬆️ ᴘʀᴏᴍᴏᴛᴇ
┃◈┃• ⬇️ ᴅᴇᴍᴏᴛᴇ
┃◈┃• 🚮 ᴅɪsᴍɪs
┃◈┃• 🔄 ʀᴇᴠᴏᴋᴇ
┃◈┃• 👋 sᴇᴛɢᴏᴏᴅʙʏ
┃◈┃• 🎉 sᴇᴛᴡᴇʟʟᴄᴏᴍᴇ
┃◈┃• 🗑️ ᴅᴇʟᴇᴛᴇ
┃◈┃• 🖼️ ɢᴇᴛᴘɪᴄ
┃◈┃• ℹ️ ɢɪɴғᴏ
┃◈┃• ⏳ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏɴ
┃◈┃• ⏳ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏғғ
┃◈┃• ⏳ ᴅɪsᴀᴘᴘᴇᴀʀ 7ᴅ,24ʜ
┃◈┃• 📝 ᴀʟʟʀᴇǫ
┃◈┃• ✏️ uᴜᴏᴅᴀᴛᴇɴᴀᴍᴇ
┃◈┃• 📝 ᴜᴏᴅᴀᴛᴇᴅᴇsᴄ
┃◈┃• 📩 ᴊᴏɪɴʀᴇǫᴜsᴛ
┃◈┃• 📨 sᴀɴᴅᴅᴍ
┃◈┃• 🏃 nikal
┃◈┃• 🔇 mute
┃◈┃• 🔊 unmute
┃◈┃• 🔒 lockgc
┃◈┃• 🔓 unlockgc
┃◈┃• 📩 invite
┃◈┃• #️⃣ tag
┃◈┃• 🏷️ hidetag
┃◈┃• @️⃣ tagall
┃◈┃• 👔 tagadmins
┃◈╰─────────────────┈⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🎭 *REACTIONS MENU* 〕━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 👊 bully @tag
┃◈┃• 🤗 cuddle @tag
┃◈┃• 😢 cry @tag
┃◈┃• 🤗 hug @tag
┃◈┃• 🐺 awoo @tag
┃◈┃• 💋 kiss @tag
┃◈┃• 👅 lick @tag
┃◈┃• 🖐️ pat @tag
┃◈┃• 😏 smug @tag
┃◈┃• 🔨 bonk @tag
┃◈┃• 🚀 yeet @tag
┃◈┃• 😊 blush @tag
┃◈┃• 😄 smile @tag
┃◈┃• 👋 wave @tag
┃◈┃• ✋ highfive @tag
┃◈┃• 🤝 handhold @tag
┃◈┃• 🍜 nom @tag
┃◈┃• 🦷 bite @tag
┃◈┃• 🤗 glomp @tag
┃◈┃• 👋 slap @tag
┃◈┃• 💀 kill @tag
┃◈┃• 😊 happy @tag
┃◈┃• 😉 wink @tag
┃◈┃• 👉 poke @tag
┃◈┃• 💃 dance @tag
┃◈┃• 😬 cringe @tag
┃◈╰─────────────────┈⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🎨 *LOGO MAKER* 〕━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 💡 neonlight
┃◈┃• 🎀 blackpink
┃◈┃• 🐉 dragonball
┃◈┃• 🎭 3dcomic
┃◈┃• 🇺🇸 america
┃◈┃• 🍥 naruto
┃◈┃• 😢 sadgirl
┃◈┃• ☁️ clouds
┃◈┃• 🚀 futuristic
┃◈┃• 📜 3dpaper
┃◈┃• ✏️ eraser
┃◈┃• 🌇 sunset
┃◈┃• 🍃 leaf
┃◈┃• 🌌 galaxy
┃◈┃• 💀 sans
┃◈┃• 💥 boom
┃◈┃• 💻 hacker
┃◈┃• 😈 devilwings
┃◈┃• 🇳🇬 nigeria
┃◈┃• 💡 bulb
┃◈┃• 👼 angelwings
┃◈┃• ♈ zodiac
┃◈┃• 💎 luxury
┃◈┃• 🎨 paint
┃◈┃• ❄️ frozen
┃◈┃• 🏰 castle
┃◈┃• 🖋️ tatoo
┃◈┃• 🔫 valorant
┃◈┃• 🐻 bear
┃◈┃• 🔠 typography
┃◈┃• 🎂 birthday
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 👑 *OWNER MENU* 〕━━┈⊷
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 👑 owner
┃◈┃• 📜 menu
┃◈┃• 📜 menu2
┃◈┃• 📊 vv
┃◈┃• 📋 listcmd
┃◈┃• 📚 allmenu
┃◈┃• 📦 repo
┃◈┃• 🚫 block
┃◈┃• ✅ unblock
┃◈┃• 🖼️ fullpp
┃◈┃• 🖼️ setpp
┃◈┃• 🔄 restart
┃◈┃• ⏹️ shutdown
┃◈┃• 🔄 updatecmd
┃◈┃• 💚 alive
┃◈┃• 🏓 ping
┃◈┃• 🆔 gjid
┃◈┃• 🆔 jid
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🎉 *FUN MENU* 〕━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🤪 shapar
┃◈┃• ⭐ rate
┃◈┃• 🤬 insult
┃◈┃• 💻 hack
┃◈┃• 💘 ship
┃◈┃• 🎭 character
┃◈┃• 💌 pickup
┃◈┃• 😆 joke
┃◈┃• ❤️ hrt
┃◈┃• 😊 hpy
┃◈┃• 😔 syd
┃◈┃• 😠 anger
┃◈┃• 😳 shy
┃◈┃• 💋 kiss
┃◈┃• 🧐 mon
┃◈┃• 😕 cunfuzed
┃◈┃• 🖼️ setpp
┃◈┃• ✋ hand
┃◈┃• 🏃 nikal
┃◈┃• 🤲 hold
┃◈┃• 🤗 hug
┃◈┃• 🏃 nikal
┃◈┃• 🎵 hifi
┃◈┃• 👉 poke
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🔄 *CONVERT MENU* 〕━━⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🏷️ sticker
┃◈┃• 🏷️ sticker2
┃◈┃• 😀 emojimix
┃◈┃• ✨ fancy
┃◈┃• 🖼️ take
┃◈┃• 🎵 tomp3
┃◈┃• 🗣️ tts
┃◈┃• 🌐 trt
┃◈┃• 🔢 base64
┃◈┃• 🔠 unbase64
┃◈┃• 010 binary
┃◈┃• 🔤 dbinary
┃◈┃• 🔗 tinyurl
┃◈┃• 🌐 urldecode
┃◈┃• 🌐 urlencode
┃◈┃• 🌐 url
┃◈┃• 🔁 repeat
┃◈┃• ❓ ask
┃◈┃• 📖 readmore
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🤖 *AI MENU* 〕━━⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🧠 ai
┃◈┃• 🤖 gpt3
┃◈┃• 🤖 gpt2
┃◈┃• 🤖 gptmini
┃◈┃• 🤖 gpt
┃◈┃• 🔵 meta
┃◈┃• 📦 blackbox
┃◈┃• 🌈 luma
┃◈┃• 🎧 dj
┃◈┃• 👑 DARKZONE 
┃◈┃• 🤵 IRFAN 
┃◈┃• 🧠 gpt4
┃◈┃• 🔍 bing
┃◈┃• 🎨 imagine
┃◈┃• 🖼️ imagine2
┃◈┃• 🤖 copilot
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━〔 ⚡ *MAIN MENU* 〕━━⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🏓 ping
┃◈┃• 🏓 ping2
┃◈┃• 🚀 speed
┃◈┃• 📡 live
┃◈┃• 💚 alive
┃◈┃• ⏱️ runtime
┃◈┃• ⏳ uptime
┃◈┃• 📦 repo
┃◈┃• 👑 owner
┃◈┃• 📜 menu
┃◈┃• 📜 menu2
┃◈┃• 🔄 restart
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━〔 🎎 *ANIME MENU* 〕━━⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🤬 fack
┃◈┃• ✅ truth
┃◈┃• 😨 dare
┃◈┃• 🐶 dog
┃◈┃• 🐺 awoo
┃◈┃• 👧 garl
┃◈┃• 👰 waifu
┃◈┃• 🐱 neko
┃◈┃• 🧙 megnumin
┃◈┃• 🐱 neko
┃◈┃• 👗 maid
┃◈┃• 👧 loli
┃◈┃• 🎎 animegirl
┃◈┃• 🎎 animegirl1
┃◈┃• 🎎 animegirl2
┃◈┃• 🎎 animegirl3
┃◈┃• 🎎 animegirl4
┃◈┃• 🎎 animegirl5
┃◈┃• 🎬 anime1
┃◈┃• 🎬 anime2
┃◈┃• 🎬 anime3
┃◈┃• 🎬 anime4
┃◈┃• 🎬 anime5
┃◈┃• 📰 animenews
┃◈┃• 🦊 foxgirl
┃◈┃• 🍥 naruto
┃◈╰─────────────────⬣
╰━━━━━━━━━━━━━━━━━━━┈⬣

╭━━━━〔 ℹ️ *OTHER MENU* 〕━━━┈⬣
┃◈╭━━━━━━━━━━━━━━━━━━⬣
┃◈┃• 🕒 timenow
┃◈┃• 📅 date
┃◈┃• 🔢 count
┃◈┃• 🧮 calculate
┃◈┃• 🔢 countx
┃◈┃• 🎲 flip
┃◈┃• 🪙 coinflip
┃◈┃• 🎨 rcolor
┃◈┃• 🎲 roll
┃◈┃• ℹ️ fact
┃◈┃• 💻 cpp
┃◈┃• 🎲 rw
┃◈┃• 💑 pair
┃◈┃• 💑 pair2
┃◈┃• 💑 pair3
┃◈┃• ✨ fancy
┃◈┃• 🎨 logo <text>
┃◈┃• 📖 define
┃◈┃• 📰 news
┃◈┃• 🎬 movie
┃◈┃• ☀️ weather
┃◈┃• 📦 srepo
┃◈┃• 🤬 insult
┃◈┃• 💾 save
┃◈┃• 🌐 wikipedia
┃◈┃• 🔑 gpass
┃◈┃• 👤 githubstalk
┃◈┃• 🔍 yts
┃◈┃• 📹 ytv
┃◈╰━━━━━━━━━━━━━━━⬣
╰━━━━━━━━━━━━━━━━━━━━⬣
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://i.postimg.cc/MTyQYsmm/Picsart-26-04-05-20-38-22-130.png' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: 'https://i.postimg.cc/MTyQYsmm/Picsart-26-04-05-20-38-22-130.png',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );
// share local audio 

const audioPath = path.join(__dirname, '../assets/menu.m4a');
await conn.sendMessage(from, {
    audio: fs.readFileSync(audioPath),
    mimetype: 'audio/mp4',
    ptt: false,
}, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
