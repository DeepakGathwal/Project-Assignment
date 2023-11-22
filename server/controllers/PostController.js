const catchAsyncError = require("../middelwares/catchAsyncError")
const Post = require('../Model/Posts');
const ErrorHandler = require("../utils/Errorhandler");

exports.uploadPost = catchAsyncError(async(req,res, next) =>{
    const user = req.user;
   
    const {title, description} = req.body
    if(!user){
        return next(new ErrorHandler("No user found Plese Login Again", 400))
    }else{
      
        const post = await Post.create({ title:title, description:description, owner : user});
      
        if(!post){
          
            return next(new ErrorHandler("Someting wrong Happend", 400))
        }else{
            await post.save()
            return res.status(200).json({sucess:true,message:post})
        }
    }
    
})

exports.getPost = catchAsyncError(async(req,res, next) =>{
    const {user} = req;
   
        const post = await Post.find({owner:user});
        if(!post) return next(new ErrorHandler("Someting wrong Happend", 400))
        else return res.status(200).json({status : true,post})
        
})

exports.viewPost = catchAsyncError(async(req,res, next) =>{

        const post = await Post.find().populate('owner');
      
        if(!post) return next(new ErrorHandler("Someting wrong Happend", 400))
        else return res.status(200).json({status : true,post})
        
})

exports.deletePost = catchAsyncError(async(req,res, next) =>{
    const {id} = req.query;
        const post = await Post.findByIdAndDelete({_id : id},  {
            runValidators: true,
            useFindAndModify: false});
      
        if(!post) return next(new ErrorHandler("Someting wrong Happend", 400))
        else return res.status(200).json({status : true,message : "Post Deleted Susscessfully"})
        
})

exports.editPost = catchAsyncError(async(req,res, next) =>{

    const newData = {
      
        title: req.body.title,
        id: req.body._id,
        description: req.body.description,
        
    }
        const post = await Post.findById(newData.id);
     
        if(!post) return next(new ErrorHandler("Someting wrong Happend", 400))

        else {
        const data =  await Post.findByIdAndUpdate(newData.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        await data.save()
        return res.status(200).json({status : true,message : "Post Edit Susscessfully"})
    }
        
})
