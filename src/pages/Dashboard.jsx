import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Heart, Eye, Zap, Scissors, Smile, Shield, Search } from 'lucide-react';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const procedures = [
    {
      id: 1,
      name: '코성형',
      category: 'plastic',
      department: '성형외과',
      icon: <Smile size={32} />,
      description: '콧대, 코끝, 콧볼 성형술',
      estimatedTime: '2-3시간',
      price: '300만원~',
      popularity: 95
    },
    {
      id: 2,
      name: '눈성형',
      category: 'plastic',
      department: '성형외과',
      icon: <Eye size={32} />,
      description: '쌍꺼풀, 눈매교정, 트임술',
      estimatedTime: '1-2시간',
      price: '150만원~',
      popularity: 92
    },
    {
      id: 3,
      name: '보톡스',
      category: 'derma',
      department: '피부과',
      icon: <Shield size={32} />,
      description: '주름개선, 턱라인 보톡스',
      estimatedTime: '30분',
      price: '20만원~',
      popularity: 88
    },
    {
      id: 4,
      name: '필러',
      category: 'derma',
      department: '피부과',
      icon: <Heart size={32} />,
      description: '볼륨개선, 입술필러, 팔자주름',
      estimatedTime: '30분-1시간',
      price: '30만원~',
      popularity: 85
    },
    {
      id: 5,
      name: '라식/라섹',
      category: 'eye',
      department: '안과',
      icon: <Eye size={32} />,
      description: '시력교정술',
      estimatedTime: '30분-1시간',
      price: '150만원~',
      popularity: 83
    },
    {
      id: 6,
      name: '임플란트',
      category: 'dental',
      department: '치과',
      icon: <Smile size={32} />,
      description: '치아 임플란트 시술',
      estimatedTime: '1-2시간',
      price: '120만원~',
      popularity: 80
    },
    {
      id: 7,
      name: '치아교정',
      category: 'dental',
      department: '치과',
      icon: <Smile size={32} />,
      description: '투명교정, 메탈교정',
      estimatedTime: '1시간',
      price: '400만원~',
      popularity: 78
    },
    {
      id: 8,
      name: '레이저토닝',
      category: 'derma',
      department: '피부과',
      icon: <Zap size={32} />,
      description: '기미, 잡티 제거',
      estimatedTime: '30분',
      price: '15만원~',
      popularity: 75
    },
    {
      id: 9,
      name: '가슴성형',
      category: 'plastic',
      department: '성형외과',
      icon: <Heart size={32} />,
      description: '가슴확대, 가슴축소술',
      estimatedTime: '2-3시간',
      price: '500만원~',
      popularity: 72
    },
    {
      id: 10,
      name: '지방흡입',
      category: 'plastic',
      department: '성형외과',
      icon: <Zap size={32} />,
      description: '복부, 허벅지, 팔뚝 지방흡입',
      estimatedTime: '2-4시간',
      price: '400만원~',
      popularity: 70
    },
    {
      id: 11,
      name: '백내장 수술',
      category: 'eye',
      department: '안과',
      icon: <Eye size={32} />,
      description: '인공수정체 삽입술',
      estimatedTime: '30분-1시간',
      price: '200만원~',
      popularity: 68
    },
    {
      id: 12,
      name: '건강검진',
      category: 'internal',
      department: '내과',
      icon: <Heart size={32} />,
      description: '종합건강검진, 암검진',
      estimatedTime: '2-3시간',
      price: '50만원~',
      popularity: 65
    }
  ];

  const filteredProcedures = procedures.filter(procedure =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcedureSelect = (procedure) => {
    console.log('=== 시술 선택 시작 ===');
    console.log('시술 선택됨:', procedure);
    console.log('네비게이트 함수 타입:', typeof navigate);
    console.log('네비게이트 함수:', navigate);
    console.log('현재 URL:', window.location.href);
    
    try {
      console.log('네비게이션 시도 중...');
      
      // 네비게이션 상태에 React 컴포넌트(icon)가 포함되지 않도록 직렬화 가능한 데이터만 전달합니다.
      const { icon, ...procedureForState } = procedure;
      
      const navigationState = { 
        selectedProcedure: procedureForState 
      };
      console.log('네비게이션 상태:', { state: navigationState });
      
      navigate('/hospitals', { state: navigationState });
      console.log('네비게이션 호출 완료');
    } catch (error) {
      console.error('=== 네비게이션 에러 ===');
      console.error('에러 객체:', error);
      console.error('에러 메시지:', error.message);
      console.error('에러 스택:', error.stack);
      alert('페이지 이동 중 오류가 발생했습니다: ' + error.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>시술 선택</h1>
          <p>원하시는 시술 분야를 클릭하여 병원을 선택하세요</p>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="시술명 또는 진료과를 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="procedures-grid">
          {filteredProcedures.map((procedure) => (
            <div
              key={procedure.id}
              className="procedure-card"
              onClick={() => handleProcedureSelect(procedure)}
              style={{ cursor: 'pointer' }}
            >
              <div className="procedure-icon">
                {procedure.icon}
              </div>
              <div className="procedure-info">
                <h3>{procedure.name}</h3>
                <p className="procedure-description">{procedure.description}</p>
                <div className="procedure-details">
                  <div className="detail-item">
                    <span className="detail-label">소요시간:</span>
                    <span className="detail-value">{procedure.estimatedTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">예상비용:</span>
                    <span className="detail-value">{procedure.price}</span>
                  </div>
                  <div className="popularity-bar">
                    <span className="popularity-label">인기도</span>
                    <div className="popularity-progress">
                      <div 
                        className="popularity-fill" 
                        style={{ width: `${procedure.popularity}%` }}
                      ></div>
                    </div>
                    <span className="popularity-score">{procedure.popularity}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;