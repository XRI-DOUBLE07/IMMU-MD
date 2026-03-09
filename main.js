process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)
require('./settings');
const fs = require('fs');
const os = require('os');
const qs = require('qs');
const util = require('util');
const gis = require('g-i-s');
const jimp = require('jimp');
const path = require('path');
const https = require('https');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const cron = require('node-cron');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const FileType = require('file-type');
const { Chess } = require('chess.js');
const google = require('googlethis');
const Qasim = require('api-qasim');
const similarity = require('similarity');
const PDFDocument = require('pdfkit');
const webp = require('node-webpmux');
const ffmpeg = require('fluent-ffmpeg');
const speed = require('performance-now');
const didYouMean = require('didyoumean');
const { performance } = require('perf_hooks');
const moment = require('moment-timezone');
const translate = require('translate-google-api');
const { Akinator, AkinatorAnswer } = require('aki-api');
const PhoneNum = require('awesome-phonenumber');
const { exec, spawn, execSync } = require('child_process');
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys');

const menfesTimeouts = new Map();
const TicTacToe = require('./lib/tictactoe');
const { antiSpam } = require('./src/antispam');
const templateMenu = require('./lib/template_menu');
const { TelegraPh, UguuSe } = require('./lib/uploader');
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { GroupUpdate, LoadDataBase } = require('./src/message');
const { JadiBot, StopJadiBot, ListJadiBot } = require('./src/frankbot');
const { imageToWebp, videoToWebp, gifToWebp, writeExif } = require('./lib/exif');
const { cmdAdd, cmdDel, cmdAddHit, addExpired, getPosition, getExpired, getStatus, checkStatus, getAllExpired, checkExpired } = require('./src/database');
const { rdGame, iGame, tGame, gameSlot, gameCasinoSolo, gameSamgongSolo, gameMerampok, gameBegal, daily, buy, setLimit, addLimit, addMoney, setMoney, transfer, Blackjack, SnakeLadder } = require('./lib/game');
const { pinterest, wallpaper, remini, wikimedia, hitamkan, yanzGpt, mediafireDl, ringtone, styletext, instagramDl, tiktokDl, facebookDl, instaStalk, telegramStalk, tiktokStalk, genshinStalk, instaStory, bk9Ai, spotifyDl, ytMp4, ytMp3, NvlGroup, quotedLyo, youSearch, gptLogic, savetube, simi, geminiAi } = require('./lib/screaper');
const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, errorCache, normalize, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, convertTimestampToDate, getAllHTML, tarBackup } = require('./lib/function');

module.exports = qasim = async (qasim, m, msg, store, groupCache) => {
	try {
		
		await LoadDataBase(qasim, m);
		await GroupUpdate(qasim, m, store);
		const botNumber = await qasim.decodeJid(qasim.user.id)
		const body = ((m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'reactionMessage') ? m.message.reactionMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'interactiveResponseMessage'  && m.quoted && m.quoted.fromMe) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || '') :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '') || '';
		const budy = (typeof m.text == 'string' ? m.text : '')
const owner = ["923493114170", "923493114170"];
const isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')).includes(m.sender);
const isCreator = isOwner;
const cases = db.cases ? db.cases : (db.cases = [...fs.readFileSync('./main.js', 'utf-8').matchAll(/case\s+['"]([^'"]+)['"]/g)].map(match => match[1]));
const prefix = isCreator ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body?.startsWith(a)) || '') : db.set[botNumber].multiprefix ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body?.startsWith(a)) || '¿') : listprefix.find(a => body?.startsWith(a)) || '¿'
		const isCmd = body.startsWith(prefix)
		const args = body.trim().split(/ +/).slice(1)
		const quoted = m.quoted ? m.quoted : m
		const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
                const timezone = global.timezone
		const hari = moment.tz(timezone).locale('en').format('dddd');
		const tanggal = moment.tz(timezone).locale('en').format('DD/MM/YYYY');
		const jam = moment.tz(timezone).locale('en').format('HH:mm:ss');
		const ucapanWaktu = jam < '05:00:00' ? 'Good Early Morning 🌉' : jam < '11:00:00' ? 'Good Morning 🌄' : jam < '15:00:00' ? 'Good Afternoon 🏙' : jam < '18:00:00' ? 'Good Evening 🌅' : jam < '19:00:00' ? 'Good Evening 🌃' : jam < '23:59:00' ? 'Good Night 🌌' : 'Good Night 🌌';
		const almost = 0.72
		const time = Date.now()
		const time_now = new Date()
		const time_end = 60000 - (time_now.getSeconds() * 1000 + time_now.getMilliseconds());
		const readmore = String.fromCharCode(8206).repeat(999)
		const setv = pickRandom(listv)
		
		// Read Database
		const sewa = db.sewa
		const premium = db.premium
		const set = db.set[botNumber]
		
		// Database Game
		let suit = db.game.suit
		let chess = db.game.chess
		let chat_ai = db.game.chat_ai
		let menfes = db.game.menfes
		let tekateki = db.game.tekateki
		let akinator = db.game.akinator
		let tictactoe = db.game.tictactoe
		let tebaklirik = db.game.tebaklirik
		let kuismath = db.game.kuismath
		let blackjack = db.game.blackjack
		let tebaklagu = db.game.tebaklagu
		let tebakkata = db.game.tebakkata
		let family100 = db.game.family100
		let susunkata = db.game.susunkata
		let tebakbom = db.game.tebakbom
		let ulartangga = db.game.ulartangga
		let tebakkimia = db.game.tebakkimia
		let caklontong = db.game.caklontong
		let tebakangka = db.game.tebakangka
		let tebaknegara = db.game.tebaknegara
		let tebakgambar = db.game.tebakgambar
		let tebakbendera = db.game.tebakbendera
		
		const isVip = db.users[m.sender] ? db.users[m.sender].vip : false
		const isBan = db.users[m.sender] ? db.users[m.sender].ban : false
		const isLimit = db.users[m.sender] ? (db.users[m.sender].limit > 0) : false
		const isPremium = isCreator || checkStatus(m.sender, premium) || false
		const isNsfw = m.isGroup ? db.groups[m.chat].nsfw : false
		const apikey = 'APIKEY';
		
		// Fake
		const fkontak = {
			key: {
				remoteJid: '0@s.whatsapp.net',
				participant: '0@s.whatsapp.net',
				fromMe: false,
				id: 'Qasim'
			},
			message: {
				contactMessage: {
					displayName: (m.pushName || author),
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || author},;;;\nFN:${m.pushName || author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					sendEphemeral: true
				}
			}
		}
		
// Reset Limit
// Reset Limit
cron.schedule('00 00 * * *', async () => {
	// cmdDel(db.hit);
	console.log('Reseted Limit Users')
	
	if (set?.autobackup) {
		let datanya = './database/' + tempatDB;
		if (tempatDB.startsWith('mongodb')) {
			datanya = './database/backup_database.json';
			fs.writeFileSync(datanya, JSON.stringify(global.db, null, 2), 'utf-8');
		}
		let tglnya = new Date().toISOString().replace(/[:.]/g, '-');
		for (let o of owner) {
			try {
				await qasim.sendMessage(o, { document: fs.readFileSync(datanya), mimetype: 'application/json', fileName: tglnya + '_database.json' })
				console.log(`[AUTO BACKUP] Backup successfully sent to ${o}`);
			} catch (e) {
				console.error(`[AUTO BACKUP] Failed to send backup to ${o}:`, e);
			}
		}
	}
}, {
	scheduled: true,
	timezone: global.timezone
});

// Auto Set Bio
if (set.autobio) {
	if (new Date() * 1 - set.status > 60000) {
		await qasim.updateProfileStatus(`${qasim.user.name} | 🎯 Runtime : ${runtime(process.uptime())}`).catch(e => {})
		set.status = new Date() * 1
	}
}

