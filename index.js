require('dotenv').config();
require('./settings');

const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const { parsePhoneNumber } = require('awesome-phonenumber');
const { default: makeWASocket, useMultiFileAuthState, Browsers, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, proto, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');

const { dataBase } = require('./src/database');
const { app, server, PORT } = require('./src/server');

const CONFIG = {
    DATABASE_CLEANUP_INTERVAL: 6 * 60 * 60 * 1000,
    MESSAGE_RETENTION_DAYS: 7,
    USER_INACTIVE_DAYS: 30,
    GAME_DATA_RETENTION_HOURS: 24,
    HIT_DATA_RETENTION_HOURS: 6,
    MAX_DATABASE_SIZE_MB: 50,
    BACKUP_RETENTION_DAYS: 3,
    MEMORY_USAGE_CHECK_INTERVAL: 5 * 60 * 1000,
    MAX_MEMORY_USAGE_MB: 512,
    RECONNECT_INTERVAL: 5000,
    MAX_RECONNECT_ATTEMPTS: 10
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

global.fetchApi = async (path = '/', query = {}, options) => {
    const urlnya = (options?.name || options ? ((options?.name || options) in global.APIs ? global.APIs[(options?.name || options)] : (options?.name || options)) : global.APIs['hitori'] ? global.APIs['hitori'] : (options?.name || options)) + path + (query ? '?' + decodeURIComponent(new URLSearchParams(Object.entries({ ...query }))) : '')
    const { data } = await axios.get(urlnya, { ...((options?.name || options) ? {} : { headers: { 'accept': 'application/json', 'x-api-key': global.APIKeys[global.APIs['hitori']]}})})
    return data
}

const storeDB = dataBase(global.tempatStore);
const database = dataBase(global.tempatDB);
const msgRetryCounterCache = new NodeCache();
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false });

const getDatabaseSize = () => {
    try {
        const stats = fs.statSync(global.tempatDB);
        return stats.size / (1024 * 1024);
    } catch (error) {
        console.log(chalk.yellow('⚠️ Could not get database size'), error.message);
        return 0;
    }
};

const getMemoryUsage = () => {
    const usage = process.memoryUsage();
    return {
        rss: usage.rss / (1024 * 1024),
        heapUsed: usage.heapUsed / (1024 * 1024),
        heapTotal: usage.heapTotal / (1024 * 1024),
        external: usage.external / (1024 * 1024)
    };
};

const createDatabaseBackup = async () => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = './backups';
        
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        
        const backupPath = path.join(backupDir, `db_backup_${timestamp}.json`);
        await database.write(global.db);
        
        if (fs.existsSync(global.tempatDB)) {
            fs.copyFileSync(global.tempatDB, backupPath);
            console.log(chalk.green(`✅ Database backup created: ${backupPath}`));
        }
        
        const backupFiles = fs.readdirSync(backupDir)
            .filter(file => file.startsWith('db_backup_'))
            .map(file => ({
                name: file,
                path: path.join(backupDir, file),
                time: fs.statSync(path.join(backupDir, file)).mtime
            }))
            .sort((a, b) => b.time - a.time);
        
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - CONFIG.BACKUP_RETENTION_DAYS);
        
        backupFiles.forEach(backup => {
            if (backup.time < cutoff) {
                fs.unlinkSync(backup.path);
                console.log(chalk.yellow(`🗑️ Removed old backup: ${backup.name}`));
            }
        });
        
    } catch (error) {
        console.log(chalk.red('❌ Backup creation failed:'), error.message);
    }
};

