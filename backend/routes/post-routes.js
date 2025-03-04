import express from "express";
import { addPost, deletePost, getAllPosts, getById, updatePost } from '../controllers/post-controller.js';
const postRouter = express.Router();

postRouter.get("/", getAllPosts)
postRouter.post("/add", addPost)
postRouter.put('/update/:id', updatePost)
postRouter.get("/:id", getById);
postRouter.delete('/:id',deletePost )

export default postRouter;