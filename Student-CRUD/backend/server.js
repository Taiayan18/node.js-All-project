import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectdb } from "./src/config/db.js";
import router from "./src/routes/studentRoutes.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

await connectdb()

const PORT = process.env.PORT 


app.use("/api/students", router);



app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`);
})