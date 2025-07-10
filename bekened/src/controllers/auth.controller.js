
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export let Signup = async (req , res) => {

        const { fullName, email, password } = req.body;

       console.log(req.body);
       
        try{
               if (!fullName || !email || !password) {
                         return res.status(400).json({ message: "All fields are required" });
                  }
                if(password.length < 6)
                  {
                       return res.status(400).json({message: "password must be at least 6 character"});
                  }

                 let user = await User.findOne({email});

                 if(user)
                    {
                          return res.status(400).json({message:"Email is already exist"});
                    }


                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(password , salt);

             let newUser = new User({
                fullName,
                email,
                password: hashedPassword,
       });
   
       if(newUser)
       {
             await newUser.save();
            generateToken(newUser._id , res); 
           
            res.status(201).json({

                  _id : newUser._id,
                   fullName: fullName,
                   email: email,
                     profilePic: newUser.profilePic,
            });

          }else{

                 res.status(400).json({message:"Invalid user data"});
          }
      }catch(err){

            console.log("Error in signup controller",err.message);
            res.status(500).json({message:"Internal server Error"});
            
      }
}

export let Login = async (req , res) => {

      try{
            let {email , password } = req.body;

        let user = await User.findOne({email});

      if(!user)
      {
          return   res.status(400).json({message : "Invalid credential"});
      }
   

     const isPasswordCurrect = await bcrypt.compare(password , user.password);

     if(!isPasswordCurrect)
           {
               return  res.status(400).json({message : "Invalid credential"});
           }
   
              generateToken(user._id , res);

       res.status(200).json({

      _id: user._id,
      fullName: user.fullName,
      email:  user.email,
      profilePic:  user.profilePic,

    });

}catch(err)

      {
              console.log("Error in login controller",err.message);
              res.status(500).json({message:"Internal server Error"});
      }
    
}

export let Logout = (req , res) => {
      try{
     
        res.cookie("jwt" ,"", { maxAge: 0 });
        res.status(200).json({message:"Logout Successfully"});

      }catch(err)
      {
            console.log("Error in login controller",err.message);
            res.status(500).json({message:"Internal server Error"});
      }
}

export let updateProfile = async (req , res) =>{
 try{
        let {profilePic} = req.body;
        let userId = req.user.id;

        if(!profilePic)
        {
            return res.status(400).json({message:"profilePic is required"});
        }

        let uploadResponce = await cloudinary.uploader.upload(profilePic);
        let updateuser = await User.findByIdAndUpdate(userId , { profilePic : uploadResponce.secure_url },{new:true});

       res.status(200).json(updateuser);
       }catch(err){
            console.log("Error in update file");
            res.status(500).json({message:"Invalid Server Error "});

 }

}

export let checkAuth = (req , res)=>{
       try{
          res.status(200).json(req.user);
       }catch(err) {
         console.log("Error in checkAuth ");
         res.status(500).json({message : "Internal server Error"});
       }
}