//var geo = require('./geocode.js');

var x = document.getElementById("demo");

var socket = io.connect('http://localhost:3000');
socket.on('message', function(message) {
    alert('The server has a message for you: ' + message);
})

function GPS(arr){
  this.lat = arr[0];
  this.lng = arr[1];
  this.alt = 0
}

setInterval(sendCurrentPosition, 1000);

var userGPS

function sendCurrentPosition () {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      userGPS = new GPS([lat, lng]);
      socket.emit('new GPS coord', {'name': 'Beeker', 'gps': userGPS});
    },
    function(err){ document.getElementById('map').innerHTML = 'Geolocation Error';}
  );
}

socket.on('update map', function (data) {
  console.log(data);
  updateMap(data);
});

function updateMap(data) {
  // console.log(data);
  var winner = data.winner;

  if (winner === ''){
    for (var name in data.players) {
        data.players[name].currentGPS
    }

  } else {
    alert(winner + ' won the game!');
  }

  var animate = true
  var oldCenter = map.getCenter();
  if (oldCenter.lat == userGPS.lat && oldCenter.lng == userGPS.lat) {
      animate = false
  }
  map.setCenter(userGPS, animate);
  map.setZoom(16);
}

var platform = new H.service.Platform({
  'app_id': 'ppxc8S78pismSdspOtop',
  'app_code': 'BVl1WK4jZ5PRbFRJuWvz8g',
   useCIT: true,
   useHTTPS: true
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

var points = JSON.parse(pointList);

var strip = new H.geo.Strip();
points.forEach(function(point) {
  strip.pushPoint(point);
});

//// Initialize a polyline with the strip:
var polyline = new H.map.Polyline(strip, { style: { lineWidth: 10 }});

//// Add the polyline to the map:
map.addObject(polyline);

// Zoom the map to make sure the whole polyline is visible:
map.setViewBounds(polyline.getBounds());
