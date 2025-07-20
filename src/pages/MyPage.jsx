import React, { useState, useEffect } from 'react'
import { Calendar, Heart, CheckCircle, Building2, Settings, RefreshCw, User } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import '../styles/pages/MyPage.css'

const MyPage = () => {
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('new')
  const [settings, setSettings] = useState({
    available: true,
    autoConfirm: true,
    notifications: false
  })

  const stats = [
    {
      id: 'appointments',
      icon: <Calendar className="stat-icon-svg" />,
      trend: '+3',
      number: '7',
      label: '이번 달 예약',
      type: 'completion'
    },
    {
      id: 'hospitals',
      icon: <Building2 className="stat-icon-svg" />,
      trend: '+2',
      number: '12',
      label: '방문한 병원',
      type: 'income'
    },
    {
      id: 'satisfaction',
      icon: <Heart className="stat-icon-svg" />,
      trend: '+0.2',
      number: '4.6',
      label: '서비스 만족도',
      type: 'rating'
    },
    {
      id: 'upcoming',
      icon: <CheckCircle className="stat-icon-svg" />,
      trend: '예정',
      number: '1',
      label: '다가오는 예약',
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
    const reason = prompt('예약 취소 사유를 입력해주세요:')
    if (reason) {
      alert(`예약 ID ${appointmentId}를 취소했습니다.\n사유: ${reason}`)
      setRequests(prev => prev.filter(req => req.id !== appointmentId))
    }
  }

  const rescheduleAppointment = (appointmentId) => {
    alert(`예약 ID ${appointmentId}의 일정을 변경합니다.`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const dayName = dayNames[date.getDay()]
    return `${month}월 ${day}일 (${dayName})`
  }

  return (
    <div className="mypage">
      <div className="container">
        {/* 마이페이지 헤더 */}
        <div className="mypage-header">
          <h1>환자 마이페이지</h1>
          <div className="user-welcome">
            <span className="welcome-text">안녕하세요, <strong>김환자</strong>님!</span>
            <div className="status-indicator online">
              <span className="status-dot"></span>
              활동 중
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
              <h3><Settings size={20} /> 빠른 설정</h3>
            </div>
            <div className="card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-title">예약 알림</div>
                  <div className="setting-desc">예약 확인 및 리마인더 알림 수신</div>
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
                  <div className="setting-title">언어 지원 서비스</div>
                  <div className="setting-desc">진료 시 언어 지원이 필요한 경우</div>
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
                  <div className="setting-title">자동 예약 확인</div>
                  <div className="setting-desc">예약 변경 사항 자동 확인</div>
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
              <h3><Calendar size={20} /> 예약 관리</h3>
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
                  { key: 'upcoming', label: '예정된 예약', count: 2 },
                  { key: 'completed', label: '완료된 진료', count: 1 },
                  { key: 'cancelled', label: '취소된 예약', count: 1 }
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
                  <p className="no-data">예약이 없습니다.</p>
                ) : (
                  requests.map(request => (
                    <div key={request.id} className="request-item mypage-request">
                      <div className="request-header">
                        <h4>{request.hospital}</h4>
                        {request.status === 'pending' && <span className="urgent-badge">대기</span>}
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
                            일정 변경
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={() => cancelAppointment(request.id)}
                          >
                            예약 취소
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
              <h3><Calendar size={20} /> 오늘의 일정</h3>
              <div className="header-actions">
                <span className="date-display">1월 22일 (월)</span>
              </div>
            </div>
            <div className="card-content">
              <div className="today-schedule">
                <div className="no-schedule">
                  <p>📅 오늘 예정된 일정이 없습니다.</p>
                  <p>편안한 하루 보내세요!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage