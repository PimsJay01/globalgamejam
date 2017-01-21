define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player', 'js/states/game/blocks'],
function(phaser, socket, res, player, blocks) {

    var game;
    var emitter;
    var enemies = {};
    var velocity = 0.15 * phaser.getGame().width;

    // socket.on('broadcast', function(update) {
    //
    // });

    function preload() {
        game = phaser.getGame();

        game.load.spritesheet('enemies', res.sprites.enemies, 32, 32);
    }

    function create() {
        emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);

        // emitter.makeParticles('enemies', [0, 1, 2, 3, 4, 5]);
        emitter.makeParticles('enemies', 0, 100, true);

        emitter.bounce.setTo(0.5, 0.5);
        emitter.minParticleSpeed.setTo(-400, -400);
        emitter.maxParticleSpeed.setTo(400, 400);
        emitter.gravity = 50;
        // emitter.start(false, 4000, 15);
    }

    function update() {
        game.physics.arcade.collide(emitter, player.getPlayer(), collidePlayer, null, this);
        game.physics.arcade.collide(emitter, blocks.getBlocks(), collideBlocks, null, this);
    }

    function collidePlayer(player, enemy) {
        // console.info('John est super gay', enemy);
        // enemy.visible = false;
    }

    function collideBlocks(block, enemy) {
        console.log('enemy', enemy);
        console.log('block', block);
        // block.velocity.setTo(0);
    }

    return {
        'create': create,
        'preload': preload,
        'update': update
    }
});