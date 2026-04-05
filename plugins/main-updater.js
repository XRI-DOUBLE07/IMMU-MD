const { cmd } = require("../command");
const { sleep } = require("../lib/functions");

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    desc: "Update and restart the bot system",
    category: "owner",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return reply("*❤️‍🔥ᴛʜɪs ɪs ᴀɴ ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ☼︎*");
        }

        // Initial message
        const updateMsg = await conn.sendMessage(from, {
            text: '𝗶𝗻𝗶𝘁𝗶𝗮𝘁𝗶𝗻𝗴 𝘀𝘆𝘀𝘁𝗲𝗺 𝘂𝗽𝗱𝗮𝘁𝗲...🚀'
        }, { quoted: mek });

        // Update steps with emojis
        const updateSteps = [
            "*🔍 𝗰𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝘀𝘆𝘀𝘁𝗲𝗺 𝘀𝘁𝗮𝘁𝘂𝘀...*",
            "*🛠️ 𝗽𝗿𝗲𝗽𝗮𝗿𝗶𝗻𝗴 𝘂𝗽𝗱𝗮𝘁𝗲 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀....*",
            "*📦 𝗳𝗶𝗻𝗮𝗹𝗶𝘇𝗶𝗻𝗴 𝗽𝗮𝗰𝗸𝗮𝗴𝗲𝘀....*",
            "*⚡ 𝗼𝗽𝘁𝗶𝗺𝗶𝘇𝗶𝗻𝗴 𝗽𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲....*",
            "*🔃 𝗜𝗠𝗠𝗨-𝗠𝗗 𝗥𝗘𝗦𝗧𝗔𝗥𝗧...*",
            "*♻️ 𝗿𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝘀𝗲𝗿𝘃𝗶𝗰𝗲𝘀...*"
        ];

        // Show each step with delay
        for (const step of updateSteps) {
            await sleep(1500);
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: updateMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: step,
                        },
                    },
                },
                {}
            );
        }

        // Final message before restart
        await conn.sendMessage(from, {
            text: '- *𝗜𝗠𝗠𝗨 𝗠𝗗  𝘂𝗽𝗱𝗮𝘁𝗲 𝗰𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱 𝗿𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴*'
        }, { quoted: mek });

        // Execute restart after a short delay
        await sleep(1000);
        require('child_process').exec("pm2 restart all");

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, {
            text: `*❌ Update Failed!*\n_Error:_ ${e.message}\n\n*Try manually:*\n\`\`\`pm2 restart all\`\`\``
        }, { quoted: mek });
    }
});
