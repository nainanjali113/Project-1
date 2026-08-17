import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added useNavigate and Link
import { motion } from 'framer-motion';
import { useAuth } from "../Context/AllContext"
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiLogIn,
  FiArrowRight,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiHeart,
  FiShield,
  FiTruck,
  FiStar
} from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth(); // ✅ Get login function from context
  const navigate = useNavigate(); // ✅ For redirect after login
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // ✅ Call login function from context
        login({
          name: formData.email.split('@')[0], // Extract name from email
          email: formData.email,
          phone: '+91 98765 43210',
          address: '123 Fashion Street, Mumbai, India',
          joinDate: new Date().toLocaleDateString()
        });
        
        setLoading(false);
        // ✅ Redirect to home page after successful login
        navigate('/');
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  const features = [
    { icon: <FiTruck size={14} />, text: "Free Shipping", color: "from-teal-500 to-teal-600" },
    { icon: <FiShield size={14} />, text: "Secure Payment", color: "from-rose-500 to-rose-600" },
    { icon: <FiStar size={14} />, text: "Reward Points", color: "from-amber-500 to-amber-600" },
    { icon: <FiHeart size={14} />, text: "Wishlist", color: "from-rose-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-rose-300 to-amber-300 p-4 pt-24">
      <div className="w-full max-w-5xl">
        
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left Side - Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-5/12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 via-rose-900/40 to-amber-900/50 z-10"></div>
            <div className="absolute inset-0 bg-black/20 z-20"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop" 
              alt="Fashion Shopping"
              className="w-full h-full min-h-[500px] lg:min-h-[600px] object-cover"
            />
            
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-8">
              <div className="flex justify-end">
                <div className="bg-rose-500/90 backdrop-blur-sm rounded-full px-4 py-1.5">
                  <span className="text-white text-xs font-bold">WELCOME BACK</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white text-2xl font-bold">Welcome to ELARA</h3>
                <p className="text-white/80 text-sm">Your fashion journey continues here</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-teal-400 to-rose-400 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{i}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/70 text-xs">Join 10k+ fashion lovers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-7/12 bg-white p-8 md:p-10"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-rose-500 rounded-2xl mb-3 shadow-md">
                <FiLogIn className="text-white" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-rose-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-2">Sign in to your ELARA account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-base ${
                      errors.email 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Email address"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative group">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-base ${
                      errors.password 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-xs mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                    disabled={loading}
                  />
                  <label className="text-gray-500 text-sm">Remember me</label>
                </div>
                <a href="/forgot-password" className="text-rose-500 text-sm hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-teal-500 to-rose-500 text-white py-2.5 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiLogIn size={16} />
                    Sign In
                    <FiArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <span className="text-gray-600 text-xs">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <FiFacebook size={14} className="text-blue-600" />
                  Facebook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <FiTwitter size={14} className="text-sky-500" />
                  Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <FiInstagram size={14} className="text-pink-600" />
                  Instagram
                </motion.button>
              </div>

              {/* Sign Up Link - ✅ Updated with Link component */}
              <p className="text-center text-gray-400 text-sm pt-2">
                Don't have an account?{' '}
                <Link to="/signup" className="text-rose-500 font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}