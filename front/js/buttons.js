define([], function() {


    function voteEventListener (event) {
      require(['js/socket'], function(socket) {
              socket.emit('vote', event.target.value);
          });
      //element.parentNode.parentNode.style.display = 'none';
    }


    document.getElementById("voteButton1").onclick = voteEventListener;
    document.getElementById("voteButton2").onclick = voteEventListener;
    document.getElementById("voteButton3").onclick = voteEventListener;
    document.getElementById("myButton").onclick = function() {
      require(['js/socket'], function(socket) {
              socket.emit('hello', 'salut Pierre. <3');
          });
    };



});