const cleanupDatabase = async () => {
    if (!global.db) return;
    
    console.log(chalk.cyan('🧹 Starting database cleanup...'));
    
    const now = Date.now();
    let cleanedItems = 0;
    
    try {
        await createDatabaseBackup();
        
        if (global.db.hit) {
            const hitCutoff = now - (CONFIG.HIT_DATA_RETENTION_HOURS * 60 * 60 * 1000);
            Object.keys(global.db.hit).forEach(key => {
                if (global.db.hit[key].timestamp && global.db.hit[key].timestamp < hitCutoff) {
                    delete global.db.hit[key];
                    cleanedItems++;
                }
            });
        }
        
        if (global.db.game) {
            const gameCutoff = now - (CONFIG.GAME_DATA_RETENTION_HOURS * 60 * 60 * 1000);
            Object.keys(global.db.game).forEach(key => {
                if (global.db.game[key].lastPlayed && global.db.game[key].lastPlayed < gameCutoff) {
                    delete global.db.game[key];
                    cleanedItems++;
                }
            });
        }
        
        if (global.db.users) {
            const userCutoff = now - (CONFIG.USER_INACTIVE_DAYS * 24 * 60 * 60 * 1000);
            Object.keys(global.db.users).forEach(userId => {
                const user = global.db.users[userId];
                if (user.lastActive && user.lastActive < userCutoff && !user.isPremium && !user.isOwner) {
                    const essentialData = {
                        registered: user.registered,
                        name: user.name,
                        age: user.age,
                        isPremium: user.isPremium,
                        isOwner: user.isOwner,
                        limit: user.limit,
                        balance: user.balance
                    };
                    global.db.users[userId] = essentialData;
                    cleanedItems++;
                }
            });
        }
        
        if (global.store && global.store.messages) {
            const messageCutoff = now - (CONFIG.MESSAGE_RETENTION_DAYS * 24 * 60 * 60 * 1000);
            Object.keys(global.store.messages).forEach(chatId => {
                if (global.store.messages[chatId] && Array.isArray(global.store.messages[chatId])) {
                    const originalLength = global.store.messages[chatId].length;
                    global.store.messages[chatId] = global.store.messages[chatId].filter(msg => {
                        return msg.messageTimestamp && (msg.messageTimestamp * 1000) > messageCutoff;
                    });
                    cleanedItems += originalLength - global.store.messages[chatId].length;
                }
            });
        }
        
        if (global.db.set) {
            Object.keys(global.db.set).forEach(key => {
                if (global.db.set[key].tempData) {
                    delete global.db.set[key].tempData;
                    cleanedItems++;
                }
            });
        }
        
        console.log(chalk.green(`✅ Database cleanup completed! Cleaned ${cleanedItems} items`));
        
        if (global.gc) {
            global.gc();
            console.log(chalk.blue('♻️ Garbage collection completed'));
        }
        
    } catch (error) {
        console.log(chalk.red('❌ Database cleanup error:'), error.message);
    }
};

const monitorMemoryUsage = () => {
    const usage = getMemoryUsage();
    const dbSize = getDatabaseSize();
    
    if (usage.rss > CONFIG.MAX_MEMORY_USAGE_MB || dbSize > CONFIG.MAX_DATABASE_SIZE_MB) {
        console.log(chalk.yellow(`⚠️ High resource usage detected:`));
        console.log(chalk.yellow(`   Memory: ${usage.rss.toFixed(2)} MB`));
        console.log(chalk.yellow(`   Database: ${dbSize.toFixed(2)} MB`));
        
        cleanupDatabase();
    }
};

server.listen(PORT, () => {
    console.log(chalk.magenta('🚀 IMMU MD Server Active on Port'), chalk.yellow(PORT));
});

const { GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson } = require('./lib/function');

