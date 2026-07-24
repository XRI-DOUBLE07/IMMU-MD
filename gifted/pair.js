const { gmd } = require("../gift");
const axios = require("axios");

// The pairing site. Override with PAIR_SITE in .env if it ever moves.
const PAIR_SITE = (process.env.PAIR_SITE || "https://link.immumdbot.com").replace(/\/+$/, "");

gmd(
  {
    pattern: "pair",
    aliases: ["paircode", "getpair", "session"],
    react: "🔐",
    category: "general",
    description: "Get pair code for IMMU MD bot deployment",
  },
  async (from, Gifted, conText) => {
    const { q, react, reply, pushName, botName, botFooter, botPrefix } = conText;

    if (!q) {
      await react("❌");
      return reply(
        `❌ *Number missing!*\n\n*Usage:*\n${botPrefix}pair 923001234567\n\n📌 Number must include country code (no + or spaces)`
      );
    }

    // Keep only digits — strips +, spaces, dashes and the invisible
    // LRM/RLM characters some phones insert.
    const phoneNumber = String(q).replace(/[^0-9]/g, "");

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      await react("❌");
      return reply(
        `❌ *Invalid number format!*\n\nProvide a valid number with country code.\n\n_Example:_ ${botPrefix}pair 923001234567`
      );
    }

    try {
      await react("⏳");
      await reply(
        `🔐 *Generating pair code for:* +${phoneNumber}\n\n_Please wait 5-10 seconds..._`
      );

      const { data } = await axios.get(
        `${PAIR_SITE}/code?number=${phoneNumber}`,
        { timeout: 60000 }
      );

      const pairCode = data?.code;
      if (!pairCode) {
        await react("❌");
        return reply(
          `❌ *Failed to generate pair code!*\n\n${data?.error || "Please try again."}\n\nOr open the site:\n${PAIR_SITE}`
        );
      }

      // Plain text, no interactive buttons: buttons are what triggered
      // WhatsApp's automation flags before, and plain messages always deliver.
      // The code sits in its own code block so it can be copied with one tap.
      const messageText =
        `╭━━〔 *🔐 IMMU MD PAIR* 〕━━┈⊷\n` +
        `┃\n` +
        `┃ ✨ *Hello ${pushName}!*\n` +
        `┃\n` +
        `┃ 📱 *Number:* +${phoneNumber}\n` +
        `┃ ⏰ *Valid for:* 60 seconds\n` +
        `┃\n` +
        `╰━━━━━━━━━━━━━━━━━━━━┈⊷\n\n` +
        `*Your pair code:*\n` +
        "```" + pairCode + "```" + `\n\n` +
        `*How to link:*\n` +
        `1. Open WhatsApp on +${phoneNumber}\n` +
        `2. Go to *Linked devices*\n` +
        `3. Tap *Link a device* → *Link with phone number*\n` +
        `4. Enter the code above\n\n` +
        `_Enter it now — the code expires in a minute._\n` +
        `🌐 ${PAIR_SITE}\n\n` +
        `> *${botFooter || botName}*`;

      await reply(messageText);

      // Also deliver it to the number being paired, so the person who has
      // to type the code gets it on the phone they're typing it into.
      const targetJid = `${phoneNumber}@s.whatsapp.net`;
      if (targetJid !== from) {
        try {
          await Gifted.sendMessage(targetJid, { text: messageText });
        } catch (e) {
          console.log("[PAIR] could not DM the target number:", e.message);
        }
      }

      await react("✅");
    } catch (error) {
      console.error("[PAIR ERROR]", error.message);
      await react("❌");

      let errorMsg;
      const status = error.response?.status;
      if (status === 429) {
        errorMsg = "⚠️ *Too many requests!* Try again in a few seconds.";
      } else if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        errorMsg = "⚠️ *Request timed out!* The pair site is slow right now.";
      } else if (status === 400) {
        errorMsg = `⚠️ *Invalid number!* ${error.response.data?.error || "Check the number format."}`;
      } else if (status === 503) {
        errorMsg = "⚠️ *Service unavailable!* The pair site is down, try again later.";
      } else {
        errorMsg = `❌ *Error:* ${error.message}`;
      }

      return reply(
        `${errorMsg}\n\nYou can pair directly on the site instead:\n${PAIR_SITE}\n\n> *${botFooter || botName}*`
      );
    }
  }
);
