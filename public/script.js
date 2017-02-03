/* eslint-disable */
$( document ).ready(function() {
  init();

  var typingTimer;
  $('input').on('paste input', function() {
    var data = getData();

    delay(function(){
      updateMap(data.adressCombined);
      sendToServer(data);
    }, 1000 );
  });

  $('select[name=design]').on('change', function() {
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

  $('input[name=qrcode]').on('paste input', function() {
    delay(function(){
      var data = getData();

      updateMap(data.adressCombined);

      sendToServer(data);
    }, 1000 );
  });


  // Init Map
  $('select[name=qrcode]').on('change', function() {
    var data = getData();

    if ($(this).val() == 'geolocation') {
      updateMap(data.adressCombined);
      $('#map').show()
      $('input[name=qrcode]').hide();
    } else {
      $('#map').hide()
      $('input[name=qrcode]').show();
    }

    sendToServer(data);
  });
});

function updateMap(adressCombined) {
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + adressCombined + '&key=AIzaSyC_zK9z0M8CUJagi2RliAFXooeW7yfXKEQ', function(data) {
    var location = data.results[0].geometry.location;

    var map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 14
    });

    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
  });
}

function init() {
  var defaultData = {
    selectedDesign: 1,
    color: '#BFBFBF',
    name: 'John Doe',
    position: 'Chief Executive',
    street: 'Lohrtalweg 10',
    city: '74821 Mosbach',
    phone: '+92 217 238 112',
    email: 'john.doe@mail.com',
    url: 'doe.com'
  };

  adressCombined = defaultData.street + ', ' + defaultData.city;

  for(key in defaultData) {
    if(defaultData.hasOwnProperty(key))
      $('input[name='+key+']').val(defaultData[key]);
  }

  delay(function(){
     sendToServer(defaultData);
   }, 200 );
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
  var INPUT_STREET = $('input[name=street]').val();
  var INPUT_CITY = $('input[name=city]').val();
  var INPUT_PHONE = $('input[name=phone]').val();
  var INPUT_EMAIL = $('input[name=email]').val();
  var INPUT_URL = $('input[name=url]').val();

  var data = {
    selectedDesign: SELECT_DESIGN,
    color: INPUT_COLOR,
    name: INPUT_NAME,
    position: INPUT_POSITION,
    street: INPUT_STREET,
    city: INPUT_CITY,
    phone: INPUT_PHONE,
    email: INPUT_EMAIL,
    url: INPUT_URL,
    adressCombined: INPUT_STREET + ', ' + INPUT_CITY
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
