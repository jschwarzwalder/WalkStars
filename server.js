const express = require('express')
const app = express();
//const http = require('http').Server(app);
const path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

io.on('connection', function(socket){
  console.log(socket, 'socket');
  socket.on('map update', function(msg){
    io.emit('map update', msg);
  });

  socket.on('new GPS coords', function(e){
 console.log(' gps ', e)
});

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
});

function processData() {



socket.broadcast.emit('update map', data)

}



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
