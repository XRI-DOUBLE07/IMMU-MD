const { DATABASE } = require("./database");
const { DataTypes } = require("sequelize");
const path = require("path");
const config = require("../../config");

const packageJson = require("../../package.json");

const SettingsDB = DATABASE.define(
    "BotSettings",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "bot_settings",
        timestamps: true,
    },
);

const DEFAULT_SETTINGS = {
    PREFIX: ".",
    OWNER_NAME: "𝐌ᴀғɪᴀ 𝐈ᴍᴀᴅ",
    OWNER_NUMBER: "923493114170",
    BOT_NAME: "𝐈ᴍᴍυ Mᴅ",
    FOOTER: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɪᴍᴍᴜ ᴍᴅ ★",
    CAPTION: "©𝟐𝟎𝟐𝟔 𝐈𝐌𝐌𝐔-𝐌𝐃 𝐕𝟐",
    BOT_PIC: "https://i.ibb.co/23qtbQ2q/IMG-20260408-WA0004.png",
    VERSION: packageJson.version || "5.0.0",
    MODE: config.MODE || "public",
    WARN_COUNT: "3",
    TIME_ZONE: config.TIME_ZONE || "Asia/Karachi",
    DM_PRESENCE: "online",
    GC_PRESENCE: "online",
    CHATBOT: "false",
    CHATBOT_MODE: "inbox",
    STARTING_MESSAGE: "true",
    ANTIDELETE: "indm",
    ANTI_EDIT: "indm",
    ANTICALL: "false",
    ANTICALL_MSG: "*_📞 Auto Call Reject Mode Active. 📵 No Calls Allowed!_*",
    AUTO_LIKE_STATUS: config.AUTO_LIKE_STATUS || "true",
    AUTO_READ_STATUS: config.AUTO_READ_STATUS || "true",
    STATUS_LIKE_EMOJIS: "💛,❤️,💜,🤍,🚩,🟢,💙",
    AUTO_REPLY_STATUS: "false",
    STATUS_REPLY_TEXT: "*ʏᴏᴜʀ sᴛᴀᴛᴜs ᴠɪᴇᴡᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐈ᴍᴀᴅ sᴜᴄᴄᴇssғᴜʟʟʏ ✅*",
    AUTO_REACT: "off",
    AUTO_REPLY: "false",
    AUTO_READ_MESSAGES: "off",
    AUTO_BIO: "false",
    AUTO_BLOCK: "",
    YT: "https://youtube.com/@immumdbot",
    NEWSLETTER_JID: "120363341506278064@newsletter",
    GC_JID: "JQTH0GwURpjIJEzhpcFosO",
    NEWSLETTER_URL: "https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42",
    BOT_REPO: "XRI-DOUBLE07/IMMU-MD",
    PACK_NAME: "𝐈ᴍᴍυ-Mᴅ",
    PACK_AUTHOR: "𝐌ᴀғɪᴀ 𝐈ᴍᴀᴅ",
    SUDO_NUMBERS: "",
    PM_PERMIT: "false",
    ANTIVIEWONCE: "indm",
};

let initialized = false;

const GROUP_ONLY_SETTINGS = [
    "WELCOME_MESSAGE",
    "GOODBYE_MESSAGE",
    "GROUP_EVENTS",
    "ANTILINK",
];

async function initializeSettings() {
    if (initialized) return;

    await SettingsDB.sync();

    await SettingsDB.destroy({
        where: { key: GROUP_ONLY_SETTINGS },
    });

    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
        await SettingsDB.findOrCreate({
            where: { key },
            defaults: { key, value: defaultValue },
        });
    }

    initialized = true;
    console.log("✅ Bot Settings Initialized");
}

async function getSetting(key) {
    if (!initialized) await initializeSettings();

    const record = await SettingsDB.findOne({ where: { key } });
    if (record) {
        return record.value;
    }

    return DEFAULT_SETTINGS[key] || null;
}

async function setSetting(key, value) {
    if (!initialized) await initializeSettings();

    const [record, created] = await SettingsDB.findOrCreate({
        where: { key },
        defaults: { key, value },
    });

    if (!created) {
        record.value = value;
        await record.save();
    }

    return true;
}

async function getAllSettings() {
    if (!initialized) await initializeSettings();

    const records = await SettingsDB.findAll();
    const settings = {};
    for (const record of records) {
        settings[record.key] = record.value;
    }
    return settings;
}

async function resetSetting(key) {
    if (!initialized) await initializeSettings();

    const defaultValue = DEFAULT_SETTINGS[key];
    if (defaultValue !== undefined) {
        await setSetting(key, defaultValue);
        return defaultValue;
    }
    return null;
}

async function resetAllSettings() {
    if (!initialized) await initializeSettings();

    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
        await setSetting(key, defaultValue);
    }
    return true;
}

module.exports = {
    SettingsDB,
    DEFAULT_SETTINGS,
    initializeSettings,
    getSetting,
    setSetting,
    getAllSettings,
    resetSetting,
    resetAllSettings,
};
