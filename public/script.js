/* eslint-disable */
$( document ).ready(function() {
  init();

  var typingTimer;
  $('input').on('keydown paste input', function() {
    var data = getData();

    delay(function(){
       sendToServer(data);
     }, 1000 );
  });

  $('select').on('change', function() {
    if ($(this).val() == 1) {
      colorDesign = '#BFBFBF';
      $('input[name=color]').val(colorDesign);
    } else if ($(this).val() == 2) {
      colorDesign = '#b60000';
      $('input[name=color]').val(colorDesign);
    }

    var data = getData();
    sendToServer(data);
  });
});

function init() {
  var defaultData = {
    selectedDesign: 1,
    color: '#BFBFBF',
    name: 'John Doe',
    position: 'Chief Executive',
    phone: '+92 217 238 112'
  };

  for(key in defaultData) {
    if(defaultData.hasOwnProperty(key))
      $('input[name='+key+']').val(defaultData[key]);
  }

  sendToServer(defaultData);
}

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
