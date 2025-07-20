import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button'
import FormField from '../components/FormField'
import '../styles/pages/Login.css'

const Login = ({ setCurrentUser }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add actual login logic here (API calls, etc.)
    alert(`Email: ${email}\nPassword: ${password} - Login attempt`);
    setCurrentUser({
      name: 'Patient Kim',
      email: email,
      phone: '010-1234-5678',
      status: 'online'
    });
    window.location.href = '/mypage';
  };

  return (
    <div className="login">
      <div className="container">
        <h1>{t('Login')}</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">{t('Email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('Password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {t('Login')}
          </button>
        </form>
        <div className="signup-link">
          <p>{t('Don\'t have an account?')} <Link to="/signup">{t('Sign Up')}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;