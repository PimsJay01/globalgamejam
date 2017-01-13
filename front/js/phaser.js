define(['phaser'], function() {

    var game;

    function init(properties) {

        // Init game with Phaser
        game = new Phaser.Game(properties.width, properties.height, Phaser.AUTO, '');

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
