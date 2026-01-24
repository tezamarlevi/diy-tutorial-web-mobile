// src/context/AuthContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      return { ...state, user: action.payload.user, token: action.payload.token, isLoading: false };
    case 'LOGOUT':
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      return { ...state, user: null, token: null, isLoading: false };
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'LOADING_DONE':  // ← NEW: Stop loading without changing auth state
      return { ...state, isLoading: false };
    case 'AUTH_SUCCESS':
      api.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      return { ...state, user: action.payload.user, token: action.payload.token, isLoading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      if (!state.token) {
        dispatch({ type: 'LOADING_DONE' });
        return;
      }

      try {
        // Verify token with backend
        const response = await api.get('/auth/me');
        dispatch({ type: 'AUTH_SUCCESS', payload: { token: state.token, user: response.data } });
      } catch (err) {
        // Token invalid - logout
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOADING_DONE' });
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      await api.post('/auth/register', { name, email, password });  // ← No LOGIN_SUCCESS
      dispatch({ type: 'LOADING_DONE' });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOADING_DONE' });
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!state.token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
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

export default AuthProvider;
