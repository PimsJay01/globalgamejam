define(['js/phaser', 'js/states/game/player', 'js/states/game/others', 'js/states/game/blocks'], function(phaser, player, others, blocks) {

    var game;

    return function() {
        game = phaser.getGame();

        player.update();
        others.update();
        blocks.update();
    }
});
