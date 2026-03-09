const { exec } = require('child_process');

module.exports = {
    name: 'shell',
    desc: 'Execute terminal commands.',
    cooldown: 0,
    permission: 2,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args.length) return m.reply('Please provide a command to execute.');

        const command = args.join(' ');

        const processingMessage = await sock.sendMessage(m.chat, { text: 'Processing...' });

        exec(command, (error, stdout, stderr) => {
            let response;
            if (error) response = `Error:\n\`\`\`${error.message}\`\`\``;
            else if (stderr) response = `Stderr:\n\`\`\`${stderr}\`\`\``;
            else response = `Output:\n\`\`\`${stdout}\`\`\``;

            sock.sendMessage(m.chat, { text: response, edit: processingMessage.key });
        });
    }
};