const express = require("express");
const mysql   = require("mysql");
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
	let users = await getUsers();
	console.log(users);
	res.render("homepage");
});







// Functions
function getUsers() {

    let conn = dbConnection();

    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            let sql = `SELECT * FROM users`;
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                conn.end();
                resolve(rows);
            });

        }); //connect
    }); //promise
}


//starting server
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

function dbConnection(){

    let conn = mysql.createConnection({
        host: "us-cdbr-east-03.cleardb.com",
        user: "b8aa7ee8c79dad",
        password: "5d3814fe",
        database: "heroku_5c8b21f5693740d"
    }); //createConnection

    return conn;

}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});