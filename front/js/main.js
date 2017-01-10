requirejs(['jquery', 'phaser', 'js/preload', 'js/create', 'js/update'], function($, p, preload, create, update) {

    var game;

    // Document ready
    $(function() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            'preload': function() {
                preload.init(game);
            },
            'create': function() {
                create.init(game);
            },
            'update': function() {
                update.init(game);
            }
        });
    });
});
