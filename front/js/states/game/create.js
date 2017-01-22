define(['js/phaser', 'js/states/game/player', 'js/states/game/enemies'], function(phaser, player, enemies) {

    var game;

    return function() {
        game = phaser.getGame();

        // game.add.sprite(0, 0, 'sprites.background');

        music = game.add.audio('intro');
        music.play();
        player.create();
        //enemies.create();
    }
});
