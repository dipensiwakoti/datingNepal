const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/datingChannel');
const userSchema = mongoose.Schema({
    Name : String,
    Age : String,
    Gender:String,
    DOB:Number,
    Adress:String,
    RelationshipStatus:String,
    Degree:String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    email:String,
    password: String,
    profilepic:{
        type:String,
        default:'default_user.jpg',
    },
})
 module.exports = mongoose.model('user', userSchema);   