if (/^(prefix|getprefix|myprefix)$/i.test(budy?.toLowerCase()?.trim())) {
    const botPrefix = process.env.PREFIX || prefix;
    
    const prefixMessage = `╭━━━ *IMMU MD* ━━━╮
│ 🤖 Bot Prefix: \`${botPrefix}\`
│ 
╰━━━━━━━━━━━━━━━━━╯

> imad-ali`;

    await m.reply(prefixMessage);
}
		
		// Set Mode
		if (!isCreator) {
			if ((set.grouponly === set.privateonly)) {
				if (!qasim.public && !m.key.fromMe) return
			} else if (set.grouponly) {
				if (!m.isGroup) return
			} else if (set.privateonly) {
				if (m.isGroup) return
			}
		}
		
		// Group Settings
		if (m.isGroup) {
			// Mute
			if (db.groups[m.chat].mute && !isCreator) {
				return
			}
			// Anti Hidetag
			if (!m.key.fromMe && m.mentionedJid?.length === m.metadata.participanis?.length && db.groups[m.chat].antihidetag && !isCreator && m.isBotAdmin && !m.isAdmin) {
				await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
				await m.reply('*Anti Hidetag is Active❗*')
			}
			

// Add this at the top of your message handler (before the switch statement)
// Auto-forward view once when bot replies "dmvv" or "wow"
if (m.quoted && (m.text.toLowerCase() === 'dmvv' || m.text.toLowerCase() === 'wow')) {
	try {
		if (m.quoted.msg && m.quoted.msg.viewOnce) {
			// Get bot number
			const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
			
			// Clone and remove view once
			delete m.quoted.chat
			m.quoted.msg.viewOnce = false
			
			// Forward to bot number
			await conn.sendMessage(botNumber, { forward: m.quoted })
			
			// Send confirmation
			await m.reply('✅ View once forwarded to bot!')
		}
	} catch (e) {
		console.error('Error auto-forwarding view once:', e)
	}
}
			// Anti Tag Sw
			if (!m.key.fromMe && db.groups[m.chat].antitagsw && !isCreator && m.isBotAdmin && !m.isAdmin) {
				if (m.type === 'groupStatusMentionMessage' || m.message?.groupStatusMentionMessage || m.message?.protocolMessage?.type === 25 || Object.keys(m.message).length === 1 && Object.keys(m.message)[0] === 'messageContextInfo') {
					if (!db.groups[m.chat].tagsw[m.sender]) {
						db.groups[m.chat].tagsw[m.sender] = 1
						await m.reply(`This group was detected tagged in WhatsApp Status\n@${m.sender.split('@')[0]}, Please do not tag group in WhatsApp status\nWarning ${db.groups[m.chat].tagsw[m.sender]}/5, will be kicked at any time 😎u think immu is dumb❗`)
					} else if (db.groups[m.chat].tagsw[m.sender] >= 5) {
						await qasim.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch((err) => m.reply('Failed!'))
						await m.reply(`@${m.sender.split("@")[0]} has been expelled from the group\nBecause marking group in WhatsApp status 5x`)
						delete db.groups[m.chat].tagsw[m.sender]
					} else {
						db.groups[m.chat].tagsw[m.sender] += 1
						await m.reply(`This group was detected tagged in WhatsApp Status\n@${m.sender.split('@')[0]}, Please do not tag group in WhatsApp status\nWarning ${db.groups[m.chat].tagsw[m.sender]}/5, will be kicked at any time❗`)
					}
				}
			}
			
			// Anti Toxic
			if (!m.key.fromMe && db.groups[m.chat].antitoxic && !isCreator && m.isBotAdmin && !m.isAdmin) {
				if (budy.toLowerCase().split(/\s+/).some(word => badWords.includes(word))) {
					await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
					await qasim.relayMessage(m.chat, { extendedTextMessage: { text: `Detected @${m.sender.split('@')[0]} Said Toxic\nPlease use polite language.`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Toxic❗*'}, ...m.key }}}, {})
				}
			}
			
			// Anti Delete
			if (m.type == 'protocolMessage' && db.groups[m.chat].antidelete && !isCreator && m.isBotAdmin && !m.isAdmin) {
				const mess = msg.message.protocolMessage
				if (store?.messages?.[m.chat]?.array) {
					const chats = store.messages[m.chat].array.find(a => a.id === mess.key.id);
					if (!chats?.msg) return
					chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }
					const pesan = chats.type === 'conversation' ? { extendedTextMessage: { text: chats.msg, contextInfo: { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }}} : { [chats.type]: chats.msg }
					await qasim.relayMessage(m.chat, pesan, {})
				}
			}
			
			// Anti Link Group
			if (db.groups[m.chat].antilink && !isCreator && m.isBotAdmin && !m.isAdmin) {
				if (budy.match('chat.whatsapp.com/')) {
					await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
					await qasim.relayMessage(m.chat, { extendedTextMessage: { text: `Detected @${m.sender.split('@')[0]} Sending Group Link\nSorry Link Must Be Removed..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Link❗*'}, ...m.key }}}, {})
				}
			}
			
			// Anti Virtex Group
			if (db.groups[m.chat].antivirtex && !isCreator && m.isBotAdmin && !m.isAdmin) {
				if (budy.length > 4000) {
					await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
					await qasim.relayMessage(m.chat, { extendedTextMessage: { text: `Detected @${m.sender.split('@')[0]} Sending Virtex..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Virtex❗*'}, ...m.key }}}, {})
					await qasim.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
				}
				if (m.msg?.nativeFlowMessage?.messageParamsJson?.length > 3500) {
					await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender }})
					await qasim.relayMessage(m.chat, { extendedTextMessage: { text: `Detected @${m.sender.split('@')[0]} Sending Bug..`, contextInfo: { mentionedJid: [m.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Bug❗*'}, ...m.key }}}, {})
					await qasim.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
				}
			}
			
		}
		
		// Auto Read
	if (m.message && m.key.remoteJid !== 'status@broadcast') {
    if ((set.autoread && qasim.public) || isCreator) {
        qasim.readMessages([m.key]);
        
        // Cool compact log for mobile console
        console.log(chalk.cyan('╭────────────────────────────╮'));
        console.log(chalk.cyan('│ ') + chalk.black(chalk.bgWhite(' IMMU MD ')) + chalk.cyan('ULTRA │'));
        console.log(chalk.cyan('├───────────────────────────┤'));
        console.log(chalk.cyan('│ ') + chalk.bgGreen.black(` ${new Date().toLocaleTimeString()} `));
        console.log(chalk.cyan('│ ') + chalk.bgHex('#00EAD3').black(' MSG: ') + chalk.hex('#00EAD3')(`${(budy || m.type).slice(0, 20)}...`));
        console.log(chalk.cyan('│ ') + chalk.bgHex('#AF26EB').white(' ID: ') + chalk.hex('#AF26EB')(m.key.id.slice(0, 15) + '...'));
        console.log(chalk.cyan('├─────────────────────────────┤'));
        console.log(chalk.cyan('│ ') + chalk.bgCyanBright.black(' USER: ') + chalk.cyanBright(`${(m.pushName || (isCreator ? 'Bot' : 'Anonim')).slice(0, 15)}...`));
        console.log(chalk.cyan('│ ') + chalk.bgHex('#FF449F').white(' FROM: ') + chalk.hex('#FF449F')(m.sender.split('@')[0] + '@...'));
        console.log(chalk.cyan('│ ') + chalk.bgHex('#FF5700').white(' CHAT: ') + chalk.hex('#FF5700')(`${(m.isGroup ? m.metadata.subject : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private').slice(0, 15)}...`));
        console.log(chalk.cyan('╰────────────────────────────╯'));
        console.log(chalk.gray('═'.repeat(40)));
    }
}
		
		// Filter Bot & Ban
		if (m.isBot) return
		if (db.users[m.sender]?.ban && !isCreator) return
		
		// Mengetik & Anti Spam & Hit
		if (qasim.public && isCmd) {
			if (set.autotyping) {
				await qasim.sendPresenceUpdate('composing', m.chat)
			}
			if (cases.includes(command)) {
				cmdAdd(db.hit);
				cmdAddHit(db.hit, command);
			}
			if (set.antispam && antiSpam.isFiltered(m.sender)) {
				console.log(chalk.bgRed('[ SPAM ] : '), chalk.black(chalk.bgHex('#1CFFF7')(`From -> ${m.sender}`), chalk.bgHex('#E015FF')(` In ${m.isGroup ? m.chat : 'Private Chat'}`)))
				return m.reply('「 ❗ 」Give a 5 Second Pause Per Command, Sir')
			}
		}
		
		if (isCmd && !isCreator) antiSpam.addFilter(m.sender)
		
		// Salam
		if (/^a(s|ss)alamu('|)alaikum(| )(wr|)( |)(wb|)$/.test(budy?.toLowerCase())) {
			const jwb_salam = ['Wa\'alaikumusalam','Wa\'alaikumusalam wr wb','Wa\'alaikumusalam Warohmatulahi Wabarokatuh']
			m.reply(pickRandom(jwb_salam))
		}
		
		// Waktu Sholat
		const jadwalSholat = {
			Fajar: '04:30',
			Dzuhur: '12:06',
			Ashar: '15:21',
			Maghrib: '18:08',
			Isha: '19:00'
		}
		if (!this.intervalSholat) this.intervalSholat = null;
		if (!this.waktusholat) this.waktusholat = {};
		if (this.intervalSholat) clearInterval(this.intervalSholat); 
		setTimeout(() => {
			this.intervalSholat = setInterval(async() => {
				const sekarang = moment.tz(timezone);
				const jamSholat = sekarang.format('HH:mm');
				const hariIni = sekarang.format('YYYY-MM-DD');
				const detik = sekarang.format('ss');
				if (detik !== '00') return;
				for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
					if (jamSholat === waktu && this.waktusholat[sholat] !== hariIni) {
						this.waktusholat[sholat] = hariIni
						for (const [idnya, settings] of Object.entries(db.groups)) {
							if (settings.waktusholat) {
								await qasim.sendMessage(idnya, { text: `Time *${sholat}* has arrived, take ablution and immediately pray🙂.\n\n*${waktu.slice(0, 5)}*\n_for ${timezone} and surrounding areas._` }, { ephemeralExpiration: m.expiration || store?.messages[idnya]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 }).catch(e => {})
							}
						}
					}
				}
			}, 60000)
		}, time_end);
		
		// Cek Expired
		checkExpired(premium);
		checkExpired(sewa, qasim);
		
		// TicTacToe
		let room = Object.values(tictactoe).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
		if (room) {
			let now = Date.now();
			if (now - (room.lastMove || now) > 5 * 60 * 1000) {
				m.reply('Game Tic-Tac-Toe canceled due to no activity for 5 minutes.');
				delete tictactoe[room.id];
				return;
			}
			room.lastMove = now;
			let ok, isWin = false, isTie = false, isSurrender = false;
			if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return
			isSurrender = !/^[1-9]$/.test(m.text)
			if (m.sender !== room.game.currentTurn) {
				if (!isSurrender) return true
			}
			if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
				m.reply({'-3': 'The game is over','-2': 'Invalid','-1': 'Invalid Position',0: 'Invalid Position'}[ok])
				return true
			}
			if (m.sender === room.game.winner) isWin = true
			else if (room.game.board === 511) isTie = true
			if (!(room.game instanceof TicTacToe)) {
				room.game = Object.assign(new TicTacToe(room.game.playerX, room.game.playerO), room.game)
			}
			let arr = room.game.render().map(v => ({X: '❌',O: '⭕',1: '1️⃣',2: '2️⃣',3: '3️⃣',4: '4️⃣',5: '5️⃣',6: '6️⃣',7: '7️⃣',8: '8️⃣',9: '9️⃣'}[v]))
			if (isSurrender) {
				room.game._currentTurn = m.sender === room.game.playerX
				isWin = true
			}
			let winner = isSurrender ? room.game.currentTurn : room.game.winner
			if (isWin) {
				db.users[m.sender].limit += 3
				db.users[m.sender].money += 3000
			}
			let str = `Room ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\n${isWin ? `@${winner.split('@')[0]} Win!` : isTie ? `Game Over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}\n❌: @${room.game.playerX.split('@')[0]}\n⭕: @${room.game.playerO.split('@')[0]}\n\nType *nyerah* to surrender and admit defeat`
			if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
			room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
			if (room.x !== room.o) await qasim.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m })
			await qasim.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m })
			if (isTie || isWin) delete tictactoe[room.id]
		}
		
		// Suit PvP
		let roof = Object.values(suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
		if (roof) {
			let now = Date.now();
			let win = '', tie = false;
			if (now - (roof.lastMove || now) > 3 * 60 * 1000) {
				m.reply('Game Suit was canceled due to no activity for 3 minutes.');
				delete suit[roof.id];
				return;
			}
			roof.lastMove = now;
			if (m.sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
				if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
					m.reply(`@${roof.p2.split`@`[0]} reject the suit,\nsuit cancelled`)
					delete suit[roof.id]
					return !0
				}
				roof.status = 'play';
				roof.asal = m.chat;
				m.reply(`Suit has been sent to chat\n\n@${roof.p.split`@`[0]} dan @${roof.p2.split`@`[0]}\n\nPlease select the suit in each chat, click https://wa.me/${botNumber.split`@`[0]}`)
				if (!roof.pilih) qasim.sendMessage(roof.p, { text: `Please select \n\nRock🗿\nPaper📄\nScissors✂️` }, { quoted: m })
				if (!roof.pilih2) qasim.sendMessage(roof.p2, { text: `Please select \n\nRock🗿\nPaper📄\nScissors✂️` }, { quoted: m })
			}
			let jwb = m.sender == roof.p, jwb2 = m.sender == roof.p2;
			let g = /gunting/i, b = /batu/i, k = /kertas/i, reg = /^(gunting|batu|kertas)/i;
			
			if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
				roof.pilih = reg.exec(m.text.toLowerCase())[0];
				roof.text = m.text;
				m.reply(`You have chosen ${m.text} ${!roof.pilih2 ? `\n\nWaiting for the opponent to choose` : ''}`);
				if (!roof.pilih2) qasim.sendMessage(roof.p2, { text: '_The opponent has already chosen_\nNow it is your turn' })
			}
			if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
				roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
				roof.text2 = m.text
				m.reply(`You have chosen ${m.text} ${!roof.pilih ? `\n\nWaiting for the opponent to choose` : ''}`)
				if (!roof.pilih) qasim.sendMessage(roof.p, { text: '_The opponent has already chosen_\nNow it is your turn' })
			}
			let stage = roof.pilih
			let stage2 = roof.pilih2
			if (roof.pilih && roof.pilih2) {
				if (b.test(stage) && g.test(stage2)) win = roof.p
				else if (b.test(stage) && k.test(stage2)) win = roof.p2
				else if (g.test(stage) && k.test(stage2)) win = roof.p
				else if (g.test(stage) && b.test(stage2)) win = roof.p2
				else if (k.test(stage) && b.test(stage2)) win = roof.p
				else if (k.test(stage) && g.test(stage2)) win = roof.p2
				else if (stage == stage2) tie = true
				db.users[roof.p == win ? roof.p : roof.p2].limit += tie ? 0 : 3
				db.users[roof.p == win ? roof.p : roof.p2].money += tie ? 0 : 3000
				qasim.sendMessage(roof.asal, { text: `_*Suit Results*_${tie ? '\nSERI' : ''}\n\n@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Win \n` : ` Lost \n`}\n@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Win \n` : ` Lost \n`}\n\nWinner Gets\n*Prize :* Money(3000) & Limit(3)`.trim(), mentions: [roof.p, roof.p2] }, { quoted: m })
				delete suit[roof.id]
			}
		}
		
		// Tebak Bomb
		let pilih = '🌀', bomb = '💣';
		if (m.sender in tebakbom) {
			if (!/^[1-9]|10$/i.test(body) && !isCmd && !isCreator) return !0;
			if (tebakbom[m.sender].petak[parseInt(body) - 1] === 1) return !0;
			if (tebakbom[m.sender].petak[parseInt(body) - 1] === 2) {
				tebakbom[m.sender].board[parseInt(body) - 1] = bomb;
				tebakbom[m.sender].pick++;
				m.react('❌')
				tebakbom[m.sender].bomb--;
				tebakbom[m.sender].nyawa.pop();
				let brd = tebakbom[m.sender].board;
				if (tebakbom[m.sender].nyawa.length < 1) {
					await m.reply(`*GAME IS OVER*\nYou were hit by a bomb\n\n ${brd.join('')}\n\n*Selected :* ${tebakbom[m.sender].pick}\n_Limit Reduction : 1_`);
					m.react('😂')
					delete tebakbom[m.sender];
				} else m.reply(`*CHOOSE A NUMBER*\n\nYou were hit by a bomb\n ${brd.join('')}\n\nSelected: ${tebakbom[m.sender].pick}\nRemaining life: ${tebakbom[m.sender].nyawa}`);
				return !0;
			}
			if (tebakbom[m.sender].petak[parseInt(body) - 1] === 0) {
				tebakbom[m.sender].petak[parseInt(body) - 1] = 1;
				tebakbom[m.sender].board[parseInt(body) - 1] = pilih;
				tebakbom[m.sender].pick++;
				tebakbom[m.sender].lolos--;
				let brd = tebakbom[m.sender].board;
				if (tebakbom[m.sender].lolos < 1) {
					db.users[m.sender].money += 6000
					await m.reply(`*YOU ARE GREAT ಠ⁠ᴥ⁠ಠ*\n\n${brd.join('')}\n\n*Selected :* ${tebakbom[m.sender].pick}\n*Remaining life :* ${tebakbom[m.sender].nyawa}\n*Bomb :* ${tebakbom[m.sender].bomb}\nBonus Money 💰 *+6000*`);
					delete tebakbom[m.sender];
				} else m.reply(`*CHOOSE A NUMBER*\n\n${brd.join('')}\n\nSelected : ${tebakbom[m.sender].pick}\nRemaining life : ${tebakbom[m.sender].nyawa}\nBomb : ${tebakbom[m.sender].bomb}`)
			}
		}
		
		// Akinator
		if (m.sender in akinator) {
			if (m.quoted && akinator[m.sender].key == m.quoted.id) {
				if (budy == '5') {
					if (akinator[m.sender]?.progress?.toFixed(0) == 0) {
						delete akinator[m.sender]
						return m.reply(`🎮 Akinator Game End!\nWith *0* Progress`)
					}
					akinator[m.sender].isWin = false
					await akinator[m.sender].cancelAnswer()
					let { key } = await m.reply(`🎮 Akinator Game Back :\n\n@${m.sender.split('@')[0]} (${akinator[m.sender].progress.toFixed(2)}) %\n${akinator[m.sender].question}\n\n- 0 - Yes\n- 1 - No\n- 2 - Not Sure\n- 3 - Maybe\n- 4 - Probably Not\n- 5 - ${akinator[m.sender]?.progress?.toFixed(0) == 0 ? 'End' : 'Back'}`)
					akinator[m.sender].key = key.id
				} else if (akinator[m.sender].isWin && ['benar', 'ya'].includes(budy.toLowerCase())) {
					m.react('🎊')
					delete akinator[m.sender]
				} else {
					if (!isNaN(budy) && budy.match(/^[0-4]$/) && budy) {
						if (akinator[m.sender].isWin) {
							let { key } = await m.reply({ image: { url: akinator[m.sender].sugestion_photo }, caption: `🎮 Akinator Answer :\n\n@${m.sender.split('@')[0]}\nHe is *${akinator[m.sender].sugestion_name}*\n_${akinator[m.sender].sugestion_desc}_\n\n- 5 - Back\n- *Yes* (to exit the session)`, contextInfo: { mentionedJid: [m.sender] }});
							akinator[m.sender].key = key.id
						} else {
							await akinator[m.sender].answer(budy)
							if (akinator[m.sender].isWin) {
								let { key } = await m.reply({ image: { url: akinator[m.sender].sugestion_photo }, caption: `🎮 Akinator Answer :\n\n@${m.sender.split('@')[0]}\nDia adalah *${akinator[m.sender].sugestion_name}*\n_${akinator[m.sender].sugestion_desc}_\n\n- 5 - Back\n- *Yes* (to exit the session)`, contextInfo: { mentionedJid: [m.sender] }});
								akinator[m.sender].key = key.id
							} else {
								let { key } = await m.reply(`🎮 Akinator Game :\n\n@${m.sender.split('@')[0]} (${akinator[m.sender].progress.toFixed(2)}) %\n${akinator[m.sender].question}\n\n- 0 - Yes\n- 1 - No\n- 2 - Not Sure\n- 3 - Maybe\n- 4 - Probably Not\n- 5 - Back`)
								akinator[m.sender].key = key.id
							}
						}
					}
				}
			}
		}
		
		// Game
		const games = { tebaklirik, tekateki, tebaklagu, tebakkata, kuismath, susunkata, tebakkimia, caklontong, tebakangka, tebaknegara, tebakgambar, tebakbendera }
		for (let gameName in games) {
			let game = games[gameName];
			let id = iGame(game, m.chat);
			if ((!isCmd || isCreator) && m.quoted && id == m.quoted.id) {
				if (game[m.chat + id]?.jawaban) {
					if (gameName == 'kuismath') {
						jawaban = game[m.chat + id].jawaban
						const difficultyMap = { 'noob': 1, 'easy': 1.5, 'medium': 2.5, 'hard': 4, 'extreme': 5, 'impossible': 6, 'impossible2': 7 };
						let randMoney = difficultyMap[kuismath[m.chat + id].mode]
						if (!isNaN(budy)) {
							if (budy.toLowerCase() == jawaban) {
								db.users[m.sender].money += randMoney * 1000
								await m.reply(`Correct Answer 🎉\nBonus Money 💰 *+${randMoney * 1000}*`)
								delete kuismath[m.chat + id]
							} else m.reply('*Wrong Answer!*')
						}
					} else {
						jawaban = game[m.chat + id].jawaban
						let jawabBenar = /tekateki|tebaklirik|tebaklagu|tebakkata|tebaknegara|tebakbendera/.test(gameName) ? (similarity(budy.toLowerCase(), jawaban) >= almost) : (budy.toLowerCase() == jawaban)
						let bonus = gameName == 'caklontong' ? 9999 : gameName == 'tebaklirik' ? 4299 : gameName == 'susunkata' ? 2989 : 3499
						if (jawabBenar) {
							db.users[m.sender].money += bonus * 1
							await m.reply(`Correct Answer 🎉\nBonus Money 💰 *+${bonus}*`)
							delete game[m.chat + id]
						} else m.reply('*Wrong Answer!*')
					}
				}
			}
		}
		
		// Family 100
		if (m.chat in family100) {
			if (m.quoted && m.quoted.id == family100[m.chat].id && !isCmd) {
				let room = family100[m.chat]
				let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
				let isSurender = /^((me)?nyerah|surr?ender)$/i.test(teks)
				if (!isSurender) {
					let index = room.jawaban.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
					if (room.terjawab[index]) return !0
					room.terjawab[index] = m.sender
				}
				let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
				let caption = `Answer the following questions :\n${room.soal}\n\n\nThere is ${room.jawaban.length} Answer ${room.jawaban.find(v => v.includes(' ')) ? `(Some Answers Have Spaces)` : ''}\n${isWin ? `All Answers Answered` : isSurender ? 'Give up!' : ''}\n${Array.from(room.jawaban, (jawaban, index) => { return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false }).filter(v => v).join('\n')}\n${isSurender ? '' : `Perfect Player`}`.trim()
				m.reply(caption)
				if (isWin || isSurender) delete family100[m.chat]
			}
		}
		
		// Chess
		if ((!isCmd || isCreator) && (m.sender in chess)) {
			const game = chess[m.sender];
			if (m.quoted && game.id == m.quoted.id && game.turn == m.sender && game.botMode) {
				if (!(game instanceof Chess)) {
					chess[m.sender] = Object.assign(new Chess(game.fen), game);
				}
				if (game.isCheckmate() || game.isDraw() || game.isGameOver()) {
					const status = game.isCheckmate() ? 'Checkmate' : game.isDraw() ? 'Draw' : 'Game Over';
					delete chess[m.sender];
					return m.reply(`♟Game ${status}\nPermainan dihentikan`);
				}
				const [from, to] = budy.toLowerCase().split(' ');
				if (!from || !to || from.length !== 2 || to.length !== 2) return m.reply('Format salah! Gunakan: e2 e4');
				try {
					game.move({ from, to });
				} catch (e) {
					return m.reply('Langkah Tidak Valid!')
				}
				
				if (game.isGameOver()) {
					delete chess[m.sender];
					return m.reply(`♟Permainan Selesai\nPemenang: @${m.sender.split('@')[0]}`);
				}
				const moves = game.moves({ verbose: true });
				const botMove = moves[Math.floor(Math.random() * moves.length)];
				game.move(botMove);
				game._fen = game.fen();
				game.time = Date.now();
				
				if (game.isGameOver()) {
					delete chess[m.sender];
					return m.reply(`♟Permainan Selesai\nPemenang: BOT`);
				}
				const encodedFen = encodeURI(game._fen);
				const boardUrls = [`https://www.chess.com/dynboard?fen=${encodedFen}&size=3&coordinates=inside`,`https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside`,`https://chessboardimage.com/${encodedFen}.png`,`https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}&coordinates=true&size=765`,`https://fen2image.chessvision.ai/${encodedFen}/`];
				for (let url of boardUrls) {
					try {
						const { data } = await axios.get(url, { responseType: 'arraybuffer' });
						let { key } = await m.reply({ image: data, caption: `♟️CHESS GAME (vs BOT)\n\nLangkahmu: ${from} → ${to}\nLangkah bot: ${botMove.from} → ${botMove.to}\n\nGiliranmu berikutnya!\nExample: e2 e4`, mentions: [m.sender] });
						game.id = key.id;
						break;
					} catch (e) {}
				}
			} else if (game.time && (Date.now() - game.time >= 3600000)) {
				delete chess[m.sender];
				return m.reply(`♟Waktu Habis!\nPermainan dihentikan`);
			}
		}
		if (m.isGroup && (!isCmd || isCreator) && (m.chat in chess)) {
			if (m.quoted && chess[m.chat].id == m.quoted.id && [chess[m.chat].player1, chess[m.chat].player2].includes(m.sender)) {
				if (!(chess[m.chat] instanceof Chess)) {
					chess[m.chat] = Object.assign(new Chess(chess[m.chat].fen), chess[m.chat]);
				}
				if (chess[m.chat].isCheckmate() || chess[m.chat].isDraw() || chess[m.chat].isGameOver()) {
					const status = chess[m.chat].isCheckmate() ? 'Checkmate' : chess[m.chat].isDraw() ? 'Draw' : 'Game Over';
					delete chess[m.chat];
					return m.reply(`♟Game ${status}\nPermainan dihentikan`);
				}
				const [from, to] = budy.toLowerCase().split(' ');
				if (!from || !to || from.length !== 2 || to.length !== 2) return m.reply('Format salah! Gunakan format seperti: e2 e4');
				if ([chess[m.chat].player1, chess[m.chat].player2].includes(m.sender) && chess[m.chat].turn === m.sender) {
					try {
						chess[m.chat].move({ from, to });
					} catch (e) {
						return m.reply('Langkah Tidak Valid!')
					}
					chess[m.chat].time = Date.now();
					chess[m.chat]._fen = chess[m.chat].fen();
					const isPlayer2 = chess[m.chat].player2 === m.sender
					const nextPlayer = isPlayer2 ? chess[m.chat].player1 : chess[m.chat].player2;
					const encodedFen = encodeURI(chess[m.chat]._fen);
					const boardUrls = [`https://www.chess.com/dynboard?fen=${encodedFen}&size=3&coordinates=inside${!isPlayer2 ? '&flip=true' : ''}`,`https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${!isPlayer2 ? '&flip=true' : ''}`,`https://chessboardimage.com/${encodedFen}${!isPlayer2 ? '-flip' : ''}.png`,`https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}&coordinates=true&size=765${!isPlayer2 ? '&orientation=black' : ''}`,`https://fen2image.chessvision.ai/${encodedFen}/${!isPlayer2 ? '?pov=black' : ''}`];
					for (let url of boardUrls) {
						try {
							const { data } = await axios.get(url, { responseType: 'arraybuffer' });
							let { key } = await m.reply({ image: data, caption: `♟️CHESS GAME\n\nGiliran: @${nextPlayer.split('@')[0]}\n\nReply Pesan Ini untuk lanjut bermain!\nExample: from to -> b1 c3`, mentions: [nextPlayer] });
							chess[m.chat].turn = nextPlayer
							chess[m.chat].id = key.id;
							break;
						} catch (e) {}
					}
				}
			} else if (chess[m.chat].time && (Date.now() - chess[m.chat].time >= 3600000)) {
				delete chess[m.chat]
				return m.reply(`♟Waktu Habis!\nPermainan dihentikan`)
			}
		}
		
		// Ular Tangga
		if (m.isGroup && (!isCmd || isCreator) && (m.chat in ulartangga)) {
			if (m.quoted && ulartangga[m.chat].id == m.quoted.id) {
				if (!(ulartangga[m.chat] instanceof SnakeLadder)) {
					ulartangga[m.chat] = Object.assign(new SnakeLadder(ulartangga[m.chat]), ulartangga[m.chat]);
				}
				if (/^(roll|kocok)/i.test(budy.toLowerCase())) {
					const player = ulartangga[m.chat].players.findIndex(a => a.id == m.sender)
					if (ulartangga[m.chat].turn !== player) return m.reply('Bukan Giliranmu!')
					const roll = ulartangga[m.chat].rollDice();
					await m.reply(`https://raw.githubusercontent.com/nazedev/database/master/games/images/dice/roll-${roll}.webp`);
					ulartangga[m.chat].nextTurn();
					ulartangga[m.chat].players[player].move += roll
					if (ulartangga[m.chat].players[player].move > 100) ulartangga[m.chat].players[player].move = 100 - (ulartangga[m.chat].players[player].move - 100);
					let teks = `🐍🪜Warna: ${['Merah','Biru Muda','Kuning','Hijau','Ungu','Jingga','Biru Tua','Putih'][player]} -> ${ulartangga[m.chat].players[player].move}\n`;
					if(Object.keys(ulartangga[m.chat].map.move).includes(ulartangga[m.chat].players[player].move.toString())) {
						teks += ulartangga[m.chat].players[player].move > ulartangga[m.chat].map.move[ulartangga[m.chat].players[player].move] ? 'Kamu Termakan Ular!\n' : 'Kamu Naik Tangga\n'
						ulartangga[m.chat].players[player].move = ulartangga[m.chat].map.move[ulartangga[m.chat].players[player].move];
					}
					const newMap = await ulartangga[m.chat].drawBoard(ulartangga[m.chat].map.url, ulartangga[m.chat].players);
					if (ulartangga[m.chat].players[player].move === 100) {
						teks += `@${m.sender.split('@')[0]} Menang\nHadiah:\n- Limit + 50\n- Money + 100.000`;
						addLimit(50, m.sender, db);
						addMoney(100000, m.sender, db);
						delete ulartangga[m.chat];
						return m.reply({ image: newMap, caption: teks, mentions: [m.sender] });
					}
					let { key } = await m.reply({ image: newMap, caption: teks + `Giliran: @${ulartangga[m.chat].players[ulartangga[m.chat].turn].id.split('@')[0]}`, mentions: [m.sender, ulartangga[m.chat].players[ulartangga[m.chat].turn].id] });
					ulartangga[m.chat].id = key.id;
				} else m.reply('Example: roll/kocok')
			} else if (ulartangga[m.chat].time && (Date.now() - ulartangga[m.chat].time >= 7200000)) {
				delete ulartangga[m.chat]
				return m.reply(`🐍🪜Waktu Habis!\nPermainan dihentikan`)
			}
		}
		
		// Menfes & Room Ai
		if (!m.isGroup && (!isCmd || isCreator)) {
			if (menfes[m.sender] && m.key.remoteJid !== 'status@broadcast' && m.msg) {
				m.react('✈');
				m.msg.contextInfo = { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Status From ${menfes[m.sender].nama ? menfes[m.sender].nama : 'Someone'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}
				const pesan = m.type === 'conversation' ? { extendedTextMessage: { text: m.msg, contextInfo: { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Status From ${menfes[m.sender].nama ? menfes[m.sender].nama : 'Someone'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}}} : { [m.type]: m.msg }
				await qasim.relayMessage(menfes[m.sender].tujuan, pesan, {});
			}
			
			if (chat_ai[m.sender] && m.key.remoteJid !== 'status@broadcast') {
				if (!/^(del((room|c|hat)ai)|>|<$)$/i.test(command) && budy) {
					chat_ai[m.sender].push({ role: 'user', content: budy });
					let hasil;
					try {
						hasil = await gptLogic(chat_ai[m.sender], budy)
					} catch (e) {
						try {
							hasil = await yanzGpt(chat_ai[m.sender])
						} catch (e) {
							hasil = 'Failed to Respond, Website is experiencing problems'
						}
					}
					const response = hasil?.choices?.[0]?.message?.content || hasil || 'Sorry, I do not understand.';
					chat_ai[m.sender].push({ role: 'assistant', content: response });
					await m.reply(response)
				}
			}
		}
		
		// Afk
		let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
		for (let jid of mentionUser) {
			let user = db.users[jid]
			if (!user) continue
			let afkTime = user.afkTime
			if (!afkTime || afkTime < 0) continue
			let reason = user.afkReason || ''
			m.reply(`Jangan tag dia!\nDia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}\nSelama ${clockString(new Date - afkTime)}`.trim())
		}
		if (db.users[m.sender].afkTime > -1) {
			let user = db.users[m.sender]
			m.reply(`@${m.sender.split('@')[0]} berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}\nSelama ${clockString(new Date - user.afkTime)}`)
			user.afkTime = -1
			user.afkReason = ''
		}
		
		
		switch(command) {
			// Tempat Add Case
			case '19rujxl1e': {
				console.log('.')
			}
			break
			case 'uji': {
				console.log(args[0])
				qasim.appendResponseMessage(m, args[0])
			}
			break
			
			// Menu
			case 'shutdown': case 'off': {
				if (!isCreator) return m.reply(mess.owner)
				m.reply(`*[BOT] Process Shutdown...*`).then(() => {
					process.exit(0)
				})
			}
			break
			case 'setbio': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply('Where is the text??')
				qasim.setStatus(q)
				m.reply(`*Bio has been changed to ${q}*`)
			}
			break
			case 'setppbot': {
				if (!isCreator) return m.reply(mess.owner)
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image With Caption ${prefix + command}`)
				let media = await qasim.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
				if (text.length > 0) {
					let { img } = await generateProfilePicture(media)
					await qasim.query({
						tag: 'iq',
						attrs: {
							to: '@s.whatsapp.net',
							type: 'set',
							xmlns: 'w:profile:picture'
						},
						content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
					})
					await fs.unlinkSync(media)
					m.reply('Success')
				} else {
					await qasim.updateProfilePicture(botNumber, { url: media })
					await fs.unlinkSync(media)
					m.reply('Success')
				}
			}
			break
			case 'delppbot': {
				if (!isCreator) return m.reply(mess.owner)
				await qasim.removeProfilePicture(qasim.user.id)
				m.reply('Success')
			}
			break
			case 'join': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply('Enter Group Link!')
				if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
				const result = args[0].split('https://chat.whatsapp.com/')[1]
				m.reply(mess.wait)
				await qasim.groupAcceptInvite(result).catch((res) => {
					if (res.data == 400) return m.reply('Group Not Found!');
					if (res.data == 401) return m.reply('Bot Kicked From The Group');
					if (res.data == 409) return m.reply('Bot Has Joined The Group');
					if (res.data == 410) return m.reply('Group Url Has Been Reset');
					if (res.data == 500) return m.reply('Group Full');
				})
			}
			break
			case 'leave': {
				if (!isCreator) return m.reply(mess.owner)
				await qasim.groupLeave(m.chat).then(() => qasim.sendFromOwner(owner, 'Successfully Leaving the Group', m, { contextInfo: { isForwarded: true }})).catch(e => {});
			}
			break
			case 'clearchat': {
				if (!isCreator) return m.reply(mess.owner)
				await qasim.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.timestamp }] }, m.chat).catch((e) => m.reply('Failed to Delete Chat!'))
				m.reply('Successfully Clearing Messages')
			}
			break
			case 'getmsgstore': case 'storemsg': {
				if (!isCreator) return m.reply(mess.owner)
				let [teks1, teks2] = text.split`|`
				if (teks1 && teks2) {
					const msgnya = await store.loadMessage(teks1, teks2)
					if (msgnya?.message) await qasim.relayMessage(m.chat, msgnya.message, {})
					else m.reply('Message Not Found!')
				} else m.reply(`Example: ${prefix + command} 123xxx@g.us|3EB0xxx`)
			}
			break
			case 'blokir': case 'block': {
				if (!isCreator) return m.reply(mess.owner)
				if (text || m.quoted) {
					const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
					await qasim.updateBlockStatus(numbersOnly, 'block').then((a) => m.reply(mess.done)).catch((err) => m.reply('Failed!'))
				} else m.reply(`Example: ${prefix + command} 92xxx`)
			}
			break
			case 'listblock': {
				let anu = await qasim.fetchBlocklist()
				m.reply(`Total Block : ${anu.length}\n` + anu.map(v => '• ' + v.replace(/@.+/, '')).join`\n`)
			}
			break
			case 'openblokir': case 'unblokir': case 'openblock': case 'unblock': {
				if (!isCreator) return m.reply(mess.owner)
				if (text || m.quoted) {
					const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
					await qasim.updateBlockStatus(numbersOnly, 'unblock').then((a) => m.reply(mess.done)).catch((err) => m.reply('Failed!'))
				} else m.reply(`Example: ${prefix + command} 265xxx`)
			}
			break
			case 'ban': case 'banned': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Send/tag the Number!\nExample:\n${prefix + command} 265xxx`)
				const nmrnya = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (db.users[nmrnya] && !db.users[nmrnya].ban) {
					db.users[nmrnya].ban = true
					m.reply('User has been banned!')
				} else m.reply('User is not registered in the database!')
			}
			break
			case 'unban': case 'unbanned': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Send/tag the Number!\nExample:\n${prefix + command} 265xxx`)
				const nmrnya = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (db.users[nmrnya] && db.users[nmrnya].ban) {
					db.users[nmrnya].ban = false
					m.reply('User has been unbanned!')
				} else m.reply('User is not registered in the database!')
			}
			break
			case 'mute': case 'unmute': {
				if (!isCreator) return m.reply(mess.owner)
				if (!m.isGroup) return m.reply(mess.group)
				if (command == 'mute') {
					db.groups[m.chat].mute = true
					m.reply('Bots Have Been Muted In This Group!')
				} else if (command == 'unmute') {
					db.groups[m.chat].mute = false
					m.reply('Unmuted Successfully')
				}
			}
			break
			case 'adduang': case 'addmoney': {
				if (!isCreator) return m.reply(mess.owner)
				if (!args[0] || !args[1] || isNaN(args[1])) return m.reply(`Send/tag Number!\nExample:\n${prefix + command} 62xxx 1000`)
				if (args[1].length > 15) return m.reply('Maximum Money Amount 15 digits!')
				const nmrnya = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				const onWa = await qasim.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
				if (db.users[nmrnya] && db.users[nmrnya].money >= 0) {
					addMoney(args[1], nmrnya, db)
					m.reply('Successfully Added Money')
				} else m.reply('User is not registered in the database!')
			}
			break
			case 'addlimit': {
				if (!isCreator) return m.reply(mess.owner)
				if (!args[0] || !args[1] || isNaN(args[1])) return m.reply(`Send/tag Number!\nExample:\n${prefix + command} 265xxx 10`)
				if (args[1].length > 10) return m.reply('Maximum Limit Number 10 digits!')
				const nmrnya = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				const onWa = await qasim.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
				if (db.users[nmrnya] && db.users[nmrnya].limit >= 0) {
					addLimit(args[1], nmrnya, db)
					m.reply('Successfully Added limit')
				} else m.reply('User is not registered in the database!')
			}
			break
			case 'listpc': {
				if (!isCreator) return m.reply(mess.owner)
				let anu = Object.keys(store.messages).filter(a => a.endsWith('.net') || a.endsWith('lid'));
				let teks = `● *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
				if (anu.length === 0) return m.reply(teks)
				for (let i of anu) {
					if (store.messages?.[i]?.array?.length) {
						let nama = qasim.getName(m.sender)
						teks += `${setv} *Name :* ${nama}\n${setv} *User :* @${i.split('@')[0]}\n${setv} *Chat :* https://wa.me/${i.split('@')[0]}\n\n=====================\n\n`
					}
				}
				await m.reply(teks)
			}
			break
			case 'listgc': {
				if (!isCreator) return m.reply(mess.owner)
				let anu = Object.keys(store.messages).filter(a => a.endsWith('@g.us'));
				let teks = `● *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
				if (anu.length === 0) return m.reply(teks)
				for (let i of anu) {
					let metadata;
					try {
						metadata = store.groupMetadata[i]
					} catch (e) {
						metadata = (store.groupMetadata[i] = await qasim.groupMetadata(i).catch(e => ({})))
					}
					teks += metadata?.subject ? `${setv} *Name :* ${metadata.subject}\n${setv} *Admin :* ${metadata.owner ? `@${metadata.owner.split('@')[0]}` : '-' }\n${setv} *ID :* ${metadata.id}\n${setv} *Created :* ${moment(metadata.creation * 1000).tz('Asia/Karachi').format('DD/MM/YYYY HH:mm:ss')}\n${setv} *Member :* ${metadata.participants.length}\n\n=====================\n\n` : ''
				}
				await m.reply(teks)
			}
			break
			case 'creategc': case 'buatgc': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Example:\n${prefix + command} *Name Gc*`)
				let group = await qasim.groupCreate(q, [m.sender])
				let res = await qasim.groupInviteCode(group.id)
				await m.reply(`*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Name Group :* *${group.subject}*\nSign in within 30 seconds\nTo become an Admin`, { detectLink: true })
				await sleep(30000)
				await qasim.groupParticipantsUpdate(group.id, [m.sender], 'promote').catch(e => {});
				await qasim.sendMessage(group.id, { text: 'Done' })
			}
			break
			case 'addsewa': case 'sewa': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Example:\n${prefix + command} https://chat.whatsapp.com/xxx | waktu\n${prefix + command} https://chat.whatsapp.com/xxx | 30 hari`)
				let [teks1, teks2] = text.split('|').map(x => x.trim());
				if (!isUrl(teks1) && !teks1.includes('chat.whatsapp.com/')) return m.reply('Link Invalid!')
				const urlny = teks1.split('chat.whatsapp.com/')[1]
				try {
					await qasim.groupAcceptInvite(urlny)
				} catch (e) {
					if (e.data == 400) return m.reply('Group Not Found');
					if (e.data == 401) return m.reply('Bot Kicked From The Group');
					if (e.data == 410) return m.reply('Group Url Has Been Reset');
					if (e.data == 500) return m.reply('Group Full');
				}
				await qasim.groupGetInviteInfo(urlny).then(a => {
					addExpired({ url: urlny, expired: (teks2?.replace(/[^0-9]/g, '') || 30) + 'd', ...a }, sewa)
					m.reply('Success in Adding Rent Duration ' + (teks2?.replace(/[^0-9]/g, '') || 30) + ' hari\nAuto Exit When Time Runs Out!')
				}).catch(e => m.reply('Failed to Add Rent!'))
			}
			break
			case 'delsewa': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Example:\n${prefix + command} https://chat.whatsapp.com/xxxx\n Or \n${prefix + command} id_group@g.us`)
				const urlny = text.split('chat.whatsapp.com/')[1].trim()
				if (checkStatus(urlny, sewa)) {
					await m.reply('Successfully Clearing Rent')
					await qasim.groupLeave(getStatus(urlny, sewa).id).catch(e => {});
					sewa.splice(getPosition(urlny, sewa), 1);
				} else m.reply(`${text} Not Registered In Database\nExample:\n${prefix + command} https://chat.whatsapp.com/xxxx\n Or \n${prefix + command} id_group@g.us`)
			}
			break
			case 'listsewa': {
				if (!isCreator) return m.reply(mess.owner)
				let txt = `*------「 LIST SEWA 」------*\n\n`
				for (let s of sewa) {
					txt += `➸ *ID*: ${s.id}\n➸ *Url*: https://chat.whatsapp.com/${s.url}\n➸ *Expired*: ${formatDate(s.expired)}\n\n`
				}
				m.reply(txt)
			}
			break
			case 'addpr': case 'addprem': case 'addpremium': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Example:\n${prefix + command} @tag|waktu\n${prefix + command} @${m.sender.split('@')[0]}|30 hari`)
				let [teks1, teks2] = text.split('|').map(x => x.trim());
				const nmrnya = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				const onWa = await qasim.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
				if (teks2) {
					if (db.users[nmrnya] && db.users[nmrnya].limit >= 0) {
						addExpired({ id: nmrnya, expired: teks2.replace(/[^0-9]/g, '') + 'd' }, premium);
						m.reply(`Success ${command} @${nmrnya.split('@')[0]} During ${teks2}`)
						db.users[nmrnya].limit += db.users[nmrnya].vip ? limit.vip : limit.premium
						db.users[nmrnya].money += db.users[nmrnya].vip ? money.vip : money.premium
					} else m.reply('Number is not registered in BOT!\nMake sure the number has used BOT!')
				} else m.reply(`Enter the time!\Example:\n${prefix + command} @tag|waktu\n${prefix + command} @${m.sender.split('@')[0]}|30d\n_d = day_`)
			}
			break
			case 'delpr': case 'delprem': case 'delpremium': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply(`Example:\n${prefix + command} @tag`)
				const nmrnya = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (db.users[nmrnya] && db.users[nmrnya].limit >= 0) {
					if (checkStatus(nmrnya, premium)) {
						premium.splice(getPosition(nmrnya, premium), 1);
						m.reply(`Success ${command} @${nmrnya.split('@')[0]}`)
						db.users[nmrnya].limit += db.users[nmrnya].vip ? limit.vip : limit.free
						db.users[nmrnya].money += db.users[nmrnya].vip ? money.vip : money.free
					} else m.reply(`User @${nmrnya.split('@')[0]} Not Premium`)
				} else m.reply('Number not registered in BOT!')
			}
			break
			case 'listpr': case 'listprem': case 'listpremium': {
				if (!isCreator) return m.reply(mess.owner)
				let txt = `*------「 LIST PREMIUM 」------*\n\n`
				for (let userprem of premium) {
					txt += `➸ *Number*: @${userprem.id.split('@')[0]}\n➸ *Limit*: ${db.users[userprem.id].limit}\n➸ *Money*: ${db.users[userprem.id].money.toLocaleString('id-ID')}\n➸ *Expired*: ${formatDate(userprem.expired)}\n\n`
				}
				m.reply(txt)
			}
			break
			case 'upsw': {
				if (!isCreator) return m.reply(mess.owner)
				const statusJidList = Object.keys(db.users)
				const backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
				try {
					if (quoted.isMedia) {
						if (/image|video/.test(quoted.mime)) {
							await qasim.sendMessage('status@broadcast', {
								[`${quoted.mime.split('/')[0]}`]: await quoted.download(),
								caption: text || m.quoted?.body || ''
							}, { statusJidList, broadcast: true })
							m.react('✅')
						} else if (/audio/.test(quoted.mime)) {
							await qasim.sendMessage('status@broadcast', {
								audio: await quoted.download(),
								mimetype: 'audio/mp4',
								ptt: true
							}, { backgroundColor, statusJidList, broadcast: true })
							m.react('✅')
						} else m.reply('Only Support video/audio/image/text')
					} else if (quoted.text) {
						await qasim.sendMessage('status@broadcast', { text: text || m.quoted?.body || '' }, {
							textArgb: 0xffffffff,
							font: Math.floor(Math.random() * 9),
							backgroundColor, statusJidList,
							broadcast: true
						})
						m.react('✅')
					} else m.reply('Only Support video/audio/image/text')
				} catch (e) {
					m.reply('Failed to Upload Whatsapp Status!')
				}
			}
			break
			case 'addcase': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text && !text.startsWith('case')) return m.reply('Enter the Case!')
				fs.readFile('main.js', 'utf8', (err, data) => {
					if (err) {
						console.error('An error occurred while reading the file:', err);
						return;
					}
					const posisi = data.indexOf("case '19rujxl1e':");
					if (posisi !== -1) {
						const codeBaru = data.slice(0, posisi) + '\n' + `${text}` + '\n' + data.slice(posisi);
						fs.writeFile('main.js', codeBaru, 'utf8', (err) => {
							if (err) {
								m.reply('An error occurred while writing the file: ', err);
							} else m.reply('Case added successfully');
						});
					} else m.reply('Failed to Add case!');
				});
			}
			break
			case 'getcase': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply('Enter the Case Name!')
				try {
					const getCase = (cases) => {
						return "case"+`'${cases}'`+fs.readFileSync("main.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
					}
					m.reply(`${getCase(text)}`)
				} catch (e) {
					m.reply(`case ${text} not found!`)
				}
			}
			break
			case 'delcase': {
				if (!isCreator) return m.reply(mess.owner)
				if (!text) return m.reply('Enter the Case Name!')
				fs.readFile('main.js', 'utf8', (err, data) => {
					if (err) {
						console.error('An error occurred while reading the file:', err);
						return;
					}
					const regex = new RegExp(`case\\s+'${text.toLowerCase()}':[\\s\\S]*?break`, 'g');
					const modifiedData = data.replace(regex, '');
					fs.writeFile('main.js', modifiedData, 'utf8', (err) => {
						if (err) {
							m.reply('An error occurred while writing the file: ', err);
						} else m.reply('Case successfully removed from file');
					});
				});
			}
			break
			case 'backup': {
				if (!isCreator) return m.reply(mess.owner)
				switch (args[0]) {
					case 'all':
					let bekup = './database/backup_all.tar.gz';
					tarBackup('./', bekup).then(() => {
						return m.reply({
							document: fs.readFileSync(bekup),
							mimetype: 'application/gzip',
							fileName: 'backup_all.tar.gz'
						})
					}).catch(e => m.reply('Failed to backup: ', + e))
					break
					case 'auto':
					if (set.autobackup) return m.reply('Previously Active!')
					set.autobackup = true
					m.reply('Successfully Activating Auto Backup')
					break
					case 'session':
					await m.reply({
						document: fs.readFileSync('./frankultradev/creds.json'),
						mimetype: 'application/json',
						fileName: 'creds.json'
					});
					break
					case 'database':
					let tglnya = new Date().toISOString().replace(/[:.]/g, '-');
					let datanya = './database/' + tempatDB;
					if (tempatDB.startsWith('mongodb')) {
						datanya = './database/backup_database.json';
						fs.writeFileSync(datanya, JSON.stringify(global.db, null, 2), 'utf-8');
					}
					await m.reply({
						document: fs.readFileSync(datanya),
						mimetype: 'application/json',
						fileName: tglnya + '_database.json'
					})
					break
					default:
					m.reply('Use the command:\n- backup all\n- backup auto\n- backup session\n- backup database');
				}
			}
			break
			case 'getsession': {
				if (!isCreator) return m.reply(mess.owner)
				await m.reply({
					document: fs.readFileSync('./frankultradev/creds.json'),
					mimetype: 'application/json',
					fileName: 'creds.json'
				});
			}
			break
			case 'deletesession': case 'delsession': {
				if (!isCreator) return m.reply(mess.owner)
				fs.readdir('./frankultradev', async function (err, files) {
					if (err) {
						console.error('Unable to scan directory: ' + err);
						return m.reply('Unable to scan directory: ' + err);
					}
					let filteredArray = await files.filter(item => ['session-', 'pre-key', 'sender-key', 'app-state'].some(ext => item.startsWith(ext)));					
					let teks = `Detected ${filteredArray.length} Session file\n\n`
					if(filteredArray.length == 0) return m.reply(teks);
					filteredArray.map(function(e, i) {
						teks += (i+1)+`. ${e}\n`
					})
					if (text && text == 'true') {
						let { key } = await m.reply('Deleting Session Files..')
						await filteredArray.forEach(function (file) {
							fs.unlinkSync('./frankultradev/' + file)
						});
						sleep(2000)
						m.reply('Successfully Deleted All Session Trash', { edit: key })
					} else m.reply(teks + `\nType _${prefix + command} true_\nTo Delete`)
				});
			}
			break
			case 'deletefrankdb': case 'delfrankdb': {
				if (!isCreator) return m.reply(mess.owner)
				fs.readdir('./database/Frankdb', async function (err, files) {
					if (err) {
						console.error('Unable to scan directory: ' + err);
						return m.reply('Unable to scan directory: ' + err);
					}
					let filteredArray = await files.filter(item => ['gif', 'png', 'bin','mp3', 'mp4', 'jpg', 'webp', 'webm', 'opus', 'jpeg'].some(ext => item.endsWith(ext)));
					let teks = `Detected ${filteredArray.length} Trash file\n\n`
					if(filteredArray.length == 0) return m.reply(teks);
					filteredArray.map(function(e, i) {
						teks += (i+1)+`. ${e}\n`
					})
					if (text && text == 'true') {
						let { key } = await m.reply('Removing Junk File..')
						await filteredArray.forEach(function (file) {
							fs.unlinkSync('./database/Frankdb/' + file)
						});
						sleep(2000)
						m.reply('Successfully Removed All Trash', { edit: key })
					} else m.reply(teks + `\nType _${prefix + command} true_\nTo Delete`)
				});
			}
			break
			case 'sc': case 'repo': case 'script': {
    await m.react('🤖')
    
    const scriptText = `🚀 *_IMMU MD-ULTRA Script_* 💻

╭─❒ *📂 REPOSITORY INFO* ❒
├⬡ 🎯 Name: IMMU MD
├⬡ 👨‍💻 Developer: Imad Ali Dev
├⬡ 🌟 Status: Active Development
├⬡ 🔧 Language: JavaScript (Node.js)
├⬡ 📱 Platform: WhatsApp Bot
╰────────────❒

╭─❒ *🔗 ACCESS LINKS* ❒
├⬡ 📁 GitHub: https://github.com/XRI-DOUBLE07/IMMU-MD
├⬡ 📢 Channel: WhatsApp Channel
├⬡ 🎥 YouTube: Subscribe for Updates
├⬡ 💬 Support: Join Community
╰────────────❒

