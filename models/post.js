const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    ProfileName : String,
    Time:String,
    Text:String,
    date : {
        type: Date,
        default:Date.now,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    like:Number,
})
 module.exports = mongoose.model('post', postSchema);   