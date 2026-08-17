import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this import
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiEdit2, 
  FiSave, 
  FiHeart,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiCamera,
  FiPackage,
  FiTruck,
  FiStar
} from 'react-icons/fi';

export default function Profile() {
  const navigate = useNavigate(); // ✅ Add this for navigation
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // ✅ Add login state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    avatar: ''
  });

  // ✅ Check if user is logged in and load data from localStorage
  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    
    if (!token || !userName) {
      // If not logged in, redirect to login page
      navigate('/login');
      return;
    }
    
    // Load user data from localStorage or API
    // For demo, using stored name and generating other data
    setFormData({
      fullName: userName,
      email: localStorage.getItem('userEmail') || `${userName.toLowerCase().replace(/\s/g, '')}@elara.com`,
      phone: localStorage.getItem('userPhone') || '+91 98765 43210',
      address: localStorage.getItem('userAddress') || '123 Fashion Street, Mumbai, India 400001',
      joinDate: localStorage.getItem('userJoinDate') || 'January 2024',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8F81&color=fff&size=128`
    });
    
    setIsLoggedIn(true);
  }, [navigate]);

  // Check dark mode (same as before)
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // ✅ Save to localStorage when editing
    if (name === 'fullName') localStorage.setItem('userName', value);
    if (name === 'email') localStorage.setItem('userEmail', value);
    if (name === 'phone') localStorage.setItem('userPhone', value);
    if (name === 'address') localStorage.setItem('userAddress', value);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Show success message (you can add a toast notification here)
    alert('Profile updated successfully! 🎉');
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAddress');
    setIsLoggedIn(false);
    navigate('/');
  };

  const stats = [
    { icon: <FiShoppingBag size={20} />, label: "Total Orders", value: "12", color: "from-teal-500 to-teal-600" },
    { icon: <FiHeart size={20} />, label: "Wishlist Items", value: "8", color: "from-rose-500 to-rose-600" },
    { icon: <FiStar size={20} />, label: "Reviews", value: "5", color: "from-amber-500 to-amber-600" },
    { icon: <FiTruck size={20} />, label: "Points", value: "2,450", color: "from-violet-500 to-purple-600" },
  ];

  const recentOrders = [
    { id: "#EL-12345", date: "Dec 15, 2024", items: 3, total: "₹18,999", status: "Delivered", color: "text-green-500" },
    { id: "#EL-12346", date: "Dec 10, 2024", items: 2, total: "₹12,499", status: "Shipped", color: "text-blue-500" },
    { id: "#EL-12347", date: "Dec 05, 2024", items: 1, total: "₹5,999", status: "Processing", color: "text-amber-500" },
    { id: "#EL-12348", date: "Nov 28, 2024", items: 4, total: "₹32,999", status: "Delivered", color: "text-green-500" },
  ];

  const wishlistItems = [
    { id: 1, name: "Floral Summer Dress", price: "₹6,999", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop", inStock: true },
    { id: 2, name: "Classic Denim Jacket", price: "₹9,999", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=200&h=250&fit=crop", inStock: true },
    { id: 3, name: "Elegant Evening Gown", price: "₹14,999", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=250&fit=crop", inStock: false },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiUser size={16} /> },
    { id: 'orders', label: 'Orders', icon: <FiPackage size={16} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FiHeart size={16} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={16} /> },
  ];

  // ✅ If not logged in, show loading or nothing (redirect will happen)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 pt-20 pb-12 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' 
        : 'bg-gradient-to-br from-teal-400 via-rose-300 to-amber-300'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white/80">Manage your account and preferences</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80"
            >
              <div className={`rounded-2xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/90 backdrop-blur-sm'
              }`}>
                
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img 
                      src={formData.avatar} 
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto border-4 border-teal-500 shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-full text-white hover:bg-teal-600 transition-colors">
                      <FiCamera size={12} />
                    </button>
                  </div>
                  <h2 className={`text-xl font-bold mt-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {formData.fullName}
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Member since {formData.joinDate}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {stats.map((stat, index) => (
                    <div key={index} className={`p-3 rounded-xl text-center ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white mx-auto mb-2`}>
                        {stat.icon}
                      </div>
                      <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabs Navigation */}
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? isDarkMode
                            ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                            : 'bg-teal-500 text-white'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-gray-700/50'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* ✅ Logout Button - Updated with handleLogout */}
                <button 
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 mt-4 ${
                    isDarkMode 
                      ? 'text-red-400 hover:bg-red-500/10 border border-red-500/30' 
                      : 'text-red-500 hover:bg-red-50 border border-red-200'
                  }`}
                >
                  <FiLogOut size={16} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className={`rounded-2xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' 
                  : 'bg-white/90 backdrop-blur-sm'
              }`}>
                
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Personal Information
                      </h3>
                      <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          isEditing
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : isDarkMode
                              ? 'bg-teal-500 text-white hover:bg-teal-600'
                              : 'bg-teal-500 text-white hover:bg-teal-600'
                        }`}
                      >
                        {isEditing ? <FiSave size={16} /> : <FiEdit2 size={16} />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-teal-500' 
                                : 'bg-white border-gray-300 focus:ring-teal-500'
                            }`}
                          />
                        ) : (
                          <p className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <FiUser size={16} /> {formData.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-teal-500' 
                                : 'bg-white border-gray-300 focus:ring-teal-500'
                            }`}
                          />
                        ) : (
                          <p className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <FiMail size={16} /> {formData.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-teal-500' 
                                : 'bg-white border-gray-300 focus:ring-teal-500'
                            }`}
                          />
                        ) : (
                          <p className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <FiPhone size={16} /> {formData.phone}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Shipping Address
                        </label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="2"
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-teal-500' 
                                : 'bg-white border-gray-300 focus:ring-teal-500'
                            }`}
                          />
                        ) : (
                          <p className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <FiMapPin size={16} /> {formData.address}
                          </p>
                        )}
                      </div>

                      {/* Join Date */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Member Since
                        </label>
                        <p className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <FiCalendar size={16} /> {formData.joinDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Recent Orders
                    </h3>
                    
                    <div className="space-y-3">
                      {recentOrders.map((order, index) => (
                        <div key={index} className={`p-4 rounded-xl ${
                          isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <div className="flex flex-wrap justify-between items-center gap-3">
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {order.id}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {order.date} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {order.total}
                              </p>
                              <p className={`text-sm font-medium ${order.color}`}>
                                {order.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      My Wishlist ({wishlistItems.length})
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className={`flex gap-4 p-3 rounded-xl ${
                          isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              {item.name}
                            </h4>
                            <p className={`text-lg font-bold mt-1 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                              {item.price}
                            </p>
                            {item.inStock ? (
                              <button className="mt-2 px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors">
                                Add to Cart
                              </button>
                            ) : (
                              <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Account Settings
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              Email Notifications
                            </h4>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Receive updates about orders and promotions
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                      </div>

                      {/* Newsletter Subscription */}
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              Newsletter Subscription
                            </h4>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Get weekly fashion tips and exclusive offers
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                      </div>

                      {/* Change Password Button */}
                      <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        isDarkMode 
                          ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/30' 
                          : 'bg-teal-500 text-white hover:bg-teal-600'
                      }`}>
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}