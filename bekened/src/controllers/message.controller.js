import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async(req ,res) =>{
      try {

           const loggedInUser = req.user._id;
           const fillterUser = await User.find({_id : {$ne: loggedInUser}}).select("-password");
           res.status(200).json(fillterUser);

      } catch (error) {

        console.log("Error in getUserSidebar ");
        res.status(500).json({message:"Internal server Error"});
        
      }
};

export const getMessages = async(req , res)=> {
             try {
                let{id : userToChatId } = req.params;
                let myId = req.user._id;

                let messages =  await Message.find({$or:[
                    {senderId:myId , receiverdId:userToChatId},
                    {senderId:userToChatId , receiverdId:myId},
                ] });

                res.status(200).json(messages);

             } catch (error) {
                console.log("Error in getMessage in controller");
                res.status(500).json({message:"Internal server Error"});
             }             
};

export const sendMessage = async(req , res) =>{
        try {

            let {text , image}  =  req.body;

            let {id : receiverdId} = req.params;

            let senderId = req.user._id;

            let imageURL;
            if(image)
            {
                let uploadResponce = await cloudinary.uploader.upload(image);
                imageURL = uploadResponce.secure_url; 
            }

          let newMessage = new Message({
              senderId,
              receiverdId,
              text,
              image : imageURL,
          });

        await newMessage.save();

        //todo : realtime functionality gose here  => soket.io

        let receiverSocketId = getReceiverSocketId(receiverdId);

        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage" ,newMessage);
        }

        res.status(201).json(newMessage);


        } catch (error) {

            console.log("Error in sendMessage controller ");
            res.status(500).json({error:"Internal server error"});
            
        }     
};