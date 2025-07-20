import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, Clock, MapPin, Phone, Edit, Star } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import '../styles/pages/Schedule.css'

const Schedule = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeStatus, setActiveStatus] = useState('all')
  const [bookings, setBookings] = useState([])

  const myAppointments = [
    {
      id: 1,
      date: '2024-01-22',
      time: '09:00',
      status: 'upcoming',
      hospital: 'Seoul National University Hospital',
      department: 'Ophthalmology',
      doctor: 'Dr. Kim, Ophthalmologist',
      procedure: 'Cataract Surgery Consultation',
      location: 'Main Building 3rd Floor, Room 301',
      notes: 'Pre-surgery consultation and examination results explanation',
      languageSupport: 'Language support requested (English)'
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '14:00',
      status: 'upcoming',
      hospital: 'Samsung Medical Center',
      department: 'Internal Medicine',
      doctor: 'Dr. Lee, Internal Medicine Specialist',
      procedure: 'Regular Health Checkup',
      location: 'Health Promotion Center 2nd Floor',
      notes: 'Annual comprehensive health examination appointment',
      languageSupport: 'No language support needed'
    },
    {
      id: 3,
      date: '2024-01-15',
      time: '10:00',
      status: 'completed',
      hospital: 'Asan Medical Center',
      department: 'Orthopedics',
      doctor: 'Prof. Park, Orthopedic Surgeon',
      procedure: 'Knee Examination',
      location: 'Orthopedics Outpatient 1st Floor',
      notes: 'Knee pain examination completed',
      languageSupport: 'No language support needed'
    },
    {
      id: 4,
      date: '2024-01-18',
      time: '15:30',
      status: 'completed',
      hospital: 'Yonsei Severance Hospital',
      department: 'Cardiology',
      doctor: 'Dr. Choi, Cardiology Specialist',
      procedure: 'Electrocardiogram (ECG)',
      location: 'Cardiology 5th Floor',
      notes: 'ECG examination and consultation completed',
      languageSupport: 'Language support requested (Chinese)'
    },
    {
      id: 5,
      date: '2024-01-12',
      time: '11:00',
      status: 'cancelled',
      hospital: 'Gangnam Severance Hospital',
      department: 'Internal Medicine',
      doctor: 'Dr. Jung, Internal Medicine Specialist',
      procedure: 'Gastroscopy Examination',
      location: 'Gastroenterology 3rd Floor',
      notes: 'Cancelled due to personal reasons',
      languageSupport: 'No language support needed'
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

  const formatDateEnglish = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayName = dayNames[date.getDay()]
    return `${month}/${day} (${dayName})`
  }


  const getStatusName = (status) => {
    const names = {
      'upcoming': t('Scheduled'),
      'completed': t('Completed'),
      'cancelled': t('Cancelled')
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
        <h1>{t('My Appointment History')}</h1>
        
        <div className="patient-info">
          <div className="patient-summary">
            <h2>👤 Patient Kim's {t('Appointment Status')}</h2>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.all}</span>
                  <span className="stat-label">{t('Total Appointments')}</span>
                </div>
              </div>
              <div className="stat-card upcoming">
                <div className="stat-icon">⏰</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.upcoming}</span>
                  <span className="stat-label">{t('Scheduled Appointments')}</span>
                </div>
              </div>
              <div className="stat-card completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.completed}</span>
                  <span className="stat-label">{t('Completed Appointments')}</span>
                </div>
              </div>
              <div className="stat-card cancelled">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <span className="stat-number">{statusCounts.cancelled}</span>
                  <span className="stat-label">{t('Cancelled Appointments')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="appointments-section">
          
          <div className="appointment-status-filter">
            <h3>{t('Appointment Status')}</h3>
            <div className="status-tabs">
              {[
                { key: 'all', label: t('All'), count: statusCounts.all },
                { key: 'upcoming', label: t('Scheduled'), count: statusCounts.upcoming },
                { key: 'completed', label: t('Completed'), count: statusCounts.completed },
                { key: 'cancelled', label: t('Cancelled'), count: statusCounts.cancelled }
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
              <p className="no-data">{t('No appointments found')}</p>
            ) : (
              bookings.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
                    <div className="appointment-header">
                      <h4>{appointment.hospital} - {appointment.department}</h4>
                      <span className={`appointment-status ${appointment.status}`}>
                        {getStatusName(appointment.status)}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <p><Calendar size={16} /> {formatDateEnglish(appointment.date)} {appointment.time}</p>
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
                      {t('View Details')}
                    </button>
                    {appointment.status === 'upcoming' && (
                      <button 
                        className="btn-edit"
                        onClick={() => editBooking(appointment.id)}
                      >
                        <Edit size={16} /> {t('Edit')}
                      </button>
                    )}
                    {appointment.status === 'completed' && (
                      <button 
                        className="btn-add"
                        onClick={() => writeReview(appointment.id)}
                      >
                        <Star size={16} /> {t('Write Review')}
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