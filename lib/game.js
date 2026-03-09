require('../settings');
const fs = require('fs');
const jimp = require('jimp');
const chalk = require('chalk');
const { sleep, clockString } = require('./function');

function pickRandom(list) {
	return list[Math.floor(list.length * Math.random())];
}

const rdGame = (bd, id, tm) => Object.keys(bd).find(a => a.startsWith(id) && a.endsWith(tm));

const iGame = (bd, id) => (a => a && bd[a].id)(Object.keys(bd).find(a => a.startsWith(id)));

const tGame = (bd, id) => (a => a && bd[a].time)(Object.keys(bd).find(a => a.startsWith(id)));

const gameSlot = async (conn, m, db) => {
	if (db.users[m.sender].limit < 1) return m.reply(global.mess.limit);
	const sotoy = ['🍇','🍉','🍋','🍌','🍎','🍑','🍒','🫐','🥥','🥑'];
	const slot1 = pickRandom(sotoy);
	const slot2 = pickRandom(sotoy);
	const slot3 = pickRandom(sotoy);
	const listSlot1 = `${pickRandom(sotoy)} : ${pickRandom(sotoy)} : ${pickRandom(sotoy)}`;
	const listSlot2 = `${slot1} : ${slot2} : ${slot3}`;
	const listSlot3 = `${pickRandom(sotoy)} : ${pickRandom(sotoy)} : ${pickRandom(sotoy)}`;
	const randomLimit = Math.floor(Math.random() * 10);
	const botNumber = await conn.decodeJid(conn.user.id);
	try {
		if (slot1 === slot2 && slot2 === slot3) {
			db.users[m.sender].limit -= 1;
			db.set[botNumber].limit += 1;
			let sloth = `[  🎰VIRTUAL SLOT 🎰  ]\n------------------------\n\n${listSlot1}\n${listSlot2} <=====\n${listSlot3}\n\n------------------------\n[  🎰 VIRTUAL SLOT 🎰  ]\n\n*Information* :\n_You Win🎉_ <=====Limit + ${randomLimit}, Money + ${randomLimit * 500}`;
			conn.sendMessage(m.chat, { text: sloth }, { quoted: m });
			db.users[m.sender].limit += randomLimit;
			db.users[m.sender].money += randomLimit * 500;
		} else {
			db.users[m.sender].limit -= 1;
			db.set[botNumber].limit += 1;
			let sloth = `[  🎰VIRTUAL SLOT 🎰  ]\n------------------------\n\n${listSlot1}\n${listSlot2} <=====\n${listSlot3}\n\n------------------------\n[  🎰 VIRTUAL SLOT 🎰  ]\n\n*Information* :\n_You Lose_ <=====\nLimit - 1`;
			conn.sendMessage(m.chat, { text: sloth }, { quoted: m });
		}
	} catch (e) {
		m.reply('Error!');
	}
};

const gameCasinoSolo = async (conn, m, prefix, db) => {
	try {
		let buatall = 1;
		if (db.users[m.sender].limit < 1) return m.reply(global.mess.limit);
		const botNumber = await conn.decodeJid(conn.user.id);
		let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
		let randomkamu = `${Math.floor(Math.random() * 81)}`.trim(); // hehe Biar Susah Menang :v
		let Aku = (randomaku * 1);
		let Kamu = (randomkamu * 1);
		let count = m.args[0];
		count = count ? (count === 'all' ? Math.floor(db.users[m.sender].money / buatall) : parseInt(count)) : 1;
		count = Math.max(1, count);
		if (m.args.length < 1) return m.reply(prefix + 'casino <amount>\n' + prefix + 'casino 1000');
		if (isNaN(m.args[0])) return m.reply(`Enter the amount!\nExample : ${prefix + m.command} 1000`);
		if (db.users[m.sender].money >= count) {
			db.users[m.sender].limit -= 1;
			db.users[m.sender].money -= count;
			db.set[botNumber].money += count;
			if (Aku > Kamu) {
				m.reply(`💰 Casino 💰\n*You:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*You LOSE*\nYou lost ${count} Money`.trim());
			} else if (Aku < Kamu) {
				db.users[m.sender].money += count * 2;
				m.reply(`💰 Casino 💰\n*You:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*You Win*\nYou Get ${count * 2} Money`.trim());
			} else {
				db.users[m.sender].money += count;
				m.reply(`💰 Casino 💰\n*You:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*DRAW*\nYou get ${count} Money`.trim());
			}
		} else m.reply(`Your money is not enough for Casino please *collect* it first!`);
	} catch (e) {
		m.reply('Error!');
	}
};

