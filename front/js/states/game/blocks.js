define(['js/phaser', 'js/socket', 'js/res'], function(phaser, socket, res) {

  blockList = {};
  var game;

  function preload() {
      game = phaser.getGame();

      game.load.image('block', res.sprites.block);
  };


  socket.on('blocklist', function(blocks) {

    game.load.image('block', res.sprites.block);
    console.log(res.sprites.block);
    for (var i in blocks) {
      blockList[blocks[i].id] =  game.add.sprite(blocks[i].x * phaser.getGame().width , blocks[i].y * phaser.getGame().height , 'block');
    }





  });

  return {
      'preload': preload
  }


});
