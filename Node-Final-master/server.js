import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/db.js'
import route from './routes/route.js'
dotenv.config()

const app = express()
app.use(express.json())
await dbConnect()

app.use("/api/auth", route)
app.use("/api/posts", route)

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`)
})