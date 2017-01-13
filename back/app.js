var http = require('http');

var server = http.createServer();

var game = {
    'width': 800,
    'height': 600
}

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    console.info('new connection');

    socket.emit('session', socket.id);
    socket.emit('init', game);

    socket.on('start', function () {
        socket.emit('pop', {
            'x': Math.random() * (game.width - 16),
            'y': Math.random() * (game.height - 16)
        });
    });

    socket.on('update', function(update) {
        update.id = socket.id;
        socket.broadcast.emit('broadcast', update);
        console.log(update);
    });
});

server.listen(7777);

console.info('server started');
