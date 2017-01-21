var http = require('http');

var server = http.createServer();

// Chargement de socket.io
var io = require('socket.io').listen(server);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var clients = {};
var votes = {};
var numVotes = 0;

// var reset = function(){
//   clients = {};
//   votes = {};
//   numVotes = 0;
//   console.log('Server reset');
// };

// var serverCommands = {'reset' : function(){
//   clients = {};
//   votes = {};
//   numVotes = 0;
//   console.log('Server reset');
// }
// };

rl.on('line', (input) => {
  console.log(`Command : ${input}`);
  // serverCommands['${input}']();
  clients = {};
  votes = {};
  numVotes = 0;
  console.log('Server reset');
});

io.sockets.on('connection', function (socket) {

  console.info('new connection id ' + socket.id);
  clients[socket.id] = {
    'id': socket.id,
    'hasVoted': false,
    'vote' : undefined
  }

  socket.on('hello', function(message) {
    console.info('The client ' + socket.id + ' sent me the message  : ' + message);
  })

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
      console.info('max is '+max+'The winning choice is : ' + winvote)
      socket.emit('winvote', winvote);
      votes = {};
      numVotes = 0;

    } else {console.info('Some votes are missing, total number of clients : ' + Object.keys(clients).length + ', total number of votes : ' + numVotes)}

  })

});

server.listen(7777);

console.info('server started');
