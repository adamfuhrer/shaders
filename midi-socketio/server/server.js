const https = require('https'); // Use the 'https' module
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');

// Read the SSL certificate and private key
const privateKey = fs.readFileSync('./key.pem', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, (req, res) => {
  res.end('Socket.IO server');
});

// Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins
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