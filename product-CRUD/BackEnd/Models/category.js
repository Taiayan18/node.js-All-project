import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    }
})

export const catagory = mongoose.model("catagory" , catagorySchema)