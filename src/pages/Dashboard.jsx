import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { Calendar, MapPin, Star, Activity, Clock, User, Eye, Building2 } from 'lucide-react';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleWriteReview = () => {
    navigate('/write-review');
  };

  const handleViewDetails = () => {
    navigate('/detail-view');
  };

  const handleFindHospital = () => {
    navigate('/hospitals');
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>환자 대시보드</h1>
          <Button variant="primary" onClick={handleFindHospital}>
            <Building2 size={16} />
            병원 찾기
          </Button>
        </div>
        <div className="dashboard-grid">
          <div className="stats-card appointments-card">
            <div className="stats-header">
              <div className="stats-icon">
                <Calendar size={24} />
              </div>
              <div className="stats-trend positive">+3</div>
            </div>
            <div className="stats-content">
              <div className="stat-value" style={{color: '#1a202c', fontSize: '1.875rem', fontWeight: '800'}}>
                7
              </div>
              <div className="stat-label" style={{color: '#1a202c', fontSize: '0.875rem', fontWeight: '700'}}>
                이번 달 예약 (건)
              </div>
            </div>
          </div>
          
          <div className="stats-card completion-card">
            <div className="stats-header">
              <div className="stats-icon">
                <MapPin size={24} />
              </div>
              <div className="stats-trend positive">+2</div>
            </div>
            <div className="stats-content">
              <div className="stat-value" style={{color: '#1a202c', fontSize: '1.875rem', fontWeight: '800'}}>
                12
              </div>
              <div className="stat-label" style={{color: '#1a202c', fontSize: '0.875rem', fontWeight: '700'}}>
                방문한 병원 (개)
              </div>
            </div>
          </div>
          
          <div className="stats-card satisfaction-card">
            <div className="stats-header">
              <div className="stats-icon">
                <Star size={24} />
              </div>
              <div className="stats-trend positive">+0.2</div>
            </div>
            <div className="stats-content">
              <div className="stat-value" style={{color: '#1a202c', fontSize: '1.875rem', fontWeight: '800'}}>
                4.6
              </div>
              <div className="stat-label" style={{color: '#1a202c', fontSize: '0.875rem', fontWeight: '700'}}>
                통역 만족도 (5.0 만점)
              </div>
            </div>
          </div>
          
          <div className="stats-card status-card">
            <div className="stats-header">
              <div className="stats-icon">
                <Activity size={24} />
              </div>
              <Badge type="warning">예약 대기</Badge>
            </div>
            <div className="stats-content">
              <div className="stat-value" style={{color: '#1a202c', fontSize: '1.875rem', fontWeight: '800'}}>
                1건
              </div>
              <div className="stat-label" style={{color: '#1a202c', fontSize: '0.875rem', fontWeight: '700'}}>
                다가오는 예약
              </div>
            </div>
          </div>
        </div>
        
        <Card title="최근 활동" className="activity-card modern-card">
          <div className="activity-list">
            <div className="activity-item modern-activity">
              <div className="activity-icon completed">
                <MapPin size={20} />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-title">서울대학교병원 통역 서비스 이용 완료</span>
                  <span className="activity-time">
                    <Clock size={14} />
                    2시간 전
                  </span>
                </div>
                <div className="activity-meta">
                  <span className="activity-tag completed-tag">완료</span>
                  <span className="activity-fee">통역사: 김영수님</span>
                </div>
              </div>
              <div className="activity-actions">
                <Button variant="outline" size="small" onClick={handleWriteReview}>
                  리뷰 작성
                </Button>
                <Button variant="secondary" size="small" onClick={handleViewDetails}>
                  <Eye size={16} />
                </Button>
              </div>
            </div>
            
            <div className="activity-item modern-activity">
              <div className="activity-icon pending">
                <Calendar size={20} />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-title">삼성서울병원 내일 오후 2시 진료 예약</span>
                  <span className="activity-time">
                    <Clock size={14} />
                    5시간 전
                  </span>
                </div>
                <div className="activity-meta">
                  <span className="activity-tag pending-tag">예정</span>
                  <span className="activity-location">📍 강남구 일원로 81</span>
                </div>
              </div>
              <div className="activity-actions">
                <Button variant="primary" size="small" onClick={handleViewDetails}>
                  확인하기
                </Button>
                <Button variant="secondary" size="small" onClick={handleViewDetails}>
                  <Eye size={16} />
                </Button>
              </div>
            </div>
            
            <div className="activity-item modern-activity">
              <div className="activity-icon review">
                <Star size={20} />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-title">아산병원 통역 서비스 리뷰 작성</span>
                  <span className="activity-time">
                    <Clock size={14} />
                    1일 전
                  </span>
                </div>
                <div className="activity-quote">"통역사님이 매우 친절하고 정확했어요!"</div>
                <div className="activity-meta">
                  <span className="activity-rating">⭐⭐⭐⭐⭐ 5.0</span>
                </div>
              </div>
              <div className="activity-actions">
                <Button variant="outline" size="small" onClick={handleViewDetails}>
                  수정하기
                </Button>
                <Button variant="secondary" size="small" onClick={handleViewDetails}>
                  <Eye size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;