define(['js/phaser', 'js/socket', 'js/res', 'js/utils'], function(phaser, socket, res, utils) {

    var game;
    var player;
    var velocity = 0.15 * phaser.getGame().width;


    socket.on('spawn', function(position) {
        player.position.x = position.x * phaser.getGame().width;
        player.position.y = position.y * phaser.getGame().height;

        player.visible = true;
    });

    function preload() {
        game = phaser.getGame();

        game.load.spritesheet('sprites.characters', res.sprites.characters, 16, 16);
    }

    function create() {
        player = game.add.sprite(0, 0, 'sprites.characters');

        //  Our two animations, walking left and right.
        player.animations.add('down', [0, 1, 2], 10, true);
        player.animations.add('left', [12, 13, 14], 10, true);
        player.animations.add('right', [24, 25, 26], 10, true);
        player.animations.add('up', [36, 37, 38], 10, true);
        player.animations.play('down');
        player.scale.setTo(2);

        // Enable player physics;
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true

        player.alive = true;
        player.speed = 125;

        player.visible = false;

        socket.emit('start');
        console.info('Player', player);

    }

    function update() {
        // console.log('update');
        // player.body.velocity.x = 0;
        // player.body.velocity.y = -player.speed;
        //
        // console.log(player);
        var oldPlayerVelocityx = player.body.velocity.x;
        var oldPlayerVelocityy = player.body.velocity.y;

        if(player.visible) {
            // Up
            if (game.controls.up.isDown) {
                player.body.velocity.x = 0;
                player.body.velocity.y = -velocity;
                player.animations.play('up');

            // Down
            } else if (game.controls.down.isDown) {
                player.body.velocity.x = 0;
                player.body.velocity.y = velocity;
                player.animations.play('down');

            // Left
            } else if (game.controls.left.isDown) {
                player.body.velocity.x = -velocity;
                player.body.velocity.y = 0;
                player.animations.play('left');

            // Right
            } else if (game.controls.right.isDown) {
                player.body.velocity.x = velocity;
                player.body.velocity.y = 0;
                player.animations.play('right');
            // }
            // Still
            } else {
                player.animations.stop();
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }
        }

        if (oldPlayerVelocityx != player.body.velocity.x || oldPlayerVelocityy != player.body.velocity.y){
            var valuesToSend = {};
            valuesToSend.x = player.position.x / phaser.getGame().width;
            valuesToSend.y = player.position.y / phaser.getGame().height;
            valuesToSend.vx = Math.max(Math.min(player.body.velocity.x, -1),1);
            valuesToSend.vy = Math.max(Math.min(player.body.velocity.y, -1),1);
            valuesToSend.animationName = player.animations.currentAnim.name;
            socket.emit('update', valuesToSend);
        }



        // if(oldValues.x != utils.round(player.position.x, 1)) {
        //     valuesToSend.x = utils.round(player.position.x, 1);
        // }
        //
        // if(oldValues.y != utils.round(player.position.y, 1)) {
        //     valuesToSend.y = utils.round(player.position.y, 1);
        // }
        //
        // if(oldValues.name != player.animations.currentAnim.name) {
        //     valuesToSend.name = player.animations.currentAnim.name;
        // }
        //
        // if(oldValues.isPlaying != player.animations.currentAnim.isPlaying) {
        //     valuesToSend.isPlaying = player.animations.currentAnim.isPlaying;
        //     valuesToSend.name = player.animations.currentAnim.name;
        // }
        //
        // if(!$.isEmptyObject(valuesToSend)) {
        //
        // }
        //
        // oldValues = {
        //     'x': utils.round(player.position.x, 1),
        //     'y': utils.round(player.position.y, 1),
        //     'isPlaying': player.animations.currentAnim.isPlaying,
        //     'name': player.animations.currentAnim.name,
        // };
    }

    return {
        'create': create,
        'preload': preload,
        'update': update
    }
});