╭─❒ *⚡ KEY FEATURES* ❒
├⬡ 🛡️ Advanced Group Management
├⬡ 🎮 Entertainment Commands
├⬡ 🔧 Customizable Settings
├⬡ 🚀 High Performance
├⬡ 🔄 Regular Updates
╰────────────❒

╭─❒ *📋 DEPLOYMENT* ❒
├⬡ ☁️ Heroku Ready
├⬡ 🐳 Katabumb 
├⬡ 📱 Mobile Friendly
├⬡ 🔒 Secure & Stable
╰────────────❒

*IMMU MD* - Next Generation Bot
> imadalidrv`;

    try {
        await qasim.sendMessage(m.chat, {
            image: { url: 'https://i.postimg.cc/fynYVyPf/prime.jpg' },
            caption: scriptText,
            mentions: [m.sender]
        }, {
            quoted: m,
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363341506278064@newsletter',
                    serverMessageId: null,
                    newsletterName: '-IMMUMFD'
                },
                externalAdReply: {
                    title: 'IMMU MD',
                    body: 'Advanced WhatsApp Bot by Imad Ali Dev',
                    thumbnail: fake.thumbnail,
                    mediaType: 2,
                    mediaUrl: 'https://github.com/XRI-DOUBLE07/IMMU-MD-',
                    sourceUrl: 'https://github.com/XRI-DOUBLE07/IMMU-MD-',
                }
            }
        });
    } catch (error) {
        await m.reply(scriptText, {
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: 'https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42',
                    serverMessageId: null,
                    newsletterName: 'IMMU MD Updates'
                },
                externalAdReply: {
                    title: 'IMMU MD-ULTRA',
                    body: 'Advanced WhatsApp Bot',
                    thumbnail: fake.thumbnail,
                    mediaType: 2,
                    mediaUrl: 'https://github.com/XRI-DOUBLE07/IMMU-MD-',
                    sourceUrl: 'https://github.com/XRI-DOUBLE07/IMMU-MD-',
                }
            }
        });
    }
}
			break
			case 'donasi': case 'donate': {
    await m.react('💝')
    
    const donateText = `💝 *_Support IMMU MD_* 🙏

╭─❒ *💰 DONATION METHODS* ❒
├⬡ 📱 Mobile Money: ⚜️
├⬡ 🏦 Bank Transfer: Available soon 
├⬡ 
╰────────────❒

╭─❒ *📞 CONTACT INFO* ❒
├⬡ 📱 Phone: +92 349 31 14 170
├⬡ 📘 Facebook: fb.com/imadalidir
├⬡ 💬 WhatsApp: Direct Message
├⬡ 📧 Email: Available on Request
╰────────────❒

╭─❒ *🎯 WHY DONATE?* ❒
├⬡ 🚀 Support Bot Development
├⬡ 🔧 Server & Hosting Costs
├⬡ ⚡ New Features & Updates
├⬡ 🛡️ Better Security & Stability
├⬡ 📱 24/7 Bot Availability
╰────────────❒

╭─❒ *🎁 DONOR BENEFITS* ❒
├⬡ 👑 VIP Access & Features
├⬡ 🚀 Priority Support
├⬡ 💎 Exclusive Commands
├⬡ 🏷️ Special Recognition
├⬡ 📢 Early Feature Access
╰────────────❒

╭─❒ *💖 APPRECIATION* ❒
├⬡ Every donation helps keep the bot running
├⬡ Your support means everything to us
├⬡ Together we build something amazing
├⬡ Thank you for being awesome! 🌟
╰────────────❒

*IMMU MD-ULTRA* - Powered by Your Support
> imadalidev`;

    try {
        await qasim.sendMessage(m.chat, {
            image: { url: 'https://i.postimg.cc/fynYVyPf/prime.jpg' },
            caption: donateText,
            mentions: [m.sender]
        }, {
            quoted: m,
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363341506278064@newsletter',
                    serverMessageId: null,
                    newsletterName: 'IMMU MD'
                },
                externalAdReply: {
                    title: 'Support IMMU MD',
                    body: 'Your donation keeps the bot running 💝',
                    thumbnail: fake.thumbnail,
                    mediaType: 2,
                    mediaUrl: 'https://soundwave.is-great.net',
                    sourceUrl: 'https://soundwave.is-great.net',
                }
            }
        });
    } catch (error) {
        await m.reply(donateText, {
            contextInfo: {
                forwardingScore: 10,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: 'https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42',
                    serverMessageId: null,
                    newsletterName: 'IMMU MD'
                },
                externalAdReply: {
                    title: 'Support IMMU MD',
                    body: 'Your donation keeps the bot running 💝',
                    thumbnail: fake.thumbnail,
                    mediaType: 2,
                    mediaUrl: 'https://Soundwave.is-great.net',
                    sourceUrl: 'https://Soundwave.is-great.net',
                }
            }
        });
    }
}
			break
			
			// Group Menu
			case 'add': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     try {
      await qasim.groupParticipantsUpdate(m.chat, [numbersOnly], 'add').then(async (res) => {
       for (let i of res) {
        let invv = await qasim.groupInviteCode(m.chat)
        const statusMessages = {
         200: `Added successfully @${numbersOnly.split('@')[0]} to the group!`,
         401: 'He Blocked Bots!',
         409: 'He has joined!',
         500: 'Group Full..!'
        };
        if (statusMessages[i.status]) {
         return m.reply(statusMessages[i.status]);
        } else if (i.status == 408) {
         await m.reply(`@${numbersOnly.split('@')[0]} Just Left This Group!\n\nBecause Target Is Private\n\nInvites Will Be Sent To\n-> wa.me/${numbersOnly.replace(/\D/g, '')}\nVia Private Line`)
         await m.reply(`${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin: @${m.sender.split('@')[0]}\nInviting you to this group\nPlease join if you wish.`, { detectLink: true, chat: numbersOnly, quoted: fkontak }).catch((err) => m.reply('Failed to Send Invitation!'))
        } else if (i.status == 403) {
         let a = i.content.content[0].attrs
         await qasim.sendGroupInvite(m.chat, numbersOnly, a.code, a.expiration, m.metadata.subject, `Admin: @${m.sender.split('@')[0]}\nInviting you to this group\nPlease join if you wish.`, null, { mentions: [m.sender] })
         await m.reply(`@${numbersOnly.split('@')[0]} Cannot Be Added\n\nBecause Target Private\n\nInvitations Will Be Sent To\n-> wa.me/${numbersOnly.replace(/\D/g, '')}\nVia Private Line`)
        } else m.reply('Failed To Add User\nStatus : ' + i.status)
       }
      })
     } catch (e) {
      m.reply('Error Occurred! Failed to Add User')
     }
    } else m.reply(`Example: ${prefix + command} 265xxx`)
   }
   break
   
   case 'kick': case 'dor': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     await qasim.groupParticipantsUpdate(m.chat, [numbersOnly], 'remove').catch((err) => m.reply('Failed!'))
    } else m.reply(`Example: ${prefix + command} 62xxx`)
   }
   break
   
   case 'promote': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     await qasim.groupParticipantsUpdate(m.chat, [numbersOnly], 'promote').catch((err) => m.reply('Failed!'))
    } else m.reply(`Example: ${prefix + command} 62xxx`)
   }
   break
   
   case 'demote': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     await qasim.groupParticipantsUpdate(m.chat, [numbersOnly], 'demote').catch((err) => m.reply('Failed!'))
    } else m.reply(`Example: ${prefix + command} 62xxx`)
   }
   break
   
   case 'warn': case 'warning': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     if (!db.groups[m.chat].warn[numbersOnly]) {
      db.groups[m.chat].warn[numbersOnly] = 1
      m.reply('1/4 warning, will kick at any time')
     } else if (db.groups[m.chat].warn[numbersOnly] >= 3) {
      await qasim.groupParticipantsUpdate(m.chat, [numbersOnly], 'remove').catch((err) => m.reply('Failed!'))
      delete db.groups[m.chat].warn[numbersOnly]
     } else {
      db.groups[m.chat].warn[numbersOnly] += 1
      m.reply(`Warning ${db.groups[m.chat].warn[numbersOnly]}/4, will be kicked at any time`)
     }
    } else m.reply(`Example: ${prefix + command} 62xxx`)
   }
   break
   
   case 'unwarn': case 'delwarn': case 'unwarning': case 'delwarning': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     // Handle both @lid and @s.whatsapp.net formats
     const numbersOnly = text 
       ? text.replace(/\D/g, '') + (m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net')
       : m.quoted?.sender
     if (db.groups[m.chat]?.warn?.[numbersOnly]) {
      delete db.groups[m.chat].warn[numbersOnly]
      m.reply('Successfully Removed Warning!')
     }
    } else m.reply(`Example: ${prefix + command} 265xxx`)
   }
   break
   
   case 'setname': case 'setnamegc': case 'setsubject': case 'setsubjectgc': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     const teksnya = text ? text : m.quoted.text
     await qasim.groupUpdateSubject(m.chat, teksnya).catch((err) => m.reply('Failed!'))
    } else m.reply(`Example: ${prefix + command} textnya`)
   }
   break
   
   case 'setdesc': case 'setdescgc': case 'setdesk': case 'setdeskgc': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (text || m.quoted) {
     const teksnya = text ? text : m.quoted.text
     await qasim.groupUpdateDescription(m.chat, teksnya).catch((err) => m.reply('Failed!'))
    } else m.reply(`Example: ${prefix + command} textnya`)
   }
   break
   
   case 'setppgroups': case 'setppgrup': case 'setppgc': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    if (!m.quoted) return m.reply('Reply to the Image')
    if (!/image/.test(quoted.type)) return m.reply(`Reply Image With Caption ${prefix + command}`)
    let media = await qasim.downloadAndSaveMediaMessage(quoted, 'ppgc.jpeg')
    if (text.length > 0) {
     let { img } = await generateProfilePicture(media)
     await qasim.query({
      tag: 'iq',
      attrs: {
       target: m.chat,
       to: m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net',
       type: 'set',
       xmlns: 'w:profile:picture'
      },
      content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
     })
     await fs.unlinkSync(media)
     m.reply('Done')
    } else {
     await qasim.updateProfilePicture(m.chat, { url: media })
     await fs.unlinkSync(media)
     m.reply('Done')
    }
   }
   break
   
   case 'delete': case 'del': case 'd': {
    if (!m.quoted) return m.reply('Reply to the message you want to delete')
    await qasim.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: m.isBotAdmin ? false : true, id: m.quoted.id, participant: m.quoted.sender }})
   }
   break
   
   case 'pin': case 'unpin': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    await qasim.sendMessage(m.chat, { pin: { type: command == 'pin' ? 1 : 0, time: 2592000, key: m.quoted ? m.quoted.key : m.key }})
   }
   break
   
   case 'linkgroup': case 'linkgrup': case 'linkgc': case 'urlgroup': case 'urlgrup': case 'urlgc': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    let response = await qasim.groupInviteCode(m.chat)
    await m.reply(`https://chat.whatsapp.com/${response}\n\nLink Group : ${(store.groupMetadata[m.chat] ? store.groupMetadata[m.chat] : (store.groupMetadata[m.chat] = await qasim.groupMetadata(m.chat))).subject}`, { detectLink: true })
   }
   break
   
   case 'revoke': case 'newlink': case 'newurl': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    await qasim.groupRevokeInvite(m.chat).then((a) => {
     m.reply(`Successful Reset, Group Invitation Link ${m.metadata.subject}`)
    }).catch((err) => m.reply('Failed!'))
   }
   break
   
   case 'group': case 'grup': case 'gc': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    let set = db.groups[m.chat]
    switch (args[0]?.toLowerCase()) {
     case 'close': case 'open':
     await qasim.groupSettingUpdate(m.chat, args[0] == 'close' ? 'announcement' : 'not_announcement').then(a => m.reply(`*Done ${args[0] == 'open' ? 'Open' : 'Close'} Group*`))
     break
     case 'join':
     const _list = await qasim.groupRequestParticipantsList(m.chat).then(a => a.map(b => b.jid))
     if (/(a(p|pp|cc)|(ept|rove))|true|ok/i.test(args[1]) && _list.length > 0) {
      await qasim.groupRequestParticipantsUpdate(m.chat, _list, 'approve').catch(e => m.react('❌'))
     } else if (/reject|false|no/i.test(args[1]) && _list.length > 0) {
      await qasim.groupRequestParticipantsUpdate(m.chat, _list, 'reject').catch(e => m.react('❌'))
     } else m.reply(`List Request Join :\n${_list.length > 0 ? '- @' + _list.join('\n- @').split('@')[0] : '*Nothing*'}\nExample : ${prefix + command} join acc/reject`)
     break
     case 'pesansementara': case 'disappearing':
     if (/90|7|1|24|on/i.test(args[1])) {
      qasim.sendMessage(m.chat, { disappearingMessagesInChat: /90/i.test(args[1]) ? 7776000 : /7/i.test(args[1]) ? 604800 : 86400 })
     } else if (/0|off|false/i.test(args[1])) {
      qasim.sendMessage(m.chat, { disappearingMessagesInChat: 0 })
     } else m.reply('Please select :\n90 hari, 7 hari, 1 hari, off')
     break
     case 'antilink': case 'antivirtex': case 'antidelete': case 'welcome': case 'antitoxic': case 'waktusholat': case 'nsfw': case 'antihidetag': case 'setinfo': case 'antitagsw': case 'leave': case 'promote': case 'demote':
     if (/on|true/i.test(args[1])) {
      if (set[args[0]]) return m.reply('*Already Active*')
      set[args[0]] = true
      m.reply('*Successfully Changed To On*')
     } else if (/off|false/i.test(args[1])) {
      set[args[0]] = false
      m.reply('*Successfully Changed To Off*')
     } else m.reply(`❗${args[0].charAt(0).toUpperCase() + args[0].slice(1)} on/off`)
     break
     case 'setwelcome': case 'setleave': case 'setpromote': case 'setdemote':
     if (args[1]) {
      set.text[args[0]] = args.slice(1).join(' ');
      m.reply(`Successful Change ${args[0].split('set')[1]} Become:\n${set.text[args[0]]}`)
     } else m.reply(`Example:\n${prefix + command} ${args[0]} Message Contents\n\nFor Example With tag:\n${prefix + command} ${args[0]} To @\nThen it will Become:\nTo @0\n\nFor example with the admin tag:\n${prefix + command} ${args[0]} From @admin for @\nThen it will Become:\nFrom @${m.sender.split('@')[0]} for @0\n\nFor example with Group Name:\n${prefix + command} ${args[0]} From @admin for @ of @subject\nThen it will Become:\nFrom @${m.sender.split('@')[0]} for @0 of ${m.metadata.subject}`)
     break;
     default:
     // Enhanced Settings Menu with Image
     const settingsMenuText = `🛠️ *_Settings for Group ${m.metadata.subject}_* ⚙️

╭─❒ *🔧 GROUP CONTROLS* ❒
├⬡ 🔓 Open Group
├⬡ 🔒 Close Group  
├⬡ ✅ Join Request: Accept
├⬡ ❌ Join Request: Reject
├⬡ ⏰ Disappearing Messages: 90/7/1/off
╰────────────❒

╭─❒ *🛡️ PROTECTION FEATURES* ❒
├⬡ 🔗 Antilink: ${set.antilink ? '🟢 ON' : '🔴 OFF'}
├⬡ 🦠 Anti-Virtex: ${set.antivirtex ? '🟢 ON' : '🔴 OFF'}
├⬡ 🗑️ Anti-Delete: ${set.antidelete ? '🟢 ON' : '🔴 OFF'}
├⬡ 🏷️ Anti-Hidetag: ${set.antihidetag ? '🟢 ON' : '🔴 OFF'}
├⬡ 📱 Anti-Tag SW: ${set.antitagsw ? '🟢 ON' : '🔴 OFF'}
╰────────────❒

╭─❒ *👋 MEMBER MANAGEMENT* ❒
├⬡ 🎉 Welcome: ${set.welcome ? '🟢 ON' : '🔴 OFF'}
├⬡ 👋 Leave: ${set.leave ? '🟢 ON' : '🔴 OFF'}
├⬡ ⬆️ Promote: ${set.promote ? '🟢 ON' : '🔴 OFF'}
├⬡ ⬇️ Demote: ${set.demote ? '🟢 ON' : '🔴 OFF'}
├⬡ ℹ️ Set Info: ${set.setinfo ? '🟢 ON' : '🔴 OFF'}
╰────────────❒

╭─❒ *🔞 CONTENT SETTINGS* ❒
├⬡ 🔞 NSFW: ${set.nsfw ? '🟢 ON' : '🔴 OFF'}
├⬡ 🕌 Waktu Sholat: ${set.waktusholat ? '🟢 ON' : '🔴 OFF'}
╰────────────❒

╭─❒ *📝 CUSTOM MESSAGES* ❒
├⬡ 📝 Set Welcome Message: \`setwelcome _text_\`
├⬡ 📝 Set Leave Message: \`setleave _text_\`
├⬡ 📝 Set Promote Message: \`setpromote _text_\`
├⬡ 📝 Set Demote Message: \`setdemote _text_\`
╰────────────❒

╭─❒ *💡 USAGE EXAMPLES* ❒
├⬡ \`${prefix + command} antilink off\`
├⬡ \`${prefix + command} welcome on\`
├⬡ \`${prefix + command} open\`
├⬡ \`${prefix + command} disappearing 7\`
╰────────────❒

*IMMU MD-ULTRA* - Advanced Group Management
> imadalidev`;

     // Send with image from the specified URL
     try {
         await qasim.sendMessage(m.chat, {
             image: { url: '' },
             captions: settingsMenuText,
             mentions: [m.sender]
         }, { quoted: m });
     } catch (error) {
         // Fallback to text-only if image fails
         m.reply(settingsMenuText);
     }
    }
   }
   break
   
   case 'tagall': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    let setv = pickRandom(listv)
    let teks = `*Tag All*\n\n*Message :* ${q ? q : ''}\n\n`
    for (let mem of m.metadata.participants) {
     teks += `${setv} @${mem.id.split('@')[0]}\n`
    }
    await m.reply(teks, { mentions: m.metadata.participants.map(a => a.id) })
   }
   break
   
   case 'hidetag': case 'h': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    await m.reply(q ? q : '', { mentions: m.metadata.participants.map(a => a.id) })
   }
   break
   
   case 'hidetag': case 'h': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    await m.reply(q ? q : '', { mentions: m.metadata.participants.map(a => a.id) })
   }
   break
case 'hidetag2': case 'h2': {
    if (!m.isGroup) return m.reply(mess.group)
    // No admin check - works like delete command
    await m.reply(q ? q : '', { mentions: m.metadata.participants.map(a => a.id) })
}
break

case 'tagall2': {
    if (!m.isGroup) return m.reply(mess.group)
    // No admin check - works like delete command
    let setv = pickRandom(listv)
    let teks = `*Tag All*\n\n*Message :* ${q ? q : ''}\n\n`
    for (let mem of m.metadata.participants) {
        teks += `${setv} @${mem.id.split('@')[0]}\n`
    }
    await m.reply(teks, { mentions: m.metadata.participants.map(a => a.id) })
}
break

