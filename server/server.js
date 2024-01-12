const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./modules/usersMessages");

const app = express();
const server = http.createServer(app);

mongoose.connect("mongodb://127.0.0.1:27017/messages")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });

app.use(cors());

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (newMessage) => {
    console.log("Received message:", newMessage);

    try {
      const { name, text } = newMessage;
      const savedMessage = await new Message({ name, text }).save();

      io.emit("message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name } = req.body;
    const newMessage = await new Message({ Name: name }).save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});