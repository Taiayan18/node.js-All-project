import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import { Routes } from "./Rotes/ProductRouter.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

await connectDB()

app.use("/api/product" , Routes)


const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`Server is Connected ${PORT}`)

})