/* eslint-disable */
$( document ).ready(function() {
  init();

  var typingTimer;
  $('input').on('paste input', function() {
    delay(function(){
      sendToServer();
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

    sendToServer();
  });

  $('input[name=qrcode]').on('paste input', function() {
    delay(function(){
      sendToServer();
    }, 1000 );
  });


  // Init Map
  $('select[name=qrcode]').on('change', function() {
    if ($(this).val() === 'geolocation') {
      console.log('asdasdds');
      $('#map').show();
      $('input[name=qrcode]').hide();
    } else if ($(this).val() === 'vcard') {
      $('input[name=qrcode]').hide();
    } else {
      $('#map').hide();
      $('input[name=qrcode]').show();
    }

    sendToServer();
  });
});

function updateMap(adressCombined, cb) {
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

    cb(location);
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
    url: 'doe.com',
    qrcode: 'Example QR Code Content'
  };

  adressCombined = defaultData.street + ', ' + defaultData.city;

  for(key in defaultData) {
    if(defaultData.hasOwnProperty(key))
      $('input[name='+key+']').val(defaultData[key]);
  }

  delay(function(){
    $.post( "/generate", defaultData, function( data ) {
      $('#pdfView').attr('src', 'businesscard.pdf');
    });
   }, 200 );
}

var prevAdressCombined;
var prevQrCode;
function sendToServer() {
  var selQrCodeType = $('select[name=qrcode]').val();
  var data = getData();

  if ((prevAdressCombined !== data.adressCombined) && selQrCodeType === 'geolocation') {
    updateMap(data.adressCombined, function(location) {
      data.qrcode = 'http://maps.google.com/maps?q=' + location.lat + ',' + location.lng;
      prevQrCode = data.qrcode;
      $.post( "/generate", data, function( data ) {
        $('#pdfView').attr('src', 'businesscard.pdf');
      });
    });
  } else {
    if (selQrCodeType === 'geolocation') {
      updateMap(data.adressCombined, function() {});
      data.qrcode = prevQrCode;
    }

    if (selQrCodeType === 'vcard') {
      data.qrcode = 'BEGIN:VCARD%0A' +
        'N:' + data.name + '%0A' +
        'TEL;WORK:' + data.phone + '%0A' +
        'EMAIL:' + data.email + '%0A' +
        'TITLE:' + data.position + '%0A' +
        'ADR;WORK:;;' + data.street + ';' + data.city + ';%0A' +
        'END:VCARD'
    }

    if (selQrCodeType === 'text') {
      data.qrcode = $('input[name=qrcode]').val();
    }

    $.post( "/generate", data, function( data ) {
      $('#pdfView').attr('src', 'businesscard.pdf');
    });
  }

  prevAdressCombined = data.adressCombined;
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