const gameSamgongSolo = async (conn, m, db) => {
	const suits = ['♥️', '♦️', '♣️', '♠️'];
	const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	if (db.users[m.sender].limit < 1) return m.reply(global.mess.limit);
	const count = parseInt(m.args[0]);
	if (isNaN(count) || count < 5000) return m.reply('The minimum bet is 5000!');
	if (db.users[m.sender].money < count) return m.reply(`Your money is not enough for Samgong, please *collect* it first!`);
	db.users[m.sender].money -= count;
	db.users[m.sender].limit -= 1;
	let { key } = await m.reply('*🃏The game begins!* Cards are being dealt...');
	await sleep(5000);
	const deck = ranks.flatMap(rank => suits.map(suit => `${rank} ${suit}`)).sort(() => Math.random() - 0.5);
	const draw = () => [deck.pop(), deck.pop(), deck.pop()];
	const calcScore = hand => hand.reduce((sum, card) => sum + (['J', 'Q', 'K'].includes(card.split(' ')[0]) ? 10 : card.split(' ')[0] === 'A' ? 15 : parseInt(card)), 0);

	let playerHand = draw(), botHand = draw();
	let playerScore = calcScore(playerHand), botScore = calcScore(botHand);

	await m.reply(`*🃏Cards Dealt:*\n🤓 *You:* ${playerHand.join(', ')}\n🤖 *Bot:* ${botHand.join(', ')}`, { edit: key });
	await sleep(2000);
	while (playerScore < 30 && botScore < 30 && playerHand.length < 4) {
		if (playerScore < 30) playerHand.push(deck.pop());
		if (botScore < 30) botHand.push(deck.pop());
		playerScore = calcScore(playerHand);
		botScore = calcScore(botHand);
	}

	let winnings = count * 1.5;
	let result = playerScore > 30
		? '💀 You lost!'
		: playerScore === botScore
			? '🤝 It\'s a draw! Bet returned'
			: botScore > 30 || playerScore > botScore
				? `🎉 You win! +${winnings} 💵`
				: '😞 Bot wins!';

	if (playerScore <= 30 && (botScore > 30 || playerScore > botScore)) {
		db.users[m.sender].money += (playerScore === botScore ? count : winnings);
	}

	await m.reply(`*🃏Final Result:*\n🤓 *You:* ${playerHand.join(', ')} (${playerScore})\n🤖 *Bot:* ${botHand.join(', ')} (${botScore})\n\n${result}`, { edit: key });
};

const gameMerampok = async (m, db) => {
	if (db.users[m.sender].limit < 1) return m.reply(global.mess.limit);
	db.users[m.sender].limit -= 1;
	let __timers = (new Date() - db.users[m.sender].lastrampok);
	let _timers = (3600000 - __timers);
	let timers = clockString(_timers);
	if (new Date() - db.users[m.sender].lastrampok > 3600000) {
		let dapat = (Math.floor(Math.random() * 10000));
		let who;
		if (m.isGroup) who = m.mentionedJid ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.mentionedJid[0];
		else who = m.chat;
		if (!who) return m.reply('Tag someone');
		if (!db.users[who]) return m.reply('Target is not registered in the database!');
		if (10000 > db.users[who].money) return m.reply('Target is too poor 🗿');
		db.users[who].money -= dapat;
		db.users[m.sender].money += dapat;
		db.users[m.sender].lastrampok = new Date().getTime(); // Use .getTime() for consistency
		m.reply(`Successfully robbed the target's money amounting to ${dapat}`);
	} else m.reply(`You have already robbed and successfully hidden, wait ${timers} to rob again`);
};

