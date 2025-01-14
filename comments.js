// Create a new web server
var http = require('http');
var port = 3000;
var server = http.createServer();
server.listen(port, function() {
  console.log('Server listening on port', port);
});
// Create a request listener
server.on('request', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!');
});