import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkelton';

const ChatContainer = () => {
  const { selectedUser, getMessages, isMessageLoading } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col w-full">
       <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full">
      <ChatHeader />
       <MessageSkeleton />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;