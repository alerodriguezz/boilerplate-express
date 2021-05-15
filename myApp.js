var express = require('express');
var app = express();


console.log("Hello World");

absolutePath = __dirname + "/views/index.html"

//mount middlware
app.use("/public", express.static(__dirname + "/public"));

/*
app.get("/",function(req, res) {
  res.send('Hello Express');
});
*/

app.get("/",function(req, res) {
  res.sendFile(absolutePath);
});



















 module.exports = app;
