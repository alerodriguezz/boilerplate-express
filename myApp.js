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
//json contents
app.get("/json",function(req, res) {
  if ( process.env['MESSAGE_STYLE']=== "uppercase"){
  response = "Hello json".toUpperCase();
}
else{
  response = "Hello json";
}
  res.json({"message":response});
});
//retrieves index.html file
app.get("/",function(req, res) {
  res.sendFile(absolutePath);
});

const mySecret = process.env['MESSAGE']



















 module.exports = app;
