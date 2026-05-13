import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import dotenv from "dotenv"
import { employeeRouter } from "./router/employeerouter.js"
import {  authRoute } from "./router/authRouter.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

await connectdb()

const PORT = process.env.PORT

app.use("/api/employee", employeeRouter)
app.use("/api/authUsers", authRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT} `);
    
})