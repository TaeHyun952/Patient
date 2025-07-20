import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Star, Clock, Award, Languages, Calendar, ArrowLeft } from 'lucide-react';
import '../styles/pages/InterpreterList.css';

const InterpreterList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hospital, selectedProcedure } = location.state || {};
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);

  if (!hospital) {
    navigate('/hospitals');
    return null;
  }

  const detailedInterpreters = [
    {
      id: 1,
      name: 'Kim Young-soo',
      languages: ['English', 'Chinese'],
      rating: 4.9,
      reviewCount: 156,
      experience: '5 years',
      specialization: ['Medical Interpretation', 'Business'],
      certifications: ['TOPIK Level 6', 'HSK Level 6', 'Medical Interpreter Certification'],
      availability: 'Available Now',
      hourlyRate: 25000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: 'Very professional and accurate interpretation.', date: '2024-01-15' },
        { rating: 5, comment: 'Helped facilitate smooth communication with medical staff.', date: '2024-01-10' }
      ]
    },
    {
      id: 2,
      name: 'Lee Min-jung',
      languages: ['Japanese', 'Russian'],
      rating: 4.7,
      reviewCount: 89,
      experience: '3 years',
      specialization: ['Medical Interpretation', 'Tourism'],
      certifications: ['JLPT N1', 'Russian Language Proficiency Test Level 1'],
      availability: 'Available in 2 hours',
      hourlyRate: 22000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: 'Kind and attentive interpretation service.', date: '2024-01-12' },
        { rating: 4, comment: 'Accurately interpreted technical terms as well.', date: '2024-01-08' }
      ]
    },
    {
      id: 3,
      name: 'Park Jun-ho',
      languages: ['English', 'German'],
      rating: 4.8,
      reviewCount: 203,
      experience: '7 years',
      specialization: ['Medical Interpretation', 'Legal', 'Technical'],
      certifications: ['TOEIC 990 points', 'TestDaF Level 5', 'Court Interpreter Certification'],
      availability: 'Available in 1 hour',
      hourlyRate: 28000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: 'Very experienced and highly reliable.', date: '2024-01-14' },
        { rating: 5, comment: 'Perfectly interpreted even complex medical consultations.', date: '2024-01-11' }
      ]
    }
  ];

  const handleBookInterpreter = (interpreter) => {
    navigate('/booking', { 
      state: { 
        hospital, 
        interpreter, 
        selectedProcedure 
      } 
    });
  };

  const handleViewProfile = (interpreter) => {
    setSelectedInterpreter(interpreter);
  };

  const handleBackToHospitals = () => {
    navigate('/hospitals', { 
      state: { 
        selectedProcedure 
      } 
    });
  };

  return (
    <div className="interpreter-list">
      <div className="container">
        <div className="page-header">
          <Button 
            variant="outline" 
            size="small" 
            onClick={handleBackToHospitals}
            className="back-button"
          >
            <ArrowLeft size={16} />
            Back to Hospitals
          </Button>
          <div className="header-content">
            <h1>{hospital.name} Interpreters</h1>
            {selectedProcedure ? (
              <p>Check and book professional interpreters for {selectedProcedure.name} procedure</p>
            ) : (
              <p>Check and book professional interpreters assigned to the hospital</p>
            )}
            {selectedProcedure && (
              <div className="procedure-context">
                <span className="context-label">Selected Procedure:</span>
                <span className="context-value">{selectedProcedure.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="hospital-info-card">
          <Card className="hospital-summary">
            <div className="hospital-basic-info">
              <h3>{hospital.name}</h3>
              <p>{hospital.location}</p>
              <div className="hospital-stats">
                <div className="stat">
                  <Star size={16} fill="currentColor" />
                  <span>{hospital.rating} ({hospital.reviewCount})</span>
                </div>
                <div className="stat">
                  <Clock size={16} />
                  <span>Wait Time {hospital.waitTime}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="interpreters-grid">
          {detailedInterpreters.map((interpreter) => (
            <Card key={interpreter.id} className="interpreter-card">
              <div className="interpreter-header">
                <div className="interpreter-photo">
                  <img src={interpreter.photo} alt={interpreter.name} />
                </div>
                <div className="interpreter-basic">
                  <h3>{interpreter.name}</h3>
                  <div className="languages">
                    <Languages size={16} />
                    <span>{interpreter.languages.join(', ')}</span>
                  </div>
                  <div className="rating">
                    <Star size={16} fill="currentColor" />
                    <span>{interpreter.rating}</span>
                    <span className="review-count">({interpreter.reviewCount})</span>
                  </div>
                </div>
                <div className="interpreter-status">
                  <Badge 
                    type={interpreter.availability === 'Available Now' ? 'success' : 'warning'}
                    size="small"
                  >
                    {interpreter.availability}
                  </Badge>
                  <div className="hourly-rate">
                    {interpreter.hourlyRate.toLocaleString()} KRW/hour
                  </div>
                </div>
              </div>

              <div className="interpreter-details">
                <div className="experience">
                  <Award size={16} />
                  <span>Experience {interpreter.experience}</span>
                </div>
                
                <div className="specializations">
                  <h4>Specializations</h4>
                  <div className="spec-tags">
                    {interpreter.specialization.map((spec, index) => (
                      <Badge key={index} type="secondary" size="small">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="certifications">
                  <h4>Certifications</h4>
                  <div className="cert-list">
                    {interpreter.certifications.slice(0, 2).map((cert, index) => (
                      <span key={index} className="cert-item">{cert}</span>
                    ))}
                    {interpreter.certifications.length > 2 && (
                      <span className="more-certs">
                        +{interpreter.certifications.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="recent-reviews">
                  <h4>Recent Reviews</h4>
                  <div className="review-preview">
                    {interpreter.recentReviews[0] && (
                      <div className="review-item">
                        <div className="review-rating">
                          {Array(interpreter.recentReviews[0].rating).fill(0).map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <p>"{interpreter.recentReviews[0].comment}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="interpreter-actions">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewProfile(interpreter)}
                >
                  View Profile
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleBookInterpreter(interpreter)}
                >
                  <Calendar size={16} />
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterpreterList;