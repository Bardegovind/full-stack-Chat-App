
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStrore";
import React, { useEffect, useRef } from 'react';
import formatMessageTime from "../lib/utils";

const MessageSkeleton = () => {

  const { message, selectedUser, getMessages, subscribeToMessages ,unsubscribeFromMessages  } = useChatStore();
  const { authUser } = useAuthStore();
  let messageEndRef = useRef(null);

  //console.log(message);

  useEffect(() => {

    if (selectedUser?._id) getMessages(selectedUser._id);

            subscribeToMessages();

       return ()=> unsubscribeFromMessages();

  }, [selectedUser?._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);





  useEffect(()=>{
      if(messageEndRef.current && message)
      {
            messageEndRef.current.scrollIntoView({behavior:"smooth"});
      }
  },[message]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {message.map((msg) => {
       const isOwnMessage = msg.senderId === authUser._id || msg.senderId?._id === authUser._id;

      return (
             <div key={msg._id} className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
      
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-base-300">
          <img
            src={
              isOwnMessage
                ? authUser.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Timestamp */}
      <div className="chat-header mb-1 text-xs sm:text-sm opacity-50">
        {formatMessageTime(msg.createdAt)}
      </div>

      {/* Message Bubble */}
      <div className="chat-bubble p-2 sm:p-3 text-sm max-w-[60%] sm:max-w-xs">
        {msg.image && (
          <img
            src={msg.image}
            alt="attachment"
            className="w-32 h-auto sm:w-40 rounded-md mb-1"
          />
        )}
        {msg.text && <p>{msg.text}</p>}
      </div>
    </div>
  );
})}
    </div>
  );
};

export default MessageSkeleton;
