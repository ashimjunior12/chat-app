const Message = require('../models/messageModel')
const User = require('../models/userModel')

const getStats = async(req,res) =>{
 const totalMessages = await Message.countDocuments();
 const totalUsers = await await User.countDocuments();

 res.json({totalMessages, totalUsers})
}

module.exports = {getStats}