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

function makeBlocks(){
  return {
      0 : {'id':0, 'family':0, 'x':24, 'y':18, 'alpha':1.0},
      1 : {'id':1, 'family':0, 'x':24, 'y':19, 'alpha':1.0},
      2 : {'id':2, 'family':0, 'x':24, 'y':20, 'alpha':1.0},
      3 : {'id':3, 'family':0, 'x':24, 'y':21, 'alpha':1.0},
      4 : {'id':4, 'family':1, 'x':7, 'y':7, 'alpha':1.0},
      5 : {'id':5, 'family':1, 'x':7, 'y':8, 'alpha':1.0},
      6 : {'id':6, 'family':1, 'x':7, 'y':9, 'alpha':1.0},
      7 : {'id':7, 'family':1, 'x':7, 'y':10, 'alpha':1.0},
      8 : {'id':8, 'family':2, 'x':18, 'y':24, 'alpha':1.0},
      9 : {'id':9, 'family':2, 'x':19, 'y':24, 'alpha':1.0},
      10 : {'id':10, 'family':2, 'x':20, 'y':24, 'alpha':1.0},
      11 : {'id':11, 'family':2, 'x':20, 'y':25, 'alpha':1.0},
      12 : {'id':12, 'family':3, 'x':2, 'y':7, 'alpha':1.0},
      13 : {'id':13, 'family':3, 'x':2, 'y':8, 'alpha':1.0},
      14 : {'id':14, 'family':3, 'x':2, 'y':9, 'alpha':1.0},
      15 : {'id':15, 'family':3, 'x':3, 'y':8, 'alpha':1.0},
      16 : {'id':16, 'family':4, 'x':30, 'y':39, 'alpha':1.0},
      17 : {'id':17, 'family':4, 'x':30, 'y':38, 'alpha':1.0},
      18 : {'id':18, 'family':4, 'x':30, 'y':37, 'alpha':1.0},
      19 : {'id':19, 'family':4, 'x':31, 'y':37, 'alpha':1.0},
      20 : {'id':20, 'family':5, 'x':18, 'y':1, 'alpha':1.0},
      21 : {'id':21, 'family':5, 'x':19, 'y':1, 'alpha':1.0},
      22 : {'id':22, 'family':5, 'x':19, 'y':2, 'alpha':1.0},
      23 : {'id':23, 'family':5, 'x':20, 'y':2, 'alpha':1.0},
      24 : {'id':24, 'family':6, 'x':7, 'y':17, 'alpha':1.0},
      25 : {'id':25, 'family':6, 'x':8, 'y':17, 'alpha':1.0},
      26 : {'id':26, 'family':6, 'x':8, 'y':16, 'alpha':1.0},
      27 : {'id':27, 'family':6, 'x':9, 'y':16, 'alpha':1.0},
      28 : {'id':28, 'family':7, 'x':18, 'y':10, 'alpha':1.0},
      29 : {'id':29, 'family':7, 'x':19, 'y':10, 'alpha':1.0},
      30 : {'id':30, 'family':7, 'x':20, 'y':10, 'alpha':1.0},
      31 : {'id':31, 'family':7, 'x':21, 'y':10, 'alpha':1.0},
      32 : {'id':32, 'family':8, 'x':10, 'y':24, 'alpha':1.0},
      33 : {'id':33, 'family':8, 'x':10, 'y':25, 'alpha':1.0},
      34 : {'id':34, 'family':8, 'x':10, 'y':26, 'alpha':1.0},
      35 : {'id':35, 'family':8, 'x':10, 'y':27, 'alpha':1.0},
      36 : {'id':36, 'family':9, 'x':15, 'y':30, 'alpha':1.0},
      37 : {'id':37, 'family':9, 'x':15, 'y':31, 'alpha':1.0},
      38 : {'id':38, 'family':9, 'x':16, 'y':30, 'alpha':1.0},
      39 : {'id':39, 'family':9, 'x':16, 'y':31, 'alpha':1.0}
  };
}

// function makeBlocks(){
//   return {
//     0 : {'id':0, 'x':18, 'y':18, 'alpha':1.0},
//     1 : {'id':1, 'x':18, 'y':22, 'alpha':1.0},
//     2 : {'id':2, 'x':22, 'y':18, 'alpha':1.0},
//     2 : {'id':2, 'x':22, 'y':22, 'alpha':1.0}
//   };
// }


const waveInterval = 30;
var nextWave = waveInterval;

