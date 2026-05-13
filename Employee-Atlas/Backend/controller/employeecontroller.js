import { Employee } from "../models/employeemodel.js";

// CreateEmployee

export const createemployee = async (req, res) => {
  try {
    const data = req.body;

    // ❌ अगर empty है
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(400).json({
        status: false,
        message: "Payload missing",
      });
    }

    // ✅ अगर array आया (50 employees)
    if (Array.isArray(data)) {
      const employees = await Employee.insertMany(data);

      return res.status(201).json({
        status: true,
        message: "Bulk employees created",
        count: employees.length,
        data: employees,
      });
    }

    // ✅ अगर single object आया
    const { name, age, email, department, salary } = data;

    if (!name || !age || !email || !department || !salary) {
      return res.status(400).json({
        status: false,
        message: "Payload missing",
      });
    }

    const employee = await Employee.create(data);

    return res.status(201).json({
      status: true,
      message: "Single employee created",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in creating Employee ${error.message}`,
    });
  }
};

// GEt All Data

export const getAllEmployee = async (req, res) => {
  try {
    let { search, sortBy, order, page, limit } = req.query;

    // Default values
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    // Safety checks
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    let query = {};

    // SEARCH
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { department: { $regex: search, $options: "i" } },
        ],
      };
    }

    // SORT
    let sortOption = {};
    if (sortBy) {
      sortOption[sortBy] = order === "desc" ? -1 : 1;
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    const employees = await Employee.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(query);

    return res.json({
      status: true,
      message: "employee get",
      data: employees,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        perPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: `Error in getAll Employees ${error.message}`,
    });
  }
};

// Update Empolyee

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, department, salary } = req.body;

    if (!name || !email || !age || !department || !salary) {
      return res.json({
        status: false,
        message: "All Fields are Required",
      });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not Exist",
      });
    }
    const updateEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: "Employee Got Updated",
      data: updateEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in UpdateEmployee ${error.message}`,
    });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      res.status(404).json({
        status: false,
        message: "Not Found",
      });
    }
    const deleteEmployee = await Employee.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Employee Deleted",
      data: deleteEmployee,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: false,
      message: `Error found in DeleteAPI ${error.message}`,
    });
  }
};
