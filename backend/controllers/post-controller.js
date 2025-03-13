import Post from "../model/Post.js";
import User from "../model/User.js";
import mongoose from "mongoose";


export const getAllPosts = async (req, res, next)=>{
    let posts;
    try {
        posts = await Post.find().populate("user");
    } catch (err){
        return console.log(err)
    }
    if (!posts) {
        return res.status(404).json({message:"No Posts Found"})
    }
    return res.status(200).json({posts})
}

export const addPost = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await  User.findById(user);
    } catch (err){
        return console.log(err)
    }
    const post = new Post({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({session});
        existingUser.posts.push(post);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (err) {
        return console.log(err)
        return res.status(500).json({message: err})
    }
    if (!existingUser){
        return res.status(400).json({message:"Unable To Find The User By This Id"})
    }
    return res.status(200).json({post});
};

export const updatePost = async(req, res, next)=>{
    const {title, description} = req.body;
    const postId = req.params.id;
    let post;
    try{
        post = await Post.findByIdAndUpdate(postId, {
            title,
            description
    })
    }catch(err){
        return console.log(err)
    }   
    if (!post){
        return res.status(500).json({message: "Unable to Update the Post"})
    }
    return res.status(200).json({post})
    };

    export const getById = async (req, res, next)=>{
        const id = req.params.id;
        let post;
        try{
            post = await Post.findById(id);
        }catch(err){
            return console.log(err);
        }
        if(!post){
            return res.status(404).json({message: " No Post Found"})
        }
        return res.status(200).json({post})
    };

    export const deletePost = async (req, res, next) => {
        const id = req.params.id;
    
        try {
            // Find the post and populate the user field
            const post = await Post.findById(id).populate("user");
    
            // If the post does not exist, clean up any stale references in users
            if (!post) {
                await User.updateMany({}, { $pull: { posts: id } });
                return res.status(404).json({ message: "Post not found and references removed" });
            }
    
            const session = await mongoose.startSession();
            session.startTransaction();
    
            // Remove the post from the user's post list if it has an associated user
            if (post.user) {
                post.user.posts.pull(post._id);
                await post.user.save({ session });
            }
    
            // Delete the post
            await Post.findByIdAndDelete(id, { session });
    
            await session.commitTransaction();
            session.endSession();
    
            return res.status(200).json({ message: "Post successfully deleted" });
    
        } catch (err) {
            console.error("Error deleting post:", err);
            return res.status(500).json({ message: "Error deleting post" });
        }
    };

    export const getByUserId = async(req, res, next) => {
        const userId = req.params.id;
        let userPosts;
        try{
            userPosts = await User.findById(userId).populate("posts");        
        }catch (err){
            return console.log(err)
        }
        if (!userPosts){
            return res.statuss(404).json({ message: "No posts found"})
        }
        return res.status(200).json({ user: userPosts})
    }
    