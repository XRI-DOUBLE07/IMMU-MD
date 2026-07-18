const {
        gmd,
        gitRepoRegex,
        MAX_MEDIA_SIZE,
        getFileSize,
        getMimeCategory,
        getMimeFromUrl,
    } = require("../gift"),
    GIFTED_DLS = require("gifted-dls"),
    giftedDls = new GIFTED_DLS(),
    axios = require("axios"),
    { sendButtons } = require("gifted-btns");

function extractButtonId(msg) {
    if (!msg) return null;
    if (msg.templateButtonReplyMessage?.selectedId)
        return msg.templateButtonReplyMessage.selectedId;
    if (msg.buttonsResponseMessage?.selectedButtonId)
        return msg.buttonsResponseMessage.selectedButtonId;
    if (msg.listResponseMessage?.singleSelectReply?.selectedRowId)
        return msg.listResponseMessage.singleSelectReply.selectedRowId;
    if (msg.interactiveResponseMessage) {
        const nf = msg.interactiveResponseMessage.nativeFlowResponseMessage;
        if (nf?.paramsJson) {
            try { const p = JSON.parse(nf.paramsJson); if (p.id) return p.id; } catch {}
        }
        return msg.interactiveResponseMessage.buttonId || null;
    }
    return null;
}

gmd(
    {
        pattern: "gitclone",
        category: "downloader",
        react: "📦",
        aliases: ["gitdl", "github", "git", "repodl", "clone"],
        description: "Download GitHub repository as zip file",
    },
    async (from, Gifted, conText) => {
        const { q, mek, reply, react, sender, botName, newsletterJid } =
            conText;

        if (!q) {
            await react("❌");
            return reply(
                `Please provide a GitHub repository link.\n\n*Usage:* .gitclone https://github.com/user/repo`,
            );
        }

        if (!gitRepoRegex.test(q)) {
            await react("❌");
            return reply(
                "Invalid GitHub link format. Please provide a valid GitHub repository URL.",
            );
        }

        try {
            let [, user, repo] = q.match(gitRepoRegex) || [];
            repo = repo.replace(/\.git$/, "").split("/")[0];

            const apiUrl = `https://api.github.com/repos/${user}/${repo}`;
            const zipUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;

            await reply(`Fetching repository *${user}/${repo}*...`);

            const repoResponse = await axios.get(apiUrl);
            if (!repoResponse.data) {
                await react("❌");
                return reply(
                    "Repository not found or access denied. Make sure the repository is public.",
                );
            }

            const repoData = repoResponse.data;
            const defaultBranch = repoData.default_branch || "main";
            const filename = `${user}-${repo}-${defaultBranch}.zip`;

            await Gifted.sendMessage(
                from,
                {
                    document: { url: zipUrl },
                    fileName: filename,
                    mimetype: "application/zip",
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: newsletterJid,
                            newsletterName: botName,
                            serverMessageId: 143,
                        },
                    },
                },
                { quoted: mek },
            );

            await react("✅");
        } catch (error) {
            console.error("GitClone error:", error);
            await react("❌");

            if (error.message?.includes("404")) {
                return reply("Repository not found.");
            } else if (error.message?.includes("rate limit")) {
                return reply(
                    "GitHub API rate limit exceeded. Please try again later.",
                );
            } else {
                return reply(`Failed to download repository: ${error.message}`);
            }
        }
    },
);

// ─── Vercel downloader API (used by fb / tiktok / ig) ───
// Set SMD_SITE_URL in the environment to point at your own deployment.
const SMD_SITE_URL = (
    process.env.SMD_SITE_URL || "https://immu-md-api.vercel.app"
).replace(/\/+$/, "");

const SMD_EMOJI = {
    tiktok: "🎵",
    instagram: "📸",
    facebook: "📘",
    twitter: "🐦",
    youtube: "▶️",
};

// Call the downloader site and return its parsed JSON result
async function smdFetch(url) {
    const { data } = await axios.post(
        `${SMD_SITE_URL}/api/download`,
        { url, type: "video" },
        { timeout: 90000, headers: { "Content-Type": "application/json" } },
    );
    if (!data || !data.success) {
        throw new Error(data?.error || "Media could not be fetched");
    }
    return data;
}

