import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import API_BASE_URL from '../../config/api.js';
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
      console.log('Attempting login to:', `${API_BASE_URL}/api/auth/login`);
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
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
      setError(
        err.response && err.response.data.msg
          ? err.response.data.msg
          : 'Login failed. Please try again.'
      );
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