import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { MapPin, Star, Users, Phone, Clock } from 'lucide-react';
import '../styles/pages/HospitalSelection.css';

const HospitalSelection = () => {
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: '서울대학교병원',
      location: '서울특별시 종로구 대학로 101',
      rating: 4.8,
      reviewCount: 1250,
      phone: '02-2072-2114',
      departments: ['내과', '외과', '소아과', '산부인과', '정형외과'],
      interpreters: [
        { name: '김영수', languages: ['영어', '중국어'], rating: 4.9, experience: '5년' },
        { name: '이민정', languages: ['일본어', '러시아어'], rating: 4.7, experience: '3년' },
        { name: '박준호', languages: ['영어', '독일어'], rating: 4.8, experience: '7년' }
      ],
      distance: '2.5km',
      waitTime: '15분'
    },
    {
      id: 2,
      name: '삼성서울병원',
      location: '서울특별시 강남구 일원로 81',
      rating: 4.7,
      reviewCount: 980,
      phone: '02-3410-2114',
      departments: ['심장내과', '신경외과', '암센터', '응급의학과'],
      interpreters: [
        { name: '최수진', languages: ['영어', '프랑스어'], rating: 4.8, experience: '4년' },
        { name: '정호영', languages: ['중국어', '베트남어'], rating: 4.6, experience: '6년' }
      ],
      distance: '3.8km',
      waitTime: '20분'
    },
    {
      id: 3,
      name: '아산병원',
      location: '서울특별시 송파구 올림픽로43길 88',
      rating: 4.9,
      reviewCount: 1540,
      phone: '02-3010-3114',
      departments: ['종양내과', '심장외과', '재활의학과', '핵의학과'],
      interpreters: [
        { name: '강미라', languages: ['영어', '스페인어'], rating: 4.9, experience: '8년' },
        { name: '윤태석', languages: ['중국어', '태국어'], rating: 4.7, experience: '4년' },
        { name: '서지현', languages: ['일본어', '아랍어'], rating: 4.8, experience: '5년' }
      ],
      distance: '5.2km',
      waitTime: '25분'
    }
  ];

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    navigate('/interpreters', { state: { hospital } });
  };

  const handleViewInterpreters = (hospital) => {
    navigate('/interpreters', { state: { hospital } });
  };

  return (
    <div className="hospital-selection">
      <div className="container">
        <div className="page-header">
          <h1>병원 선택</h1>
          <p>통역 서비스를 이용할 병원을 선택해주세요</p>
        </div>

        <div className="hospitals-grid">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="hospital-card">
              <div className="hospital-header">
                <div className="hospital-info">
                  <h3 className="hospital-name">{hospital.name}</h3>
                  <div className="hospital-location">
                    <MapPin size={16} />
                    <span>{hospital.location}</span>
                  </div>
                </div>
                <div className="hospital-rating">
                  <Star size={16} fill="currentColor" />
                  <span>{hospital.rating}</span>
                  <span className="review-count">({hospital.reviewCount})</span>
                </div>
              </div>

              <div className="hospital-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{hospital.distance}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>대기시간 {hospital.waitTime}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={14} />
                    <span>{hospital.phone}</span>
                  </div>
                </div>

                <div className="departments">
                  <h4>주요 진료과</h4>
                  <div className="department-tags">
                    {hospital.departments.slice(0, 3).map((dept, index) => (
                      <Badge key={index} type="secondary" size="small">
                        {dept}
                      </Badge>
                    ))}
                    {hospital.departments.length > 3 && (
                      <Badge type="outline" size="small">
                        +{hospital.departments.length - 3}개
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="interpreters-preview">
                  <h4>
                    <Users size={16} />
                    배치된 통역사 ({hospital.interpreters.length}명)
                  </h4>
                  <div className="interpreter-list">
                    {hospital.interpreters.slice(0, 2).map((interpreter, index) => (
                      <div key={index} className="interpreter-preview">
                        <div className="interpreter-info">
                          <span className="interpreter-name">{interpreter.name}</span>
                          <span className="interpreter-languages">
                            {interpreter.languages.join(', ')}
                          </span>
                        </div>
                        <div className="interpreter-rating">
                          <Star size={12} fill="currentColor" />
                          <span>{interpreter.rating}</span>
                        </div>
                      </div>
                    ))}
                    {hospital.interpreters.length > 2 && (
                      <div className="more-interpreters">
                        +{hospital.interpreters.length - 2}명 더
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hospital-actions">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewInterpreters(hospital)}
                >
                  통역사 보기
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleHospitalSelect(hospital)}
                >
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

export default HospitalSelection;