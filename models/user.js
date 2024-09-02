const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DatingNepalTwo:DatingNepalTwoAgain@dating-nepal-test.b9ajo.mongodb.net/?retryWrites=true&w=majority&appName=Dating-Nepal-Test')
.then('Database connected Succesfully!')
.catch('Failed during database connection')

const userSchema = mongoose.Schema({
    Name : String,
    ProfileName : String,
    Age : Number,
    Gender:String,
    DOB:Number,
    Adress:String,
    RelationshipStatus:String,
    LookingFor:String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    email:String,
    password: String,
    Educaion:String,
    ProfilePass:{
        type:Number,
        default:'0',
    },
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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }],
    isOnline:{
        type: String , 
        default:'0',
    },
    socketId:String,
    chatFriends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }]
})
 
module.exports = mongoose.model('user', userSchema);   