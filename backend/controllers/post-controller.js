import Post from "../model/Post.js";


export const getAllPosts = async (req, res, next)=>{
    let posts;
    try {
        posts = await Post.find();
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
    const post = new Post({
        title,
        description,
        image,
        user,
    });
    try {
        await post.save()
    } catch (err) {
        return console.log(err)
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

    export const deletePost = async (req,res,next)=>{
        const id = req.params.id;
        let post;
        try{
            post = await Post.findByIdAndDelete(id)
        }catch(err){
            console.log(err);
        }
        if(!post){
            return res.status(500).json({message: "Unable to Delete"})
        }
        return res.status(200).json({message: "Successfully Deleted"})
    }