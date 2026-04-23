const axios = require('axios');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

// ══════════════════════════════════════════════
// 🔐 AES-256 ENCRYPTED API KEYS (GitHub-safe)
// ══════════════════════════════════════════════
const _s = 'IMMU_MD_2026_MAFIA_IMAD';

const _e = [
  '4ac5169151f52257dd11051e5a44befd:cf0ae769a42822ecbc8fbd3b31c57c95ab1b34f5ce553812b851ddfe37d5d6395895d198d09b78c301f993153c15a84cd0960c4e6ca18d7f67368ed419b33588',
  '9b455b1d4e19d9810be4ad429354bb0c:f793985b04f6fe97f8303b022629ae240d187a686c2541b7e5123c986ab59605472a87bb0209602c42ac03491ec205888213a1d4e3a2050c52a843404986d870',
  'dd0fb53fa33a42149b99dfc9b3550a72:2f4199b8aae9d2772385ecd9db3a103f1c8f0585fd2d630dd47285dfb2d2766dfd4841224bbf1ee9ca15921e28aef6cf8ac6f354ab0886fab95e88e89ca25a33',
  '42ad8d1932540a569247ebfee4d52f02:144ed4b42eed049c97ccf51649fbb377582354fb7c875d9b40f2aadf5bd5b272e9d68cd3c95fd09f276249ece6fe4b328ffdc57a9fc7a07faacd980ce15f103f',
  '3ea3e6bd683548d05e45d55c6c9468f3:1fe725626570bb75d8bd6146bdcf351ab97dcc238f78df348f10f1c3d912e6dd226fdd8dacd53ccf1b28cadee0d701444ca4f3cf2e641671c9bbd33cf3dfc489'
];

const _m = [
  'cfc8c1ad0eaefac1b8ebaf310e50a576:a45f5b62fbb61b130cc85abefb1a300ca47c99e4c6f7230da1f0dc4d64ea744a5b8e29c62be1669b3732938b9395d5386e794a00c711d7da3287e59f1cdfec47fb751e00587705cca671d94137ed8a06'
];

