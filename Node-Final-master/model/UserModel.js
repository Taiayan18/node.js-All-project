import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    tags: {
        type: [String],
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
}, { timestamps: true })


export const Product = mongoose.model("Product", ProductSchema)