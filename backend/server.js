require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');

const app = express();
const server = http.createServer(app);

// Enhanced WebSocket configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: "/socket.io/",
  transports: ['websocket', 'polling'], // Explicitly specify transports
  pingTimeout: 60000, // Increase ping timeout
  pingInterval: 25000 // Adjust ping interval
});

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Socket.IO connection with enhanced error handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('register', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} connected`);
    io.emit('onlineUsers', Array.from(io.sockets.adapter.rooms.keys()));
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('typing', ({ userId, isTyping }) => {
    socket.broadcast.emit('typing', { userId, isTyping });
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected (${socket.id}):`, reason);
    io.emit('onlineUsers', Array.from(io.sockets.adapter.rooms.keys()));
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));