const axios = require('axios');

module.exports = {
    name: 'country',
    desc: 'Retrieves information about a specified country.',
    aliases: ['countryinfo', 'lookupcountry'],
    category: 'Information',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide the name of a country to lookup.\n' +
                '├⬡ Usage: !country [country name]\n' +
                '╰────────────❒'
            );
        }

        const countryName = args[0];

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Fetching ❒\n' +
                '├⬡ Retrieving information for: ' + countryName + '\n' +
                '├⬡ Please wait a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/country-info?name=${encodeURIComponent(countryName)}`;
            const response = await axios.get(apiUrl);
            const countryDataArray = response.data;

            if (countryDataArray && countryDataArray.length > 0) {
                const countryData = countryDataArray[0];
                const { name, capital, region, subregion, population, area, currencies, languages, borders, flag, maps } = countryData;

                const currencyInfo = currencies ? Object.values(currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A';
                const languageInfo = languages ? Object.values(languages).join(', ') : 'N/A';
                const borderInfo = borders ? borders.join(', ') : 'N/A';
                const capitalInfo = capital ? capital.join(', ') : 'N/A';

                const message = `
╭────❒ 🌍 Country Information 🌍 ❒────
├⬡ Common Name: ${name.common}
├⬡ Official Name: ${name.official}
├⬡ Capital: ${capitalInfo}
├⬡ Region: ${region}
├⬡ Subregion: ${subregion}
├⬡ Population: ${population}
├⬡ Area: ${area} km²
├⬡ Currencies: ${currencyInfo}
├⬡ Languages: ${languageInfo}
├⬡ Borders: ${borderInfo}
├⬡ Flag: ${flag}
├⬡ Google Maps: ${maps.googleMaps}
├⬡ OpenStreetMap: ${maps.openStreetMaps}
╰───────────────────────────────
`;

                await sock.sendMessage(m.chat, { text: message }, { quoted: m });
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    '╭────❒ ❌ Not Found ❒\n' +
                    '├⬡ Could not find information for: ' + countryName + '\n' +
                    '├⬡ Please ensure the country name is spelled correctly.\n' +
                    '╰────────────❒'
                );
            }
        } catch (error) {
            console.error('Error fetching country information:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while fetching country data.\n' +
                '├⬡ Please try again later.\n' +
                '╰────────────❒'
            );
        }
    },
};