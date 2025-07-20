import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { MapPin, Star, Users, Phone, Clock } from 'lucide-react';
import '../styles/pages/HospitalSelection.css';

const HospitalSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  const selectedProcedure = location.state?.selectedProcedure;

  // 시술이 선택되지 않은 경우 대시보드로 리다이렉트
  React.useEffect(() => {
    if (!selectedProcedure) {
      navigate('/');
    }
  }, [selectedProcedure, navigate]);

  if (!selectedProcedure) {
    return <div>시술을 선택해주세요...</div>;
  }

  const allHospitals = [
    {
      id: 1,
      name: '강남세브란스병원',
      location: '서울특별시 강남구 언주로 211',
      rating: 4.8,
      reviewCount: 1250,
      phone: '02-2019-3114',
      departments: ['성형외과', '피부과', '안과'],
      availableProcedures: ['코성형', '눈성형', '가슴성형', '지방흡입', '보톡스', '필러', '레이저토닝', '라식/라섹', '백내장 수술'],
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
      name: '신논현성형외과',
      location: '서울특별시 강남구 강남대로 456',
      rating: 4.7,
      reviewCount: 980,
      phone: '02-1234-5678',
      departments: ['성형외과', '피부과'],
      availableProcedures: ['코성형', '눈성형', '가슴성형', '지방흡입', '보톡스', '필러', '레이저토닝'],
      interpreters: [
        { name: '최수진', languages: ['영어', '프랑스어'], rating: 4.8, experience: '4년' },
        { name: '정호영', languages: ['중국어', '베트남어'], rating: 4.6, experience: '6년' }
      ],
      distance: '3.8km',
      waitTime: '20분'
    },
    {
      id: 3,
      name: '서울아산병원',
      location: '서울특별시 송파구 올림픽로43길 88',
      rating: 4.9,
      reviewCount: 1540,
      phone: '02-3010-3114',
      departments: ['안과', '내과', '치과'],
      availableProcedures: ['라식/라섹', '백내장 수술', '건강검진', '임플란트', '치아교정'],
      interpreters: [
        { name: '강미라', languages: ['영어', '스페인어'], rating: 4.9, experience: '8년' },
        { name: '윤태석', languages: ['중국어', '태국어'], rating: 4.7, experience: '4년' },
        { name: '서지현', languages: ['일본어', '아랍어'], rating: 4.8, experience: '5년' }
      ],
      distance: '5.2km',
      waitTime: '25분'
    },
    {
      id: 4,
      name: '서울대학교치과병원',
      location: '서울특별시 종로구 대학로 101',
      rating: 4.6,
      reviewCount: 850,
      phone: '02-2072-2114',
      departments: ['치과'],
      availableProcedures: ['임플란트', '치아교정'],
      interpreters: [
        { name: '이현우', languages: ['영어', '중국어'], rating: 4.5, experience: '3년' },
        { name: '박서연', languages: ['일본어', '영어'], rating: 4.7, experience: '4년' }
      ],
      distance: '6.1km',
      waitTime: '30분'
    },
    {
      id: 5,
      name: '압구정피부과',
      location: '서울특별시 강남구 압구정로 123',
      rating: 4.5,
      reviewCount: 650,
      phone: '02-5678-9012',
      departments: ['피부과'],
      availableProcedures: ['보톡스', '필러', '레이저토닝'],
      interpreters: [
        { name: '김지수', languages: ['영어', '중국어'], rating: 4.4, experience: '2년' },
        { name: '최민호', languages: ['일본어', '프랑스어'], rating: 4.6, experience: '5년' }
      ],
      distance: '4.3km',
      waitTime: '10분'
    }
  ];

  // 선택된 시술에 따라 병원 필터링
  const hospitals = allHospitals.filter(hospital => 
    hospital.availableProcedures.includes(selectedProcedure.name)
  );

  console.log('선택된 시술:', selectedProcedure);
  console.log('필터링된 병원들:', hospitals);

  const handleHospitalSelect = (hospital) => {
    console.log('병원 선택됨:', hospital);
    setSelectedHospital(hospital);
    navigate('/interpreters', { 
      state: { 
        hospital,
        selectedProcedure 
      } 
    });
  };

  const handleViewInterpreters = (hospital) => {
    navigate('/interpreters', { 
      state: { 
        hospital,
        selectedProcedure 
      } 
    });
  };

  return (
    <div className="hospital-selection">
      <div className="container">
        <div className="page-header">
          <h1>병원 선택</h1>
          {selectedProcedure ? (
            <p>{selectedProcedure.name} 시술을 위한 병원을 선택해주세요</p>
          ) : (
            <p>통역 서비스를 이용할 병원을 선택해주세요</p>
          )}
          {selectedProcedure && (
            <div className="selected-procedure-info">
              <span className="procedure-label">선택된 시술:</span>
              <span className="procedure-name">{selectedProcedure.name}</span>
            </div>
          )}
        </div>

        {hospitals.length === 0 ? (
          <div className="no-hospitals">
            <h3>죄송합니다</h3>
            <p>현재 "{selectedProcedure.name}" 시술을 제공하는 병원이 없습니다.</p>
            <Button variant="outline" onClick={() => navigate('/')}>
              다른 시술 선택하기
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HospitalSelection;