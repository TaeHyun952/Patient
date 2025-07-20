import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button'
import FormField from '../components/FormField'
import '../styles/pages/Login.css'

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 실제 로그인 로직 추가 (API 호출 등)
    alert(`이메일: ${email}\n비밀번호: ${password} (으)로 로그인 시도`);
    setCurrentUser({
      name: '김통역',
      email: email,
      phone: '010-1234-5678',
      status: 'online'
    });
    window.location.href = '/mypage';
  };

  return (
    <div className="login">
      <div className="container">
        <h1>로그인</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            로그인
          </button>
        </form>
        <div className="signup-link">
          <p>계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;