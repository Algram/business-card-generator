/* eslint-disable */
$( document ).ready(function() {
  var typingTimer;
  $('input').on('change keydown paste input', function(){
    var INPUT_NAME = $('input[name=name]').val();
    var INPUT_PHONE = $('input[name=phone]').val();
    var data = {
      name: INPUT_NAME,
      phone: INPUT_PHONE
    };

    delay(function(){
       sendToServer(data);
     }, 1000 );
  });
});

function sendToServer(data) {
  $.post( "/generate", data, function( data ) {
    console.log(data);
    $('#pdfView').attr('src', 'businesscard.pdf');
  });
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();
