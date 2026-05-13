import mongoose  from "mongoose";

const bookschema= new mongoose.Schema({
    id:Number,
    title: String,
    author: String,
    price:Number
})

const book = mongoose.model("book",bookschema)

export default book


