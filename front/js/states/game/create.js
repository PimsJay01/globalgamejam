define(['js/phaser', 'js/states/game/player'], function(phaser, player) {

    var game;
    var map;

    return function() {
        game = phaser.getGame();

        game.add.sprite(0, 0, 'sprites.background');

        // Tilemap materials
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        game.layer = map.createLayer('World1');
        map.setCollision([21, 22, 27, 28, 40], true, game.layer);
        game.layer.resizeWorld();

        player.create();
    }
});