const downloadCredentials = async (sessionId, retryCount = 3) => {
    const sessionDir = './frankultradev/';
    try {
        if (!sessionId || !sessionId.startsWith('IMMU-MD_')) {
            return false;
        }

        const pasteId = sessionId.replace('IMMU-MD_', '');
        const pasteUrl = `https://pastebin.com/raw/${pasteId}`;
        
        console.log(chalk.cyan('🔐 IMMU-MD Authentication'));
        console.log(chalk.magenta('✔ Connecting to ImmuDev Database...'));

        return new Promise((resolve, reject) => {
            const handleRequest = (attempt) => {
                axios.get(pasteUrl, {
                    headers: {
                        'User-Agent': 'IMMU-MD-ULTRA/3.0.1 (ImmuDevs-Database)',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                }).then(({ data }) => {
                    try {
                        if (typeof data !== 'object') {
                           console.log(chalk.red('⚠️ Invalid session data detected from FrankDevs Database'));
                           return resolve(false);
                        }

                        if (!fs.existsSync(sessionDir)) {
                            fs.mkdirSync(sessionDir, { recursive: true });
                        }

                        fs.writeFileSync(path.join(sessionDir, 'creds.json'), JSON.stringify(data, null, 2));
                        console.log(chalk.green('✅ Connected to ImmuDevs Database'));
                        console.log(chalk.yellow('🔓 Session loaded successfully'));
                        resolve(true);
                    } catch (error) {
                        console.log(chalk.red('❌ Failed to process ImmuDevs Database response'), error.message);
                        resolve(false);
                    }
                }).catch(err => {
                    if (attempt < retryCount) {
                        console.log(chalk.yellow(`🔄 Retrying ImmuDevs Database connection... (${attempt + 1}/${retryCount})`));
                        setTimeout(() => handleRequest(attempt + 1), 2000);
                    } else {
                        console.log(chalk.red('❌ Failed to connect to ImmuDevs Database after multiple attempts'));
                        resolve(false);
                    }
                });
            };
            handleRequest(0);
        });
    } catch (error) {
        console.log(chalk.red('💥 Critical error in ImmuDevs Database connection'), error.message);
        return false;
    }
};

let reconnectAttempts = 0;

async function startQasimBot() {
    console.log(chalk.magenta('╔═══════════════════════════╗'));
    console.log(chalk.magenta('║       🚀 IMMU-MD ULTRA 🚀         ║'));
    console.log(chalk.magenta('║         BY Imad Ali DEV             ║'));
    console.log(chalk.magenta('║        FROM Peshawar/Pakistan 🇵🇰          ║'));
    console.log(chalk.magenta('╚═══════════════════════════╝'));
    
    const sessionId = process.env.SESSION_ID;
    if (!sessionId) {
        console.log(chalk.red('❌ SESSION_ID not found in environment variables'));
        console.log(chalk.yellow('Please set SESSION_ID in your .env file'));
        process.exit(1);
    }
    
    await downloadCredentials(sessionId);

    const { state, saveCreds } = await useMultiFileAuthState('immuultradev');
    const { version } = await fetchLatestBaileysVersion();
    const level = pino({ level: 'silent' });

    try {
        console.log(chalk.cyan('📊 Loading IMMU-PRIME database...'));
        const loadData = await database.read()
        const storeLoadData = await storeDB.read()

        if (!loadData || Object.keys(loadData).length === 0) {
            console.log(chalk.yellow('📊 Initializing database schema...'));
            global.db = {
                hit: {},
                set: {},
                list: {},
                store: {},
                users: {},
                game: {},
                groups: {},
                database: {},
                premium: [],
                sewa: [],
                ...(loadData || {}),
            }
            await database.write(global.db)
        } else {
            global.db = loadData
        }

        if (!storeLoadData || Object.keys(storeLoadData).length === 0) {
            console.log(chalk.yellow('💾 Setting up message store...'));
            global.store = {
                contacts: {},
                presences: {},
                messages: {},
                groupMetadata: {},
                ...(storeLoadData || {}),
            }
            await storeDB.write(global.store)
        } else {
            global.store = storeLoadData
        }

        console.log(chalk.green('✅ Database systems online!'));
        
        const saveDatabase = async () => {
            try {
                if (global.db) {
                    Object.keys(global.db.users || {}).forEach(userId => {
                        if (global.db.users[userId]) {
                            global.db.users[userId].lastActive = Date.now();
                        }
                    });
                    await database.write(global.db);
                }
                if (global.store) await storeDB.write(global.store);
            } catch (error) {
                console.log(chalk.red('❌ Database save error:'), error.message);
            }
        };
        
        setInterval(saveDatabase, 30 * 1000);
        setInterval(cleanupDatabase, CONFIG.DATABASE_CLEANUP_INTERVAL);
        setInterval(monitorMemoryUsage, CONFIG.MEMORY_USAGE_CHECK_INTERVAL);
        setTimeout(cleanupDatabase, 5 * 60 * 1000);
        
    } catch (e) {
        console.log(chalk.red('💥 Critical database error:'), e)
        process.exit(1)
    }

    // FIXED: Changed return value from { conversation: '' } to undefined to prevent blank messages
    const getMessage = async (key) => {
        try {
            if (global.store && global.store.messages && global.store.messages[key.remoteJid]) {
                const messages = global.store.messages[key.remoteJid];
                if (Array.isArray(messages)) {
                    return messages.find(msg => msg?.key?.id === key.id)?.message || null;
                }
            }
        } catch (error) {
            console.log(chalk.yellow('⚠️ Get message error:'), error.message);
        }
        // Return undefined instead of { conversation: '' } to prevent blank messages
        return undefined;
    }

    console.log(chalk.cyan('🔧 Starting WhatsApp Client...'));

    const qasim = makeWASocket({
        logger: level,
        getMessage,
        syncFullHistory: false,
        maxMsgRetryCount: 5,
        msgRetryCounterCache,
        retryRequestDelayMs: 10,
        defaultQueryTimeoutMs: 30000,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 30000,
        browser: Browsers.windows('IMMU-MD-ULTRA'),
        generateHighQualityLinkPreview: false,
        transactionOpts: {
            maxCommitRetries: 5,
            delayBetweenTriesMs: 10,
        },
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, level),
        },
    })

    await Solving(qasim, global.store)
    qasim.ev.on('creds.update', saveCreds)

    qasim.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr, isOnline } = update
        
        if (qr) {
            console.log(chalk.cyan('📱 IMMU-MD QR Code Generated'));
        }

        if (connection) {
            console.log(chalk.blue(`📡 Connection Status: ${connection}`));
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            console.log(chalk.yellow('⚠️ Connection closed. Code:'), reason);
            
            reconnectAttempts++;
            
            if (reason === DisconnectReason.badSession) {
                console.log(chalk.red('❌ Bad Session - Cleaning up...'));
                if (fs.existsSync('./immuultradev')) {
                    fs.rmSync('./immuultradev', { recursive: true, force: true });
                }
                reconnectAttempts = 0;
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.yellow('🔄 Connection Closed - Reconnecting...'));
                await sleep(CONFIG.RECONNECT_INTERVAL);
                startQasimBot();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.yellow('📡 Connection Lost - Reconnecting...'));
                await sleep(CONFIG.RECONNECT_INTERVAL);
                startQasimBot();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.red('⚠️ Connection Replaced - Another session is active'));
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red('🚪 Logged Out - Clearing session...'));
                if (fs.existsSync('./immuultradev')) {
                    fs.rmSync('./immuultradev', { recursive: true, force: true });
                }
                reconnectAttempts = 0;
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.yellow('🔄 Restart Required - Restarting...'));
                startQasimBot();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(chalk.yellow('⏱️ Connection Timeout - Reconnecting...'));
                await sleep(CONFIG.RECONNECT_INTERVAL);
                startQasimBot();
            } else if (reason === 428) {
                console.log(chalk.red('❌ Connection Banned - Session Invalid'));
                if (fs.existsSync('./immuultradev')) {
                    fs.rmSync('./immuultradev', { recursive: true, force: true });
                }
            } else {
                console.log(chalk.red(`❌ Unknown Disconnect: ${reason}`));
                if (reconnectAttempts < CONFIG.MAX_RECONNECT_ATTEMPTS) {
                    await sleep(CONFIG.RECONNECT_INTERVAL);
                    startQasimBot();
                } else {
                    console.log(chalk.red('💥 Max reconnection attempts reached. Exiting...'));
                    process.exit(1);
                }
            }
        }

        if (connection === 'open') {
            console.log(chalk.green('✅IMMU-MD ULTRA Connected Successfully!'));
            console.log(chalk.cyan('📱 Bot Number:'), chalk.yellow(qasim.user?.id?.split(':')[0]));
            console.log(chalk.cyan('👤 Bot Name:'), chalk.yellow(qasim.user?.name || 'IMMU-MD'));
            reconnectAttempts = 0;
        }

        if (isOnline !== undefined) {
            console.log(chalk.blue(`🌐 Online Status: ${isOnline ? 'Online' : 'Offline'}`));
        }
    })

    qasim.ev.on('call', async (call) => {
        try {
            if (global.db?.set?.anticall) {
                for (const id of call) {
                    if (id.status === 'offer') {
                        let msg = await qasim.sendMessage(id.from, { 
                            text: `🚫IMMU-MD ULTRA Call Protection Active\n\nCurrently unable to accept ${id.isVideo ? 'Video' : 'Voice'} calls.\nIf @${id.from.split('@')[0]} needs assistance, please contact imad ali Dev :)`, 
                            mentions: [id.from] 
                        });
                        await qasim.sendContact(id.from, global.owner, msg);
                        await qasim.rejectCall(id.id, id.from)
                    }
                }
            }
        } catch (error) {
            console.log(chalk.yellow('⚠️ Call handler error:'), error.message);
        }
    });

    qasim.ev.on('messages.upsert', async (message) => {
        try {
            await MessagesUpsert(qasim, message, global.store, groupCache);
        } catch (error) {
            console.log(chalk.yellow('⚠️ Messages upsert error:'), error.message);
        }
    });

    qasim.ev.on('group-participants.update', async (update) => {
        try {
            await GroupParticipantsUpdate(qasim, update, global.store, groupCache);
        } catch (error) {
            console.log(chalk.yellow('⚠️ Group participants update error:'), error.message);
        }
    });

    qasim.ev.on('groups.update', (update) => {
        try {
            for (const n of update) {
                if (global.store.groupMetadata[n.id]) {
                    groupCache.set(n.id, n);
                    Object.assign(global.store.groupMetadata[n.id], n);
                }
            }
        } catch (error) {
            console.log(chalk.yellow('⚠️ Groups update error:'), error.message);
        }
    });

    qasim.ev.on('presence.update', ({ id, presences: update }) => {
        try {
            global.store.presences[id] = global.store.presences?.[id] || {};
            Object.assign(global.store.presences[id], update);
        } catch (error) {
            console.log(chalk.yellow('⚠️ Presence update error:'), error.message);
        }
    });

    // REMOVED: The 10-minute presence update interval that was causing blank messages
    // Original code that was removed:
    // setInterval(async () => {
    //     try {
    //         if (qasim?.user?.id) {
    //             await qasim.sendPresenceUpdate('available');
    //         }
    //     } catch (error) {
    //         console.log(chalk.yellow('⚠️ Presence update error:'), error.message);
    //     }
    // }, 10 * 60 * 1000);

    return qasim
}

