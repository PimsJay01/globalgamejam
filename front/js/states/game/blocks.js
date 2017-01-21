define(['js/phaser', 'js/socket', 'js/res', 'js/states/game/player'], function(phaser, socket, res, player) {

  blockList = [];
  var game;
  function preload() {
      game = phaser.getGame();

      game.load.image('block', res.sprites.block);
  };


  socket.on('blocklist', function(blocks) {

    game.load.image('block', res.sprites.block);
    for (var i in blocks) {
<<<<<<< HEAD
      blockList[blocks[i].id] =  game.add.sprite(blocks[i].x * phaser.getGame().width , blocks[i].y * phaser.getGame().height , 'block');
    }

    modalmessage.showModal();

=======
      var tempBlock = game.add.sprite(blocks[i].x * phaser.getGame().width , blocks[i].y * phaser.getGame().height , 'block');
>>>>>>> master

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
      blockList[i].body.velocity.setTo(0, 0);
    }
  }

  return {
      'preload': preload,
      'update': update
  }
});
