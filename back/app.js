var http = require('http');

var server = http.createServer();



// Chargement de socket.io
var io = require('socket.io').listen(server);

// Loading stdin read
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = {
  'width': 40,
  'height': 40
}
var clients = {};

// reset the global datastructures, put the server in initial state
function reset(){
  clients = {};
  console.log('Server reset');
};

// list of commands recognised by the server
var serverCommands = {'reset' : reset
};

// read and manage commands from stdin
rl.on('line', (input) => {
  var command = input.trim();
  console.log(`Command : `+ command);
  if(command in serverCommands){
    serverCommands[command]();
  } else {
    console.log(`Unknown command : `+ command);
  }
});


io.sockets.on('connection', function (socket) {

  console.info('new connection id ' + socket.id);

  // Send id client and game preferences
  socket.emit('session', socket.id);
  socket.emit('init', game);

  // When client start game...
  socket.on('start', function () {

    // Add new client in object
    clients[socket.id] = {
      'id': socket.id,
      'x': 20,
      'y': 20,
      'orientation' : 0,
      'animationName': 'down'
    }

    // Server choose random starting position
    socket.emit('spawn', {
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
    clients[socket.id].orientation = update.orientation !== void 0 ? update.orientation : clients[socket.id].orientation;
    clients[socket.id].x = update.x !== void 0 ? update.x : clients[socket.id].x;
    clients[socket.id].y = update.y !== void 0 ? update.y : clients[socket.id].y;
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
