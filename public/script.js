/* eslint-disable */
$( document ).ready(function() {
  var selectedDesign = 1;
  var typingTimer;
  $('input').on('keydown paste input', function() {
    var data = getData();

    delay(function(){
       sendToServer(data);
     }, 1000 );
  });

  $('select').on('change', function() {
    var data = getData();
    sendToServer(data);
  });
});

function sendToServer(data) {
  $.post( "/generate", data, function( data ) {
    $('#pdfView').attr('src', 'businesscard.pdf');
  });
}

function getData() {
  var SELECT_DESIGN = $('select').val();
  var INPUT_COLOR = $('input[name=color]').val();
  var INPUT_NAME = $('input[name=name]').val();
  var INPUT_POSITION = $('input[name=position]').val();
  var INPUT_PHONE = $('input[name=phone]').val();

  var data = {
    selectedDesign: SELECT_DESIGN,
    color: INPUT_COLOR,
    name: INPUT_NAME,
    position: INPUT_POSITION,
    phone: INPUT_PHONE
  };

  return data;
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();
