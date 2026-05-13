import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryID : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: "category"
  }
},{timestamps : true});

export const Product = mongoose.model("product", productSchema);
