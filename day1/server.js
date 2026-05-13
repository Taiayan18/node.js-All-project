import express from "express"

const app = express()
app.use(express.json())


let users =[
    {id:1,name:"ayan",age:18},
    {id:2,name:"arman",age:18},
    {id:3,name:"jinay",age:22},
    {id:4,name:"zed",age:18}
]



app.delete("/deleteUser",(req,res)=>{
    const id = parseInt(req.query.id)

    const index = users.findIndex(user => user.id === id)

    if(index == -1 ){
        return res.status(404).json({status:false,message:"not found"})
    }

    users.splice(index,1)

    return res.status(200).json({
        status:true,
        message:"User Delete",
        data:users
    })
})

app.put("/updateUser",(req,res)=>{
    const id = parseInt(req.query.id)
    const {name,age} = req.body

    const user = users.find(u => u.id === id)


    if(!user){
        return res.status(404).json({message:"User Not found"})
    }

    if(name) user.name =name
    if(age) user.age =age

    res.status(200).json({
        status:true,
        message:"Update User",
        data:users
    })
})




app.listen(3000,()=>{
    console.log("server is runing 3000")
})