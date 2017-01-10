define([], function() {

    var game;

    function init(_game) {
        game = _game;

        game.add.sprite(0, 0, 'sprites.background');

        var playButton = game.add.button(game.width/2, game.height/2 + 100, 'buttons.play', startGame, game);
		playButton.anchor.setTo(0.5);
    }

    function startGame() {
        game.state.start('game');
    }

    return {
        'init': init
    }
});
