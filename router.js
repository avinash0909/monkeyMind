module.exports = function(app,wss,db,bcrypt,appVersion){
    'use strict';
    console.log("The current version in routes  = "+appVersion);

    wss.on('connection', function(ws) {
        ws.on('message', function(message) {
            var wsOrigin = JSON.stringify(decodeURIComponent(ws.upgradeReq.headers.origin));
            console.log("");
            console.log("------- WEBSOCKET BEG --------------");
            console.log("WS MESS.: "+message);
            //console.log("WEBSOCKET HEADERS: "+JSON.stringify(ws.upgradeReq.headers));
            console.log("WS ORIG.: "+wsOrigin);
            console.log("------- WEBSOCKET END --------------");
            console.log("");
            
            
            
        });
    });
};


