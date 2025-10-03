import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Protect routes
const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user.id).select("-password"); //exclude password
        next();
    } catch (error) {
        console.error("Token is not valid",error);
        resize.status(401).json({message:"Not authorized"});
    }
    else{
        res.status(401).json({message:"Not authorized, no token"});
    }
}

// Admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(401).json({message:"Not authorized as an admin"});
    }
}

export {protect , admin}