define([], function() {

    var socket = io.connect('http://localhost:7777');
    var id;

    socket.on('id', function(_id) {
        id = _id;
    })

    // function getId() {
    //     return id;
    // }
    //
    // function getSocket() {
    //     return socket
    // }

    return socket;
    // return {
    //     'broadcast': socket.broadcast,
    //     'emit': function(t,e) { socket.emit(t,e); },
    //     'on': function(t,e) { socket.on(t,e); },
    //     'getId': getId,
    //     'getSocket': getSocket
    // }
});
