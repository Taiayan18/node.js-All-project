
import mongoose from "mongoose"


 export const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is Connected")
    } catch (error) {
        console.log(error.message);
        
    }
}