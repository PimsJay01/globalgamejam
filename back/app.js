var http = require('http');

var server = http.createServer();

// Loading socket.io
var io = require('socket.io').listen(server);
// Loading stdin read
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// global datastructures
var clients = {};
var votes = {};
var numVotes = 0;
var currentRoom = 0;
var rooms = [
  {choices : {"Red door":"live", "Blue door":"die", "Green door":"die", "Yellow door":"live"},
}
];

// reset the global datastructures, put the server in initial state
function reset(){
  clients = {};
  votes = {};
  numVotes = 0;
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

  // registering new client
  console.info('new connection id ' + socket.id);
  clients[socket.id] = {
    'connection' : socket,
    'id': socket.id,
    'hasVoted': false,
    'vote' : undefined
  }

  // response to hello message from client
  socket.on('hello', function(message) {
    console.info('The client ' + socket.id + ' sent me the message  : ' + message + ', sending him the first room');
    console.info('Choices are ' + Object.keys(rooms[0]));
    socket.emit('room', Object.keys(rooms[0]));
  })

  // response to vote command from client
  // count the vote, if all votes received respond
  socket.on('vote', function(vote) {

    console.info('The client ' +socket.id+ ' has voted : ' + vote);
    if( !clients[socket.id].hasVoted ){
      clients[socket.id].hasVoted = true;
      clients[socket.id].vote = vote;
      numVotes++;
      console.info('His vote has been registered');
    } else{
      console.info('He had already voted')
    }

    if(numVotes === Object.keys(clients).length){
      console.info('Everybody voted, counting the votes ...')
      for (key in clients) {
        if(!(clients[key].vote in votes)){
          votes[clients[key].vote]=1;
        }
        else{
          votes[clients[key].vote]++;
        }
      }

      var max = 0;
      var winvote = "";
      for (key in votes){
        if(votes[key] > max){
          max = votes[key];
          winvote = key;
        }
      }
      for(key in clients){
        clients[key].hasVoted = false;
        clients[key].vote = undefined;
      }
      console.info('max is '+max+'The winning choice is : ' + winvote)
      io.emit('winvote', winvote);
      console.info('Everybody ' + );
      votes = {};
      numVotes = 0;

    } else {console.info('Some votes are missing, total number of clients : ' + Object.keys(clients).length + ', total number of votes : ' + numVotes)}

  })

});

server.listen(7777);

console.info('server started');
