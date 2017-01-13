define(['js/phaser', 'js/states/game/player'], function(phaser, player) {

    var game;

    return function() {
        game = phaser.getGame();

        player.update();
    }
});
