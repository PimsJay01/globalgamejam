define([], function() {

    var socket = io.connect('http://localhost:7777');
    var id;

    socket.on('session', function(_id) {
        id = _id;
    });

    return socket;
});
