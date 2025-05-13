import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                // Set default axios header
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8090/api/auth/login', {
                username,
                password
            });

            const { token } = response.data;
            const userData = { username };

            // Store in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Update state
            setToken(token);
            setUser(userData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Login failed'
            };
        }
    };

    const register = async (username, password) => {
        try {
            await axios.post('http://localhost:8090/api/auth/register', {
                username,
                password
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || 'Registration failed'
            };
        }
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Clear axios default header
        delete axios.defaults.headers.common['Authorization'];

        // Clear state
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 