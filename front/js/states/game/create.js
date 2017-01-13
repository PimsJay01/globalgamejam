define(['js/phaser', 'js/states/game/player'], function(phaser, player) {

    var game;

    return function() {
        game = phaser.getGame();

        game.add.sprite(0, 0, 'sprites.background');

        player.create();
    }
});
