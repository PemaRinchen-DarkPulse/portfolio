import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios.js';
import { AuthContext } from './AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login...');
      
      const res = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      console.log('Login response:', res);
      
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set auth state
        login(res.data.token);
        
        // Redirect to portfolio page
        navigate('/portfolio');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Log more details about the error
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
        
        errorMessage = err.response.data.msg || 
                      `Server error (${err.response.status}). Please try again later.`;
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', err.message);
        errorMessage = 'Request error. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login to Upload Content</h2>
        <p>Only administrators can log in to add new portfolios and projects</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" 
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
              className="form-control"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;