//var geo = require('./geocode.js');

var x = document.getElementById("demo");

var socket = io.connect('http://localhost:3000');

// production connect
// var socket = io.connect('https://walkstars.herokuapp.com');

socket.on('message', function(message) {

})


// client game model

function GPS(lat, lng){
  this.lat = lat;
  this.lng = lng;
}

var markers = {}

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

var intRef = setInterval(sendCurrentPosition, 1000);

var userGPS

function sendCurrentPosition () {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      userGPS = new GPS(lat, lng);
      socket.emit('new GPS coord', {'name': 'Beeker', 'gps': userGPS});
    },
    function(err){
        console.log("Geolocation Error");
    }
  );
}

socket.on('update map', function (data) {
  // console.log(data);
  updateMap(data);
});

function updateMap(data) {
  // console.log(data);
  var winner = data.winner;

  if (winner === ''){

    game.addPlayerLocations(data.players);

    for (var name in data.players) {
        console.log(data.players[name].currentGPS);

        if (name in markers) {
            markers[name].setPosition(data.players[name].currentGPS);
        }
        else {
            var marker = new H.map.Marker(data.players[name].currentGPS);
            map.addObject(marker);
            markers[name] = marker;
        }
    }

  } else {
    alert(winner + ' won the game!');
  }

  var animate = true
  var oldCenter = map.getCenter();
  if(userGPS){
    console.log(userGPS);
    map.setCenter(userGPS, animate);
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

var map
navigator.geolocation.getCurrentPosition(
function(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  userGPS = new GPS(lat, lng);
// Instantiate (and display) a map object:
  map = new H.Map(
  document.getElementById('map'),
  defaultLayers.normal.map,
  {
    zoom: 16,
    center: userGPS
  });
},
function(err){ 
    console.log("Geolocation Error");
}
);

// var points = JSON.parse(pointList);

// var strip = new H.geo.Strip();
// points.forEach(function(point) {
  // strip.pushPoint(point);
// });

//// Initialize a polyline with the strip:
// var polyline = new H.map.Polyline(strip, { style: { lineWidth: 10 }});

//// Add the polyline to the map:
// map.addObject(polyline);

// Zoom the map to make sure the whole polyline is visible:
// map.setViewBounds(polyline.getBounds());
