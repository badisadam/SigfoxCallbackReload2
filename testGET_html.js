// JavaScript source 


var express = require('express');
var axios = require('axios');
var app = express();
var http = require('http');




app.get('/', function (req, res) {
    var dataresp1;  axios.get('https://backend.sigfox.com/api/groups', {
        auth: {
            username: '58ef64549e93a17a4a7e01b2',
            password: '4837428854ea5bdb0ff08e0cd7716906'
        },
        responseType: 'json'
    }).then(function (response) {
        var dataresp = response.data;
        console.log(dataresp);
        
            

    });
    
});

    app.listen(8080)
