import mongoose, { Types } from "mongoose";

const messageSchem = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    receiverdId:{
        type :mongoose.Schema.Types.ObjectId,
        rel:"User",
        required: true,
    },
    text:{
        type:String,
    },
    image:{
        type:String
    },
    
    
},{timestamps : true});
const Message = mongoose.model("Message" ,messageSchem);
export default Message;