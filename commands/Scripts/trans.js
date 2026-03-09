const axios = require('axios');

const translate = async (text, targetLang = 'en') => {
    try {
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        if (response.data && response.data[0] && response.data[0][0]) {
            return response.data[0][0][0];
        } else {
            return 'Translation failed.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation service error.';
    }
};

module.exports = {
    name: 'translate',
    desc: 'Translates replied text to the specified language (default: English).',
    aliases: ['trans'],
    category: 'Utility',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        const quoted = m.quoted ? m.quoted : null;
        if (!quoted || !quoted.msg.conversation) {
            return m.reply(
                '╭────❒ 🌐 Translate 🌐 ❒────\n' +
                '├⬡ Reply to a text message to translate it.\n' +
                '├⬡ Usage: !translate [language code (optional)]\n' +
                '├⬡ Example: !translate es (translates to Spanish)\n' +
                '├⬡ Default: Translates to English.\n' +
                '╰───────────────────'
            );
        }

        const textToTranslate = quoted.msg.conversation;
        const targetLanguage = args[0] ? args[0] : 'en';

        try {
            const processingMsg = await m.reply(
                `╭────❒ 🌐 Translating 🌐 ❒────\n` +
                `├⬡ Translating to: ${targetLanguage.toUpperCase()}\n` +
                `├⬡ Please wait a moment...\n` +
                `╰───────────────────`
            );

            const translatedText = await translate(textToTranslate, targetLanguage);

            await sock.sendMessage(
                m.chat,
                { text: `🌐 *Translation (${targetLanguage.toUpperCase()}):*\n\n${translatedText}` },
                { quoted: m }
            );

            await sock.sendMessage(m.chat, { delete: processingMsg.key });

        } catch (error) {
            console.error('Translation command error:', error);
            await sock.sendMessage(m.chat, { delete: processingMsg.key });
            return m.reply('❌ Failed to translate the text.');
        }
    },
};