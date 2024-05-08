const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const ejs = require("ejs");

// youtube API
const youtube = require("../youtube");



// middleware
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// routing
app.get("/", async (req, res) => {
    let channel = await youtube.getChannelData();
    let topViewed = await youtube.getTopViewedData();
    res.render("index.ejs", {channel: channel, topViewed: topViewed});
});

app.get("/aboutme", (req, res) => {
    res.render("AboutMe.ejs");
});

app.post("/send-data", async(req, res) => {
    const tab_id = req.body.data; // Get the data sent from the frontend
    const id = parseInt(tab_id)-1;
    let data = await youtube.getYoutubeDataByPlaylist(id);

    res.json(data);
})

app.get("/project", async(req, res) => {
    let data = await youtube.getYoutubeDataByPlaylist(0);
    // console.log(data);
    res.render("Project.ejs", {data});
});

app.get("/contact", (req, res) => {
    res.render("Contact.ejs");
});


app.get("*", (req, res) => {
	res.status(404);
    // console.log(res.statusCode);
    let code = res.statusCode;
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



