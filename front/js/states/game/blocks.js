define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {


  var shape;



  var game;
  var blockList = [];


  function preload() {
    game = phaser.getGame();

    game.load.image('block', res.sprites.block);
  };


  socket.on('broadcastblock', function(block){
    blockList[block.id].x = block.x * 32;
    blockList[block.id].y = block.y * 32;
  });

  socket.on('blocklist', function(blocks) {

    game.load.image('block', res.sprites.block);
    console.log(res.sprites.block);
    for (var i in blocks) {
      var tempBlock = game.add.sprite(blocks[i].x * 32, blocks[i].y * 32, 'block');
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

    shape = game.add.sprite(200, 200, null);

    b1 = game.add.sprite(0 , 0 , 'block');
    b1.id = 3;
    b2 = game.add.sprite(33 , 0 , 'block');
    b2.id = 4;
    b3 = game.add.sprite(66 , 0 , 'block');
    b3.id = 5;
    b4 = game.add.sprite(99 , 0 , 'block');
    b4.id = 6;

    shape.addChild(b1);
    shape.addChild(b2);
    shape.addChild(b3);
    shape.addChild(b4);

    game.physics.arcade.enable(shape);
    shape.body.collideWorldBounds = true;
    shape.body.bounce.set(0);


  });

  function update() {

    game.physics.arcade.overlap(player.getPlayer(), blockList, collidePlayer, null, this);
    game.physics.arcade.collide(blockList, blockList, collideBlocks, null, this);

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
          block.position.set(block.position.floor().x, block.position.floor().y -32);
      }
      else if(block.body.touching.up) {
          block.position.set(block.position.floor().x, block.position.floor().y +32);
      }
      else if(block.body.touching.left) {
          block.position.set(block.position.floor().x +32, block.position.floor().y);
      }
      else if(block.body.touching.right) {
          block.position.set(block.position.floor().x -32, block.position.floor().y);
      }

      socket.emit('updateblock', {
          'id': block.id,
          'x': block.x / 32,
          'y': block.y / 32,
      });
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
