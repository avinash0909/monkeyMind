'use strict';

//REQUIRED FOR OPENSHIFT - START
var port        = process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ipaddress   = process.env.OPENSHIFT_NODEJS_IP || 0;
//REQUIRED FOR OPENSHIFT - END
//ERSIONING EXPLAINED ^x.x.x or ~x.x.x -->http://www.jakobm.com/semver-in-nodejs-and-npm
var http            = require('http');
var express         = require('express');
var bcrypt          = require('bcrypt-nodejs');
var mongodb         = require('mongodb');
var MongoClient     = require('mongodb').MongoClient;
var WebSocketServer = require('ws').Server;
var ObjectId        = mongodb.ObjectID;

var router          = require('./router.js');
var app             = express();
var server          = http.createServer(app);
var wss = new WebSocketServer({server: server});
var appVersion      = "1";






var connection_string = '127.0.0.1:27017/ccrews';
MongoClient.connect('mongodb://'+connection_string+'?w=1', function(err, db_server) {
    if(err) throw err;
    router(app,wss,db_server,bcrypt,appVersion);
    console.log("database connection open...");
});


if (ipaddress !== 0) {
    server.listen(port, ipaddress, function() {
        console.log('%s: Node server via OPENSHIFT started on %s:%d, in %s mode.',
                    Date(Date.now() ), ipaddress, port, app.settings.env);
    });
}//SERVER LISTENING FOR OPENSHIFT - END
else{//SERVER LISTENING FOR LOCAL MACHINE - START
    server.listen(port);//USE THIS FOR HOME TESTING
    console.log('Node server via LOCAL started on %d, in %s mode.', port, app.settings.env);
}//SERVER LISTENING FOR LOCAL MACHINE - END