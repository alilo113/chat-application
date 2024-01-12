// Server-side message model
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  name: String
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;