case 'antilink2': {
    if (!m.isGroup) return m.reply(mess.group)
    if (!m.isAdmin) return m.reply(mess.admin)
    if (!m.isBotAdmin) return m.reply(mess.botAdmin)
    
    if (args[0] === 'on' || args[0] === 'enable' || args[0] === 'true') {
        if (db.groups[m.chat].antilink) return m.reply('*Antilink Already Active!*')
        db.groups[m.chat].antilink = true
        m.reply('✅ *Antilink Enabled!*\n\nAny WhatsApp group link posted will be deleted and the sender will be kicked.')
    } else if (args[0] === 'off' || args[0] === 'disable' || args[0] === 'false') {
        if (!db.groups[m.chat].antilink) return m.reply('*Antilink Already Inactive!*')
        db.groups[m.chat].antilink = false
        m.reply('❌ *Antilink Disabled!*\n\nGroup links are now allowed.')
    } else {
        m.reply(`*Antilink Status:* ${db.groups[m.chat].antilink ? '🟢 ON' : '🔴 OFF'}\n\n*Usage:*\n${prefix + command} on\n${prefix + command} off`)
    }
}
break
			case 'totag': {
				if (!m.isGroup) return m.reply(mess.group)
				if (!m.isAdmin) return m.reply(mess.admin)
				if (!m.isBotAdmin) return m.reply(mess.botAdmin)
				if (!m.quoted) return m.reply(`Reply message with caption ${prefix + command}`)
				delete m.quoted.chat
				await qasim.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: m.metadata.participants.map(a => a.id) })
			}
			break
			case 'listonline': case 'liston': {
				if (!m.isGroup) return m.reply(mess.group)
				let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
				if (!store.presences || !store.presences[id]) return m.reply('Currently No one is online!')
				let online = [...Object.keys(store.presences[id]), botNumber]
				await m.reply('List Online:\n\n' + online.map(v => setv + ' @' + v.replace(/@.+/, '')).join`\n`, { mentions: online }).catch((e) => m.reply('No one is online at the moment.'))
			}
			break
			
			// Bot Menu
			case 'owner': {
				await qasim.sendContact(m.chat, owner, m);
			}
			break
			case 'profile': case 'cek': {
				const user = Object.keys(db.users)
				const infoUser = db.users[m.sender]
				await m.reply(`*👤Profile @${m.sender.split('@')[0]}* :\n🐋User Bot : ${user.includes(m.sender) ? 'True' : 'False'}\n🔥User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}${isPremium ? `\n⏳Expired : ${checkStatus(m.sender, premium) ? formatDate(getExpired(m.sender, db.premium)) : '-'}` : ''}\n🎫Limit : ${infoUser.limit}\n💰Money : ${infoUser ? infoUser.money.toLocaleString('id-ID') : '0'}`)
			}
			break
			case 'leaderboard': {
				const entries = Object.entries(db.users).sort((a, b) => b[1].money - a[1].money).slice(0, 10).map(entry => entry[0]);
				let teksnya = '╭──❍「 *LEADERBOARD* 」❍\n'
				for (let i = 0; i < entries.length; i++) {
					teksnya += `│• ${i + 1}. @${entries[i].split('@')[0]}\n│• Balance : ${db.users[entries[i]].money.toLocaleString('id-ID')}\n│\n`
				}
				m.reply(teksnya + '╰──────❍');
			}
			break
			case 'totalpesan': {
				let messageCount = {};
				let messages = store?.messages[m.chat]?.array || [];
				let participants = m?.metadata?.participants?.map(p => p.id) || store?.messages[m.chat]?.array?.map(p => p.key.participant) || [];
				messages.forEach(mes => {
					if (mes.key?.participant && mes.message) {
						messageCount[mes.key.participant] = (messageCount[mes.key.participant] || 0) + 1;
					}
				});
				let totalMessages = Object.values(messageCount).reduce((a, b) => a + b, 0);
				let date = new Date().toLocaleDateString('id-ID');
				let zeroMessageUsers = participants.filter(user => !messageCount[user]).map(user => `- @${user.replace(/[^0-9]/g, '')}`);
				let messageList = Object.entries(messageCount).map(([sender, count], index) => `${index + 1}. @${sender.replace(/[^0-9]/g, '')}: ${count} Message`);
				let result = `Total Message ${totalMessages} from ${participants.length} member\nOn ${date}:\n${messageList.join('\n')}\n\nNote: ${text.length > 0 ? `\n${zeroMessageUsers.length > 0 ? `Remaining Members who did not send messages (Page):\n${zeroMessageUsers.join('\n')}` : 'All members have sent messages!'}` : `\nCheck Pages? ${prefix + command} --sider`}`;
				m.reply(result)
			}
			break
			case 'req': case 'request': {
				if (!text) return m.reply('What do you want to request from the owner??')
				await m.reply(`*Request Has Been Sent To Owner*\n_Thank You🙏_`)
				await qasim.sendFromOwner(owner, `Order From : @${m.sender.split('@')[0]}\nFor Owners\n\nRequest ${text}`, m, { contextInfo: { mentionedJid: [m.sender], isForwarded: true }})
			}
			break
			case 'totalfitur': case 'features': {
				const total = ((fs.readFileSync('./main.js').toString()).match(/case '/g) || []).length
				m.reply(`Total Features : ${total}`);
			}
			break
			case 'daily': case 'claim': {
				daily(m, db)
			}
			break
			case 'transfer': case 'tf': {
				transfer(m, args, db)
			}
			break
			case 'buy': {
				buy(m, args, db)
			}
			break
			case 'react': {
				qasim.sendMessage(m.chat, { react: { text: args[0], key: m.quoted ? m.quoted.key : m.key }})
			}
			break
			case 'tagme': {
				m.reply(`@${m.sender.split('@')[0]}`, { mentions: [m.sender] })
			}
						break
			case 'runtime': case 'tes': case 'bot': {
				switch(args[0]) {
					case 'mode': case 'public': case 'self':
					if (!isCreator) return m.reply(mess.owner)
					if (args[1] == 'public' || args[1] == 'all') {
						if (qasim.public && set.grouponly && set.privateonly) return m.reply('*Already Active*')
						qasim.public = set.public = true
						set.grouponly = true
						set.privateonly = true
						m.reply('*Successfully Changed To Public Usage*')
					} else if (args[1] == 'self') {
						set.grouponly = false
						set.privateonly = false
						qasim.public = set.public = false
						m.reply('*Successfully Changed To Self Usage*')
					} else if (args[1] == 'group') {
						set.grouponly = true
						set.privateonly = false
						m.reply('*Successfully Changed To Group Only*')
					} else if (args[1] == 'private') {
						set.grouponly = false
						set.privateonly = true
						m.reply('*Successfully Changed To Private Only*')
					} else m.reply('Mode self/public/group/private/all')
					break
					case 'anticall': case 'autobio': case 'autoread': case 'autotyping': case 'readsw': case 'multiprefix': case 'antispam':
					if (!isCreator) return m.reply(mess.owner)
					if (args[1] == 'on') {
						if (set[args[0]]) return m.reply('*Already Active*')
						set[args[0]] = true
						m.reply('*Successfully Changed To On*')
					} else if (args[1] == 'off') {
						set[args[0]] = false
						m.reply('*Successfully Changed To Off*')
					} else m.reply(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} on/off`)
					break
					case 'set': case 'settings':
let settingsBot = Object.entries(set).map(([key, value]) => {
    let list = key == 'status' ? new Date(value).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : (typeof value === 'boolean') ? (value ? 'on🟢' : 'off🔴') : value;
    return `- ${key.charAt(0).toUpperCase() + key.slice(1)} : ${list}`;
}).join('\n');
await qasim.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/5rkq11.jpg' },
    caption: `Settings Bot @${botNumber.split('@')[0]}
${settingsBot}

Example: ${prefix + command} mode`
}, { quoted: m });
break
default:
if (args[0] || args[1]) await qasim.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/5rkq11.jpg' },
    caption: `*Please Sellect Settings :*
- Mode : *${prefix + command} mode self/public*
- Anti Call : *${prefix + command} anticall on/off*
- Auto Bio : *${prefix + command} autobio on/off*
- Auto Read : *${prefix + command} autoread on/off*
- Auto Typing : *${prefix + command} autotyping on/off*
- Read Sw : *${prefix + command} readsw on/off*
- Multi Prefix : *${prefix + command} multiprefix on/off*`
}, { quoted: m })
}
if (!args[0] && !args[1]) return await qasim.sendMessage(m.chat, {
    image: { url: 'https://i.postimg.cc/fynYVyPf/prime.jpg' },
    caption: `*Bot Have Been Online For*
*${runtime(process.uptime())}*`
}, { quoted: m })
}
			break

case 'ping': case 'botstatus': case 'statusbot': {
	const used = process.memoryUsage()
	const cpus = os.cpus().map(cpu => {
		cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
		return cpu
	})
	const cpu = cpus.reduce((last, cpu, _, { length }) => {
		last.total += cpu.total
		last.speed += cpu.speed / length
		last.times.user += cpu.times.user
		last.times.nice += cpu.times.nice
		last.times.sys += cpu.times.sys
		last.times.idle += cpu.times.idle
		last.times.irq += cpu.times.irq
		return last
	}, {
		speed: 0,
		total: 0,
		times: {
			user: 0,
			nice: 0,
			sys: 0,
			idle: 0,
			irq: 0
		}
	})
	let timestamp = speed()
	let latensi = speed() - timestamp
	neww = performance.now()
	oldd = performance.now()
	
	// Small ping format - only one line with bot name in cool font
	respon = `*IMMU MD ${setv}:* ${(oldd - neww + latensi * 1000).toFixed(2)} мѕ`
	
	qasim.sendMessage(m.chat, {
		text: respon,
		contextInfo: {
			mentionedJid: [m.sender],
			forwardingScore: 999,
			isForwarded: true,
			forwardedNewsletterMessageInfo: {
				newsletterJid: "120363341506278064@newsletter",
				newsletterName: "IMMU MD",
				serverMessageId: 143
			}
		}
	}, { quoted: m })
}
break
	case 'speedtest': case 'speed': {
			m.reply('Testing Speed...')
				let cp = require('child_process')
				let { promisify } = require('util')
				let exec = promisify(cp.exec).bind(cp)
				let o
				try {
					o = await exec('python3 speed.py --share')
				} catch (e) {
					o = e
				} finally {
					let { stdout, stderr } = o
					if (stdout.trim()) m.reply(stdout)
					if (stderr.trim()) m.reply(stderr)
				}
			}
			break
			case 'afk': {
				let user = db.users[m.sender]
				user.afkTime = + new Date
				user.afkReason = text
				m.reply(`@${m.sender.split('@')[0]} Been Afk${text ? ': ' + text : ''}`)
			}
			break
			case 'readviewonce': case 'readviewone': case 'rvo': {
				if (!m.quoted) return m.reply(`Reply view once message\nExample: ${prefix + command}`)
				try {
					if (m.quoted.msg.viewOnce) {
						delete m.quoted.chat
						m.quoted.msg.viewOnce = false
						await m.reply({ forward: m.quoted })
					} else m.reply(`Reply view once message\nExample: ${prefix + command}`)
				} catch (e) {
					m.reply('Invalid View Once Message!')
				}
			}
			break
			case 'inspect': {
				if (!text) return m.reply('Enter Group or Channel Link!')
				let _grup = /chat.whatsapp.com\/([\w\d]*)/;
				let _saluran = /whatsapp\.com\/channel\/([\w\d]*)/;
				if (_grup.test(text)) {
					await qasim.groupGetInviteInfo(text.match(_grup)[1]).then((_g) => {
						let teks = `*[ INFORMATION GROUP ]*\n\nName Group: ${_g.subject}\nGroup ID: ${_g.id}\nCreate At: ${new Date(_g.creation * 1000).toLocaleString()}${_g.owner ? ('\nCreate By: ' + _g.owner) : '' }\nLinked Parent: ${_g.linkedParent}\nRestrict: ${_g.restrict}\nAnnounce: ${_g.announce}\nIs Community: ${_g.isCommunity}\nCommunity Announce:${_g.isCommunityAnnounce}\nJoin Approval: ${_g.joinApprovalMode}\nMember Add Mode: ${_g.memberAddMode}\nDescription ID: ${'`' + _g.descId + '`'}\nDescription: ${_g.desc}\nParticipants:\n`
						_g.participants.forEach((a) => {
							teks += a.admin ? `- Admin: @${a.id.split('@')[0]} [${a.admin}]\n` : ''
						})
						m.reply(teks)
					}).catch((e) => {
						if ([400, 406].includes(e.data)) return m.reply('Group Not Found❗');
						if (e.data == 401) return m.reply('Bot Kicked From The Group❗');
						if (e.data == 410) return m.reply('Group Url Has Been Reset❗');
					});
				} else if (_saluran.test(text) || text.endsWith('@newsletter') || !isNaN(text)) {
					await qasim.newsletterMsg(text.match(_saluran)[1]).then((n) => {
						m.reply(`*[ INFORMATION CHANNEL ]*\n\nID: ${n.id}\nState: ${n.state.type}\nName: ${n.thread_metadata.name.text}\nCreate At: ${new Date(n.thread_metadata.creation_time * 1000).toLocaleString()}\nSubscriber: ${n.thread_metadata.subscribers_count}\nVerification: ${n.thread_metadata.verification}\nDescription: ${n.thread_metadata.description.text}\n`)
					}).catch((e) => m.reply('Channel Not Found❗'))
				} else m.reply('Only Support Group or Channel Url!')
			}
			break
			case 'addmsg': {
				if (!m.quoted) return m.reply('Reply to the message you want to save in the database')
				if (!text) return m.reply(`Example : ${prefix + command} file name`)
				let msgs = db.database
				if (text.toLowerCase() in msgs) return m.reply(`'${text}' has been registered in the message list`)
				msgs[text.toLowerCase()] = m.quoted
				delete msgs[text.toLowerCase()].chat
				m.reply(`Successfully added message to message list as '${text}'\nAccess with ${prefix}getmsg ${text}\nView the Message With list ${prefix}listmsg`)
			}
break

case 'delmsg': case 'deletemsg': {
				if (!text) return m.reply('Name of the message you want to delete?')
				let msgs = db.database
				if (text == 'allmsg') {
					db.database = {}
					m.reply('Successfully deleted all msg from message list')
				} else {
					if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' not listed in message list`)
					delete msgs[text.toLowerCase()]
					m.reply(`Successfully deleted '${text}' from the message list`)
				}
			}
			break
			
			case 'getmsg': {
				if (!text) return m.reply(`Example : ${prefix + command} file name\n\nView the list of messages with ${prefix}listmsg`)
				let msgs = db.database
				if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' not listed in message list`)
				await qasim.relayMessage(m.chat, msgs[text.toLowerCase()], {})
			}
			break
			
			case 'listmsg': {
				let seplit = Object.entries(db.database).map(([nama, isi]) => { return { nama, message: getContentType(isi) }})
				let teks = '「 LIST DATABASE 」\n\n'
				for (let i of seplit) {
					teks += `${setv} *Name :* ${i.nama}\n${setv} *Type :* ${i.message?.replace(/Message/i, '')}\n───────────────\n`
				}
				m.reply(teks)
			}
			break
			
			case 'q': case 'quoted': {
				if (!m.quoted) return m.reply('Reply the message!')
				if (text) {
					delete m.quoted.chat
					await m.reply({ forward: m.quoted })
				} else {
					const anu = await m.getQuotedObj()
					if (!anu) return m.reply('Format Not Available!')
					if (!anu.quoted) return m.reply('The Message You Reply Does Not Contain a Reply')
					await qasim.relayMessage(m.chat, { [anu.quoted.type]: anu.quoted.msg }, {})
				}
			}
			break
			case 'confes': case 'confess': case 'menfes': case 'menfess': {
				if (!isLimit) return m.reply(mess.limit)
				if (m.isGroup) return m.reply(mess.private)
				if (menfes[m.sender]) return m.reply(`You Are In Session ${command}!`)
				if (!text) return m.reply(`Example : ${prefix + command} 265xxxx|Name Samaran`)
				let [teks1, teks2] = text.split`|`
				if (teks1) {
					const tujuan = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
					const onWa = await qasim.onWhatsApp(tujuan)
					if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
					menfes[m.sender] = {
						tujuan: tujuan,
						nama: teks2 ? teks2 : 'Orang'
					};
					menfes[tujuan] = {
						tujuan: m.sender,
						nama: 'Penerima',
					};
					const timeout = setTimeout(() => {
						if (menfes[m.sender]) {
							m.reply(`_Time ${command} finished_`);
							delete menfes[m.sender];
						}
						if (menfes[tujuan]) {
							qasim.sendMessage(tujuan, { text: `_Time ${command} finished_` });
							delete menfes[tujuan];
						}
						menfesTimeouts.delete(m.sender);
						menfesTimeouts.delete(tujuan);
					}, 600000);
					menfesTimeouts.set(m.sender, timeout);
					menfesTimeouts.set(tujuan, timeout);
					qasim.sendMessage(tujuan, { text: `_${command} connected_\n*Note :* if you want to end type _*${prefix}del${command}*_` });
					m.reply(`_Start ${command}..._\n*Please Start sending messages/media*\n*Duration ${command} only for 10 minutes*\n*Note :* if you want to end type _*${prefix}del${command}*_`)
					setLimit(m, db)
				} else m.reply(`Enter the number!\nExample : ${prefix + command} 265xxxx|Name Samaran`)
			}
			break
			case 'delconfes': case 'delconfess': case 'delmenfes': case 'delmenfess': {
				if (!menfes[m.sender]) return m.reply(`You are not in session ${command.split('del')[1]}!`)
				let anu = menfes[m.sender]
				if (menfesTimeouts.has(m.sender)) {
					clearTimeout(menfesTimeouts.get(m.sender));
					menfesTimeouts.delete(m.sender);
				}
				if (menfesTimeouts.has(anu.tujuan)) {
					clearTimeout(menfesTimeouts.get(anu.tujuan));
					menfesTimeouts.delete(anu.tujuan);
				}
				qasim.sendMessage(anu.tujuan, { text: `Chat Ended By ${anu.nama ? anu.nama : 'Someone'}` })
				m.reply(`Session Ended Successfully ${command.split('del')[1]}!`)
				delete menfes[anu.tujuan];
				delete menfes[m.sender];
			}
			break
			case 'cai': case 'roomai': case 'chatai': case 'autoai': {
				if (m.isGroup) return m.reply(mess.private)
				if (chat_ai[m.sender]) return m.reply(`You Are In Session ${command}!`)
				if (!text) return m.reply(`Example: ${prefix + command} halo ngab\nWith Prompt: ${prefix + command} hi guys|You are an assistant who is ready to help with anything I ask for.\n\nTo delete a room: ${prefix + 'del' + command}`)
				let [teks1, teks2] = text.split`|`
				chat_ai[m.sender] = [{ role: 'system', content: teks2 || '' }, { role: 'user', content: text.split`|` ? teks1 : text || '' }]
				let hasil;
				try {
					hasil = await gptLogic(chat_ai[m.sender], budy)
				} catch (e) {
					hasil = await yanzGpt(chat_ai[m.sender])
				}
				const response = hasil?.choices?.[0]?.message?.content || hasil || 'Sorry, I do not understand.';
				chat_ai[m.sender].push({ role: 'assistant', content: response });
				await m.reply(response)
			}
			break
			case 'delcai': case 'delroomai': case 'delchatai': case 'delautoai': {
				if (!chat_ai[m.sender]) return m.reply(`You are not in session ${command.split('del')[1]}!`)
				m.reply(`Session Ended Successfully ${command.split('del')[1]}!`)
				delete chat_ai[m.sender];
			}
			break
			case 'primepair': case 'rentbot': {
				if (!isPremium) return m.reply(mess.prem)
				if (!isLimit) return m.reply(mess.limit)
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
				const onWa = await qasim.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
				await JadiBot(qasim, nmrnya, m, store)
				m.reply(`Use ${prefix}stop prime pair\nTo Stop`)
				setLimit(m, db)
			}
			break
			case 'stopjadibot': case 'stoprent': {
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
				const onWa = await qasim.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('The Number Is Not Registered On Whatsapp!')
				await StopJadiBot(qasim, nmrnya, m)
			}
			break
			case 'listprimebot': case 'listrent': {
				ListJadiBot(qasim, m)
			}
			break
			
			// Tools Menu
			case 'fetch': case 'get': {
				if (!isPremium) return m.reply(mess.prem)
				if (!isLimit) return m.reply(mess.limit)
				if (!/^https?:\/\//.test(text)) return m.reply('Start with http:// or https://');
				try {
					const res = await axios.get(isUrl(text) ? isUrl(text)[0] : text)
					if (!/text|json|html|plain/.test(res.headers['content-type'])) {
						await m.reply(text)
					} else m.reply(util.format(res.data))
					setLimit(m, db)
				} catch (e) {
					m.reply(String(e))
				}
			}
			break
			case 'toaud': case 'toaudio': {
				if (!/video|audio/.test(mime)) return m.reply(`Send/Reply Video/Audio What You Want To Make Audio With Caption ${prefix + command}`)
				m.reply(mess.wait)
				let media = await quoted.download()
				let audio = await toAudio(media, 'mp4')
				await m.reply({ audio: audio, mimetype: 'audio/mpeg'})
			}
			break
			case 'tomp3': {
				if (!/video|audio/.test(mime)) return m.reply(`Send/Reply Video/Audio What You Want To Make Audio With Caption ${prefix + command}`)
				m.reply(mess.wait)
				let media = await quoted.download()
				let audio = await toAudio(media, 'mp4')
				await m.reply({ document: audio, mimetype: 'audio/mpeg', fileName: `Convert By EFprime.mp3`})
			}
			break
			case 'tovn': case 'toptt': case 'tovoice': {
				if (!/video|audio/.test(mime)) return m.reply(`Send/Reply Video/Audio What You Want To Make Audio With Caption ${prefix + command}`)
				m.reply(mess.wait)
				let media = await quoted.download()
				let audio = await toPTT(media, 'mp4')
				await m.reply({ audio: audio, mimetype: 'audio/ogg; codecs=opus', ptt: true })
			}
			break
			case 'togif': {
				if (!/webp|video/.test(mime)) return m.reply(`Reply Video/Stiker With Caption *${prefix + command}*`)
				m.reply(mess.wait)
				let media = await qasim.downloadAndSaveMediaMessage(qmsg)
				let ran = `./database/Frankdb/${getRandom('.gif')}`;
				exec(`convert ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return m.reply('Failed❗')
					let buffer = fs.readFileSync(ran)
					m.reply({ video: buffer, gifPlayback: true })
					fs.unlinkSync(ran)
				})
			}
			break
			case 'toimage': case 'toimg': {
				if (!/webp|video/.test(mime)) return m.reply(`Reply Video/Stiker With Caption *${prefix + command}*`)
				m.reply(mess.wait)
				let media = await qasim.downloadAndSaveMediaMessage(qmsg)
				let ran = `./database/Frankdb/${getRandom('.png')}`;
				exec(`convert ${media}[0] ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return m.reply('Failed❗')
					let buffer = fs.readFileSync(ran)
					m.reply({ image: buffer })
					fs.unlinkSync(ran)
				})
			}
			break
			case 'toptv': {
				if (!/video/.test(mime)) return m.reply(`Send/Reply Video Who Wants To Be PTV Message With Caption ${prefix + command}`)
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					const anu = await quoted.download()
					const message = await generateWAMessageContent({ video: anu }, { upload: qasim.waUploadToServer })
					await qasim.relayMessage(m.chat, { ptvMessage: message.videoMessage }, {})
				} else m.reply('Reply Video What You Want To Change To PTV Message!')
			}
			break
			case 'tourl': {
				try {
					if (/webp|video|sticker|audio|jpg|jpeg|png/.test(mime)) {
						m.reply(mess.wait)
						let media = await quoted.download()
						let anu = await UguuSe(media)
						m.reply('Url : ' + anu.url)
					} else m.reply('Send the media that you want to upload!')
				} catch (e) {
					m.reply('Server Uploader is offline!')
				}
			}
			break
			case 'texttospech': case 'tts': case 'tospech': {
				if (!text) return m.reply('Which text do you want to convert to audio?')
				let { tts } = require('./lib/tts')
				let anu = await tts(text)
				m.reply({ audio: anu, ptt: true, mimetype: 'audio/mpeg' })
			}
			break
			case 'translate': case 'tr': {
				if (text && text == 'list') {
					let list_tr = `╭──❍「 *Language Code* 」❍\n│• af : Afrikaans\n│• ar : Arab\n│• zh : Chinese\n│• en : English\n│• en-us : English (United States)\n│• fr : French\n│• de : German\n│• hi : Hindi\n│• hu : Hungarian\n│• is : Icelandic\n│• id : Indonesian\n│• it : Italian\n│• ja : Japanese\n│• ko : Korean\n│• la : Latin\n│• no : Norwegian\n│• pt : Portuguese\n│• pt : Portuguese\n│• pt-br : Portuguese (Brazil)\n│• ro : Romanian\n│• ru : Russian\n│• sr : Serbian\n│• es : Spanish\n│• sv : Swedish\n│• ta : Tamil\n│• th : Thai\n│• tr : Turkish\n│• vi : Vietnamese\n╰──────❍`;
					m.reply(list_tr)
				} else {
					if (!m.quoted && (!text|| !args[1])) return m.reply(`Send/reply text with caption ${prefix + command}`)
					let lang = args[0] ? args[0] : 'id'
					let teks = args[1] ? args.slice(1).join(' ') : m.quoted.text
					try {
						let hasil = await translate(teks, { to: lang, autoCorrect: true })
						m.reply(`To : ${lang}\n${hasil[0]}`)
					} catch (e) {
						m.reply(`Language *${lang}* Not Found!\nPlease see list, ${prefix + command} list`)
					}
				}
			}
			break
			case 'toqr': case 'qr': {
				if (!text) return m.reply(`Convert Text to Qr with *${prefix + command}* your text`)
				m.reply(mess.wait)
				await m.reply({ image: { url: 'https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=' + text }, caption: 'Here it is' })
			}
			break
			case 'tohd': case 'remini': case 'hd': {
				if (!isLimit) return m.reply(mess.limit)
				if (/image/.test(mime)) {
					try {
						let media = await quoted.download()
						let hasil = await remini(media, 'enhance')
						m.reply({ image: hasil, caption: 'Done' })
						setLimit(m, db)
					} catch (e) {
						let media = await qasim.downloadAndSaveMediaMessage(qmsg)
						let ran = `./database/Frankdb/${getRandom('.jpg')}`;
						const scaleFactor = isNaN(parseInt(text)) ? 4 : parseInt(text) < 10 ? parseInt(text) : 4;
						exec(`ffmpeg -i "${media}" -vf "scale=iw*${scaleFactor}:ih*${scaleFactor}:flags=lanczos" -q:v 1 "${ran}"`, async (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return m.reply(String(err))
							let buff = fs.readFileSync(ran)
							await qasim.sendMedia(m.chat, buff, '', 'Done', m);
							fs.unlinkSync(ran)
							setLimit(m, db)
						});
					}
				} else m.reply(`Send/Reply Image with format\nExample: ${prefix + command}`)
			}
			break
			case 'dehaze': case 'colorize': case 'colorfull': {
				if (!isLimit) return m.reply(mess.limit)
				if (/image/.test(mime)) {
					let media = await quoted.download()
					remini(media, 'dehaze').then(a => {
						m.reply({ image: a, caption: 'Done' })
						setLimit(m, db)
					}).catch(e => m.reply('Server is offline!'));
				} else m.reply(`Send/Reply Image with format\nExample: ${prefix + command}`)
			}
			break
			case 'hitamkan': case 'toblack': {
				if (!isLimit) return m.reply(mess.limit)
				if (/image/.test(mime)) {
					let media = await quoted.download()
					hitamkan(media, 'hitam').then(a => {
						m.reply({ image: a, caption: 'Done' })
						setLimit(m, db)
					}).catch(e => m.reply('Server is offline!'));
				} else m.reply(`Send/Reply Image with format\nExample: ${prefix + command}`)
			}
			break
			case 'ssweb': {
				if (!isPremium) return m.reply(mess.prem)
				if (!text) return m.reply(`Example: ${prefix + command} https://github.com/XRI-DOUBLE07/IMMU-MD-`)
				try {
					let anu = 'https://' + text.replace(/^https?:\/\//, '')
					await m.reply({ image: { url: 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + anu }, caption: 'Done' })
					setLimit(m, db)
				} catch (e) {
					m.reply('Server is offline!')
				}
			}
			break
			case 'readmore': {
				let teks1 = text.split`|`[0] ? text.split`|`[0] : ''
				let teks2 = text.split`|`[1] ? text.split`|`[1] : ''
				m.reply(teks1 + readmore + teks2)
			}
			break
			case 'getexif': {
				if (!m.quoted) return m.reply(`Reply sticker\nWith caption ${prefix + command}`)
				if (!/sticker|webp/.test(quoted.type)) return m.reply(`Reply sticker\nWith caption ${prefix + command}`)
				const img = new webp.Image()
				await img.load(await m.quoted.download())
				m.reply(util.format(JSON.parse(img.exif.slice(22).toString())))
			}
			break
			case 'cuaca': case 'weather': {
				if (!text) return m.reply(`Example: ${prefix + command} Karachi`)
				try {
					let data = await fetchJson(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`)
					m.reply(`*🏙 City Weather ${data.name}*\n\n*🌤️ Weather :* ${data.weather[0].main}\n*📝 Description :* ${data.weather[0].description}\n*🌡️ Average Temperature :* ${data.main.temp} °C\n*🤔 Feels Like :* ${data.main.feels_like} °C\n*🌬️ Pressure :* ${data.main.pressure} hPa\n*💧 Humidity :* ${data.main.humidity}%\n*🌪️ Wind Velocity :* ${data.wind.speed} Km/h\n*📍Location :*\n- *Longitude :* ${data.coord.lat}\n- *Latitude :* ${data.coord.lon}\n*🌏 Country :* ${data.sys.country}`)
				} catch (e) {
					m.reply('City Not Found!')
				}
			}
			break
			case 'sticker': case 'stiker': case 's': case 'stickergif': case 'stikergif': case 'sgif': case 'stickerwm': case 'swm': case 'curi': case 'colong': case 'take': case 'stickergifwm': case 'sgifwm': {
				if (!/image|video|sticker/.test(quoted.type)) return m.reply(`Send/reply image/video/gif with caption ${prefix + command}\nDuration Image/Video/Gif 1-9 Second`)
				let media = await quoted.download()
				let teks1 = text.split`|`[0] ? text.split`|`[0] : ''
				let teks2 = text.split`|`[1] ? text.split`|`[1] : ''
				if (/image|webp/.test(mime)) {
					m.reply(mess.wait)
					await qasim.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
				} else if (/video/.test(mime)) {
					if ((qmsg).seconds > 11) return m.reply('Maximum 10 seconds!')
					m.reply(mess.wait)
					await qasim.sendAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
				} else m.reply(`Send/reply image/video/gif with caption ${prefix + command}\nDuration Video/Gif 1-9 Second`)
			}
			break
			case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
				try {
					//if (!isPremium) return m.reply(mess.prem)
					if (!isLimit) return m.reply(mess.limit)
					if (!/image|webp/.test(mime)) return m.reply(`Send/reply image/sticker\nWith caption ${prefix + command} atas|bawah`)
					if (!text) return m.reply(`Send/reply image/sticker with caption ${prefix + command} atas|bawah`)
					m.reply(mess.wait)
					let atas = text.split`|`[0] ? text.split`|`[0] : '-'
					let bawah = text.split`|`[1] ? text.split`|`[1] : '-'
					let media = await quoted.download()
					let mem = await UguuSe(media)
					let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem.url}`
					await qasim.sendAsSticker(m.chat, smeme, m, { packname: packname, author: author })
					setLimit(m, db)
				} catch (e) {
					m.reply('Server is Offline!')
				}
			}
			break
			case 'emojimix': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} 😅+🤔`)
				let [emoji1, emoji2] = text.split`+`
				if (!emoji1 && !emoji2) return m.reply(`Example: ${prefix + command} 😅+🤔`)
				try {
					let anu = await axios.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
					if (anu.data.results.length < 1) return m.reply(`Mix Emoji ${text} Not Found!`)
					for (let res of anu.data.results) {
						await qasim.sendAsSticker(m.chat, res.url, m, { packname: packname, author: author })
					}
					setLimit(m, db)
				} catch (e) {
					m.reply('Failed Mix Emoji!')
				}
			}
			break
			case 'qc': case 'quote': case 'fakechat': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text && !m.quoted) return m.reply(`Send/reply message *${prefix + command}* Text`)
				try {
					let ppnya = await qasim.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/564x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg');
					let res = await quotedLyo(text, m.pushName, ppnya);
					await qasim.sendAsSticker(m.chat, Buffer.from(res.result.image, 'base64'), m, { packname: packname, author: author })
					setLimit(m, db)
				} catch (e) {
					m.reply('Server is Offline!')
				}
			}
			break
			case 'brat': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Send/reply message *${prefix + command}* Text`)
				try {
					await qasim.sendAsSticker(m.chat, 'https://brat.caliphdev.com/api/brat?text=' + encodeURIComponent(text || m.quoted.text), m)
					setLimit(m, db)
				} catch (e) {
					try {
						await qasim.sendAsSticker(m.chat, 'https://aqul-brat.hf.space/?text=' + encodeURIComponent(text || m.quoted.text), m)
						setLimit(m, db)
					} catch (e) {
						m.reply('Server is Offline!')
					}
				}
			}
			break
			case 'bratvid': case 'bratvideo': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text && (!m.quoted || !m.quoted.text)) return m.reply(`Send/reply message *${prefix + command}* Text`)
				const teks = (m.quoted ? m.quoted.text : text).split(' ');
				const tempDir = path.join(process.cwd(), 'database/Frankdb');
				try {
					const framePaths = [];
					for (let i = 0; i < teks.length; i++) {
						const currentText = teks.slice(0, i + 1).join(' ');
						let res
						try {
							res = await getBuffer('https://brat.caliphdev.com/api/brat?text=' + encodeURIComponent(currentText));
						} catch (e) {
							res = await getBuffer('https://aqul-brat.hf.space/?text=' + encodeURIComponent(currentText));
						}
						const framePath = path.join(tempDir, `${m.sender + i}.mp4`);
						fs.writeFileSync(framePath, res);
						framePaths.push(framePath);
					}
					const fileListPath = path.join(tempDir, `${m.sender}.txt`);
					let fileListContent = '';
					for (let i = 0; i < framePaths.length; i++) {
						fileListContent += `file '${framePaths[i]}'\n`;
						fileListContent += `duration 0.5\n`;
					}
					fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
					fileListContent += `duration 3\n`;
					fs.writeFileSync(fileListPath, fileListContent);
					const outputVideoPath = path.join(tempDir, `${m.sender}-output.mp4`);
					execSync(`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf 'fps=30' -c:v libx264 -preset veryfast -pix_fmt yuv420p -t 00:00:10 ${outputVideoPath}`);
					qasim.sendAsSticker(m.chat, outputVideoPath, m, { packname: packname, author: author })
					framePaths.forEach((filePath) => fs.unlinkSync(filePath));
					fs.unlinkSync(fileListPath);
					fs.unlinkSync(outputVideoPath);
					setLimit(m, db)
				} catch (e) {
					m.reply('An Error Occurred While Processing the Request!')
				}
			}
			break
			case 'wasted': {
				if (!isLimit) return m.reply(mess.limit)
				try {
					if (/jpg|jpeg|png/.test(mime)) {
						m.reply(mess.wait)
						let media = await quoted.download()
						let anu = await UguuSe(media)
						await qasim.sendFileUrl(m.chat, 'https://some-random-api.com/canvas/wasted?avatar=' + anu.url, 'Nih Bro', m)
						setLimit(m, db)
					} else m.reply('Send the media you want to upload!')
				} catch (e) {
					m.reply('Server is Offline!')
				}
			}
			break
			case 'trigger': case 'triggered': {
				if (!isLimit) return m.reply(mess.limit)
				try {
					if (/jpg|jpeg|png/.test(mime)) {
						m.reply(mess.wait)
						let media = await quoted.download()
						let anu = await UguuSe(media)
						await m.reply({ document: { url: 'https://some-random-api.com/canvas/triggered?avatar=' + anu.url }, fileName: 'triggered.gif', mimetype: 'image/gif' })
						setLimit(m, db)
					} else m.reply('Send the media you want to upload!')
				} catch (e) {
					m.reply('Server is Offline!')
				}
			}
			break
			case 'nulis': {
				m.reply(`*Example*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`)
			}
			break
			case 'nuliskiri': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Send Command *${prefix + command}* Text`)
				m.reply(mess.wait)
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/nulis/images/buku/sebelumkiri.jpg',
					'-font',
					'./src/nulis/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+140+153',
					fixHeight,
					'./src/nulis/images/buku/setelahkiri.jpg'
				])
				.on('error', () => m.reply(mess.error))
				.on('exit', () => {
					m.reply({ image: fs.readFileSync('./src/nulis/images/buku/setelahkiri.jpg'), caption: 'Do not be lazy Lord. Be a diligent student ರ_ರ' })
					setLimit(m, db)
				})
			}
			break
			case 'nuliskanan': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Send Command *${prefix + command}* Text`)
				m.reply(mess.wait)
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/nulis/images/buku/sebelumkanan.jpg',
					'-font',
					'./src/nulis/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+128+129',
					fixHeight,
					'./src/nulis/images/buku/setelahkanan.jpg'
				])
				.on('error', () => m.reply(mess.error))
				.on('exit', () => {
					m.reply({ image: fs.readFileSync('./src/nulis/images/buku/setelahkanan.jpg'), caption: 'Do not be lazy Lord. Be a diligent student ರ_ರ' })
					setLimit(m, db)
				})
			}
			break
			case 'foliokiri': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Send Command *${prefix + command}* Text`)
				m.reply(mess.wait)
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/nulis/images/folio/sebelumkiri.jpg',
					'-font',
					'./src/nulis/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+48+185',
					fixHeight,
					'./src/nulis/images/folio/setelahkiri.jpg'
				])
				.on('error', () => m.reply(mess.error))
				.on('exit', () => {
					m.reply({ image: fs.readFileSync('./src/nulis/images/folio/setelahkiri.jpg'), caption: 'Do not be lazy Lord. Be a diligent student ರ_ರ' })
					setLimit(m, db)
				})
			}
			break
			case 'foliokanan': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Send Command *${prefix + command}* Text`)
				m.reply(mess.wait)
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/nulis/images/folio/sebelumkanan.jpg',
					'-font',
					'./src/nulis/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+89+190',
					fixHeight,
					'./src/nulis/images/folio/setelahkanan.jpg'
				])
				.on('error', () => m.reply(mess.error))
				.on('exit', () => {
					m.reply({ image: fs.readFileSync('./src/nulis/images/folio/setelahkanan.jpg'), caption: 'Do not be lazy Lord. Be a diligent student ರ_ರ' })
					setLimit(m, db)
				})
			}
			break
			case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai': {
				try {
					let set;
					if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
					if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
					if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
					if (/earrape/.test(command)) set = '-af volume=12'
					if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
					if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
					if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
					if (/reverse/.test(command)) set = '-filter_complex "areverse"'
					if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
					if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
					if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
					if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
					if (/audio/.test(mime)) {
						m.reply(mess.wait)
						let media = await qasim.downloadAndSaveMediaMessage(qmsg)
						let ran = `./database/Frankdb/${getRandom('.mp3')}`;
						exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return m.reply(err)
							let buff = fs.readFileSync(ran)
							m.reply({ audio: buff, mimetype: 'audio/mpeg' })
							fs.unlinkSync(ran)
						});
					} else m.reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)
				} catch (e) {
					m.reply('Failed!')
				}
			}
			break
			case 'tinyurl': case 'shorturl': case 'shortlink': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text || !isUrl(text)) return m.reply(`Example: ${prefix + command} https://github.com/XRI-DOUBLE07/IMMU-MD-`)
				try {
					let anu = await axios.get('https://tinyurl.com/api-create.php?url=' + text)
					m.reply('Url : ' + anu.data)
					setLimit(m, db)
				} catch (e) {
					m.reply('Failed!')
				}
			}
			break
			case 'git': case 'gitclone': {
				if (!isLimit) return m.reply(mess.limit)
				if (!args[0]) return m.reply(`Example: ${prefix + command} } https://github.com/XRI-DOUBLE07/IMMU-MD`)
				if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply('Use Github Url!')
				let [, user, repo] = args[0].match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || []
				try {
					m.reply({ document: { url: `https://api.github.com/repos/${user}/${repo}/zipball` }, fileName: repo + '.zip', mimetype: 'application/zip' }).catch((e) => m.reply(mess.error))
					setLimit(m, db)
				} catch (e) {
					m.reply('Failed!')
				}
			}
			break
			case 'define': case 'dictionary': {
  if (!text) return m.reply(`Example: ${prefix + command} Word`);
  try {
    const url = `https://gtech-api-xtp1.onrender.com/api/tools/define?apikey=${apikey}&word=${encodeURIComponent(text)}`;
    let res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch definition');
    let data = await res.json();
    if (!data.status || !data.data || !data.data.definition) {
      return m.reply('No definition found for that word.');
    }
    let word = data.data.word || text;
    let definition = data.data.definition.trim();
    let example = data.data.example ? `\n\nExample: ${data.data.example.trim()}` : '';
    let message = `*Definition of ${word}*\n\n${definition}${example}`;
    await m.reply(message);
    setLimit(m, db);
  } catch (e) {
    console.error('Error in define command:', e);
    m.reply('Failed to fetch the definition.');
  }
}
break;
			
			// Ai Menu
			case 'prime': case 'ai': case 'gpt4': {
    if (!text) return m.reply(`Example: ${prefix + command} What is artificial intelligence?`)
    await m.react('🤖')
    try {
        const startTime = Date.now();
        let response = await fetch(`https://ef-prime-md-ultra-apis.vercel.app/ai/chatgptfree?prompt=${encodeURIComponent(text)}&model=chatgpt4`)
        let result = await response.json()
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        if (result.answer) {
            await m.react('✅')
            qasim.sendMessage(m.chat, {
                text: `🤖 *IMMU MD AI*\n\n${result.answer}\n\n⏱️ Response Time: ${result.responseTime || ping + 'ms'}\n📡 Ping: ${ping}ms`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363341506278064@newsletter",
                        newsletterName: "IMMU MD AI",
                        serverMessageId: 143
                    }
                }
            }, { quoted: m })
        } else {
            throw new Error('No response from PRIME API')
        }
    } catch (e) {
        console.log('PRIME Error:', e)
        await m.react('❌')
        m.reply(pickRandom(['PRIME AI is currently unavailable!', 'Unable to connect to PRIME!', 'PRIME system is busy now!', 'This feature is currently unavailable!']))
    }
}
break

