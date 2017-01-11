define(['phaser'], function() {

    var game;

    function init() {

        // Init game with Phaser
        game = new Phaser.Game(800, 600, Phaser.AUTO, '');

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
