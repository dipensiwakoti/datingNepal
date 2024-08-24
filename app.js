const express= require('express');
const app= express();
const jwt= require('jsonwebtoken');
const path= require('path');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
const port = 3000;
const fs = require('node:fs');

//models imported
const userModel= require('./models/user');
const isLoggedIn= require('./middlewares/logInCheck');
const { log, profile } = require('console');
const upload = require('./multer/multer')


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/',(req,res)=> {
    res.render("losi",{flag:true, result:true,});
})
app.get('/test',(req,res)=> {
    res.render("dating");
})
app.get('/myprofile',isLoggedIn,async (req,res)=> {
    const email = req.user ;
    const user =await userModel.findOne({email});
    const pass =  user.ProfilePass;
    const jwt_main = req.cookies.ProfileName;
    const jwt_seondform = req.cookies.PhNumber;
    const jwt_thirdform = req.cookies.BioContent;
    if(jwt_main=='' || jwt_seondform==''  || jwt_thirdform=='' ){
        if(pass==0){
        res.redirect('/editprofile');
    }
    else {
        const email= req.user;
        const updatedUser =await userModel.findOne({email:`${req.user}`});
        if(updatedUser){
            const name=updatedUser.ProfileName;
            const age=updatedUser.Age;
            const email=updatedUser.email;
            const lookingFor=updatedUser.LookingFor;
            const profileName=updatedUser.ProfileName;
            const relationship=updatedUser.RelationshipStatus;
            const favSong=updatedUser.FavSong;
            const gender=updatedUser.Gender;
            const hobby=updatedUser.Hobby;
            const phNumber=updatedUser.PhNumber;
            const religion=updatedUser.Religion;
            const BioContent = updatedUser.BioContent;
            const QuoteContent = updatedUser.QuoteContent;
            const education=updatedUser.Educaion;
            const profilePic = updatedUser.profilepic;
            res.render("myprofile",{name,lookingFor,profileName,gender,hobby,religion,favSong,relationship,age,education,BioContent,QuoteContent,profilePic,phNumber});
        }
        }
}
    else {
        const email= req.user;
        const updatedUser =await userModel.findOne({email:`${req.user}`});
        if(updatedUser){
            const name=updatedUser.ProfileName;
            const age=updatedUser.Age;
            const email=updatedUser.email;
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

            res.render("myprofile",{name,lookingFor,profileName,gender,hobby,religion,favSong,relationship,age,education,BioContent,QuoteContent,profilePic,phNumber});
        }
        }
})
app.get('/editprofile',isLoggedIn,async (req,res)=> {
    const email = req.user ;
    const jwt_main = req.cookies.ProfileName;
    const jwt_seondform = req.cookies.PhNumber;
    const jwt_thirdform = req.cookies.BioContent;
    if(jwt_main!=='' && jwt_seondform!==''  && jwt_thirdform!=='' ){
        await userModel.findOneAndUpdate({email},{ProfilePass:"1"},{new:true});
    }
    const user = await userModel.findOne({email});
    const profileName = user.ProfileName;
    const profilepass = user.ProfilePass;
    const age = user.Age;
    const phNumber = user.PhNumber;
    const favSong = user.FavSong;
    const bioContent = user.BioContent;
    const quoteContent = user.QuoteContent;

    res.render("editprofile",{profileName,age,phNumber,favSong,bioContent,quoteContent,profilepass});      
})
app.get('/main',isLoggedIn,(req,res)=> {
    res.render("test");
})
app.get('/logout',isLoggedIn,(req,res)=> {
    res.cookie("token",'');
    res.cookie("PhNumber",'');
    res.cookie("BioContent",'');
    res.cookie("ProfileName",'');
    res.redirect('/');
})
app.post('/signup',async (req,res)=> {
    let{fullName,email,password}= req.body ;
    let user =await userModel.findOne({email});
    let allUser =await userModel.find();
    if(!user){
    bcrypt.genSalt(10, function(err,salt){
     bcrypt.hash(password,salt,async function(err,hash){
        let createdUser =await userModel.create({
            Name : fullName,
            email:email,
            password: hash,
        })
        const token = jwt.sign({email:email},"shhh");
        res.cookie("token",token);
        res.cookie("PhNumber",'');
        res.cookie("BioContent",'');
        res.cookie("ProfileName",'');
        const flag = true ;
        res.redirect('/main');
     })
    })
}
  else {
    const flag = false ;
    const result=true;
    res.render('losi',{flag,result});
  }

})
app.post('/login',async (req,res)=> {
    let{email,password}= req.body ;
    let user =await userModel.findOne({email});
    let allUser =await userModel.find();
    if(user){
        const hash = user.password ;
        bcrypt.compare(password,hash,function(err,result){
            if(result==true){
            const token = jwt.sign({email:email},"shhh");
            res.cookie("token",token);
            res.cookie("PhNumber",'');
            res.cookie("BioContent",'');
            res.cookie("ProfileName",'');
            const result= true ;
            res.redirect('/main');
              }
            else{
                const result = false ;
                const flag = true;
                res.render('losi',{result:result,flag});
            }
        })
}
  else {
    const result = false ;
    const flag = true;
    res.render('losi',{result:result,flag}); 
 }

})
app.post('/main', isLoggedIn, async (req, res) => {
    let { name, age, relationship, education, lookingFor } = req.body;
    let email = req.user;

        const user = await userModel.findOne({ email: email });
        
        if (user) {
            const mainUpdate = await userModel.findOneAndUpdate(
                { email },
                {
                    ProfileName: name,
                    Age: age,
                    RelationshipStatus: relationship,
                    Educaion: education, // Corrected typo here
                    LookingFor: lookingFor,
                },
                { new: true }
            );

            if (mainUpdate) {
                console.log('Updated Main Successfully');
                res.cookie("ProfileName","");
                const token = jwt.sign({ ProfileName: name }, "shhhh");
                res.cookie("ProfileName", token);
                res.redirect('/editprofile');
            }   
        } 
});
app.post('/secondForm', isLoggedIn,async (req,res)=>{
    const{phNumber,favSong,gender,hobby,religion,} = req.body;
    const email= req.user;
    const user =await userModel.findOne({email:email});
    if(user){
        const mainUpdate =await userModel.findOneAndUpdate({email},{ 
            FavSong:favSong,
            Gender:gender,
            PhNumber:phNumber,
            Hobby:hobby,
            Religion:religion,},
            { new: true });
        console.log('About Updated Sucessfully');
        const token = jwt.sign({PhNumber:phNumber},"shhhh");
        res.cookie("PhNumber",'');
        res.cookie("PhNumber",token);
        res.redirect('/editprofile');
    }
})          
app.post('/thirdForm', isLoggedIn,async (req,res)=>{
    const{bioContent,quoteContent,} = req.body;
    const email= req.user;
    const user =await userModel.findOne({email:`${req.user}`});
    if(user){
        const mainUpdate =await userModel.findOneAndUpdate({email:`${req.user}`},
            { 
            BioContent:bioContent,
            QuoteContent:quoteContent,},
            { new: true });
        console.log('Bio Updated Sucessfully');
        await user.save();
        const token = jwt.sign({BioContent:bioContent},"shhhh");
        res.cookie("BioContent",'');
        res.cookie("BioContent",token);
        res.redirect('/editprofile');
        
        const updatedUser =await userModel.findOne({email:`${req.user}`});
        console.log(updatedUser);
    }
})
app.post('/searchuser', isLoggedIn,async (req,res)=>{
    let{search}= req.body;
    let emailUser = req.user ;
    let updatedUser = await userModel.findOne({ProfileName:search});
        if(updatedUser){
            const name=updatedUser.Name;
            const age=updatedUser.Age;
            const email=updatedUser.email;
            const lookingFor=updatedUser.LookingFor;
            const profileName=updatedUser.ProfileName;
            const relationship=updatedUser.RelationshipStatus;
            const favSong=updatedUser.FavSong;
            const gender=updatedUser.Gender;
            const phNumber=updatedUser.PhNumber;
            const hobby=updatedUser.Hobby;
            const religion=updatedUser.Religion;
            const BioContent = updatedUser.BioContent;
            const QuoteContent = updatedUser.QuoteContent;
            const education=updatedUser.Educaion;
            const profilePic = updatedUser.profilepic;
            if(email==emailUser){
                res.redirect('/myprofile');
            }
            else{
            res.render("userProfile",{name,lookingFor,profileName,gender,hobby,religion,favSong,relationship,age,education,BioContent,QuoteContent,profilePic,phNumber});
             }
        }

    else{
        res.send("User with the name is not found!")
    }
})
app.get('/uploadprofile',isLoggedIn,(req,res)=>{
    res.render('uploadprofile');
})
app.post('/upload', upload.single('file'), isLoggedIn,async function (req, res) {
     const email =req.user ;
     const user = await userModel.findOne({email});
     const fn = user.profilepic;
     if(fn!="default_user.jpg"){
       fs.unlink(`./public/images/profilePictures/${fn}`,(err)=>{
        if(err) throw(err);
        else console.log('preve profile deleted and new is uploaded!');
       })
     }
     user.profilepic = req.file.filename;
     await user.save();
     res.redirect('/myprofile');
  })
app.get('/deleteprofile',isLoggedIn,async function (req, res) {
     const email =req.user ;
     const user = await userModel.findOne({email});
     const fn = user.profilepic;
     if(fn!="default_user.jpg"){
       fs.unlink(`./public/images/profilePictures/${fn}`,(err)=>{
        if(err) throw(err);
        else console.log('Profile Picture deleted!');
       })
     }
     user.profilepic ='default_user.jpg';
     await user.save();
     res.redirect('/myprofile');
  })
app.listen(3000);