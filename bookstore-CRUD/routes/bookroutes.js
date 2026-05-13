import { Router } from "express";
import { addbook, deletebook, Update } from "../controllers/bookController.js";

export const route= Router()

route.post("/add",addbook)
route.delete("/delete",deletebook)
route.put("/update", Update)