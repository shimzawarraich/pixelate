import Post from "../model/Post.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllPosts = async (req, res, next) => {
    let posts;
    try {
        posts = await Post.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to get all posts" });
    }
    if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No Posts Found" });
    }
    return res.status(200).json({ posts });
};

export const addPost = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "Unable to find the user by this ID" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error finding user" });
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
        await post.save({ session });
        existingUser.posts.push(post);
        await existingUser.save({ session });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating post" });
    }

    return res.status(201).json({ post });
};

export const updatePost = async (req, res, next) => {
    const { title, description } = req.body;
    const postId = req.params.id;
    let post;

    try {
        post = await Post.findByIdAndUpdate(postId, { title, description }, { new: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating post" });
    }

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
};

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let post;

    try {
        post = await Post.findById(id).populate("user");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving post" });
    }

    if (!post) {
        return res.status(404).json({ message: "No Post Found" });
    }

    return res.status(200).json({ post });
};

export const deletePost = async (req, res, next) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id).populate("user");

        if (!post) {
            await User.updateMany({}, { $pull: { posts: id } });
            return res.status(404).json({ message: "Post not found and references removed" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        if (post.user) {
            post.user.posts.pull(post._id);
            await post.user.save({ session });
        }

        await Post.findByIdAndDelete(id, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Post successfully deleted" });

    } catch (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({ message: "Error deleting post" });
    }
};

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userPosts;

    try {
        userPosts = await User.findById(userId).populate("posts");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to get posts for this user" });
    }

    if (!userPosts || !userPosts.posts.length) {
        return res.status(404).json({ message: "No posts found for this user" });
    }

    return res.status(200).json({ posts: userPosts.posts });
};
