'use strict';

var express = require('express');
var multer  = require('multer');
var removeFiles = require('./utils/removefiles');
var app = express();

app.use(express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
    res.sendFile(process.cwd() + '/index.html');
});

app.use(function(req,res,next){
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });
    next();
});

app.post('/api/fileanalyse', multer({dest: './uploads/'}).any(), function(req, res, next){
    var file = req.files[0];
    console.log('[meta-file] file has been uploaded', file);
    var output = {
        originalname: file.originalname || "no name found",
        size: file.size || "no size found"
    };
    res.send(output);
    removeFiles(process.cwd()+'/uploads/'); //no need to save these files
});

app.use(function(req, res) {
    res.status(404).send("uh-oh! Could not find that path..");
});

var port = process.env.PORT || 3000;
app.listen( port, function () {
    console.log('[meta-file] Node.js listening on port ' + port + '...');
});

