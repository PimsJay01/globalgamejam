var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) { });
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<h1>Salut tout le monde !</h1>');
    res.end();
});

server.listen(8080);
