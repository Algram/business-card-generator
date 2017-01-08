/* eslint-disable */
$( document ).ready(function() {
  $('#dataInput').on('change keydown paste input', function(){
    console.log('asd');
    var input = $('#dataInput').val();
    var data = {
      test: input
    };

    sendToServer(data);
  });
});

function sendToServer(data) {
  $.post( "/generate", data, function( data ) {
    console.log(data);
    $('#pdfView').attr('src', "output.pdf");
  });
}
