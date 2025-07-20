import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin, Phone, Edit, Star } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import '../styles/pages/Schedule.css'

const Schedule = () => {
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('all')
  const [bookings, setBookings] = useState([])

  const myAppointments = [
    {
      id: 1,
      date: '2024-01-22',
      time: '09:00',
      status: 'upcoming',
      hospital: '서울대학교병원',
      department: '안과',
      doctor: '김안과 교수',
      procedure: '백내장 수술 상담',
      location: '본관 3층 301호',
      notes: '수술 전 상담 및 검사 결과 설명',
      languageSupport: '언어 지원 요청 (영어)'
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '14:00',
      status: 'upcoming',
      hospital: '삼성서울병원',
      department: '내과',
      doctor: '이내과 전문의',
      procedure: '정기 건강검진',
      location: '건강증진센터 2층',
      notes: '연간 종합검진 예약',
      languageSupport: '언어 지원 불필요'
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '10:00',
      status: 'completed',
      hospital: '아산병원',
      department: '정형외과',
      doctor: '박정형외과 교수',
      procedure: '무릎 검사',
      location: '정형외과 외래 1층',
      notes: '무릎 통증 검사 완료',
      languageSupport: '언어 지원 불필요'
    },
    {
      id: 4,
      date: '2024-01-18',
      time: '15:30',
      status: 'completed',
      hospital: '연세세브란스병원',
      department: '심장내과',
      doctor: '최심장내과 전문의',
      procedure: '심전도 검사',
      location: '심장내과 5층',
      notes: '심전도 검사 및 상담 완료',
      languageSupport: '언어 지원 요청 (중국어)'
    },
    {
      id: 5,
      date: '2024-01-12',
      time: '11:00',
      status: 'cancelled',
      hospital: '강남세브란스병원',
      department: '내과',
      doctor: '정내과 전문의',
      procedure: '위내시경 검사',
      location: '소화기내과 3층',
      notes: '개인 사정으로 취소',
      languageSupport: '언어 지원 불필요'
    }
  ]

  useEffect(() => {
    filterAppointments(activeStatus)
  }, [activeStatus])

  const filterAppointments = (status) => {
    if (status === 'all') {
      setBookings(myAppointments)
    } else {
      setBookings(myAppointments.filter(appointment => appointment.status === status))
    }
  }

  const handleStatusChange = (status) => {
    setActiveStatus(status)
  }

  const formatDateKorean = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const dayName = dayNames[date.getDay()]
    return `${month}월 ${day}일 (${dayName})`
  }


  const getStatusKoreanName = (status) => {
    const names = {
      'upcoming': '예정',
      'completed': '완료',
      'cancelled': '취소'
    }
    return names[status] || status
  }

  const editBooking = (bookingId) => {
    navigate('/edit-booking', { state: { bookingId } })
  }

  const writeReview = (bookingId) => {
    navigate('/write-review', { state: { bookingId } })
  }

  const viewDetails = (bookingId) => {
    navigate('/detail-view', { state: { bookingId } })
  }

  const statusCounts = {
    all: myAppointments.length,
    upcoming: myAppointments.filter(a => a.status === 'upcoming').length,
    completed: myAppointments.filter(a => a.status === 'completed').length,
    cancelled: myAppointments.filter(a => a.status === 'cancelled').length
  }

  return (
    <div className="schedule">
      <div className="container">
        <h1>나의 예약 내역</h1>
        
        <div className="patient-info">
          <div className="patient-summary">
            <h2>👤 김환자님의 예약 현황</h2>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.all}</span>
                  <span className="stat-label">전체 예약</span>
                </div>
              </div>
              <div className="stat-card upcoming">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.upcoming}</span>
                  <span className="stat-label">예정된 예약</span>
                </div>
              </div>
              <div className="stat-card completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.completed}</span>
                  <span className="stat-label">완료된 예약</span>
                </div>
              </div>
              <div className="stat-card cancelled">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.cancelled}</span>
                  <span className="stat-label">취소된 예약</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="appointments-section">
          
          <div className="appointment-status-filter">
            <h3>예약 상태별 조회</h3>
            <div className="status-tabs">
              {[
                { key: 'all', label: '전체', count: statusCounts.all },
                { key: 'upcoming', label: '예정', count: statusCounts.upcoming },
                { key: 'completed', label: '완료', count: statusCounts.completed },
                { key: 'cancelled', label: '취소', count: statusCounts.cancelled }
              ].map(tab => (
                <button
                  key={tab.key}
                  className={`status-tab ${activeStatus === tab.key ? 'active' : ''}`}
                  onClick={() => handleStatusChange(tab.key)}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="appointments-list">
            {bookings.length === 0 ? (
              <p className="no-data">해당 상태의 예약이 없습니다.</p>
            ) : (
              bookings.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <div className="appointment-header">
                      <h4>{appointment.hospital} - {appointment.department}</h4>
                      <span className={`appointment-status ${appointment.status}`}>
                        {getStatusKoreanName(appointment.status)}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <p><Calendar size={16} /> {formatDateKorean(appointment.date)} {appointment.time}</p>
                      <p>👨‍⚕️ {appointment.doctor}</p>
                      <p>🏥 {appointment.procedure}</p>
                      <p><MapPin size={14} /> {appointment.location}</p>
                      <p>🌍 {appointment.languageSupport}</p>
                      <p>📝 {appointment.notes}</p>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => viewDetails(appointment.id)}
                    >
                      상세보기
                    </button>
                    {appointment.status === 'upcoming' && (
                      <button 
                        className="btn-edit"
                        onClick={() => editBooking(appointment.id)}
                      >
                        <Edit size={16} /> 예약 수정
                      </button>
                    )}
                    {appointment.status === 'completed' && (
                      <button 
                        className="btn-add"
                        onClick={() => writeReview(appointment.id)}
                      >
                        <Star size={16} /> 후기 작성
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule