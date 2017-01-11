define(['js/phaser', 'js/res'], function(phaser, res) {

    var game;

    return function() {
        game = phaser.getGame();

        game.load.image('background', res.sprites.background);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

    }
});
