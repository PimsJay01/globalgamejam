define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

  var shape;
  // var shapeBlocks = [];

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
    for (var i in blockList) {

      game.physics.arcade.collide(player.getPlayer(), blockList[i]);

    //  game.physics.arcade.collide(player.getPlayer(), b1);
    //  game.physics.arcade.collide(player.getPlayer(), b2);
    //  game.physics.arcade.collide(player.getPlayer(), b3);
    //  game.physics.arcade.collide(player.getPlayer(), b4);
      game.physics.arcade.collide(player.getPlayer(), shape.children);



      if(blockList[i].body.velocity.x != 0 || blockList[i].body.velocity.y != 0){
        // console.info('block x : ' + blockList[i].x + ' y : ' + blockList[i].y);
        var valuesToSend = {};
        valuesToSend.id = blockList[i].id;
        valuesToSend.x = blockList[i].x / phaser.getGame().width;
        valuesToSend.y = blockList[i].y / phaser.getGame().width;
        socket.emit('updateblock', valuesToSend);

        if(blockList[i].body.velocity.x != 0){

        if ((Math.round(blockList[i].body.position.x) % 32 < 2))
          blockList[i].body.velocity.setTo(0, 0);
        }

        if(blockList[i].body.velocity.y != 0){
          if ( (Math.round(blockList[i].body.position.y) % 32 < 2))
            blockList[i].body.velocity.setTo(0, 0);
        }


      }

      for (var j in blockList) {
        game.physics.arcade.collide(blockList[j], blockList[i]);
      }



    }
  }


  return {
      'preload': preload,
      'update': update
  }
});
