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
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.birthDate || !formData.gender) {
      alert('Please fill in all required information.')
      return
    }
    
    if (!agreedToTerms || !agreedToPrivacy) {
      alert('Please agree to the Terms of Use and Privacy Policy.')
      return
    }

    // Update user information
    const updatedUser = {
      ...currentUser,
      ...formData,
      registrationDate: new Date().toISOString(),
      patientId: 'P' + Date.now().toString().slice(-8),
      membershipType: 'basic'
    }

    setCurrentUser(updatedUser)
    setRegistrationStatus('pending')
    
    alert('Registration information has been saved!')

    // Automatically change to approved status after 3 seconds (for demo)
    setTimeout(() => {
      setRegistrationStatus('approved')
      alert('Registration completed successfully!')
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
        return 'Registration Processing'
      case 'approved':
        return 'Registration Complete'
      default:
        return 'Not Registered'
    }
  }

  if (registrationStatus === 'pending' || registrationStatus === 'approved') {
    return (
      <div className="signup verification">
        <div className="container">
          <h1>Patient Registration Status</h1>
          <div className="verification-status">
            <div className="status-item">
              <span className="status-label">Registration Status:</span>
              <span className={`status-value ${registrationStatus}`}>
                {getStatusIcon()}
                {getStatusText()}
              </span>
            </div>
            
            <div className="patient-info">
              <h3>Registration Information</h3>
              <div className="info-preview">
                <div className="info-item">
                  <strong>Patient Name:</strong> {formData.name}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {formData.email}
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> {formData.phone}
                </div>
                <div className="info-item">
                  <strong>Birth Date:</strong> {formData.birthDate}
                </div>
                <div className="info-item">
                  <strong>Registration Time:</strong> {new Date().toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="verification-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setRegistrationStatus('none')}
              >
                ⬅️ Edit Information
              </button>
              <button 
                className="btn-primary" 
                onClick={() => window.location.href = '/dashboard'}
              >
                🏠 To Dashboard
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
        <h1>Patient Registration</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="phone">Phone Number</label>
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
            <label htmlFor="birthDate">Birth Date *</label>
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
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Please enter your address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency Contact (Name)</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Name of emergency contact person"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="emergencyPhone">Emergency Contact (Phone)</label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              placeholder="Emergency contact phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="preferredLanguage">Language Support Needed</label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleInputChange}
            >
              <option value="">None</option>
              <option value="english">English</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="Please enter allergies if any (e.g., Penicillin, Nuts)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="medicalConditions">Existing Medical Conditions</label>
            <input
              type="text"
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="Please enter existing conditions if any (e.g., Diabetes, Hypertension)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="insuranceProvider">Insurance Provider</label>
            <select
              id="insuranceProvider"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="national">National Health Insurance</option>
              <option value="samsung">Samsung Fire & Marine</option>
              <option value="hyundai">Hyundai Marine & Fire</option>
              <option value="dongbu">Dongbu Fire & Marine</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="insuranceNumber">Insurance Card Number</label>
            <input
              type="text"
              id="insuranceNumber"
              name="insuranceNumber"
              value={formData.insuranceNumber}
              onChange={handleInputChange}
              placeholder="Please enter your insurance card number"
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
              <label htmlFor="agreeTerms">I agree to the Terms of Use *</label>
            </div>
            
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="agreePrivacy"
                checked={agreedToPrivacy}
                onChange={(e) => handleCheckboxChange('privacy', e.target.checked)}
                required
              />
              <label htmlFor="agreePrivacy">I agree to the Privacy Policy *</label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!agreedToTerms || !agreedToPrivacy}
          >
            <Shield size={18} />
            Complete Patient Registration
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup