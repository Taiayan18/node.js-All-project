import express, { Router } from "express"
import { bulkemployees, create, delet, getallemployes, update } from "../Controll/employeecontroll.js"

const route  = Router()

route.post("/create" , create)
route.delete("/delet/:name",delet)
route.post("/insert",bulkemployees)
route.get("/get", getallemployes) 
route.put("/update/:id", update)

export default route