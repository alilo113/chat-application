const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    Name: String,
    Message: String
})

const message = mongoose.model("message", messageSchema)
module.exports = message