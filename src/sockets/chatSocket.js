const User = require('../models/userModel')
const Message = require('../models/messageModel')

const chatSocket = (io) =>{
 let connectedUsers = 0;

 io.on("connection",(socket)=>{
  connectedUsers++
  io.emit('userCount', connectedUsers)

  Message.find().sort({createdAt:1}).limit(50).then(messages=>{
   socket.emit('chatHistory', messages)
  });

  socket.on("sendMessage",async(data)=>{
   const {userId, username,content} = data;

   const message = await Message.create({userId, username,content})
   io.emit('newMessage', message)
  });

  socket.on('disconnect', ()=>{
   connectedUsers--;
   io.emit('userCount', connectedUsers)
  })
 })
}

module.exports = chatSocket