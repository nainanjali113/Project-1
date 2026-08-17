import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiLock, 
  FiSave, 
  FiEye, 
  FiEyeOff, 
  FiShield, 
  FiCheckCircle, 
  FiAlertCircle,
  FiKey,
  FiArrowRight
} from 'react-icons/fi';

export default function ChangePassword() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    checkPasswordStrength(formData.newPassword);
  }, [formData.newPassword]);

  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    
    let feedback = '';
    if (password === '') feedback = '';
    else if (score <= 2) feedback = 'Weak password - make it stronger!';
    else if (score <= 3) feedback = 'Medium password - add more variety';
    else if (score <= 4) feedback = 'Strong password!';
    else feedback = 'Very strong password! Excellent!';
    
    setPasswordStrength({ score, feedback, checks });
  };

  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 3) return 'bg-yellow-500';
    if (passwordStrength.score <= 4) return 'bg-teal-500';
    return 'bg-green-500';
  };

  const getStrengthTextColor = () => {
    if (passwordStrength.score <= 2) return 'text-red-500';
    if (passwordStrength.score <= 3) return 'text-yellow-500';
    if (passwordStrength.score <= 4) return 'text-teal-500';
    return 'text-green-500';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const validateCurrentPassword = () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      // In real app, verify with backend
      return formData.currentPassword.length >= 1;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentPassword()) {
      setError('Current password is incorrect');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Password changed successfully! 🔒');
      setTimeout(() => setMessage(''), 4000);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-3 rounded-xl bg-gradient-to-r from-teal-500 to-rose-500 shadow-lg`}>
            <FiKey className="text-white text-xl" />
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Change Password
          </h2>
        </div>
        <p className={`text-sm ml-14 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Keep your account secure with a strong password
        </p>
      </motion.div>

      {/* Messages with Animation */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
          >
            <FiCheckCircle className="text-green-500 text-xl" />
            <span className="text-green-700 dark:text-green-400 font-medium">{message}</span>
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
          >
            <FiAlertCircle className="text-red-500 text-xl" />
            <span className="text-red-700 dark:text-red-400 font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FiLock size={14} />
            Current Password
          </label>
          <div className="relative group">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500 to-rose-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-md -z-10`} />
            <input
              type={showPassword.current ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:border-teal-500 focus:ring-teal-500/30' 
                  : 'bg-white border-gray-200 focus:border-rose-500 focus:ring-rose-500/30'
              }`}
              placeholder="Enter your current password"
              required
            />
            <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <button
              type="button"
              onClick={() => togglePassword('current')}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                isDarkMode ? 'text-gray-500 hover:text-teal-400' : 'text-gray-400 hover:text-rose-500'
              }`}
            >
              {showPassword.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </motion.div>

        {/* New Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FiShield size={14} />
            New Password
          </label>
          <div className="relative group">
            <input
              type={showPassword.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-white focus:border-teal-500 focus:ring-teal-500/30' 
                  : 'bg-white border-gray-200 focus:border-rose-500 focus:ring-rose-500/30'
              }`}
              placeholder="Enter new password (min 8 characters)"
              required
            />
            <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <button
              type="button"
              onClick={() => togglePassword('new')}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                isDarkMode ? 'text-gray-500 hover:text-teal-400' : 'text-gray-400 hover:text-rose-500'
              }`}
            >
              {showPassword.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    className={`h-full ${getStrengthColor()} rounded-full transition-all duration-500`}
                  />
                </div>
                <span className={`text-xs font-semibold ${getStrengthTextColor()}`}>
                  {Math.round((passwordStrength.score / 5) * 100)}%
                </span>
              </div>
              <p className={`text-xs ${getStrengthTextColor()} font-medium`}>
                {passwordStrength.feedback}
              </p>
              
              {/* Password Requirements */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
                {[
                  { label: '8+ chars', check: passwordStrength.checks.length },
                  { label: 'Uppercase', check: passwordStrength.checks.uppercase },
                  { label: 'Lowercase', check: passwordStrength.checks.lowercase },
                  { label: 'Number', check: passwordStrength.checks.number },
                  { label: 'Special', check: passwordStrength.checks.special }
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {req.check ? (
                      <FiCheckCircle className="text-green-500 text-xs" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-gray-400 dark:border-gray-600" />
                    )}
                    <span className={`text-xs ${
                      req.check 
                        ? 'text-green-500' 
                        : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FiLock size={14} />
            Confirm New Password
          </label>
          <div className="relative group">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                  ? 'border-red-500 focus:border-red-500'
                  : formData.confirmPassword && formData.newPassword === formData.confirmPassword
                  ? 'border-green-500 focus:border-green-500'
                  : isDarkMode 
                    ? 'border-gray-700 text-white focus:border-teal-500 focus:ring-teal-500/30' 
                    : 'border-gray-200 focus:border-rose-500 focus:ring-rose-500/30'
              }`}
              placeholder="Confirm your new password"
              required
            />
            <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <button
              type="button"
              onClick={() => togglePassword('confirm')}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                isDarkMode ? 'text-gray-500 hover:text-teal-400' : 'text-gray-400 hover:text-rose-500'
              }`}
            >
              {showPassword.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-green-500 flex items-center gap-1"
            >
              <FiCheckCircle size={12} /> Passwords match
            </motion.p>
          )}
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-xl ${
            isDarkMode 
              ? 'bg-teal-500/10 border border-teal-500/30' 
              : 'bg-teal-50 border border-teal-200'
          }`}
        >
          <h3 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>
            <FiShield size={14} />
            Security Tips
          </h3>
          <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Use at least 8 characters</li>
            <li>• Include uppercase, lowercase, numbers, and special characters</li>
            <li>• Avoid using common words or personal information</li>
            <li>• Don't reuse passwords across different accounts</li>
          </ul>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
              isDarkMode 
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-teal-500/30' 
                : 'bg-gradient-to-r from-teal-500 to-rose-500 text-white hover:shadow-lg'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <FiSave size={18} />
                Update Password
                <FiArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-6 p-4 text-center text-xs rounded-xl ${
          isDarkMode ? 'text-gray-500 bg-gray-800/30' : 'text-gray-500 bg-gray-50'
        }`}
      >
        <p>🔒 Your password is encrypted and stored securely. We never share your information with third parties.</p>
      </motion.div>
    </div>
  );
}