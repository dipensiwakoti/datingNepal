const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    message:String,
    senderId:{ 
        type:mongoose.Schema.Types.ObjectId,
         ref:'user',
    },
    receiverId:{ 
        type:mongoose.Schema.Types.ObjectId,
         ref:'user',
    },
    date : {
        type: Date,
        default:Date.now,
    },
})
 module.exports = mongoose.model('chat', chatSchema);   