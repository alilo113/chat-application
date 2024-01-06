const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let waitingClients = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  waitingClients.push(socket);

  if (waitingClients.length >= 2) {
    const pair = waitingClients.splice(0, 2);
    pair.forEach((client, index) => {
      const partnerIndex = index === 0 ? 1 : 0;
      client.emit("paired", "You're paired with a stranger!");
      pair[partnerIndex].emit("paired", "You're paired with a stranger!");
    });
  }

  socket.on("chat message", (msg) => {
    console.log("Received message:", msg);
    io.emit("chat message", { id: Date.now(), text: msg.text });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    waitingClients = waitingClients.filter((c) => c !== socket);
  });
});

const port = 5000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});