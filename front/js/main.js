requirejs(['jquery', 'js/phaser'], function($, phaser) {

    var game;

    $(function() {
        require(['js/socket'], function(socket) {
            socket.on('init', function(init) {

                console.log(init);

                game = phaser.init(init);

                require(['js/states/menu', 'js/states/game'], function(menuState, gameState) {

                    // Declare game states
                    game.state.add('menu', menuState);
                    game.state.add('game', gameState);

                    // Start state
                    game.state.start('menu');
                });
            });
        });
    });
});
