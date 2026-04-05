const { cmd } = require('../command');
const os = require('os');
const moment = require('moment');
const speed = require('performance-now');
const { exec } = require('child_process');
const config = require('../config');

cmd({
    pattern: "sysinfo",
    alias: ["systeminfo", "serverinfo", "status"],
    desc: "Display detailed system information of the bot server",
    category: "info",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Calculate uptime in a readable format
        const uptime = moment.duration(os.uptime(), 'seconds').humanize();
        
        // Calculate CPU usage (async)
        const cpuUsage = await getCpuUsage();
        
        // Memory usage (GB)
        const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2);
        const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        
        // Network info (IP)
        const networkInfo = os.networkInterfaces();
        let ipAddress = "N/A";
        Object.keys(networkInfo).forEach(interface => {
            networkInfo[interface].forEach(details => {
                if (details.family === 'IPv4' && !details.internal) {
                    ipAddress = details.address;
                }
            });
        });

        // Disk space (Linux/MacOS only)
        let diskSpace = "N/A";
        if (os.platform() !== 'win32') {
            diskSpace = await getDiskSpace();
        }

        // Bot info
        const botInfo = {
            name: config.BOT_NAME || "adeel",
            version: config.VERSION || "2.0",
            creator: "𝐈ᴍᴍυ-𝐌ᴅ 👑",
            contact: "+923493114170"
        };

        // Generate a beautiful system info message
        const sysInfoMessage = `
╭───「 🖥️ *SYSTEM INFORMATION* 🖥️ 」───
│
│ *🤖 Bot Name:* ${botInfo.name}
│ *🔖 Version:* ${botInfo.version}
│ *👑 Creator:* ${botInfo.creator} (${botInfo.contact})
│
│ *💻 Hostname:* ${os.hostname()}
│ *🛠️ Platform:* ${os.platform()} (${os.arch()})
│ *⏳ Uptime:* ${uptime}
│
│ *⚡ CPU:* ${os.cpus()[0].model}
│ *📊 CPU Usage:* ${cpuUsage}%
│ *🧠 RAM:* ${usedMem}GB / ${totalMem}GB (${Math.round((usedMem / totalMem) * 100)}% used)
│ *💾 Disk:* ${diskSpace}
│ *🌐 IP:* ${ipAddress}
│
╰─────────────────────

🔧 *Bot maintained by 𝗜𝗠𝗔𝗗 ALI🦋*`;

        await reply(sysInfoMessage);

    } catch (e) {
        console.error("Sysinfo Command Error:", e);
        await reply("❌ Failed to fetch system details. Please try again later.");
    }
});

// Helper function to calculate CPU usage
async function getCpuUsage() {
    const start = speed();
    const startCpu = os.cpus().map(cpu => cpu.times);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const end = speed();
    const endCpu = os.cpus().map(cpu => cpu.times);

    const elapsed = (end - start) / 1000;
    const cpuUsage = endCpu.map((cpu, i) => {
        const startTotal = Object.values(startCpu[i]).reduce((a, b) => a + b, 0);
        const endTotal = Object.values(cpu).reduce((a, b) => a + b, 0);
        const totalDiff = endTotal - startTotal;
        const idleDiff = cpu.idle - startCpu[i].idle;
        return Math.round(100 - (idleDiff / totalDiff) * 100);
    });

    return cpuUsage.reduce((a, b) => a + b, 0) / cpuUsage.length;
}

// Helper function to get disk space (Linux/MacOS)
async function getDiskSpace() {
    return new Promise((resolve) => {
        exec("df -h /", (error, stdout) => {
            if (error) return resolve("N/A");
            const lines = stdout.trim().split("\n");
            if (lines.length > 1) {
                const parts = lines[1].split(/\s+/);
                resolve(`${parts[2]}B used / ${parts[1]}B total (${parts[4]})`);
            } else {
                resolve("N/A");
            }
        });
    });
}
