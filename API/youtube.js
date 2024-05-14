const API_KEY = "AIzaSyBdxx-qUvI6-uiXcIwwArl6_VkL2Y8TW20";
const CHANNEL_ID = "UCeyGqH_5jRB1q5c0cZKWhiQ";

const fetch = require("node-fetch");
const localStorage = require('node-localstorage').LocalStorage;
const storage = new localStorage('./data');

async function saveToLocal() {
    let channelData = await getChannelData();
    let latestData = await getLatestVData();
    let allPlaylistData = await getAllPlaylistData();
    await new Promise(resolve => setTimeout(resolve, 1000));
    let top10 = await countPopularVideos();


    storage.setItem('channel', JSON.stringify(channelData));
    storage.setItem('latest', JSON.stringify(latestData));
    storage.setItem('playlist', JSON.stringify(allPlaylistData));
    storage.setItem('top10', JSON.stringify(top10));
}

async function getAllPlaylistData() {
    try {
        let playlist = ["PLdfk1T6U5Zuo-GcyxBsA_aMInsy7r-Owk", "PLdfk1T6U5ZuothN0pxnsac3H0zkGeM7d4", "PLdfk1T6U5ZuothN0pxnsac3H0zkGeM7d4", "PLdfk1T6U5ZurU1rZpvvu8DyST1-01MYq0", "PLdfk1T6U5ZuoKVgtQNshar4sULiX40NUJ", "PLdfk1T6U5Zuru1ulidscYLzKnma7UljlY"]
        const allPlaylistDataPromises = playlist.map(async (playlist_id) => {
            let playlistItems_url = `https://www.googleapis.com/youtube/v3/playlistItems?order=date&part=snippet,contentDetails&playlistId=${playlist_id}&maxResults=50&key=${API_KEY}`;
            let d = await fetch(playlistItems_url);
            let djs = await d.json();
            let items = djs.items;
            let playlistItems = [];

            items.map(item => {
                const element = item.snippet;
                const video_id = item.contentDetails.videoId;
                if (checkPrivateVideo(element.title)) {
                    playlistItems.push({playlist_id, video_id});
                }
                else {
                    return null;
                }
            }).filter(Boolean);
            await new Promise(resolve => setTimeout(resolve, 2000));
            let statistics = getYoutubeDataByVideoId(playlistItems);
            return statistics;
        });
        const allPlayListData = await Promise.all(allPlaylistDataPromises);
        // const dataSizeInBytes = new TextEncoder().encode(allPlayListData).length;
        // console.log(dataSizeInBytes);
        const uniqueArray = filterDuplicateObjects(allPlayListData.flat());
        return uniqueArray;
    }
    catch(err) {
        console.log("getAllPlaylistData Error: ", err);
    }
}

async function getYoutubeDataByPlaylist(id) {
    try {
        let playlists = await JSON.parse(storage.getItem('playlist'));
        let playlist;
        if (id == 0) playlist = playlists.filter(i => i.playlist_id === 'PLdfk1T6U5Zuo-GcyxBsA_aMInsy7r-Owk');
        if (id == 1) playlist = playlists.filter(i => i.playlist_id === 'PLdfk1T6U5ZuothN0pxnsac3H0zkGeM7d4');
        if (id == 2) playlist = playlists.filter(i => i.playlist_id === 'PLdfk1T6U5ZurU1rZpvvu8DyST1-01MYq0');
        if (id == 3) playlist = playlists.filter(i => i.playlist_id === 'PLdfk1T6U5ZuoKVgtQNshar4sULiX40NUJ');
        if (id == 4) playlist = playlists.filter(i => i.playlist_id === 'PLdfk1T6U5Zuru1ulidscYLzKnma7UljlY');
                

    
        // console.log(playlist);
        return playlist;
        
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

async function getYoutubeDataByVideoId(playlistItems) {
    try {
        const statisticPromises = playlistItems.map(async(i) => {
            let video_url= `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${i.video_id}`;
            let v = await fetch(video_url);
            let vjs = await v.json();
            let items = vjs.items;
            return items.map(item => {
                const element = item.snippet;
                // console.log(element);
                return {
                    img_link: checkThumbNails(element.thumbnails),
                    video_title: element.title,
                    video_time: new Date(element.publishedAt).toGMTString().split("GMT")[0],
                    video_des: element.description ,
                    video_link: "https://www.youtube.com/video/"+i.video_id,
                    video_id: i.video_id,
                    view_count: vjs.items[0].statistics.viewCount,
                    like_count: vjs.items[0].statistics.likeCount,
                    playlist_id: i.playlist_id
                }
            })
        });
        // Wait for all promises to resolve
        const statistics = await Promise.all(statisticPromises);
        // Flatten the array of arrays into a single array of objects
        return statistics.flat();
    }
    catch (error) {
        console.log("getYoutubeDataByVideoId Error: " + error);
    }
}

// Function to filter out duplicate objects
function filterDuplicateObjects(array) {
    const uniqueArray = array.reduce((accumulator, currentValue) => {
        // Check if the current object is already present in the accumulator
        const duplicate = accumulator.find(obj => {
            // Implement your custom logic to check for uniqueness here
            return obj.video_id === currentValue.video_id; 
        });

        // If the current object is not a duplicate, add it to the accumulator
        if (!duplicate) {
            accumulator.push(currentValue);
        }

        return accumulator;
    }, []);

    return uniqueArray;
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

async function countPopularVideos() {
    const all = await getAllPlaylistData();
    all.sort((a, b) => {
        return parseInt(b.view_count) - parseInt(a.view_count);
    });
    const top10 = all.slice(0, 10);
    // console.log(top10);
    return top10;
}

async function getLatestVData() {
    try{
        let url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&&maxResults=10&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        let d = await fetch(url)
        let djs = await d.json();
        let items = djs.items;

        const latestData = items.map(i => {
            let video_id = i.id.videoId;
            return {
                img_link: checkThumbNails(i.snippet.thumbnails),
                video_title: i.snippet.title,
                video_link: "https://www.youtube.com/video/"+video_id
            }
        });
        return latestData;
    }
    catch (err) {
        console.log("getLatestVData: " + err);
    }
}
exports.getYoutubeDataByPlaylist = getYoutubeDataByPlaylist;
exports.saveToLocal = saveToLocal;
exports.getLatestVData = getLatestVData;

