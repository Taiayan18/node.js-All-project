import express, { Router } from "express"
import { createemployee, deleteEmployee, getAllEmployee, updateEmployee } from "../controller/employeecontroller.js"

 export const employeeRouter = Router()



 employeeRouter.post("/create", createemployee)
employeeRouter.put("/update/:id", updateEmployee);
 employeeRouter.get("/getdata/:id" , getAllEmployee)
employeeRouter.delete("/delete/:id", deleteEmployee);
employeeRouter.get("/getdata", getAllEmployee)