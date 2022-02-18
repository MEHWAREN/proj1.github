// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req,res,next)=>{
  console.log(`\n${req.method} ${req.path} ${req.ip}\n`);
  next();
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.send('hello API');
});

app.get('/api', function(req, res, next){
  var date= Date();
  res.json({utc: date, unix: Date.parse(date)})
})

app.get('/api/:date?', (req,res,next)=>{
  
  if(Number.parseInt(req.params.date)>=0){

    var date = new Date(Number.parseInt(req.params.date));
    res.json({
      unix: req.params.date, 
      utc:  date.toUTCString()
    });
  }
  else if(!Number.parseInt(req.params.date)){
    res.json({
      utc: req.params.date,
      unix: Date.parse(req.params.date)
    });
  }
  else {
    res.json({ error : "Invalid Date" });
  }
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});






// listen for requests :)
var port= process.env.PORT | 3500;
var listener = app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});