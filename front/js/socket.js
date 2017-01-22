define([], function() {

    //var socket = io.connect('http://poisot.eu:7777');
    var socket = io.connect('http://192.168.150.44:7777');
    var id;

    socket.on('session', function(_id) {
        id = _id;
    });

    return socket;
});