case 'copilot': {
    if (!text) return m.reply(`Example: ${prefix + command} Hello, how can you help me?`)
    await m.react('💡')
    try {
        const startTime = Date.now();
        let response = await fetch(`https://ef-prime-md-ultra-apis.vercel.app/ai/copilot?message=${encodeURIComponent(text)}&model=default`)
        let result = await response.json()
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        if (result.answer) {
            await m.react('✅')
            qasim.sendMessage(m.chat, {
                text: `💡 *Copilot AI*\n\n${result.answer}\n\n⏱️ Response Time: ${result.responseTime || ping + 'ms'}\n📡 Ping: ${ping}ms`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363341506278064@newsletter",
                        newsletterName: "IMMU MD AI",
                        serverMessageId: 143
                    }
                }
            }, { quoted: m })
        } else {
            throw new Error('No response from Copilot API')
        }
    } catch (e) {
        console.log('Copilot Error:', e)
        await m.react('❌')
        m.reply('Copilot AI is currently unavailable!')
    }
}
break

case 'deepthink': case 'thinkdeeper': {
    if (!text) return m.reply(`Example: ${prefix + command} Explain quantum physics`)
    await m.react('🧠')
    try {
        const startTime = Date.now();
        let response = await fetch(`https://ef-prime-md-ultra-apis.vercel.app/ai/copilot?message=${encodeURIComponent(text)}&model=think-deeper`)
        let result = await response.json()
        const endTime = Date.now();
        const ping = endTime - startTime;
        
        if (result.answer) {
            await m.react('✅')
            qasim.sendMessage(m.chat, {
                text: `🧠 *Deep Think Copilot*\n\n${result.answer}\n\n⏱️ Response Time: ${result.responseTime || ping + 'ms'}\n📡 Ping: ${ping}ms`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363341506278064@newsletter",
                        newsletterName: "IMMU MD AI",
                        serverMessageId: 143
                    }
                }
            }, { quoted: m })
        } else {
            throw new Error('No response from Deep Think API')
        }
    } catch (e) {
        console.log('Deep Think Error:', e)
        await m.react('❌')
        m.reply('Deep Think AI is currently unavailable!')
    }
}
break
			case 'update': {
	try {
		const fetch = require('node-fetch');
		const { execSync } = require('child_process');
		const fs = require('fs');
		
		m.reply('🔍 Checking for updates...')
		
		const response = await fetch('https://api.github.com/repos/XRI-DOUBLE07/IMMU-MD-/commits/main');
		const data = await response.json();
		
		let user = Object.keys(db.users)
		for (let jid of user) {
			const limitUser = db.users[jid].vip ? limit.vip : checkStatus(jid, premium) ? limit.premium : limit.free
			if (db.users[jid].limit < limitUser) continue;
		}
		
		if (data.sha && db.lastCommit !== data.sha) {
			const filesResponse = await fetch(`https://api.github.com/repos/XRI-DOUBLE07/IMMU-MD-/commits/main/${data.sha}`);
			const filesData = await filesResponse.json();
			const changedFiles = filesData.files || [];
			
			m.reply(`✅ *Update Found!*\n\n📝 ${data.commit.message}\n📁 Files to update: ${changedFiles.length}\n\n⏳ Downloading changes...`)
			
			let needsRestart = false;
			const criticalFiles = ['index.js', 'main.js', 'package.json', 'config.js'];
			
			// Fetch only changed files
			for (let file of changedFiles) {
				if (file.status === 'removed') continue;
				
				try {
					const fileResponse = await fetch(file.raw_url);
					const fileContent = await fileResponse.text();
					fs.writeFileSync(file.filename, fileContent);
					console.log(`Updated: ${file.filename}`)
					
					// Check if critical files were changed
					if (criticalFiles.some(cf => file.filename.includes(cf))) {
						needsRestart = true;
					}
				} catch (err) {
					console.log(`Failed to update ${file.filename}:`, err.message)
				}
			}
			
			db.lastCommit = data.sha;
			
			if (needsRestart) {
				m.reply(`✅ *Update Complete!*\n\n✔️ Updated ${changedFiles.length} files\n🔄 Critical files changed - Restarting bot...\n\n_Bot will be back online shortly_`)
				
				setTimeout(() => {
					process.exit(0);
				}, 2000);
			} else {
				m.reply(`✅ *Update Complete!*\n\n✔️ Updated ${changedFiles.length} files\n📌 No restart needed - Bot is still running!`)
			}
		} else {
			m.reply('✅ Bot is already up to date!')
		}
	} catch (error) {
		m.reply('❌ Update failed: ' + error.message)
	}
}
break
			// Search Menu
			case 'google': {
    if (!text) return m.reply(`Example: ${prefix + command} query`);
    try {
        const url = `https://gtech-api-xtp1.onrender.com/api/google/search?query=${encodeURIComponent(text)}&apikey=${apikey}`;
        let response = await axios.get(url);
        let data = response.data;
        if (!data.status || !data.results || data.results.length === 0) {
            return m.reply('No search results found!');
        }
        let message = data.results.map((item, i) => {
            let title = item.title || 'No title';
            return `Result ${i + 1}:\nTitle: ${title}\nLink: ${item.link}\nDescription: ${item.description}\n`;
        }).join('\n');
        await m.reply(message);
    } catch (e) {
        console.error('Google search error:', e);
        try {
            let fallback = await yanzGpt([
                { role: 'system', content: 'carikan informasi tentang hal tersebut secara mendetail, dengan sumbernya juga!' },
                { role: 'user', content: text }
            ]);
            await m.reply(fallback.choices[0].message.content);
        } catch (e2) {
            console.error('Fallback error:', e2);
            await m.reply('Search Not Found!');
        }
    }
}
break;
case 'bing': {
    if (!text) return m.reply(`Example: ${prefix + command} query`);
    try {
        const url = `https://gtech-api-xtp1.onrender.com/api/bing/search?query=${encodeURIComponent(text)}&apikey=${apikey}`;
        let response = await axios.get(url);
        let data = response.data;
        if (!data.status || !data.results || !data.results.results || data.results.results.length === 0) {
            return m.reply('No search results found!');
        }
        let message = data.results.results.map((item, i) => {
            let title = item.title || 'No title';
            let url = item.url || 'No URL';
            let desc = item.description || 'No description';
            return `Result ${i + 1}:\nTitle: ${title}\nLink: ${url}\nDescription: ${desc}\n`;
        }).join('\n');

        await m.reply(message);
    } catch (e) {
        console.error('Bing search error:', e);
        await m.reply('Search Not Found!');
    }
}
break;
case 'wiki': case 'wikipedia': {
    if (!text) return m.reply(`Example: ${prefix + command} Albert Einstein`);
    try {
        let response = await Qasim.wikisearch(text);
        if (!response || !Array.isArray(response) || response.length === 0) {
            return m.reply('No Wikipedia results found!');
        }

        let data = response[0];
        let summary = data.wiki
            .replace(/\n+/g, '\n')
            .replace(/<[^>]*>/g, '')
            .trim();
        let title = data.judul || text;
        let pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
        let message = `*${title}*\n\n${summary}\n\nRead more: ${pageUrl}`;
        await m.reply({
            image: { url: data.thumb || 'https://pngimg.com/uploads/wikipedia/wikipedia_PNG35.png' },
            caption: message
        });
    } catch (e) {
        console.error('Error in wiki command:', e);
        m.reply('Failed to fetch Wikipedia results!');
    }
}
break;
case 'technews': {
    try {
        let url = `https://gtech-api-xtp1.onrender.com/api/tech/news?apikey=${apikey}`;
        let response = await fetch(url);
        let data = await response.json();
        if (!data.status || !data.message || !data.thumbnailUrl) {
            return m.reply('No news found!');
        }
        let message = data.message;
        let newsMatch = message.match(/News:\s*([\s\S]*)/);
        if (!newsMatch || !newsMatch[1]) {
            return m.reply('No news found!');
        }
        let newsText = newsMatch[1].trim();
        newsText = newsText.replace(/\.embed-container[\s\S]*/g, '').trim();
        await m.reply({
            image: { url: data.thumbnailUrl },
            caption: `"${newsText}"`
        });
    } catch (e) {
        console.error('Error in technews command:', e);
        m.reply('News Not Found!');
    }
}
break;
case 'wattpad': {
    if (!text) return m.reply(`Example: ${prefix + command} story name`);
    try {
        let response = await Qasim.wattpad(text);
        if (!Array.isArray(response) || response.length === 0) {
            return m.reply('No Wattpad stories found!');
        }
        let firstThumb = response[0].thumb;
        let caption = response.map(story => {
            return `Title: ${story.judul}\nReads: ${story.dibaca}\nVotes: ${story.divote}\nLink: ${story.link}`;
        }).join('\n\n');

        await m.reply({
            image: { url: firstThumb },
            caption: `"${caption}"`
        });
    } catch (e) {
        console.error('Error in wattpad command:', e);
        m.reply('Failed to fetch Wattpad stories!');
    }
}
break;
			case 'gimage': case 'bingimg': {
    if (!text) return m.reply(`Example: ${prefix + command} query`);
    try {
        let response = await Qasim.googleImage(text);
        let images = response.imageUrls;
        if (!images || !Array.isArray(images) || images.length === 0) {
            return m.reply('No images found!');
        }
        let imagesToSend = images.slice(0, 4);
        for (let imgUrl of imagesToSend) {
            await m.reply({ image: { url: imgUrl }, caption: 'Search Results: ' + text });
        }
    } catch (e) {
        console.error('Error in gimage command:', e);
        m.reply('Search Not Found!');
    }
}
case 'play': 
case 'song': 
case 'sing': {
    if (!text) return m.reply(`Example: ${prefix + command} dj komang`)
    
    // Send initial message
    const loadingMsg = `╭─❒ ➢ *IMMU MD ULTRA* ❒
├⬡ 🎵 Searching: ${text}
├⬡ ⏳ Processing...
╰────────────❒`;
    
    await m.reply(loadingMsg);
    
    try {
        // Search for YouTube videos using Veron API
        const searchUrl = `https://veron-apis.zone.id/search/yts?query=${encodeURIComponent(text)}&limit=5`;
        console.log('Searching YouTube:', searchUrl);
        
        const searchResp = await axios.get(searchUrl);
        const searchData = searchResp.data;
        console.log('Search response:', JSON.stringify(searchData, null, 2));
        
        if (!searchData || !searchData.success || !searchData.result || !searchData.result.data || !searchData.result.data.length) {
            return m.reply('❌ No videos found for your search!');
        }
        
        // Pick first result
        const hasil = searchData.result.data[0];
        const videoUrl = hasil.url;
        console.log('Selected video URL:', videoUrl);

        // Download using Veron Download API
        const downloadUrl = `https://veron-apis.zone.id/downloader/youtube?url=${encodeURIComponent(videoUrl)}`;
        console.log('Downloading with Veron API:', downloadUrl);
        
        const resp = await axios.get(downloadUrl);
        const data = resp.data;
        console.log('Veron API response:', JSON.stringify(data, null, 2));

        if (data && data.success && data.result && data.result.download) {
            const title = data.result.meta.title || hasil.title || 'Unknown';
            const author = data.result.resultOriginal?.author?.name || hasil.channel || 'Unknown';
            const audioUrl = data.result.download;
            const thumbnail = data.result.meta.thumbnail || hasil.thumbnail;
            const duration = data.result.meta.duration?.timestamp || hasil.duration || 'Unknown';
            const views = data.result.resultOriginal?.views ? data.result.resultOriginal.views.toLocaleString() : hasil.views?.toLocaleString() || 'Unknown';
            console.log('Audio download URL:', audioUrl);

            // Send audio with newsletter and external ad reply
            await qasim.sendMessage(m.chat, {
                audio: { url: audioUrl },
                fileName: `${title}.mp3`,
                mimetype: 'audio/mpeg',
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: "IMMU MD ULTRA",
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: title,
                        body: `🎤 ${author} | ⏱️ ${duration} | 👁️ ${views}`,
                        previewType: 'PHOTO',
                        thumbnailUrl: thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: videoUrl
                    }
                }
            }, { quoted: m });
            
            console.log('Audio sent successfully!');
            setLimit(m, db);
        } else {
            throw new Error('No download link found in API response');
        }
        
    } catch (e) {
        console.error('Download error:', e);
        m.reply(`❌ Failed to download! Error: ${e.message}`);
    }
}
break;
			case 'playdoc': {
    if (!text) return m.reply(`Example: ${prefix + command} dj komang`)
    
    // Send initial message
    const loadingMsg = `╭─❒ ➢ *EF-IMMU MD ULTRA* ❒
├⬡ 🎵 Searching: ${text}
├⬡ ⏳ Processing...
╰────────────❒`;
    
    await m.reply(loadingMsg);
    
    try {
        // Search for YouTube videos using Veron API
        const searchUrl = `https://veron-apis.zone.id/search/yts?query=${encodeURIComponent(text)}&limit=5`;
        console.log('Searching YouTube:', searchUrl);
        
        const searchResp = await axios.get(searchUrl);
        const searchData = searchResp.data;
        console.log('Search response:', JSON.stringify(searchData, null, 2));
        
        if (!searchData || !searchData.success || !searchData.result || !searchData.result.data || !searchData.result.data.length) {
            return m.reply('❌ No videos found for your search!');
        }
        
        // Pick first result
        const hasil = searchData.result.data[0];
        const videoUrl = hasil.url;
        console.log('Selected video URL:', videoUrl);

        // Download using EF-PRIME-MD-ULTRA API
        const downloadUrl = `https://ef-prime-md-ultra-apis.vercel.app/downloader/ytdlv2?url=${encodeURIComponent(videoUrl)}&format=audio`;
        console.log('Downloading with -IMMU API:', downloadUrl);
        
        const resp = await axios.get(downloadUrl);
        const data = resp.data;
        console.log('EF-IMMU API response:', JSON.stringify(data, null, 2));

        if (data && data.answer && data.answer.status && data.answer.audio_url) {
            const title = data.answer.title || hasil.title || 'Unknown';
            const author = data.answer.channel || hasil.channel || 'Unknown';
            const audioUrl = data.answer.audio_url;
            const thumbnail = data.answer.thumbnail || hasil.thumbnail;
            const duration = hasil.duration || 'Unknown';
            const views = hasil.views?.toLocaleString() || 'Unknown';
            console.log('Audio download URL:', audioUrl);

            // Send as document with newsletter and external ad reply
            await qasim.sendMessage(m.chat, {
                document: { url: audioUrl },
                fileName: `${title}.mp3`,
                mimetype: 'audio/mpeg',
                caption: `╭─❒ ➢ *IMMU MD ULTRA* ❒
├⬡ 🎵 Title: ${title}
├⬡ 🎤 Channel: ${author}
├⬡ ⏱️ Duration: ${duration}
├⬡ 👁️ Views: ${views}
╰────────────❒`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: "IMMU MD ULTRA",
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: title,
                        body: `🎤 ${author} | ⏱️ ${duration} | 👁️ ${views}`,
                        previewType: 'PHOTO',
                        thumbnailUrl: thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: videoUrl
                    }
                }
            }, { quoted: m });
            
            console.log('Document sent successfully!');
            setLimit(m, db);
        } else {
            throw new Error('No download link found in API response');
        }
        
    } catch (e) {
        console.error('Download error:', e);
        m.reply(`❌ Failed to download! Error: ${e.message}`);
    }
}
break;

			case 'pixiv': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} hu tao`)
				try {
					let { pixivdl } = require('./lib/pixiv')
					let res = await pixivdl(text)
					m.reply(mess.wait)
					for (let i = 0; i < res.media.length; i++) {
						let caption = i == 0 ? `${res.caption}\n\n*By:* ${res.artist}\n*Tags:* ${res.tags.join(', ')}` : ''
						let mime = (await FileType.fromBuffer(res.media[i])).mime 
						await m.reply({ [mime.split('/')[0]]: res.media[i], caption, mimetype: mime })
					}
					setLimit(m, db)
				} catch (e) {
					m.reply('Post not available!')
				}
			}
			break
			case 'pinterest': case 'pint': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} hu tao`)
				try {
					let anu = await pinterest(text)
					let result = pickRandom(anu)
					if (anu.length < 1) {
						m.reply('Post not available!');
					} else {
						await m.reply({ image: { url: result.images_url }, caption: `*Media Url :* ${result.pin}${result.link ? '\n*Source :* ' + result.link : ''}` })
						setLimit(m, db)
					}
				} catch (e) {
					try {
						const res = await fetchApi('/search/pinterest', { query: text });
						const hasil = pickRandom(res.data.result.pins)
						await m.reply({ image: { url: hasil.media.images.orig.url }, caption: `*Media Url :* ${hasil.media.images.orig.url}${hasil.pin_url ? '\n*Source :* ' + hasil.pin_url : ''}` })
						setLimit(m, db)
					} catch (e) {
						m.reply('Search not found!');
					}
				}
			}
			break
			case 'wallpaper': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} hu tao`)
				try {
					let anu = await wallpaper(text)
					let result = pickRandom(anu)
					if (anu.length < 1) {
						m.reply('Post not available!');
					} else {
						await m.reply({ image: { url: result.image[0] }, caption: `⭔ title : ${q}\n⭔ category : ${result.type}\n⭔ media url : ${result.image[2] || result.image[1] || result.image[0]}`})
						setLimit(m, db)
					}
				} catch (e) {
					try {
						let anu = await pinterest('wallpaper ' + text)
						let result = pickRandom(anu)
						if (anu.length < 1) {
							m.reply('Post not available!');
						} else {
							await m.reply({ image: { url: result.images_url }, caption: `*Media Url :* ${result.pin}${result.link ? '\n*Source :* ' + result.link : ''}` })
							setLimit(m, db)
						}
					} catch (e) {
						m.reply('Server is offline!')
					}
				}
			}
			break
			case 'ringtone': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} black rover`)
				try {
					let anu = await ringtone(text)
					let result = pickRandom(anu)
					await m.reply({ audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' })
					setLimit(m, db)
				} catch (e) {
					m.reply('Audio not found!')
				}
			}
			break
			case 'npm': case 'npmjs': {
				if (!text) return m.reply(`Example: ${prefix + command} axios`)
				try {
					let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
					let { objects } = await res.json()
					if (!objects.length) return m.reply('Search Not found')
					let txt = objects.map(({ package: pkg }) => {
						return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
					}).join`\n\n`
					m.reply(txt)
				} catch (e) {
					m.reply('Search Not found')
				}
			}
			break
			case 'style': {
				if (!text) return m.reply(`Example: ${prefix + command} Qasim`)
				let anu = await styletext(text)
				let txt = anu.map(a => `*${a.name}*\n${a.result}`).join`\n\n`
				m.reply(txt)
			}
			break
			case 'spotify': case 'spotifysearch': {
				if (!text) return m.reply(`Example: ${prefix + command} alan walker alone`)
				try {
					let hasil = await fetchJson('https://www.bhandarimilan.info.np/spotisearch?query=' + encodeURIComponent(text));
					let txt = hasil.map(a => {
						return `*Name : ${a.name}*\n- Artist : ${a.artist}\n- Url : ${a.link}`
					}).join`\n\n`
					m.reply(txt)
				} catch (e) {
					m.reply('Server Search Offline!')
				}
			}
			break
			case 'tenor': {
				if (!text) return m.reply(`Example: ${prefix + command} alone`)
				try {
					const anu = await fetchJson('https://g.tenor.com/v1/search?q=' + text + '&key=LIVDSRZULELA')
					const hasil = pickRandom(anu.results)
					await m.reply({ video: { url: hasil.media[0].mp4.url }, caption: `👀 *Media:* ${hasil.url}\n📋 *Description:* ${hasil.content_description}\n🔛 *Url:* ${hasil.itemurl}`, gifPlayback: true, gifAttribution: 2 })
				} catch (e) {
					m.reply('No Results Found!')
				}
			}
			break
			case 'urban': {
				if (!text) return m.reply(`Example: ${prefix + command} alone`)
				try {
					const anu = await fetchJson('https://api.urbandictionary.com/v0/define?term=' + text)
					const hasil = pickRandom(anu.list)
					await m.reply(`${hasil.definition}\n\nSource: ${hasil.permalink}`)
				} catch (e) {
					m.reply('No Results Found!')
				}
			}
			break
			
			// Stalker Menu
			case 'igstalk': case 'instagramstalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} username`)
				try {
					let anu = await instaStalk(text)
					m.reply({ image: { url: anu.avatar }, caption: `*Username :* ${anu.username}\n*Nickname :* ${anu.nickname}\n*Bio :* ${anu.description}\n*Posts :* ${anu.posts}\n*Followers :* ${anu.followers}\n*Following :* ${anu.following}\n*List Post :* ${anu.list_post.map(a => `\n*Url :* ${a.imageUrl}\n*Description :* ${a.description}\n*Detail :* ${a.detailUrl}`).join('\n')}` })
				} catch (e) {
					try {
						let res = await fetchApi('/stalk/instagram', { username: text });
						m.reply({ image: { url: res.data.profile_picture_url }, caption: `*Username :*${res.data?.username || 'unavailable'}\n*Nickname :*${res.data?.full_name || 'unavailable'}\n*ID :*${res.data?.instagram_id}\n*Followers :*${res.data?.followers || '0'}\n*Following :*${res.data?.following || '0'}\n*Description :*${res.data?.description || 'unavailable'}\n*Website :*${res.data?.website || 'unavailable'}\n*Add At :*${res.data?.added_date}\n*Uploads :*${res.data?.uploads}\n*Verified :*${res.data?.is_verified}\n*Private :*${res.data.is_private}\n` })
					} catch (e) {
						m.reply('Username Not Found!')
					}
				}
			}
			break
			case 'wastalk': case 'whatsappstalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} @tag / 923xxx`)
				try {
					let num = m.quoted?.sender || m.mentionedJid?.[0] || text
					if (!num) return m.reply(`Example : ${prefix + command} @tag / 923xxx`)
					num = num.replace(/\D/g, '') + '@s.whatsapp.net'
					if (!(await qasim.onWhatsApp(num))[0]?.exists) return m.reply('Number not registered on WhatsApp!')
					let img = await qasim.profilePictureUrl(num, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
					let bio = await qasim.fetchStatus(num).catch(_ => { })
					let name = await qasim.getName(num)
					let business = await qasim.getBusinessProfile(num)
					let format = PhoneNum(`+${num.split('@')[0]}`)
					let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
					let country = regionNames.of(format.getRegionCode('international'));
					let wea = `WhatsApp Stalk\n\n*° Country :* ${country.toUpperCase()}\n*° Name :* ${name ? name : '-'}\n*° Format Number :* ${format.getNumber('international')}\n*° Url Api :* wa.me/${num.split('@')[0]}\n*° Mentions :* @${num.split('@')[0]}\n*° Status :* ${bio?.status || '-'}\n*° Date Status :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale('id').format('LL') : '-'}\n\n${business ? `*WhatsApp Business Stalk*\n\n*° BusinessId :* ${business.wid}\n*° Website :* ${business.website ? business.website : '-'}\n*° Email :* ${business.email ? business.email : '-'}\n*° Category :* ${business.category}\n*° Address :* ${business.address ? business.address : '-'}\n*° Timeone :* ${business.business_hours.timezone ? business.business_hours.timezone : '-'}\n*° Description* : ${business.description ? business.description : '-'}` : '*Standard WhatsApp Account*'}`
					img ? await qasim.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
				} catch (e) {
					m.reply('Number Not Found!')
				}
			}
			break
			case 'telestalk': case 'telegramstalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} username`)
				try {
					const res = await telegramStalk(text)
					if (!res.description || res.title.startsWith('Telegram: Contact')) throw 'Error'
					m.reply({ image: { url: res.image_url }, caption: `*Username :* ${text}\n*Nickname :* ${res.title || 'unavailable'}\n*Desc :* ${res.description || 'unavailable'}\n*Url :* ${res.url}`})
				} catch (e) {
					m.reply('User Not Found!')
				}
			}
			break
			case 'tiktokstalk': case 'ttstalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} username`)
				try {
					const res = await tiktokStalk(text)
					m.reply({ image: { url: res.avatarThumb }, caption: `*Username :* ${text}\n*Nickname :* ${res.nickname}\n*Followers :* ${res.followerCount}\n*Following :* ${res.followingCount}\n*Bio :* ${res.signature}\n*Verified :* ${res.verified}\n*Video Count :* ${res.videoCount}\n*Heart Count :* ${res.heartCount}` })
				} catch (e) {
					m.reply('Username Not Found!')
				}
			}
			break
			case 'genshinstalk': case 'gistalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} id`)
				try {
					const res = await genshinStalk(text)
					m.reply({ image: { url: res.image }, caption: `*Genshin profile*\n- *ID :* ${res.uid}\n- *Nickname :* ${res.nickname}\n- *Signature :* ${res.signature}\n- *Level :* ${res.level}\n- *World Level :* ${res.world_level}\n- *Achivement :* ${res.achivement}\n- *Spiral Abyss :* ${res.spiral_abyss}\n- *Ttl :* ${res.ttl}` })
				} catch (e) {
					m.reply('Username Not Found!')
				}
			}
			break
			case 'ghstalk': case 'githubstalk': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} username`)
				try {
					const res = await fetchJson('https://api.github.com/users/' + text)
					m.reply({ image: { url: res.avatar_url }, caption: `*Username :* ${res.login}\n*Nickname :* ${res.name || 'unavailabe'}\n*Bio :* ${res.bio || 'unavailable'}\n*ID :* ${res.id}\n*Node ID :* ${res.node_id}\n*Type :* ${res.type}\n*Admin :* ${res.admin ? 'Yes' : 'No'}\n*Company :* ${res.company || 'unavailable'}\n*Blog :* ${res.blog || 'unavailable'}\n*Location :* ${res.location || 'unavailable'}\n*Email :* ${res.email || 'unavailble'}\n*Public Repo :* ${res.public_repos}\n*Public Gists :* ${res.public_gists}\n*Followers :* ${res.followers}\n*Following :* ${res.following}\n*Created At :* ${res.created_at} *Updated At :* ${res.updated_at}` })
				} catch (e) {
					m.reply('Username Not Found!')
				}
			}
			break
			case 'npmstalk': {
  if (!text) return m.reply(`Example: ${prefix + command} express`);
  try {
    let response = await Qasim.npmStalk(text);
    if (!response.status || !response.result || !response.result.name) {
      return m.reply('No npm package found!');
    }
    let pkg = response.result;
    let name = pkg.name || text;
    let version = (pkg['dist-tags'] && pkg['dist-tags'].latest) || 'N/A';
    let description = pkg.description || 'No description available.';
    let author = (pkg.author && pkg.author.name) || 'Unknown';
    let license = pkg.license || 'Unknown';
    let homepage = pkg.homepage || `https://www.npmjs.com/package/${name}`;
    let repository = (pkg.repository && pkg.repository.url) || 'N/A';
    let message = `*${name}*\n\n` +
                  `Version: ${version}\n` +
                  `Author: ${author}\n` +
                  `License: ${license}\n` +
                  `Description: ${description}\n\n` +
                  `Homepage: ${homepage}\n` +
                  `Repository: ${repository}`;

    await m.reply(message);
    setLimit(m, db);
  } catch (e) {
    console.error('Error in npmstalk command:', e);
    m.reply('Failed to fetch npm package info!');
  }
}
break;	
			// Downloader Menu
			case 'ytmp3': case 'ytaudio': case 'ytplayaudio': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} url`)
				if (!text.includes('youtu')) return m.reply('Invalid Youtube Url!')
				m.reply(mess.wait)
				try {
					const hasil = await ytMp3(text);
					await m.reply({
						audio: { url: hasil.result },
						mimetype: 'audio/mpeg',
						contextInfo: {
							externalAdReply: {
								title: hasil.title,
								body: hasil.channel,
								previewType: 'PHOTO',
								thumbnailUrl: hasil.thumb,
								mediaType: 1,
								renderLargerThumbnail: true,
								sourceUrl: text
							}
						}
					})
					setLimit(m, db)
				} catch (e) {
					try {
						let hasil = await savetube.download(text, 'mp3')
						await qasim.sendFileUrl(m.chat, hasil.result.download, hasil.result.title, m)
						setLimit(m, db)
					} catch (e) {
						try {
							const nvl = new NvlGroup();
							let anu = await nvl.download(text);
							await qasim.sendFileUrl(m.chat, anu.audio[0].url, anu.audio[0].size, m)
							setLimit(m, db)
						} catch (e) {
							try {
								let hasil = await fetchApi('/download/youtube', { url: text })
								await qasim.sendFileUrl(m.chat, hasil.result.audio, hasil.result.title, m)
								setLimit(m, db)
							} catch (e) {
								m.reply('Failed to Download Audio!')
							}
						}
					}
				}
			}
			break
			case 'ytmp4': case 'ytvideo': case 'ytplayvideo': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} url`)
				if (!text.includes('youtu')) return m.reply('Invalid Youtube Url!')
				m.reply(mess.wait)
				try {
					const hasil = await ytMp4(text);
					await m.reply({ video: hasil.result, caption: `*📍Title:* ${hasil.title}\n*✏Description:* ${hasil.desc ? hasil.desc : ''}\n*🚀Channel:* ${hasil.channel}\n*🗓Upload at:* ${hasil.uploadDate}` })
					setLimit(m, db)
				} catch (e) {
					try {
						let hasil = await savetube.download(text, '360')
						await qasim.sendFileUrl(m.chat, hasil.result.download, hasil.result.title, m)
						setLimit(m, db)
					} catch (e) {
						try {
							const nvl = new NvlGroup();
							let anu = await nvl.download(text);
							await qasim.sendFileUrl(m.chat, anu.video.find(v => v.height === 360).url || anu.video[0].url, 'Done', m)
							setLimit(m, db)
						} catch (e) {
							try {
								let hasil = await fetchApi('/download/youtube', { url: text })
								await qasim.sendFileUrl(m.chat, hasil.result.video, hasil.result.title, m)
								setLimit(m, db)
							} catch (e) {
								m.reply('Failed to Download Video!')
							}
						}
					}
				}
			}
			break
			case 'ig': case 'instagram': case 'instadl': case 'igdown': case 'igdl': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} url`)
				if (!text.includes('instagram.com')) return m.reply('Invalid Instagram Url!')
				m.reply(mess.wait)
				try {
					const hasil = await instagramDl(text);
					if(hasil.length < 0) return m.reply('Post Unavailable or Private!')
					for (let i = 0; i < hasil.length; i++) {
						await qasim.sendFileUrl(m.chat, hasil[i].url, 'Done', m)
					}
					setLimit(m, db)
				} catch (e) {
					try {
						let hasil = await fetchApi('/download/instagram', { url: text })
						if(hasil.result.url.length < 0) return m.reply('Post Unavailable or Private!')
						for (let i = 0; i < hasil.result.url.length; i++) {
							await qasim.sendFileUrl(m.chat, hasil.result.url[i], 'Done', m)
						}
						setLimit(m, db)
					} catch (e) {
						m.reply('Post Unavailable or Private!')
					}
				}
			}
			break
			case 'igstory': case 'instagramstory': case 'instastory': case 'storyig': {
				if (!text) return m.reply(`Example: ${prefix + command} username`)
				try {
					const hasil = await instaStory(text);
					m.reply(mess.wait)
					for (let i = 0; i < hasil.results.length; i++) {
						await qasim.sendFileUrl(m.chat, hasil.results[i].url, 'Done', m)
					}
				} catch (e) {
					m.reply('Username not found or Private!');
				}
			}
			break
			case 'tiktok': case 'tiktokdown': case 'ttdown': case 'ttdl': case 'tt': case 'ttmp4': case 'ttvideo': case 'tiktokmp4': case 'tiktokvideo': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} url`)
				if (!text.includes('tiktok.com')) return m.reply('Invalid Tiktok Url!')
				try {
					const hasil = await tiktokDl(text);
					m.reply(mess.wait)
					if (hasil && hasil.size_nowm) {
						await qasim.sendFileUrl(m.chat, hasil.data[1].url, `*📍Title:* ${hasil.title}\n*⏳Duration:* ${hasil.duration}\n*🎃Author:* ${hasil.author.nickname} (@${hasil.author.fullname})`, m)
					} else {
						for (let i = 0; i < hasil.data.length; i++) {
							await qasim.sendFileUrl(m.chat, hasil.data[i].url, `*🚀Image:* ${i+1}`, m)
						}
					}
					setLimit(m, db)
				} catch (e) {
					m.reply('Failed/Url Invalid!')
				}
			}
			break
			case 'ttmp3': case 'tiktokmp3': case 'ttaudio': case 'tiktokaudio': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} url`)
				if (!text.includes('tiktok.com')) return m.reply('Invalid Tiktok Url!')
				try {
					const hasil = await tiktokDl(text);
					m.reply(mess.wait)
					await m.reply({
						audio: { url: hasil.music_info.url },
						mimetype: 'audio/mpeg',
						contextInfo: {
							externalAdReply: {
								title: 'TikTok • ' + hasil.author.nickname,
								body: hasil.stats.likes + ' suka, ' + hasil.stats.comment + ' komentar. ' + hasil.title,
								previewType: 'PHOTO',
								thumbnailUrl: hasil.cover,
								mediaType: 1,
								renderLargerThumbnail: true,
								sourceUrl: text
							}
						}
					})
					setLimit(m, db)
				} catch (e) {
					m.reply('Failed/Url Invalid!')
				}
			}
			case 'fb': 
case 'fbdl': 
case 'fbdown': 
case 'facebook': 
case 'facebookdl': 
case 'facebookdown': 
case 'fbdownload': 
case 'fbmp4': 
case 'fbvideo': {
    if (!isLimit) return m.reply(mess.limit)
    if (!text) return m.reply(`Example: ${prefix + command} url`)
    if (!text.includes('facebook.com')) return m.reply('Invalid Facebook Url!')
    
    try {
        m.reply(mess.wait)
        
        const response = await axios.get(`https://ef-prime-md-ultra-apis.vercel.app/downloader/fbdl?url=${encodeURIComponent(text)}`);
        const hasil = response.data;
        
        console.log('Facebook API response:', JSON.stringify(hasil, null, 2));
        
        if (!hasil.answer || !hasil.answer.url) {
            return m.reply('❌ Video not found or failed to download!');
        }
        
        const videoUrl = hasil.answer.url;
        const thumbnail = hasil.answer.thumbnail;
        const title = hasil.answer.title || 'Facebook Video';
        
        // Decode HTML entities in title
        const decodedTitle = title.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => 
            String.fromCodePoint(parseInt(hex, 16))
        );
        
        // Send video with context
        await qasim.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎥 *${decodedTitle}*\n\n📦 Powered by imadalidev 😎`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363341506278064@newsletter',
                    newsletterName: "EF-IMMU MD ULTRA",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: decodedTitle,
                    body: '📱 Facebook Video Downloader',
                    previewType: 'PHOTO',
                    thumbnailUrl: thumbnail,
                    mediaType: 2,
                    renderLargerThumbnail: true,
                    sourceUrl: text
                }
            }
        }, { quoted: m });
        
        setLimit(m, db)
    } catch (e) {
        console.error('Facebook download error:', e);
        m.reply('❌ Server offline or failed to download video!');
    }
}
break
			case 'mediafire': case 'mf': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} https://www.mediafire.com/file/xxxxxxxxx/xxxxx.zip/file`)
				if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return m.reply('Url Invalid!')
				try {
					const anu = await mediafireDl(text)
					await m.reply({ document: { url: anu.link }, caption: `*MEDIAFIRE DOWNLOADER*\n\n*${setv} Name* : ${anu.name}\n*${setv} Size* : ${anu.size}\n*${setv} Type* : ${anu.type}\n*${setv} Upload At* : ${anu.upload_date}\n*${setv} Link* : ${anu.link}`, fileName: anu.name, mimetype: anu.type })
					setLimit(m, db)
				} catch (e) {
					try {
						let anu = await fetchApi('/download/mediafire', { url: text })
						await qasim.sendMedia(m.chat, anu.data.url, anu.data.filename, `*MEDIAFIRE DOWNLOADER*\n\n*${setv} Name* : ${anu.data.filename}\n*${setv} Size* : ${anu.data.size}`, m)
						setLimit(m, db)
					} catch (e) {
						m.reply('Server offline!')
					}
				}
			}
			break
			case 'spotifydl': {
				if (!isLimit) return m.reply(mess.limit)
				if (!text) return m.reply(`Example: ${prefix + command} https://open.spotify.com/track/0JiVRyTJcJnmlwCZ854K4p`)
				if (!isUrl(args[0]) && !args[0].includes('open.spotify.com/track')) return m.reply('Url Invalid!')
				try {
					const hasil = await spotifyDl(text);
					m.reply(mess.wait)
					await m.reply({
						audio: { url: hasil.download },
						mimetype: 'audio/mpeg',
						contextInfo: {
							externalAdReply: {
								title: hasil.title,
								body: clockString(hasil.duration),
								previewType: 'PHOTO',
								thumbnailUrl: hasil.cover,
								mediaType: 1,
								renderLargerThumbnail: true,
								sourceUrl: text
							}
						}
					})
					setLimit(m, db)
				} catch (e) {
					m.reply('Server offline!')
				}
			}
			break
			case 'xdown': case 'xdl': case 'twitter': case 'twitterdl': {
  if (!text) return m.reply(`Example: ${prefix + command} url`);
  const xUrlRegex = /https?:\/\/(www\.)?x\.com\/.+/i;
  if (!xUrlRegex.test(text)) {
    return m.reply('Please provide a valid X.com (Twitter) URL.');
  }
  try {
    let response = await Qasim.xdown(text);
    if (!response || !response.found || !Array.isArray(response.media) || response.media.length === 0) {
      return m.reply('Failed to download media from the provided URL.');
    }
    let mediaItem = response.media[0];
    let mediaUrl = mediaItem.url;
    let mediaType = mediaItem.type;
    let caption = `Author: ${response.authorName} (@${response.authorUsername})\n` +
                  `Likes: ${response.likes}\n` +
                  `Replies: ${response.replies}\n` +
                  `Retweets: ${response.retweets}\n` +
                  `Date: ${response.date}`;
    if (mediaType === 'video') {
      await m.reply({
        video: { url: mediaUrl },
        caption: caption
      });
    } else if (mediaType === 'image') {
      await m.reply({
        image: { url: mediaUrl },
        caption: caption
      });
    } else {
      await m.reply(`Media URL: ${mediaUrl}\n\n${caption}`);
    }
  } catch (e) {
    console.error('Error in xdown command:', e);
    m.reply('Error occurred while processing the X.com download.');
  }
}
case 'video': 
case 'ytvideo': 
case 'ytmp4': 
case 'youtubemp4': {
    if (!text) return m.reply(`Example: ${prefix + command} TONES AND I DANCE MONKEY`)
    
    const loadingMsg = `╭─❒ ➢ *IMMU MD ULTRA* ❒\n├⬡ 🎥 Searching: ${text}\n├⬡ ⏳ Processing...\n╰────────────❒`;
    await m.reply(loadingMsg);
    
    try {
        // Search for YouTube videos using Veron API
        const searchUrl = `https://veron-apis.zone.id/search/yts?query=${encodeURIComponent(text)}&limit=5`;
        console.log('Searching YouTube:', searchUrl);
        
        const searchResp = await axios.get(searchUrl);
        const searchData = searchResp.data;
        console.log('Search response:', JSON.stringify(searchData, null, 2));
        
        if (!searchData || !searchData.success || !searchData.result || !searchData.result.data || !searchData.result.data.length) {
            return m.reply('❌ No videos found for your search!');
        }
        
        // Pick first result
        const hasil = searchData.result.data[0];
        const videoUrl = hasil.url;
        console.log('Selected video URL:', videoUrl);

        // Download using EF-PRIME-MD-ULTRA API
        const downloadUrl = `https://ef-prime-md-ultra-apis.vercel.app/downloader/ytdlv2?url=${encodeURIComponent(videoUrl)}&format=video`;
        console.log('Downloading with IMMU MD-PRIME API:', downloadUrl);
        
        const resp = await axios.get(downloadUrl);
        const data = resp.data;
        console.log('IMMU MD API response:', JSON.stringify(data, null, 2));

        if (data && data.answer && data.answer.status && data.answer.video_url) {
            const title = data.answer.title || hasil.title || 'Unknown';
            const author = data.answer.channel || hasil.channel || 'Unknown';
            const videoDownloadUrl = data.answer.video_url;
            const thumbnail = data.answer.thumbnail || hasil.thumbnail;
            const duration = hasil.duration || 'Unknown';
            const views = hasil.views ? hasil.views.toLocaleString() : 'Unknown';
            console.log('Video download URL:', videoDownloadUrl);

            // Send video with external ad reply
            await qasim.sendMessage(m.chat, {
                video: { url: videoDownloadUrl },
                fileName: `${title}.mp4`,
                caption: `🎥 *${title}*\n\n📦𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 imadalidev`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: "IMMU MD ULTRA",
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: title,
                        body: `🎤 ${author} | ⏱️ ${duration} | 👁️ ${views}`,
                        previewType: 'PHOTO',
                        thumbnailUrl: thumbnail,
                        mediaType: 2,
                        renderLargerThumbnail: true,
                        sourceUrl: videoUrl
                    }
                }
            }, { quoted: m });
            
            console.log('Video sent successfully!');
            setLimit(m, db);
        } else {
            throw new Error('No video download link found in API response');
        }
        
    } catch (e) {
        console.error('Video download error:', e);
        m.reply(`❌ Failed to download video! Error: ${e.message}`);
    }
}
break;
					//Text Pro Menu
				case 'mascot': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/mascot?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
			case 'foggy': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/foggy?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'galaxy': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/galaxy?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
				case 'golden': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/golden?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'mettalic': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/mettalic?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'gradient': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/gradient?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
				case 'metal': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/metal?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'jewel': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/jewel?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'blackpink': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/blackpink?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
				case 'sand': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/sand?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'gaming': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/gaming?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'colorful': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/colorful?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
				case 'matrix': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/matrix?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'wings': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/angelwing?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'hacker': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/hacker?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
				case 'logo': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/circlemascot?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'update': {
	try {
		const fetch = require('node-fetch');
		const { execSync } = require('child_process');
		const fs = require('fs');
		
		m.reply('🔍 Checking for updates...')
		
		const response = await fetch('https://api.github.com/repos/XRI-DOUBLE07/IMMU-MD-/commits/main');
		const data = await response.json();
		
		let user = Object.keys(db.users)
		for (let jid of user) {
			const limitUser = db.users[jid].vip ? limit.vip : checkStatus(jid, premium) ? limit.premium : limit.free
			if (db.users[jid].limit < limitUser) continue;
		}
		
		if (data.sha && db.lastCommit !== data.sha) {
			const filesResponse = await fetch(`https://api.github.com/repos/XRI-DOUBLE07/IMMU-MD-/commits/main/${data.sha}`);
			const filesData = await filesResponse.json();
			const changedFiles = filesData.files || [];
			
			m.reply(`✅ *Update Found!*\n\n📝 ${data.commit.message}\n📁 Files to update: ${changedFiles.length}\n\n⏳ Downloading changes...`)
			
			let needsRestart = false;
			const criticalFiles = ['index.js', 'main.js', 'package.json', 'config.js'];
			
			// Fetch only changed files
			for (let file of changedFiles) {
				if (file.status === 'removed') continue;
				
				try {
					const fileResponse = await fetch(file.raw_url);
					const fileContent = await fileResponse.text();
					fs.writeFileSync(file.filename, fileContent);
					console.log(`Updated: ${file.filename}`)
					
					// Check if critical files were changed
					if (criticalFiles.some(cf => file.filename.includes(cf))) {
						needsRestart = true;
					}
				} catch (err) {
					console.log(`Failed to update ${file.filename}:`, err.message)
				}
			}
			
			db.lastCommit = data.sha;
			
			if (needsRestart) {
				m.reply(`✅ *Update Complete!*\n\n✔️ Updated ${changedFiles.length} files\n🔄 Critical files changed - Restarting bot...\n\n_Bot will be back online shortly_`)
				
				setTimeout(() => {
					process.exit(0);
				}, 2000);
			} else {
				m.reply(`✅ *Update Complete!*\n\n✔️ Updated ${changedFiles.length} files\n📌 No restart needed - Bot is still running!`)
			}
		} else {
			m.reply('✅ Bot is already up to date!')
		}
	} catch (error) {
		m.reply('❌ Update failed: ' + error.message)
	}
}
break;
case 'typography': case 'typo': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} text`);
    }
    try {
m.react('⏳')
        const url = `https://gtech-api-xtp1.onrender.com/api/ephoto/typography?text=${encodeURIComponent(text)}&apikey=${apikey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.status || !data.result || !data.result.imageUrl) throw new Error('Invalid API response');
        await qasim.sendFileUrl(m.chat, data.result.imageUrl, `${text}`, m);
