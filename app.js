var request = require('request');
var express = require('express');
var axios = require('axios');
var http = require('http');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var window = require('window');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// create a new express server
var app = express();
// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var values = require('object.values');
var numdevice;
var jsontime ="test" ;
var jsondata;
var jsondevice;

/*writeHead(200, { 'Content-Type': 'text/html' });
res.write('test1' + dataresp1);
utilisé pour afficher de l'html
*/



/* On utilise les sessions */
app.use(session({secret :'badissecret'}))

/* S'il n'y a pas de todolist dans la session,
 on en crée une vide sous forme d'array avant la suite */
    .use(function(req, res, next){
        if (typeof(req.session.tableaucallback) === 'undefined') {
            req.session.tableaucallback = [];

        }
        if(typeof(req.session.tableaucallback2) === 'undefined') {
            req.session.tableaucallback2 =[];
        }
        next();
    })

    /* On affiche la todolist et le formulaire */
    .get('/asking', function(req, res) {
        res.render('asking.ejs', {tableaucallback: req.session.tableaucallback});

    })

    /* On ajoute un élément à la todolist */
    .post('/asking/ajouter/', urlencodedParser, function(req, res) {

        if(req.body.deviceid !== '') {

            numdevice = req.body.deviceid; //recuperation de la valeur du device id

             // push du device id dans le array tableaucallback
            //envoi de la requete GET et récupération dans une variable

            axios
                .get('https://backend.sigfox.com/api/devices/' + numdevice + '/messages?limit=1', {
                        auth: {
                            username: '5937bc6f9e93a13f76ef0764',
                            password: '49bd406abd0da432b87cc7a9e9efe4df'
                        },
                        responseType: 'json'
                    }
                )
                .then( function(response){

                    console.log(response.data);
                    console.log(response.data['data'][0]['time']); //on affiche uniquement le time si nous avons
                                                    // plusieur messages il faudra creer une boucle for et remplacer le "0" par "i"


                    jsontime = response.data['data'][0]['time'];
                    jsondata = response.data['data'][0]['data'];
                    jsondevice = response.data['data'][0]['device'];

                    //parse les datas
                    //render les parses dans l'html
                })
        }
            res.redirect('/asking')

    })



    /* Supprime un élément de la todolist */
    .get('/asking/supprimer/:id', function(req, res) {
        if (req.params.id !== '') {
            req.session.tableaucallback.splice(req.params.id, 1);
        }
        res.redirect('/asking');
    })

    /* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function(req, res, next){
        res.redirect('/asking');
    });

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);

});
