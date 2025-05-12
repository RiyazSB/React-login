import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { AuthContext } from '../contexts/AuthContext';
import { getAuthRedirectResult, googleSignIn } from '../config/firebase';

function Login() {

  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser) {
      navigate('/onboarding');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your validation logic here
    console.log('Login submitted:', formData);
  };



  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithGoogle();
  //     console.log(result.user); 
  //     navigate('/'); // Redirect after login
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };


  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getAuthRedirectResult();
        if (result?.user) {
          const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
          navigate(onboardingComplete ? '/onboarding' : '/onboarding');
        }
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };
    handleRedirect();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result?.user) {
        const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
        navigate(onboardingComplete ? '/onboarding' : '/onboarding');
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome back</h1>
        <p className="subtitle">Log in to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error-field' : ''}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error-field' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit" className="primary-btn">Log In</button>

          <div className="or-divider">
            <span>Or</span>
          </div>

          <button type="button" onClick={handleGoogleLogin} className="google-btn">
            Continue with Google
          </button>

          <p className="login-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;