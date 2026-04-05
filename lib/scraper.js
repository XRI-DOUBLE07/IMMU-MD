import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';

/**
 * Facebook Video Downloader
 * @param {string} url - Facebook video link
 */
async function facebookDl(url) {
    try {
        let res = await fetch('https://fdownloader.net/');
        let $ = cheerio.load(await res.text());
        let token = $('input[name="__RequestVerificationToken"]').val();

        let response = await fetch('https://fdownloader.net/api/ajaxSearch', {
            method: 'POST',
            headers: {
                'cookie': res.headers.get('set-cookie'),
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'referer': 'https://fdownloader.net/'
            },
            body: new URLSearchParams({ '__RequestVerificationToken': token, 'q': url })
        });

        let result = await response.json();
        let $dl = cheerio.load(result.data);
        let links = {};

        $dl('.button.is-success.is-small.download-link-fb').each(function() {
            let quality = $dl(this).attr('title').split(' ')[1];
            let link = $dl(this).attr('href');
            if (link) links[quality] = link;
        });
        return links;
    } catch (e) {
        return { error: e.message };
    }
}

/**
 * TikTok User Stalker
 * @param {string} username - TikTok ID
 */
async function tiktokStalk(username) {
    try {
        let res = await axios.get(`https://urlebird.com/user/${username}/`);
        let $ = cheerio.load(res.data);
        return {
            pp_user: $('div.user__img').attr('style')?.replace('background-image: url(\'', '').replace('\');', ''),
            name: $('div.user__title > h1').text().trim(),
            username: $('div.user__title > h4').text().trim(),
            followers: $('div.user__info-desc').eq(0).text().trim().split(' ')[0],
            following: $('div.user__info-desc').eq(1).text().trim().split(' ')[0],
            description: $('div.content > p').text().trim()
        };
    } catch (e) {
        return { error: "User not found" };
    }
}

/**
 * Instagram Profile Stalker
 * @param {string} username
 */
async function igStalk(username) {
    try {
        username = username.replace(/^@/, '');
        let res = await fetch(`https://dumpor.com/v/${username}`);
        let $ = cheerio.load(await res.text());
        
        let stats = $('ul.list > li.list__item');
        return {
            name: $('div.user__title > a > h1').text().trim(),
            username: $('div.user__title > h4').text().trim(),
            description: $('div.user__info-desc').text().trim(),
            posts: stats.eq(0).text().replace(/Posts/i, '').trim(),
            followers: stats.eq(1).text().replace(/Followers/i, '').trim(),
            following: stats.eq(2).text().replace(/Following/i, '').trim(),
            profilePic: $('#user-page img').attr('src')
        };
    } catch (e) {
        return { error: "Could not fetch Instagram data" };
    }
}

/**
 * AI Chat (ChatGPT)
 */
async function ChatGpt(prompt, systemMessage = "You are a helpful assistant") {
    try {
        const response = await fetch('https://chatapicn.a3r.fun/api/chat-process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://2chat.c3r.ink/'
            },
            body: JSON.stringify({
                prompt: prompt,
                options: {},
                systemMessage: systemMessage,
                uuid: Date.now()
            })
        });
        return await response.json();
    } catch (e) {
        return { error: "AI Service Unavailable" };
    }
}

/**
 * XNXX Video Search
 */
async function xnxxSearch(query) {
    try {
        const base = 'https://www.xnxx.com';
        let res = await fetch(`${base}/search/${query}/${Math.floor(Math.random() * 3) + 1}`);
        let $ = cheerio.load(await res.text());
        let results = [];

        $('div.mozaique > div.thumb-under').each(function() {
            results.push({
                title: $(this).find('p.title a').attr('title'),
                link: base + $(this).find('p.title a').attr('href')
            });
        });
        return results;
    } catch (e) {
        return [];
    }
}

export { 
    facebookDl, 
    tiktokStalk, 
    igStalk, 
    ChatGpt, 
    xnxxSearch 
};
