const jwt = require('jsonwebtoken');

module.exports =function isLoggedIn(req,res,next){
   const cookie = req.cookies.token;
   if(cookie == null){
     res.redirect('/login');
   } else{
    try{
      const data = jwt.verify(cookie, 'shhh');
      req.user = data ;
      next();
    }
    catch(error){
      console.log('Error during JWT verification !',error);
      res.redirect('/login');
    }
   }
}