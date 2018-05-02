var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');


 module.exports = function(app){

          // Serve App
        var port = 5000;
        app.listen(port, function() {
          console.log('running at localhost:' + port);
        });


        //This code is only for making localhost secure server

        var sslOptions = {
          key: fs.readFileSync('key.pem','utf8'),
          cert: fs.readFileSync('cert.pem','utf8'),
          passphrase: 'nishant'
        };

        https.createServer(sslOptions, app).listen(3000);

 };