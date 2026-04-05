const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// Path config
const configPath = path.join(__dirname, '../data/autoStatus.json');

// Create file if not exists
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({
        enabled: false,
        reactOn: false
    }));
}

// Read config
function getConfig() {
    return JSON.parse(fs.readFileSync(configPath));
}

// Save config
function saveConfig(data) {
    fs.writeFileSync(configPath, JSON.stringify(data));
}

// Command
cmd({
    pattern: "autostatus",
    desc: "Auto status settings",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, reply, args, isCreator }) => {

    if (!isCreator) return reply("❌ This command is only for owner");

    let config = getConfig();

    // Show status
    if (!args[0]) {
        return reply(
`🔄 *Auto Status Settings*

📱 Auto View: ${config.enabled ? '✅ ON' : '❌ OFF'}
💫 Reactions: ${config.reactOn ? '✅ ON' : '❌ OFF'}

Commands:
.autostatus on
.autostatus off
.autostatus react on
.autostatus react off`
        );
    }

    const command = args[0].toLowerCase();

    if (command === "on") {
        config.enabled = true;
        saveConfig(config);
        return reply("✅ Auto status view enabled");
    }

    if (command === "off") {
        config.enabled = false;
        saveConfig(config);
        return reply("❌ Auto status view disabled");
    }

    if (command === "react") {
        if (!args[1]) return reply("Use: .autostatus react on/off");

        if (args[1] === "on") {
            config.reactOn = true;
            saveConfig(config);
            return reply("💫 Reactions enabled");
        }

        if (args[1] === "off") {
            config.reactOn = false;
            saveConfig(config);
            return reply("❌ Reactions disabled");
        }
    }

    reply("❌ Invalid command");
});


// ===== STATUS HANDLER ===== //

async function handleStatusUpdate(conn, status) {
    try {
        const config = getConfig();
        if (!config.enabled) return;

        // delay
        await new Promise(r => setTimeout(r, 1000));

        let key;

        if (status.messages && status.messages[0]) {
            key = status.messages[0].key;
        } else if (status.key) {
            key = status.key;
        } else if (status.reaction) {
            key = status.reaction.key;
        }

        if (!key || key.remoteJid !== 'status@broadcast') return;

        // seen
        await conn.readMessages([key]);

        // react
        if (config.reactOn) {
            await conn.relayMessage(
                'status@broadcast',
                {
                    reactionMessage: {
                        key: {
                            remoteJid: 'status@broadcast',
                            id: key.id,
                            participant: key.participant || key.remoteJid,
                            fromMe: false
                        },
                        text: '💚'
                    }
                },
                {
                    messageId: key.id,
                    statusJidList: [key.remoteJid]
                }
            );
        }

    } catch (e) {
        console.error("AutoStatus Error:", e.message);
    }
}

// export handler
module.exports = {
    handleStatusUpdate
};
