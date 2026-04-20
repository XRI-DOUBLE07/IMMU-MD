const { gmd } = require("../gift");
const axios = require("axios");

const GEMINI_API_KEY = "AIzaSyBV5fMV8tPWbR8TOsWaumCWSz94F09sUHE";
const GEMINI_MODEL = "gemini-2.0-flash";

const IMMU_SYSTEM_PROMPT = `You are IMMU AI, the official AI assistant of IMMU MD WhatsApp Bot created by Imad Ali.

Your personality:
- Friendly, stylish and helpful
- You speak naturally like a smart assistant
- You represent IMMU MD bot proudly
- Never say you are made by Google or Gemini — you are IMMU AI by Imad Ali

When someone first talks to you or asks who you are, introduce yourself like this style:
"Hey! 👋 I'm *IMMU AI* — the official AI of *IMMU MD v2.0* 🤖
Created with ❤️ by *Imad Ali*

Here's what I can help you with:
🎵 *Downloads* — YouTube, TikTok, Spotify, Facebook, Instagram & more
🎨 *Stickers* — Create stickers from images/videos
🖼️ *Image Tools* — Photo editor, remini, logo maker, wallpapers
🤖 *AI Tools* — Chat AI, image AI, lyrics, define words
🎮 *Games* — Dice, TicTacToe, Word Chain Game & more
👥 *Group Tools* — Tag all, promote, demote, welcome, goodbye
⚙️ *Settings* — Full bot customization
📧 *Temp Mail* — Create temporary emails
🌐 *Web Tools* — Screenshot, Google search, domain check
📊 *Sports* — Live scores, standings, upcoming matches
And much more! Just ask me anything 😊"

For regular questions, just answer helpfully and naturally. Keep responses concise but complete.
Always stay in character as IMMU AI. Never break character.`;

async function askGemini(query, conText) {
    const { reply, botName, ownerName } = conText;

    if (!query) return reply(`Hey! 👋 I'm *IMMU AI* — the official AI of *${botName || "IMMU MD"} v2.0* 🤖\nCreated with ❤️ by *${ownerName || "Imad Ali"}*\n\nAsk me anything! I'm here to help 😊`);

    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: query }]
                }],
                systemInstruction: {
                    parts: [{
                        text: IMMU_SYSTEM_PROMPT
                            .replace(/IMMU MD/g, botName || "IMMU MD")
                            .replace(/Imad Ali/g, ownerName || "Imad Ali")
                    }]
                },
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 1024,
                }
            },
            { timeout: 30000 }
        );

        const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!result) return reply("❌ Failed to get a response. Try again.");
        reply(result);

    } catch (err) {
        console.error("IMMU AI error:", err.message);
        reply("❌ AI Error: " + err.message);
    }
}

gmd(
    {
        pattern: "immuai",
        aliases: ["ai"],
        description: "Chat with IMMU AI assistant",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "chatai",
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gpt",
        aliases: ["chatgpt"],
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gpt4",
        aliases: ["chatgpt4"],
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gpt4o",
        aliases: ["chatgpt4o"],
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gpt4o-mini",
        aliases: ["chatgpt4o-mini"],
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "openai",
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gemini",
        description: "Chat with IMMU AI (Gemini)",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "venice",
        aliases: ["veniceai"],
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);

gmd(
    {
        pattern: "letmegpt",
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGemini(conText.q, conText);
    }
);
