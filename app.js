const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const $ = require("jquery");
const fetch = require("node-fetch");

// Youtube API
const getYoutube = require("./youtube");
const API_KEY = "AIzaSyBdxx-qUvI6-uiXcIwwArl6_VkL2Y8TW20";
const CHANNEL_ID = "UCeyGqH_5jRB1q5c0cZKWhiQ";

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// routing
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/aboutme", (req, res) => {
    res.render("AboutMe.ejs");
});

app.post("/send-data", async(req, res) => {
    const tab_id = req.body.data; // Get the data sent from the frontend
    const id = parseInt(tab_id)-1;
    let data = await getYoutubeDataByPlaylist(id);

    res.json(data);
})

app.get("/project", async(req, res) => {
    let data = await getYoutubeDataByPlaylist(0);
    // console.log(data);
    res.render("Project.ejs", {data});
});

app.get("/contact", (req, res) => {
    res.render("Contact.ejs");
});


app.get("*", (req, res) => {
	res.status(404);
    // console.log(res.statusCode);
    code = res.statusCode;
    res.render("common.ejs", {code:code});
    // res.sendFile(__dirname + "/common.html");
});



app.post("/submitted", (req, res) => {
    let {name, email, subject, content} = req.body;
    res.render("common.ejs", {name: name, code: res.statusCode});
})

app.listen(2000, () => {
    console.log("on port 2000");
});



async function getYoutubeDataByPlaylist(id) {
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
    let video_id_list = []; 
    let img_link_list = [];
    let video_title_list = [];
    let video_time_list = [];
    let video_des_list = [];
    let video_link_list = [];
    items.map(item => {
        const element = item.snippet;
        const video_id = item.contentDetails.videoId;
        if (checkPrivateVideo(element.title)) {
            video_id_list.push(video_id);
            img_link_list.push(checkThumbNails(element.thumbnails));
            video_title_list.push(element.title);
            video_time_list.push(new Date(element.publishedAt).toGMTString().split("GMT")[0]);
            video_des_list.push(element.description);
            video_link_list.push("https://www.youtube.com/video/"+video_id);
        }
        else {
            return null; // Exclude the item if it doesn't meet the condition
        }
    }).filter(Boolean); // Filter out null values

    // Wait for a certain amount of time using setTimeout
    await new Promise((resolve) => {
        setTimeout(resolve, 3000); // Wait for 3 seconds
    });
    allDataObject = [];
    for(let i = 0 ; i < video_id_list.length; i++) {
        let player = await getYoutubeDataByVideoId(video_id_list[i]);
        const dataObject =  {
            img_link: img_link_list[i],
            video_title: video_title_list[i],
            video_time: video_time_list[i],
            video_des: video_des_list[i] ,
            video_link: video_link_list[i],
            video_player: player
        }
        allDataObject.push(dataObject);
    }

    return allDataObject;
}

async function fetchApis() {
    try {
      // Fetch the first API
      const response1 = await fetch('first_api_url');
      const data1 = await response1.json();
  
      // Process the result of the first API
      const result1 = data1.someData;
  
      // Wait for a certain amount of time using setTimeout
      await new Promise((resolve) => {
        setTimeout(resolve, 3000); // Wait for 3 seconds
      });
  
      // Fetch the second API using the result of the first API
      const response2 = await fetch(`second_api_url/${result1}`);
      const data2 = await response2.json();
  
      // Process the result of the second API
      const result2 = data2.someData;
  
      // Do something with the final result
      console.log(result2);
    } catch (error) {
      console.error('Error:', error);
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



async function getYoutubeAPI() {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&key=${API_KEY}`;
    let d = await fetch(url)
    let djs = await d.json();
    // console.log(djs);
    //console.log(djs.items);
    
}