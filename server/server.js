const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./modules/usersMessages");

const app = express();
const server = http.createServer(app);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/messages")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });

// CORS Middleware
app.use(cors());

// Socket.IO setup
const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (newMessage) => {
    console.log("Received message:", newMessage);

    try {
      const { Name } = newMessage;
      const savedMessage = await new Message({ Name }).save();

      // Broadcast the message to all connected clients
      io.emit("message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// API Endpoint
app.post("/api/messages", async (req, res) => {
  try {
    const { name } = req.body;
    const newMessage = await new Message({ Name: name}).save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});