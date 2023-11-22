const jwtToken = require('jsonwebtoken');
const ErrorHandler = require('../utils/Errorhandler');
const catchAsyncError = require('./catchAsyncError');


exports.token = catchAsyncError(async(userid, statuscode,res) =>{
 
  const token =  jwtToken.sign({ id: userid }, process.env.jsonToken, {
        expiresIn: "7d",
      });
      
     const option =  {
        path: '/',
        expires:  new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: false,
        sameSite: 'lax',
      }
      return res.status(statuscode).cookie(String("Memories"), token,option).json({success:true, message:"Login Successfully"})
})



  exports.verifyUser = catchAsyncError(async (req, res, next) => {
    const cookie = req.headers.cookie
    if (!cookie) {
        return next(new ErrorHandler("CookieNot Found", 400))
    }
    const token = cookie.split('=')[1];
   
    jwtToken.verify(String(token), process.env.jsonToken, (err, user) => {
        if (err) {
            return next(new ErrorHandler("InValid Token", 404))
        } else {
            req.user = user.id
         
            next();
        }
    })

})





