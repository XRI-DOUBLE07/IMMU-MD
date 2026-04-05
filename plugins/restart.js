const { cmd } = require("../command");
const { sleep } = require("../lib/functions");

cmd({
    pattern: "restart",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, isCreator }) => {
    try {
        if (!isCreator) return reply("Only the bot owner can use this command.");
        
        const msg = await reply("♻️ *Restarting bot...*");
        await sleep(2000);
        
        // Heroku automatically restarts process on exit
        process.exit(1);
        
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});
