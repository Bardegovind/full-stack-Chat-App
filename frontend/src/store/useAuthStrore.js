import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
let BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001":"/";


export const useAuthStore = create((set , get) => ({

     authUser: null,
     isSigningUp: false,
     isLoggingUp: false,
     isUpdating: false,
     isCheckingAuth: true,
     onlineUser : [],
     socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check",{ withCredentials: true });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
   },

   signup : async(data)=>{

     set({isSigningUp:true});

       try {
              let res = await axiosInstance.post("/auth/signup" , data);
            
              set({authUser : res.data});
              toast.success("Account Created Successfully");
              get().connectSocket();

       } catch (error) {
          
         toast.error(error.response.data.message);
        
       }finally{

           set({isSigningUp : false});
       }
   },

   login: async(data) => {

            set({ isLoggingUp : true});
             
            try {
                  let res = await axiosInstance.post("/auth/login" ,data);
                   
                  set({authUser : res.data});
                  toast.success("Logged in successfully");
                  get().connectSocket();

            } catch (error) {
                 
                  toast.error(error.response.data.message);

            }finally{
              
              set({isLoggingUp : false});
            }

   },

   logout : async () =>{
    try {
      
          await axiosInstance.post("/auth/logout");
          set({authUser : null});
          toast.success("logged out successfully");
          get().disconnectSocket();

    } catch (error) {
       toast.error(error.response.data.message);
    }
   },

   updateProfile : async (data) =>{

      set({ isUpdating : true});

    try {
          let res = await axiosInstance.patch("/auth/update-profile" ,data);
                    set({authUser : res.data});
                    toast.success("Profile upadated successfully");
                    console.log(res.data);
    } catch (error) {

                    toast.error(error.response.data.message);
    }finally{

                set({isUpdating:false});
          }
   },

   connectSocket : () => {
    let {authUser} = get();

    if(!authUser || get.socket?.connected) return;
    let socket = io(BASE_URL ,{
      query:{
         userId: authUser._id,
        }
    });

    socket.connect();

    set({socket : socket});

    socket.on("getOnlineUsers" ,(userIds) =>{
      
       set({onlineUser: userIds});
    })
      
   },
    
  disconnectSocket: () => {
  if (get().socket?.connected) {
     get().socket.disconnect();
   }
}


}));  