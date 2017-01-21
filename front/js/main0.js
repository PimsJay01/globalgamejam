requirejs(['jquery', 'js/phaser', 'js/buttons'], function($, phaser) {

    $(function() {
        require(['js/socket'], function(socket) {
            socket.emit('hello', 'salut Pierre. <3');
        });
    });
});
