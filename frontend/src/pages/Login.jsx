import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStrore';
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthImagePattern from '../component/AuthImagePattern';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoggingUp } = useAuthStore();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    if (!data.email || !data.password) {
      toast.error('Please fill in all fields');
      return false;
    }
    // Simple email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(formData)) {
      login(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
    
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <MessageSquare className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
         
           <div className="form-control w-full max-w-sm mx-auto">
                 <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2"> Email </label>
                 <div className="relative">
                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Mail className="w-5 h-5 text-gray-400" />
                                </span>


                     <input
                        type="email"
                          id="email"
                       name="email"
                           placeholder="you@example.com"
                           className="input input-bordered w-full pl-10 text-base-content placeholder:text-base-content/70"
                            value={formData.email}
                             onChange={handleInputChange}
                                 />
              </div>
               </div>

            {/* Password Field */}
            <div className="form-control w-full max-w-sm mx-auto">

  <label htmlFor="password" className="block text-sm font-medium text-base-content mb-2 ml-1">
    Password
  </label>

  <div className="relative w-full">
  
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <Lock className="w-5 h-5 text-gray-500" />
    </span>
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5 text-base-content/40 opacity-60" />
      ) : (
        <Eye className="w-5 h-5 text-base-content/40 opacity-60" />
      )}
    </button>
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      placeholder="••••••••"
      className="input input-bordered w-full pl-10 pr-10 text-base-content placeholder:text-base-content/70"
      value={formData.password}
      onChange={handleInputChange}
    />
  </div>
</div>

            <button
              type="submit"
              className="btn btn-primary w-full sm:max-w-sm mx-auto flex justify-center items-center gap-2 px-4 py-2"
              disabled={isLoggingUp}
            >
              {isLoggingUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
      />
    </div>
  );
};

export default Login;
