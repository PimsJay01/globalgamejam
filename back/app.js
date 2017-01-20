var http = require('http');

var server = http.createServer();

// Chargement de socket.io
var io = require('socket.io').listen(server);

var clients = {};

io.sockets.on('connection', function (socket) {

    console.info('new connection id ' + socket.id);

    socket.on('hello', function(message) {
        console.info('Le client m\'a envoyé le message : ' + message);
    })

});

server.listen(7777);

console.info('server started');
