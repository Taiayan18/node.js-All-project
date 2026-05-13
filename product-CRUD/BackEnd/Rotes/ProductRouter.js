import { Router } from "express";
import {  bulkProduct, createProduct, getbysingleproduct, getproduct } from "../controller/ProductController.js";
import { createcategory, getCaterory } from "../controller/categoryController.js";

 export const Routes = Router()

Routes.post("/createProduct" , createProduct)
Routes.get("/getProduct/:id", getproduct)
Routes.get("/singleProductget/:id", getbysingleproduct)
Routes.post("/Bulkproduct", bulkProduct)



// create category

Routes.post("/createcategory" , createcategory)
Routes.get("/Findcategory" , getCaterory)