const express = require("express");
const app = express();
const session = require('express-session');
// const distance = require('google-distance-matrix');

app.set("view engine", "ejs");
app.use(express.static("public")); //folder for img, css, js

app.use(express.urlencoded()); //use to parse data sent using the POST method
app.use(session({ secret: 'any word', cookie: { maxAge: 10000 * 60 * 5 * 60}}));
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.session.authenticated;
    next();
});

app.get("/", async function(req, res) {
	res.render("homepage");
});


//starting server
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});