define(['js/phaser'], function(phaser) {

    var game;

    function startGame() {
        game.state.start('game');
    }

    return function() {
        game = phaser.getGame();

        var playButton = game.add.button(game.width/2, game.height/2, 'startMenu', startGame, game);
		    playButton.anchor.setTo(0.5);
        playButton.scale.setTo(0.55,0.55);
    }
});
