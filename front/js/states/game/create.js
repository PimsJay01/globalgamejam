define(['js/phaser', 'js/states/game/player'], function(phaser, player) {

    var game;
    var map;
    var layer;

    return function() {
        game = phaser.getGame();

        game.add.sprite(0, 0, 'sprites.background');

        // Tilemap materials
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        layer = map.createLayer('World1');
        layer.resizeWorld();

        player.create();
    }
});
