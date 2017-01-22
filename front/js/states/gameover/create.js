define(['js/phaser'], function(phaser) {

    var game;

    function startGame() {
        game.state.start('game');
    }

    return function() {
        game = phaser.getGame();

        var playButton = game.add.button(game.width/2, game.height/2 + 100, 'buttons.play', startGame, game);
		    playButton.anchor.setTo(0.5);
    }
});
