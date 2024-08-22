const express= require('express');
const app= express();
const jwt= require('jsonwebtoken');
const path= require('path');
const bcrypt= require('bcrypt');
const cookieParser = require('cookie-parser');
const port = 3000;

//models imported
const userModel= require('./models/user');
const isLoggedIn= require('./middlewares/logInCheck');
const { log } = require('console');


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/',(req,res)=> {
    res.render("losi",{flag:true, result:true,});
})
app.get('/test',isLoggedIn,(req,res)=> {
    res.render("test");
})
app.get('/myprofile',isLoggedIn,(req,res)=> {
    res.render("myprofile");
})
app.get('/editprofile',isLoggedIn,(req,res)=> {
    res.render("editprofile");
})
app.get('/main',isLoggedIn,(req,res)=> {
    res.render("dating");
})
app.get('/logout',isLoggedIn,(req,res)=> {
    res.cookie("token",'');
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
    res.send("Something went wrong !")
  }

})
app.post('/main', isLoggedIn,async (req,res)=>{
    const{name,age,relationship,education,lookingFor} = req.body ;
    const email= req.user;
    const user =await userModel.findOne({email:email});
    if(user){
        const mainUpdate =await userModel.findOneAndUpdate({email},{ProfileName:name,Age:age,RelationshipStatus:relationship,Education:education,LookingFor:lookingFor},{ new: true });
        console.log('Updated Main Sucessfully');
    }
})  
app.post('/secondForm', isLoggedIn,async (req,res)=>{
    const{phNum,favSong,gender,hobby,religion,} = req.body;
    const email= req.user;
    const user =await userModel.findOne({email:email});
    if(user){
        const mainUpdate =await userModel.findOneAndUpdate({email},{ 
            FavSong:favSong,
            Gender:gender,
            PhNumber:phNum,
            Hobby:hobby,
            Religion:religion,},{ new: true });
        console.log('About Updated Sucessfully');
    }
})  
app.post('/thirdForm', isLoggedIn,async (req,res)=>{
    const{bioContent,quoteContent,} = req.body;
    const email= req.user;
    const user =await userModel.findOne({email:email});
    if(user){
        const mainUpdate =await userModel.findOneAndUpdate({email},{ 
            BioContent:bioContent,
            QuoteContent:quoteContent,},
            { new: true });
        console.log('Bio Updated Sucessfully');
       await user.save();
        const updatedUser =await userModel.findOne({email});
        console.log(updatedUser);
    }
})  

app.listen(4000);