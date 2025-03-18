import mongoose from "mongoose"
const Schema = mongoose.Schema;
const postSchema = new Schema ({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isFavorite: { 
        type: Boolean, default: false // Add this field for favorite status
    },

});

export default mongoose.model("Post", postSchema);
