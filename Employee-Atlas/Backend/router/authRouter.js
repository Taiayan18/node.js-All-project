import { Router } from "express";
import { login, Register, getAllUsers } from "../controller/authControllr.js";

export const authRoute  = Router()

authRoute.post("/register", Register )
authRoute.post("/login" , login)
authRoute.get("/getusers", getAllUsers)