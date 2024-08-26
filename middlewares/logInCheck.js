const { model } = require("mongoose");
const jwt = require('jsonwebtoken')

module.exports =function isLoggedIn(req,res,next){
   const cookie = req.cookies.token;
   if(cookie === ""){
     res.redirect('/');
   } else{
     
   const data = jwt.verify(cookie, 'shhh');
   req.user = data ;
   next();
   }
}