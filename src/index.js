const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const userRoutes = require('./routes/userRoutes')
const chatSocket = require('./sockets/chatSocket')
const statsRoutes = require('./routes/statsRoutes')

const app = express();
const server = http.createServer(app);
app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173/',
  'https://chat-app-client-bice-one.vercel.app',
];

const io = new Server(server, {
  cors: {
    origin: 'allowedOrigins',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
app.use(cors())
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes)
chatSocket(io);

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Connected to mongodb")).catch((err)=>console.log(err))

io.on('connection', (socket)=>{
 console.log("User connected", socket.id)

 socket.on("disconnect", ()=>{
  console.log("User disconnected", socket.id)
 })
})

server.listen(process.env.PORT, ()=>{
 console.log("Server running on port", process.env.PORT)
})