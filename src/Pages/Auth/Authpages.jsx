import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInAsync, signUpAsync } from "../../features/auth/authSlice";
import { Mail, Lock, UserPlus, ArrowRight, Loader2, Rss, LogIn, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    first_name: "",
    last_name: "",
    username: "",
    email: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signIn, signUp } = useSelector((state) => state.auth);
  const isLoading = isLogin ? signIn.isLoading : signUp.isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const loginData = {
          username: formData.identifier,
          password: formData.password
        };
        await dispatch(signInAsync(loginData)).unwrap();
        toast.success("Welcome back!");
        navigate("/genratekey");
      } else {
        const signupData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        };
        await dispatch(signUpAsync(signupData)).unwrap();
        toast.success("Account created successfully!");
        navigate("/auth");
      }
    } catch (error) {
      toast.error(error?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#074839] to-[#121212] text-white">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#333', color: '#fff', borderRadius: '10px' }
      }} />
      
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:flex-1 items-center justify-center bg-black/20">
          <div className="max-w-md text-center p-8">
            <Rss className="w-20 h-20 mx-auto mb-8 text-[#1DB954]" />
            <h1 className="text-4xl font-bold mb-4">Check Vehicle Details</h1>
            <p className="text-white/60">Connect with people who share your interests</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex p-1 bg-white/10 rounded-lg mb-8">
              <button onClick={() => {
                setIsLogin(true);
                setFormData({
                  identifier: "",
                  password: "",
                  first_name: "",
                  last_name: "",
                  username: "",
                  email: ""
                });
              }}
                className={`w-1/2 py-3 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2
                  ${isLogin ? "bg-[#1DB954] text-black shadow-lg" : "text-white/60 hover:text-white"}`}>
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button onClick={() => {
                setIsLogin(false);
                setFormData({
                  identifier: "",
                  password: "",
                  first_name: "",
                  last_name: "",
                  username: "",
                  email: ""
                });
              }}
                className={`w-1/2 py-3 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2
                  ${!isLogin ? "bg-[#1DB954] text-black shadow-lg" : "text-white/60 hover:text-white"}`}>
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>

            <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-white/60">
                  {isLogin ? "Sign in to continue your journey" : "Join us and start sharing your stories"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isLogin ? (
                  <>
                    <div className="group">
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        Email or Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={formData.identifier}
                          onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                            focus:outline-none focus:border-[#1DB954] transition-all duration-300
                            text-white placeholder-white/40"
                          placeholder="Enter your email or username"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-white/60 mb-2">First Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                          </div>
                          <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                              focus:outline-none focus:border-[#1DB954] transition-all duration-300
                              text-white placeholder-white/40"
                            placeholder="First name"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-white/60 mb-2">Last Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                          </div>
                          <input
                            type="text"
                            value={formData.last_name}
                            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                              focus:outline-none focus:border-[#1DB954] transition-all duration-300
                              text-white placeholder-white/40"
                            placeholder="Last name"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-white/60 mb-2">Username</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserPlus className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                            focus:outline-none focus:border-[#1DB954] transition-all duration-300
                            text-white placeholder-white/40"
                          placeholder="Choose a username"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                            focus:outline-none focus:border-[#1DB954] transition-all duration-300
                            text-white placeholder-white/40"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="group">
                  <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                        focus:outline-none focus:border-[#1DB954] transition-all duration-300
                        text-white placeholder-white/40"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#1DB954] text-black rounded-lg hover:bg-[#1DB954]/90 
                    transition-all duration-300 flex items-center justify-center gap-2 
                    disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign in" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {isLogin && (
                  <div className="text-center">
                    <a href="#" className="text-sm text-white/60 hover:text-[#1DB954] transition-colors">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;