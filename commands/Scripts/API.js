const axios = require('axios');

module.exports = {
    name: 'api',
    desc: 'Tests a given API endpoint and returns the response.',
    aliases: ['apitest', 'checkapi'],
    category: 'Utility',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ⚙️ API Test ⚙️ ❒────\n' +
                '├⬡ Provide an API URL to test.\n' +
                '├⬡ Usage: !testapi [API URL]\n' +
                '╰───────────────────'
            );
        }

        const apiUrl = args[0];

        try {
            const processingMsg = await m.reply(
                `╭────❒ 📡 Testing API 📡 ❒────\n` +
                `├⬡ Testing URL: ${apiUrl}\n` +
                `├⬡ Please wait for the response...\n` +
                `╰─────────────────────`
            );

            const response = await axios.get(apiUrl);
            const responseData = JSON.stringify(response.data, null, 2);
            const statusCode = response.status;
            const statusText = response.statusText;

            const message = `
╭────❒ ✅ API Test Result ✅ ❒────
├⬡ URL: ${apiUrl}
├⬡ Status Code: ${statusCode}
├⬡ Status Text: ${statusText}
├⬡ Response Body:
${responseData.length > 1000 ? responseData.substring(0, 1000) + '... (truncated)' : responseData}
╰──────────────────────────
`;

            await sock.sendMessage(m.chat, { text: message }, { quoted: m });
            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('API test error:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            let errorMessage = 'An error occurred while testing the API.';
            if (error.response) {
                errorMessage += `\n├⬡ Status Code: ${error.response.status}`;
                errorMessage += `\n├⬡ Status Text: ${error.response.statusText}`;
                if (error.response.data) {
                    errorMessage += `\n├⬡ Response Body: ${JSON.stringify(error.response.data, null, 2).substring(0, 500)}...`;
                }
            } else if (error.request) {
                errorMessage += '\n├⬡ No response received from the server.';
            } else {
                errorMessage += `\n├⬡ Error setting up the request: ${error.message}`;
            }
            return m.reply(
                `╭────❒ ❌ API Test Failed ❌ ❒────\n` +
                `├⬡ URL: ${apiUrl}\n` +
                `${errorMessage}\n` +
                `╰────────────────────────`
            );
        }
    },
};