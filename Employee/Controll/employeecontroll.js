import { employeedata } from "../Model/employe.js";

export const create = async (req, res) => {
  try {
    const { name, age, email, department, salary } = req.body;

    if (!name || !age || !email || !department || !salary) {
      return res.status(400).json({
        status: false,
        meassege: "Fill All Details",
      });
    }

    const employee = await employeedata.create({
      name,
      age,
      email,
      department,
      salary,
    });

    return res.status(201).json({
      status: true,
      meassege: "Create Employee",
      data: employee,
    });
  } catch (error) {
    console.log(`server error: ${error.message}`);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const delet = async (req, res) => {
  try {
    const { name } = req.params;

    const find = await employeedata.findOneAndDelete({ name });

    if (!find) {
      return res(400).json({
        status: false,
        message: "Data NOt Found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Delet Employee",
      data: find,
    });
  } catch (error) {
    console.log("Eror ");
  }
};

export const bulkemployees = async (req, res) => {
  try {
    const employee = req.body;

    if (!Array.isArray(employee)) {
      return res.status(400).json({
        status: false,
        message: "Invalid data OR not A Array",
      });
    }

    const result = await employeedata.insertMany(employee);

    return res.status(201).json({
      status: true,
      meassege: "Data inserted",
      data: result,
    });
  } catch (error) {}
};

export const getallemployes = async (req, res) => {
  try {
    const { search, setsort, order } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: "^" + search, $options: "i" } },
          { department: { $regex: "^" + search, $options: "i" } },
        ],
      };
    }

    let sortOption = {};

    if (setsort) {
      sortOption[setsort] = order === "desc" ? -1 : 1;
    }

    const employees = await employeedata.find(query).sort(sortOption);

    return res.json({
      status: true,
      message: "employee get",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in getAll Employees ${error.message}`,
    });
  }
};


export const update = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, age, email, department, salary } = req.body;

    const updatedEmployee = await employeedata.findByIdAndUpdate(
      id,
      { name, age, email, department, salary },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        status: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


  