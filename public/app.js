//var geo = require('./geocode.js');

var x = document.getElementById("demo");

//var socket = io.connect('http://localhost:3000');

// production connect
var socket = io.connect('https://walkstars.herokuapp.com');

socket.on('message', function(message) {
    alert('The server has a message for you: ' + message);
})


// client game model

function GPS(lat, long){
  this.lat = lat;
  this.lng = long;
}

function Game(){
  this.players = {};
  this.winner = '';
  this.playerPaths = {}
}

Game.prototype.addPlayer = function (name) {
   this.players[name] = new Player(name);
   this.playerPaths[name] = [];
};

function Player(name){
  this.name = name;
  this.currentGPS;
  this.score = 0;
}

Game.prototype.addGPS = function (name, gps) {
  this.players[name].currentGPS = gps;
  if (this.playerPaths[name]){
    this.playerPaths[name] = [];
  }
  this.playerPaths[name].push(gps);
};

Game.prototype.addPlayerLocations = function (players) {
  for (var name in players) {
    if (!this.players.hasOwnProperty(name)) {
      this.addPlayer(name);
    }
    this.addGPS(name, players[name].currentGPS);
  }

};

var game = new Game();

game.player = new Player('Beeker');

// communication with the server

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
    
    game.addPlayerLocations(data.players);

    for (var name in data.players) {
        data.players[name].currentGPS
    }

  } else {
    alert(winner + ' won the game!');
  }

  var animate = true
  var oldCenter = map.getCenter();
  if(userGPS && oldCenter){
    if (oldCenter.lat == userGPS.lat && oldCenter.lng == userGPS.lat) {
        animate = false;
    }
    console.log(userGPS);
    map.setCenter({lat: userGPS.lat[0], lng: userGPS.lat[1]});
    map.setZoom(16);
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
