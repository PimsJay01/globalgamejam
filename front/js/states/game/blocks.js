define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

  blockList = [];
  var game;
  function preload() {
      game = phaser.getGame();

      game.load.image('block', res.sprites.block);
  };


  socket.on('blocklist', function(blocks) {

    game.load.image('block', res.sprites.block);
    console.log(res.sprites.block);
    for (var i in blocks) {
      var tempBlock = game.add.sprite(blocks[i].x * phaser.getGame().width , blocks[i].y * phaser.getGame().height , 'block');

      game.physics.arcade.enable(tempBlock);
      tempBlock.body.collideWorldBounds = true;
      tempBlock.body.bounce.set(0);

      blockList.push(tempBlock);
    }
    console.info("Block list", blockList);
  });

  function update() {
    for (var i in blockList) {
      game.physics.arcade.collide(player.getPlayer(), blockList[i]);
      console.log(blockList[i].body.position);
      if ((Math.round(blockList[i].body.position.x) % 100 === 0) && (Math.round(blockList[i].body.position.y) % 100 === 0))
        blockList[i].body.velocity.setTo(0, 0);
    }
  }

  return {
      'preload': preload,
      'update': update
  }
});
