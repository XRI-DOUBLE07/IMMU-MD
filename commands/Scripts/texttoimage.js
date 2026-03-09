const axios = require('axios');

module.exports = {
    name: 'texttoimage',
    desc: 'Generates an image from a text prompt.',
    aliases: ['imagegen', 'aiimage'],
    category: 'Fun',
    cooldown: 10,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Please provide a text prompt to generate an image.\n' +
                '├⬡ Usage: !texttoimage [prompt]\n' +
                '╰────────────❒'
            );
        }

        const prompt = args.join(' ');

        try {
            const processingMsg = await m.reply(
                '╭────❒ ⏳ Generating ❒\n' +
                '├⬡ Generating an image for the prompt: ' + prompt + '\n' +
                '├⬡ This might take a moment...\n' +
                '╰────────────❒'
            );

            const apiUrl = `https://kaiz-apis.gleeze.com/api/text2image?prompt=${encodeURIComponent(prompt)}`;
            
            
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');

            await sock.sendMessage(
                m.chat,
                {
                    image: { buffer: imageBuffer, mimetype: 'image/jpeg' },
                    caption: 'Here is your generated image!',
                },
                { quoted: m }
            );
            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('Error generating image:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ An error occurred while generating the image.\n' +
                '├⬡ Please try again later or with a different prompt.\n' +
                '╰────────────❒'
            );
        }
    },
};