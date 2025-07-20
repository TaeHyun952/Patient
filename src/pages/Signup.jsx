import React, { useState } from 'react'
import { Upload, Check, AlertCircle, Shield, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import FormField from '../components/FormField'
import Badge from '../components/Badge'
import '../styles/pages/Signup.css'

const Signup = ({ currentUser, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    birthDate: '',
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    preferredLanguage: '',
    allergies: '',
    medicalConditions: '',
    insuranceNumber: '',
    insuranceProvider: ''
  })
  
  const [registrationStatus, setRegistrationStatus] = useState('none') // none, pending, approved
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (field, value) => {
    if (field === 'terms') {
      setAgreedToTerms(value)
    } else if (field === 'privacy') {
      setAgreedToPrivacy(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 유효성 검사
    if (!formData.name || !formData.email || !formData.phone || !formData.birthDate || !formData.gender) {
      alert('필수 정보를 모두 입력해주세요.')
      return
    }
    
    if (!agreedToTerms || !agreedToPrivacy) {
      alert('이용약관과 개인정보처리방침에 동의해주세요.')
      return
    }

    // 사용자 정보 업데이트
    const updatedUser = {
      ...currentUser,
      ...formData,
      registrationDate: new Date().toISOString(),
      patientId: 'P' + Date.now().toString().slice(-8),
      membershipType: 'basic'
    }

    setCurrentUser(updatedUser)
    setRegistrationStatus('pending')
    
    alert('회원가입 정보가 저장되었습니다!')

    // 3초 후 자동으로 승인 상태로 변경 (데모용)
    setTimeout(() => {
      setRegistrationStatus('approved')
      alert('회원가입이 완료되었습니다!')
    }, 3000)
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'pending':
        return <AlertCircle className="status-icon pending" />
      case 'approved':
        return <Check className="status-icon approved" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (registrationStatus) {
      case 'pending':
        return '등록 처리 중'
      case 'approved':
        return '등록 완료'
      default:
        return '미등록'
    }
  }

  if (registrationStatus === 'pending' || registrationStatus === 'approved') {
    return (
      <div className="signup verification">
        <div className="container">
          <h1>환자 등록 현황</h1>
          <div className="verification-status">
            <div className="status-item">
              <span className="status-label">등록 상태:</span>
              <span className={`status-value ${registrationStatus}`}>
                {getStatusIcon()}
                {getStatusText()}
              </span>
            </div>
            
            <div className="patient-info">
              <h3>등록 정보</h3>
              <div className="info-preview">
                <div className="info-item">
                  <strong>환자명:</strong> {formData.name}
                </div>
                <div className="info-item">
                  <strong>이메일:</strong> {formData.email}
                </div>
                <div className="info-item">
                  <strong>전화번호:</strong> {formData.phone}
                </div>
                <div className="info-item">
                  <strong>생년월일:</strong> {formData.birthDate}
                </div>
                <div className="info-item">
                  <strong>등록 시간:</strong> {new Date().toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="verification-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setRegistrationStatus('none')}
              >
                ⬅️ 정보 수정
              </button>
              <button 
                className="btn-primary" 
                onClick={() => window.location.href = '/dashboard'}
              >
                🏠 대시보드로
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="signup">
      <div className="container">
        <h1>환자 회원가입</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
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
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="birthDate">생년월일 *</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">성별 *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">선택해주세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="주소를 입력해주세요"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="emergencyContact">비상연락처 (이름)</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="비상시 연락할 분의 이름"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="emergencyPhone">비상연락처 (전화번호)</label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              placeholder="비상시 연락할 전화번호"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="preferredLanguage">언어 지원 필요</label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleInputChange}
            >
              <option value="">없음</option>
              <option value="english">영어</option>
              <option value="chinese">중국어</option>
              <option value="japanese">일본어</option>
              <option value="spanish">스페인어</option>
              <option value="french">프랑스어</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="allergies">알레르기</label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="알레르기가 있으면 입력해주세요 (예: 페니실린, 견과류)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="medicalConditions">기존 질환</label>
            <input
              type="text"
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="기존 질환이 있으면 입력해주세요 (예: 당뇨병, 고혈압)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="insuranceProvider">보험사</label>
            <select
              id="insuranceProvider"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
            >
              <option value="">선택해주세요</option>
              <option value="national">국민건강보험</option>
              <option value="samsung">삼성화재</option>
              <option value="hyundai">현대해상</option>
              <option value="dongbu">동부화재</option>
              <option value="other">기타</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="insuranceNumber">보험증 번호</label>
            <input
              type="text"
              id="insuranceNumber"
              name="insuranceNumber"
              value={formData.insuranceNumber}
              onChange={handleInputChange}
              placeholder="보험증 번호를 입력해주세요"
            />
          </div>
          
          <div className="form-group agreement-section">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
                required
              />
              <label htmlFor="agreeTerms">이용약관에 동의합니다 *</label>
            </div>
            
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="agreePrivacy"
                checked={agreedToPrivacy}
                onChange={(e) => handleCheckboxChange('privacy', e.target.checked)}
                required
              />
              <label htmlFor="agreePrivacy">개인정보 처리방침에 동의합니다 *</label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!agreedToTerms || !agreedToPrivacy}
          >
            <Shield size={18} />
            환자 등록 완료
          </button>
        </form>
        <div className="login-link">
          <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup