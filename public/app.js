//var geo = require('./geocode.js');

var x = document.getElementById("demo");

//var socket = io.connect('http://localhost:3000');

// production connect
var socket = io.connect('https://walkstars.herokuapp.com');

socket.on('message', function(message) {
    
})


// client game model

function GPS(lat, long){
  this.lat = lat;
  this.lng = long;
}

var markers = {}

function Game(){
  this.players = {};
  this.winner = '';
  this.playerPaths = {};
  this.polylines = {};
}

Game.prototype.addPlayer = function (name) {
   this.players[name] = new Player(name);
   
   this.playerPaths[name] = new H.geo.Strip();
};

function Player(name){
  this.name = name;
  this.currentGPS;
  this.score = 0;
}

Game.prototype.addGPS = function (name, gps) {
  this.players[name].currentGPS = gps;
  console.log(gps);
  this.playerPaths[name].pushPoint(gps);
  if (this.playerPaths[name].getPointCount() == 2) {
      var polyline = new H.map.Polyline(this.playerPaths[name])
      map.addObject(polyline);
      this.polylines[name] = polyline;
  } 
  else if (this.playerPaths[name].getPointCount() > 2){
      this.polylines[name].setStrip(this.playerPaths[name])
  }
  
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

setInterval(sendCurrentPosition, 1000);

var userGPS


var iteration = 0

function sendCurrentPosition () {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      userGPS = new GPS(lat + iteration *.00005, lng);
      iteration++
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
        

        if (name in markers) {
            markers[name].setPosition(data.players[name].currentGPS);
        }
        else {
            var marker = new H.map.Marker(data.players[name].currentGPS);
            map.addObject(marker);
            markers[name] = marker;
        }
        
        console.log(markers[name])  
    }

  } else {
    alert(winner + ' won the game!');
  }

  var animate = true
  var oldCenter = map.getCenter();
  
  if(userGPS){
    map.setCenter(userGPS);
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
    zoom: 16,
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

