import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'





import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    username: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      username: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      {/* Navigation */}
      <Header/>

      {/* Main Content */}
      <main className="auth-main">
        <h1 className="auth-title">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {isLogin && (
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          )}

          <button type="submit" className="submit-button">
            Submit
          </button>
          
          {isLogin && (
            <button type="button" className="google-button">
              Login with Google
            </button>
          )}

          <div className="auth-toggle">
            {isLogin ? (
              <p>
                No Account?{' '}
                <button type="button" onClick={toggleForm}>
                  Sign Up here!
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" onClick={toggleForm}>
                  Login here!
                </button>
              </p>
            )}
          </div>
        </form>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default AuthPage;