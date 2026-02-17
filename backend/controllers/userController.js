import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Generate a token 
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

//Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one special character" });
    }
    if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one uppercase letter" });
    }
    if (!/[a-z]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one lowercase letter" });
    }
    if (/\s/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must not contain spaces" });
    }
    if (password.toLowerCase().includes("password")) {
      return res
        .status(400)
        .json({ message: "Password must not contain the word 'password'" });
    }
    if (password.toLowerCase().includes(name.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Password must not contain the user's name" });
    }
    if (password.toLowerCase().includes(email.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Password must not contain the user's email" });
    }
    
    //Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
   
    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ 
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        message: "User registered successfully", 
        token: generateToken(newUser._id) 
    });
    } catch (e) {
    res.status(500).json({ 
        message: "Server error",
        error: e.message
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        //Check User Exist OR Not
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "user not found"})
        }

        //Compare Pass
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"});
        }

        //Success response
        res.json({
            message: "Login success",
            token: generateToken(newUser._id),
            user: {
                id: user._id,
                email: user.email,
                name:user.name
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//Get User profile
export const getUserProfile = async (res, req) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.json(user)
    } catch (e) {
        res.status(500).json({ 
        message: "Server error",
        error: e.message
    });
    }
}