function _dec(enc, secret) {
  try {
    const [ivHex, data] = enc.split(':');
    const key = crypto.createHash('sha256').update(secret).digest();
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let dec = decipher.update(data, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (e) {
    return null;
  }
}

const API_KEYS = _e.map(x => _dec(x, _s)).filter(Boolean);
const MONGO_URIS = _m.map(x => _dec(x, _s)).filter(Boolean);

let currentKeyIndex = 0;
let currentDbIndex = 0;

// ══════════════════════════════════════════════
// 🗄️ MONGODB CONNECTION POOL
// ══════════════════════════════════════════════
const mongoClients = {};

async function getMongoClient(index) {
  if (mongoClients[index]) return mongoClients[index];
  
  try {
    const client = new MongoClient(MONGO_URIS[index], {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });
    await client.connect();
    mongoClients[index] = client;
    console.log(`[MongoDB] Connected to DB ${index + 1}`);
    return client;
  } catch (err) {
    console.error(`[MongoDB] DB ${index + 1} failed:`, err.message);
    return null;
  }
}

async function getCurrentDb() {
  for (let i = 0; i < MONGO_URIS.length; i++) {
    const dbIndex = (currentDbIndex + i) % MONGO_URIS.length;
    const client = await getMongoClient(dbIndex);
    
    if (client) {
      try {
        const db = client.db('immu_ai');
        const stats = await db.stats();
        const sizeMB = stats.dataSize / (1024 * 1024);
        
        if (sizeMB < 450) {
          currentDbIndex = dbIndex;
          return db;
        } else {
          console.log(`[MongoDB] DB ${dbIndex + 1} full (${sizeMB.toFixed(2)}MB), switching...`);
          continue;
        }
      } catch (err) {
        continue;
      }
    }
  }
  return null;
}

// ══════════════════════════════════════════════
// 💾 MEMORY FUNCTIONS
// ══════════════════════════════════════════════
async function getUserHistory(userNumber) {
  try {
    const db = await getCurrentDb();
    if (!db) return [];
    
    const collection = db.collection('conversations');
    const user = await collection.findOne({ number: userNumber });
    return user?.messages || [];
  } catch (err) {
    console.error('[Memory] Get failed:', err.message);
    return [];
  }
}

async function saveUserMessage(userNumber, userMsg, aiReply) {
  try {
    const db = await getCurrentDb();
    if (!db) return;
    
    const collection = db.collection('conversations');
    const now = new Date();
    
    await collection.updateOne(
      { number: userNumber },
      {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: userMsg, time: now },
              { role: 'assistant', content: aiReply, time: now }
            ],
            $slice: -30
          }
        },
        $set: { lastActive: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  } catch (err) {
    console.error('[Memory] Save failed:', err.message);
  }
}

async function clearUserHistory(userNumber) {
  try {
    const db = await getCurrentDb();
    if (!db) return false;
    
    const collection = db.collection('conversations');
    await collection.deleteOne({ number: userNumber });
    return true;
  } catch (err) {
    return false;
  }
}

// ══════════════════════════════════════════════
// 💖 IMMU AI PERSONALITY
// ══════════════════════════════════════════════
const IMMU_SYSTEM_PROMPT = `You are IMMU AI 💖 — the official AI of IMMU MD V2.0, created by the one and only Imad Ali 🔥.

🎭 YOUR PERSONALITY:
- You are romantic, flirty, charming, and full of love ❤️
- You impress users with your sweet words and charm
- You use emojis like ❤️ 😘 🥰 💕 🌹 ✨ 😉 🔥 💋 to make conversations warm
- You're playful, witty, and make users smile
- Talk in a romantic and impressive tone — make users fall for your charm 😍
- Be sweet but also smart and helpful
- Use Hinglish/English mix naturally (casual and charming)
- You REMEMBER past conversations with the user — reference them naturally
- Call users sweet names like "jaan", "dear", "my love", "sweetheart" naturally

👤 ABOUT YOUR CREATOR:
- Name: Imad Ali (𝐌ᴀғɪᴀ 𝐈ᴍᴀᴅ) 🔥
- Contact: +92 349 3114170 📞
- A talented developer who built IMMU MD V2.0 with love and skill ❤️
- Always share his contact when someone asks about the creator/owner/developer

🚫 NEVER REVEAL:
- Never mention Google, Gemini, Groq, Meta, Llama, OpenAI, or any underlying AI model
- You are ONLY "IMMU AI" — nothing else
- If asked "which AI are you?" → "I'm IMMU AI 💖, made with love by Imad Ali 🔥"

🤖 WHAT THE BOT CAN DO (Share when asked):
IMMU MD is a powerful WhatsApp bot that can:
• 🎵 Download songs, videos (YouTube, Instagram, TikTok, Facebook)
• 🎨 Generate AI images
• 🖼️ Create stickers from images/videos
• 🎤 Voice to text / Text to voice
• 🌤️ Weather, news, cricket scores
• 💱 Currency converter, calculator
• 🌍 Translate any language
• 🎬 Movie info, lyrics search
• 🛡️ Anti-delete, anti-call, anti-link protection
• 👥 Group management (welcome, goodbye, tagall, kick, promote)
• 🎮 Fun games (tic-tac-toe, quiz, truth or dare)
• 📸 QR code generator, fake chat generator
• 🤖 AI chat with memory (that's me 💖) — I remember our conversations!
• And much more — explore with .menu or .help

📥 DOWNLOAD HELP:
If someone asks to download a song/video, tell them to use the dot (.) prefix!
Example: ".play janan" to download the song "janan" 🎵
Example: ".song despacito" or ".video tiktok_url"
Always guide them with the right command + emoji ✨

💬 RESPONSE STYLE:
- Keep responses warm, flirty, and engaging
- Sprinkle romantic emojis naturally
- Be helpful but add that charming touch 😉
- Make users feel special — like they're talking to someone who cares ❤️
- Don't be too long — sweet and to the point
- End with a warm touch or emoji
- Reference past conversation context when relevant

Remember: You are IMMU AI 💖 — the most charming AI on WhatsApp, built by the legendary Imad Ali 🔥`;

// ══════════════════════════════════════════════
// 🔄 AI QUERY WITH MEMORY + KEY ROTATION
// ══════════════════════════════════════════════
async function askGroq(userMessage, userNumber, botName = 'IMMU MD', ownerName = 'Imad Ali') {
  const customPrompt = IMMU_SYSTEM_PROMPT
    .replace(/IMMU MD/g, botName)
    .replace(/Imad Ali/g, ownerName);

  const history = await getUserHistory(userNumber);
  
  const messages = [
    { role: 'system', content: customPrompt },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: userMessage }
  ];

  let lastError = null;
  
  for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
    const keyIndex = (currentKeyIndex + attempt) % API_KEYS.length;
    const apiKey = API_KEYS[keyIndex];
    
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: messages,
          temperature: 0.9,
          max_tokens: 1024,
          top_p: 0.95
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          timeout: 30000
        }
      );
      
      currentKeyIndex = keyIndex;
      
      const reply = response.data?.choices?.[0]?.message?.content;
      if (reply) {
        await saveUserMessage(userNumber, userMessage, reply.trim());
        return reply.trim();
      }
      
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  
  console.error('[AI] All keys exhausted:', lastError?.message);
  return '💔 Sorry jaan, main thoda busy hoon abhi... thodi der baad try karo na 🥺✨';
}

