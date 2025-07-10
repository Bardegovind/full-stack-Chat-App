import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStrore';
import { MessageSquare, User, Mail,Lock ,Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthImagePattern from '../component/AuthImagePattern';
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
  });

  const { signup, isSigningUp , logout  } = useAuthStore();

  let validateForm = (formData) =>{

    if(!formData.fullName.trim()) return toast.error("Fullname is required");
     if(!formData.email.trim()) return toast.error("Email is required");
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Formate");
      if(!formData.password.trim()) return toast.error("Password is required");
      if(formData.password.length < 6) return toast.error("Password must be at least 6 character");
     


       return true;  
}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    let success = validateForm(formData);
    if(success == true)
    {
        signup(formData);
    }
    // Validation or signup call here
    // console.log(formData);
  };

  return (
    
     <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">

      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
        
          <br/>
          <br/>
         
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <MessageSquare className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
        

                   <div className="form-control w-full max-w-sm mx-auto">
  
  <label htmlFor="fullName" className="block text-sm font-medium text-base-content mb-2 ml-1">
    Full Name
  </label>
  <div className="relative w-full">
   
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <User className="w-5 h-5 text-gray-500" />
    </span>
    <input
      type="text"
      id="fullName"
      name="fullName"
      className="input input-bordered w-full pl-10 text-base-content placeholder:text-base-content/70"
      placeholder="John Snow"
      value={formData.fullName}
      onChange={(e) =>
        setFormData({ ...formData, fullName: e.target.value })
      }
    />
  </div>
</div>



    <div className="form-control w-full max-w-sm mx-auto">
  <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2 ml-1">
    Email
  </label>
  <div className="relative w-full">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <Mail className="w-5 h-5 text-gray-500" />
    </span>

   
    <input
      type="email"
      id="email"
      name="email"
      className="input input-bordered w-full pl-10 text-base-content placeholder:text-base-content/70"
      placeholder="you@example.com"
      value={formData.email}
      onChange={(e) =>
        setFormData({ ...formData, email: e.target.value })
      }
    />
  </div>
</div>

         
         <div className="form-control w-full max-w-sm mx-auto">
  
  <label htmlFor="password" className="block text-sm font-medium text-base-content mb-2 ml-1">
    Password
  </label>
  <div className="relative w-full">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Lock className="w-5 h-5 text-gray-500" />
    </span>

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5 text-gray-400 opacity-50" />
      ) : (
        <Eye className="w-5 h-5 text-gray-400 opacity-50" />
      )}
    </button>
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      className="input input-bordered w-full pl-10 pr-10 text-base-content placeholder:text-base-content/70"
      placeholder="••••••••"
      value={formData.password}
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
    />
  </div>
</div>


            {/* Submit Button */}

            <button type='submit' className='btn btn-primary w-full sm:max-w-sm mx-auto flex justify-center items-center gap-2 px-4 py-2' disabled={isSigningUp}>
              {
                isSigningUp? (<><Loader2 className='size-5 animate-spin'/>
                Loading....
                </>): ("Create Account")
              }

            </button>
          </form>

         <div className="text-center">
               <p className="text-base-content/60">
                  Already have an account?{" "}
               <Link to="/login" className="link link-primary">
                 Sign in
             </Link>
  </p>
</div>


        </div>
      </div>
      {/* right side  */}

      <AuthImagePattern className="mt-10"
       title="Join our community"
       subtitle="connect with freinds ,share moments ,and stay in touch with your loved onece"
       
      />

      

    </div>
  );
};

export default Signup;