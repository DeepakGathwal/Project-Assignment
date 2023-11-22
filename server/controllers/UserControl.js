const User = require('../Model/Users');
const catchAsyncerror = require('../middelwares/catchAsyncError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/Errorhandler');
const { token } = require('../middelwares/token');

// Register a User
exports.register = catchAsyncerror(async (req, res, next) => {
    const { fullName, phone,  email, password } = req.body;
    const {filename} = req.file;
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return next(new ErrorHandler("Profile Already Exist", 401))
    } else {
        const bcryptPass = bcrypt.hashSync(password)
        const user = new User({ email: email, phone: phone, fullName: fullName,  password: bcryptPass,image: filename});
        if (!user) {
            return next(new ErrorHandler("Please fill All fields", 404))
        }
        const userid = user._id
         res.clearCookie[`${userid}`]
            req.cookies[`${userid}`] = "";
        
        await user.save();
      token(userid,200,res) 
      
    }
}
)


// Login a User
exports.login = catchAsyncerror(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler("No user Found Please Registred First", 400))
    }
    const decryptPass =  bcrypt.compareSync(password, user.password)
   
    if (!decryptPass) {
       
        return next(new ErrorHandler("Email and Password are Invalid", 404))
    } else {
        const userid = user._id;
        res.clearCookie[`${userid}`]
        req.cookies[`${userid}`] = "";
      
       token(userid,200,res)
    }
})

// verify jwt token



// Refresh token after every 30s
exports.refreshToken = catchAsyncerror(async (req, res, next) => {
    const cookie = req.headers.cookie
    if (!cookie) {
        return next(new ErrorHandler("TimeOut Please Login Again", 400))
    }
    const token = cookie.split('=')[1];
    jwt.verify(String(token), process.env.jsonToken, (err, user) => {
        if (err) {
            return next(new ErrorHandler("InValid Token", 404))

        } else {
            const userid = user._id
            const token = jwt.sign({ id: userid }, process.env.jsonToken, {
                expiresIn: "7d",
            });
            res.clearCookie[`${userid}`]
            req.cookies[`${userid}`] = "";
            res.cookie(String(userid), token, {
                path: '/',
                expires:  new Date(Date.now() + 7 * 14 * 3600000),
                httpOnly: false,
                sameSite: 'lax',
            });
            req.user = user.id
            next()
        }
    });
})

// get current user data
exports.getUser = catchAsyncerror(async (req, res, next) => {
    const userid = req.user
    const user = await User.findById(userid,"-password")
    if (!user) {
        return next(new ErrorHandler("No user found Plese Login Again", 400))

    } else {
        return res.status(200).json({ user, status : true })
    }
})

// Logout current users
exports.logOut = catchAsyncerror(async (req, res, next) => {

    const {user} = req;
    if (!user) {
        return next(new ErrorHandler("No user found Plese Login Again", 400))
    }
    res.clearCookie(`Memories`)
    req.cookies[`Memories`] = "";
    return res.status(200).json({ status : true,message: "User Logout SuccessFully" })
})


// get allusers
exports.allUsers = catchAsyncerror(async (req, res, next) => {
    const user = req.user
    const users = await User.find({_id: { $ne: user } }).select([
            "email",
                "fullName",
                "phone",
                "image"
                
        ])
    return res.status(200).json({ user: users })
})

// forget password
exports.forgetPassword = catchAsyncerror(async (req, res, next) => {

    const { email, password, repeatpassword } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler("Profile Not Found", 400))
    }
    if (password === repeatpassword) {
        const bcryptPass = bcrypt.hashSync(password)
        user.password = bcryptPass;
        await user.save()
        return res.status(200).json({ message: "Password Changed Successfully" })
    } else {
        return next(new ErrorHandler("Password Not Matched", 400))

    }

})
// Update Profile
exports.updateProfile = catchAsyncerror(async (req, res, next) => {
    const newData = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
    }

    const userid = req.user
    const user = await User.findById(userid)
    if (!user) {
        return next(new ErrorHandler("No user found", 400))

    } else {
        const user = await User.findByIdAndUpdate(userid, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        await user.save();
        return res.status(200).json({ user: user })
    }
})

// Delete user
exports.deleteUser = catchAsyncerror(async (req, res, next) => {
    const userid = req.user
    const user = await User.findById(userid)
    if (!user) {
        return next(new ErrorHandler("No user found", 400))

    } else {
        res.clearCookie(`${userid}`)
        req.cookies[`${userid}`] = "";
        await user.deleteOne()
        return res.status(200).json({ message: "Profile Delete Successfully" })
    }
})


exports.getPasswordEmail = catchAsyncerror(async (req, res, next) => {

    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler("Profile Not Found", 400))
    }
   const resetPasswordToken = user.getResetPasswordToken()

   await user.save()

   const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/resetPassword/${resetPasswordToken}`;
   const message = `Reset  Passworrd by clicking on the link blow : \n \n ${resetUrl}`
   try{
    await sendEmail({email: user.email, subject:"Reset Password", message})
    res.status(200).json({
        success: true,
        message:`Email send to ${user.email}`,
    })
   } catch(error){
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    res.status(500).json({
        success: false,
        message:error.message,
    })
   }

})