
import React from 'react'
import { useChatStore} from "../store/useChatStore";
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import NoChatSelected from '../component/NoChatSelected';

const Home = () => {
  let{selectedUser} = useChatStore();

  return (
    <div className='h-screen bg-blue-200'>
        <div className='flex items-center justify-center pt-20 px-4'>
             <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
                 <div className='flex h-full rounded-lg overflow-hidden'>
                  <Sidebar />
                  {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}

                 </div>

             </div>
          </div> 
    </div>
  )
}

export default Home
