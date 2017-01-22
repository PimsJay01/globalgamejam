define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

    var game;
    var blockList = [];

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

    game.physics.arcade.collide(player.getPlayer(), blockList, collidePlayer, null, this);
    game.physics.arcade.collide(blockList, blockList, collideBlocks, null, this);

    for (var i in blockList) {

        if (((blockList[i].position.x % 32 < 8) && (blockList[i].previousPosition.x % 32 > 24)) || ((blockList[i].position.x % 32 > 24) && (blockList[i].previousPosition.x % 32 < 8))) {
            var nearestPos = Math.round(blockList[i].position.x / 32);
            blockList[i].position.x = nearestPos * 32;
            blockList[i].body.velocity.setTo(0);
        }

        if (((blockList[i].position.y % 32 < 8) && (blockList[i].previousPosition.y % 32 > 24)) || ((blockList[i].position.y % 32 > 24) && (blockList[i].previousPosition.y % 32 < 8))) {
            var nearestPos = Math.round(blockList[i].position.y / 32);
            blockList[i].position.y = nearestPos * 32;
            blockList[i].body.velocity.setTo(0);
        }

            //   if(blockList[i].body.velocity.x != 0 || blockList[i].body.velocity.y != 0){
            var valuesToSend = {};
            valuesToSend.id = blockList[i].id;
            valuesToSend.x = blockList[i].x / phaser.getGame().width;
            valuesToSend.y = blockList[i].y / phaser.getGame().width;
            socket.emit('updateblock', valuesToSend);
            // }
    }
  }

  function collidePlayer(player, block) {
      console.log('John pu le pipi');
      console.log(block.body.position);

    //   block.body.velocity.set(0);
    //   block.body.position.set(0);
  }

  function collideBlocks(block1, block2) {
      block1.body.velocity.set(0);
    //   block1.position.set(block1.previousPosition.floor().x, block1.previousPosition.floor().y);
      block2.body.velocity.set(0);
    //   block1.position.set(block2.previousPosition.floor().x, block2.previousPosition.floor().y);
  }

  function getBlocks() {
      return blockList;
  }

  return {
      'preload': preload,
      'update': update,
      'getBlocks': getBlocks
  }
});
