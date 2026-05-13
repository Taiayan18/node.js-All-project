import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); 

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};