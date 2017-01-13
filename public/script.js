/* eslint-disable */
$( document ).ready(function() {
  var typingTimer;
  $('#dataInput').on('change keydown paste input', function(){
    var input = $('#dataInput').val();
    var data = {
      test: input
    };

    delay(function(){
       sendToServer(data);
     }, 1000 );
  });
});

function sendToServer(data) {
  $.post( "/generate", data, function( data ) {
    console.log(data);
    $('#pdfView').attr('src', "output.pdf");
  });
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();
