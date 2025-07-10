// import React, { useState } from 'react'
// import { useRef } from 'react';
// import {X} from "lucide-react";
// import { ImageIcon,Send } from "lucide-react";
// import { useChatStore } from '../store/useChatStore';
// import {toast} from "react-hot-toast";

// const MessageInput = () => {

//   let {sendMessage} = useChatStore()

//   let [text  , setText] = useState("");
//   let [imagePreview , setImagePreview] = useState(null);
//   let fileInputRef = useRef(null);
//   let [isSending, setIsSending] = useState(false);




//   let hendelImageChange = (e) => {
//   let file = e.target.files[0];
//   if (!file) return;

//   if (!file.type.startsWith("image/")) {
//     toast.error("Please select an image file");
//     return;
//   }

//   let reader = new FileReader();
//   reader.onloadend = () => {
//     setImagePreview(reader.result);
//   };
//   reader.readAsDataURL(file);
// };


//   let removeImage = (e) => {

//               setImagePreview(null);
//             if (fileInputRef.current) fileInputRef.current.value = "";
//   };



//   let hendelSendMessage = async(e) => {
//    e.preventDefault();
//   if (!text.trim() && !imagePreview) return;

//   setIsSending(true); // start loader

//   try {
//     await sendMessage({
//       text: text.trim(),
//       image: imagePreview,
//     });

//     setText("");
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   } catch (error) {
//     console.error("Failed to send message!", error);
//   } finally {
//     setIsSending(false); // stop loader
//   }
//   };



//   return (
//     <div className='p-4 w-full'>

// {imagePreview && (
//   <div className="m-3 flex items-center gap-2">
//     <div className="relative">
//       {isSending ? (
//         <div className="w-20 h-20 rounded-lg flex items-center justify-center border border-zinc-700">
//           <span className="loading loading-spinner text-primary"><b>Loading...</b></span>
//         </div>
//       ) : (
//         <img
//           src={imagePreview}
//           alt="Preview"
//           className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
//         />
//       )}
//     </div>
//   </div>
// )}

//       <form onSubmit={hendelSendMessage} className='flex items-center gap-2'>       
//           <div className='flex-1 flex gap-3'>
//             <input type='text' className='w-full input input-bordered rounded-lg input-sm sm:input-md'  placeholder = 'Type something...' value={text} 
//                 onChange={(e) => setText(e.target.value)}/>
//                  <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={hendelImageChange}/>
//                  {/* <FaceExpressionDetector/> */}
//                <button
//                     type='button'
//                                     className={`sm :flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
//                                     onClick={() => fileInputRef.current.click()}
//                                >
//                               <ImageIcon className="w-4 h-4 "/>
                             
//                   </button>
//           </div>

//           <button type='submit' className='btn btn-sm btn-circle opacity-60' disabled={!text.trim() && !imagePreview}> <Send size={30}/></button>

//       </form>
        
      
//     </div>
//   )
// }

// export default MessageInput;

import React, { useState } from 'react'
import { useRef } from 'react';
import { X, ImageIcon, Send } from "lucide-react";
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStrore'; // ✅ ADDED
import { toast } from "react-hot-toast";
import FaceExpressionDetector from './FaceExpressionDetector'; // ✅ ADDED

const emojiMap = {
  happy: "😄",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  disgusted: "🤢",
  fearful: "😨",
  neutral: "😐",
};

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const { selectedUserExpression } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const hendelImageChange = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hendelSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsSending(true);

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message!", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='p-4 w-full'>

      {/* <FaceExpressionDetector />  */}

      {imagePreview && (
        <div className="m-3 flex items-center gap-2">
          <div className="relative">
            {isSending ? (
              <div className="w-20 h-20 rounded-lg flex items-center justify-center border border-zinc-700">
                <span className="loading loading-spinner text-primary"><b>Loading...</b></span>
              </div>
            ) : (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
            )}
          </div>
        </div>
      )}

      <form onSubmit={hendelSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-3 items-center'>

          <input
            type='text'
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='Type something...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={hendelImageChange}
          />

          <button
            type='button'
            className={`btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current.click()}
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* ✅ Expression Emoji for Logged-in User */}
          <span className="text-2xl">
            {emojiMap[selectedUserExpression] || <FaceExpressionDetector/>}
          </span>

        </div>

        <button
          type='submit'
          className='btn btn-sm btn-circle opacity-60'
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={30} />
        </button>
      </form>

    </div>
  )
}

export default MessageInput;