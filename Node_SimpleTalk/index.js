const express = require('express')
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Serve a Main Page
app.get('/', function(req, res) {
    console.log(req.body);
    res.send("Node Simple Talk");
});


//Serve the NCCO on the /ncco answer URL
app.get('/ncco', function(req, res) {
    var ncco = [
        {
            "action": "talk",
            "text": "Hello World"
        }
    ];
    res.send(ncco);
});


//Log the Events
app.post('/event', function(req, res) {
    console.log(req.body);
    res.send("ok");
});


app.listen(8000, () => console.log('App listening on port 8000!'))