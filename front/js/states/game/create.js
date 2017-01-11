define(['js/phaser'], function(phaser) {

    var game;

    return function() {
        game = phaser.getGame();

        game.add.sprite(0, 0, 'background');
    }
});