m.react('✅')
    } catch (e) {
m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
			// Quotes Menu
			case 'motivation': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/Motivational.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Motivational Quotes*\n\n${randomQuote}`;
        m.reply(message);
    } catch (e) {
        console.error('Error fetching motivational quotes:', e);
        m.reply('Sorry, failed to get a motivational quote.');
    }
}
break;
case 'funfact': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/FunFacts.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Fun Facts*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching fun facts:', e);
        m.reply('Sorry, failed to get a fun fact.');
    }
}
break;
case 'lifehack': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/LifeHacks.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Life Hacks*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching life hacks:', e);
        m.reply('Sorry, failed to get a life hack.');
    }
}
break;
case 'program': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/ProgrammingTips.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Programming Tips*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching programming tips:', e);
        m.reply('Sorry, failed to get a programming tip.');
    }
}
break;
case 'tech': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/TechTips.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Tech Tips*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching Tech Tips:', e);
        m.reply('Sorry, failed to get a Tech Tip.');
    }
}
break;
case 'quotes': case 'quote': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/Quotes.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Random Quotes*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching quotes:', e);
        m.reply('Sorry, failed to get a quotes.');
    }
}
break;
case 'islamic': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/IslamicQuotes.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch Islamic quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Islamic Quotes*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching quotes:', e);
        m.reply('Sorry, failed to get a quotes.');
    }
}
break;
case 'pickup': {
    try {
        const url = 'https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/TXT-DATA/PickupLines.txt';
        let res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch quotes');
        let text = await res.text();
        let quotes = text.split(/\r?\n/).filter(q => q.trim().length > 0);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let message = `*Pickup Lines*\n\n${randomQuote}`;

        m.reply(message);
    } catch (e) {
        console.error('Error fetching pickup lines:', e);
        m.reply('Sorry, failed to get a pickup line.');
    }
}
break;
			
			// Random Menu
			case 'coffe': case 'coffee': {
				try {
					await qasim.sendFileUrl(m.chat, 'https://coffee.alexflipnote.dev/random', '☕ Random Coffe', m)
				} catch (e) {
					try {
						const anu = await fetchJson('https://api.sampleapis.com/coffee/hot')
						await qasim.sendFileUrl(m.chat, pickRandom(anu).image, '☕ Random Coffe', m)
					} catch (e) {
						m.reply('Server Offline!')
					}
				}
			}
			break
			case 'cyberspace': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/CyberSpace.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Cyberspace Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'game': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/GameWallp.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Game Wallpaper', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'mountain': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/Mountain.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Mountain Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'programming': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/Programming.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Programming Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'islamic': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/Islamic.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Islamic Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'technology': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Islamic-Database/main/Technology.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Technology Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'ronaldo': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/CristianoRonaldo.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random cr7 Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'messi': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/Messi.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Messi Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;

			
			// Anime Menu
			case 'waifu': case 'neko': {
				try {
					if (!isNsfw && text === 'nsfw') return m.reply('Nsfw Filter Is Active!')
					const res = await fetchJson('https://api.waifu.pics/' + (text === 'nsfw' ? 'nsfw' : 'sfw') + '/' + command)
					await qasim.sendFileUrl(m.chat, res.url, 'Random Waifu', m)
					setLimit(m, db)
				} catch (e) {
					m.reply('Server offline!')
				}
			}
			break
			case 'akira': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-akira.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Akira Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'akiyama': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-akiyama.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Akiyama Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'anna': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-anna.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Anna Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'asuna': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-asuna.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Asuna Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'boruto': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-boruto.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Boruto Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'chiho': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-chiho.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Chiho Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'cosplay': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-cosplay.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Cosplay Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'eba': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-eba.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Eba Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'emilia': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-emilia.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Emilia Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'erza': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-erza.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Erza Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'hinata': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-hinata.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Hinata Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'isuzu': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-isuzu.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Isuzu Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'itachi': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-itachi.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Itachi Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'mikasa': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-mikasa.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Mikasa Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'miku': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-miku.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Miku Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'naruto': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-naruto.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Naruto Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'nezuko': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-nezuko.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Nezuko Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'sagiri': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-sagiri.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Sagiri Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'sasuke': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/anime-sasuke.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Sasuke Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
case 'yuri': {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GlobalTechInfo/Anime-API/Guru/BOT-JSON/yuri.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const images = await response.json();
        const randomImage = images[Math.floor(Math.random() * images.length)];
        await qasim.sendFileUrl(m.chat, randomImage, 'Random Yuri Image', m);
    } catch (e) {
        m.reply('Server Offline or Data Unavailable!');
    }
}
break;
			
			// Fun Menu
			case 'dice': {
				let ddsa = [{ url: 'https://telegra.ph/file/9f60e4cdbeb79fc6aff7a.png', no: 1 },{ url: 'https://telegra.ph/file/797f86e444755282374ef.png', no: 2 },{ url: 'https://telegra.ph/file/970d2a7656ada7c579b69.png', no: 3 },{ url: 'https://telegra.ph/file/0470d295e00ebe789fb4d.png', no: 4 },{ url: 'https://telegra.ph/file/a9d7332e7ba1d1d26a2be.png', no: 5 },{ url: 'https://telegra.ph/file/99dcd999991a79f9ba0c0.png', no: 6 }]
				let media = pickRandom(ddsa)
				try {
					await qasim.sendAsSticker(m.chat, media.url, m, { packname: packname, author: author, isAvatar: 1 })
				} catch (e) {
					let anu = await fetch(media.url)
					let una = await anu.buffer()
					await qasim.sendAsSticker(m.chat, una, m, { packname: packname, author: author, isAvatar: 1 })
				}
			}
			break
			case 'halah': case 'hilih': case 'huluh': case 'heleh': case 'holoh': {
				if (!m.quoted && !text) return m.reply(`Send/reply text with caption ${prefix + command}`)
				ter = command[1].toLowerCase()
				tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
				m.reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
			}
			break
			case 'canthey': {
				if (!text) return m.reply(`Example : ${prefix + command} I win?`)
				let bisa = ['Yes they can','Just try','Definitely can','Maybe','Cannot','Impossible','Try again','Are you dreaming?','Are you sure they can?']
				let keh = bisa[Math.floor(Math.random() * bisa.length)]
				m.reply(`*Can they ${text}*\nAnswer : ${keh}`)
			}
			break
			case 'isit': {
				if (!text) return m.reply(`Example : ${prefix + command} possible for me to win?`)
				let apa = ['Yes','No','Could be','Try again','Maybe','Maybe not','Maybe yes','I don\'t know']
				let kah = apa[Math.floor(Math.random() * apa.length)]
				m.reply(`*Is it ${text}*\nAnswer : ${kah}`)
			}
			break
			case 'when': case 'whenwill': {
				if (!text) return m.reply(`Example : ${prefix + command} I win?`)
				let kapan = ['Tomorrow','Day after tomorrow','Later','In 4 days','In 5 days','In 6 days','In 1 week','In 2 weeks','In 3 weeks','In 1 month','In 2 months','In 3 months','In 4 months','In 5 months','In 6 months','In 1 year','In 2 years','In 3 years','In 4 years','In 5 years','In 6 years','In 1 century','In 3 days','Next month','I don\'t know','Never']
				let koh = kapan[Math.floor(Math.random() * kapan.length)]
				m.reply(`*When will ${text}*\nAnswer : ${koh}`)
			}
			break
			case 'who': case 'whois': {
				if (!m.isGroup) return m.reply(mess.group)
				if (!text) return m.reply(`Example : ${prefix + command} the smartest?`)
				let member = (store.groupMetadata[m.chat] ? store.groupMetadata[m.chat].participants : m.metadata.participants).map(a => a.id)
				let siapakh = pickRandom(member)
				m.reply(`@${siapakh.split('@')[0]}`);
			}
			break
			case 'askmagicshell': case 'magicshell': case 'shell': {
				if (!text) return m.reply(`Example : ${prefix + command} can I borrow 100?`)
				let krng = ['Maybe someday', 'Not really', 'Neither', 'I don\'t think so', 'Yes', 'No', 'Try asking again', 'Nothing']
				let jwb = pickRandom(krng)
				m.reply(`*Question : ${text}*\n*Answer : ${jwb}*`)
			}
			break
			case 'checkdeath': {
				if (!text) return m.reply(`Example : ${prefix + command} your name`)
				let teksnya = text.replace(/@|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/\d/g, '');
				let data = await axios.get(`https://api.agify.io/?name=${teksnya ? teksnya : 'bot'}`).then(res => res.data).catch(e => ({ age: Math.floor(Math.random() * 90) + 20 }));
				m.reply(`Name : ${text}\n*Will die at age :* ${data.age == null ? (Math.floor(Math.random() * 90) + 20) : data.age} Years old.\n\n_Repent quickly bro_\n_Because no one knows when death comes_`)
			}
			break
			case 'checkpersonality': {
				let sifat_a = ['Wise','Patient','Creative','Humorous','Sociable','Independent','Loyal','Honest','Generous','Idealistic','Fair','Polite','Diligent','Hardworking','Forgiving','Kind-hearted','Cheerful','Confident','Caring','Disciplined','Optimistic','Brave','Grateful','Responsible','Reliable','Calm','Cool','Logical']
				let sifat_b = ['Arrogant','Insecure','Vengeful','Sensitive','Perfectionist','Attention seeker','Stingy','Selfish','Pessimistic','Loner','Manipulative','Unstable','Coward','Vulgar','Unfaithful','Lazy','Rude','Complicated','Wasteful','Stubborn','Unwise','Traitor','Greedy','Covetous','Gossiper','Racist','Careless','Intolerant']
				let teks = `╭──❍「 *Check Personality* 」❍\n│• Personality of ${text && m.mentionedJid ? text : '@' + m.sender.split('@')[0]}${(text && m.mentionedJid ? '' : (`\n│• Name : *${text ? text : m.pushName}*` || '\n│• Name : *No Name*'))}\n│• Person who is : *${pickRandom(sifat_a)}*\n│• Weakness : *${pickRandom(sifat_b)}*\n│• Courage : *${Math.floor(Math.random() * 100)}%*\n│• Care : *${Math.floor(Math.random() * 100)}%*\n│• Anxiety : *${Math.floor(Math.random() * 100)}%*\n│• Fear : *${Math.floor(Math.random() * 100)}%*\n│• Good morals : *${Math.floor(Math.random() * 100)}%*\n│• Bad morals : *${Math.floor(Math.random() * 100)}%*\n╰──────❍`
				m.reply(teks)
			}
			break
			case 'checkguardian': {
				if (!text) return m.reply(`Example : ${prefix + command} your name`)
				try {
					const res = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/random/cekkhodam.json');
					const hasil = pickRandom(res);
					m.reply(`Guardian spirit of *${text}* is *${hasil.nama}*\n_${hasil.deskripsi}_`)
				} catch (e) {
					m.reply(pickRandom(['TV Doctor','Spicy Chef','Soap Opera Preacher','Gaming Kid']))
				}
			}
			break
			case 'rate': {
				m.reply(`Rate Bot : *${Math.floor(Math.random() * 100)}%*`)
			}
			break
			case 'mysoulmate': {
				if (!m.isGroup) return m.reply(mess.group)
				let member = (store.groupMetadata?.[m.chat]?.participants || groupCache.get(m.chat)?.participants || m.metadata?.participants || []).map(a => a.id)
				let jodoh = pickRandom(member)
				m.reply(`👫Your soulmate is\n@${m.sender.split('@')[0]} ❤ @${jodoh ? jodoh.split('@')[0] : '0'}`);
			}
			break
			case 'couple': {
				if (!m.isGroup) return m.reply(mess.group)
				let member = (store.groupMetadata?.[m.chat]?.participants || groupCache.get(m.chat)?.participants || m.metadata?.participants || []).map(a => a.id)
				let jadian1 = pickRandom(member)
				let jadian2 = pickRandom(member)
				m.reply(`Aww the new couple💖 Don't forget to donate🗿\n@${jadian1.split('@')[0]} ❤ @${jadian2.split('@')[0]}`);
			}
			break
			case 'frame': {
				let [teks1, teks2, teks3] = text.split`|`
				if (!teks1 || !teks2 || !teks3) return m.reply(`Example : ${prefix + command} target message|your message|number/tag target`)
				let ftelo = { key: { fromMe: false, participant: teks3.replace(/[^0-9]/g, '') + '@s.whatsapp.net', ...(m.isGroup ? { remoteJid: m.chat } : { remoteJid: teks3.replace(/[^0-9]/g, '') + '@s.whatsapp.net'})}, message: { conversation: teks1 }}
				qasim.sendMessage(m.chat, { text: teks2 }, { quoted: ftelo });
			}
			break
			case 'tryluck': {
				let anu = ['I am a Monkey','I am an Ape','I am Stupid','I am Rich','I am a God','I am a Dog','I am Dumb','I am a King','I am a Sultan','I am Good','I am Black','I am Cool']
				await qasim.sendButtonMsg(m.chat, {
					text: 'Hope you get lucky😹',
					buttons: [{
						buttonId: 'testluck',
						buttonText: { displayText: '\n' + pickRandom(anu)},
						type: 1
					},{
						buttonId: 'tryluck',
						buttonText: { displayText: '\n' + pickRandom(anu)},
						type: 1
					}]
				})
			}
			break
