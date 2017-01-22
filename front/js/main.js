requirejs(['jquery', 'js/phaser'], function($, phaser) {

    var game;

    $(function() {
        require(['js/socket'], function(socket) {
            socket.on('init', function(init) {

                console.info('Init', init);

                if(game === void 0) {
                    game = phaser.init(init);

                    require(['js/states/menu', 'js/states/game', 'js/states/gameover'], function(menuState, gameState, gameoverState) {

                        // Declare game states
                        game.state.add('menu', menuState);
                        game.state.add('game', gameState);
                        game.state.add('gameover', gameoverState);

                        // Start state
                        game.state.start('menu');
                    });
                }
                else {
                    game.state.start('menu');
                }
            });
        });
    });
});
