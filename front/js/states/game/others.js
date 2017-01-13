define(['js/phaser', 'js/socket', 'js/res'], function(phaser, socket, res) {

    var game;
    var others = {};

    socket.on('broadcast', function(update) {
        if(update.id != socket.id) {
            if(others[socket.id] === undefined) {
                others[socket.id] = game.add.sprite(0, 0, 'sprites.characters');

                //  Our two animations, walking left and right.
                others[socket.id].animations.add('down', [3, 4, 5], 10, true);
                others[socket.id].animations.add('left', [15, 16, 17], 10, true);
                others[socket.id].animations.add('right', [27, 28, 29], 10, true);
                others[socket.id].animations.add('up', [39, 40, 41], 10, true);
                others[socket.id].animations.play('down');
                others[socket.id].scale.setTo(2);

                // Enable player physics;
                // others[socket.id].physics.arcade.enable(others[socket.id]);
                // others[socket.id].body.collideWorldBounds = true

                others[socket.id].alive = true;
                others[socket.id].speed = 125;
            }

            if(update.x != void 0) {
                others[socket.id].position.x = update.x;
            }

            if(update.y != void 0) {
                others[socket.id].position.y = update.y;
            }

            if(update.isPlaying != void 0) {
                if(update.isPlaying) {
                    others[socket.id].animations.play(update.name);
                }
                else {
                    others[socket.id].animations.stop();
                }
            }

            if(update.name != void 0)
                others[socket.id].animations.play(update.name);
        }
    });

    function preload() {
        game = phaser.getGame();
    }

    function create() {

    }

    function update() {

    }

    return {
        'create': create,
        'preload': preload,
        'update': update
    }
});
