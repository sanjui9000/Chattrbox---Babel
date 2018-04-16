var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server'); // eslint-disable-line no-unused-vars
var mime = require('mime');

var handleError = function(err, res) {
  var filePath = extract('/error.html');
  var mimeResult = mime.lookup(filePath);
  res.setHeader('Content-Type', mimeResult);
  res.writeHead(404);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log('There is some issue with server!');
      return;
    } else {
      res.end(data);
    }
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      var mimeResult = mime.lookup(filePath);
      console.log(mimeResult);
      res.setHeader('Content-Type', mimeResult);
      res.end(data);
    }
  });
});
server.listen(3000);
