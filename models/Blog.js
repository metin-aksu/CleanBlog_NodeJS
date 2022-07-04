import mongoose from "mongoose";
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;