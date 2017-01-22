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
        emitter = game.add.emitter(game.world.centerX, 32, 250);

        // emitter.makeParticles('enemies', [0, 1, 2, 3, 4, 5]);
        emitter.makeParticles('enemies', 0, 100, true);

        emitter.bounce.setTo(0.5, 0.5);
        emitter.minParticleSpeed.setTo(-400, -400);
        emitter.maxParticleSpeed.setTo(400, 400);
        //emitter.gravity = 50;
        emitter.start(false, 4000, 15);
    }

    function update() {
        // game.physics.arcade.collide(emitter, player.getPlayer(), collidePlayer, null, this);
        // game.physics.arcade.collide(emitter, blocks.getBlocks(), collideBlocks, null, this);
        game.physics.arcade.overlap(emitter, player.getPlayer(), collidePlayer, null, this);
        game.physics.arcade.overlap(emitter, blocks.getBlocks(), collideBlocks, null, this);
    }

    function collidePlayer(player, enemy) {
        enemy.kill();
        player.alpha = player.alpha - 0.11;
        var dataToSend = {};
        dataToSend.alpha = player.alpha;
        socket.emit('updatealpha', dataToSend);
        if (player.alpha <= 0.5) {
          socket.emit('disconnect');
          game.state.start('gameover');
        }

        // enemy.visible = false;
    }

    function collideBlocks(block, enemy) {
        enemy.kill();
        block.alpha = block.alpha - 0.11;
        if (block.alpha <= 0.5)
          block.kill();
        console.info('Block :', block);
        // block.velocity.setTo(0);
    }

    return {
        'create': create,
        'preload': preload,
        'update': update
    }
});
