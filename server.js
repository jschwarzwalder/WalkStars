const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

function Game(){
  this.players = [];
  this.winner = '';
}

Game.prototype.addPlayer = function (name) {
  this.players.push(name: new Player(name));
};

Game.prototype.detectCollision = function () {

};

function Player(name){
  this.name = name;
  this.currentGPS;
  this.GPSlist = [];
  this.score = 0;
}

Player.prototype.addGPS = function (gps) {
  this.currentGPS = gps;
  this.GPSlist.push(gps);
};

var game = new Game();

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

io.on('connection', function(socket){
  socket.on('map update', function(msg){
    io.emit('map update', msg);
  });

  socket.on('new GPS coord', processData);
});

// {name,GPS}

function processData(data) {
  game.players[data.name].addGPS(data.gps)
  game.detectCollision()

  var

  // {player1: {[{lat: ?, long: ?}], score: 0}, player2: {[{lat: ?, long: ?}], score: 0}], winner: ''}
  socket.broadcast.emit('update map', response))

}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
