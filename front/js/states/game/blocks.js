define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

  blockList = [];
  var game;
  function preload() {
      game = phaser.getGame();

      game.load.image('block', res.sprites.block);
  };


  socket.on('broadcastblock', function(block){
    blockList[block.id].x = block.x * phaser.getGame().width;
    blockList[block.id].y = block.y * phaser.getGame().height;
  });

  socket.on('blocklist', function(blocks) {

    game.load.image('block', res.sprites.block);
    console.log(res.sprites.block);
    for (var i in blocks) {
      var tempBlock = game.add.sprite(blocks[i].x * phaser.getGame().width , blocks[i].y * phaser.getGame().height , 'block');
      tempBlock.id = blocks[i].id;
      // console.info('yo', tempBlock);
      // var tempBlockHolder = {'sprite' : tempBlock, 'id':blocks[i].id};

      game.physics.arcade.enable(tempBlock);
      tempBlock.body.collideWorldBounds = true;
      tempBlock.body.bounce.set(0);

      // blockList.push(tempBlockHolder);
      blockList.push(tempBlock);
    }
    console.info("Block list", blockList);
  });

  function update() {
    for (var i in blockList) {

      game.physics.arcade.collide(player.getPlayer(), blockList[i]);

      if(blockList[i].body.velocity.x != 0 || blockList[i].body.velocity.y != 0){
        var valuesToSend = {};
        valuesToSend.id = blockList[i].id;
        valuesToSend.x = blockList[i].x / phaser.getGame().width;
        valuesToSend.y = blockList[i].y / phaser.getGame().width;
        socket.emit('updateblock', valuesToSend);
      }

      for (var j in blockList) {
        game.physics.arcade.collide(blockList[j], blockList[i]);
      }
      if ((Math.round(blockList[i].body.position.x) % 32 === 0) && (Math.round(blockList[i].body.position.y) % 32 === 0))
        blockList[i].body.velocity.setTo(0, 0);

    }
  }


  return {
      'preload': preload,
      'update': update
  }
});
