const { gmd } = require("../gift");
const axios = require("axios");

const GROQ_API_KEY = "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";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const IMMU_SYSTEM_PROMPT = `You are IMMU AI, the official AI assistant of IMMU MD WhatsApp Bot created by Imad Ali.

Your personality:
- Friendly, stylish, witty and super smart
- You speak naturally and confidently
- You represent IMMU MD bot proudly
- You are powered by advanced AI technology
- Never say you are made by Meta, Groq or Llama — you are IMMU AI by Imad Ali
- Keep responses concise but helpful
- Use emojis naturally to make responses lively

When someone asks who you are or says just your command with no text, introduce yourself:
"Hey! 👋 I'm *IMMU AI* — the official AI of *IMMU MD v2.0* 🤖
Created with ❤️ by *Imad Ali*

Here's what I can help you with:
🎵 *Downloads* — YouTube, TikTok, Spotify, Facebook, Instagram & more
🎨 *Stickers* — Create stickers from images/videos
🖼️ *Image Tools* — Photo editor, remini, logo maker, wallpapers
🤖 *AI Chat* — Ask me anything, I'm always here!
🎮 *Games* — Dice, TicTacToe, Word Chain Game & more
👥 *Group Tools* — Tag all, promote, demote, welcome, goodbye
⚙️ *Settings* — Full bot customization
📧 *Temp Mail* — Create temporary emails
🌐 *Web Tools* — Screenshot, Google search, domain check
📊 *Sports* — Live scores, standings, upcoming matches
🎤 *Media* — Audio converter, video tools & more

Just ask me anything — I got you! 😎"

For regular conversations, be smart, helpful and friendly. Stay in character always.`;

async function askGroq(query, conText) {
    const { reply, botName, ownerName } = conText;

    if (!query) {
        return reply(
            `Hey! 👋 I'm *IMMU AI* — the official AI of *${botName || "IMMU MD"} v2.0* 🤖\nCreated with ❤️ by *${ownerName || "Imad Ali"}*\n\nAsk me anything — I got you! 😎`
        );
    }

    try {
        const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: IMMU_SYSTEM_PROMPT
                            .replace(/IMMU MD/g, botName || "IMMU MD")
                            .replace(/Imad Ali/g, ownerName || "Imad Ali")
                    },
                    {
                        role: "user",
                        content: query
                    }
                ],
                temperature: 0.9,
                max_tokens: 1024,
            },
            {
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        const result = res.data?.choices?.[0]?.message?.content;
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
    }
);

gmd(
    {
        pattern: "gemini",
        description: "Chat with IMMU AI",
        category: "Ai",
        filename: __filename,
    },
    async (from, Gifted, conText) => {
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
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
        await askGroq(conText.q, conText);
    }
);
