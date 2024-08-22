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


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/',(req,res)=> {
    res.render("losi",{flag:true, result:true,});
})
app.get('/test',(req,res)=> {
    res.render("test");
})
app.get('/myprofile',(req,res)=> {
    res.render("myprofile");
})
app.get('/editprofile',(req,res)=> {
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

app.listen(port);