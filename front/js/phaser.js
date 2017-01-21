define(['phaser'], function() {

    var game;

    function init(properties) {
        console.info('Properties', properties);

        // Init game with Phaser
        game = new Phaser.Game(1000, 1000, Phaser.AUTO, '');

        console.info('Game', game);
        return game;
    }

    function getGame() {
        return game
    }

    return {
        'init': init,
        'getGame': getGame
    }
});
