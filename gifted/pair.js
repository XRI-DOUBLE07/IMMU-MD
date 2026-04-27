const { gmd } = require("../gift");
const axios = require("axios");
const { sendButtons } = require("gifted-btns");

gmd(
  {
    pattern: "pair",
    aliases: ["paircode", "getpair", "session"],
    react: "🔐",
    category: "general",
    description: "Get pair code for IMMU MD bot deployment",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      q,
      react,
      reply,
      pushName,
      botPic,
      botName,
      botFooter,
      botPrefix,
    } = conText;

    if (!q) {
      await react("❌");
      return reply(
        `❌ *Number missing!*\n\n*Usage:*\n${botPrefix}pair 923001234567\n\n_Example:_ ${botPrefix}pair 923001234567\n\n📌 Number must include country code (no + or spaces)`
      );
    }

    // Clean number — remove +, spaces, dashes
    let phoneNumber = q.replace(/[\s\-\+]/g, "").trim();

    // Validate
    if (!/^\d{10,15}$/.test(phoneNumber)) {
      await react("❌");
      return reply(
        `❌ *Invalid number format!*\n\nProvide a valid number with country code.\n\n_Example:_ ${botPrefix}pair 923001234567`
      );
    }

    try {
      await react("⏳");
      await reply(`🔐 *Generating pair code for:* +${phoneNumber}\n\n_Please wait 5-10 seconds..._`);

      // Request pair code from pair site
      const pairApi = `https://pair-immu-md-be3e092ff283.herokuapp.com/pair?number=${phoneNumber}`;
      const response = await axios.get(pairApi, { timeout: 60000 });

      const data = response.data;
      const pairCode = data?.code;

      if (!pairCode || !data?.success) {
        await react("❌");
        return reply(
          `❌ *Failed to generate pair code!*\n\n${data?.error || "Please try again."}\n\nOr visit:\nhttps://pair-immu-md-be3e092ff283.herokuapp.com/`
        );
      }

      const messageText = `╭━━〔 *🔐 IMMU MD PAIR* 〕━━┈⊷
┃ 
┃ ✨ *Hello _${pushName}_!* 
┃ 
┃ 📱 *Number:* +${phoneNumber}
┃ 🔐 *Pair Code:* ${pairCode}
┃ 
┃ ⏰ *Valid for:* 60 seconds
┃ 
╰━━━━━━━━━━━━━━━━━━━━┈⊷


_Powered by ${botName}_`;

      await sendButtons(Gifted, from, {
        title: "🔐 Pair Code Generated",
        text: messageText,
        footer: `> *${botFooter}*`,
        image: { url: botPic },
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Pair Code",
              copy_code: pairCode,
            }),
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🚀 Deploy Bot FREE",
              url: "https://immumdbot.com/deploy.html",
            }),
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: " 🌐 Official Channel",
              url: "https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42",
            }),
          },
        ],
      });

      await react("✅");
    } catch (error) {
      console.error("[PAIR ERROR]", error.message);
      await react("❌");
      
      let errorMsg;
      if (error.response?.status === 429) {
        errorMsg = "⚠️ *Too many requests!* Please try again in a few seconds.";
      } else if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        errorMsg = "⚠️ *Request timeout!* Pair site is slow, please try again.";
      } else if (error.response?.status === 400) {
        errorMsg = `⚠️ *Invalid number!* ${error.response.data?.code || "Check the number format."}`;
      } else if (error.response?.status === 503) {
        errorMsg = "⚠️ *Service unavailable!* Pair site is down, try again later.";
      } else {
        errorMsg = `❌ *Error:* ${error.message}`;
      }
      
      await sendButtons(Gifted, from, {
        title: "❌ Failed to Generate Code",
        text: `${errorMsg}\n\nYou can also visit the pair site directly:`,
        footer: `> *${botFooter}*`,
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "📱 Visit Pair Site",
              url: "https://pair-immu-md-be3e092ff283.herokuapp.com/",
            }),
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🚀 Deploy Bot FREE",
              url: "https://immumdbot.com/deploy",
            }),
          },
        ],
      });
    }
  }
);
