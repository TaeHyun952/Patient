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
  const { hospital } = location.state || {};
  const [selectedInterpreter, setSelectedInterpreter] = useState(null);

  if (!hospital) {
    navigate('/hospitals');
    return null;
  }

  const detailedInterpreters = [
    {
      id: 1,
      name: '김영수',
      languages: ['영어', '중국어'],
      rating: 4.9,
      reviewCount: 156,
      experience: '5년',
      specialization: ['의료통역', '비즈니스'],
      certifications: ['TOPIK 6급', 'HSK 6급', '의료통역사 자격증'],
      availability: '즉시 가능',
      hourlyRate: 25000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: '매우 전문적이고 정확한 통역이었습니다.', date: '2024-01-15' },
        { rating: 5, comment: '의료진과 원활한 소통을 도와주셨어요.', date: '2024-01-10' }
      ]
    },
    {
      id: 2,
      name: '이민정',
      languages: ['일본어', '러시아어'],
      rating: 4.7,
      reviewCount: 89,
      experience: '3년',
      specialization: ['의료통역', '관광'],
      certifications: ['JLPT N1', '러시아어능력검정 1급'],
      availability: '2시간 후',
      hourlyRate: 22000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: '친절하고 세심한 통역 서비스였습니다.', date: '2024-01-12' },
        { rating: 4, comment: '전문 용어도 정확하게 통역해주셨어요.', date: '2024-01-08' }
      ]
    },
    {
      id: 3,
      name: '박준호',
      languages: ['영어', '독일어'],
      rating: 4.8,
      reviewCount: 203,
      experience: '7년',
      specialization: ['의료통역', '법률', '기술'],
      certifications: ['TOEIC 990점', 'TestDaF 5급', '법정통역사 자격증'],
      availability: '1시간 후',
      hourlyRate: 28000,
      photo: '/api/placeholder/80/80',
      recentReviews: [
        { rating: 5, comment: '경험이 풍부하시고 매우 신뢰할 수 있어요.', date: '2024-01-14' },
        { rating: 5, comment: '복잡한 의료 상담도 완벽하게 통역해주셨습니다.', date: '2024-01-11' }
      ]
    }
  ];

  const handleBookInterpreter = (interpreter) => {
    navigate('/booking', { state: { hospital, interpreter } });
  };

  const handleViewProfile = (interpreter) => {
    setSelectedInterpreter(interpreter);
  };

  const handleBackToHospitals = () => {
    navigate('/hospitals');
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
            병원 목록으로
          </Button>
          <div className="header-content">
            <h1>{hospital.name} 통역사</h1>
            <p>병원에 배치된 전문 통역사들을 확인하고 예약하세요</p>
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
                  <span>대기시간 {hospital.waitTime}</span>
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
                    type={interpreter.availability === '즉시 가능' ? 'success' : 'warning'}
                    size="small"
                  >
                    {interpreter.availability}
                  </Badge>
                  <div className="hourly-rate">
                    {interpreter.hourlyRate.toLocaleString()}원/시간
                  </div>
                </div>
              </div>

              <div className="interpreter-details">
                <div className="experience">
                  <Award size={16} />
                  <span>경력 {interpreter.experience}</span>
                </div>
                
                <div className="specializations">
                  <h4>전문 분야</h4>
                  <div className="spec-tags">
                    {interpreter.specialization.map((spec, index) => (
                      <Badge key={index} type="secondary" size="small">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="certifications">
                  <h4>자격증</h4>
                  <div className="cert-list">
                    {interpreter.certifications.slice(0, 2).map((cert, index) => (
                      <span key={index} className="cert-item">{cert}</span>
                    ))}
                    {interpreter.certifications.length > 2 && (
                      <span className="more-certs">
                        +{interpreter.certifications.length - 2}개
                      </span>
                    )}
                  </div>
                </div>

                <div className="recent-reviews">
                  <h4>최근 리뷰</h4>
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
                  프로필 보기
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleBookInterpreter(interpreter)}
                >
                  <Calendar size={16} />
                  예약하기
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