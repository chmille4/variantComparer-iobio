#!/usr/bin/env node

// initialize server
var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

// setup socket
var io = require('socket.io').listen(server);

// start server
server.listen(8070);

// setup server
app.use('/', express.static(__dirname));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/test', function (req, res) {
  res.sendfile(__dirname + '/d3test.html');
});