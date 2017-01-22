define(['js/phaser', 'js/states/game/player', 'js/states/game/enemies'], function(phaser, player, enemies) {

    var game;
    
    return function() {
        game = phaser.getGame();

        // game.add.sprite(0, 0, 'sprites.background');


        player.create();
<<<<<<< HEAD
        music = game.add.audio('music2');
        //music.loop(true);
        music.play();
        //enemies.create();
=======
        enemies.create();
>>>>>>> master
    }
});
