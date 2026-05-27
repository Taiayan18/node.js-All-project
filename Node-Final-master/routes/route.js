import express, { Router } from 'express'
import { UserLogin, UserRegister } from '../controler/authControler.js'
import { CreateProduct, DeleteProduct, GetProduct, GetSingleProduct, UpdateProduct } from '../controler/ProductControler.js'
import { middleWare } from '../middleware/middleware.js'

const route = Router()

// User Register and Login
route.post("/register", UserRegister)
route.post("/login", UserLogin)

// user Product 
route.post("/Create", middleWare,CreateProduct)
route.get("/Get",middleWare, GetProduct)
route.get("/Get/:id",middleWare, GetSingleProduct)
route.put("/Update/:id",middleWare, UpdateProduct)
route.delete("/Delete/:id",middleWare, DeleteProduct)

export default route