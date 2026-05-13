import jwt from "jsonwebtoken";
import { User } from "../models/authModel.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  let user;
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Patload missing",
      });
    }

    const exitingUser = await User.findOne({ email });

    if (exitingUser == true) {
      return res.status(400).json({
        status: false,
        message: "User Already Register",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return res.status(201).json({
      status: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in Register ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Payload MIssing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JSON_SECRET_TOKEN);

    return res.status(200).json({
        status:true,
        message : "Login Succesfully",
        data : {ismatch,token}
    })
  } catch (error) {
    return res.status(500).json({
        status:false,
        message : `Error in Login ${error.message}`
    })
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    return res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error in fetching users ${error.message}`
    });
  }
};
