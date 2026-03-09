module.exports = {
    name: 'stats',
    desc: 'Display bot statistics',
    aliases: ['botstats', 'status'],
    category: 'Info',
    cooldown: 10,
    permission: 0,
    category: 'info',
    dmUser: true,
    run: async ({ sock, m, args, config, runtime }) => {
        try {
            let os;
            let speed;
            
            try {
                os = require('os');
            } catch (error) {
                os = {
                    platform: () => 'Unknown',
                    totalmem: () => 0,
                    freemem: () => 0,
                    cpus: () => []
                };
                console.log("OS module error:", error);
            }
            
            try {
                speed = require('performance-now');
            } catch (error) {
                speed = () => Date.now();
                console.log("Performance-now module error:", error);
            }
            
            const formatSize = size => {
                if (size < 1024) return size + ' B';
                const kb = size / 1024;
                if (kb < 1024) return kb.toFixed(2) + ' KB';
                const mb = kb / 1024;
                if (mb < 1024) return mb.toFixed(2) + ' MB';
                return (mb / 1024).toFixed(2) + ' GB';
            };
            
            const used = process.memoryUsage();
            
            let cpuInfo = "N/A";
            try {
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
                    return cpu;
                });
                
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total;
                    last.speed += cpu.speed / length;
                    last.times.user += cpu.times.user;
                    last.times.nice += cpu.times.nice;
                    last.times.sys += cpu.times.sys;
                    last.times.idle += cpu.times.idle;
                    last.times.irq += cpu.times.irq;
                    return last;
                }, {
                    speed: 0,
                    total: 0,
                    times: {
                        user: 0,
                        nice: 0,
                        sys: 0,
                        idle: 0,
                        irq: 0
                    }
                });
                
                cpuInfo = cpu.speed.toFixed(2) + " MHz";
            } catch (error) {
                console.log("CPU info error:", error);
            }
            
            let timestamp = speed();
            let latensi = speed() - timestamp;
            
            let groups = 0;
            try {
                const chats = await sock.groupFetchAllParticipating();
                groups = Object.entries(chats).length;
            } catch (error) {
                console.log("Group fetch error:", error);
            }
            
            const uptime = typeof runtime === 'function' ? runtime(process.uptime()) : `${Math.floor(process.uptime() / 3600)} hours ${Math.floor((process.uptime() % 3600) / 60)} minutes`;
            const configVersion = config && config.version ? config.version : '1.0.0';
            
            const statsText = `╭────❒ 📊 Bot Stats ❒
├⬡ *Platform:* ${os.platform()}
├⬡ *RAM:* ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}
├⬡ *NodeJS Memory:* ${formatSize(used.rss)}
├⬡ *Speed:* ${latensi.toFixed(4)} ms
├⬡ *Runtime:* ${uptime}
├⬡ *Bot Version:* ${configVersion}
├⬡ *Groups:* ${groups}
╰────────────❒`;
            
            await m.reply(statsText);
            
        } catch (err) {
            console.error('Stats error:', err);
            await m.reply(
                '╭────❒ ❌ Error ❒\n' +
                '├⬡ Failed to fetch bot stats\n' +
                '├⬡ Please try again later\n' +
                '╰────────────❒'
            );
        }
    }
};