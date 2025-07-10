import React, { useEffect, useState } from 'react'
import {useChatStore} from "../store/useChatStore";
import SidebarSkeleton from '../component/SidebarSkeleton';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStrore';

const Sidebar = () => {
    let { getUsers , users ,  selectedUser ,  isUserLoading ,setSelectedUser}  =  useChatStore();

    let{ onlineUser} = useAuthStore();

    let [showOnlineOnly , setShowOnlineOnly] = useState(false);


    useEffect(()=>{
        getUsers();
    },[getUsers]);

    let filterUsers = showOnlineOnly ? users.filter(user => onlineUser.includes(user._id)) : users;

    if(isUserLoading) return <SidebarSkeleton />

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
           <div className='border-b border-base-300 w-full p-5'>
               <div className='flex items-center gap-2'>
                    <User className='size-6'/>
                      <span className='font-medium hidden lg:block '>Contacts </span>
               </div>
               {/* TODO : ONLINE FILTER  */}

                <div className='mt-3 hidden lg:flex items-center gap-2'>
                     <label className='cursor-pointer flex items-center gap-2'>
                           <input type='checkbox' checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)} className='checkbox checkbox-sm'/>
                            <span className='text-sm'> show Online Only </span>
                     </label>
                     <span className='text-xs text-zinc-500 '>({onlineUser.length-1} online)</span>
                </div>

           </div>
           <div className='overflow-y-auto w-full py-3'>
           

           {filterUsers.map((user) => (
  <button
    key={user._id}
    onClick={() => setSelectedUser(user)}
    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors duration-200
      ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
    `}
  >
    <div className='relative mx-auto lg:mx-0'>
      <img
        src={user.profilePic || "/avatar.png"}
        alt={user.name}
        className='w-10 h-10 object-cover rounded-full'
      />
       {onlineUser.includes(user._id) && (
    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
  )}
    </div>
    <div className='hidden lg:block text-lg min-w-0'>
      <div className='font-medium truncate'>{user.fullName}</div>
      <div className='text-sm text-zinc-400'>
        {onlineUser.includes(user._id) ? "online" : "offline"}
      </div>
    </div>
  </button>
))} 
{filterUsers.length === 0 && (
  <div className='text-center text-zinc-500 py-4'>No Online Users Exist</div>
)}

           </div>
    </aside>
  )
}

export default Sidebar;
