import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
export const  protectRoute = async (req , res , next)=>{
  try{
       let token = req.cookies.jwt;
       
       if(!token)
       {
           return res.status(401).json({message: "Unauthorized - No Token Provided!"});
       }

       let decoded = jwt.verify(token ,process.env.JWT_SECRET);

        if(!decoded)
       {
           return res.status(401).json({message: "Unauthorized - Invalid Token "});
       }

       let user = await User.findById(decoded.userId).select("-password");
       if(!user)
       {
        return res.status(401).json({message: "User not found"});
       }

       req.user = user;

       next();

  }catch(err){
    console.log("Error in protectRoute middleware ",err.message);
      res.status(500).json({message: "Internal server Error"});
  }
};