const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
 },
 username: {type: String}, 
 content: {type: String}
}, {timestamps: true})

module.exports = mongoose.model("Message",messageSchema)