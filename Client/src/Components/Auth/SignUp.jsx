// Signup.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUserPlus, FaEnvelope, FaLock, FaVenusMars, FaUser, 
    FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaArrowLeft
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useFormik} from 'formik'
import * as yup from 'yup'

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Real-time validation
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
        
        // Clear server error when user starts typing
        if (serverError) setServerError('');
        if (successMessage) setSuccessMessage('');
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setServerError('');
        setSuccessMessage('');
        
        try {
            const { confirmPassword, ...submitData } = formData;
            const response = await axios.post('http://localhost:5000/api/auth/signup', submitData);
            
            if (response.data.success) {
                setSuccessMessage(response.data.message || 'Account created successfully! Please login.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                setServerError(error.response.data.message || 'Something went wrong. Please try again.');
            } else if (error.request) {
                setServerError('Network error. Please check your connection.');
            } else {
                setServerError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = () => {
        const pwd = formData.password;
        if (!pwd) return { score: 0, text: '', color: '' };
        
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[@$!%*?&]/.test(pwd)) score++;
        
        const strengthMap = {
            0: { text: 'Very Weak', color: 'bg-red-500', textColor: 'text-red-500' },
            1: { text: 'Weak', color: 'bg-orange-500', textColor: 'text-orange-500' },
            2: { text: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
            3: { text: 'Good', color: 'bg-blue-500', textColor: 'text-blue-500' },
            4: { text: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' },
            5: { text: 'Very Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' }
        };
        
        return strengthMap[score] || strengthMap[0];
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Back to Home Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </Link>
                </motion.div>

                {/* Signup Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-blue-200 dark:border-blue-800"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4"
                        >
                            <FaUserPlus className="text-white text-3xl" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white">Create Account</h2>
                        <p className="text-blue-100 mt-2">Join ELARA and discover luxury</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-8 space-y-5">
                        {/* Success Message */}
                        <AnimatePresence>
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-green-50 dark:bg-green-900/30 border border-green-500 rounded-lg p-3 flex items-center space-x-2"
                                >
                                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                    <span className="text-green-700 dark:text-green-300 text-sm">{successMessage}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Server Error */}
                        <AnimatePresence>
                            {serverError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 dark:bg-red-900/30 border border-red-500 rounded-lg p-3 flex items-center space-x-2"
                                >
                                    <FaTimesCircle className="text-red-500 flex-shrink-0" />
                                    <span className="text-red-700 dark:text-red-300 text-sm">{serverError}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="John Doe"
                                />
                            </div>
                            <AnimatePresence>
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-3 rounded-xl border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(strength.score / 5) * 100}%` }}
                                                className={`h-full ${strength.color}`}
                                            />
                                        </div>
                                        <span className={`text-xs ${strength.textColor}`}>{strength.text}</span>
                                    </div>
                                    <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                                        <li className={formData.password.length >= 8 ? 'text-green-500' : ''}>
                                            • Minimum 8 characters
                                        </li>
                                        <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>
                                            • At least one uppercase letter
                                        </li>
                                        <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : ''}>
                                            • At least one lowercase letter
                                        </li>
                                        <li className={/\d/.test(formData.password) ? 'text-green-500' : ''}>
                                            • At least one number
                                        </li>
                                        <li className={/[@$!%*?&]/.test(formData.password) ? 'text-green-500' : ''}>
                                            • At least one special character (@$!%*?&)
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <AnimatePresence>
                                {errors.confirmPassword && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        {errors.confirmPassword}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Gender Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Gender
                            </label>
                            <div className="flex space-x-4">
                                {['male', 'female', 'other'].map((option) => (
                                    <label
                                        key={option}
                                        className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                                            formData.gender === option
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={formData.gender === option}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <FaVenusMars className={formData.gender === option ? 'text-blue-500' : 'text-gray-400'} />
                                        <span className={`capitalize ${formData.gender === option ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <AnimatePresence>
                                {errors.gender && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        {errors.gender}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:from-blue-700 hover:to-purple-700'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <span>Sign Up</span>
                            )}
                        </motion.button>

                        {/* Login Link */}
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                Login here
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;