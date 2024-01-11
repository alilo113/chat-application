const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/messages")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (newMessage) => {
    console.log("Received message:", newMessage);

    try {
      const { Name, Message } = newMessage;
      const savedMessage = await new Message({ Name, Message }).save();

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
    const { name, message } = req.body;
    const newMessage = await new Message({ Name: name, Message: message }).save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});