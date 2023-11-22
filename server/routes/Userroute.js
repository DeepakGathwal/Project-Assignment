const express= require('express');
const router = express.Router();
const { login, register, getUser, refreshToken, logOut, allUsers, forgetPassword, updateProfile, deleteUser, coupenDiscount, Exchange } = require('../controllers/UserControl');
const upload = require('../middelwares/imageUpload');
const { verifyUser } = require('../middelwares/token');

router.route('/login').post(login).get(verifyUser,logOut)
router.route('/register').post(upload.single("photo"),register).delete(verifyUser,deleteUser)
router.route('/user').get(verifyUser,getUser)
router.route('/getUsers').get(verifyUser,allUsers).patch(forgetPassword)
router.route('/updateProfile').put(verifyUser,updateProfile)
router.route('/refresh').get(refreshToken,verifyUser,getUser)


module.exports = router;