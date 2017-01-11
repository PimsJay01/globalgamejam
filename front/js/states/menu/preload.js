define(['js/phaser', 'js/res'], function(phaser, res) {

    var game;

    return function() {
        game = phaser.getGame();

        game.stage.backgroundColor = '#3598db';

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.load.image('buttons.play', res.buttons.play);
    }
});
