const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}...`));

const socket = require('socket.io');
const io = socket(server);

const path = require('path');
app.use(express.static(path.join(__dirname, '/build/')));
app.use(express.json());

io.on('connection', (socket) => {
  socket.on('requireTurn', (data) => {
      const room = JSON.parse(data).room
      io.to(room).emit('playerTurn', data)
  })

  socket.on('create', room => {
      socket.join(room)
  })

  socket.on('join', room => {
      socket.join(room)
      io.to(room).emit('opponent_joined')
  })

  socket.on('requireRestart', (data) => {
      const room = JSON.parse(data).room
      io.to(room).emit('restart')
  })
});

