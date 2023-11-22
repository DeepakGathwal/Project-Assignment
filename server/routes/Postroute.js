const express = require('express');
const { uploadPost, getPost, viewPost, deletePost, editPost } = require('../controllers/PostController');
const upload = require('../middelwares/imageUpload');
const { verifyUser } = require('../middelwares/token');
const router = express.Router();

router.route('/post').post(verifyUser,uploadPost).get(verifyUser,getPost).put(verifyUser, editPost).delete(verifyUser, deletePost)
router.route('/all').get(viewPost)

module.exports = router;