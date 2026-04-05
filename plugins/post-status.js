const { cmd } = require("../command");

cmd({
  pattern: "post",
  alias: ["status", "story"],
  desc: "Post media to WhatsApp status",
  category: "utility",
  filename: __filename
}, async (client, message, match, { isCreator }) => {
  if (!isCreator) return await message.reply("*📛 Owner only command*");

  const quoted = message.quoted || message;
  
  // 1. Handle Text Status
  if (quoted.text && !quoted.hasMedia) {
    try {
      await client.setStatus(quoted.text);
      return await message.reply("✅ Text status updated");
    } catch (e) {
      return await message.reply("❌ Failed to update text status");
    }
  }

  // 2. Handle Media Status
  if (quoted.hasMedia) {
    try {
      const media = await quoted.download();
      const caption = quoted.caption || "";

      // For WhatsApp Business API
      await client.sendMessage("status@broadcast", { 
        [quoted.type.replace("Message", "")]: media,
        caption: caption
      });

      // Alternative method
      await client.setProfilePicture(media); // For profile picture as fallback
      
      return await message.reply("✅ Media posted to status");
    } catch (error) {
      return await message.reply(`❌ Error: ${error.message}`);
    }
  }

  return await message.reply("⚠ Please reply to media or text");
});
