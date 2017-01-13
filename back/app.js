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

    socket.emit('id', socket.id);
    socket.emit('init', game);

    socket.on('start', function () {
        socket.emit('pop', {
            'x': Math.random() * (game.width - 16),
            'y': Math.random() * (game.height - 16)
        });
    });

    socket.on('position', function(position) {
        socket.broadcast.emit('update', {
            'id': socket.id,
            'x': position.x,
            'y': position.y
        });
        console.log(position);
    });
});

server.listen(7777);

console.info('server started');
