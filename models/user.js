const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/datingChannel');
const userSchema = mongoose.Schema({
    Name : String,
    ProfileName : String,
    Age : Number,
    Gender:String,
    DOB:Number,
    Adress:String,
    RelationshipStatus:String,
    Educaion:String,
    LookingFor:String,
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
    FavSong:String,
    Gender:String,
    PhNumber:Number,
    Hobby:String,
    Religion:String,
    BioContent:String,
    QuoteContent:String,
})
 module.exports = mongoose.model('user', userSchema);   