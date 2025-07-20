import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, FileText, DollarSign } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import FormField from '../components/FormField';
import '../styles/pages/EditBooking.css';

const EditBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  const [bookingData, setBookingData] = useState({
    id: '',
    date: '',
    startTime: '',
    endTime: '',
    patient: '',
    nationality: '',
    procedure: '',
    notes: '',
    rate: '',
    hospital: '강남 그랜드 안과'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 예약 데이터 불러오기
  useEffect(() => {
    if (bookingId) {
      // 실제 환경에서는 API에서 데이터를 가져옴
      const sampleBooking = {
        id: bookingId,
        date: '2024-01-22',
        startTime: '09:00',
        endTime: '12:00',
        patient: '김환자',
        nationality: '미국',
        procedure: '백내장 수술 상담',
        notes: '수술 전 상담 및 검사 결과 설명',
        rate: '30000',
        hospital: '강남 그랜드 안과'
      };
      setBookingData(sampleBooking);
    }
  }, [bookingId]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      alert('날짜와 시간을 모두 입력해주세요.');
      return;
    }

    if (!bookingData.patient || !bookingData.procedure) {
      alert('환자명과 시술명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 여기에 API 호출 로직 추가
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 딜레이
      alert('예약이 성공적으로 수정되었습니다!');
      navigate('/schedule');
    } catch (error) {
      alert('예약 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('수정 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
      navigate('/schedule');
    }
  };

  const formatDateForInput = (dateStr) => {
    return dateStr; // YYYY-MM-DD 형식 유지
  };

  return (
    <div className="edit-booking">
      <div className="container">
        <div className="page-header">
          <h1>예약 수정</h1>
          <p>예약 정보를 수정하고 저장하세요</p>
        </div>

        <div className="edit-content">
          <Card className="hospital-info-card">
            <h3>병원 정보</h3>
            <div className="hospital-details">
              <div className="detail-item">
                <MapPin size={20} />
                <div className="detail-text">
                  <span className="label">병원명:</span>
                  <span className="value">{bookingData.hospital}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={20} />
                <div className="detail-text">
                  <span className="label">주소:</span>
                  <span className="value">서울시 강남구 테헤란로 123길 45</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="edit-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>예약 일시</h3>
                <div className="datetime-grid">
                  <FormField
                    label="예약 날짜"
                    type="date"
                    value={formatDateForInput(bookingData.date)}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                  <FormField
                    label="시작 시간"
                    type="time"
                    value={bookingData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    required
                  />
                  <FormField
                    label="종료 시간"
                    type="time"
                    value={bookingData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>환자 정보</h3>
                <div className="patient-grid">
                  <FormField
                    label="환자명"
                    type="text"
                    value={bookingData.patient}
                    onChange={(e) => handleInputChange('patient', e.target.value)}
                    placeholder="환자 이름을 입력하세요"
                    required
                  />
                  <FormField
                    label="국적"
                    type="select"
                    value={bookingData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    options={[
                      { value: '', label: '국적을 선택하세요' },
                      { value: '미국', label: '미국' },
                      { value: '중국', label: '중국' },
                      { value: '일본', label: '일본' },
                      { value: '독일', label: '독일' },
                      { value: '프랑스', label: '프랑스' },
                      { value: '기타', label: '기타' }
                    ]}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>시술 정보</h3>
                <div className="procedure-grid">
                  <FormField
                    label="시술/검사명"
                    type="text"
                    value={bookingData.procedure}
                    onChange={(e) => handleInputChange('procedure', e.target.value)}
                    placeholder="시술 또는 검사명을 입력하세요"
                    required
                  />
                  <FormField
                    label="시간당 요금 (원)"
                    type="number"
                    value={bookingData.rate}
                    onChange={(e) => handleInputChange('rate', e.target.value)}
                    placeholder="30000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <FormField
                  label="특이사항 및 메모"
                  type="textarea"
                  value={bookingData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="특별히 주의할 사항이나 메모를 입력하세요"
                  rows={4}
                />
              </div>

              <div className="summary-section">
                <h3>예약 요약</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <Calendar size={20} />
                    <div>
                      <span className="label">예약 일시:</span>
                      <span className="value">
                        {bookingData.date && bookingData.startTime && bookingData.endTime
                          ? `${bookingData.date} ${bookingData.startTime} - ${bookingData.endTime}`
                          : '미입력'
                        }
                      </span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <User size={20} />
                    <div>
                      <span className="label">환자:</span>
                      <span className="value">
                        {bookingData.patient && bookingData.nationality
                          ? `${bookingData.patient} (${bookingData.nationality})`
                          : '미입력'
                        }
                      </span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <FileText size={20} />
                    <div>
                      <span className="label">시술:</span>
                      <span className="value">{bookingData.procedure || '미입력'}</span>
                    </div>
                  </div>
                  <div className="summary-item">
                    <DollarSign size={20} />
                    <div>
                      <span className="label">시간당 요금:</span>
                      <span className="value">
                        {bookingData.rate ? `₩${parseInt(bookingData.rate).toLocaleString()}` : '미입력'}
                      </span>
                    </div>
                  </div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '수정 중...' : '수정 완료'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;