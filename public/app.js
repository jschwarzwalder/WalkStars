var x = document.getElementById("demo");

var socket = io();

socket.on('new GPS coords', function(e){
  console.log(e);
});

function sendMapCoordinates() {
  socket.emit('new GPS coords', userGPS);
 // console.log('userGPS: ', userGPS);
  //console.log(args)
}

var userGPS = new GPS();

userGPS.continuousGeocode();

function GPS(lat, long){
  this.lat = lat;
  this.long = long;
    this.continuousGeocode = function(){
        let that = this;
        if (navigator && navigator.geolocation) {
           setTimeout(
            function(){
                navigator.geolocation.getCurrentPosition(function(position) {
                    that.lat = position.coords.latitude;
                    that.long = position.coords.longitude;
                    sendMapCoordinates();
                    that.continuousGeocode();
                }, function(err){  document.getElementById('map').innerHTML = 'Geolocation Error'; });
            }, 1000);
       } else {
          document.getElementById('map').innerHTML = 'No Geolocation';
       }
    }
}

socket.on('update map', updateMap);

function updateMap(data) {

}


function getLocation() {
    if (navigator.geolocation) {
       // navigator.geolocation.getCurrentPosition(moveMapToCurrentGps);
    } else {
       // x.innerHTML = "Geolocation is not supported by this browser.";
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
