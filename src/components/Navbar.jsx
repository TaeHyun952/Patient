import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Home, Calendar, User, UserPlus, BarChart3, Building2 } from 'lucide-react'
import '../styles/components/Navbar.css'

const Navbar = ({ currentUser }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>{t('Hospital Interpretation Service')}</h2>
      </div>
      <div className="nav-menu">
        <NavLink to="/" className="nav-item">
          <BarChart3 size={18} />
          {t('Procedure Selection')}
        </NavLink>
        <NavLink to="/schedule" className="nav-item">
          <Calendar size={18} />
          {t('Booking History')}
        </NavLink>
        <NavLink to="/mypage" className="nav-item">
          <Home size={18} />
          {t('My Page')}
        </NavLink>
        <NavLink to="/login" className="nav-item">
          <UserPlus size={18} />
          {t('Login')}
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
              {currentUser.status === 'active' ? t('Active') : t('Inactive')}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar