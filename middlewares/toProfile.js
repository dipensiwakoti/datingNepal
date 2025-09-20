const isLoggedIn= require('./logInCheck');
module.exports = async function toProfile(req,res) {
    isLoggedIn ;
    const email= req.user.email;
    if (email== null) {
        console.log("heres the issue") ;
    }
    const users = await userModel.findOne({email}).populate('posts');
    const updatedUser =await userModel.findOne({email:`${req.user.email}`});
    if(updatedUser){
        const name=updatedUser.ProfileName;
        const age=updatedUser.Age;
        const lookingFor=updatedUser.LookingFor;
        const profileName=updatedUser.ProfileName;
        const relationship=updatedUser.RelationshipStatus;
        const phNumber=updatedUser.PhNumber;
        const favSong=updatedUser.FavSong;
        const gender=updatedUser.Gender;
        const hobby=updatedUser.Hobby;
        const religion=updatedUser.Religion;
        const BioContent = updatedUser.BioContent;
        const QuoteContent = updatedUser.QuoteContent;
        const education=updatedUser.Educaion;
        const profilePic = updatedUser.profilepic;
        
        res.render("myprofile",{name,lookingFor,profileName,gender,hobby,religion,favSong,relationship,age,education,BioContent,QuoteContent,profilePic,phNumber,users});
    }
} 
