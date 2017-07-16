//var geo = require('./geocode.js');

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveMapToCurrentGps);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
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
//var pointList = JSON.parse(geo.a);

//var points = JSON.parse(pointList);

//var strip = new H.geo.Strip();
//points.forEach(function(point) {
  //strip.pushPoint(point);
//});

//// Initialize a polyline with the strip:
//var polyline = new H.map.Polyline(strip, { style: { lineWidth: 10 }});

//// Add the polyline to the map:
//map.addObject(polyline);

// Zoom the map to make sure the whole polyline is visible:
//map.setViewBounds(polyline.getBounds());
