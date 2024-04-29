const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const $ = require("jquery");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/aboutme", (req, res) => {
    res.render("AboutMe.ejs");
});

app.get("/project", (req, res) => {
    res.render("Project.ejs");
});

app.get("/contact", (req, res) => {
    res.render("Contact.ejs");
});


app.get("*", (req, res) => {
	res.status(404);
    console.log(res.statusCode);
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

