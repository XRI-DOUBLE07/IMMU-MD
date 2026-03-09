module.exports = {
    name: 'bio',
    desc: 'Change bot bio',
    aliases: ['botbio', 'changebio'],
    category: 'Owner',
    cooldown: 5,
    permission: 2,
    category: 'owner',
    dmUser: true,
    run: async ({ sock, m, args }) => {
        try {
            const newBio = args.join(' ');
            
            if (!newBio) {
                return m.reply(
                    '╭────❒ ❌ Error ❒\n' +
                    '├⬡ Please provide a new bio\n' +
                    '├⬡ Example: /setbio New Bot Bio\n' +
                    '╰────────────❒'
                );
            }
            
            await sock.updateProfileStatus(newBio);
            
            await m.reply(
                `╭────❒ ✅ Success ❒\n` +
                `├⬡ Bot bio has been updated to:\n` +
                `├⬡ "${newBio}"\n` +
                `╰────────────❒`
            );
            
        } catch (err) {
            console.error('Set Bio error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to update bot bio\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};