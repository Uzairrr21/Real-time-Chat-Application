import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Create and export the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    setError(null);
    navigate('/auth');
  }, [navigate, setAuthToken]);

  const loadUser = useCallback(async () => {
    try {
      if (token) {
        setAuthToken(token);
        const decoded = jwt_decode(token);
        setUser(decoded);
        setIsAuthenticated(true);
        setError(null);
      }
    } catch (err) {
      console.error('Token invalid:', err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, logout, setAuthToken]);

  const register = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser();
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err.response?.data || { message: 'Registration failed' };
    }
  };

  const login = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      await loadUser();
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export both named and default exports
export default AuthContext;