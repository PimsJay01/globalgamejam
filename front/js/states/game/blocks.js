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
      // game.physics.arcade.collide(player.getPlayer(), blockList[i].sprite, updateServerPos, null, { this: this, block: blockList[i] });
      game.physics.arcade.collide(player.getPlayer(), blockList[i], updateServerPos, null);
      // game.physics.arcade.collide(player.getPlayer(), blockList[i], updateServerPos, null, { this: this, block: blockList[i] });

      blockList[i].body.velocity.setTo(0, 0);
    }
  }

  function updateServerPos(player, block){
    // console.info(block);
    // console.info("block pos :" + block.x + ", " + block.y + " block id : " + block.id);
    var valuesToSend = {};
    valuesToSend.id = block.id;
    valuesToSend.x = block.x / phaser.getGame().width;
    valuesToSend.y = block.y / phaser.getGame().width;
    socket.emit('updateblock', valuesToSend);
  }

  return {
      'preload': preload,
      'update': update
  }
});
