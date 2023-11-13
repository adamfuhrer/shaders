const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const server = http.createServer((req, res) => {
  res.end('Socket.IO server');
});

// Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins (you can specify specific origins if needed)
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.broadcast.emit('message', data);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
