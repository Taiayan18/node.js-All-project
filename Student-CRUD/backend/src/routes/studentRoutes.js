import express from "express";
import { createStudent, deleteStudent, getAllStudents, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/create", createStudent);
router.put("/update/:id",updateStudent)
router.get("/getstudent", getAllStudents)
router.delete("/delete/:id", deleteStudent)

export default router;
