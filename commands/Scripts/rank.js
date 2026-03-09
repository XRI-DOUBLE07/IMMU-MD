const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../database/userRanks.json');

function initializeDB() {
    if (!fs.existsSync(path.dirname(DB_FILE))) {
        fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    }
    
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf8');
    }
}

function getUserData() {
    try {
        initializeDB();
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || '{}');
    } catch (error) {
        console.error('Error loading user rank data:', error);
        return {};
    }
}

function saveUserData(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving user rank data:', error);
        return false;
    }
}

function getUserRank(userId) {
    const data = getUserData();
    
    if (!data[userId]) {
        data[userId] = {
            level: 1,
            rank: 0,
            xp: 0,
            requiredXP: 100,
            messageCount: 0,
            lastMessageTime: 0
        };
        saveUserData(data);
    }
    
    return data[userId];
}

function updateUserXP(userId, username) {
    const data = getUserData();
    const now = Date.now();
    
    if (!data[userId]) {
        data[userId] = {
            level: 1,
            rank: 0,
            xp: 0,
            requiredXP: 100,
            messageCount: 0,
            lastMessageTime: 0,
            username: username
        };
    }
    
    const user = data[userId];
    
    if (username) {
        user.username = username;
    }
    
    if (now - user.lastMessageTime > 60000 || !user.lastMessageTime) {
        const xpGain = Math.floor(Math.random() * 16) + 10;
        user.xp += xpGain;
        user.messageCount = user.messageCount ? user.messageCount + 1 : 1;
        user.lastMessageTime = now;
        
        if (user.xp >= user.requiredXP) {
            user.level += 1;
            user.xp = user.xp - user.requiredXP;
            user.requiredXP = Math.floor(user.requiredXP * 1.5);
        }
        
        updateRanks(data);
        saveUserData(data);
    }
    
    return user;
}

function updateRanks(data) {
    const users = Object.entries(data).map(([id, user]) => ({
        id,
        score: user.level * 10000 + user.xp
    }));
    
    users.sort((a, b) => b.score - a.score);
    
    users.forEach((user, index) => {
        data[user.id].rank = index + 1;
    });
}

module.exports = {
    name: 'rank',
    desc: 'Check your rank or another user\'s rank',
    aliases: ['level'],
    category: 'User',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            let targetJid = m.sender;
            let targetName = '';
            
            if (m.quoted) {
                targetJid = m.quoted.sender;
            }
            
            if (args[0] && args[0].startsWith('@')) {
                const mentionedJid = args[0].replace('@', '') + '@s.whatsapp.net';
                if (mentionedJid) {
                    targetJid = mentionedJid;
                }
            }
            
            try {
                const [result] = await sock.onWhatsApp(targetJid);
                
                if (result?.exists) {
                    const contactInfo = await sock.getContactInfo(targetJid);
                    targetName = contactInfo?.name || contactInfo?.verifiedName || result.jid.split('@')[0];
                } else {
                    targetName = targetJid.split('@')[0];
                }
            } catch (e) {
                targetName = targetJid.split('@')[0];
            }
            
            let avatarUrl;
            try {
                avatarUrl = await sock.profilePictureUrl(targetJid, 'image');
            } catch (e) {
                avatarUrl = 'https://i.imgur.com/wvxPV9S.png';
            }
            
            const userData = getUserRank(targetJid);
            
            if (!userData.messageCount) userData.messageCount = 0;
            if (targetJid === m.sender) {
                userData.messageCount += 1;
                if (!userData.lastMessageTime || Date.now() - userData.lastMessageTime > 60000) {
                    const xpGain = Math.floor(Math.random() * 16) + 10;
                    userData.xp += xpGain;
                    userData.lastMessageTime = Date.now();
                    
                    if (userData.xp >= userData.requiredXP) {
                        userData.level += 1;
                        userData.xp = userData.xp - userData.requiredXP;
                        userData.requiredXP = Math.floor(userData.requiredXP * 1.5);
                    }
                }
            }
            
            userData.username = targetName;
            const allData = getUserData();
            allData[targetJid] = userData;
            updateRanks(allData);
            saveUserData(allData);
            
            const loadingMsg = await m.reply(
                '╭────❒ ⏳ Processing ❒\n' +
                '├⬡ Generating rank card...\n' +
                '├⬡ Please wait\n' +
                '╰────────────❒'
            );
            
            let status = "Newbie";
            if (userData.level >= 20) status = "Expert";
            else if (userData.level >= 15) status = "Master";
            else if (userData.level >= 10) status = "Pro";
            else if (userData.level >= 5) status = "Regular";
            
            const rankUrl = `https://kaiz-apis.gleeze.com/api/rank?` + 
                `level=${userData.level}` +
                `&rank=${userData.rank}` +
                `&xp=${userData.xp}` +
                `&requiredXP=${userData.requiredXP}` +
                `&nickname=${encodeURIComponent(targetName)}` +
                `&status=${encodeURIComponent(status)}` +
                `&avatar=${encodeURIComponent(avatarUrl)}`;
            
            try {
                const response = await axios.get(rankUrl, { responseType: 'arraybuffer' });
                
                await sock.sendMessage(m.chat, { 
                    image: Buffer.from(response.data),
                    caption: `✨ *RANK CARD* ✨\n\nName: ${targetName}\nLevel: ${userData.level}\nRank: ${userData.rank}\nXP: ${userData.xp}/${userData.requiredXP}\nStatus: ${status}\nMessages: ${userData.messageCount}`
                }, { quoted: m });
                
                sock.sendMessage(m.chat, { delete: loadingMsg.key });
            } catch (error) {
                console.error('Error generating rank card:', error);
                
                sock.sendMessage(m.chat, { delete: loadingMsg.key });
                await m.reply(
                    '╭────❒ 📊 User Rank ❒\n' +
                    `├⬡ Name: ${targetName}\n` +
                    `├⬡ Level: ${userData.level}\n` +
                    `├⬡ Rank: ${userData.rank}\n` +
                    `├⬡ XP: ${userData.xp}/${userData.requiredXP}\n` +
                    `├⬡ Status: ${status}\n` +
                    `├⬡ Messages: ${userData.messageCount}\n` +
                    '╰────────────❒\n\n' +
                    '⚠️ Failed to generate rank card image.'
                );
            }
            
        } catch (err) {
            console.error('Error in rank command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while processing the command\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    },
    
    messageHandler: async (sock, m) => {
        try {
            if (m.body && m.body.startsWith('!')) return;
            
            let username = '';
            try {
                const contactInfo = await sock.getContactInfo(m.sender);
                username = contactInfo?.name || contactInfo?.verifiedName || m.sender.split('@')[0];
            } catch (e) {
                username = m.sender.split('@')[0];
            }
            
            updateUserXP(m.sender, username);
        } catch (err) {
            console.error('Error updating user XP:', err);
        }
    }
};