startQasimBot()

const cleanup = async (signal) => {
    console.log(chalk.yellow(`🔄 IMMU MD received ${signal}. Saving database...`))
    try {
        if (global.db) await database.write(global.db)
        if (global.store) await storeDB.write(global.store)
        console.log(chalk.green('✅ Database saved successfully'));
    } catch (error) {
        console.log(chalk.red('❌ Database save error during cleanup:'), error.message);
    }
    
    server.close(() => {
        console.log(chalk.green('🛑IMMU-MD ULTRA Server closed. Exiting...'))
        process.exit(0)
    })
}

process.on('SIGINT', () => cleanup('SIGINT'))
process.on('SIGTERM', () => cleanup('SIGTERM'))
process.on('exit', () => cleanup('exit'))
process.on('uncaughtException', (error) => {
    console.log(chalk.red('💥 Uncaught Exception:'), error);
    cleanup('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
    console.log(chalk.red('💥 Unhandled Rejection:'), reason);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(chalk.red(`❌ IMMU MD Port ${PORT} is busy. Please retry when available!`));
        server.close();
    } else console.log(chalk.red('💥 IMMU MD Server error:'), error);
});

setInterval(() => {
    if (global.gc) {
        global.gc();
    }
    
    const usage = getMemoryUsage();
    if (usage.rss > 300) {
        console.log(chalk.blue(`📊 Memory: ${usage.rss.toFixed(2)}MB, Heap: ${usage.heapUsed.toFixed(2)}MB`));
    }
}, 1000 * 60 * 10);

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.magenta(`🔄 IMMU MD ULTRA Updated: ${__filename}`))
    
    if (global.db) {
        database.write(global.db).catch(err => {
            console.log(chalk.red('❌ Failed to save database during restart:'), err.message);
        });
    }
    
    delete require.cache[file]
    require(file)
});

