// JavaScript source code


var express = require('express');
var axios = require('axios')
var app = express();

app.get('/', function (req, res) {
    axios.get('https://backend.sigfox.com/api/groups', {
        auth: {
            username:'58ef64549e93a17a4a7e01b2',
            password: '4837428854ea5bdb0ff08e0cd7716906'
        },
        responseType: 'json'
    }).then(
function (req, res) {
    
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});
});
    app.listen(8080);