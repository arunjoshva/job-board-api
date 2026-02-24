import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req,res,next) => {
    try {
        let token;

        // 1️⃣ Check if Authorization header exists
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        // 2️⃣ If token not found
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Not Authorized, Token Missing"
            });
        }

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Get user from database (exclude password)
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            });
        }

         // 5️⃣ Attach user to request object
         req.user = user;

         next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Not Authorized, Token Invalid"
        });
    }
};