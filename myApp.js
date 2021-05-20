

var bodyParser = require('body-parser');
var express = require('express');
var app = express();


console.log("Hello World");

absolutePath = __dirname + "/views/index.html"

//mount middlware
      //Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
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
 //Get ROUTE Parameter Input from the Client
app.get('/:word/echo',
   (req, res) => {
    // accessing the newly added property
    // in the main function
    res.json({"echo":req.params.word});
  }
);

 //Get QUERY Parameter Input from the Client e.g ?first=firstname&last=lastname
app.get('/name',
   (req, res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
   
   /* this is also valid...
  var { first: firstName, last: lastName } = req.query;
  */
    res.json({name: `${firstName} ${lastName}` });
  }
);

//Get Data from POST Requests 

app.post('/name',
(req,res) => {
var firstName = req.body.first;
var lastName = req.body.last;

res.json({name: `${firstName} ${lastName}` });
}
);


 module.exports = app;
