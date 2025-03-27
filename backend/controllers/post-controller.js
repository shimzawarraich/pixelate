import Post from "../model/Post.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllPosts = async (req, res, next) => {
    try {
        const { search, category } = req.query; 
        let query = {}; 

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' }}, 
                { description: { $regex: search, $options: 'i'}}
            ];
        }

        if (category && category !== 'All'){
            const categoryQuuery = {
                $or: [
                    {title: { $regex: category, $options: 'i'}}, 
                    {description: { $regex: category, $options: 'i'}}
                ]
            }
            if (Object.keys(query).length > 0) {
                query = {
                    $and: [query, categoryQuuery]
                }
            } else {
                query = categoryQuuery
            }
        }
        const posts = await Post.find(query).populate("user");
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No Posts Found" });
        }
        return res.status(200).json({ posts }); // Ensure this returns isFavorite & likes
    } catch (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).json({ message: "Error fetching posts" });
    }
};


export const addPost = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
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

    export const getById = async (req, res, next) => {
        const id = req.params.id;
        try {
            const post = await Post.findById(id).populate("user"); // Ensure user data is included
            if (!post) {
                return res.status(404).json({ message: "No Post Found" });
            }
            return res.status(200).json({ post }); // Send full post object
        } catch (err) {
            console.error("Error fetching post:", err);
            return res.status(500).json({ message: "Error fetching post" });
        }
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
    
    export const toggleFavorite = async (req, res, next) => {
        const { id } = req.params;
        const { userId } = req.body; // Get user ID from request body

        try {
            let post = await Post.findById(id);
    
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
    
        const userIndex = post.likedBy.indexOf(userId);
        if (userIndex === -1) {
            // User hasn't liked it yet, so like the post
            post.likedBy.push(userId);
            post.likes += 1;
        } else {
            // User has already liked it, so unlike the post
            post.likedBy.splice(userIndex, 1);
            post.likes = Math.max(0, post.likes - 1);
        }

        await post.save();
        return res.status(200).json(post);
        } catch (err) {
            console.error("Error toggling favorite:", err);
            return res.status(500).json({ message: "Failed to toggle favorite status" });
        }
    };

    export const getLikedPosts = async (req, res) => {
        const { userId } = req.params;
    
        try {
            const likedPosts = await Post.find({ likedBy: userId }).populate("user", "name");
            res.status(200).json({ posts: likedPosts });
        } catch (error) {
            console.error("Error fetching liked posts:", error);
            res.status(500).json({ message: "Failed to get liked posts" });
        }
    };
    