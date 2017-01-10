define(['js/states/game/preload', 'js/states/game/create', 'js/states/game/update'], function(preload, create, update) {

    function init(game) {
        return {
            'preload': function() {
                preload.init(game);
            },
            'create': function() {
                create.init(game);
            },
            'update': function() {
                update.init(game);
            }
        }
    }

    return {
        'init': init
    }
});
