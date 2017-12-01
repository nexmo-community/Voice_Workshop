const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var expressWs = require('express-ws')(app);
var isBuffer = require('is-buffer')

var header = require("waveheader");
var fs = require('fs');
var file;

var tone = require('tonegenerator')

const Speaker = require('speaker');
var speaker = null;



// Downsample frames from 16Khz to 8Khz
function convert(message){
    var arr = []
    var x = 0;
    var y;
    var i;
    for (i = 0; i < 160; i++) { 
        y = x+2
        arr.push(message.slice(x,y))
        x += 4;
    }
    var data = Buffer.concat(arr);
    return data
}

//Serve a Main Page
app.get('/', function(req, res) {
    res.send("Node Websocket");
});


//Serve the NCCO on the /ncco answer URL
app.get('/ncco', function(req, res) {
    var ncco = require('./ncco.json');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ncco), 'utf-8');
});


//Log the Events
app.post('/event', function(req, res) {
    console.log(req.body);
    res.send("ok");
});

// Handle the Websocket
app.ws('/socket', function(ws, req) {
  console.log("Websocket Connected") 
  file = fs.createWriteStream('./output.wav');
  file.write(header(8000 * 30 * 2,{ 
                    sampleRate: 8000,
                    channels: 1,
                    bitDepth: 16})); 
  ws.on('message', function(msg) {
     if (isBuffer(msg)) {
             file.write(convert(msg));
     }
     else {
         console.log(msg);
         var tonedata = tone(440, 1, volume = tone.MAX_16, sampleRate = 16000)
         var i,j,sample,chunk = 640;
         for (i=0,j=tonedata.length; i<j; i+=chunk) {
             sample = tonedata.slice(i,i+chunk);
             ws.send(sample);
         }
     }
  });
});

app.listen(8000, () => console.log('App listening on port 8000!'))




