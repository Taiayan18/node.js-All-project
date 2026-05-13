import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  course: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);