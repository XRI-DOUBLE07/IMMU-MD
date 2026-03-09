module.exports = {
    name: 'setprefix',
    desc: 'Sets a new command prefix for the bot.',
    aliases: ['prefixset', 'changeprefix'],
    category: 'Admin',
    cooldown: 5,
    permission: 1,
    dmUser: false,
    run: async ({ sock, m, args }) => {
        if (!args[0]) {
            return m.reply(
                `╭────❒ ⚙️ Prefix ⚙️ ❒────\n` +
                `├⬡ Current prefix is: *${global.prefix}*\n` +
                `├⬡ Usage: !setprefix [new prefix]\n` +
                `├⬡ Example: !setprefix .\n` +
                `╰───────────────────`
            );
        }

        const newPrefix = args[0];

        if (newPrefix.length > 5) {
            return m.reply('Prefix cannot be longer than 5 characters.');
        }

        const oldPrefix = global.prefix;
        global.prefix = newPrefix;

        await m.reply(
            `╭────❒ ✅ Prefix Changed ✅ ❒────\n` +
            `├⬡ Prefix successfully changed from "*${oldPrefix}*" to "*${global.prefix}*"\n` +
            `╰───────────────────────────`
        );
    },
};