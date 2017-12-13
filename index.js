/* coffee ordering for SEJ over Alexa */

/* Alexa mandatory code */


// main code

'use strict';
// firebase setting
var https = require('https'); // for synchonous call
//var request = require('sync-request');
var firebase = require('firebase');
var admin = require("firebase-admin");
var async = require("async");
var serviceAccount = require("./quickstart-nodejs-a3153-firebase-adminsdk-miz6k-a79aa0ff05.json");
const firebaseHost = "quickstart-nodejs-a3153.firebaseio.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quickstart-nodejs-a3153.firebaseio.com"
});



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCOIdjIrYnWcX_EsK1m7ekMpNFRFdOaQMo",
    authDomain: "quickstart-nodejs-a3153.firebaseapp.com",
    databaseURL: "https://quickstart-nodejs-a3153.firebaseio.com",
    projectId: "quickstart-nodejs-a3153",
    storageBucket: "quickstart-nodejs-a3153.appspot.com",
    messagingSenderId: "387337038873"
  };
 // firebase.initializeApp(config);


exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false; 
    // TODO implement
    console.log('firing...');
    var speechOutput = "test from lambda.";
    var username = "ken";
    /*
    var database = admin.database();
    var ref = database.ref("posts");
    //var key = ref.push();
    var uid = 'YBjxSHLFySS79Uaa78Gr1LQV83h2';
    var speechOutput = "test from lambda.";
    var username = "ken";
    var dt    = new Date();
    var postData = {
        author: 'k8.matsumoto',
        uid: uid,
        body: speechOutput,
        title: username,
        time : dt.toTimeString(),
        starCount: 0
    };  
 
    async.series ([
        function a (callback) {
            ref.push().set(postData);
            callback(null,1);
        },
        function (callback) {
            console.log("after set");
        }
    ], function (err, results) {
        if (err) {
            console.log ("error occurred");
        }
        console.log("all done. " + results);
    }); 
    console.log("finished."); 
    */
    var a = pushFBAsync2(speechOutput, username);
    //pushFBAsynchronous(speechOutput, username);
    //pushFBSynchronous(speechOutput, username);
    //pushFBSynch2(speechOutput, username);
    /*
    return ref.push().set(postData).then(function() {
        console.log ("Data saved successfully.");
    }, function(error) {
        console.log ("Data could not be saved.");                  
    });
    */
    console.log("back to main code :" + a);
    callback(null, 'Hello from Lambda');
};

function pushFBAsync2(speechOutput, username) {
    var database = admin.database();
    var ref = database.ref("posts");
    //var key = ref.push();
    var uid = 'YBjxSHLFySS79Uaa78Gr1LQV83h2';
    var speechOutput = "test from lambda.";
    var username = "ken";
    var dt    = new Date();
    var postData = {
        author: 'k8.matsumoto',
        uid: uid,
        body: speechOutput,
        title: username,
        time : dt.toTimeString(),
        starCount: 0
    };  
 
    async.series ([
        function a (callback) {
            ref.push().set(postData);
            callback(null,1);
        },
        function (callback) {
            console.log("after set");
        }
    ], function (err, results) {
        if (err) {
            console.log ("error occurred");
        }
        console.log("all done. " + results);
    }); 
    console.log("finished."); 
}

function pushFBAsynchronous(speechOutput, username) {
    var database = firebase.database();
    var ref = database.ref("posts");
    //var key = ref.push();
    var uid = 'YBjxSHLFySS79Uaa78Gr1LQV83h2';
    var speechOutput = "test from lambda.";
    var username = "ken";
    var dt    = new Date();
    var postData = {
        author: 'k8.matsumoto',
        uid: uid,
        body: speechOutput,
        title: username,
        time : dt.toTimeString(),
        starCount: 0
    }; 
    return ref.push().set(postData).then(function() {
        console.log ("Data saved successfully.");
    }, function(error) {
        console.log ("Data could not be saved." + error);                  
    });
}

function pushFBSynchronous(speechOutput, username) {
    return new Promise((resolve, reject) => {
        
    var database = firebase.database();
    var ref = database.ref("posts");
    //var key = ref.push();
    var uid = 'YBjxSHLFySS79Uaa78Gr1LQV83h2';
    var postData = {
        author: 'k8.matsumoto',
        uid: uid,
        body: speechOutput,
        title: username,
        starCount: 0
    };
    var options = {
        hostname: firebaseHost,
        port: 443,
        path: "posts.json",
        method: 'POST'
    };
    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body)
        });
    });
    req.end(JSON.stringify(postData));
    req.on('error', reject);
    });
}

function pushFBAdminSynchronous(speechOutput, username) {
    //var database = admin.database();
    var ref = database.ref("posts");
    //var key = ref.push();
    var uid = 'YBjxSHLFySS79Uaa78Gr1LQV83h2';
    var postData = {
        author: 'k8.matsumoto',
        uid: uid,
        body: speechOutput,
        title: username,
        starCount: 0
    };
    var options = {
        hostname: firebaseHost,
        port: 443,
        path: "posts.json",
        method: 'PUT'
    };
    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            console.log(body);
        });
    });
    req.end(JSON.stringify(postData));
    console.log("pushFBSynchronous called");
    return;
}