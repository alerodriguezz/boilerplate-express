var express = require('express');
var app = express();


console.log("Hello World");

absolutePath = __dirname + "/views/index.html"

//mount middlware
app.use("/public", express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {
  // Do something
  // Call the next function in line:
  var string = req.method + " " + req.path + " - " + req.ip;

  console.log(string)
  next();
});
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

//chain middleware to create a time server
app.get('/now', 
(req, res, next) => {
    // adding a new property to req object
    // in the middleware function
    req.string = new Date().toString();
    next();
  },
   (req, res) => {
    // accessing the newly added property
    // in the main function
    res.json({"time":req.string});
  }
);
 //Get Route Parameter Input from the Client

app.get('/:word/echo',
   (req, res) => {
    // accessing the newly added property
    // in the main function
    res.json({"echo":req.params.word});
  }
);












 module.exports = app;
