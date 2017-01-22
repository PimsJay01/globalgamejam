define(function() {

    var sprites = 'img/';
    var buttons = 'img/';
    var sounds  = 'sound/'

    return {
        'sprites': {
            'background': sprites + 'sky.jpg',
            'characters': sprites + 'characters.png',
            'enemies': sprites + 'enemies.png',
            'hero': sprites + 'bunny.png',
            'block': sprites + 'bloc.png'
        },
        'buttons': {
            'play': buttons + 'play.png'
        },
        'sounds': {
             'paidProgrammming': sounds + 'PaidProgrammming2.mp3',
             'timeAway': sounds + 'TimeAway.mp3',
        }
    }
});
