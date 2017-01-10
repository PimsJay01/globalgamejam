define(['js/res'], function(res) {

    function init(game) {

        game.load.image('background', res.sprites.background);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

    }

    return {
        'init': init
    }
});
