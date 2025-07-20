import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import '../styles/pages/WriteReview.css';

const WriteReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('평점을 선택해주세요.');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      alert('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 여기에 API 호출 로직 추가
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 딜레이
      alert('리뷰가 성공적으로 작성되었습니다!');
      navigate('/dashboard');
    } catch (error) {
      alert('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 리뷰가 저장되지 않습니다. 정말 취소하시겠습니까?')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="write-review">
      <div className="container">
        <div className="page-header">
          <h1>리뷰 작성</h1>
          <p>통역 서비스에 대한 소중한 의견을 남겨주세요</p>
        </div>

        <div className="review-content">
          <Card className="service-info-card">
            <h3>서비스 정보</h3>
            <div className="service-details">
              <div className="detail-item">
                <span className="label">고객명:</span>
                <span className="value">김민수님</span>
              </div>
              <div className="detail-item">
                <span className="label">서비스 유형:</span>
                <span className="value">비즈니스 통역</span>
              </div>
              <div className="detail-item">
                <span className="label">일시:</span>
                <span className="value">2024년 7월 19일 14:00 - 16:00</span>
              </div>
              <div className="detail-item">
                <span className="label">장소:</span>
                <span className="value">강남구 삼성동 코엑스</span>
              </div>
            </div>
          </Card>

          <Card className="review-form-card">
            <form onSubmit={handleSubmit}>
              <div className="rating-section">
                <h3>서비스 평점</h3>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star ${star <= rating ? 'active' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="rating-text">
                  {rating > 0 && (
                    <span className="rating-value">
                      {rating}점 / 5점
                      {rating === 5 && ' - 매우 만족'}
                      {rating === 4 && ' - 만족'}
                      {rating === 3 && ' - 보통'}
                      {rating === 2 && ' - 불만족'}
                      {rating === 1 && ' - 매우 불만족'}
                    </span>
                  )}
                </div>
              </div>

              <div className="review-text-section">
                <FormField
                  label="리뷰 내용"
                  type="textarea"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="서비스에 대한 솔직한 후기를 남겨주세요. (최소 10자 이상)"
                  rows={6}
                  required
                />
                <div className="char-count">
                  {reviewText.length} / 500자
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || rating === 0}
                >
                  {isSubmitting ? '작성 중...' : '리뷰 작성 완료'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;