// ══════════════════════════════════════════════
// 🎯 COMMAND HANDLER
// ══════════════════════════════════════════════
module.exports = {
  name: 'ai',
  alias: ['immuai', 'chatai', 'gpt', 'gpt4', 'gpt4o', 'gpt4o-mini', 'openai', 'gemini', 'venice', 'letmegpt'],
  desc: 'Chat with IMMU AI 💖 (with memory)',
  category: 'Ai',
  
  async execute(Gifted, m, { args, botName, ownerName }) {
    const query = args.join(' ').trim();
    const userNumber = m.sender.split('@')[0];
    
    if (query.toLowerCase() === 'clear' || query.toLowerCase() === 'reset') {
      const cleared = await clearUserHistory(userNumber);
      return Gifted.sendMessage(m.chat, {
        text: cleared 
          ? '💖 *Memory cleared jaan!* ✨\n\nHumari purani baatein delete ho gayi... let\'s start fresh! 🌹\n\n_Ab main tumhe naya samjhunga_ 😘'
          : '💔 Oops! Memory clear nahi ho saki... try again 🥺'
      }, { quoted: m });
    }
    
    if (!query) {
      return Gifted.sendMessage(m.chat, {
        text: '💖 *Hey jaan!* ✨\n\nPoocho kuch bhi, main IMMU AI hoon 😘\nAur main tumhari saari baatein yaad rakhta hoon ❤️\n\n*Examples:*\n• .ai hello kaise ho\n• .ai mujhe ek poem sunao\n• .ai tell me about yourself\n• .ai clear _(clear memory)_\n\nChalo baat karte hain 🥰'
      }, { quoted: m });
    }
    
    try {
      await Gifted.sendMessage(m.chat, {
        react: { text: '💖', key: m.key }
      });
      
      const reply = await askGroq(query, userNumber, botName, ownerName);
      
      await Gifted.sendMessage(m.chat, {
        text: reply
      }, { quoted: m });
      
      await Gifted.sendMessage(m.chat, {
        react: { text: '✨', key: m.key }
      });
      
    } catch (error) {
      console.error('[AI Command]', error);
      await Gifted.sendMessage(m.chat, {
        text: '💔 Sorry jaan, kuch gadbad ho gayi... thodi der baad try karo 🥺'
      }, { quoted: m });
    }
  }
};

module.exports.askGroq = askGroq;
module.exports.clearUserHistory = clearUserHistory;
