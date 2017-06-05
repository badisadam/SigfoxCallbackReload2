var request = require('request');
var express = require('express');
var axios = require('axios');
var http = require('http');
var path = require('path');


var dataresp1;
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();




 axios.get('https://backend.sigfox.com/api/groups', {
    auth: {
        username: '58ef64549e93a17a4a7e01b2',
        password: '4837428854ea5bdb0ff08e0cd7716906'
    },
    responseType: 'json'
}).then(function (res) {

    dataresp2 = res.data;
dataresp1 = JSON.stringify(dataresp2);
    console.log(res.data);



});

app.get('/', function(req, res) {

    //res.sendFile(path.join('/index.html'));


    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('test1' + dataresp1);
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {


    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);

});