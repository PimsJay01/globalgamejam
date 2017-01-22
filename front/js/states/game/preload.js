define(['js/phaser', 'js/res', 'js/states/game/player', 'js/states/game/others', 'js/states/game/enemies', 'js/states/game/blocks'],
function(phaser, res, player, others, enemies, blocks) {

    var game;

    return function() {
        game = phaser.getGame();



        game.load.audio('music1', [res.sounds.paidProgrammingOGG, res.sounds.paidProgrammingMP3]);
        game.load.audio('music2', [res.sounds.timeAwayOGG, res.sounds.timeAwayMP3]);

        // game.load.image('sprites.background', res.sprites.background);
        game.stage.backgroundColor = "#D5F3E9";

        game.load.crossOrigin = 'anonymous';
        game.load.bitmapFont('text_font', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.png', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/fonts/bitmapFonts/carrier_command.xml');

        player.preload();
        others.preload();
        blocks.preload();
        enemies.preload();

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.controls = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
    }
});
