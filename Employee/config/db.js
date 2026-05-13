import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

 export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log("Db not Connected", error)
    }
}