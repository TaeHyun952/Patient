import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Heart, CheckCircle, Building2, Settings, RefreshCw, User, Camera, Edit, Plus, Shield, Activity, FileText, Upload } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import '../styles/pages/MyPage.css'

const MyPage = () => {
  const { t } = useTranslation()
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('new')
  const [settings, setSettings] = useState({
    available: true,
    autoConfirm: true,
    notifications: false
  })

  // Profile-related state
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Patient Kim',
    email: 'patient@example.com',
    phone: '010-1234-5678',
    introduction: `Hello! I am Patient Kim.

Major Medical History:
- Regular health checkups
- Ophthalmology treatment (cataract)
- Internal medicine treatment

Special Notes:
- Language support needed (English, Chinese)
- Diabetes patient
- Allergies: Penicillin

Language support is needed when communicating with medical staff.`,
    satisfaction: 4.6,
    visitCount: 12,
    membershipYears: 3,
    languages: ["English", "Chinese"],
    allergies: ["Penicillin", "Aspirin"],
    conditions: ["Diabetes", "Hypertension"],
  })

  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: 1,
      hospital: "Seoul National University Hospital",
      date: "2024.01.15",
      diagnosis: "Cataract Surgery",
      doctor: "Dr. Kim, Ophthalmologist",
    },
  ])

  const [insuranceList, setInsuranceList] = useState([
    {
      id: 1,
      name: "National Health Insurance",
      number: "1234-5678-9012",
      expireDate: "2025.12",
    },
  ])

  const treatmentHistory = [
    {
      id: 1,
      hospital: "Seoul National University Hospital",
      satisfaction: 5,
      date: "2024.01.15",
      comment: "Cataract surgery was completed successfully. The medical staff and language support service were excellent.",
    },
    {
      id: 2,
      hospital: "Samsung Medical Center",
      satisfaction: 4,
      date: "2024.01.10",
      comment: "Vitamin D deficiency was found during regular checkup. Thank you for the kind explanation.",
    },
  ]

  const stats = [
    {
      id: 'appointments',
      icon: <Calendar className="stat-icon-svg" />,
      trend: '+3',
      number: '7',
      label: t('This Month\'s Appointments'),
      type: 'completion'
    },
    {
      id: 'hospitals',
      icon: <Building2 className="stat-icon-svg" />,
      trend: '+2',
      number: '12',
      label: t('Visited Hospitals'),
      type: 'income'
    },
    {
      id: 'satisfaction',
      icon: <Heart className="stat-icon-svg" />,
      trend: '+0.2',
      number: '4.6',
      label: t('Service Satisfaction'),
      type: 'rating'
    },
    {
      id: 'upcoming',
      icon: <CheckCircle className="stat-icon-svg" />,
      trend: t('Upcoming'),
      number: '1',
      label: t('Upcoming Appointments'),
      type: 'requests'
    }
  ]

  const sampleAppointments = {
    upcoming: [
      {
        id: 1,
        hospital: '서울대학교병원',
        date: '2024-01-22',
        time: '09:00',
        procedure: '백내장 수술 상담',
        doctor: '김안과 교수',
        department: '안과',
        status: 'confirmed'
      },
      {
        id: 2,
        hospital: '삼성서울병원',
        date: '2024-01-25',
        time: '14:00',
        procedure: '정기 검진',
        doctor: '이내과 교수',
        department: '내과',
        status: 'pending'
      }
    ],
    completed: [
      {
        id: 3,
        hospital: '아산병원',
        date: '2024-01-18',
        time: '10:00',
        procedure: '종합 건강검진',
        doctor: '박검진의학과 교수',
        department: '검진의학과',
        status: 'completed'
      }
    ],
    cancelled: [
      {
        id: 4,
        hospital: '강남세브란스병원',
        date: '2024-01-20',
        time: '15:00',
        procedure: '정형외과 상담',
        doctor: '최정형외과 교수',
        department: '정형외과',
        status: 'cancelled'
      }
    ]
  }

  useEffect(() => {
    setRequests(sampleAppointments[activeTab] || [])
  }, [activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const cancelAppointment = (appointmentId) => {
    const reason = prompt('Please enter the reason for appointment cancellation:')
    if (reason) {
      alert(`Appointment ID ${appointmentId} has been cancelled.\nReason: ${reason}`)
      setRequests(prev => prev.filter(req => req.id !== appointmentId))
    }
  }

  const rescheduleAppointment = (appointmentId) => {
    alert(`Rescheduling appointment ID ${appointmentId}.`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const dayName = dayNames[date.getDay()]
    return `${month}월 ${day}일 (${dayName})`
  }

  // 프로필 관련 핸들러 함수들
  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    alert("Profile has been saved.")
  }

  const addMedicalHistory = () => {
    const hospital = prompt("Enter hospital name:")
    const date = prompt("Enter treatment date: (e.g., 2024.01.15)")
    const diagnosis = prompt("Enter diagnosis or treatment details:")
    const doctor = prompt("Enter attending physician:")

    if (hospital && date && diagnosis && doctor) {
      const newHistory = {
        id: Date.now(),
        hospital,
        date,
        diagnosis,
        doctor,
      }
      setMedicalHistory((prev) => [...prev, newHistory])
      alert("Medical history has been added.")
    }
  }

  const addInsurance = () => {
    const name = prompt("Enter insurance name:")
    const number = prompt("Enter insurance card number:")
    const expireDate = prompt("Enter expiration date: (e.g., 2025.12)")

    if (name && number) {
      const newInsurance = {
        id: Date.now(),
        name,
        number,
        expireDate: expireDate || null,
      }
      setInsuranceList((prev) => [...prev, newInsurance])
      alert("Insurance information has been added.")
    }
  }

  const handlePhotoUpload = () => {
    alert("Profile photo upload feature.")
  }

  return (
    <div className="mypage">
      <div className="container">
        {/* My Page Header */}
        <div className="mypage-header">
          <h1>{t('Patient My Page')}</h1>
          <div className="user-welcome">
            <span className="welcome-text">{t('Hello,')} <strong>{profileData.name}</strong>!</span>
            <div className="status-indicator online">
              <span className="status-dot"></span>
              {t('Active')}
            </div>
          </div>
        </div>

        {/* Profile Header Section */}
        <div className="profile-header-section">
          <div className="profile-photo-section">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-container" onClick={handlePhotoUpload}>
                <div className="profile-photo-inner">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='1.5'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E"
                    alt="Profile Photo"
                  />
                  <div className="photo-overlay">
                    <div className="overlay-icon">
                      <Camera size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="photo-status-indicator online"></div>
            </div>
          </div>
          
          <div className="profile-summary">
            <div className="profile-badge-wrapper">
              <Badge type="success" className="verified-badge">
                <Shield size={14} />
                {t('Verified Patient')}
              </Badge>
            </div>
            <h2 className="profile-name">{profileData.name}</h2>
            <p className="profile-title">{t('Hospital Interpretation Service User')}</p>
            
            <div className="profile-stats-grid">
              <div className="stat-item">
                <div className="stat-icon languages">
                  <span>🌍</span>
                </div>
                <div className="stat-content">
                  <span className="stat-label">{t('Language Support')}</span>
                  <span className="stat-value">{profileData.languages.join(", ")}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon rating">
                  <Heart size={18} fill="currentColor" />
                </div>
                <div className="stat-content">
                  <span className="stat-label">{t('Satisfaction')}</span>
                  <span className="stat-value">{profileData.satisfaction}/5.0</span>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon experience">
                  <Activity size={18} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">{t('Visited Hospitals')}</span>
                  <span className="stat-value">{profileData.visitCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map(stat => (
              <div key={stat.id} className={`stat-card ${stat.type}`}>
                <div className="stat-header">
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                  <div className={`stat-trend ${
                    stat.trend.includes('+') ? 'positive' : 
                    stat.trend === '우수' ? 'neutral' : 'urgent'
                  }`}>
                    {stat.trend}
                  </div>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 마이페이지 그리드 */}
        <div className="mypage-grid">
          {/* 빠른 설정 */}
          <div className="mypage-card quick-settings-card">
            <div className="card-header">
              <h3><Settings size={20} /> {t('Quick Settings')}</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">{t('Appointment Notifications')}</div>
                  <div className="setting-desc">{t('Receive confirmation and reminder notifications')}</div>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={() => handleSettingChange('notifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">{t('Language Support Service')}</div>
                  <div className="setting-desc">{t('When language support is needed during treatment')}</div>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.available}
                    onChange={() => handleSettingChange('available')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">{t('Auto Appointment Confirmation')}</div>
                  <div className="setting-desc">{t('Automatic confirmation of appointment changes')}</div>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.autoConfirm}
                    onChange={() => handleSettingChange('autoConfirm')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* 예약 요청 관리 */}
          <div className="mypage-card requests-card">
            <div className="card-header">
              <h3><Calendar size={20} /> {t('Appointment Management')}</h3>
              <div className="header-actions">
                <button 
                  className="refresh-btn" 
                  onClick={() => setRequests(sampleAppointments[activeTab] || [])}
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
            <div className="card-content">
              <div className="request-tabs">
                {[
                  { key: 'upcoming', label: t('Scheduled Appointments'), count: 2 },
                  { key: 'completed', label: t('Completed Treatments'), count: 1 },
                  { key: 'cancelled', label: t('Cancelled Appointments'), count: 1 }
                ].map(tab => (
                  <button
                    key={tab.key}
                    className={`request-tab ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.key)}
                  >
                    {tab.label} <span className="tab-count">{tab.count}</span>
                  </button>
                ))}
              </div>
              
              <div className="request-list">
                {requests.length === 0 ? (
                  <p className="no-data">{t('No appointments')}</p>
                ) : (
                  requests.map(request => (
                    <div key={request.id} className="request-item mypage-request">
                      <div className="request-header">
                        <h4>{request.hospital}</h4>
                        {request.status === 'pending' && <span className="urgent-badge">{t('Standby')}</span>}
                      </div>
                      <div className="request-details">
                        <p><Calendar size={16} /> {formatDate(request.date)} {request.time}</p>
                        <p>🏥 {request.procedure}</p>
                        <p>👨‍⚕️ {request.doctor}</p>
                        <p>🏢 {request.department}</p>
                      </div>
                      {activeTab === 'upcoming' && (
                        <div className="request-actions">
                          <button 
                            className="btn-primary"
                            onClick={() => rescheduleAppointment(request.id)}
                          >
                            {t('Reschedule')}
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={() => cancelAppointment(request.id)}
                          >
                            {t('Cancel Appointment')}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 오늘의 일정 */}
          <div className="mypage-card schedule-card">
            <div className="card-header">
              <h3><Calendar size={20} /> {t('Today\'s Schedule')}</h3>
              <div className="header-actions">
                <span className="date-display">1월 22일 (월)</span>
              </div>
            </div>
            <div className="card-content">
              <div className="today-schedule">
                <div className="no-schedule">
                  <p>{t('No schedule for today')}</p>
                  <p>{t('Have a comfortable day!')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 프로필 정보 관리 섹션 */}
          <div className="mypage-card profile-info-card">
            <div className="card-header">
              <h3><User size={20} /> {t('Personal Information Management')}</h3>
              <Button
                variant="ghost"
                size="small"
                icon={<Edit size={14} />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? t('Cancel') : t('Edit')}
              </Button>
            </div>
            <div className="card-content">
              <div className="profile-info">
                <div className="info-item">
                  <label>{t('Name:')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  ) : (
                    <span>{profileData.name}</span>
                  )}
                </div>
                <div className="info-item">
                  <label>{t('Email:')}</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                <div className="info-item">
                  <label>{t('Phone:')}</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="edit-actions">
                  <Button variant="primary" size="medium" onClick={handleSave}>
                    {t('Save')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 의료 정보 섹션 */}
          <div className="mypage-card medical-info-card">
            <div className="card-header">
              <h3><FileText size={20} /> {t('Medical Information & Notes')}</h3>
            </div>
            <div className="card-content">
              <div className="introduction-section">
                <textarea
                  className="introduction-textarea"
                  value={profileData.introduction}
                  onChange={(e) => handleProfileChange("introduction", e.target.value)}
                  placeholder="의료 정보 및 특이사항을 작성해주세요. 알레르기, 만성질환, 언어 지원 필요 사항 등을 포함해주세요."
                />
                <div className="introduction-actions">
                  <Button variant="primary" size="medium" onClick={handleSave}>
                    {t('Save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 진료 내역 섹션 */}
          <div className="mypage-card medical-history-card">
            <div className="card-header">
              <h3><Activity size={20} /> {t('Medical History')}</h3>
              <Button 
                variant="primary" 
                size="small"
                icon={<Plus size={16} />} 
                onClick={addMedicalHistory}
              >
                {t('Add')}
              </Button>
            </div>
            <div className="card-content">
              <div className="medical-history-list">
                {medicalHistory.map((history) => (
                  <div key={history.id} className="history-item">
                    <div className="history-info">
                      <h4>{history.hospital}</h4>
                      <p>{t('Treatment Date:')} {history.date}</p>
                      <p>{t('Diagnosis:')} {history.diagnosis}</p>
                      <p>{t('Doctor:')} {history.doctor}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="small"
                      icon={<Edit size={14} />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 보험 정보 섹션 */}
          <div className="mypage-card insurance-card">
            <div className="card-header">
              <h3><Shield size={20} /> {t('Insurance Information')}</h3>
              <Button 
                variant="primary" 
                size="small"
                icon={<Plus size={16} />} 
                onClick={addInsurance}
              >
                {t('Add')}
              </Button>
            </div>
            <div className="card-content">
              <div className="insurance-list">
                {insuranceList.map((insurance) => (
                  <div key={insurance.id} className="insurance-item">
                    <div className="insurance-info">
                      <h4>{insurance.name}</h4>
                      <p>{t('Insurance Number:')} {insurance.number}</p>
                      {insurance.expireDate && (
                        <p>{t('Valid Until:')} {insurance.expireDate}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="small"
                      icon={<Edit size={14} />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 진료 후기 섹션 */}
          <div className="mypage-card reviews-card">
            <div className="card-header">
              <h3><Heart size={20} /> {t('Treatment Reviews')} ({t('Satisfaction:')} {profileData.satisfaction}/5.0)</h3>
            </div>
            <div className="card-content">
              <div className="review-list">
                {treatmentHistory.map((treatment) => (
                  <div key={treatment.id} className="review-item">
                    <div className="review-header">
                      <span className="hospital-name">{treatment.hospital}</span>
                      <span className="rating">{"★".repeat(treatment.satisfaction)}</span>
                      <span className="date">{treatment.date}</span>
                    </div>
                    <p className="review-text">{treatment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage