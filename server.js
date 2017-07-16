const express = require('express')
const app = express();
const http = require('http').Server(app);
const path = require('path');
const collision = require('./collision').PlayerCollision;
const io = require('socket.io')(http);

const POINTS_PER_COLLISION = 1;
const POINTS_FOR_VICTORY = 5;

function GPS(lat, lng){
  this.lat = lat;
  this.lng = lng;
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

Game.prototype.detectCollision = function () {
    var collidedPlayers = []
    Object.keys(this.playerPaths).forEach(function(name1, index1) {
        this.playerPaths[name1]
        Object.keys(this.playerPaths).forEach(function(name2, index2) {
            //players cannot collide with themselves
            if (index1 == index2) {
                return;
            }
            if (collision(this.playerPaths[name1], this.playerPaths[name2])) {
                if (!collision(this.playerPaths[name2], this.playerPaths[name1])) {
                    this.players[name2].score += POINTS_PER_COLLISION
                }
                collidedPlayers.push(name1);
            }
        })
    })

    Object.keys(this.playerPaths).forEach(function(name, index) {
        if (this.players[name].score >= POINTS_FOR_VICTORY) {
            return name
        }
    })

    return ''

};

function Player(name){
  this.name = name;
  this.currentGPS;
  this.score = 0;
}

Game.prototype.addGPS = function (name, gps) {
  this.players[name].currentGPS = gps;
  this.playerPaths[name].push(gps);
};

var game = new Game();

// var cors = require('cors')
 
// app.use(cors());

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

io.on('connection', function(socket){
  socket.emit('message', 'You are connected!');
  game.addPlayer('Beeker');

  socket.on('new GPS coord', function (data) {
    console.log(data)
    game.addGPS(data.name, data.gps)
    // var winner = game.detectCollision()
    var winner = '';
    var response = {'players': game.players, 'winner': winner}
    // {player1: {[{lat: ?, long: ?}], score: 0}, player2: {[{lat: ?, long: ?}], score: 0}], winner: ''}
    io.emit('update map', response)

  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => console.log('listening on port ' + port));
