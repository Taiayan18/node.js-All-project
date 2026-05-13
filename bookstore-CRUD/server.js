import express from "express"
import mongoose from "mongoose"
import { route } from "./routes/bookroutes.js"


 const app = express()

app.use(express.json())

app.use("/api",route)


mongoose.connect("mongodb+srv://ayan:ayan%401718@ayan.epddrig.mongodb.net/bookdb")
.then(()=>console.log("DB Connected"))
.catch((err)=> console.log("DB is  not connect",err))

app.listen(3000,()=>{
    console.log("server  runnig")
})







