import Navbar from "./component/Navbar";
import {Routes , Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import  Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStrore";
import {useThemeStore} from "./store/useThemstore";
import { useChatStore } from "./store/useChatStore";

import { useEffect } from "react";
import {Loader, TreeDeciduous} from "lucide-react";

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUser,socket } = useAuthStore();
  let {subscribeToExpressions}  = useChatStore();
useEffect(() => {
  checkAuth();
}, [checkAuth]);
//  console.log({authUser});
console.log(onlineUser);

useEffect(() => {
  if (authUser) {
    
    subscribeToExpressions();
  }
}, [authUser]);

const { theme } = useThemeStore();

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

console.log(theme)

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
      </div>
    );
  }
  
  return (
    <div data-theme={theme} className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={ !authUser ? <Signup/> : <Navigate to="/"/>} />
        <Route path="/login" element={ !authUser ? <Login/>: <Navigate  to="/"/>}/>
        <Route path="/profile" element={ authUser ? <Profile/> : <Navigate to="/login"/>} />
        <Route path="/settings" element={< Settings/> }/>
      </Routes>
       <Toaster /> 
    
    </div>

  );
}

export default App;
