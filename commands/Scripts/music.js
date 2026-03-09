const axios = require('axios');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');

const cacheFolder = path.resolve(__dirname, './cache');

if (!fs.existsSync(cacheFolder)) {
 fs.mkdirSync(cacheFolder);
}

module.exports = {
 name: 'music',
 description: 'Search and download audio from YouTube',
 cooldown: 5,
 permission: 0,
 dmUser: true,
 run: async ({ sock, m, args }) => {
 if (!args.length) {
 return m.reply('Please provide a search term or YouTube URL.');
 }

 const query = args.join(' ');
 const searchingMessage = await sock.sendMessage(m.key.remoteJid, { text: 'Searching...' });

 try {
 const searchResults = await yts(query);
 const video = searchResults.videos[0];

 if (!video) {
 await sock.sendMessage(m.key.remoteJid, { text: 'No results found for your query.' });
 return;
 }

 const response = await axios.get(`https://jonellpogi.serv00.net/ytv.php?url=${video.url}`);
 const { status, audio, title, author } = response.data;

 if (status !== 'true') {
 await sock.sendMessage(m.key.remoteJid, { text: 'Failed to fetch the audio file. Please try again later.' });
 return;
 }

 const audioFilePath = path.join(cacheFolder, `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp3`);
 const audioResponse = await axios.get(audio, { responseType: 'stream' });

 const writer = fs.createWriteStream(audioFilePath);
 audioResponse.data.pipe(writer);

 writer.on('finish', async () => {
 await sock.sendMessage(m.key.remoteJid, {
 audio: { url: audioFilePath },
 mimetype: 'audio/mp4',
 ptt: false,
 });

 // Send the caption with correct music artist details
 await m.reply(`🎵 Here is your music:\n\n*Title:* ${title}\n*Duration:* ${video.timestamp}\n*YouTube Link:* ${video.url}`);

 // Automatically delete the "Searching..." message
 await sock.sendMessage(m.key.remoteJid, { delete: searchingMessage.key });
 });

 writer.on('error', async (error) => {
 console.error('Error saving audio file:', error.message);
 await sock.sendMessage(m.key.remoteJid, { text: 'An error occurred while downloading the audio file.' });
 });
 } catch (error) {
 console.error('Error fetching audio:', error.message);
 await sock.sendMessage(m.key.remoteJid, { text: 'An error occurred. Please try again.' });
 }
 },
};