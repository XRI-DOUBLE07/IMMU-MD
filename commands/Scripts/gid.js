module.exports = {
    name: 'gid',
    desc: 'Get the Group Chat ID.',
    cooldown: 5,
    permission: 0,
    dmUser: false,
    run: async ({ m, sock }) => {
        if (!m.isGroup) {
            return sock.sendMessage(m.chat, { text: `🚫 *This command can only be used in group chats!*` });
        }

        await sock.sendMessage(m.chat, { text: `📌 *Group Chat ID:* \n\`\`\`${m.chat}\`\`\`` });
    },
};
