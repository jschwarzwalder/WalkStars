var x = document.getElementById("demo");

var socket = io();

function GPS(arr){
  this.lat = arr[0];
  this.long = arr[1];
}

setInterval(sendCurrentPostion, 1000);

socket.on('new GPS coords', function(e){
  console.log(e);
});

function sendCurrentPostion () {
  var coords = getLocation();
  var userGPS = new GPS(coords);
  socket.emit('new GPS coords', {'gps': userGPS});
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      return [lat,long];
    },
    function(err){ document.getElementById('map').innerHTML = 'Geolocation Error'; }
  );
}

socket.on('update map', updateMap);

function updateMap(data) {
  console.log(data);

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveMapToCurrentGps);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}



var platform = new H.service.Platform({
  'app_id': 'ppxc8S78pismSdspOtop',
  'app_code': 'BVl1WK4jZ5PRbFRJuWvz8g'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('map'),
  defaultLayers.normal.map,
  {
    zoom: 10,
    center: { lat: 2.5, lng: 13.4 }
  });

/**
 * Moves the map to display over CurrentGps
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function showPosition(position) {
  var latlon = "lat:" + position.coords.latitude + "," + "lng:" + position.coords.longitude;
  map.setCenter({latlon});
  map.setZoom(14);
}
