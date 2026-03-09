const axios = require('axios');

const activeGroups = new Set();

const APIs = {
    primary: "https://dev-priyanshi.onrender.com/api/alldl?url=",
    backup: "http://46.247.108.38:6116/allLink?link="
};

function extractUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
}

async function downloadWithPrimaryApi(url) {
    try {
        const response = await axios.get(`${APIs.primary}${encodeURIComponent(url)}`);
        return response.data;
    } catch (error) {
        console.error('Primary API error:', error);
        throw error;
    }
}

async function downloadWithBackupApi(url) {
    try {
        const response = await axios.get(`${APIs.backup}${encodeURIComponent(url)}`);
        return response.data;
    } catch (error) {
        console.error('Backup API error:', error);
        throw error;
    }
}

module.exports = {
    name: 'alldl',
    desc: 'Download media from various platforms and toggle auto-download in groups',
    category: 'download',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return sock.sendMessage(m.chat, { 
                text: `📥 *AlldlDownloader*\n\nCommands:\n- !alldl <video url> - Download a specific video\n- !alldl on - Enable auto-download in this group\n- !alldl off - Disable auto-download in this group\n- !alldl status - Check if auto-download is enabled` 
            });
        }

        if (args[0].toLowerCase() === 'on') {
            activeGroups.add(m.chat);
            return sock.sendMessage(m.chat, { 
                text: '✅ Auto-download is now ON in this group. I will detect and download media links automatically.' 
            });
        }

        if (args[0].toLowerCase() === 'off') {
            activeGroups.delete(m.chat);
            return sock.sendMessage(m.chat, { 
                text: '❌ Auto-download is now OFF in this group.' 
            });
        }

        if (args[0].toLowerCase() === 'status') {
            const status = activeGroups.has(m.chat) ? 'ON' : 'OFF';
            return sock.sendMessage(m.chat, { 
                text: `🔍 Auto-download status: ${status}` 
            });
        }

        await processDownload(sock, m, args[0]);
    },

    handleMessage: async (sock, m) => {
        if (!activeGroups.has(m.chat)) return;

        const messageText = m.body || '';
        const urls = extractUrls(messageText);
        
        if (urls.length > 0) {
            await processDownload(sock, m, urls[0]);
        }
    }
};

async function processDownload(sock, m, url) {
    const processingMsg = await sock.sendMessage(m.chat, { 
        text: '⏳ Processing your request...' 
    });

    try {
        let data;
        try {
            data = await downloadWithPrimaryApi(url);
        } catch (error) {
            console.log('Primary API failed, trying backup API...');
            data = await downloadWithBackupApi(url);
        }

        if (!data || !data.success) {
            await sock.sendMessage(m.chat, { 
                text: '❌ Failed to get download info!',
                edit: processingMsg.key 
            });
            return;
        }

        await sock.sendMessage(m.chat, { 
            text: `📥 Downloading: ${data.video_title || data.title || 'Media'}\nPlatform: ${data.platform || 'Unknown'}\n\n⏳ Please wait...`,
            edit: processingMsg.key 
        });

        const downloadUrl = data.download_url || data.downloadUrl || data.url;
        
        if (!downloadUrl) {
            throw new Error('No download URL found in API response');
        }

        const media = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
        
        await sock.sendMessage(m.chat, {
            video: Buffer.from(media.data),
            caption: `Title: ${data.video_title || data.title || 'Media'}\nPlatform: ${data.platform || 'Unknown'}\n\nDownloaded with Alldl`
        });

        await sock.sendMessage(m.chat, { delete: processingMsg.key });

    } catch (error) {
        console.error('Download error:', error);
        await sock.sendMessage(m.chat, { 
            text: '❌ Failed to download media! The link might be unsupported or invalid.',
            edit: processingMsg.key 
        });
    }
}