// list of clients
var clients = {};
var blocks = makeBlocks();

// list of shapes
// var shapes = makeShapes();

// reset the global datastructures, put the server in initial state
function reset(){
  clients = {};
  blocks = makeBlocks();
  // shapes = makeShapes();
  nextWave = waveInterval;
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
      //'socket': socket,
      'id': socket.id,
      'x': 0.5,
      'y': 0.5,
      'vx': 0,
      'vy': 0,
      'animationName': 'down',
      'alpha': 1.0
    }

    // Server choose starting position
    console.log("Sending position to client "+socket.id);
    socket.emit('spawn', {
      'x': clients[socket.id].x,
      'y': clients[socket.id].y
    });

    console.log("Sending block list to client "+socket.id);
    socket.emit('blocklist', blocks);

    // socket.emit('shapelist', shapes);

    console.log("Sending data of client "+socket.id+" to all other clients");
    Object.keys(clients).forEach(function(key) {
      if(clients[key].id != socket.id) {
        socket.emit('broadcast', clients[key]);
      }
    });

    console.log("List of clients : "+Object.keys(clients));
  });

  // Receive update from player and broadcast it
  socket.on('update', function(update) {
    update.id = socket.id;
    clients[socket.id].x = update.x !== void 0 ? update.x : clients[socket.id].x;
    clients[socket.id].y = update.y !== void 0 ? update.y : clients[socket.id].y;
    clients[socket.id].vx = update.vx !== void 0 ? update.vx : clients[socket.id].vx;
    clients[socket.id].vy = update.vy !== void 0 ? update.vy : clients[socket.id].vy;
    clients[socket.id].animationName = update.animationName !== void 0 ? update.animationName : clients[socket.id].animationName;
    console.info('Server received data character from client '+update.id+'. x : ' + clients[update.id].x +', y : '+clients[update.id].y+', vx : ' + clients[update.id].vx +', vy : '+clients[update.id].vy+', animation name : '+clients[update.id].animationName)
    console.info('Broadcasting the character data : '+update.id+'. x : ' + update.x +', y : '+update.y+', vx : ' + update.vx +', vy : '+update.vy+', animation name : '+update.animationName);
    // console.log("List of clients : "+Object.keys(clients));
    socket.broadcast.emit('broadcast', update);
  });

  socket.on('updateblock', function(update) {
    blocks[update.id].x = update.x !== void 0 ? update.x : blocks[socket.id].x;
    blocks[update.id].y = update.y !== void 0 ? update.y : blocks[socket.id].y;
    console.info('Server received block data. x : ' + blocks[update.id].x +', y : '+blocks[update.id].y+', id : ' + blocks[update.id].id);
    console.info('Broadcasting the block data. x : ' + update.x +', y : '+update.y+', id : ' + update.id);
    // console.log("List of clients : "+Object.keys(clients));
    socket.broadcast.emit('broadcastblock', update);
  });

  socket.on('updateshape', function(update) {
    console.info('updating shape');
    socket.broadcast.emit(update);
  });

  socket.on('updatealpha', function(update){
    update.id = socket.id;
    clients[socket.id].alpha = update.alpha;
    console.info('alpha of client ' + socket.id + ' updated to '+ update.alpha);
    socket.broadcast.emit('broadcastalpha', update);
  });

  socket.on('updatealphablock', function(update){
    blocks[update.id].alpha = update.alpha;
    console.info('alpha of block ' + update.id + ' updated to '+ update.alpha);
    socket.broadcast.emit('broadcastalphablock', update);
  });

  // When client disconnect...
  socket.on('disconnect', function() {
    console.info('client ' + socket.id + ' disconnected');
    delete clients[socket.id];
  });
});

setInterval(function(){
  // io.sockets.emit('time', nextWave);
  io.emit('time', nextWave);
  console.info('Current time : ', nextWave);
  nextWave--;
  if(nextWave === -1){
    //io.sockets.emit('wave');
    var keys = Object.keys(clients);
    if( keys.length > 0 ){
        // io.sockets.emit('wave');
        var clientId = Object.keys(clients)[0];
        console.info('!!! sending wave to : ' + clientId + ' !!!');
        // clients[clientId].socket.emit('wave');
        // io.clients[clientId].send('wave');
        // sockets.broadcast.to(clientId).emit('wave');
        io.emit('wave', clientId);
    } else {
      console.info('No client connected, cannot send wave');
    }
    nextWave = waveInterval;
  }
}, 1000);

server.listen(7777);
console.info('server started');
