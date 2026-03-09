const axios = require('axios');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, './pi.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({}), 'utf8');
}

module.exports = {
    name: 'pi',
    desc: 'Chat with Pi AI assistant',
    aliases: ['pibot', 'piai', 'chat'],
    category: 'AI',
    cooldown: 3,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            if (!args[0]) {
                return m.reply(
                    '╭────❒ ℹ️ Pi AI ❒\n' +
                    '├⬡ Please provide a message to chat with Pi\n' +
                    '├⬡ Usage: !pi [your message]\n' +
                    '╰────────────❒'
                );
            }

            const userId = m.sender.split('@')[0];
            const query = args.join(' ');
            
            // Load user data from database
            let piData = {};
            try {
                const dbContent = fs.readFileSync(dbPath, 'utf8');
                piData = JSON.parse(dbContent);
            } catch (err) {
                console.error('Error reading Pi database:', err);
                piData = {};
            }
            
            // Make API request
            const apiUrl = 'https://for-devs.ddns.net/api/pi';
            const response = await axios.get(apiUrl, {
                params: {
                    query: query,
                    uid: userId,
                    apikey: 'r-rishad100'
                }
            });
            
            if (response.data && response.data.status === 'success') {
                // Save user data to database
                piData[userId] = {
                    lastQuery: query,
                    lastResponse: response.data.result,
                    cookie: response.data.cookie,
                    timestamp: Date.now()
                };
                
                fs.writeFileSync(dbPath, JSON.stringify(piData, null, 2), 'utf8');
                
                // Reply with Pi's response
                await m.reply(
                    '╭────❒ 🤖 Pi AI ❒\n' +
                    `├⬡ ${response.data.result}\n` +
                    '╰────────────❒'
                );
                
                // Optional: Send voice message if requested
                // This part would need additional implementation for voice support
                
            } else {
                await m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Failed to get response from Pi\n' +
                    '├⬡ Please try again later\n' +
                    '╰────────────❒'
                );
            }
            
        } catch (err) {
            console.error('Error in Pi command:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while processing the command\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};