// The site returns some URLs relative to itself — make them absolute
function smdFullUrl(u) {
    if (!u) return null;
    return u.startsWith("/") ? SMD_SITE_URL + u : u;
}

// Shared handler for Facebook, TikTok and Instagram
async function smdHandle(from, Gifted, conText, expectedPlatform) {
    const { q, reply, react, botFooter } = conText;

    if (!q) {
        await react("❌");
        return reply("Please provide a link.");
    }

    const urlMatch = q.match(/https?:\/\/[^\s]+/i);
    if (!urlMatch) {
        await react("❌");
        return reply("No valid link found. Please paste a correct URL.");
    }
    const url = urlMatch[0];

    await react("⏳");

    try {
        const data = await smdFetch(url);
        const meta = data.metadata || {};
        const platform = meta.platform || expectedPlatform;
        const emo = SMD_EMOJI[platform] || "📥";

        // Photo carousel / multiple images (TikTok slides, Instagram albums)
        const images = (meta.images || []).map((i) => i.url).filter(Boolean);
        if ((meta.isPhotoCarousel || images.length > 0) && !data.downloadUrl) {
            if (!images.length) {
                await react("❌");
                return reply("No images found.");
            }
            await react("🖼️");
            const max = Math.min(images.length, 15);
            for (let i = 0; i < max; i++) {
                await Gifted.sendMessage(from, {
                    image: { url: smdFullUrl(images[i]) },
                    caption:
                        i === 0
                            ? `${emo} *${platform.toUpperCase()}*${meta.author ? `\n👤 ${meta.author}` : ""}\n\n> ${botFooter}`
                            : undefined,
                });
                await new Promise((r) => setTimeout(r, 600));
            }
            await react("✅");
            return;
        }

        // Single video
        if (!data.downloadUrl) {
            await react("❌");
            return reply(
                "Download URL not available (this post may be private or embed-only).",
            );
        }

        const caption =
            `╭━━〔 *${emo} ${platform.toUpperCase()}* 〕━━╮\n┃` +
            (meta.author ? `\n┃ 👤 *${meta.author}*` : "") +
            (meta.title ? `\n┃ 📝 ${String(meta.title).substring(0, 120)}` : "") +
            `\n┃\n╰━━━━━━━━━━━━━━━━╯\n\n> ${botFooter}`;

        await Gifted.sendMessage(from, {
            video: { url: smdFullUrl(data.downloadUrl) },
            caption,
            mimetype: "video/mp4",
        });
        await react("✅");
    } catch (err) {
        await react("❌");
        const emsg = err.response?.data?.error || err.message;
        return reply(
            `Download failed: ${emsg}\n\nTry another link or try again later.`,
        );
    }
}

gmd(
    {
        pattern: "fb",
        category: "downloader",
        react: "📘",
        aliases: ["fbdl", "facebookdl", "facebook"],
        description: "Download Facebook videos",
    },
    async (from, Gifted, conText) => smdHandle(from, Gifted, conText, "facebook"),
);

gmd(
    {
        pattern: "tiktok",
        category: "downloader",
        react: "🎵",
        aliases: ["tiktokdl", "ttdl", "tt"],
        description: "Download TikTok videos",
    },
    async (from, Gifted, conText) => smdHandle(from, Gifted, conText, "tiktok"),
);

