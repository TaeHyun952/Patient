import React, { useState } from "react";
import { Camera, Edit, Plus, Heart, Calendar, Upload, User, Shield, Activity, FileText } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import "../styles/pages/Profile.css";

const Profile = ({ currentUser, setCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    ...currentUser,
    introduction: `안녕하세요! 김환자입니다.

주요 진료 내역:
- 정기 건강검진
- 안과 진료 (백내장)
- 내과 진료

특이사항:
- 언어 지원 필요 (영어, 중국어)
- 당뇨병 환자
- 알레르기: 페니실린

의료진과 소통할 때 언어 지원이 필요합니다.`,
    satisfaction: 4.6,
    visitCount: 12,
    membershipYears: 3,
    languages: ["영어", "중국어"],
    allergies: ["페니실린", "아스피린"],
    conditions: ["당뇨병", "고혈압"],
  });

  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: 1,
      hospital: "서울대학교병원",
      date: "2024.01.15",
      diagnosis: "백내장 수술",
      doctor: "김안과 교수",
    },
  ]);

  const [insuranceList, setInsuranceList] = useState([
    {
      id: 1,
      name: "국민건강보험",
      number: "1234-5678-9012",
      expireDate: "2025.12",
    },
  ]);

  const [preferences, setPreferences] = useState({
    monday: { available: true, times: [{ start: "09:00", end: "18:00" }] },
    tuesday: { available: true, times: [{ start: "09:00", end: "18:00" }] },
    wednesday: { available: true, times: [{ start: "09:00", end: "18:00" }] },
    thursday: { available: true, times: [{ start: "09:00", end: "18:00" }] },
    friday: { available: true, times: [{ start: "09:00", end: "18:00" }] },
    saturday: { available: false, times: [{ start: "10:00", end: "16:00" }] },
    sunday: { available: false, times: [{ start: "10:00", end: "16:00" }] },
  });

  const treatmentHistory = [
    {
      id: 1,
      hospital: "서울대학교병원",
      satisfaction: 5,
      date: "2024.01.15",
      comment: "백내장 수술이 성공적으로 완료되었습니다. 의료진과 언어 지원 서비스가 훌륙했습니다.",
    },
    {
      id: 2,
      hospital: "삼성서울병원",
      satisfaction: 4,
      date: "2024.01.10",
      comment: "정기 검진에서 비타민 D 부족이 발견되었습니다. 친절한 설명 감사합니다.",
    },
  ];

  const dayNames = {
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
    sunday: "일요일",
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setCurrentUser(profileData);
    setIsEditing(false);
    alert("프로필이 저장되었습니다.");
  };

  const addMedicalHistory = () => {
    const hospital = prompt("병원명을 입력하세요:");
    const date = prompt("진료일을 입력하세요: (예: 2024.01.15)");
    const diagnosis = prompt("진단명 또는 치료내용을 입력하세요:");
    const doctor = prompt("담당 의사를 입력하세요:");

    if (hospital && date && diagnosis && doctor) {
      const newHistory = {
        id: Date.now(),
        hospital,
        date,
        diagnosis,
        doctor,
      };
      setMedicalHistory((prev) => [...prev, newHistory]);
      alert("진료 내역이 추가되었습니다.");
    }
  };

  const addInsurance = () => {
    const name = prompt("보험명을 입력하세요:");
    const number = prompt("보험증 번호를 입력하세요:");
    const expireDate = prompt(
      "유효기간을 입력하세요: (예: 2025.12)"
    );

    if (name && number) {
      const newInsurance = {
        id: Date.now(),
        name,
        number,
        expireDate: expireDate || null,
      };
      setInsuranceList((prev) => [...prev, newInsurance]);
      alert("보험 정보가 추가되었습니다.");
    }
  };

  const handlePreferenceChange = (day, field, value) => {
    setPreferences((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handlePhotoUpload = () => {
    alert("프로필 사진 업로드 기능입니다.");
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "0시간";
    
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);
    const diffMs = endTime - startTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours === 0) return `${diffMinutes}분`;
    if (diffMinutes === 0) return `${diffHours}시간`;
    return `${diffHours}시간 ${diffMinutes}분`;
  };

  return (
    <div className="profile">
      <div className="container">
        <h1>프로필 관리</h1>

        <div className="profile-sections">
          {/* 프로필 헤더 */}
          <div className="profile-header modern-header">
            <div className="profile-photo-section-modern">
              <div className="profile-photo-wrapper">
                <div
                  className="profile-photo-container-modern"
                  onClick={handlePhotoUpload}
                >
                  <div className="profile-photo-inner">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='1.5'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E"
                      alt="프로필 사진"
                    />
                    <div className="photo-overlay-modern">
                      <div className="overlay-icon">
                        <Camera size={24} />
                      </div>
                      <span className="overlay-text">사진 변경</span>
                    </div>
                  </div>
                </div>
                <div className="photo-status-indicator online"></div>
              </div>
              <div className="photo-upload-section">
                <Button
                  variant="primary"
                  size="medium"
                  icon={<Upload size={18} />}
                  onClick={handlePhotoUpload}
                  className="upload-btn-modern"
                >
                  사진 업로드
                </Button>
                <p className="upload-hint">JPG, PNG 파일만 가능 (최대 5MB)</p>
              </div>
            </div>
            
            <div className="profile-summary-modern">
              <div className="profile-badge-wrapper">
                <Badge type="success" className="verified-badge">
                  <Shield size={14} />
                  인증된 환자
                </Badge>
              </div>
              <h2 className="profile-name">{profileData.name}</h2>
              <p className="profile-title">병원 통역 서비스 이용자</p>
              
              <div className="profile-stats-grid">
                <div className="stat-item">
                  <div className="stat-icon languages">
                    <span>🌍</span>
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">언어 지원 필요</span>
                    <span className="stat-value">{profileData.languages.join(", ")}</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon rating">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">서비스 만족도</span>
                    <span className="stat-value">{profileData.satisfaction}/5.0</span>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon experience">
                    <Activity size={18} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-label">방문 병원 수</span>
                    <span className="stat-value">{profileData.visitCount}개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 자기소개 */}
          <div className="profile-section modern-section">
            <h3>
              <FileText size={20} />
              의료 정보 및 특이사항
            </h3>
            <div className="introduction-section">
              <textarea
                className="introduction-textarea"
                value={profileData.introduction}
                onChange={(e) =>
                  handleProfileChange("introduction", e.target.value)
                }
                placeholder="의료 정보 및 특이사항을 작성해주세요. 알레르기, 만성질환, 언어 지원 필요 사항 등을 포함해주세요."
              />
              <div className="introduction-actions">
                <Button variant="primary" size="medium" onClick={handleSave}>
                  저장
                </Button>
              </div>
            </div>
          </div>

          {/* 가능 시간 설정 */}
          <div className="profile-section modern-section">
            <h3>
              <Calendar size={20} />
              선호 진료 시간
            </h3>
            <div className="availability-section">
              <div className="availability-header">
                <p>진료를 선호하는 요일과 시간대를 설정해주세요.</p>
              </div>
              <div className="weekly-schedule">
                {Object.entries(preferences).map(([day, schedule]) => (
                  <div key={day} className={`day-schedule ${schedule.available ? 'enabled' : ''}`}>
                    <div className="day-header">
                      <span className="day-name">{dayNames[day]}</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={schedule.available}
                          onChange={(e) =>
                            handlePreferenceChange(
                              day,
                              "available",
                              e.target.checked
                            )
                          }
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    {schedule.available && (
                      <div className="time-slots">
                        <div className="time-slots-header">
                          <span className="slots-title">선호 진료 시간</span>
                          <span className="slots-subtitle">선호하는 시간대를 설정해주세요</span>
                        </div>
                        {schedule.times.map((time, index) => (
                          <div key={index} className="time-range">
                            <div className="time-input-group">
                              <label className="time-label">시작</label>
                              <input
                                type="time"
                                value={time.start}
                                onChange={(e) => {
                                  const newTimes = [...schedule.times];
                                  newTimes[index].start = e.target.value;
                                  handlePreferenceChange(
                                    day,
                                    "times",
                                    newTimes
                                  );
                                }}
                                className="time-input"
                              />
                            </div>
                            <div className="time-divider">
                              <span>→</span>
                            </div>
                            <div className="time-input-group">
                              <label className="time-label">끝</label>
                              <input
                                type="time"
                                value={time.end}
                                onChange={(e) => {
                                  const newTimes = [...schedule.times];
                                  newTimes[index].end = e.target.value;
                                  handlePreferenceChange(
                                    day,
                                    "times",
                                    newTimes
                                  );
                                }}
                                className="time-input"
                              />
                            </div>
                          </div>
                        ))}
                        <div className="time-duration">
                          {schedule.times.length > 0 && (
                            <span className="duration-text">
                              선호 시간: {calculateDuration(schedule.times[0].start, schedule.times[0].end)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="availability-actions">
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => alert("선호 시간이 저장되었습니다.")}
                >
                  선호 시간 저장
                </Button>
                <Button
                  variant="danger"
                  size="medium"
                  onClick={() => window.location.reload()}
                >
                  초기화
                </Button>
              </div>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="profile-section modern-section">
            <h3>
              <User size={20} />
              연락처 정보
            </h3>
            <div className="profile-info">
              <div className="info-item">
                <label>이름:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                  />
                ) : (
                  <span>{profileData.name}</span>
                )}
                <Button
                  variant="ghost"
                  size="small"
                  icon={<Edit size={14} />}
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
              <div className="info-item">
                <label>이메일:</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              <div className="info-item">
                <label>전화번호:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                  />
                ) : (
                  <span>{profileData.phone}</span>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="edit-actions">
                <Button variant="primary" size="medium" onClick={handleSave}>
                  저장
                </Button>
                <Button
                  variant="ghost"
                  size="medium"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </Button>
              </div>
            )}
          </div>

          {/* 경력 관리 */}
          <div className="profile-section modern-section">
            <h3>
              <Activity size={20} />
              진료 내역
            </h3>
            <div className="career-list">
              {medicalHistory.map((history) => (
                <div key={history.id} className="career-item">
                  <div className="career-info">
                    <h4>{history.hospital}</h4>
                    <p>진료일: {history.date}</p>
                    <p>진단: {history.diagnosis}</p>
                    <p>담당 의사: {history.doctor}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<Edit size={14} />}
                  />
                </div>
              ))}
            </div>
            <Button 
              variant="primary" 
              size="medium"
              icon={<Plus size={16} />} 
              onClick={addMedicalHistory}
            >
              진료 내역 추가
            </Button>
          </div>

          {/* 자격증 관리 */}
          <div className="profile-section modern-section">
            <h3>
              <Shield size={20} />
              보험 정보
            </h3>
            <div className="license-list">
              {insuranceList.map((insurance) => (
                <div key={insurance.id} className="license-item">
                  <div className="license-info">
                    <h4>{insurance.name}</h4>
                    <p>보험증 번호: {insurance.number}</p>
                    {insurance.expireDate && (
                      <p>유효기간: {insurance.expireDate}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="small"
                    icon={<Edit size={14} />}
                  />
                </div>
              ))}
            </div>
            <Button 
              variant="primary" 
              size="medium"
              icon={<Plus size={16} />} 
              onClick={addInsurance}
            >
              보험 정보 추가
            </Button>
          </div>

          {/* 리뷰 관리 */}
          <div className="profile-section modern-section">
            <h3>
              <Heart size={20} />
              진료 후기 (만족도: {profileData.satisfaction}/5.0)
            </h3>
            <div className="review-list">
              {treatmentHistory.map((treatment) => (
                <div key={treatment.id} className="review-item">
                  <div className="review-header">
                    <span className="hospital-name">{treatment.hospital}</span>
                    <span className="rating">{"★".repeat(treatment.satisfaction)}</span>
                    <span className="date">{treatment.date}</span>
                  </div>
                  <p className="review-text">{treatment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
