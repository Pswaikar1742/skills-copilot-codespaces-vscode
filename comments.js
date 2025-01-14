// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');

// Create server
http.createServer(function(req, res) {
    // Get URL
    var url_parts = url.parse(req.url);

    // Get path name
    var pathName = url_parts.pathname;

    // Get query string
    var query = url_parts.query;

    // Get method
    var method = req.method;

    // Get data from file
    var data = fs.readFileSync('comments.json');
    var comments = JSON.parse(data);

    if (pathName === '/comments' && method === 'GET') {
        // Show comments
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><body>');

        // Show comments
        for (var i in comments) {
            res.write('<p>' + comments[i] + '</p>');
        }

        // Show form
        res.write('<form method="POST" action="/comments">');
        res.write('<input type="text" name="comment">');
        res.write('<input type="submit">');
        res.write('</form>');

        res.write('</body></html>');
        res.end();
    } else if (pathName === '/comments' && method === 'POST') {
        // Get data from form
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);

            // Add comment
            comments.push(post.comment);

            // Save data to file
            fs.writeFileSync('comments.json', JSON.stringify(comments));

            // Redirect
            res.writeHead(302, {'Location': '/comments'});
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
}).listen(3000);

console.log('Server is running at http://localhost:3000/'); 
 To run the server, save the code to a file named comments.js and run it using Node.js: 
 node comments.js 
 Open your browser and go to  http://localhost:3000/. You will see a form to add comments. 
 Enter a comment and click the submit button. The comment will be added to the list of comments