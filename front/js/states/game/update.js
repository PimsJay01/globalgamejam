define(['js/phaser', 'js/states/game/player', 'js/states/game/others', 'js/states/game/blocks', 'js/states/game/enemies'],
function(phaser, player, others, blocks, enemies) {

    var game;

    return function() {
        game = phaser.getGame();

        player.update(blocks.update());
        others.update();
        enemies.update();
    }
});
