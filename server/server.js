const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const message = require("./modules/usersMessages");
const cors = require("cors"); 

app.use(express.json()); 
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/messages")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error:", err)); // Add error handling for database connection

app.post("/api/messages", async (req, res) => {
  try {
    const { name } = req.body;
    const newMessage = new message({ Name: name });
    console.log(newMessage);
    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage); // Send a JSON response with the saved message data
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" }); // Handle server error and send an error response
  }
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});