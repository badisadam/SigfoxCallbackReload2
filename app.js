var request = require('request');
var express = require('express');
var axios = require('axios');
var http = require('http');

var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var dataresp1;
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


    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);

});

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






app.get('/reponse', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('test1' + dataresp1);
});




/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/* S'il n'y a pas de todolist dans la session,
 on en crée une vide sous forme d'array avant la suite */
    .use(function(req, res, next){
        if (typeof(req.session.tableaucallback) == 'undefined') {
            req.session.tableaucallback = [];
        }
        next();
    })

    /* On affiche la todolist et le formulaire */
    .get('/asking', function(req, res) {
        res.render('asking.ejs', {tableaucallback: req.session.tableaucallback});
    })
    /* On ajoute un élément à la todolist */
    .post('/asking/ajouter/', urlencodedParser, function(req, res) {
        if (req.body.deviceid != '') {
            req.session.tableaucallback.push(req.body.deviceid);
        }
        res.redirect('/asking');
    })
    /* Supprime un élément de la todolist */
    .get('/asking/supprimer/:id', function(req, res) {
        if (req.params.id != '') {
            req.session.tableaucallback.splice(req.params.id, 1);
        }
        res.redirect('/asking');
    })

    /* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function(req, res, next){
        res.redirect('/asking');
    });
