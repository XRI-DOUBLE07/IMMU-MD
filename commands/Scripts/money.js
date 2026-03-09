const axios = require('axios');

const API_KEY = '7ea54dbe4e-5352085730-svvvym';
const BASE_URL = 'https://api.fastforex.io';

module.exports = {
    name: 'money',
    desc: 'Converts currency amounts using live exchange rates.',
    aliases: ['currency', 'convert'],
    category: 'Utility',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (args.length !== 3) {
            return m.reply(
                '╭────❒ 💰 Usage 💰 ❒────\n' +
                '├⬡ Convert currency using: !money [amount] [from_currency] [to_currency]\n' +
                '├⬡ Example: !money 100 USD EUR\n' +
                '╰───────────────────'
            );
        }

        const amount = parseFloat(args[0]);
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();

        if (isNaN(amount)) {
            return m.reply('╭────❒ ❌ Error ❒\n├⬡ Invalid amount provided.\n╰────────────❒');
        }

        try {
            const processingMsg = await m.reply(
                `╭────❒ ⏳ Converting ⏳ ❒────\n` +
                `├⬡ Converting ${amount} ${fromCurrency} to ${toCurrency}...\n` +
                `├⬡ Please wait a moment...\n` +
                `╰───────────────────`
            );

            const apiUrl = `${BASE_URL}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${API_KEY}`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (data.result && data.result[toCurrency]) {
                const convertedAmount = data.result[toCurrency];
                await sock.sendMessage(
                    m.chat,
                    {
                        text: `💰 Result: ${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`,
                    },
                    { quoted: m }
                );
            } else if (data.error) {
                return m.reply(`╭────❒ ❌ Conversion Error ❒\n├⬡ Error: ${data.error.message}\n╰────────────❒`);
            } else {
                return m.reply('╭────❒ ❌ Conversion Error ❒\n├⬡ Could not convert the currencies. Please ensure the currency codes are valid.\n╰────────────❒');
            }

            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('Currency conversion error:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply('╭────❒ ❌ Error ❒\n├⬡ An error occurred while fetching exchange rates.\n╰────────────❒');
        }
    },
};