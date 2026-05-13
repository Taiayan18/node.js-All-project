import { Student } from "../models/studentModel.js";

export const createStudent = async (req, res) => {
  try {
    const data = req.body;

  
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(400).json({
        status: false,
        message: "Payload missing",
      });
    }

  
    if (Array.isArray(data)) {
      const students = await Student.insertMany(data);

      return res.status(201).json({
        status: true,
        message: "Bulk students created",
        count: students.length,
        data: students,
      });
    }

    const { name, age, email, course, fees } = data;

    if (!name || !age || !email || !course || !fees) {
      return res.status(400).json({
        status: false,
        message: "Payload missing",
      });
    }

    const student = await Student.create(data);

    return res.status(201).json({
      status: true,
      message: "Single student created",
      data: student,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in creating Student ${error.message}`,
    });
  }
};


// ✅ GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    let { search, sortBy, order, page, limit } = req.query;

   
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    let query = {};


    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { course: { $regex: search, $options: "i" } },
        ],
      };
    }

    // 🔽 SORT
    let sortOption = {};
    if (sortBy) {
      sortOption[sortBy] = order === "desc" ? -1 : 1;
    }

    //  PAGINATION
    const skip = (page - 1) * limit;

    const students = await Student.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments(query);

    return res.json({
      status: true,
      message: "Students fetched",
      data: students,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        perPage: limit,
      },
    });
  } catch (error) {
    return res.json({
      status: false,
      message: `Error in getAll Students ${error.message}`,
    });
  }
};



// ✅ UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, course, fees } = req.body;

    if (!name || !email || !age || !course || !fees) {
      return res.json({
        status: false,
        message: "All fields are required",
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Student updated",
      data: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in updateStudent ${error.message}`,
    });
  }
};



// ✅ DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Student deleted",
      data: deletedStudent,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Error in deleteStudent ${error.message}`,
    });
  }
};