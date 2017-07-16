var x = document.getElementById("demo");

var socket = io.connect('http://localhost:3000');
socket.on('message', function(message) {
    alert('The server has a message for you: ' + message);
})

function GPS(arr){
  this.lat = arr[0];
  this.long = arr[1];
}

setInterval(sendCurrentPosition, 1000);

socket.on('new GPS coords', function(e){
  console.log(e);
});

function sendCurrentPosition () {
  var coords = getLocation();
  coords = [47.608013, -122.335167];
  var userGPS = new GPS(coords);
  console.log(userGPS)
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