gmd(
    {
        pattern: "twitter",
        category: "downloader",
        react: "🐦",
        aliases: ["twitterdl", "xdl", "xdownloader", "twitterdownloader", "x"],
        description: "Download Twitter/X videos",
    },
    async (from, Gifted, conText) => {
        const {
            q,
            mek,
            reply,
            react,
            botName,
            botFooter,
            newsletterJid,
            gmdBuffer,
            toAudio,
            formatAudio,
            GiftedTechApi,
            GiftedApiKey,
        } = conText;

        if (!q) {
            await react("❌");
            return reply("Please provide a Twitter/X URL");
        }

        if (!q.includes("twitter.com") && !q.includes("x.com")) {
            await react("❌");
            return reply("Please provide a valid Twitter/X URL");
        }

        try {
            const apiUrl = `${GiftedTechApi}/api/download/twitter?apikey=${GiftedApiKey}&url=${encodeURIComponent(q)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (!response.data?.success || !response.data?.result) {
                await react("❌");
                return reply(
                    "Failed to fetch video. Please check the URL and try again.",
                );
            }

            const { thumbnail, videoUrls } = response.data.result;

            if (!videoUrls || videoUrls.length === 0) {
                await react("❌");
                return reply("No video found in this tweet.");
            }

            const dateNow = Date.now();
            const buttons = videoUrls.map((v, index) => ({
                id: `tw_${index}_${dateNow}`,
                text: `${v.quality} Quality`,
            }));
            buttons.push({ id: `tw_audio_${dateNow}`, text: "Audio Only" });

            await sendButtons(Gifted, from, {
                title: `${botName} TWITTER DOWNLOADER`,
                text: `*Available qualities:* ${videoUrls.map((v) => v.quality).join(", ")}\n\n*Select download type:*`,
                footer: botFooter,
                image: { url: thumbnail },
                buttons: buttons,
            });

            const handleResponse = async (event) => {
                const messageData = event.messages[0];
                if (!messageData.message) return;

                const selectedButtonId = extractButtonId(messageData.message);
                if (!selectedButtonId) return;
                if (!selectedButtonId.includes(`_${dateNow}`)) return;

                const isFromSameChat = messageData.key?.remoteJid === from;
                if (!isFromSameChat) return;

                await react("⬇️");

                try {
                    if (selectedButtonId.startsWith("tw_audio")) {
                        const bestVideo = videoUrls[0]?.url;
                        if (!bestVideo) {
                            await react("❌");
                            return reply(
                                "No video available for audio extraction.",
                                messageData,
                            );
                        }

                        const videoBuffer = await gmdBuffer(bestVideo);
                        const audioBuffer = await toAudio(videoBuffer);
                        const fileSize = audioBuffer.length;

                        if (fileSize > MAX_MEDIA_SIZE) {
                            await Gifted.sendMessage(
                                from,
                                {
                                    document: audioBuffer,
                                    fileName: "twitter_audio.mp3",
                                    mimetype: "audio/mpeg",
                                },
                                { quoted: messageData },
                            );
                        } else {
                            await Gifted.sendMessage(
                                from,
                                {
                                    audio: audioBuffer,
                                    mimetype: "audio/mpeg",
                                },
                                { quoted: messageData },
                            );
                        }
                    } else {
                        const index = parseInt(selectedButtonId.split("_")[1]);
                        const videoUrl = videoUrls[index]?.url;

                        if (!videoUrl) {
                            await react("❌");
                            return reply(
                                "Selected quality not available.",
                                messageData,
                            );
                        }

                        const fileSize = await getFileSize(videoUrl);
                        const sendAsDoc = fileSize > MAX_MEDIA_SIZE;

                        if (sendAsDoc) {
                            await Gifted.sendMessage(
                                from,
                                {
                                    document: { url: videoUrl },
                                    fileName: `twitter_video_${videoUrls[index].quality}.mp4`,
                                    mimetype: "video/mp4",
                                },
                                { quoted: messageData },
                            );
                        } else {
                            await Gifted.sendMessage(
                                from,
                                {
                                    video: { url: videoUrl },
                                    mimetype: "video/mp4",
                                },
                                { quoted: messageData },
                            );
                        }
                    }

                    await react("✅");
                } catch (error) {
                    console.error("Twitter download error:", error);
                    await react("❌");
                    await reply(
                        "Failed to download. Please try again.",
                        messageData,
                    );
                }
            };

            Gifted.ev.on("messages.upsert", handleResponse);
            setTimeout(
                () => Gifted.ev.off("messages.upsert", handleResponse),
                300000,
            );
        } catch (error) {
            console.error("Twitter API error:", error);
            await react("❌");
            return reply("An error occurred. Please try again.");
        }
    },
);

gmd(
    {
        pattern: "ig",
        category: "downloader",
        react: "📸",
        aliases: ["insta", "instadl", "igdl", "instagram"],
        description: "Download Instagram reels/videos",
    },
    async (from, Gifted, conText) => smdHandle(from, Gifted, conText, "instagram"),
);

gmd(
    {
        pattern: "snack",
        category: "downloader",
        react: "🍿",
        aliases: ["snackdl", "snackvideo"],
        description: "Download Snack Video",
    },
    async (from, Gifted, conText) => {
        const {
            q,
            mek,
            reply,
            react,
            botName,
            botFooter,
            newsletterJid,
            gmdBuffer,
            toAudio,
            formatAudio,
            GiftedTechApi,
            GiftedApiKey,
        } = conText;

        if (!q) {
            await react("❌");
            return reply("Please provide a Snack Video URL");
        }

        if (!q.includes("snackvideo.com")) {
            await react("❌");
            return reply("Please provide a valid Snack Video URL");
        }

        try {
            const apiUrl = `${GiftedTechApi}/api/download/snackdl?apikey=${GiftedApiKey}&url=${encodeURIComponent(q)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (!response.data?.success || !response.data?.result) {
                await react("❌");
                return reply(
                    "Failed to fetch video. Please check the URL and try again.",
                );
            }

            const { title, media, thumbnail, author, like, comment, share } =
                response.data.result;

            if (!media) {
                await react("❌");
                return reply("No video found.");
            }

            const dateNow = Date.now();

            await sendButtons(Gifted, from, {
                title: `${botName} SNACK VIDEO`,
                text: `*Title:* ${title || "Snack Video"}\n*Author:* ${author || "Unknown"}\n*Likes:* ${like || "0"}\n\n*Select download type:*`,
                footer: botFooter,
                image: { url: thumbnail },
                buttons: [
                    { id: `sn_video_${dateNow}`, text: "Video" },
                    { id: `sn_audio_${dateNow}`, text: "Audio Only" },
                ],
            });

            const handleResponse = async (event) => {
                const messageData = event.messages[0];
                if (!messageData.message) return;

                const selectedButtonId = extractButtonId(messageData.message);
                if (!selectedButtonId) return;
                if (!selectedButtonId.includes(`_${dateNow}`)) return;

                const isFromSameChat = messageData.key?.remoteJid === from;
                if (!isFromSameChat) return;

                await react("⬇️");

                try {
                    if (selectedButtonId.startsWith("sn_video")) {
                        const fileSize = await getFileSize(media);
                        const sendAsDoc = fileSize > MAX_MEDIA_SIZE;

                        if (sendAsDoc) {
                            await Gifted.sendMessage(
                                from,
                                {
                                    document: { url: media },
                                    fileName: `${(title || "snack_video").replace(/[^\w\s.-]/gi, "")}.mp4`,
                                    mimetype: "video/mp4",
                                    caption: `*${title || "Snack Video"}*`,
                                },
                                { quoted: messageData },
                            );
                        } else {
                            await Gifted.sendMessage(
                                from,
                                {
                                    video: { url: media },
                                    mimetype: "video/mp4",
                                    caption: `*${title || "Snack Video"}*`,
                                },
                                { quoted: messageData },
                            );
                        }
                    } else if (selectedButtonId.startsWith("sn_audio")) {
                        const videoBuffer = await gmdBuffer(media);
                        const audioBuffer = await toAudio(videoBuffer);
                        const fileSize = audioBuffer.length;

                        if (fileSize > MAX_MEDIA_SIZE) {
                            await Gifted.sendMessage(
                                from,
                                {
                                    document: audioBuffer,
                                    fileName: `${(title || "snack_audio").replace(/[^\w\s.-]/gi, "")}.mp3`,
                                    mimetype: "audio/mpeg",
                                },
                                { quoted: messageData },
                            );
                        } else {
                            await Gifted.sendMessage(
                                from,
                                {
                                    audio: audioBuffer,
                                    mimetype: "audio/mpeg",
                                },
                                { quoted: messageData },
                            );
                        }
                    }

                    await react("✅");
                } catch (error) {
                    console.error("Snack Video download error:", error);
                    await react("❌");
                    await reply(
                        "Failed to download. Please try again.",
                        messageData,
                    );
                }
            };

            Gifted.ev.on("messages.upsert", handleResponse);
            setTimeout(
                () => Gifted.ev.off("messages.upsert", handleResponse),
                300000,
            );
        } catch (error) {
            console.error("Snack Video API error:", error);
            await react("❌");
            return reply("An error occurred. Please try again.");
        }
    },
);
