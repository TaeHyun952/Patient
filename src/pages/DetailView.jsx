import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import '../styles/pages/DetailView.css';

const DetailView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleWriteReview = () => {
    navigate('/write-review');
  };

  const serviceData = {
    id: 'INT-2024-001',
    status: 'completed',
    client: {
      name: '김민수',
      company: '(주)글로벌테크',
      phone: '010-1234-5678',
      email: 'minsu.kim@globaltech.co.kr'
    },
    service: {
      type: '비즈니스 통역',
      language: '한국어 ↔ 영어',
      date: '2024년 7월 19일',
      time: '14:00 - 16:00',
      duration: '2시간',
      location: '강남구 삼성동 코엑스 컨벤션센터',
      participants: 8
    },
    payment: {
      totalAmount: 200000,
      hourlyRate: 100000,
      status: 'completed',
      method: '계좌이체'
    },
    notes: '국제 비즈니스 컨퍼런스에서의 동시통역 업무. 기술 분야 전문 용어가 많이 사용되어 사전 준비가 필요했음. 클라이언트 측에서 매우 만족스러워 했음.',
    reviews: {
      rating: 5,
      comment: '정말 훌륭한 통역 서비스였습니다. 전문적이고 정확한 통역으로 회의가 원활하게 진행될 수 있었습니다. 다음에도 꼭 요청드리고 싶습니다.',
      reviewDate: '2024년 7월 19일'
    }
  };

  return (
    <div className="detail-view">
      <div className="container">
        <div className="page-header">
          <div className="header-top">
            <Button variant="outline" onClick={handleGoBack}>
              ← 대시보드로 돌아가기
            </Button>
            <div className="header-actions">
              <Button variant="outline" onClick={handleWriteReview}>
                리뷰 작성
              </Button>
              <Button variant="primary">
                PDF 다운로드
              </Button>
            </div>
          </div>
          <div className="header-content">
            <h1>서비스 상세 정보</h1>
            <div className="service-summary">
              <div className="summary-item">
                <span className="label">서비스 ID:</span>
                <span className="value">{serviceData.id}</span>
              </div>
              <div className="summary-item">
                <span className="label">상태:</span>
                <Badge type="success">완료</Badge>
              </div>
              <div className="summary-item">
                <span className="label">일시:</span>
                <span className="value">{serviceData.service.date} {serviceData.service.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            개요
          </button>
          <button
            className={`tab ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            고객 정보
          </button>
          <button
            className={`tab ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            결제 정보
          </button>
          <button
            className={`tab ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            리뷰
          </button>
        </div>

        <div className="detail-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <Card className="service-details-card">
                <h3>서비스 정보</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="label">서비스 유형:</span>
                    <span className="value">{serviceData.service.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">언어:</span>
                    <span className="value">{serviceData.service.language}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">날짜:</span>
                    <span className="value">{serviceData.service.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">시간:</span>
                    <span className="value">{serviceData.service.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">소요 시간:</span>
                    <span className="value">{serviceData.service.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">장소:</span>
                    <span className="value">{serviceData.service.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">참석자 수:</span>
                    <span className="value">{serviceData.service.participants}명</span>
                  </div>
                </div>
              </Card>

              <Card className="notes-card">
                <h3>업무 메모</h3>
                <div className="notes-content">
                  <p>{serviceData.notes}</p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'client' && (
            <div className="tab-content">
              <Card className="client-info-card">
                <h3>고객 정보</h3>
                <div className="client-details">
                  <div className="client-avatar">
                    <div className="avatar-circle">
                      {serviceData.client.name.charAt(0)}
                    </div>
                  </div>
                  <div className="client-info">
                    <div className="detail-item">
                      <span className="label">이름:</span>
                      <span className="value">{serviceData.client.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">회사:</span>
                      <span className="value">{serviceData.client.company}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">전화번호:</span>
                      <span className="value">{serviceData.client.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">이메일:</span>
                      <span className="value">{serviceData.client.email}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="tab-content">
              <Card className="payment-info-card">
                <h3>결제 정보</h3>
                <div className="payment-summary">
                  <div className="payment-item large">
                    <span className="label">총 결제 금액:</span>
                    <span className="value amount">{serviceData.payment.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="payment-item">
                    <span className="label">시간당 요금:</span>
                    <span className="value">{serviceData.payment.hourlyRate.toLocaleString()}원/시간</span>
                  </div>
                  <div className="payment-item">
                    <span className="label">결제 방법:</span>
                    <span className="value">{serviceData.payment.method}</span>
                  </div>
                  <div className="payment-item">
                    <span className="label">결제 상태:</span>
                    <Badge type="success">완료</Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="tab-content">
              <Card className="review-info-card">
                <h3>고객 리뷰</h3>
                <div className="review-content">
                  <div className="review-rating">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${star <= serviceData.reviews.rating ? 'active' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating-text">{serviceData.reviews.rating}/5점</span>
                  </div>
                  <div className="review-comment">
                    <p>"{serviceData.reviews.comment}"</p>
                  </div>
                  <div className="review-date">
                    작성일: {serviceData.reviews.reviewDate}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;