const gameBegal = async (conn, m, db) => {
	if (db.users[m.sender].limit < 1) return m.reply(global.mess.limit);
	db.users[m.sender].limit -= 1;
	let user = db.users[m.sender];
	let __timers = (new Date() - user.lastbegal);
	let _timers = (3600000 - __timers);
	let timers = clockString(_timers);
	const botNumber = await conn.decodeJid(conn.user.id);
	const randomUang = Math.floor(Math.random() * 10001);
	let random = [
		{ teks: 'Player Successfully Escaped!', no: 0 },
		{ teks: 'Player Ran Away!', no: 0 },
		{ teks: 'Player is Hiding', no: 0 },
		{ teks: 'Player Committed Suicide', no: 2 },
		{ teks: 'Player Successfully Caught', no: 2 },
		{ teks: 'Player Not Found!', no: 0 },
		{ teks: 'Player is Stronger Than You!', no: 1 },
		{ teks: 'Player Used Cheat', no: 1 },
		{ teks: 'Player Reported to Police', no: 0 },
		{ teks: 'Player Caught!', no: 2 },
		{ teks: 'Player Surrendered', no: 2 }
	];
	let teksnya = await pickRandom(random);

	if (new Date() - user.lastbegal > 3600000) {
		let { key } = await m.reply('Searching for a player...');
		await sleep(2000);
		if (teksnya.no === 0) {
			await m.reply({ text: teksnya.teks, edit: key });
			await m.reply('Failed to find a player, please try again');
		} else if (teksnya.no === 1) {
			await m.reply({ text: teksnya.teks, edit: key });
			await m.reply(`You were killed by a player\nYour money was robbed amounting to *${randomUang}*`);
			db.users[m.sender].money -= randomUang; // This line was outside the else-if block before, now correctly inside
			db.set[botNumber].money += randomUang; // This line was outside the else-if block before, now correctly inside
		} else { // This 'else' covers teksnya.no === 2 cases
			await m.reply({ text: teksnya.teks, edit: key });
			await m.reply(`Successfully Get Money As Much As : *${randomUang}*`);
			db.users[m.sender].money += randomUang;
			db.users[m.sender].lastbegal = new Date().getTime(); // Use .getTime() for consistency
		}
	} else { // This is the main 'else' for the time check
		m.reply(`Please wait *⏱️${timers}* again to be able to play again`);
	}
};

const daily = async (m, db) => {
	let user = db.users[m.sender];
	let __timers = (new Date() - user.lastclaim);
	let _timers = (86400000 - __timers);
	let timers = clockString(_timers);
	if (new Date() - user.lastclaim > 86400000) {
		m.reply(`*Daily Claim*\n_Succeed Claim_\n- limit : 10\n- Money : 10000\n\n_Claim Reset_`);
		db.users[m.sender].limit += 10;
		db.users[m.sender].money += 10000;
		db.users[m.sender].lastclaim = new Date().getTime(); // Use .getTime() for consistency
	} else m.reply(`Please wait *⏱️${timers}* again to be able to claim again`);
};

const buy = async (m, args, db) => {
	if (args[0] === 'limit') {
		if (!args[1]) return m.reply(`Enter the nominal!\nExample : ${m.prefix + m.command} limit 10`);
		let count = parseInt(args[1]);
		if (db.users[m.sender].money >= count * 500) {
			db.users[m.sender].limit += count; // Simplified count * 1 to count
			db.users[m.sender].money -= count * 500;
			m.reply(`Successfully purchased ${count} limits for the price of ${count * 500}`); // Changed args[1]*1 to count for clarity
		} else m.reply(`You don't have enough money to buy limits!\nYour remaining money: ${db.users[m.sender].money}\nPrice for ${count} limits: ${count * 500}`);
	} else m.reply(`Limit Price: Quantity x 500\n• 1 limit = 500\n• 2 limits = 1000\n\nExample: .buy limit 3`);
};

const setLimit = (m, db) => db.users[m.sender].limit -= 1;

const addLimit = (jumlah, no, db) => db.users[no].limit += parseInt(jumlah);

const setMoney = (m, db) => db.users[m.sender].money -= 1000;

const addMoney = (jumlah, no, db) => db.users[no].money += parseInt(jumlah);

