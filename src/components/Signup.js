import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';
import { AuthContext } from '../contexts/AuthContext';

function Signup() {

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
      if (currentUser) {
        navigate('/onboarding');
      }
    }, [currentUser, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    if (name === 'username' && !value) {
      setErrors(prev => ({
        ...prev,
        username: 'Username is required'
      }));
    }
    
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
    }
    
    if (name === 'password' && value && value.length < 8) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 8 characters'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Signup form submitted:', formData);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-image-placeholder"></div>
      
      <div className="signup-form-container">
        <div className="signup-form-card">
          <h1>Create your account</h1>
          <p className="subtitle">Join Digicademic to start your learning journey</p>
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.username ? 'error-field' : ''}
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>
            
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={errors.email ? 'error-field' : ''}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength="8"
                  className={errors.password ? 'error-field' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password ? (
                <p className="error-message">{errors.password}</p>
              ) : (
                <p className="password-hint">Must be at least 8 characters</p>
              )}
            </div>
            
            <button type="submit" className="primary-btn">Continue</button>
            
            <div className="or-divider">
              <span>Or</span>
            </div>
            
            <button type="button" className="google-btn">
              Continue with Google
            </button>
            
            <p className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;