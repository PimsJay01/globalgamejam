define(['js/phaser'], function(phaser) {

    var game;

    return function() {
        game = phaser.getGame();

        game.stage.backgroundColor = '#B5F3E9';
    }
});
