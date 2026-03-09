const axios = require('axios');

module.exports = {
    name: 'ip',
    desc: 'Retrieves information about a given IP address.',
    aliases: ['ipinfo', 'lookupip'],
    category: 'Information',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide an IP address to lookup.\n' +
                '├⬡ Usage: !ip [IP address]\n' +
                '╰────────────❒'
            );
        }

        const ipAddress = args[0];

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Fetching ❒\n' +
                '├⬡ Retrieving information for IP: ' + ipAddress + '\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/ip-info?ip=${encodeURIComponent(ipAddress)}`;
            const response = await axios.get(apiUrl);
            const ipData = response.data;

            if (ipData && ipData.success && ipData.data) {
                const { country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as, query } = ipData.data;

                const message = `
╭────❒ 🌐 IP Information 🌐 ❒────
├⬡ IP Address: ${query}
├⬡ Country: ${country} (${countryCode})
├⬡ Region: ${regionName} (${region})
├⬡ City: ${city}
├⬡ ZIP Code: ${zip}
├⬡ Latitude: ${lat}
├⬡ Longitude: ${lon}
├⬡ Timezone: ${timezone}
├⬡ ISP: ${isp}
├⬡ Organization: ${org}
├⬡ AS Number: ${as}
╰───────────────────────────
`;

                await sock.sendMessage(m.chat, { text: message }, { quoted: m });
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❌ Not Found ❒\n' +
                    '├⬡ Could not retrieve information for the IP address: ' + ipAddress + '\n' +
                    '├⬡ Please ensure the IP address is valid.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error fetching IP information:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while fetching IP information.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};