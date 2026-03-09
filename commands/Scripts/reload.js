const fs = require('fs');
const path = require('path');

const uninstallFolder = path.resolve(__dirname, '../uninstall');

if (!fs.existsSync(uninstallFolder)) {
    fs.mkdirSync(uninstallFolder);
}

global.cc.reloadCommand = function (commandName) {
    try {
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        const reloadedCommand = require(`../commands/${commandName}.js`);
        global.commands.set(reloadedCommand.name, reloadedCommand);
        return `✅ | "${commandName}" Prime has reloaded the command protocols.`;
    } catch (error) {
        return `Failed to reload ${commandName}: ${error.message}`;
    }
};

global.cc.reloadAll = function () {
    const commandFiles = fs.readdirSync(path.resolve(__dirname, '../commands')).filter(file => file.endsWith('.js'));
    let successCount = 0;
    let failCount = 0;
    let result = [];

    for (const file of commandFiles) {
        const commandPath = path.resolve(__dirname, `../commands/${file}`);
        try {
            delete require.cache[require.resolve(commandPath)];
            const reloadedCommand = require(commandPath);
            global.commands.set(reloadedCommand.name, reloadedCommand);
            successCount++;
            result.push(`${file} reloaded successfully.`);
        } catch (error) {
            failCount++;
            result.push(`Failed to reload ${file}: ${error.message}`);
        }
    }

    return `${successCount} Commands Reloaded Successfully\n${failCount} Failed to Reload\n${result.join('\n')}`;
};

module.exports = {
    name: 'cmd',
    description: 'Reload, manage, and install commands',
    permission: 2,
    cooldowns: 5,
    dmUser: true,
    run: async ({ sock, m, args }) => {
        const command = args[0]?.toLowerCase();

        if (command === 'reload') {
            const commandName = args[1]?.toLowerCase();
            if (commandName) {
                const message = global.cc.reloadCommand(commandName);
                await sock.sendMessage(m.key.remoteJid, { text: message });
            } else {
                await sock.sendMessage(m.key.remoteJid, { text: 'Please specify a command to reload.' });
            }
        } else if (command === 'reloadall') {
            const message = global.cc.reloadAll();
            await sock.sendMessage(m.key.remoteJid, { text: message });
        } else if (command === 'cancel') {
            const commandName = args[1]?.toLowerCase();
            if (commandName) {
                try {
                    const commandPath = path.resolve(__dirname, `../commands/${commandName}.js`);
                    if (fs.existsSync(commandPath)) {
                        const uninstallPath = path.resolve(uninstallFolder, `${commandName}.js`);
                        fs.renameSync(commandPath, uninstallPath);
                        await sock.sendMessage(m.key.remoteJid, { text: `${commandName} moved to uninstall folder.` });
                    } else {
                        await sock.sendMessage(m.key.remoteJid, { text: `❌|Command ${commandName} does not exist.` });
                    }
                } catch (error) {
                    await sock.sendMessage(m.key.remoteJid, { text: `Failed to cancel ${commandName}: ${error.message}` });
                }
            } else {
                await sock.sendMessage(m.key.remoteJid, { text: 'Please specify a command to cancel.' });
            }
        } else if (command === 'share') {
            const commandName = args[1]?.toLowerCase();
            if (commandName) {
                try {
                    const commandPath = path.resolve(__dirname, `../commands/${commandName}.js`);
                    if (fs.existsSync(commandPath)) {
                        const code = fs.readFileSync(commandPath, 'utf-8');
                        await sock.sendMessage(m.key.remoteJid, { text: `Here is the code for //Frank-dev ${commandName}:\n\n${code}`});
                    } else {
                        await sock.sendMessage(m.key.remoteJid, { text: `Command ${commandName} does not exist.` });
                    }
                } catch (error) {
                    await sock.sendMessage(m.key.remoteJid, { text: `Failed to fetch the code for ${commandName}: ${error.message}` });
                }
            } else {
                await sock.sendMessage(m.key.remoteJid, { text: 'Please specify a command to share.' });
            }
        } else if (command === 'install') {
            const commandName = args[1]?.toLowerCase();
            const commandCode = args.slice(2).join(' ');
            if (commandName && commandCode) {
                await sock.sendMessage(m.key.remoteJid, { text: `Installing command ${commandName}...` });

                try {
                    const commandPath = path.resolve(__dirname, `../commands/${commandName}.js`);
                    fs.writeFileSync(commandPath, commandCode);
                    setTimeout(async () => {
                        const message = `✅|Successfully Installed ${commandName}`;
                        await sock.sendMessage(m.key.remoteJid, { text: message });
                    }, 7000); 
                } catch (error) {
                    await sock.sendMessage(m.key.remoteJid, { text: `Error while installing ${commandName}: ${error.message}` });
                }
            } else {
                await sock.sendMessage(m.key.remoteJid, { text: 'Please provide both command name and code.' });
            }
        } else {
            await sock.sendMessage(m.key.remoteJid, { text: 'Invalid option. Use reload, reloadall, cancel, share, or install.' });
        }
    },
};