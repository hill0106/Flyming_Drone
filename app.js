const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const localStorage = require('node-localstorage').LocalStorage;


const PORT = process.env.PORT || 3000;


const storage = new localStorage('./data');

// API
const API = require("./API");


// middleware
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





function scheduleTask() {
    // Set interval to fetch data twice a day (every 12 hours)
    const interval = 1000 * 60 * 60 * 12; // 12 hours in milliseconds
    API.saveToLocal();
    setInterval(API.saveToLocal, interval);
}

scheduleTask();

// routing
app.get("/", (req, res) => {
    
    let channel = JSON.parse(storage.getItem('channel')) ;
    let latest = JSON.parse(storage.getItem('latest'));
    let topViewed = JSON.parse(storage.getItem('top10'));

    res.render("index.ejs", {channel: channel, topViewed: topViewed, latest: latest});

});

app.get("/aboutme", (req, res) => {
    res.render("AboutMe.ejs");
});

app.post("/send-data", async (req, res) => {
    const tab_id = req.body.data; // Get the data sent from the frontend
    const id = parseInt(tab_id)-1;
    let data = await API.getYoutubeDataByPlaylist(id);
    
    res.json(data);
})

app.get("/project", async (req, res) => {
    let data = await API.getYoutubeDataByPlaylist(0);
    // console.log(data);
    res.render("Project.ejs", {data});
});

app.get("/contact", (req, res) => {
    res.render("Contact.ejs");
});


app.get("*", (req, res) => {
	res.status(404);
    let code = res.statusCode;
    res.render("common.ejs", {code:code});
});



app.post("/submitted", async (req, res) => {
    let {name, email, subject, content} = req.body;
    let reply = {name: name, email: email, subject: subject, content: content};
    API.sendEmail(name, email, subject, content);

    res.render("common.ejs", {reply: reply, code: res.statusCode});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



