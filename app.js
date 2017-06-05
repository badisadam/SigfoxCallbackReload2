var request = require('request');
var express = require('express');
var axios = require('axios');
var http = require('http');




// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
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
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);

