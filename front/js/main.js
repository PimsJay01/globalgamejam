requirejs(['jquery', 'js/phaser'], function($, phaser) {

    var game;

    // Document ready
    $(function() {

        game = phaser.init();

        require(['js/states/menu', 'js/states/game'], function(menuState, gameState) {

            // Declare states
            game.state.add('menu', menuState);
            game.state.add('game', gameState);

            // Start state
            game.state.start('menu');
        });
    });
});
