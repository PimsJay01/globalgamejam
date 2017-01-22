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
             'paidProgrammingMP3': sounds + 'PaidProgramming2.mp3',
             'paidProgrammingOGG': sounds + 'PaidProgramming2.ogg',
             'timeAwayMP3': sounds + 'TimeAway.mp3',
             'timeAwayOGG': sounds + 'TimeAway.ogg'
        }
    }
});
