import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res) => {
    
    try {
        const {name, email, password, role} = req.body;

        // 1️⃣ Check if all required fields exist
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            });
        }

        // 3️⃣ Create new user
        const user = await User.create({
            name:name,
            email:email,
            password:password,
            role:role
        });

         // 4️⃣ Send success response (exclude password)
         return res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            data:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
         });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        });        
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        // 1️⃣ Check if email & password provided
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide email and password"
            });
        }

        // 2️⃣ Find user by email
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        // 3️⃣ Compare password
        const isMatch = await user.comparePassword(password); //Which becomes internally: bcrypt.compare("abcdef", "$2a$10$hashedValue...") and return true or false

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });
        }

        // 4️⃣ Generate JWT Token
        const token = jwt.sign(
            {
                id:user._id,                
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );

        // 5️⃣ Send response
        res.status(200).json({
            success:true,
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,               
                role:user.role
            }
        });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Internal Server Error",
                error:error.message
            });
        }
    }