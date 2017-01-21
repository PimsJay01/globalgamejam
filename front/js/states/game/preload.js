define(['js/phaser', 'js/res', 'js/states/game/player', 'js/states/game/others'], function(phaser, res, player, others) {

    var game;

    return function() {
        game = phaser.getGame();

        game.load.image('sprites.background', res.sprites.background);

        // Tilemap materials
        game.load.crossOrigin = 'anonymous';
        game.load.image('ship', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/atari400.png');
        game.load.tilemap('mario', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/tilemaps/tiles/super_mario.png');

        player.preload();
        others.preload();

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
