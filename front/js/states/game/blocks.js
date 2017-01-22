define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

  var game;
  var blockList = [];
  // var shapeList = [];

  var stopPlayer = false;

  function preload() {
    game = phaser.getGame();

    game.load.image('block', res.sprites.block);
  };

  socket.on('broadcastalphablock', function(block){
    blockList[block.id].alpha = block.alpha;
    if(blockList[block.id].alpha <= 0.5){
      blockList[block.id].kill();
    }
  });

  socket.on('broadcastblock', function(block){
    blockList[block.id].x = block.x * 32;
    blockList[block.id].y = block.y * 32;
  });

  socket.on('blocklist', function(blocks) {
    for (var i in blocks) {
      var tempBlock = game.add.sprite(blocks[i].x * 32, blocks[i].y * 32, 'block');
      tempBlock.id = blocks[i].id;
      tempBlock.family = blocks[i].family;

      game.physics.arcade.enable(tempBlock);
      tempBlock.body.collideWorldBounds = true;
      tempBlock.body.bounce.set(0);

      // blockList.push(tempBlockHolder);
      blockList.push(tempBlock);
    }
    console.info("Block list", blockList);
  });

  // socket.on('shapelist', function(shapes) {
  //
  //   for (var i in shapes) {
  //       for (var j in shapes[i].blocks) {
  //         var tempBlock = game.add.sprite(shapes[i].blocks[j].x * 32, shapes[i].blocks[j].y * 32, 'block');
  //         tempBlock.id = shapes[i].blocks[j].id;
  //         tempBlock.family = i;
  //
  //         game.physics.arcade.enable(tempBlock);
  //         tempBlock.body.collideWorldBounds = true;
  //         tempBlock.body.bounce.set(0);
  //
  //         // blockList.push(tempBlockHolder);
  //         shapeList.push(tempBlock);
  //       }
  //   }
  //   console.info("Shape list", blockList);
  // });

  function update() {

    game.physics.arcade.overlap(player.getPlayer(), blockList, collidePlayer, null, this);
    game.physics.arcade.overlap(blockList, blockList, collideBlocks, null, this);

    // game.physics.arcade.collide(player.getPlayer(), shape.children);

    // for (var i in blockList) {
    //
    //
    //   var sendPosition = (blockList[i].body.velocity.x != 0 || blockList[i].body.velocity.y != 0);
    //
    //   if (((blockList[i].position.x % 32 < 8) && (blockList[i].previousPosition.x % 32 > 24)) || ((blockList[i].position.x % 32 > 24) && (blockList[i].previousPosition.x % 32 < 8))) {
    //     var nearestPos = Math.round(blockList[i].position.x / 32);
    //     blockList[i].position.x = nearestPos * 32;
    //     blockList[i].body.velocity.setTo(0);
    //   }
    //
    //   if (((blockList[i].position.y % 32 < 8) && (blockList[i].previousPosition.y % 32 > 24)) || ((blockList[i].position.y % 32 > 24) && (blockList[i].previousPosition.y % 32 < 8))) {
    //     var nearestPos = Math.round(blockList[i].position.y / 32);
    //     blockList[i].position.y = nearestPos * 32;
    //     blockList[i].body.velocity.setTo(0);
    //   }
    //
    //   if(sendPosition){
    //     var valuesToSend = {};
    //     valuesToSend.id = blockList[i].id;
    //     valuesToSend.x = blockList[i].x / 32;
    //     valuesToSend.y = blockList[i].y / 32;
    //     socket.emit('updateblock', valuesToSend);
    //   }
    // }
  }

  function collidePlayer(player, block) {

      if(block.body.touching.down) {
          moveBlocksOfShape(block.family, 0, -32);
      }
      else if(block.body.touching.up) {
          moveBlocksOfShape(block.family, 0, +32);
      }
      else if(block.body.touching.left) {
          moveBlocksOfShape(block.family, +32, 0);
      }
      else if(block.body.touching.right) {
          moveBlocksOfShape(block.family, -32, 0);
      }
  }

  function sendPosition(block) {
      socket.emit('updateblock', {
          'id': block.id,
          'x': block.x / 32,
          'y': block.y / 32,
      });
  }

  function moveBlocksOfShape(family, x, y) {
      for (var i in blockList) {
            console.log(family);
          if((blockList[i].family == family) && (blockList[i].position.x == blockList[i].previousPosition.x) && (blockList[i].position.y == blockList[i].previousPosition.y)) {
              blockList[i].position.set(blockList[i].position.floor().x +x, blockList[i].position.floor().y +y);
              sendPosition(blockList[i]);
          }
      }
  }

  function moveBlocksOfShapeToPreviousPosition(family) {
      for (var i in blockList) {
          if(blockList[i].family == family) {
              blockList[i].position.set(blockList[i].previousPosition.floor().x, blockList[i].previousPosition.floor().y);
              sendPosition(blockList[i]);
          }
      }
  }

  function collideBlocks(block1, block2) {
      moveBlocksOfShapeToPreviousPosition(block1.family);
      moveBlocksOfShapeToPreviousPosition(block2.family);

    //   player.getPlayer().body.velocity.set(0);
    //   player.getPlayer().body.velocity.set(player.getPlayer().body.velocity.x * 5, player.getPlayer().body.velocity.y * 5);
    //   player.getPlayer().position.set(player.getPlayer().previousPosition.x, player.getPlayer().previousPosition.y)
    // block1.body.velocity.set(0);
    //   block1.position.set(block1.previousPosition.floor().x, block1.previousPosition.floor().y);
    // block2.body.velocity.set(0);
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
