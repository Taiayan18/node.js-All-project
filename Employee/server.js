import express, { Router } from "express"
import dotenv from "dotenv"
import Routes  from "./Routes/routes.js"
import { dbConnect } from "./config/db.js"
dotenv.config()

const app = express()

app.use(express.json())

await dbConnect()

app.use("/api/employee" , Routes )

app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
})