const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs');
var Sound = require('aplay');
const port = 8000;
var video_list = [];

fs.readdir("assets/video", (err, files) => {
  files.forEach(file => {
    video_list.push(file);
  });
  console.log(files);
});

app.use('/assets/', express.static('assets/video'));

io.on('connection', function(client){
  client.emit("playlist",{"playlist":video_list});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ '/statics/screen.html'));
});

app.get('/sound', function(req,res){
  new Sound().play('assets/audio/cocacola.wav');
  console.log("Played sound");
  res.sendStatus(200);
})

app.get('/win', function (req,res){
  io.emit("win",[]);
  res.sendStatus(200);
});

app.get('/clear',function(req,res){
  io.emit("clear",[]);
  res.sendStatus(200);
});

server.listen(port);
