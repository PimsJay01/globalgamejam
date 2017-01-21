define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res) {

    var game;
    var others = {};

    socket.on('broadcast', function(update) {
        if((game !== void 0) && (game.state.current === 'game')) {

            console.log(update);
            if(others[update.id] === void 0) {

                others[update.id] = game.add.sprite(0, 0, 'sprites.characters');

                //  Our two animations, walking left and right.
                others[update.id].animations.add('down', [3, 4, 5], 10, true);
                others[update.id].animations.add('left', [15, 16, 17], 10, true);
                others[update.id].animations.add('right', [27, 28, 29], 10, true);
                others[update.id].animations.add('up', [39, 40, 41], 10, true);
                others[update.id].animations.play('down');
                others[update.id].scale.setTo(2);

                // others[update.id].body = {};
                // others[update.id].body.velocity = {};

                // Enable player physics;
                game.physics.arcade.enable(others[update.id]);
                // others[update.id].physics.arcade.enable(others[update.id]);
                // others[update.id].body.collideWorldBounds = true

                others[update.id].alive = true;
                others[update.id].speed = 125;


            }

            if(update.x != void 0) {
                others[update.id].position.x = update.x * phaser.getGame().width;
            }

            if(update.y != void 0) {
                others[update.id].position.y = update.y * phaser.getGame().height;
            }


            if(update.vx != void 0) {
                others[update.id].body.velocity.x = update.vx * player.velocity;
            }

            if(update.vy != void 0) {
                others[update.id].body.velocity.y = update.vy * player.velocity;
            }
            console.log(others);


            if(others[update.id].body.velocity.x != 0 || others[update.id].body.velocity.y != 0) {
                    others[update.id].animations.play(update.animationName);
                    // others[update.id].body.velocity.x = 125;
                    // others[update.id].body.velocity.y = 125;
                }else {
                    others[update.id].animations.stop();
                    // others[update.id].body.velocity.x = 0;
                    // others[update.id].body.velocity.y = 0;
            }

            if(update.name != void 0) {
                others[update.id].animations.play(update.name);
            }
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
