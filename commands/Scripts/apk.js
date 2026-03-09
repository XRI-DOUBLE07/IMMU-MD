const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const cacheFolder = path.resolve(__dirname, './cache');

if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
}

module.exports = {
    name: 'apk',
    desc: 'Searches for and attempts to download an APK from Aptoide.',
    aliases: ['appdl', 'downloadapkfile'],
    category: 'Utility',
    cooldown: 30,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ 📱 Usage 📱 ❒────\n' +
                '├⬡ Search and attempt to download an APK from Aptoide using: !apkdl [app name]\n' +
                '├⬡ Example: !apkdl WhatsApp\n' +
                '╰───────────────────'
            );
        }

        const query = args.join(' ');
        const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(query)}/limit=1`;

        try {
            const processingMsg = await m.reply(
                `╭────❒ 📥 Downloading APK 📥 ❒────\n` +
                `├⬡ Searching Aptoide for: ${query} and attempting download...\n` +
                `├⬡ This might take a while, please be patient.\n` +
                `╰───────────────────────────`
            );

            const response = await axios.get(apiUrl);
            const data = response.data;

            if (data.status === 'OK' && data.total > 0 && data.list.length > 0) {
                const app = data.list[0];
                const downloadUrl = app.file.url;
                const appName = app.name;

                try {
                    const apkResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
                    const apkBuffer = Buffer.from(apkResponse.data, 'binary');
                    const tempFilePath = path.join(cacheFolder, `${appName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.apk`);
                    await fs.writeFile(tempFilePath, apkBuffer);

                    await sock.sendMessage(
                        m.chat,
                        { document: { url: tempFilePath }, mimetype: 'application/vnd.android.package-archive', fileName: `${appName}.apk` },
                        { quoted: m }
                    );

                    await fs.unlink(tempFilePath);
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });

                } catch (downloadError) {
                    console.error('Error downloading APK:', downloadError);
                    await sock.sendMessage(m.chat, { delete: processingMsg.key });
                    return m.reply(
                        `╭────❒ ❌ Download Error ❌ ❒────\n` +
                        `├⬡ Failed to download the APK for ${appName}.\n` +
                        `├⬡ Please try again later or use the download link provided by the !apk command.\n` +
                        `╰───────────────────────────────`
                    );
                }

            } else {
                await sock.sendMessage(m.chat, { delete: processingMsg.key });
                return m.reply(
                    `╭────❒ ❌ No APK Found ❌ ❒────\n` +
                    `├⬡ No APK found for: ${query} on Aptoide.\n` +
                    `├⬡ Please try a different search term using the !apk command.\n` +
                    `╰───────────────────────────────`
                );
            }

        } catch (error) {
            console.error('APK search error:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❌ ❒────\n' +
                '├⬡ An error occurred while searching for the APK.\n' +
                '├⬡ Please try again later.\n' +
                '╰───────────────────'
            );
        }
    },
};