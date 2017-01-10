define(['js/res'], function(res) {

    function init(game) {

        game.load.image('sprites.background', res.sprites.background);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.load.image('buttons.play', res.buttons.play);

    }

    return {
        'init': init
    }
});
