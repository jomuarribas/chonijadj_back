let io;

const initSocket = (server) => {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "https://chonijapp.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.emit('welcome', 'Welcome to the server');
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIo };