/* eslint-disable */

document.querySelector('#generate').addEventListener('click', () => {
  sendToServer();
});


function sendToServer() {
  var data = {
    test: 'someweirdtest'
  };

  $.post( "/generate", data, function( data ) {
    console.log(data);
  });
}