global.cleanupDatabase = cleanupDatabase;
global.createDatabaseBackup = createDatabaseBackup;
global.getMemoryUsage = getMemoryUsage;
global.getDatabaseSize = getDatabaseSize;

global.optimizeDatabase = async () => {
    console.log(chalk.cyan('🔧 Starting database optimization...'));
    
    try {
        if (global.db.users) {
            Object.keys(global.db.users).forEach(userId => {
                const user = global.db.users[userId];
                Object.keys(user).forEach(key => {
                    if (user[key] === undefined || user[key] === null) {
                        delete user[key];
                    }
                });
            });
        }
        
        if (global.db.groups) {
            Object.keys(global.db.groups).forEach(groupId => {
                const group = global.db.groups[groupId];
                Object.keys(group).forEach(key => {
                    if (group[key] === undefined || group[key] === null) {
                        delete group[key];
                    }
                });
            });
        }
        
        ['hit', 'set', 'list', 'store', 'game'].forEach(section => {
            if (global.db[section]) {
                Object.keys(global.db[section]).forEach(key => {
                    if (typeof global.db[section][key] === 'object' && 
                        Object.keys(global.db[section][key]).length === 0) {
                        delete global.db[section][key];
                    }
                });
            }
        });
        
        console.log(chalk.green('✅ Database optimization completed'));
        
        await database.write(global.db);
        
    } catch (error) {
        console.log(chalk.red('❌ Database optimization failed:'), error.message);
    }
};

