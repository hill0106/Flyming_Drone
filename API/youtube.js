const API_KEY = "AIzaSyBdxx-qUvI6-uiXcIwwArl6_VkL2Y8TW20";
const CHANNEL_ID = "UCeyGqH_5jRB1q5c0cZKWhiQ";
const fetch = require("node-fetch");

async function getYoutubeDataByPlaylist(id) {
    try {
        const playlist_id_0 = "PLdfk1T6U5Zuo-GcyxBsA_aMInsy7r-Owk"; //鐵道
        const playlist_id_1 = "PLdfk1T6U5ZuothN0pxnsac3H0zkGeM7d4"; //水庫
        const playlist_id_2 = "PLdfk1T6U5ZurU1rZpvvu8DyST1-01MYq0"; //海濱
        const playlist_id_3 = "PLdfk1T6U5ZuoKVgtQNshar4sULiX40NUJ"; //山上
        const playlist_id_4 = "PLdfk1T6U5Zuru1ulidscYLzKnma7UljlY"; //城郊
        let playlist_id = "";
        if (id == 0) playlist_id = playlist_id_0;
        if (id == 1) playlist_id = playlist_id_1;
        if (id == 2) playlist_id = playlist_id_2;
        if (id == 3) playlist_id = playlist_id_3;
        if (id == 4) playlist_id = playlist_id_4;

        let playlistItems_url = `https://www.googleapis.com/youtube/v3/playlistItems?order=date&part=snippet,contentDetails&playlistId=${playlist_id}&maxResults=10&key=${API_KEY}`;
        let d = await fetch(playlistItems_url);
        let djs = await d.json();
        let items = djs.items;

        const allDataObject = items.map(item => {
            const element = item.snippet;
            const video_id = item.contentDetails.videoId;
            if (checkPrivateVideo(element.title)) {
                return {
                    img_link: checkThumbNails(element.thumbnails),
                    video_title: element.title,
                    video_time: new Date(element.publishedAt).toGMTString().split("GMT")[0],
                    video_des: element.description ,
                    video_link: "https://www.youtube.com/video/"+video_id
                }
            }
            else {
                return null;
            }
        }).filter(Boolean);

        return allDataObject;
    }
    catch (err) {
        console.log("getYoutubeDataByPlaylist Error: " + err);
    }
}

async function getChannelData() {
    try {
        let channel_url = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${CHANNEL_ID}`;
        let d = await fetch(channel_url);
        let djs = await d.json();
        let items = djs.items;
        let channelData = {}
        items.map(item => {
            channelData = {
                viewCount: Number(item.statistics.viewCount).toLocaleString(),
                subscriberCount: Number(item.statistics.subscriberCount).toLocaleString(),
                videoCount: Number(item.statistics.videoCount).toLocaleString()
            }
        });
        return channelData;
    }
    catch (err) {
        console.log("getChannelData Error: " + err);
    }

    
}


async function getYoutubeDataByVideoId(id) {
    try {
        let video_id = id;
        let video_url= `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,player&id=${video_id}`;
        let v = await fetch(video_url);
        let vjs = await v.json();
        let player = vjs.items[0].player.embedHtml;
        player = player.replace("//", "https://");
        player = player.replace('referrerpolicy="strict-origin-when-cross-origin"','');
        return player;
    }
    catch (error) {
        console.log("getYoutubeDataByVideoId Error: " + error);
    }
}

function checkThumbNails(thumbnails) {
    let url = "";
    if (thumbnails.maxres != undefined) url = thumbnails.maxres.url;
    else if (thumbnails.high != undefined) url = thumbnails.high.url;
    else if (thumbnails.standard != undefined) url = thumbnails.standard.url;
    return url;
}

function checkPrivateVideo(title) {
    if(title != "Private video") return true;
    else return false;
}



async function getTopViewedData() {
    try{
        let url = `https://www.googleapis.com/youtube/v3/search?order=viewCount&part=snippet&videoDefinition=any&maxResults=10&videoLicense=any&videoType=any&videoDuration=any&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        let d = await fetch(url)
        let djs = await d.json();
        let items = djs.items;

        const topViewedData = items.map(i => {
            let video_id = i.id.videoId;
            return {
                img_link: checkThumbNails(i.snippet.thumbnails),
                video_title: i.snippet.title,
                video_link: "https://www.youtube.com/video/"+video_id
            }
        });

        
        return topViewedData;
    }
    catch (err) {
        console.log("getTopViewedData: " + err);
    }
}
exports.getYoutubeDataByPlaylist = getYoutubeDataByPlaylist;
exports.getChannelData = getChannelData;
exports.getTopViewedData = getTopViewedData;
