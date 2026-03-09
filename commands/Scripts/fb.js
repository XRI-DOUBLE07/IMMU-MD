const axios = require('axios');

module.exports = {
    name: 'fb',
    desc: 'Download media from various platforms',
    category: 'download',
    cooldown: 10,
    permission: 0,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return sock.sendMessage(m.chat, { 
                text: '❌ Please provide a URL!\nExample: .fb <fb link>' 
            });
        }

       
        const processingMsg = await sock.sendMessage(m.chat, { 
            text: '⏳ Processing your request...' 
        });

        try {
           
            const response = await axios.get(`http://46.247.108.38:6116/allLink?link=${encodeURIComponent(args[0])}`);
            const data = response.data;

            if (!data.success) {
                await sock.sendMessage(m.chat, { text: '❌ Failed to get download info!' });
                return await sock.sendMessage(m.chat, { delete: processingMsg.key });
            }

           
            await sock.sendMessage(m.chat, { 
                text: `📥 Downloading: ${data.video_title || 'Media'}\nPlatform: ${data.platform}\n\n⏳ Please wait...`,
                edit: processingMsg.key 
            });

         
            const media = await axios.get(data.download_url, { responseType: 'arraybuffer' });
            
            await sock.sendMessage(m.chat, {
                video: Buffer.from(media.data),
                caption: `Tittle: ${data.video_title || 'Media'}\nPlatform: ${data.platform}`
            });

           
            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('Download error:', error);
            await sock.sendMessage(m.chat, { text: '❌ Failed to download media!' });
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
        }
    }
};