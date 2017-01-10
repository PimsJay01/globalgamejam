requirejs(['jquery', 'phaser', 'js/states/menu', 'js/states/game'], function($, p, menuState, gameState) {

    var game;

    // Document ready
    $(function() {

        // Init game with Phaser
        game = new Phaser.Game(800, 600, Phaser.AUTO, '');

        // Declare states
        game.state.add('menu', menuState.init(game));
        game.state.add('game', gameState.init(game));

        // Start state
        game.state.start('menu');
    });
});
