const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path');
var http = require('http').Server(app);
var socket = require('socket.io')(http);

function GPS(lat, long){
  this.lat = lat;
  this.long = long;
}

function Game(){
  this.players = [];
  this.winner = '';
  this.playerPaths = {}
}

Game.prototype.addPlayer = function (name) {
  this.players[name] = new Player(name);
  this.playerPaths[name] = [];
};

Game.prototype.detectCollision = function () {

//  return BOOL
};

function Player(name){
  this.name = name;
  this.currentGPS;
  this.score = 0;
}

Game.prototype.addGPS = function (name, gps) {
  this.name.currentGPS = gps;
  this.GPSlist[name].push(gps);
};

var game = new Game();

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

io.on('connection', function(socket){
  socket.on('new GPS coord', processData);
});

// {name,GPS}

function processData(data) {

  game.players[data.name].addGPS(data.gps)

  var winner = game.detectCollision()
  var response = {'players': game.players, 'winner': winner}
  // {player1: {[{lat: ?, long: ?}], score: 0}, player2: {[{lat: ?, long: ?}], score: 0}], winner: ''}
  socket.broadcast.emit('update map', response))

}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
