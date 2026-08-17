import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiUserPlus,
  FiArrowRight,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiGift,
  FiTruck,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});

  // Check for dark mode on mount and listen for changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Create observer to watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

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
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Sign Up Data:', formData);
      alert('🎉 Welcome to ELARA! Account created successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  const benefits = [
    { icon: <FiGift size={12} />, text: "Exclusive access to new collections", color: "from-teal-500 to-teal-600" },
    { icon: <FiTrendingUp size={12} />, text: "Early access to seasonal sales", color: "from-rose-500 to-rose-600" },
    { icon: <FiTruck size={12} />, text: "Free shipping on orders $100+", color: "from-teal-500 to-teal-600" },
    { icon: <FiStar size={12} />, text: "Earn reward points", color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className={`h-screen flex items-center justify-center p-4 transition-all duration-500 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' 
        : 'bg-gradient-to-br from-teal-400 via-rose-300 to-amber-300'
    }`}>
      {/* No spacer needed - using h-screen instead */}
      
      <div className="w-full max-w-5xl mx-auto">
        
        <div className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'shadow-teal-500/20' : ''
        }`}>
          
          {/* Left Side - Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-5/12 relative overflow-hidden"
          >
            <div className={`absolute inset-0 z-10 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-teal-900/60 via-rose-900/50 to-amber-900/60' 
                : 'bg-gradient-to-br from-teal-900/50 via-rose-900/40 to-amber-900/50'
            }`}></div>
            <div className="absolute inset-0 bg-black/20 z-20"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop" 
              alt="Fashion Style"
              className="w-full h-full min-h-[500px] lg:min-h-[550px] object-cover"
            />
            
            <div className="absolute inset-0 z-30 flex flex-col justify-between p-6">
              <div className="flex justify-end">
                <div className={`backdrop-blur-sm rounded-full px-3 py-1 ${
                  isDarkMode 
                    ? 'bg-teal-500/90' 
                    : 'bg-rose-500/90'
                }`}>
                  <span className="text-white text-xs font-bold">ELARA</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-white text-xl font-bold">Fashion That Speaks</h3>
                <p className="text-white/80 text-xs">Join 10k+ happy customers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Sign Up Form - NO SCROLLING */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`lg:w-7/12 p-6 md:p-8 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-slate-900' 
                : 'bg-white'
            }`}
          >
            {/* Header - Reduced size */}
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-md ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-teal-400 to-rose-500 shadow-teal-500/30' 
                  : 'bg-gradient-to-br from-teal-500 to-rose-500'
              }`}>
                <FiUserPlus className="text-white" size={20} />
              </div>
              <h1 className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-teal-300 via-rose-400 to-amber-300' 
                  : 'bg-gradient-to-r from-teal-600 to-rose-500'
              }`}>
                Create Account
              </h1>
              <p className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Join ELARA fashion family
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <div className="relative group">
                  <FiUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-500 group-focus-within:text-teal-400' 
                      : 'text-gray-400 group-focus-within:text-teal-500'
                  }`} size={14} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                      errors.fullName 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800/50 text-white focus:border-teal-400 focus:ring-teal-400/30 placeholder-gray-500'
                          : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-rose-400 text-xs mt-0.5 ml-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative group">
                  <FiMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-500 group-focus-within:text-teal-400' 
                      : 'text-gray-400 group-focus-within:text-teal-500'
                  }`} size={14} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                      errors.email 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800/50 text-white focus:border-teal-400 focus:ring-teal-400/30 placeholder-gray-500'
                          : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-0.5 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative group">
                  <FiLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-500 group-focus-within:text-teal-400' 
                      : 'text-gray-400 group-focus-within:text-teal-500'
                  }`} size={14} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                      errors.password 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800/50 text-white focus:border-teal-400 focus:ring-teal-400/30 placeholder-gray-500'
                          : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-500 hover:text-teal-400' 
                        : 'text-gray-400 hover:text-teal-500'
                    }`}
                  >
                    {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-400 text-xs mt-0.5 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative group">
                  <FiLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-500 group-focus-within:text-teal-400' 
                      : 'text-gray-400 group-focus-within:text-teal-500'
                  }`} size={14} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                      errors.confirmPassword 
                        ? 'border-rose-400 focus:ring-rose-400' 
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800/50 text-white focus:border-teal-400 focus:ring-teal-400/30 placeholder-gray-500'
                          : 'border-gray-200 focus:border-teal-400 focus:ring-teal-400/30'
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-500 hover:text-teal-400' 
                        : 'text-gray-400 hover:text-teal-500'
                    }`}
                  >
                    {showConfirmPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-rose-400 text-xs mt-0.5 ml-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-3.5 h-3.5 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                />
                <label className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  I agree to{' '}
                  <a href="/terms" className="text-rose-500 hover:underline font-medium">Terms</a> &{' '}
                  <a href="/privacy" className="text-teal-500 hover:underline font-medium">Privacy</a>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-rose-400 text-xs ml-6 -mt-1">{errors.agreeTerms}</p>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-teal-500/30' 
                    : 'bg-gradient-to-r from-teal-500 to-rose-500 text-white'
                }`}
              >
                <FiUserPlus size={14} />
                Sign Up
                <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Benefits - Compact grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <span className={`text-[10px] leading-tight ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${
                    isDarkMode ? 'border-gray-800' : 'border-gray-100'
                  }`}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-2 text-[10px] ${
                    isDarkMode ? 'bg-gray-900 text-gray-500' : 'bg-white text-gray-400'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500' 
                      : 'border-gray-200 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <FiFacebook size={12} className="text-blue-600" />
                  Facebook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-300 hover:bg-sky-500/10 hover:border-sky-500' 
                      : 'border-gray-200 text-gray-600 hover:bg-sky-50'
                  }`}
                >
                  <FiTwitter size={12} className="text-sky-500" />
                  Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-300 hover:bg-pink-500/10 hover:border-pink-500' 
                      : 'border-gray-200 text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  <FiInstagram size={12} className="text-pink-600" />
                  Instagram
                </motion.button>
              </div>

              {/* Login Link */}
              <p className={`text-center text-[11px] pt-1 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Already have an account?{' '}
                <a href="/login" className="text-rose-500 font-semibold hover:underline">
                  Sign In
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}