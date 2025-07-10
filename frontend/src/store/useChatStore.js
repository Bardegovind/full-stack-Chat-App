import {create} from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios";
import { useAuthStore} from "./useAuthStrore";



export let useChatStore = create((set,get) =>({
    
    message:[],
    users:[],
    selectedUser: null,
    isUserLoading : false,
    isMessageLoading : false,

    getUsers : async () => {

        set({isUserLoading : true});
        try {
            let res = await axiosInstance.get("/messages/users");
            set({users: res.data});
            
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{

            set({isUserLoading: false});
        }

    },

    getMessages: async (userId) => {

        set({isMessageLoading : true});
        try {
            let res = await axiosInstance.get(`/messages/${userId}`);
             set({message : res.data});

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading: false});
        }
        
    },

    sendMessage : async (messageData) => {
        let {message , selectedUser} = get();
        try {
            let res = await axiosInstance.post(`messages/send/${selectedUser._id}`,messageData);

              set({message : [...message ,res.data]});

        } catch (error) {
             toast.error(error.response.data.message);
        }
    }, 

    subscribeToMessages: () => {

        let {selectedUser} = get();

        if(!selectedUser) return;

        let socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=> {
             if(newMessage.senderId !== selectedUser._id)  return;
            set({ 
                 message: [...get().message , newMessage],
            })
        })

    },

    unsubscribeFromMessages : () =>{
        let socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    subscribeToExpressions: () => {
    const socket = useAuthStore.getState().socket;
    socket.on("userExpression", ({ userId, expression }) => {
    const currentSelected = get().selectedUser;
    if (currentSelected && currentSelected._id === userId) {
      set({ selectedUserExpression: expression });
    }
  });
},
   

    setSelectedUser : async (selectedUser) => set({selectedUser}), 

}))