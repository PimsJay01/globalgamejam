// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        js: '../js',
        // Library
        jquery: 'jquery/jquery',
        phaser: 'phaser/phaser'
    }
});

// Start loading the main app file.
requirejs(['js/main']);