global.checkDatabaseHealth = () => {
    const health = {
        size: getDatabaseSize(),
        memory: getMemoryUsage(),
        users: Object.keys(global.db?.users || {}).length,
        groups: Object.keys(global.db?.groups || {}).length,
        messages: 0,
        status: 'healthy'
    };
    
    if (global.store?.messages) {
        health.messages = Object.values(global.store.messages).reduce((total, messages) => {
            return total + (Array.isArray(messages) ? messages.length : 0);
        }, 0);
    }
    
    if (health.size > CONFIG.MAX_DATABASE_SIZE_MB || health.memory.rss > CONFIG.MAX_MEMORY_USAGE_MB) {
        health.status = 'critical';
    } else if (health.size > CONFIG.MAX_DATABASE_SIZE_MB * 0.8 || health.memory.rss > CONFIG.MAX_MEMORY_USAGE_MB * 0.8) {
        health.status = 'warning';
    }
    
    return health;
};

setInterval(() => {
    const health = global.checkDatabaseHealth();
    
    if (health.status === 'critical') {
        console.log(chalk.red('🚨 Critical database state detected! Running emergency cleanup...'));
        global.cleanupDatabase();
        global.optimizeDatabase();
    } else if (health.status === 'warning') {
        console.log(chalk.yellow('⚠️ Database needs optimization...'));
        global.optimizeDatabase();
    }
}, CONFIG.DATABASE_CLEANUP_INTERVAL);

global.DB_CONFIG = CONFIG;
