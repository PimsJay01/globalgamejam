var http = require('http');

var server = http.createServer();

var game = {
    'width': 800,
    'height': 600
}

// Chargement de socket.io
var io = require('socket.io').listen(server);

var clients = {};
io.sockets.on('connection', function (socket) {

    console.info('new connection id ' + socket.id);

    // Send id client and game preferences
    socket.emit('session', socket.id);
    socket.emit('init', game);

    // When client start game...
    socket.on('start', function () {

        // Add new client in array
        clients[socket.id] = {
            'id': socket.id,
            'x': Math.random() * (game.width - 16),
            'y': Math.random() * (game.height - 16),
            'isPlaying': false,
            'animationName': 'down'
        }

        // Server choose random starting position
        socket.emit('pop', {
            'x': clients[socket.id].x,
            'y': clients[socket.id].y
        });

        Object.keys(clients).forEach(function(key) {
            if(clients[key].id != socket.id) {
                socket.emit('broadcast', clients[key]);
            }
        });
    });

    // Receive update from player and broadcast it
    socket.on('update', function(update) {

        update.id = socket.id;
        clients[socket.id].x = update.x !== void 0 ? update.x : clients[socket.id].x;
        clients[socket.id].y = update.y !== void 0 ? update.y : clients[socket.id].y;
        clients[socket.id].isPlaying = update.isPlaying !== void 0 ? update.isPlaying : clients[socket.id].isPlaying;
        clients[socket.id].animationName = update.animationName !== void 0 ? update.animationName : clients[socket.id].animationName;

        socket.broadcast.emit('broadcast', update);
    });

    // When client disconnect...
    socket.on('disconnect', function() {
        delete clients[socket.id];
    });
});

server.listen(7777);

console.info('server started');
