define(['js/phaser', 'js/states/game/player', 'js/states/game/others'], function(phaser, player, others) {

    var game;

    return function() {
        game = phaser.getGame();

        player.update();
        others.update();
    }
});
