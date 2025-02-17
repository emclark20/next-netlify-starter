import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '', // Added lastName
    username: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        // Redirect to dashboard on success
        router.push('/dashboard');
      } catch (error) {
        console.error('Signup error:', error);
        // You can add error handling UI here if needed
      }
    } else {
      // Existing login logic here
      console.log('Form submitted:', formData);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <Header/>

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
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
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

      <Footer/>
    </div>
  );
};

export default AuthPage;