case 'guesscountry': {
	if (iGame(tebaknegara, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebaknegara.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the country from the following place :\n\n*Place : ${hasil.tempat}*\n\nTime : 60s\nPrize *+3499*`)
	tebaknegara[m.chat + key.id] = {
		jawaban: hasil.negara.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebaknegara, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebaknegara[m.chat + key.id].jawaban)
		delete tebaknegara[m.chat + key.id]
	}
}
break
case 'guesspicture': {
	if (iGame(tebakgambar, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebakgambar.json');
	const hasil = pickRandom(soal);
	let { key } = await qasim.sendFileUrl(m.chat, hasil.img, `🎮 Guess the following picture :\n\n${hasil.deskripsi}\n\nTime : 60s\nPrize *+3499*`, m)
	tebakgambar[m.chat + key.id] = {
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebakgambar, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebakgambar[m.chat + key.id].jawaban)
		delete tebakgambar[m.chat + key.id]
	}
}
break
case 'lyrics': {
    if (!text) {
        return m.reply(`Example: ${prefix + command} Immi Dev 😌`);
    }
    try {
        m.react('⏳')
        const url = `https://kaiz-apis.gleeze.com/api/lyrics?title=${encodeURIComponent(text)}&apikey=8e3b0d39-d9d4-47a1-a125-0801eb103e7f`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!data.title || !data.lyrics) throw new Error('Invalid API response');
        let lyricsMessage = `🎵 *${data.title}*\n\n📝 *Lyrics:*\n${data.lyrics}`;
        if (data.thumbnail) {
            await qasim.sendMessage(m.chat, { 
                image: { url: data.thumbnail }, 
                caption: lyricsMessage
            }, { quoted: m });
        } else {
            await m.reply(lyricsMessage);
        }
        
        m.react('✅')
    } catch (e) {
        m.react('❎')
        m.reply('Server Offline or Data Unavailable!');
    }
}
break
case 'flag': {
	if (iGame(tebakbendera, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebakbendera.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the following flag :\n\n*Flag : ${hasil.bendera}*\n\nTime : 60s\nPrize *+3499*`)
	tebakbendera[m.chat + key.id] = {
		jawaban: hasil.negara.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebakbendera, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebakbendera[m.chat + key.id].jawaban)
		delete tebakbendera[m.chat + key.id]
	}
}
break
case 'guessnumber': case 'colorblind': {
	if (iGame(tebakangka, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/random/color_blind.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply({
		text: `Choose the correct answer!\nOptions: ${[hasil.number, ...hasil.similar].sort(() => Math.random() - 0.5).join(', ')}`,
		contextInfo: {
			externalAdReply: {
				renderLargerThumbnail: true,
				thumbnailUrl: hasil.color_blind[0],
				body: `Level : ${hasil.lv}`,
				previewType: 0,
				mediaType: 1,
			}
		}
	});
	tebakangka[m.chat + key.id] = {
		jawaban: hasil.number,
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebakangka, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebakangka[m.chat + key.id].jawaban)
		delete tebakangka[m.chat + key.id]
	}
}
break
case 'mathquiz': case 'math': {
	const { genMath, modes } = require('./lib/math');
	const inputMode = ['noob', 'easy', 'medium', 'hard','extreme','impossible','impossible2'];
	if (iGame(kuismath, m.chat)) return m.reply('There are still unfinished sessions!')
	if (!text) return m.reply(`Mode: ${Object.keys(modes).join(' | ')}\nUsage example: ${prefix}math medium`)
	if (!inputMode.includes(text.toLowerCase())) return m.reply('Mode not found!')
	let result = await genMath(text.toLowerCase())
	let { key } = await m.reply(`*What is the result of: ${result.soal.toLowerCase()}*?\n\nTime : ${(result.waktu / 1000).toFixed(2)} seconds`)
	kuismath[m.chat + key.id] = {
		jawaban: result.jawaban,
		mode: text.toLowerCase(),
		id: key.id
	}
	await sleep(result.waktu)
	if (rdGame(kuismath, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + kuismath[m.chat + key.id].jawaban)
		delete kuismath[m.chat + key.id]
	}
}
break
case 'snakeladder': case 'ul': {
	if (!m.isGroup) return m.reply(mess.group)
	if (ulartangga[m.chat] && !(ulartangga[m.chat] instanceof SnakeLadder)) {
		ulartangga[m.chat] = Object.assign(new SnakeLadder(ulartangga[m.chat]), ulartangga[m.chat]);
	}
	switch(args[0]) {
		case 'create': case 'join':
		if (ulartangga[m.chat]) {
			if (Object.keys(ulartangga[m.chat].players).length > 8) return m.reply(`Maximum number of players reached\nPlease start the game\n${prefix + command} start`);
			if (ulartangga[m.chat].players.some(a => a.id == m.sender)) return m.reply('You have already joined!')
			ulartangga[m.chat].players.push({ id: m.sender, move: 0 });
			m.reply('Successfully joined game session')
		} else {
			ulartangga[m.chat] = new SnakeLadder({ id: m.chat, host: m.sender });
			ulartangga[m.chat].players.push({ id: m.sender, move: 0 });
			ulartangga[m.chat].time = Date.now();
			m.reply('Successfully created game session')
		}
		break
		case 'start':
		if (!mulartangga[m.chat]) return m.reply('No session currently running!')
		if (ulartangga[m.chat].players.length < 2) return m.reply('Not enough players!\nMinimum 2 players!')
		if (ulartangga[m.chat].start) return m.reply('Session has already started!')
		if (ulartangga[m.chat].host !== m.sender) return m.reply(`Only the room creator @${ulartangga[m.chat].host.split('@')[0]} can start a session!`)
		let { key } = await m.reply({ image: { url: ulartangga[m.chat].map.url }, caption: `🐍🪜SNAKE AND LADDER GAME\n\n${ulartangga[m.chat].players.map((p, i) => `- @${p.id.split('@')[0]} (Piece ${['Red', 'Light Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Dark Blue', 'White'][i]})`).join('\n')}\n\nTurn: @${m.sender.split('@')[0]}\n\nReply to this message to continue playing!\nExample: roll/dice`, mentions: ulartangga[m.chat].players.map(p => p.id)});
		ulartangga[m.chat].id = key.id
		ulartangga[m.chat].start = true
		break
		case 'leave':
		if (!ulartangga[m.chat]) return m.reply('No session currently running!')
		if (!ulartangga[m.chat].players.some(a => a.id == m.sender)) return m.reply('You are not a player!')
		const player = ulartangga[m.chat].players.findIndex(a => a.id == m.sender)
		if (ulartangga[m.chat].start) return m.reply('Game has started!\nCannot exit now')
		if (ulartangga[m.chat].players.length < 1 || ulartangga[m.chat].host === m.sender) {
			m.reply(ulartangga[m.chat].host === m.sender ? 'Host left the game\nGame is stopped!' : 'Less than 1 player, game is stopped!');
			delete ulartangga[m.chat];
			break;
		}
		ulartangga[m.chat].players.splice(player, 1);
		m.reply('Successfully left the game');
		break
		case 'end':
		if (!ulartangga[m.chat]) return m.reply('No session currently running!')
		if (ulartangga[m.chat]?.host !== m.sender) return m.reply(`Only the room creator @${ulartangga[m.chat].host.split('@')[0]} can delete the session!`)
		delete ulartangga[m.chat]
		m.reply('Successfully deleted game session')
		break
		default:
		m.reply(`🐍🪜SNAKE AND LADDER GAME\nCommand: ${prefix + command} <command>\n- create\n- join\n- start\n- leave\n- end`)
	}
}
break
case 'chess': case 'catur': case 'ct': {
	const { DEFAUT_POSITION } = require('chess.js');
	if (!m.isGroup) return m.reply(mess.group)
	if (chess[m.chat] && !(chess[m.chat] instanceof Chess)) {
		chess[m.chat] = Object.assign(new Chess(chess[m.chat].fen), chess[m.chat]);
	}
	switch(args[0]) {
		case 'start':
		if (!chess[m.chat]) return m.reply('No session currently running!')
		if (!chess[m.chat].acc) return m.reply('Players incomplete!')
		if (chess[m.chat].player1 !== m.sender) return m.reply('Only the main player can start!')
		if (chess[m.chat].turn !== m.sender && !chess[m.chat].start) {
			const encodedFen = encodeURI(chess[m.chat]._fen);
			let boardUrls = [`https://www.chess.com/dynboard?fen=${encodedFen}&size=3&coordinates=inside`,`https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside`,`https://chessboardimage.com/${encodedFen}.png`,`https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}`,`https://fen2image.chessvision.ai/${encodedFen}`];
			for (let url of boardUrls) {
				try {
					const { data } = await axios.get(url, { responseType: 'arraybuffer' });
					let { key } = await m.reply({ image: data, caption: `♟️${command.toUpperCase()} GAME\n\nTurn: @${m.sender.split('@')[0]}\n\nReply to this message to continue playing!\nExample: from to -> b1 c3`, mentions: [m.sender] });
					chess[m.chat].start = true
					chess[m.chat].turn = m.sender
					chess[m.chat].id = key.id;
					return;
				} catch (e) {}
			}
			if (!chess[m.chat].key) {
				m.reply(`Failed to start game!\nFailed to send game board!`)
			}
		} else if ([chess[m.chat].player1, chess[m.chat].player2].includes(m.sender)) {
			const isPlayer2 = chess[m.chat].player2 === m.sender
			const nextPlayer = isPlayer2 ? chess[m.chat].player1 : chess[m.chat].player2;
			const encodedFen = encodeURI(chess[m.chat]._fen);
			const boardUrls = [`https://www.chess.com/dynboard?fen=${encodedFen}&size=3&coordinates=inside${!isPlayer2 ? '&flip=true' : ''}`,`https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${!isPlayer2 ? '&flip=true' : ''}`,`https://chessboardimage.com/${encodedFen}${!isPlayer2 ? '-flip' : ''}.png`,`https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}&coordinates=true&size=765${!isPlayer2 ? '&orientation=black' : ''}`,`https://fen2image.chessvision.ai/${encodedFen}/${!isPlayer2 ? '?pov=black' : ''}`];
			for (let url of boardUrls) {
				try {
					chess[m.chat].turn = chess[m.chat].turn === m.sender ? m.sender : nextPlayer;
					const { data } = await axios.get(url, { responseType: 'arraybuffer' });
					let { key } = await m.reply({ image: data, caption: `♟️CHESS GAME\n\nTurn: @${chess[m.chat].turn.split('@')[0]}\n\nReply to this message to continue playing!\nExample: from to -> b1 c3`, mentions: [chess[m.chat].turn] });
					chess[m.chat].id = key.id;
					break;
				} catch (e) {}
			}
		}
		break
		case 'join':
		if (chess[m.chat]) {
			if (chess[m.chat].player1 !== m.sender) {
				if (chess[m.chat].acc) return m.reply(`Players already filled\nPlease try again later`)
				let teks = chess[m.chat].player2 === m.sender ? 'Thank you for joining' : `Since @${chess[m.chat].player2.split('@')[0]} is not responding\nWill be replaced by @${m.sender.split('@')[0]}`
				chess[m.chat].player2 = m.sender
				chess[m.chat].acc = true
				m.reply(`${teks}\nPlease @${chess[m.chat].player1.split('@')[0]} start the game (${prefix + command} start)`)
			} else m.reply(`You have already joined\nLet others be your opponent!`)
		} else m.reply('No session currently running!')
		break
		case 'end': case 'leave':
		if (chess[m.chat]) {
			if (![chess[m.chat].player1, chess[m.chat].player2].includes(m.sender)) return m.reply('Only players can stop the game!')
			delete chess[m.chat]
			m.reply('Successfully deleted game session')
		} else m.reply('No session currently running!')
		break
		case 'bot': case 'computer':
		if (chess[m.sender]) {
			delete chess[m.sender];
			return m.reply('Successfully deleted session vs BOT')
		} else {
			chess[m.sender] = new Chess(DEFAUT_POSITION);
			chess[m.sender]._fen = chess[m.sender].fen();
			chess[m.sender].turn = m.sender;
			chess[m.sender].botMode = true;
			chess[m.sender].time = Date.now();
			const encodedFen = encodeURI(chess[m.sender]._fen);
			const boardUrls = [`https://www.chess.com/dynboard?fen=${encodedFen}&size=3&coordinates=inside`,`https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside`,`https://chessboardimage.com/${encodedFen}.png`,`https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}&coordinates=true&size=765`,`https://fen2image.chessvision.ai/${encodedFen}/`];
			for (let url of boardUrls) {
				try {
					const { data } = await axios.get(url, { responseType: 'arraybuffer' });
					let { key } = await m.reply({ image: data, caption: `♟️CHESS GAME\n\nTurn: @${chess[m.sender].turn.split('@')[0]}\n\nReply to this message to continue playing!\nExample: from to -> b1 c3`, mentions: [chess[m.sender].turn] });
					chess[m.sender].id = key.id;
					break;
				} catch (e) {}
			}
		}
		break
			
			// Game Menu
			case 'slot': {
	await gameSlot(qasim, m, db)
}
break
case 'casino': {
	await gameCasinoSolo(qasim, m, prefix, db)
}
break
case 'samgong': case 'cards': {
	await gameSamgongSolo(qasim, m, db)
}
break
case 'rob': case 'robbery': {
	await gameMerampok(m, db)
}
break
case 'mugger': {
	await gameBegal(qasim, m, db)
}
break
case 'suitpvp': case 'suit': {
	if (Object.values(suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) return m.reply(`Finish your previous suit game`)
	if (m.mentionedJid[0] === m.sender) return m.reply(`You cannot play with yourself!`)
	if (!m.mentionedJid[0]) return m.reply(`_Who do you want to challenge?_\nTag someone..\n\nExample : ${prefix}suit @${owner[0]}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
	if (Object.values(suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) return m.reply(`The person you challenged is already playing rock paper scissors with someone else :(`)
	let caption = `_*SUIT PvP*_\n\n@${m.sender.split`@`[0]} challenges @${m.mentionedJid[0].split`@`[0]} to play rock paper scissors\n\nPlease @${m.mentionedJid[0].split`@`[0]} type accept/reject`
	let id = 'suit_' + Date.now();
	suit[id] = {
		chat: caption,
		id: id,
		p: m.sender,
		p2: m.mentionedJid[0],
		status: 'wait',
		poin: 10,
		poin_lose: 10,
		timeout: 3 * 60 * 1000
	}
	m.reply(caption)
	await sleep(3 * 60 * 1000)
	if (suit[id]) {
		m.reply(`_Rock paper scissors time is up_`)
		delete suit[id]
	}
}
break
case 'delsuit': case 'deletesuit': {
	let roomnya = Object.values(suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))
	if (!roomnya) return m.reply(`You are not in a rock paper scissors room!`)
	delete suit[roomnya.id]
	m.reply(`Successfully deleted rock paper scissors room session!`)
}
break
case 'ttc': case 'ttt': case 'tictactoe': {
	if (Object.values(tictactoe).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return m.reply(`You are still in the game!\nType *${prefix}del${command}* if you want to end the session`);
	let room = Object.values(tictactoe).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
	if (room) {
		m.reply('Partner found!')
		room.o = m.chat
		room.game.playerO = m.sender
		room.state = 'PLAYING'
		if (!(room.game instanceof TicTacToe)) {
			room.game = Object.assign(new TicTacToe(room.game.playerX, room.game.playerO), room.game)
		}
		let arr = room.game.render().map(v => {
			return {X: '❌',O: '⭕',1: '1️⃣',2: '2️⃣',3: '3️⃣',4: '4️⃣',5: '5️⃣',6: '6️⃣',7: '7️⃣',8: '8️⃣',9: '9️⃣'}[v]
		})
		let str = `Room ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nWaiting for @${room.game.currentTurn.split('@')[0]}\n\nType *surrender* to give up and admit defeat`
		if (room.x !== room.o) await qasim.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m })
		await qasim.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m })
	} else {
		room = {
			id: 'tictactoe-' + (+new Date),
			x: m.chat,
			o: '',
			game: new TicTacToe(m.sender, 'o'),
			state: 'WAITING',
		}
		if (text) room.name = text
		qasim.sendMessage(m.chat, { text: 'Waiting for partner' + (text ? ` type the command ${prefix}${command} ${text}` : ''), mentions: m.mentionedJid }, { quoted: m })
		tictactoe[room.id] = room
		await sleep(300000)
		if (tictactoe[room.id]) {
			m.reply(`_${command} time has run out_`)
			delete tictactoe[room.id]
		}
	}
}
break
case 'delttc': case 'delttt': {
	let roomnya = Object.values(tictactoe).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
	if (!roomnya) return m.reply(`You are not in a tictactoe room!`)
	delete tictactoe[roomnya.id]
	m.reply(`Successfully deleted tictactoe room session!`)
}
break
case 'akinator': {
	if (text == 'start') {
		if (akinator[m.sender]) return m.reply('There are still unfinished sessions!')
		akinator[m.sender] = new Akinator({ region: 'en', childMode: false });
		try {
			await akinator[m.sender].start()
		} catch (e) {
			delete akinator[m.sender];
			return m.reply('Akinator Server is Down\nPlease try again later!')
		}
		let { key } = await m.reply(`🎮 Akinator Game :\n\n@${m.sender.split('@')[0]}\n${akinator[m.sender].question}\n\n- 0 - Yes\n- 1 - No\n- 2 - Not Sure\n- 3 - Maybe\n- 4 - Probably Not\n\n${prefix + command} end (To exit the session)`)
		akinator[m.sender].key = key.id
		await sleep(3600000)
		if (akinator[m.sender]) {
			m.reply(`_${command} time has run out_`)
			delete akinator[m.sender];
		}
	} else if (text == 'end') {
		if (!akinator[m.sender]) return m.reply('You are not playing Akinator!')
		delete akinator[m.sender];
		m.reply('Successfully ended the Akinator session')
	} else m.reply(`Example : ${prefix + command} start/end`)
}
break
case 'guessbomb': {
	if (tebakbom[m.sender]) return m.reply('There are still unfinished sessions!')
	tebakbom[m.sender] = {
		petak: [0, 0, 0, 2, 0, 2, 0, 2, 0, 0].sort(() => Math.random() - 0.5),
		board: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
		bomb: 3,
		lolos: 7,
		pick: 0,
		nyawa: ['❤️', '❤️', '❤️'],
	}
	await m.reply(`*GUESS THE BOMB*\n\n${tebakbom[m.sender].board.join("")}\n\nChoose that number! and don't get hit by the bomb!\nBombs : ${tebakbom[m.sender].bomb}\nLives : ${tebakbom[m.sender].nyawa.join("")}`);
	await sleep(120000)
	if (tebakbom[m.sender]) {
		m.reply(`_${command} time has run out_`)
		delete tebakbom[m.sender];
	}
}
break
case 'riddle': {
	if (iGame(tekateki, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tekateki.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the following riddle :\n\n${hasil.soal}\n\nTime : 60s\nPrize *+3499*`)
	tekateki[m.chat + key.id] = {
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tekateki, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tekateki[m.chat + key.id].jawaban)
		delete tekateki[m.chat + key.id]
	}
}
break
case 'guesslyrics': {
	if (iGame(tebaklirik, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebaklirik.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the lyrics below :\n\n${hasil.soal}\n\nTime : 90s\nPrize *+4299*`)
	tebaklirik[m.chat + key.id] = {
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(90000)
	if (rdGame(tebaklirik, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebaklirik[m.chat + key.id].jawaban)
		delete tebaklirik[m.chat + key.id]
	}
}
break
case 'guessword': {
	if (iGame(tebakkata, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebakkata.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the following word :\n\n${hasil.soal}\n\nTime : 60s\nPrize *+3499*`)
	tebakkata[m.chat + key.id] = {
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebakkata, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebakkata[m.chat + key.id].jawaban)
		delete tebakkata[m.chat + key.id]
	}
}
break
case 'family100': {
	if (family100.hasOwnProperty(m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/family100.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the following answers :\n\n${hasil.soal}\n\nTime : 5m\nPrize *+3499*`)
	family100[m.chat] = {
		soal: hasil.soal,
		jawaban: hasil.jawaban,
		terjawab: Array.from(hasil.jawaban, () => false),
		id: key.id
	}
	await sleep(300000)
	if (family100.hasOwnProperty(m.chat)) {
		m.reply('Time up\nAnswers:\n- ' + family100[m.chat].jawaban.join('\n- '))
		delete family100[m.chat]
	}
}
break
case 'arrangeword': {
	if (iGame(susunkata, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/susunkata.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Arrange the following words :\n\n${hasil.soal}\nType : ${hasil.tipe}\n\nTime : 60s\nPrize *+2989*`)
	susunkata[m.chat + key.id] = {
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(susunkata, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + susunkata[m.chat + key.id].jawaban)
		delete susunkata[m.chat + key.id]
	}
}
break
case 'guesschemistry': {
	if (iGame(tebakkimia, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/tebakkimia.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Guess the following chemistry element :\n\n${hasil.unsur}\n\nTime : 60s\nPrize *+3499*`)
	tebakkimia[m.chat + key.id] = {
		jawaban: hasil.lambang.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(tebakkimia, m.chat, key.id)) {
		m.reply('Time up\nAnswer: ' + tebakkimia[m.chat + key.id].jawaban)
		delete tebakkimia[m.chat + key.id]
	}
}
break
case 'trivia': {
	if (iGame(caklontong, m.chat)) return m.reply('There are still unfinished sessions!')
	const soal = await fetchJson('https://raw.githubusercontent.com/nazedev/database/refs/heads/master/games/caklontong.json');
	const hasil = pickRandom(soal);
	let { key } = await m.reply(`🎮 Answer the following question :\n\n${hasil.soal}\n\nTime : 60s\nPrize *+9999*`)
	caklontong[m.chat + key.id] = {
		...hasil,
		jawaban: hasil.jawaban.toLowerCase(),
		id: key.id
	}
	await sleep(60000)
	if (rdGame(caklontong, m.chat, key.id)) {
		m.reply(`Time up\nAnswer: ${caklontong[m.chat + key.id].jawaban}\n"${caklontong[m.chat + key.id].deskripsi}"`)
		delete caklontong[m.chat + key.id]
	}
}
default:
		if (/^@?\d+$/.test(args[0])) {
			if (chess[m.chat]) return m.reply('There are still unfinished sessions!')
			if (m.mentionedJid.length < 1) return m.reply('Tag the person you want to play with!')
			chess[m.chat] = new Chess(DEFAUT_POSITION);
			chess[m.chat]._fen = chess[m.chat].fen();
			chess[m.chat].player1 = m.sender
			chess[m.chat].player2 = m.mentionedJid ? m.mentionedJid[0] : null
			chess[m.chat].time = Date.now();
			chess[m.chat].turn = null
			chess[m.chat].acc = false
			m.reply(`♟️${command.toUpperCase()} GAME\n\n@${m.sender.split('@')[0]} challenges @${m.mentionedJid[0].split('@')[0]}\nTo join ${prefix + command} join`)
		} else {
			m.reply(`♟️${command.toUpperCase()} GAME\n\nExample: ${prefix + command} @tag/number\n- start\n- leave\n- join\n- computer\n- end`)
		}
	}
	
}
break
case 'blackjack': case 'bj': {
	let session = null;
	for (let id in blackjack) {
		if (blackjack[id].players.find(p => p.id === m.sender)) {
			session = blackjack[id];
			break;
		}
	}
	if (session && !(session instanceof Blackjack)) {
		session = Object.assign(new Blackjack(session), session)
	}
	if (blackjack[m.chat] && !(blackjack[m.chat] instanceof Blackjack)) {
		blackjack[m.chat] = Object.assign(new Blackjack(blackjack[m.chat]), blackjack[m.chat])
	}
	switch(args[0]) {
		case 'create': case 'join':
		if (!m.isGroup) return m.reply(mess.group)
		if (blackjack[m.chat] || session) {
			if (blackjack[m.chat]?.players?.some(a => a.id === m.sender)) return m.reply('You have already joined!')
			if (session) return m.reply('You have already joined another group session! Please exit before joining a new session.');
			if (blackjack[m.chat].players.length > 10) return m.reply(`Maximum number of players reached\nPlease start the game\n${prefix + command} start`);
			blackjack[m.chat].players.push({ id: m.sender, cards: [] });
			m.reply('Successfully joined Blackjack game')
		} else {
			blackjack[m.chat] = new Blackjack({ id: m.chat, host: m.sender });
			blackjack[m.chat].players.push({ id: m.sender, cards: [] });
			m.reply('Successfully created Blackjack game')
		}
		break
		case 'start':
		if (!m.isGroup) return m.reply(mess.group)
		if (!blackjack[m.chat]) return m.reply('No Blackjack session currently running!')
		if (blackjack[m.chat]?.host !== m.sender) return m.reply(`Only the room creator @${blackjack[m.chat].host.split('@')[0]} can start a session!`)
		if (blackjack[m.chat].players.length < 2) return m.reply('Minimum 2 players to start the game!');
		if (blackjack[m.chat].started) return m.reply('The game has already started!')
		blackjack[m.chat].distributeCards();
		m.reply(`🃏BLACKJACK GAME♦️\nStart card: ${blackjack[m.chat].startCard.rank + blackjack[m.chat].startCard.suit}\nDeck count: ${blackjack[m.chat].deck.length}\n${blackjack[m.chat].players.map(a => `- @${a.id.split('@')[0]} : (${a.cards.length} cards)`).join('\n')}\n\nCheck private chat\nwa.me/${botNumber.split('@')[0]}`);
		for (let p of blackjack[m.chat].players) {
			const startCard = blackjack[m.chat].startCard;
			let buttons = p.cards.map(a => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${a.rank}${a.suit}`, id: `.${command} play ${a.rank}${a.suit}` })}));
			if (!blackjack[m.chat].hasMatching(p.id)) buttons.push({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Hit', id: `.${command} hit` }) });
			await qasim.sendListMsg(p.id, { text: `Start card: ${startCard.rank + startCard.suit}`, footer: `${p.cards.map(c => c.rank + c.suit).join(', ')}`, buttons }, { quoted: m });
		}
		break
		case 'hit': {
			if (!session) return m.reply('No Blackjack session currently running!')
			if (!session.started) return m.reply('Game has not started yet!')
			if (session.players.length < 2) return m.reply('Minimum 2 players to start the game!');
			if (!session.players?.some(a => a.id === m.sender)) return m.reply('You have not joined yet!');
			if (!args[0]) return m.reply(`Use format:\n${prefix + command} play <card>\nExample: ${prefix + command} hit`);
			const player = session.players.find(p => p.id === m.sender);
			const hitIndex = player.cards.findIndex(c => (c.rank + c.suit) === (session.startCard.rank + session.startCard.suit));
			if (session.submitCard.some(s => s.id === m.sender) || session.skip.includes(m.sender)) {
				return m.reply('You have already played this round!');
			}
			if (!session.hasMatching(m.sender)) {
				if (session.deck.length) {
					const newCard = session.deck.shift();
					player.cards.push(newCard);
					await sleep(1000);
					let buttons = player.cards.map(a => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${a.rank}${a.suit}`, id: `.${command} play ${a.rank}${a.suit}` })}));
					if (!session.hasMatching(player.id)) buttons.push({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Hit', id: `.${command} hit` }) });
					await qasim.sendListMsg(player.id, { text: `Start card: ${session.startCard.rank + session.startCard.suit}`, footer: `${player.cards.map(c => c.rank + c.suit).join(', ')}`, buttons }, { quoted: m });
				} else {
					let reuse = session.reuseSubmitCardsForDrinking()
					await m.reply(reuse.msg)
					if (!session.skip.find(a => a.id === player.id)) session.skip.push({ id: player.id });
					await m.reply('The deck is empty, you cannot take a card. Skipped.');
					await qasim.sendText(session.id, `@${m.sender.split('@')[0]} skipped because the deck is empty.`, m);
					if ((session.submitCard.length + session.skip.length) === session.players.length) {
						const result = session.resolveRound();
						if (result) {
							await qasim.sendText(session.id, result, m);
							if (session.players.length === 1) {
								await qasim.sendText(session.id, `Only 1 player remaining (@${session.players[0].id.split('@')[0]}), Blackjack session is over.`, m);
								delete blackjack[session.id];
								return;
							}
							const leaderCards = session.players.find(a => a.id === session.leader);
							let buttons = leaderCards.cards.map(c => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${c.rank}${c.suit}`, id: `.${command} play ${c.rank}${c.suit}` })}));
							await qasim.sendListMsg(session.leader, { text: 'Select a card to start a new round', footer: leaderCards.cards.map(c => c.rank + c.suit).join(', '), buttons }, { quoted: m });
						}
					}
				}
			} else m.reply(`You still have cards with suit ${session.startCard.suit}, play them first before hitting!`);
			if ((session.submitCard.length + session.skip.length) === session.players.length) {
				const result = session.resolveRound();
				if (result) {
					await qasim.sendText(session.id, result, m);
					if (session.players.length === 1) {
						await qasim.sendText(session.id, `Only 1 player remaining (@${session.players[0].id.split('@')[0]}), Blackjack session is over.`, m);
						delete blackjack[session.id];
						return;
					}
					const leaderCards = session.players.find(a => a.id === session.leader);
					let buttons = leaderCards.cards.map(c => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${c.rank}${c.suit}`, id: `.${command} play ${c.rank}${c.suit}` })}));
					await qasim.sendListMsg(session.leader, { text: 'Select a card to start a new round', footer: leaderCards.cards.map(c => c.rank + c.suit).join(', '), buttons }, { quoted: m });
				}
			}
		}
		break
		case 'play': {
			if (!session) return m.reply('No Blackjack game session currently running!')
			if (!session.started) return m.reply('Game has not started yet!')
			if (session.players.length < 2) return m.reply('Minimum 2 players to start the game!');
			if (!session.players?.some(a => a.id === m.sender)) return m.reply('You have not joined yet!');
			if (!args[1]) return m.reply(`Use format:\n${prefix + command} play <card>\nExample: ${prefix + command} play 3♥️`);
			const player = session.players.find(p => p.id === m.sender);
			const idx = player.cards.findIndex(c => normalize(c.rank + c.suit) === normalize(args[1]));
			if (idx === -1) return m.reply('Invalid card!');
			if (session.submitCard.some(s => s.id === m.sender) || session.skip.includes(m.sender)) return m.reply('You have already played this round!');
			const card = player.cards[idx];
			if (Object.keys(session.startCard).length) {
				if (card.suit !== session.startCard.suit) return m.reply(`Cards don't match! Must be suit ${session.startCard.suit}`);
			} else if (m.sender !== session.leader) return m.reply('Only the round leader can start!');
			player.cards.splice(idx, 1);
			session.secondDeck.push(card);
			session.submitCard.push({ id: m.sender, card: card });
			await sleep(1000);
			if (player.cards.length === 0) {
				session.winner.push({ id: player.id });
				session.leader = '';
				session.submitCard = [];
				session.players = session.players.filter(p => p.id !== player.id);
				await qasim.sendText(session.id, `@${m.sender.split('@')[0]} wins the game!\nRemaining cards: 0`, m);
				if (session.players.length === 1) {
					await qasim.sendText(session.id, `Only 1 player remaining (@${session.players[0].id.split('@')[0]}), Blackjack session is over.`, m);
					delete blackjack[session.id];
					return;
				}
			}
			if (Object.keys(session.startCard).length === 0) {
				session.startCard = card;
				await qasim.sendText(session.id, `@${m.sender.split('@')[0]} starts the round with ${card.rank}${card.suit}`, m);
				for (let s of session.players) {
					if (s.id === session.leader) continue;
					const startCard = session.startCard;
					let buttons = s.cards.map(a => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${a.rank}${a.suit}`, id: `.${command} play ${a.rank}${a.suit}` })}));
					if (!session.hasMatching(s.id)) buttons.push({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Hit', id: `.${command} hit` }) });
					await qasim.sendListMsg(s.id, { text: `Start card: ${startCard.rank + startCard.suit}`, footer: `${s.cards.map(c => c.rank + c.suit).join(', ')}`, buttons }, { quoted: m });
				}
				return;
			}
			if ((session.submitCard.length + session.skip.length) === session.players.length) {
				const result = session.resolveRound();
				if (result) {
					await qasim.sendText(session.id, result, m);
					if (session.players.length === 1) {
						await qasim.sendText(session.id, `Only 1 player remaining (@${session.players[0].id.split('@')[0]}), Blackjack session is over.`, m);
						delete blackjack[session.id];
						return;
					}
					const leaderCards = session.players.find(a => a.id === session.leader);
					let buttons = leaderCards.cards.map(c => ({ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: `${c.rank}${c.suit}`, id: `.${command} play ${c.rank}${c.suit}` })}));
					await qasim.sendListMsg(session.leader, { text: 'Select a card to start a new round', footer: leaderCards.cards.map(c => c.rank + c.suit).join(', '), buttons }, { quoted: m });
				}
			}
			await m.reply(`You played ${card.rank}${card.suit}`);
			await qasim.sendText(session.id, `@${m.sender.split('@')[0]} played ${card.rank}${card.suit}`, m);
		}
		break
		case 'info':
		if (!session) return m.reply('No Blackjack game session currently running!')
		if (!session.players?.some(a => a.id === m.sender)) return m.reply('You have not joined yet!');
		const players = session.players.map((p, i) => `${i + 1}. @${p.id.split('@')[0]} ${p.id === session.host ? '(HOST) ' : p.id === session.leader ? '(Leader)' : ''}`).join('\n');
		if (m.isGroup) {
			m.reply(`🃏BLACKJACK GAME INFO ♦️\n*Number of players:* ${session.players.length}\n*Host:* @${session.host.split('@')[0]}\n*Status:* ${session.started ? 'Started' : 'Not started'}${Object.keys(session.startCard).length > 1 ? `\n*Start card:* ${session.startCard.rank + session.startCard.suit}` : ''}\n*Remaining deck cards:* ${session.deck.length}\n\n*Player list:*\n${players}${session.secondDeck.length ? `\n\n*Card history:* ${session.secondDeck.map(c => `${c.rank}${c.suit}`).join(', ')}` : ''}`)
		} else {
			const player = session.players.find(p => p.id === m.sender);
			const cards = player.cards?.map(c => `${c.rank}${c.suit}`).join(', ') || 'No cards yet';
			m.reply(`🃏BLACKJACK GAME INFO ♦️\n*Number of players:* ${session.players.length}\n*Host:* @${session.host.split('@')[0]}\n*Status:* ${session.started ? 'Started' : 'Not started'}${Object.keys(session.startCard).length > 1 ? `\n*Start card:* ${session.startCard.rank + session.startCard.suit}` : ''}\n*Remaining deck cards:* ${session.deck.length}\n\n*Player list:*\n${players}\n\n*Your cards:*\n${cards}${session.secondDeck.length ? `\n\n*Card history:* ${session.secondDeck.map(c => `${c.rank}${c.suit}`).join(', ')}` : ''}`)
		}
		break
		case 'end':
		if (!m.isGroup) return m.reply(mess.group)
		if (!blackjack[m.chat]) return m.reply('No Blackjack game session currently running!')
		if (blackjack[m.chat]?.host !== m.sender) return m.reply(`Only the room creator @${blackjack[m.chat].host.split('@')[0]} can delete the session!`)
		delete blackjack[m.chat]
		m.reply('Successfully deleted Blackjack game session')
		break
		default:
		m.reply(`🃏BLACKJACK GAME♦️\nCommand: ${prefix + command} <command>\n- create\n- join\n- start\n- info\n- hit\n- deck\n- end`)
	}
}
break
			
			// Menu
			case 'menu': {
    if (args[0] == 'set') {
        if (['1','2','3'].includes(args[1])) {
            set.template = parseInt(Number(args[1]))
            m.reply('Successfully Changing Menu Templates')
        } else m.reply(`Please choose a template :\n- 1 (Button Menu)\n- 2 (List Menu)\n- 3 (Document Menu)`)
    } else await templateMenu(qasim, set.template, m, prefix, setv, db, { botNumber, isVip, isPremium })
}
break

case 'allmenu': {
    const menunya = `
╭─❒ ${setv} *IMMU MD* ❒
├⬡ 👤 User: ${m.pushName ? m.pushName : 'No Name'}
├⬡ 🆔 ID: @${m.sender.split('@')[0]}
├⬡ 👑 Status: ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
├⬡ 🎫 Limit: ${isVip ? 'VIP' : db.users[m.sender].limit}
├⬡ 💰 Money: ${db.users[m.sender] ? db.users[m.sender].money.toLocaleString('id-ID') : '0'}
├⬡ 🌐 Prefix: ${set.multiprefix ? '「 MULTI-PREFIX 」' : prefix}
├⬡ 🤖 Bot: ${botname}
├⬡ 👨‍💻 Owner: @${owner[0].split('@')[0]}
├⬡ 🔄 Mode: ${qasim.public ? 'Public' : 'Self'}
├⬡ 📅 Date: ${tanggal}
├⬡ 📆 Day: ${hari}
├⬡ ⏰ Time: ${jam} WIB
╰────────────❒

╭────❒ *⚙️ SETTINGS* ❒
├⬡ ${prefix}bot set
├⬡ ${prefix}group set
╰────────────❒

╭────❒ *⭐ IMMU CORE* ❒
├⬡ ${prefix}profile
├⬡ ${prefix}claim
├⬡ ${prefix}buy
├⬡ ${prefix}transfer
├⬡ ${prefix}leaderboard
├⬡ ${prefix}request
├⬡ ${prefix}react
├⬡ ${prefix}tagme
├⬡ ${prefix}runtime
├⬡ ${prefix}features
├⬡ ${prefix}speed
├⬡ ${prefix}ping
├⬡ ${prefix}afk
├⬡ ${prefix}rvo
├⬡ ${prefix}inspect
├⬡ ${prefix}addmsg
├⬡ ${prefix}delmsg
├⬡ ${prefix}getmsg
├⬡ ${prefix}listmsg
├⬡ ${prefix}quoted
├⬡ ${prefix}menfes
├⬡ ${prefix}confes
├⬡ ${prefix}autoai
├⬡ ${prefix}delautoai
├⬡ ${prefix}rentbot 🅟
├⬡ ${prefix}stoprent
├⬡ ${prefix}listrent
├⬡ ${prefix}donasi
├⬡ ${prefix}addsewa
├⬡ ${prefix}delsewa
├⬡ ${prefix}listsewa
╰────────────❒

╭────❒ *🛡️ GROUP CONTROL* ❒
├⬡ ${prefix}add
├⬡ ${prefix}kick
├⬡ ${prefix}promote
├⬡ ${prefix}demote
├⬡ ${prefix}warn
├⬡ ${prefix}unwarn
├⬡ ${prefix}setname
├⬡ ${prefix}setdesc
├⬡ ${prefix}setppgc
├⬡ ${prefix}delete
├⬡ ${prefix}linkgrup
├⬡ ${prefix}revoke
├⬡ ${prefix}tagall
├⬡ ${prefix}pin
├⬡ ${prefix}unpin
├⬡ ${prefix}hidetag
├⬡ ${prefix}totag
├⬡ ${prefix}listonline
├⬡ ${prefix}group set
├⬡ ${prefix}group
╰────────────❒

╭────❒ *🎨 TEXTPRO FORGE* ❒
├⬡ ${prefix}mascot
├⬡ ${prefix}foggy
├⬡ ${prefix}galaxy
├⬡ ${prefix}golden
├⬡ ${prefix}mettalic
├⬡ ${prefix}gradient
├⬡ ${prefix}metal
├⬡ ${prefix}jewel
├⬡ ${prefix}gaming
├⬡ ${prefix}sand
├⬡ ${prefix}blackpink
├⬡ ${prefix}colorful
├⬡ ${prefix}matirx
├⬡ ${prefix}wings
├⬡ ${prefix}hacker
├⬡ ${prefix}logo
├⬡ ${prefix}typo
╰────────────❒

╭────❒ *🔍 SEARCH ENGINE* ❒
├⬡ ${prefix}ytsearch
├⬡ ${prefix}spotify
├⬡ ${prefix}pixiv
├⬡ ${prefix}pinterest
├⬡ ${prefix}wallpaper
├⬡ ${prefix}ringtone
├⬡ ${prefix}google
├⬡ ${prefix}bing
├⬡ ${prefix}gimage
├⬡ ${prefix}bingimg
├⬡ ${prefix}wattpad
├⬡ ${prefix}wikipedia
├⬡ ${prefix}technews
├⬡ ${prefix}trends
├⬡ ${prefix}npm
├⬡ ${prefix}style
├⬡ ${prefix}weather
├⬡ ${prefix}tenor
├⬡ ${prefix}urban
├⬡ ${prefix}lyrics 
╰────────────❒

╭────❒ *📥 DOWNLOAD HUB* ❒
├⬡ ${prefix}ytmp3
├⬡ ${prefix}ytmp4
├⬡ ${prefix}instagram
├⬡ ${prefix}tiktok
├⬡ ${prefix}tiktokmp3
├⬡ ${prefix}twitter
├⬡ ${prefix}facebook
├⬡ ${prefix}spotifydl
├⬡ ${prefix}mediafire
╰────────────❒

╭────❒ *💭 WISDOM QUOTES* ❒
├⬡ ${prefix}motivation
├⬡ ${prefix}islamic
├⬡ ${prefix}quotes
├⬡ ${prefix}funfact
├⬡ ${prefix}lifehack
├⬡ ${prefix}pickup
├⬡ ${prefix}program
├⬡ ${prefix}tech
├⬡ ${prefix}why
╰────────────❒

╭────❒ *🛠️ UTILITY TOOLS* ❒
├⬡ ${prefix}get 🅟
├⬡ ${prefix}hd
├⬡ ${prefix}define
├⬡ ${prefix}toaudio
├⬡ ${prefix}tomp3
├⬡ ${prefix}tovn
├⬡ ${prefix}toimage
├⬡ ${prefix}toptv
├⬡ ${prefix}tourl
├⬡ ${prefix}tts
├⬡ ${prefix}toqr
├⬡ ${prefix}brat
├⬡ ${prefix}bratvid
├⬡ ${prefix}ssweb 🅟
├⬡ ${prefix}sticker
├⬡ ${prefix}colong
├⬡ ${prefix}smeme
├⬡ ${prefix}dehaze
├⬡ ${prefix}colorize
├⬡ ${prefix}toblock
├⬡ ${prefix}emojimix
├⬡ ${prefix}nulis
├⬡ ${prefix}readmore
├⬡ ${prefix}qc
├⬡ ${prefix}translate
├⬡ ${prefix}wasted
├⬡ ${prefix}triggered
├⬡ ${prefix}shorturl
├⬡ ${prefix}gitclone
├⬡ ${prefix}fat
├⬡ ${prefix}fast
├⬡ ${prefix}bass
├⬡ ${prefix}slow
├⬡ ${prefix}tupai
├⬡ ${prefix}deep
├⬡ ${prefix}robot
├⬡ ${prefix}blown
├⬡ ${prefix}reverse
├⬡ ${prefix}smooth
├⬡ ${prefix}earrape
├⬡ ${prefix}nightcore
├⬡ ${prefix}getexif
╰────────────❒

╭────❒ *🤖 AI NEURAL NET* ❒
├⬡ ${prefix}ai
├⬡ ${prefix}simi
├⬡ ${prefix}gemini
├⬡ ${prefix}txt2img
╰────────────❒

╭────❒ *🌸 ANIME DIMENSION* ❒
├⬡ ${prefix}waifu
├⬡ ${prefix}neko
├⬡ ${prefix}akiyama
├⬡ ${prefix}akira
├⬡ ${prefix}anna
├⬡ ${prefix}asuna
├⬡ ${prefix}boruto
├⬡ ${prefix}chiho
├⬡ ${prefix}cosplay
├⬡ ${prefix}eba
├⬡ ${prefix}emilia
├⬡ ${prefix}erza
├⬡ ${prefix}hinata
├⬡ ${prefix}isuzu
├⬡ ${prefix}itachi
├⬡ ${prefix}mikasa
├⬡ ${prefix}miku
├⬡ ${prefix}naruto
├⬡ ${prefix}sagiri
├⬡ ${prefix}sasuke
├⬡ ${prefix}yuri
╰────────────❒

╭────❒ *🎮 GAME ARENA* ❒
├⬡ ${prefix}tictactoe
├⬡ ${prefix}akinator
├⬡ ${prefix}suit
├⬡ ${prefix}slot
├⬡ ${prefix}mathquiz
├⬡ ${prefix}begal
├⬡ ${prefix}snakeladder
├⬡ ${prefix}blackjack
├⬡ ${prefix}catur
├⬡ ${prefix}casino
├⬡ ${prefix}samgong
├⬡ ${prefix}rampok
├⬡ ${prefix}riddle
├⬡ ${prefix}guesslyrics
├⬡ ${prefix}guessword
├⬡ ${prefix}guessbomb
├⬡ ${prefix}arrangeword
├⬡ ${prefix}colorblind
├⬡ ${prefix}guesschemistry
├⬡ ${prefix}trivia
├⬡ ${prefix}guessnumber
├⬡ ${prefix}guesscountry
├⬡ ${prefix}guesspicture
├⬡ ${prefix}Flag
╰────────────❒

╭────❒ *🎪 FUN ZONE* ❒
├⬡ ${prefix}tryluck
├⬡ ${prefix}dice
├⬡ ${prefix}canthey
├⬡ ${prefix}isit
├⬡ ${prefix}when
├⬡ ${prefix}who
├⬡ ${prefix}magicshell
├⬡ ${prefix}checkdeath
├⬡ ${prefix}checkpersonality
├⬡ ${prefix}checkguardian
├⬡ ${prefix}rate
├⬡ ${prefix}mysoulmate
├⬡ ${prefix}couple
├⬡ ${prefix}frame
├⬡ ${prefix}halah
├⬡ ${prefix}hilih
├⬡ ${prefix}huluh
├⬡ ${prefix}heleh
├⬡ ${prefix}holoh
╰────────────❒

╭────❒ *🎲 RANDOM GALLERY* ❒
├⬡ ${prefix}coffe
├⬡ ${prefix}technology
├⬡ ${prefix}programming
├⬡ ${prefix}cyberspace
├⬡ ${prefix}mountain
├⬡ ${prefix}islamic
├⬡ ${prefix}game
├⬡ ${prefix}ronaldo
├⬡ ${prefix}messi
╰────────────❒

╭────❒ *🕵️ CYBER STALKER* ❒
├⬡ ${prefix}wastalk
├⬡ ${prefix}telestalk
├⬡ ${prefix}igstalk
├⬡ ${prefix}tiktokstalk
├⬡ ${prefix}npmstalk
├⬡ ${prefix}githubstalk
├⬡ ${prefix}genshinstalk
╰────────────❒

╭────❒ *⚡ OWNER CONTROL* ❒
├⬡ ${prefix}bot [set]
├⬡ ${prefix}setbio
├⬡ ${prefix}setppbot
├⬡ ${prefix}setting
├⬡ ${prefix}join
├⬡ ${prefix}leave
├⬡ ${prefix}block
├⬡ ${prefix}listblock
├⬡ ${prefix}unblock
├⬡ ${prefix}listpc
├⬡ ${prefix}listgc
├⬡ ${prefix}ban
├⬡ ${prefix}unban
├⬡ ${prefix}mute
├⬡ ${prefix}unmute
├⬡ ${prefix}creategc
├⬡ ${prefix}clearchat
├⬡ ${prefix}addprem
├⬡ ${prefix}delprem
├⬡ ${prefix}listprem
├⬡ ${prefix}addlimit
├⬡ ${prefix}addmoney
├⬡ ${prefix}getmsgstore
├⬡ ${prefix}bot --settings
├⬡ ${prefix}bot settings
├⬡ ${prefix}getsession
├⬡ ${prefix}delsession
├⬡ ${prefix}delfrankdb
├⬡ ${prefix}upsw
├⬡ ${prefix}backup
├⬡ $ 🅞
├⬡ > 🅞
├⬡ < 🅞
╰────────────❒

╭─────────❒
├⬡ Total Commands: 546 
├⬡ Bot Version: IMMU MD
├⬡ Current Prefix: ${prefix}
├⬡ 💡 *TIP:* Use \`${prefix}help <command>\` for detailed info
╰────────────❒
*IMMU MD* - Pakistani based bot `

    const caption = `${menunya}\n 
> 😎 *imadalidev*`;

    const imageUrl = 'https://i.postimg.cc/fynYVyPf/prime.jpg';
    if (!imageUrl) {
        return m.reply('Menu image not found, please check the URL.');
    }
    
    await qasim.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: caption,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363341506278064@newsletter',
                newsletterName: "EF-IMMU MD ULTRA",
                serverMessageId: 143
            }
        }
    }, { quoted: m });
}
break
case 'set': case 'setting': case 'settings': {
    m.reply(`
╭────❒ *⚙️ SETTINGS* ❒
├⬡ ${setv} ${prefix}bot set
├⬡ ${setv} ${prefix}group set
╰────────────❒`)
}
break
case 'botmenu': {
    m.reply(`
╭────❒ *⭐ PRIME CORE* ❒
├⬡ ${setv} ${prefix}profile
├⬡ ${setv} ${prefix}claim
├⬡ ${setv} ${prefix}buy
├⬡ ${setv} ${prefix}transfer
├⬡ ${setv} ${prefix}leaderboard
├⬡ ${setv} ${prefix}request
├⬡ ${setv} ${prefix}react
├⬡ ${setv} ${prefix}tagme
├⬡ ${setv} ${prefix}runtime
├⬡ ${setv} ${prefix}features
├⬡ ${setv} ${prefix}speed
├⬡ ${setv} ${prefix}ping
├⬡ ${setv} ${prefix}afk
├⬡ ${setv} ${prefix}rvo
├⬡ ${setv} ${prefix}inspect
├⬡ ${setv} ${prefix}addmsg
├⬡ ${setv} ${prefix}delmsg
├⬡ ${setv} ${prefix}getmsg
├⬡ ${setv} ${prefix}listmsg
├⬡ ${setv} ${prefix}quoted
├⬡ ${setv} ${prefix}menfes
├⬡ ${setv} ${prefix}confes
├⬡ ${setv} ${prefix}autoai
├⬡ ${setv} ${prefix}delautoai
├⬡ ${setv} ${prefix}rentbot 🅟
├⬡ ${setv} ${prefix}stoprent
├⬡ ${setv} ${prefix}listrent
├⬡ ${setv} ${prefix}donasi
├⬡ ${setv} ${prefix}addsewa
├⬡ ${setv} ${prefix}delsewa
├⬡ ${setv} ${prefix}listsewa
╰────────────❒`)
}
break
case 'groupmenu': {
    m.reply(`
╭────❒ *🛡️ GROUP CONTROL* ❒
├⬡ ${setv} ${prefix}add
├⬡ ${setv} ${prefix}kick
├⬡ ${setv} ${prefix}promote
├⬡ ${setv} ${prefix}demote
├⬡ ${setv} ${prefix}warn
├⬡ ${setv} ${prefix}unwarn
├⬡ ${setv} ${prefix}setname
├⬡ ${setv} ${prefix}setdesc
├⬡ ${setv} ${prefix}setppgc
├⬡ ${setv} ${prefix}delete
├⬡ ${setv} ${prefix}linkgrup
├⬡ ${setv} ${prefix}revoke
├⬡ ${setv} ${prefix}tagall
├⬡ ${setv} ${prefix}pin 🅟
├⬡ ${setv} ${prefix}unpin
├⬡ ${setv} ${prefix}hidetag
├⬡ ${setv} ${prefix}totag
├⬡ ${setv} ${prefix}listonline
├⬡ ${setv} ${prefix}group set
├⬡ ${setv} ${prefix}group
╰────────────❒`)
}
break
case 'textpro': {
    m.reply(`
╭────❒ *🎨 TEXTPRO FORGE* ❒
├⬡ ${setv} ${prefix}mascot
├⬡ ${setv} ${prefix}foggy
├⬡ ${setv} ${prefix}galaxy
├⬡ ${setv} ${prefix}golden
├⬡ ${setv} ${prefix}mettalic
├⬡ ${setv} ${prefix}gradient
├⬡ ${setv} ${prefix}metal
├⬡ ${setv} ${prefix}jewel
├⬡ ${setv} ${prefix}gaming
├⬡ ${setv} ${prefix}sand
├⬡ ${setv} ${prefix}blackpink
├⬡ ${setv} ${prefix}colorful
├⬡ ${setv} ${prefix}matirx
├⬡ ${setv} ${prefix}wings
├⬡ ${setv} ${prefix}hacker
├⬡ ${setv} ${prefix}logo
├⬡ ${setv} ${prefix}typo
╰────────────❒`)
}
break
case 'searchmenu': {
    m.reply(`
╭────❒ *🔍 SEARCH ENGINE* ❒
├⬡ ${setv} ${prefix}ytsearch
├⬡ ${setv} ${prefix}spotify
├⬡ ${setv} ${prefix}pixiv
├⬡ ${setv} ${prefix}pinterest
├⬡ ${setv} ${prefix}wallpaper
├⬡ ${setv} ${prefix}ringtone
├⬡ ${setv} ${prefix}google
├⬡ ${setv} ${prefix}bing
├⬡ ${setv} ${prefix}gimage
├⬡ ${setv} ${prefix}bingimg
├⬡ ${setv} ${prefix}wattpad
├⬡ ${setv} ${prefix}wikipedia
├⬡ ${setv} ${prefix}technews
├⬡ ${setv} ${prefix}trends
├⬡ ${setv} ${prefix}npm
├⬡ ${setv} ${prefix}style
├⬡ ${setv} ${prefix}weather
├⬡ ${setv} ${prefix}tenor
├⬡ ${setv} ${prefix}urban
╰────────────❒`)
}
break
case 'downloadmenu': {
    m.reply(`
╭────❒ *📥 DOWNLOAD HUB* ❒
├⬡ ${setv} ${prefix}ytmp3
├⬡ ${setv} ${prefix}ytmp4
├⬡ ${setv} ${prefix}instagram
├⬡ ${setv} ${prefix}tiktok
├⬡ ${setv} ${prefix}tiktokmp3
├⬡ ${setv} ${prefix}twitter
├⬡ ${setv} ${prefix}facebook
├⬡ ${setv} ${prefix}spotifydl
├⬡ ${setv} ${prefix}mediafire
╰────────────❒`)
}
break
case 'quotesmenu': {
    m.reply(`
╭────❒ *💭 WISDOM QUOTES* ❒
├⬡ ${setv} ${prefix}motivation
├⬡ ${setv} ${prefix}islamic
├⬡ ${setv} ${prefix}quotes
├⬡ ${setv} ${prefix}funfact
├⬡ ${setv} ${prefix}lifehack
├⬡ ${setv} ${prefix}pickup
├⬡ ${setv} ${prefix}program
├⬡ ${setv} ${prefix}tech
├⬡ ${setv} ${prefix}why
╰────────────❒`)
}
break
case 'toolsmenu': {
    m.reply(`
╭────❒ *🛠️ UTILITY TOOLS* ❒
├⬡ ${setv} ${prefix}get 🅟
├⬡ ${setv} ${prefix}hd
├⬡ ${setv} ${prefix}define
├⬡ ${setv} ${prefix}toaudio
├⬡ ${setv} ${prefix}tomp3
├⬡ ${setv} ${prefix}tovn
├⬡ ${setv} ${prefix}toimage
├⬡ ${setv} ${prefix}toptv
├⬡ ${setv} ${prefix}tourl
├⬡ ${setv} ${prefix}tts
├⬡ ${setv} ${prefix}toqr
├⬡ ${setv} ${prefix}brat
├⬡ ${setv} ${prefix}bratvid
├⬡ ${setv} ${prefix}ssweb 🅟
├⬡ ${setv} ${prefix}sticker
├⬡ ${setv} ${prefix}colong
├⬡ ${setv} ${prefix}smeme
├⬡ ${setv} ${prefix}dehaze
├⬡ ${setv} ${prefix}colorize
├⬡ ${setv} ${prefix}toblock
├⬡ ${setv} ${prefix}emojimix
├⬡ ${setv} ${prefix}nulis
├⬡ ${setv} ${prefix}readmore
├⬡ ${setv} ${prefix}qc
├⬡ ${setv} ${prefix}translate
├⬡ ${setv} ${prefix}wasted
├⬡ ${setv} ${prefix}triggered
├⬡ ${setv} ${prefix}shorturl
├⬡ ${setv} ${prefix}gitclone
├⬡ ${setv} ${prefix}fat
├⬡ ${setv} ${prefix}fast
├⬡ ${setv} ${prefix}bass
├⬡ ${setv} ${prefix}slow
├⬡ ${setv} ${prefix}tupai
├⬡ ${setv} ${prefix}deep
├⬡ ${setv} ${prefix}robot
├⬡ ${setv} ${prefix}blown
├⬡ ${setv} ${prefix}reverse
├⬡ ${setv} ${prefix}smooth
├⬡ ${setv} ${prefix}earrape
├⬡ ${setv} ${prefix}nightcore
├⬡ ${setv} ${prefix}getexif
╰────────────❒`)
}
break
case 'aimenu': {
    m.reply(`
╭────❒ *🤖 AI NEURAL NET* ❒
├⬡ ${setv} ${prefix}ai  
├⬡ ${setv} ${prefix}simi
├⬡ ${setv} ${prefix}gemini
├⬡ ${setv} ${prefix}txt2img
╰────────────❒`)
}
break
case 'randommenu': {
    m.reply(`
╭────❒ *🎲 RANDOM GALLERY* ❒
├⬡ ${setv} ${prefix}coffee
├⬡ ${setv} ${prefix}technology
├⬡ ${setv} ${prefix}programming
├⬡ ${setv} ${prefix}cyberspace
├⬡ ${setv} ${prefix}mountain
├⬡ ${setv} ${prefix}islamic
├⬡ ${setv} ${prefix}game
├⬡ ${setv} ${prefix}ronaldo
├⬡ ${setv} ${prefix}messi
╰────────────❒`)
}
break
case 'stalkermenu': {
    m.reply(`
╭────❒ *🕵️ CYBER STALKER* ❒
├⬡ ${setv} ${prefix}wastalk
├⬡ ${setv} ${prefix}telestalk
├⬡ ${setv} ${prefix}igstalk
├⬡ ${setv} ${prefix}tiktokstalk
├⬡ ${setv} ${prefix}npmstalk
├⬡ ${setv} ${prefix}githubstalk
├⬡ ${setv} ${prefix}genshinstalk
╰────────────❒`)
}
break
case 'animemenu': {
    m.reply(`
╭────❒ *🌸 ANIME DIMENSION* ❒
├⬡ ${setv} ${prefix}waifu
├⬡ ${setv} ${prefix}neko
├⬡ ${setv} ${prefix}akiyama
├⬡ ${setv} ${prefix}akira
├⬡ ${setv} ${prefix}anna
├⬡ ${setv} ${prefix}asuna
├⬡ ${setv} ${prefix}boruto
├⬡ ${setv} ${prefix}chiho
├⬡ ${setv} ${prefix}cosplay
├⬡ ${setv} ${prefix}eba
├⬡ ${setv} ${prefix}emilia
├⬡ ${setv} ${prefix}erza
├⬡ ${setv} ${prefix}hinata
├⬡ ${setv} ${prefix}isuzu
├⬡ ${setv} ${prefix}itachi
├⬡ ${setv} ${prefix}mikasa
├⬡ ${setv} ${prefix}miku
├⬡ ${setv} ${prefix}naruto
├⬡ ${setv} ${prefix}sagiri
├⬡ ${setv} ${prefix}sasuke
├⬡ ${setv} ${prefix}yuri
╰────────────❒`)
}
break
case 'gamemenu': {
    m.reply(`
╭────❒ *🎮 GAME ARENA* ❒
├⬡ ${prefix}tictactoe
├⬡ ${prefix}akinator
├⬡ ${prefix}suit
├⬡ ${prefix}slot
├⬡ ${prefix}mathquiz
├⬡ ${prefix}begal
├⬡ ${prefix}snakeladder
├⬡ ${prefix}blackjack
├⬡ ${prefix}catur
├⬡ ${prefix}casino
├⬡ ${prefix}samgong
├⬡ ${prefix}rampok
├⬡ ${prefix}riddle
├⬡ ${prefix}guesslyrics
├⬡ ${prefix}guessword
├⬡ ${prefix}guessbomb
├⬡ ${prefix}arrangeword
├⬡ ${prefix}colorblind
├⬡ ${prefix}guesschemistry
├⬡ ${prefix}trivia
├⬡ ${prefix}guessnumber
├⬡ ${prefix}guesscountry
├⬡ ${prefix}guesspicture
├⬡ ${prefix}Flag
╰────────────❒`)
}
break
case 'funmenu': {
    m.reply(`
╭────❒ *🎪 FUN ZONE* ❒
├⬡ ${prefix}tryluck
├⬡ ${prefix}dice
├⬡ ${prefix}canthey
├⬡ ${prefix}isit
├⬡ ${prefix}when
├⬡ ${prefix}who
├⬡ ${prefix}magicshell
├⬡ ${prefix}checkdeath
├⬡ ${prefix}checkpersonality
├⬡ ${prefix}checkguardian
├⬡ ${prefix}rate
├⬡ ${prefix}mysoulmate
├⬡ ${prefix}couple
├⬡ ${prefix}frame
├⬡ ${prefix}halah
├⬡ ${prefix}hilih
├⬡ ${prefix}huluh
├⬡ ${prefix}heleh
├⬡ ${prefix}holoh
╰────────────❒`)
}
break
case 'ownermenu': {
    m.reply(`
╭────❒ *⚡ OWNER CONTROL* ❒
├⬡ ${setv} ${prefix}bot [set]
├⬡ ${setv} ${prefix}setbio
├⬡ ${setv} ${prefix}setppbot
├⬡ ${setv} ${prefix}setting
├⬡ ${setv} ${prefix}join
├⬡ ${setv} ${prefix}leave
├⬡ ${setv} ${prefix}block
├⬡ ${setv} ${prefix}listblock
├⬡ ${setv} ${prefix}openblock
├⬡ ${setv} ${prefix}listpc
├⬡ ${setv} ${prefix}listgc
├⬡ ${setv} ${prefix}ban
├⬡ ${setv} ${prefix}unban
├⬡ ${setv} ${prefix}mute
├⬡ ${setv} ${prefix}unmute
├⬡ ${setv} ${prefix}creategc
├⬡ ${setv} ${prefix}clearchat
├⬡ ${setv} ${prefix}addprem
├⬡ ${setv} ${prefix}delprem
├⬡ ${setv} ${prefix}listprem
├⬡ ${setv} ${prefix}addlimit
├⬡ ${setv} ${prefix}addmoney
├⬡ ${setv} ${prefix}getmsgstore
├⬡ ${setv} ${prefix}bot --settings
├⬡ ${setv} ${prefix}bot settings
├⬡ ${setv} ${prefix}getsession
├⬡ ${setv} ${prefix}delsession
├⬡ ${setv} ${prefix}delfrankdb 
├⬡ ${setv} ${prefix}upsw
├⬡ ${setv} ${prefix}backup
├⬡ ${setv} $ 🅞
├⬡ ${setv} > 🅞
├⬡ ${setv} < 🅞
╰────────────❒`)
			}
			break

			default:
			if (budy.startsWith('>')) {
				if (!isCreator) return
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('<')) {
				if (!isCreator) return
				try {
					let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('$')) {
				if (!isCreator) return
				if (!text) return
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) return m.reply(stdout)
				})
			}
		}
	} catch (e) {
		let msg;
		console.log(e);
		const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
		const now = Date.now();
		if (!errorCache[errorKey]) errorCache[errorKey] = [];
		errorCache[errorKey] = errorCache[errorKey].filter(ts => now - ts < 600000);
		if (errorCache[errorKey].length >= 3) return;
		errorCache[errorKey].push(now);
		if (e?.status === 404) msg = 'Resource not found (404).'
		else if (e?.status === 403) msg = 'Access Denied (403).'
		else if (e?.code === 'ETIMEDOUT') msg = 'It looks like the server is taking too long to respond. Try checking your internet connection.'
		else if (e?.code === 'ENOTFOUND') msg = 'It looks like the server was not found. Check your internet connection.'
		else if (e?.code === 'ERR_OSSL_BAD_DECRYPT') msg = 'It looks like an error occurred while decrypting the data. Make sure the key is valid.'
		else if (e?.name === 'TypeError') msg = 'There seems to be a problem with the data type used.'
		else if (e?.name === 'ReferenceError') msg = 'It looks like there is an undefined variable.'
		else if (e?.name === 'SessionError') msg = 'There seems to be a problem with the session. Make sure everything is connected properly.'
		else if (e?.name === 'AxiosError') msg = 'There seems to be a problem with data retrieval, try checking the connection.'
		else if (e?.message?.includes('not-acceptable') || e?.data === 406) msg = 'The request was not accepted by the server (406 Not Acceptable). Check whether the format or content of the request is correct.'
		else if (e?.output?.statusCode === 408 || e?.message?.includes('Timed Out')) msg = 'It looks like the request has exceeded the time limit, please try again later.'
		else if (e?.output?.statusCode === 404 || e?.message?.includes('myAppStateKey')) msg = 'It looks like the state key was not found, please try again later.'
		else if (e?.output?.statusCode === 500 || e?.message?.includes('internal-server-error')) msg = 'It seems like an error occurred on the server, please try again later.'
		else if (e?.message?.includes('Media upload failed on all hosts')) msg = 'It seems like media upload failed, try checking server settings.'
		else if (e?.message?.includes('No sessions')) msg = 'It looks like session not found, maybe bot would not respond.'
		else if (e?.message?.includes('Cannot find ffmpeg')) msg = 'It looks like ffmpeg is not installed on the system, please install it first.'
		else if (e?.message?.includes('Cannot find module')) msg = 'It seems that there is a module that is not installed in the system, please install it first.'
		if (msg) {
			m.reply(msg + '\n\nError: ' + (e?.name || e?.code || e?.output?.statusCode || e?.status || 'Unknown') + '\nError Log Has Been Sent to Owner\n\n')
		}
		return qasim.sendFromOwner(owner, `Hi Sir Frank Kaumba dev, it seems like there is an error, fix it please.\n\nVersion : *${require('./package.json').version}*\n\n*Log error:*\n\n` + util.format(e), m, { contextInfo: { isForwarded: true }})
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
