define(['js/states/menu/preload', 'js/states/menu/create', 'js/states/menu/update'], function(preload, create, update) {

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