const transfer = async (m, args, db) => {
	// Changed '==' to '===' for strict comparison
	if (args[0] === 'limit') {
		// Changed '!args[1].length > 7' to '!(args[1] && args[1].length > 7)' for safer check
		if (!(args[1] && args[1].length > 7)) return m.reply(`Transfer Menu:\nExample: ${m.prefix + m.command} limit @tag 11\n• ${m.prefix + m.command} limit @tag amount\n• ${m.prefix + m.command} money @tag amount`);
		// Simplified Math.min(1) to 1
		let count = parseInt(args[2] && args[2].length > 0 ? Math.min(9999999, Math.max(parseInt(args[2]), 1)) : 1);
		let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[1] ? (args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net') : false;
		if (!who) return m.reply('Who do you want to transfer to?'); // Corrected message
		if (db.users[who]) {
			// Simplified count * 1 to count
			if (db.users[m.sender].limit >= count) {
				try {
					db.users[m.sender].limit -= count;
					db.users[who].limit += count;
					m.reply(`Successfully transferred a limit of ${count} to @${who.split('@')[0]}`);
				} catch (e) {
					db.users[m.sender].limit += count;
					m.reply('Transfer failed');
				}
			} else m.reply(`Insufficient limit!!\nYour remaining limit: *${db.users[m.sender].limit}*`);
		} else m.reply(`Number ${who.split('@')[0]} is not a bot user!`);
	} else if (args[0] === 'money') { // Changed '==' to '==='
		if (!(args[1] && args[1].length > 7)) // Same check as above
			return m.reply(`Transfer Menu:\nExample: ${m.prefix + m.command} limit @tag 11\n• ${m.prefix + m.command} limit @tag amount\n• ${m.prefix + m.command} money @tag amount`);

		let count = parseInt(args[2] && args[2].length > 0 ? Math.min(9999999, Math.max(parseInt(args[2]), 1)) : 1);
		let who = m.mentionedJid[0]
			? m.mentionedJid[0]
			: m.quoted
				? m.quoted.sender
				: args[1]
					? (args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net')
					: false;

		if (!who) return m.reply('Who do you want to transfer to?');

		if (db.users[who]) {
			if (db.users[m.sender].money >= count) { // Simplified count * 1 to count
				try {
					db.users[m.sender].money -= count;
					db.users[who].money += count;
					m.reply(`Successfully transferred money amounting to ${count} to @${who.split('@')[0]}`);
				} catch (e) {
					db.users[m.sender].money += count;
					m.reply('Transfer failed');
				}
			} else m.reply(`Insufficient money!!\nYour remaining money: *${db.users[m.sender].money}*`);
		} else m.reply(`Number ${who.split('@')[0]} is not a bot user!`);
	} else m.reply(`Transfer Menu:\nExample: ${m.prefix + m.command} limit @tag 11\n• ${m.prefix + m.command} limit @tag amount\n• ${m.prefix + m.command} money @tag amount`);
};

/*
	* Created By GlobalTechInfo
	* Follow https://github.com/GlobalTechInfo
	* Whatsapp : https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07
*/

class Blackjack {
	constructor(data) {
		this.id = data.id || '';
		this.skip = data.skip || [];
		this.host = data.host || '';
		this.leader = data.leader || '';
		this.winner = data.winner || [];
		this.players = data.players || [];
		this.started = data.started || false;
		this.startCard = data.startCard || {};
		this.submitCard = data.submitCard || [];
		this.secondDeck = data.secondDeck || [];
		this.deck = data.deck || this.generateDeck();
	}

	generateDeck() {
		let deck = [];
		const suits = ['♥️', '♦️', '♣️', '♠️'];
		const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		for (let suit of suits) {
			for (let rank of ranks) {
				deck.push({ rank: rank, suit: suit });
			}
		}
		return deck;
	}

	shuffleDeck() {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	}

	distributeCards() {
		this.shuffleDeck();
		for (let player of this.players) {
			player.cards.push(...this.deck.splice(0, { 2: 10, 3: 7, 4: 7, 5: 6, 6: 6, 7: 5, 8: 5, 9: 4, 10: 4 }[this.players.length]));
		}
		this.startCard = this.deck.shift();
		this.secondDeck.push(this.startCard);
		this.started = true;
	}

	hasMatching(player) {
		return this.players.find(p => p.id === player)?.cards?.some(card => card?.suit === this.startCard.suit) || false;
	}

	resolveRound() {
		const rankToValue = (rank) => rank === 'A' ? 14 : rank === 'K' ? 13 :  rank === 'Q' ? 12 : rank === 'J' ? 11 : parseInt(rank) || 0;
		let highestCard = this.submitCard[0];
		let leaderId = highestCard.id;
		for (let c of this.submitCard) {
			if (rankToValue(c.card.rank) > rankToValue(highestCard.card.rank)) {
				highestCard = c;
				leaderId = c.id;
			}
		}
		if (leaderId) {
			this.leader = leaderId;
			this.startCard = {};
			this.submitCard = [];
			return `@${leaderId.split('@')[0]} leads the next round!`;
		}
	}

	reuseSubmitCardsForDrinking() {
		const drinkers = this.players.filter(p => !this.hasMatching(p.id) && !this.skip.includes(p.id));
		const cards = this.submitCard.map(s => s.card);
		if ((this.submitCard.length + this.skip.length) === this.players.length && cards.length === 1) {
			const owner = this.submitCard[0].id;
			this.leader = owner;
			for (const player of this.players) {
				if (player.id !== owner) this.skip.push(player.id);
			}
			return {
				msg: `Only @${owner.split('@')[0]} has the card, they become the new leader. The session continues.`,
				continue: true
			};
		} else {
			let index = 0;
			for (const card of cards) {
				if (!drinkers.length) break;
				const player = this.players.find(p => p.id === drinkers[index % drinkers.length].id);
				player.cards.push(card);
				// Changed from 'a => a.id === player.id' to 'a => a === player.id' assuming skip stores only IDs
				// or store objects with { id: player.id } if that's intended
				if (!this.skip.find(a => a === player.id)) this.skip.push(player.id); // Assuming skip is an array of player IDs
				index++;
			}
			return {
				msg: `The cards from the submitCard are dealt to the player who has to drink.`,
				continue: true
			};
		}
	}
}

class SnakeLadder {
	constructor(data) {
		this.turn = data.turn || 0;
		this.host = data.host || null;
		this.start = data.start || false;
		this.players = data.players || [];
		this.map = data.map || this.createMap();
	}

	rollDice() {
		return Math.floor(Math.random() * 6) + 1;
	}

	createMap () {
		const data = [{
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map1.jpg',
			move: { 4: 56, 12: 50, 14: 55, 22: 58, 41: 79, 54: 88, 96: 42, 94: 71, 75: 32, 48: 16, 37: 3, 28: 10 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map2.jpg',
			move: { 7: 36, 21: 58, 31: 51, 34: 84, 54: 89, 63: 82, 96: 72, 78: 59, 66: 12, 56: 20, 43: 24, 33: 5 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map3.jpg',
			move: { 8: 29, 10: 32, 20: 39, 27: 85, 51: 67, 72: 91, 79: 100, 98: 65, 94: 75, 93: 73, 64: 60, 62: 19, 56: 24, 53: 50, 17: 7 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map4.jpg',
			move: { 8: 29, 10: 32, 20: 39, 27: 85, 51: 67, 72: 91, 79: 100, 98: 65, 94: 75, 93: 73, 64: 60, 62: 19, 56: 24, 53: 50, 17: 7 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map5.jpg',
			move: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 72: 91, 80: 99, 98: 79, 94: 75, 93: 73, 87: 36, 64: 60, 62: 19, 54: 34, 17: 7 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map6.jpg',
			move: { 4: 23, 13: 46, 33: 52, 42: 63, 50: 69, 62: 81, 74: 93, 99: 41, 95: 76, 89: 53, 66: 45, 54: 31, 43: 17, 40: 2, 27: 5 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map7.jpg',
			move: { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 51: 67, 71: 91, 80: 100, 98: 79, 95: 75, 93: 73, 87: 24, 64: 60, 62: 19, 54: 34, 17: 7 },
			mode: ''
		}, {
			url: 'https://raw.githubusercontent.com/nazedev/database/master/games/images/map/map8.jpg',
			move: { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 87: 94, 99: 80, 95: 75, 92: 88, 89: 68, 74: 53, 64: 60, 62: 19, 49: 11, 46: 25, 16: 6 },
			mode: ''
		}];
		return data[Math.floor(Math.random() * data.length)];
	}

	nextTurn() {
		this.turn = (this.turn + 1) % this.players.length;
	}

	async drawBoard(boardUrl, players = []) {
		try {
			const board = await jimp.read(boardUrl);
			board.resize(612, 612);
			const width = board.getWidth();
			const height = board.getHeight();
			const size = Math.min(width, height);
			board.crop((width - size) / 2, (height - size) / 2, size, size);
			const tileSize = size / 10;
			players.filter(a => a.move !== null);
			for (let i = 0; i < players.length; i++) {
				const position = players[i].move;
				const row = Math.floor((position - 1) / 10);
				const col = (row % 2 === 0) ? (position - 1) % 10 : 9 - (position - 1) % 10;
				const x = col * tileSize;
				const y = (9 - row) * tileSize;
				const player = await jimp.read(`https://raw.githubusercontent.com/nazedev/database/master/games/images/player${i + 1}.png`);
				const pionSize = tileSize * 0.7;
				player.resize(pionSize, pionSize);
				board.composite(player, x + tileSize / 2 - pionSize / 2, y + tileSize / 2 - pionSize / 2, {
					mode: jimp.BLEND_SOURCE_OVER
				});
			}
			const result = await board.getBufferAsync(jimp.MIME_JPEG);
			return result;
		} catch (e) {
			return null;
		}
	}
}
module.exports = { rdGame, iGame, tGame, gameSlot, gameCasinoSolo, gameSamgongSolo, gameMerampok, gameBegal, daily, buy, setLimit, addLimit, addMoney, setMoney, transfer, Blackjack, SnakeLadder }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
