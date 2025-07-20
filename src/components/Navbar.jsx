import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Home, Calendar, User, UserPlus, BarChart3, Building2 } from 'lucide-react'
import '../styles/components/Navbar.css'

const Navbar = ({ currentUser }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>병원 통역 서비스</h2>
      </div>
      <div className="nav-menu">
        <NavLink to="/" className="nav-item">
          <BarChart3 size={18} />
          시술 선택
        </NavLink>
        <NavLink to="/schedule" className="nav-item">
          <Calendar size={18} />
          예약 내역
        </NavLink>
        <NavLink to="/mypage" className="nav-item">
          <Home size={18} />
          마이페이지
        </NavLink>
        <NavLink to="/profile" className="nav-item">
          <User size={18} />
          프로필
        </NavLink>
        <NavLink to="/login" className="nav-item">
          <UserPlus size={18} />
          로그인
        </NavLink>
      </div>
      <div className="nav-user">
        <div className="language-selector">
            <button 
              onClick={() => changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
            >
              EN
            </button>
            <span className="separator">|</span>
            <button 
              onClick={() => changeLanguage('ko')}
              className={i18n.language === 'ko' ? 'active' : ''}
            >
              KO
            </button>
        </div>
        {currentUser && (
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <div className={`status-indicator ${currentUser.status}`}>
              <span className="status-dot"></span>
              {currentUser.status === 'active' ? '활동 중' : '비활성'}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar