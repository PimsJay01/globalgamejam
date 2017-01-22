define(['js/phaser', 'js/res'], function(phaser, res) {

    var game;

    return function() {
        game = phaser.getGame();

        game.stage.backgroundColor = '#B5F3E9';

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.load.image('buttons.play', res.buttons.play);
    }
});
