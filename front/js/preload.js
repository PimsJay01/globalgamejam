define(['js/res'], function(res) {

    function init(game) {

        game.load.image('background', res.sprites.background);

    }

    return {
        'init': init
    }
});
