import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        console.log('🔍 AuthProvider mounted - Checking localStorage');
        console.log('Token:', token);
        console.log('UserName:', userName);
        
        if (token && userName) {
            setIsLoggedIn(true);
            setUser({
                name: userName,
                email: userEmail || `${userName.toLowerCase().replace(/\s/g, '')}@elara.com`,
                phone: localStorage.getItem('userPhone') || '',
                address: localStorage.getItem('userAddress') || '',
                joinDate: localStorage.getItem('userJoinDate') || new Date().toLocaleDateString()
            });
            console.log('✅ User restored from localStorage:', userName);
        }
        setLoading(false);
    }, []);

    // ✅ IMPORTANT FIX: Login function with proper state update
    const login = (userData) => {
        console.log('📝 Login function called with:', userData);
        
        // Store in localStorage
        localStorage.setItem('authToken', 'token-' + Date.now());
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userPhone', userData.phone || '');
        localStorage.setItem('userAddress', userData.address || '');
        localStorage.setItem('userJoinDate', userData.joinDate || new Date().toLocaleDateString());
        
        // ✅ CRITICAL: Update state immediately
        setIsLoggedIn(true);
        setUser(userData);
        
        console.log('✅ State updated - isLoggedIn:', true);
        console.log('✅ State updated - user:', userData);
        
        // Force a re-render check
        setTimeout(() => {
            console.log('🔍 Current state after login - isLoggedIn:', true);
        }, 100);
    };

    // Signup function
    const signup = (userData) => {
        console.log('📝 Signup function called with:', userData);
        
        localStorage.setItem('authToken', 'token-' + Date.now());
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userPhone', userData.phone || '');
        localStorage.setItem('userAddress', userData.address || '');
        localStorage.setItem('userJoinDate', new Date().toLocaleDateString());
        
        setIsLoggedIn(true);
        setUser(userData);
        
        console.log('✅ Signup successful - isLoggedIn:', true);
    };

    // Logout function
    const logout = () => {
        console.log('📝 Logout function called');
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userAddress');
        localStorage.removeItem('userJoinDate');
        
        setIsLoggedIn(false);
        setUser(null);
        
        console.log('✅ Logout successful - isLoggedIn:', false);
    };

    // Update user profile
    const updateUser = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
        if (updatedData.name) localStorage.setItem('userName', updatedData.name);
        if (updatedData.email) localStorage.setItem('userEmail', updatedData.email);
        if (updatedData.phone) localStorage.setItem('userPhone', updatedData.phone);
        if (updatedData.address) localStorage.setItem('userAddress', updatedData.address);
    };

    const value = {
        isLoggedIn,  // ✅ Make sure this is passed
        user,        // ✅ Make sure this is passed
        loading,
        login,
        signup,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}