// 전역 변수
let currentWeek = new Date();
let selectedDate = null;

// 데이터 저장소 키
const STORAGE_KEYS = {
    USER_PROFILE: 'interpreterProfile',
    CAREER_LIST: 'interpreterCareer',
    LICENSE_LIST: 'interpreterLicenses',
    APPOINTMENTS: 'interpreterAppointments',
    INTRODUCTION: 'interpreterIntroduction',
    PORTFOLIO: 'interpreterPortfolio',
    AVAILABILITY: 'interpreterAvailability',
    PROFILE_PHOTO: 'interpreterProfilePhoto'
};

// 강남 그랜드 안과 예약 데이터
const gangnamGrandEyeBookings = [
    {
        id: 1,
        date: '2024-01-22',
        time: '09:00-12:00',
        status: 'upcoming',
        patient: '김환자',
        nationality: '미국',
        department: '안과',
        procedure: '백내장 수술 상담',
        rate: '30,000원',
        total: '90,000원',
        notes: '수술 전 상담 및 검사 결과 설명'
    },
    {
        id: 2,
        date: '2024-01-25',
        time: '14:00-16:00',
        status: 'upcoming',
        patient: '이환자',
        nationality: '중국',
        department: '안과',
        procedure: '라식 수술 상담',
        rate: '25,000원',
        total: '50,000원',
        notes: '라식 수술 적합성 검사 및 상담'
    },
    {
        id: 3,
        date: '2024-01-28',
        time: '10:00-13:00',
        status: 'upcoming',
        patient: '박환자',
        nationality: '일본',
        department: '안과',
        procedure: '정기 검진',
        rate: '25,000원',
        total: '75,000원',
        notes: '백내장 수술 후 정기 검진'
    },
    {
        id: 4,
        date: '2024-01-15',
        time: '09:00-12:00',
        status: 'completed',
        patient: '최환자',
        nationality: '미국',
        department: '안과',
        procedure: '백내장 수술',
        rate: '35,000원',
        total: '105,000원',
        notes: '백내장 수술 진행 완료'
    },
    {
        id: 5,
        date: '2024-01-18',
        time: '14:00-17:00',
        status: 'completed',
        patient: '정환자',
        nationality: '중국',
        department: '안과',
        procedure: '녹내장 검사',
        rate: '28,000원',
        total: '84,000원',
        notes: '녹내장 정밀 검사 및 상담'
    },
    {
        id: 6,
        date: '2024-01-20',
        time: '11:00-14:00',
        status: 'completed',
        patient: '강환자',
        nationality: '일본',
        department: '안과',
        procedure: '라식 수술',
        rate: '32,000원',
        total: '96,000원',
        notes: '라식 수술 진행 완료'
    },
    {
        id: 7,
        date: '2024-01-12',
        time: '16:00-18:00',
        status: 'cancelled',
        patient: '윤환자',
        nationality: '미국',
        department: '안과',
        procedure: '정기 검진',
        rate: '25,000원',
        total: '50,000원',
        notes: '환자 개인사정으로 취소'
    }
];

// 샘플 예약 데이터 (캘린더용)
const appointments = {
    '2024-01-22': [
        { hospital: '강남 그랜드 안과', time: '09:00-12:00', rate: '30,000원', total: '90,000원' }
    ],
    '2024-01-25': [
        { hospital: '강남 그랜드 안과', time: '14:00-16:00', rate: '25,000원', total: '50,000원' }
    ],
    '2024-01-28': [
        { hospital: '강남 그랜드 안과', time: '10:00-13:00', rate: '25,000원', total: '75,000원' }
    ]
};

// 페이지 전환 함수
function showPage(pageId) {
    // 모든 페이지 숨기기
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 선택된 페이지 보이기
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 스케줄 페이지가 활성화되면 캘린더 초기화 및 강남 그랜드 안과 예약 내역 로드
        if (pageId === 'schedule') {
            initializeCalendar();
            loadGangnamBookings();
        }
        
        // 프로필 페이지가 활성화되면 저장된 데이터 로드
        if (pageId === 'profile') {
            loadAndDisplayAllData();
        }
        
        // 마이페이지 페이지가 활성화되면 대시보드 데이터 로드
        if (pageId === 'mypage') {
            loadDashboardData();
        }

        // 로그인 페이지가 활성화되면 로그인 폼 이벤트 리스너 설정
        if (pageId === 'login') {
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLogin);
            }
        }
    }
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 회원가입 폼 이벤트
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // 캘린더 네비게이션 이벤트
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() - 7);
            generateCalendar();
        });
    }
    
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() + 7);
            generateCalendar();
        });
    }
    
    // 초기 캘린더 생성
    initializeCalendar();
    
    // 저장된 사용자 정보 로드
    loadUserProfile();
    
    // 프로필 사진 업로드 이벤트
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handleProfilePhotoUpload);
    }
    
    // 음성/영상 업로드 이벤트
    const audioUpload = document.getElementById('audio-upload');
    const videoUpload = document.getElementById('video-upload');
    
    if (audioUpload) {
        audioUpload.addEventListener('change', handleAudioUpload);
    }
    
    if (videoUpload) {
        videoUpload.addEventListener('change', handleVideoUpload);
    }
    
    // 검색 페이지 이벤트 리스너들
    setupSearchPageListeners();
    
    // 대시보드 페이지 이벤트 리스너들
    setupDashboardListeners();
    
    // 예약 요청 폼 이벤트 리스너들
    setupBookingFormListeners();
    
    // 초기 검색 실행 (검색 페이지가 활성화된 경우)
    if (document.getElementById('search-page').classList.contains('active')) {
        searchInterpreters();
    }
    
    // 대시보드 초기 로드
    loadDashboardData();
});

// 검색 페이지 이벤트 리스너 설정
function setupSearchPageListeners() {
    // 전문 분야 태그 클릭 이벤트
    document.querySelectorAll('.specialty-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            toggleSpecialtyTag(this);
        });
    });
    
    // 평점 선택 이벤트
    document.querySelectorAll('.star').forEach((star, index) => {
        star.addEventListener('click', function() {
            selectRating(index + 1);
        });
    });
    
    // 거리 슬라이더 이벤트
    const distanceRange = document.getElementById('distance-range');
    if (distanceRange) {
        distanceRange.addEventListener('input', updateDistanceValue);
        updateDistanceValue(); // 초기값 설정
    }
    
    // 필터 변경 시 자동 검색
    const filterInputs = document.querySelectorAll('#source-language, #target-language, #min-rate, #max-rate, #required-date, #start-time, #end-time, #instant-booking, #request-booking');
    filterInputs.forEach(input => {
        input.addEventListener('change', searchInterpreters);
    });
    
    // 모달 외부 클릭 시 닫기
    const mapModal = document.getElementById('map-modal');
    if (mapModal) {
        mapModal.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                closeMapModal();
            }
        });
    }
}

// 대시보드 이벤트 리스너 설정
function setupDashboardListeners() {
    // 사용자 타입 전환 버튼
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchUserType(this.dataset.type);
        });
    });
    
    // 빠른 설정 토글
    document.querySelectorAll('.setting-toggle input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`설정 변경: ${this.id} = ${this.checked}`);
            // 실제 구현에서는 서버에 설정 저장
        });
    });
}

// 예약 요청 폼 이벤트 리스너 설정
function setupBookingFormListeners() {
    // 반복 예약 체크박스
    const recurringCheckbox = document.getElementById('is-recurring');
    if (recurringCheckbox) {
        recurringCheckbox.addEventListener('change', toggleRecurringOptions);
    }
    
    // 예약 요청 폼 제출
    const bookingForm = document.getElementById('booking-request-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingRequest(e);
        });
    }
}

// 예약 요청 처리
function handleBookingRequest(e) {
    const formData = new FormData(e.target);
    const bookingData = {
        bookingType: formData.get('booking-type'),
        hospitalName: formData.get('hospital-name'),
        contactName: formData.get('contact-name'),
        contactPhone: formData.get('contact-phone'),
        contactEmail: formData.get('contact-email'),
        bookingDate: formData.get('booking-date'),
        startTime: formData.get('start-time'),
        endTime: formData.get('end-time'),
        isRecurring: formData.get('is-recurring'),
        patientNationality: formData.get('patient-nationality'),
        patientAgeGroup: formData.get('patient-age-group'),
        patientNotes: formData.get('patient-notes'),
        medicalDepartment: formData.get('medical-department'),
        treatmentType: formData.get('treatment-type'),
        medicalTerms: formData.get('medical-terms'),
        additionalRequirements: formData.get('additional-requirements'),
        budgetMin: formData.get('budget-min'),
        budgetMax: formData.get('budget-max'),
        urgentRequest: formData.get('urgent-request')
    };
    
    console.log('예약 요청 데이터:', bookingData);
    
    // 실제 구현에서는 서버로 데이터 전송
    alert(`${bookingData.bookingType === 'instant' ? '즉시 예약' : '요청 예약'}이 성공적으로 접수되었습니다!`);
    
    // 완료 페이지로 이동
    showPage('completion');
}

// 로그인 처리
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // 기본 유효성 검사
    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }
    
    // 로그인 시뮬레이션
    alert(`로그인 성공!\n이메일: ${email}`);
    
    // 마이페이지로 이동
    showPage('mypage');
}

// 회원가입 처리

function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const language = document.getElementById('language').value;
    const license = document.getElementById('license').files[0];
    
    // 기본 유효성 검사
    if (!name || !email || !phone || !language || !license) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    // 사용자 정보 저장
    const userProfile = {
        name: name,
        email: email,
        phone: phone,
        language: language,
        registrationDate: new Date().toISOString(),
        licenseFileName: license.name,
        licenseFileSize: license.size,
        verificationStatus: 'pending'
    };
    
    // localStorage에 저장
    saveUserProfile(userProfile);
    
    // 파일 업로드 시뮬레이션
    const uploadedLicense = document.getElementById('uploaded-license');
    if (uploadedLicense) {
        uploadedLicense.innerHTML = `
            <div class="file-info">
                <h4>업로드된 파일: ${license.name}</h4>
                <p>파일 크기: ${(license.size / 1024).toFixed(2)} KB</p>
                <p>업로드 시간: ${new Date().toLocaleString()}</p>
            </div>
        `;
    }
    
    // 검증 페이지로 이동
    showPage('verification');
    
    // 성공 메시지
    alert('회원가입 정보가 저장되었습니다!');
    
    // 3초 후 자동으로 승인 상태로 변경 (데모용)
    setTimeout(() => {
        const statusValue = document.querySelector('.status-value');
        if (statusValue) {
            statusValue.textContent = '승인 완료';
            statusValue.className = 'status-value approved';
        }
    }, 3000);
}

// 캘린더 초기화
function initializeCalendar() {
    // 현재 주로 설정
    currentWeek = new Date();
    // 주의 첫날(월요일)로 설정
    const day = currentWeek.getDay();
    const diff = currentWeek.getDate() - day + (day === 0 ? -6 : 1);
    currentWeek.setDate(diff);
    
    generateCalendar();
}

// 캘린더 생성
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentWeekElement = document.getElementById('current-week');
    
    if (!calendarGrid || !currentWeekElement) return;
    
    // 주간 제목 업데이트
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    currentWeekElement.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
    
    // 캘린더 그리드 초기화
    calendarGrid.innerHTML = '';
    
    // 요일 헤더
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = dayName;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '10px';
        dayHeader.style.backgroundColor = '#667eea';
        dayHeader.style.color = 'white';
        dayHeader.style.borderRadius = '10px';
        calendarGrid.appendChild(dayHeader);
    });
    
    // 주간 날짜들 생성
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeek);
        date.setDate(date.getDate() + i);
        
        const dayElement = createDayElement(date);
        calendarGrid.appendChild(dayElement);
    }
}

// 날짜 요소 생성
function createDayElement(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    const dateString = formatDateForKey(date);
    const hasAppointments = appointments[dateString];
    
    if (hasAppointments) {
        dayElement.classList.add('has-appointment');
    }
    
    dayElement.innerHTML = `
        <div class="day-number">${date.getDate()}</div>
        <div class="day-appointments">
            ${hasAppointments ? `${hasAppointments.length}건` : ''}
        </div>
    `;
    
    dayElement.addEventListener('click', () => selectDate(date));
    
    return dayElement;
}

// 날짜 선택
function selectDate(date) {
    // 이전 선택 제거
    const prevSelected = document.querySelector('.calendar-day.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }
    
    // 새로운 선택 적용
    event.currentTarget.classList.add('selected');
    selectedDate = date;
    
    // 날짜 상세 정보 업데이트
    updateDateDetails(date);
}

// 날짜 상세 정보 업데이트
function updateDateDetails(date) {
    const selectedDateElement = document.getElementById('selected-date');
    const appointmentsList = document.getElementById('appointments-list');
    
    if (!selectedDateElement || !appointmentsList) return;
    
    const dateString = formatDateForKey(date);
    const dayAppointments = appointments[dateString] || [];
    
    selectedDateElement.textContent = `${formatDate(date)} (${getDayName(date)})`;
    
    if (dayAppointments.length === 0) {
        appointmentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">예약된 일정이 없습니다.</p>';
    } else {
        appointmentsList.innerHTML = dayAppointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <span class="hospital-name">${appointment.hospital}</span>
                    <span class="appointment-rate">시급: ${appointment.rate}</span>
                </div>
                <div class="appointment-time">⏰ ${appointment.time}</div>
                <div class="appointment-total">💰 예상 수입: ${appointment.total}</div>
            </div>
        `).join('');
    }
}

// 유틸리티 함수들
function formatDate(date) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatDateForKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDayName(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
}

// 프로필 편집 기능
function editProfile(field) {
    const element = document.getElementById(`profile-${field}`);
    if (!element) return;
    
    const currentValue = element.textContent;
    const newValue = prompt(`새로운 ${field}을(를) 입력하세요:`, currentValue);
    
    if (newValue && newValue !== currentValue) {
        element.textContent = newValue;
        alert('프로필이 업데이트되었습니다.');
    }
}

// 경력 추가 기능
function addCareer() {
    const hospital = prompt('병원명을 입력하세요:');
    const period = prompt('근무 기간을 입력하세요: (예: 2020.01 - 2023.12)');
    const department = prompt('담당 부서를 입력하세요:');
    
    if (hospital && period && department) {
        const career = {
            hospital: hospital,
            period: period,
            department: department,
            addedDate: new Date().toISOString()
        };
        
        // localStorage에 저장
        saveCareerItem(career);
        
        const careerList = document.getElementById('career-list');
        const newCareer = document.createElement('div');
        newCareer.className = 'career-item';
        newCareer.innerHTML = `
            <div class="career-info">
                <h4>${hospital}</h4>
                <p>기간: ${period}</p>
                <p>담당: ${department}</p>
            </div>
            <button class="btn-edit" onclick="editCareer(this)">수정</button>
        `;
        careerList.appendChild(newCareer);
        alert('경력이 추가되었습니다.');
    }
}

// 자격증 추가 기능
function addLicense() {
    const licenseName = prompt('자격증명을 입력하세요:');
    const issueDate = prompt('취득일을 입력하세요: (예: 2022.06)');
    const expireDate = prompt('유효기간을 입력하세요: (예: 2024.06)');
    
    if (licenseName && issueDate) {
        const license = {
            name: licenseName,
            issueDate: issueDate,
            expireDate: expireDate || null,
            addedDate: new Date().toISOString()
        };
        
        // localStorage에 저장
        saveLicenseItem(license);
        
        const licenseList = document.getElementById('license-list');
        const newLicense = document.createElement('div');
        newLicense.className = 'license-item';
        newLicense.innerHTML = `
            <div class="license-info">
                <h4>${licenseName}</h4>
                <p>취득일: ${issueDate}</p>
                ${expireDate ? `<p>유효기간: ${expireDate}</p>` : ''}
            </div>
            <button class="btn-edit" onclick="editLicense(this)">수정</button>
        `;
        licenseList.appendChild(newLicense);
        alert('자격증이 추가되었습니다.');
    }
}

// 신청 완료 시뮬레이션 (데모용)
function simulateApplication() {
    // 완료 페이지에 정보 업데이트
    const hospital = document.getElementById('completion-hospital');
    const date = document.getElementById('completion-date');
    const rate = document.getElementById('completion-rate');
    const total = document.getElementById('completion-total');
    
    if (hospital) hospital.textContent = '그랜드 안과';
    if (date) date.textContent = '2024년 1월 20일 (토) 14:00 - 16:00';
    if (rate) rate.textContent = '25,000원';
    if (total) total.textContent = '50,000원';
    
    showPage('completion');
}

// 편집 버튼 이벤트 핸들러들
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit')) {
        const parentItem = e.target.closest('.info-item, .career-item, .license-item');
        if (parentItem) {
            if (parentItem.classList.contains('info-item')) {
                const label = parentItem.querySelector('label').textContent.replace(':', '');
                editProfile(label);
            }
        }
    }
    
    if (e.target.classList.contains('btn-add')) {
        const section = e.target.closest('.profile-section');
        if (section) {
            const sectionTitle = section.querySelector('h3').textContent;
            if (sectionTitle.includes('경력')) {
                addCareer();
            } else if (sectionTitle.includes('자격증')) {
                addLicense();
            }
        }
    }
});

// 초기화 완료 후 첫 번째 날짜 자동 선택
setTimeout(() => {
    const firstDay = document.querySelector('.calendar-day');
    if (firstDay) {
        firstDay.click();
    }
}, 100);

// 데이터 저장/로드 유틸리티 함수들
function saveUserProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
        console.log('사용자 프로필이 저장되었습니다:', profile);
    } catch (error) {
        console.error('프로필 저장 중 오류:', error);
        alert('프로필 저장 중 오류가 발생했습니다.');
    }
}

function loadUserProfile() {
    try {
        const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            updateProfileDisplay(profile);
            return profile;
        }
        return null;
    } catch (error) {
        console.error('프로필 로드 중 오류:', error);
        return null;
    }
}

function updateProfileDisplay(profile) {
    // 프로필 페이지의 기본 정보 업데이트
    const nameElement = document.getElementById('profile-name');
    const emailElement = document.getElementById('profile-email');
    const phoneElement = document.getElementById('profile-phone');
    
    if (nameElement) nameElement.textContent = profile.name;
    if (emailElement) emailElement.textContent = profile.email;
    if (phoneElement) phoneElement.textContent = profile.phone;
    
    // 회원가입 폼에도 정보 미리 채우기 (수정 시)
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const languageSelect = document.getElementById('language');
    
    if (nameInput && !nameInput.value) nameInput.value = profile.name;
    if (emailInput && !emailInput.value) emailInput.value = profile.email;
    if (phoneInput && !phoneInput.value) phoneInput.value = profile.phone;
    if (languageSelect && !languageSelect.value) languageSelect.value = profile.language;
}

function saveCareerItem(career) {
    try {
        let careerList = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_LIST) || '[]');
        career.id = Date.now(); // 고유 ID 생성
        careerList.push(career);
        localStorage.setItem(STORAGE_KEYS.CAREER_LIST, JSON.stringify(careerList));
        console.log('경력이 저장되었습니다:', career);
    } catch (error) {
        console.error('경력 저장 중 오류:', error);
    }
}

function loadCareerList() {
    try {
        const careerList = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_LIST) || '[]');
        return careerList;
    } catch (error) {
        console.error('경력 로드 중 오류:', error);
        return [];
    }
}

function saveLicenseItem(license) {
    try {
        let licenseList = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSE_LIST) || '[]');
        license.id = Date.now(); // 고유 ID 생성
        licenseList.push(license);
        localStorage.setItem(STORAGE_KEYS.LICENSE_LIST, JSON.stringify(licenseList));
        console.log('자격증이 저장되었습니다:', license);
    } catch (error) {
        console.error('자격증 저장 중 오류:', error);
    }
}

function loadLicenseList() {
    try {
        const licenseList = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSE_LIST) || '[]');
        return licenseList;
    } catch (error) {
        console.error('자격증 로드 중 오류:', error);
        return [];
    }
}

function clearAllData() {
    if (confirm('모든 저장된 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        alert('모든 데이터가 삭제되었습니다.');
        location.reload(); // 페이지 새로고침
    }
}

function exportData() {
    try {
        const data = {};
        Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
            const item = localStorage.getItem(storageKey);
            if (item) {
                data[key] = JSON.parse(item);
            }
        });
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `interpreter-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        alert('데이터가 JSON 파일로 내보내졌습니다.');
    } catch (error) {
        console.error('데이터 내보내기 오류:', error);
        alert('데이터 내보내기 중 오류가 발생했습니다.');
    }
}

// 모든 저장된 데이터를 로드하고 화면에 표시
function loadAndDisplayAllData() {
    // 사용자 프로필 로드
    loadUserProfile();
    
    // 경력 목록 로드 및 표시
    const careerList = loadCareerList();
    const careerContainer = document.getElementById('career-list');
    if (careerContainer && careerList.length > 0) {
        // 기존 샘플 데이터 제거 (첫 번째 자식만 유지)
        const sampleCareer = careerContainer.querySelector('.career-item');
        if (sampleCareer) {
            sampleCareer.style.display = 'none';
        }
        
        careerList.forEach(career => {
            const careerElement = document.createElement('div');
            careerElement.className = 'career-item';
            careerElement.innerHTML = `
                <div class="career-info">
                    <h4>${career.hospital}</h4>
                    <p>기간: ${career.period}</p>
                    <p>담당: ${career.department}</p>
                </div>
                <button class="btn-edit" onclick="editCareer(this)">수정</button>
            `;
            careerContainer.appendChild(careerElement);
        });
    }
    
    // 자격증 목록 로드 및 표시
    const licenseList = loadLicenseList();
    const licenseContainer = document.getElementById('license-list');
    if (licenseContainer && licenseList.length > 0) {
        // 기존 샘플 데이터 제거 (첫 번째 자식만 유지)
        const sampleLicense = licenseContainer.querySelector('.license-item');
        if (sampleLicense) {
            sampleLicense.style.display = 'none';
        }
        
        licenseList.forEach(license => {
            const licenseElement = document.createElement('div');
            licenseElement.className = 'license-item';
            licenseElement.innerHTML = `
                <div class="license-info">
                    <h4>${license.name}</h4>
                    <p>취득일: ${license.issueDate}</p>
                    ${license.expireDate ? `<p>유효기간: ${license.expireDate}</p>` : ''}
                </div>
                <button class="btn-edit" onclick="editLicense(this)">수정</button>
            `;
            licenseContainer.appendChild(licenseElement);
        });
    }
}

// 샘플 통역사 데이터
const sampleInterpreters = [
    {
        id: 1,
        name: '김영희',
        languages: ['korean', 'english'],
        specialties: ['ophthalmology', 'cardiology'],
        location: '서울 강남구',
        distance: 2.5,
        hourlyRate: 30000,
        rating: 4.9,
        reviewCount: 47,
        experience: 8,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: true,
        availability: ['2024-01-20T09:00', '2024-01-20T14:00', '2024-01-21T10:00']
    },
    {
        id: 2,
        name: '이철수',
        languages: ['korean', 'chinese'],
        specialties: ['surgery', 'orthopedics'],
        location: '서울 서초구',
        distance: 3.2,
        hourlyRate: 35000,
        rating: 4.7,
        reviewCount: 32,
        experience: 12,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: false,
        availability: ['2024-01-19T13:00', '2024-01-22T09:00']
    },
    {
        id: 3,
        name: '박미나',
        languages: ['korean', 'japanese'],
        specialties: ['pediatrics', 'dermatology'],
        location: '서울 송파구',
        distance: 5.1,
        hourlyRate: 28000,
        rating: 4.8,
        reviewCount: 28,
        experience: 6,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: true,
        availability: ['2024-01-20T11:00', '2024-01-21T15:00']
    }
];

// 검색 및 필터링 관련 함수
let currentFilters = {};
let selectedRating = 0;

// 전문 분야 태그 클릭 처리
function toggleSpecialtyTag(tag) {
    tag.classList.toggle('active');
    searchInterpreters();
}

// 평점 선택 처리
function selectRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('selected-rating');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    ratingText.textContent = `${rating}점 이상`;
}

// 거리 슬라이더 업데이트
function updateDistanceValue() {
    const slider = document.getElementById('distance-range');
    const valueDisplay = document.getElementById('distance-value');
    if (slider && valueDisplay) {
        valueDisplay.textContent = slider.value;
    }
}

// 통역사 검색 함수
function searchInterpreters() {
    const filters = collectFilters();
    const filteredInterpreters = filterInterpreters(sampleInterpreters, filters);
    const sortedInterpreters = sortInterpreters(filteredInterpreters, document.getElementById('sort-by')?.value || 'rating');
    
    displaySearchResults(sortedInterpreters);
    updateResultsCount(sortedInterpreters.length);
}

// 필터 수집
function collectFilters() {
    return {
        sourceLanguage: document.getElementById('source-language')?.value,
        targetLanguage: document.getElementById('target-language')?.value,
        specialties: Array.from(document.querySelectorAll('.specialty-tag.active')).map(tag => tag.dataset.specialty),
        location: document.getElementById('hospital-location')?.value,
        distance: parseInt(document.getElementById('distance-range')?.value || 50),
        minRate: parseInt(document.getElementById('min-rate')?.value || 0),
        maxRate: parseInt(document.getElementById('max-rate')?.value || 999999),
        minRating: selectedRating,
        requiredDate: document.getElementById('required-date')?.value,
        startTime: document.getElementById('start-time')?.value,
        endTime: document.getElementById('end-time')?.value,
        instantBooking: document.getElementById('instant-booking')?.checked,
        requestBooking: document.getElementById('request-booking')?.checked
    };
}

// 통역사 필터링
function filterInterpreters(interpreters, filters) {
    return interpreters.filter(interpreter => {
        // 언어 조합 검사
        if (filters.sourceLanguage && filters.targetLanguage) {
            const hasLanguages = interpreter.languages.includes(filters.sourceLanguage) && 
                               interpreter.languages.includes(filters.targetLanguage);
            if (!hasLanguages) return false;
        }
        
        // 전문 분야 검사
        if (filters.specialties.length > 0) {
            const hasSpecialty = filters.specialties.some(specialty => 
                interpreter.specialties.includes(specialty));
            if (!hasSpecialty) return false;
        }
        
        // 거리 검사
        if (interpreter.distance > filters.distance) return false;
        
        // 시급 범위 검사
        if (interpreter.hourlyRate < filters.minRate || interpreter.hourlyRate > filters.maxRate) {
            return false;
        }
        
        // 평점 검사
        if (interpreter.rating < filters.minRating) return false;
        
        // 예약 방식 검사
        if (!filters.instantBooking && interpreter.instantBooking) return false;
        if (!filters.requestBooking && !interpreter.instantBooking) return false;
        
        return true;
    });
}

// 통역사 정렬
function sortInterpreters(interpreters, sortBy) {
    const sorted = [...interpreters];
    
    switch (sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'rate-low':
            return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
        case 'rate-high':
            return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
        case 'distance':
            return sorted.sort((a, b) => a.distance - b.distance);
        case 'availability':
            return sorted.sort((a, b) => b.availability.length - a.availability.length);
        default:
            return sorted;
    }
}

// 검색 결과 표시
function displaySearchResults(interpreters) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (interpreters.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>검색 결과가 없습니다</h3>
                <p>검색 조건을 조정해보세요.</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = interpreters.map(interpreter => `
        <div class="interpreter-card">
            <div class="interpreter-header">
                <div class="interpreter-photo">
                    <img src="${interpreter.profileImage}" alt="${interpreter.name}">
                </div>
                <div class="interpreter-info">
                    <h3>${interpreter.name}</h3>
                    <div class="interpreter-languages">
                        ${interpreter.languages.map(lang => `<span class="language-badge">${getLanguageName(lang)}</span>`).join('')}
                    </div>
                    <div class="interpreter-rating">
                        <span class="rating-stars">${'⭐'.repeat(Math.floor(interpreter.rating))}</span>
                        <span class="rating-number">${interpreter.rating}</span>
                        <span class="review-count">(${interpreter.reviewCount}개 리뷰)</span>
                    </div>
                </div>
                <div class="interpreter-status">
                    ${interpreter.instantBooking ? 
                        '<span class="status-badge instant">⚡ 즉시 예약</span>' : 
                        '<span class="status-badge request">📨 요청 예약</span>'
                    }
                </div>
            </div>
            
            <div class="interpreter-details">
                <div class="detail-item">
                    <span class="detail-label">전문 분야:</span>
                    <span class="detail-value">${interpreter.specialties.map(s => getSpecialtyName(s)).join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">위치:</span>
                    <span class="detail-value">${interpreter.location} (${interpreter.distance}km)</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">시급:</span>
                    <span class="detail-value hourly-rate">₩${interpreter.hourlyRate.toLocaleString()}/시간</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">경력:</span>
                    <span class="detail-value">${interpreter.experience}년</span>
                </div>
            </div>
            
            <div class="interpreter-actions">
                <button class="btn-secondary" onclick="viewInterpreterProfile(${interpreter.id})">
                    프로필 보기
                </button>
                ${interpreter.instantBooking ? 
                    `<button class="btn-primary" onclick="instantBooking(${interpreter.id})">
                        ⚡ 즉시 예약
                    </button>` :
                    `<button class="btn-primary" onclick="requestBooking(${interpreter.id})">
                        📨 예약 요청
                    </button>`
                }
            </div>
        </div>
    `).join('');
}

// 언어명 변환
function getLanguageName(lang) {
    const names = {
        korean: '한국어',
        english: '영어',
        chinese: '중국어',
        japanese: '일본어',
        spanish: '스페인어',
        french: '프랑스어'
    };
    return names[lang] || lang;
}

// 전문분야명 변환
function getSpecialtyName(specialty) {
    const names = {
        ophthalmology: '안과',
        cardiology: '심장내과',
        orthopedics: '정형외과',
        pediatrics: '소아과',
        dermatology: '피부과',
        neurology: '신경과',
        surgery: '외과',
        internal: '내과',
        emergency: '응급실'
    };
    return names[specialty] || specialty;
}

// 결과 개수 업데이트
function updateResultsCount(count) {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = `검색 결과: ${count}명`;
    }
}

// 필터 초기화
function resetFilters() {
    // 모든 폼 요소 초기화
    document.getElementById('source-language').value = '';
    document.getElementById('target-language').value = '';
    document.querySelectorAll('.specialty-tag.active').forEach(tag => tag.classList.remove('active'));
    document.getElementById('hospital-location').value = '';
    document.getElementById('distance-range').value = 5;
    document.getElementById('min-rate').value = '';
    document.getElementById('max-rate').value = '';
    document.getElementById('required-date').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = '';
    document.getElementById('instant-booking').checked = true;
    document.getElementById('request-booking').checked = true;
    
    // 평점 초기화
    selectedRating = 0;
    document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
    document.getElementById('selected-rating').textContent = '평점 선택 안함';
    
    // 거리 표시 업데이트
    updateDistanceValue();
    
    // 검색 재실행
    searchInterpreters();
}

// 정렬 변경
function sortResults() {
    searchInterpreters();
}

// 대시보드 관련 함수
function switchUserType(type) {
    // 사용자 타입 버튼 업데이트
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // 대시보드 콘텐츠 전환
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${type}-dashboard`).classList.add('active');
    
    // 해당 대시보드 데이터 로드
    if (type === 'hospital') {
        loadHospitalDashboard();
    } else {
        loadInterpreterDashboard();
    }
}

// 병원 대시보드 로드
function loadHospitalDashboard() {
    // 예약 현황 로드
    loadHospitalBookings('upcoming');
}

// 통역사 대시보드 로드
function loadInterpreterDashboard() {
    // 요청 현황 로드
    loadInterpreterRequests('new');
}

// 예약 필터링
function filterBookings(status) {
    // 탭 활성화 업데이트
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-status="${status}"]`).classList.add('active');
    
    loadHospitalBookings(status);
}

// 요청 필터링
function filterRequests(type) {
    // 탭 활성화 업데이트
    document.querySelectorAll('.request-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    loadInterpreterRequests(type);
}

// 병원 예약 목록 로드
function loadHospitalBookings(status) {
    const bookingList = document.getElementById('hospital-booking-list');
    if (!bookingList) return;
    
    // 샘플 데이터 (실제로는 서버에서 가져옴)
    const sampleBookings = {
        upcoming: [
            { id: 1, interpreter: '김영희', date: '2024-01-20', time: '09:00-12:00', department: '안과', status: 'confirmed' },
            { id: 2, interpreter: '이철수', date: '2024-01-21', time: '14:00-17:00', department: '외과', status: 'confirmed' }
        ],
        pending: [
            { id: 3, interpreter: '박미나', date: '2024-01-22', time: '10:00-13:00', department: '소아과', status: 'pending' }
        ],
        completed: [
            { id: 4, interpreter: '김영희', date: '2024-01-15', time: '09:00-12:00', department: '안과', status: 'completed' }
        ],
        cancelled: [
            { id: 5, interpreter: '이철수', date: '2024-01-18', time: '14:00-17:00', department: '외과', status: 'cancelled' }
        ]
    };
    
    const bookings = sampleBookings[status] || [];
    
    if (bookings.length === 0) {
        bookingList.innerHTML = '<p class="no-data">해당 상태의 예약이 없습니다.</p>';
        return;
    }
    
    bookingList.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.interpreter}</h4>
                <p>📅 ${booking.date} ${booking.time}</p>
                <p>🏥 ${booking.department}</p>
                <span class="booking-status ${booking.status}">${getStatusName(booking.status)}</span>
            </div>
            <div class="booking-actions">
                <button class="btn-secondary" onclick="viewBookingDetails(${booking.id})">상세보기</button>
                ${booking.status === 'upcoming' ? 
                    '<button class="btn-edit" onclick="editBooking(' + booking.id + ')">수정</button>' : ''
                }
            </div>
        </div>
    `).join('');
}

// 통역사 요청 목록 로드
function loadInterpreterRequests(type) {
    const requestList = document.getElementById('interpreter-request-list');
    if (!requestList) return;
    
    // 샘플 데이터
    const sampleRequests = {
        new: [
            { id: 1, hospital: '서울대병원', date: '2024-01-20', time: '09:00-12:00', department: '안과', rate: 30000 },
            { id: 2, hospital: '연세의료원', date: '2024-01-21', time: '14:00-17:00', department: '외과', rate: 35000 }
        ],
        accepted: [
            { id: 3, hospital: '서울아산병원', date: '2024-01-22', time: '10:00-13:00', department: '소아과', rate: 28000 }
        ],
        declined: [
            { id: 4, hospital: '삼성의료원', date: '2024-01-19', time: '15:00-18:00', department: '내과', rate: 25000 }
        ]
    };
    
    const requests = sampleRequests[type] || [];
    
    if (requests.length === 0) {
        requestList.innerHTML = '<p class="no-data">해당 상태의 요청이 없습니다.</p>';
        return;
    }
    
    requestList.innerHTML = requests.map(request => `
        <div class="request-item">
            <div class="request-info">
                <h4>${request.hospital}</h4>
                <p>📅 ${request.date} ${request.time}</p>
                <p>🏥 ${request.department}</p>
                <p>💰 ₩${request.rate.toLocaleString()}/시간</p>
            </div>
            <div class="request-actions">
                ${type === 'new' ? `
                    <button class="btn-primary" onclick="acceptRequest(${request.id})">승인</button>
                    <button class="btn-secondary" onclick="declineRequest(${request.id})">거절</button>
                ` : `
                    <button class="btn-secondary" onclick="viewRequestDetails(${request.id})">상세보기</button>
                `}
            </div>
        </div>
    `).join('');
}

// 상태명 변환
function getStatusName(status) {
    const names = {
        confirmed: '확정',
        pending: '승인 대기',
        completed: '완료',
        cancelled: '취소'
    };
    return names[status] || status;
}

// 예약 관련 함수들
function createInstantBooking() {
    showPage('booking-request');
    // 즉시 예약 모드로 설정
    document.querySelector('input[name="booking-type"][value="instant"]').checked = true;
}

function createRequestBooking() {
    showPage('booking-request');
    // 요청 예약 모드로 설정
    document.querySelector('input[name="booking-type"][value="request"]').checked = true;
}

function instantBooking(interpreterId) {
    showPage('booking-request');
    // 선택된 통역사 정보로 폼 미리 채우기
    const interpreter = sampleInterpreters.find(i => i.id === interpreterId);
    if (interpreter) {
        // 즉시 예약 모드로 설정
        document.querySelector('input[name="booking-type"][value="instant"]').checked = true;
        alert(`${interpreter.name} 통역사의 즉시 예약을 진행합니다.`);
    }
}

function requestBooking(interpreterId) {
    showPage('booking-request');
    // 선택된 통역사 정보로 폼 미리 채우기
    const interpreter = sampleInterpreters.find(i => i.id === interpreterId);
    if (interpreter) {
        // 요청 예약 모드로 설정
        document.querySelector('input[name="booking-type"][value="request"]').checked = true;
        alert(`${interpreter.name} 통역사에게 예약 요청을 보냅니다.`);
    }
}

// 지도 관련 함수들
function openMapSearch() {
    const modal = document.getElementById('map-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeMapModal() {
    const modal = document.getElementById('map-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function searchLocation() {
    const input = document.getElementById('map-search-input');
    const selectedLocationText = document.getElementById('selected-location-text');
    
    if (input && selectedLocationText) {
        selectedLocationText.textContent = input.value || '위치를 선택해주세요';
    }
}

function confirmLocation() {
    const selectedLocationText = document.getElementById('selected-location-text');
    const hospitalLocationInput = document.getElementById('hospital-location');
    
    if (selectedLocationText && hospitalLocationInput) {
        hospitalLocationInput.value = selectedLocationText.textContent;
    }
    
    closeMapModal();
}

// 반복 예약 관련
function toggleRecurringOptions() {
    const checkbox = document.getElementById('is-recurring');
    const options = document.getElementById('recurring-options');
    
    if (checkbox && options) {
        options.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// 기타 유틸리티 함수들
function viewInterpreterProfile(interpreterId) {
    alert(`통역사 프로필을 표시합니다. (ID: ${interpreterId})`);
}

function acceptRequest(requestId) {
    alert(`요청을 승인했습니다. (ID: ${requestId})`);
    loadInterpreterRequests('new');
}

function declineRequest(requestId) {
    alert(`요청을 거절했습니다. (ID: ${requestId})`);
    loadInterpreterRequests('new');
}

function viewBookingDetails(bookingId) {
    alert(`예약 상세 정보를 표시합니다. (ID: ${bookingId})`);
}

function editBooking(bookingId) {
    alert(`예약을 수정합니다. (ID: ${bookingId})`);
}

function viewRequestDetails(requestId) {
    alert(`요청 상세 정보를 표시합니다. (ID: ${requestId})`);
}

function manageRepeatingBookings() {
    alert('반복 예약 관리 페이지로 이동합니다.');
}

// 강남 그랜드 안과 예약 내역 관련 함수들
function loadGangnamBookings() {
    filterGangnamBookings('all');
}

function filterGangnamBookings(status) {
    // 탭 활성화 업데이트
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-status="${status}"]`).classList.add('active');
    
    let filteredBookings = gangnamGrandEyeBookings;
    
    if (status !== 'all') {
        filteredBookings = gangnamGrandEyeBookings.filter(booking => booking.status === status);
    }
    
    displayGangnamBookings(filteredBookings);
}

function displayGangnamBookings(bookings) {
    const bookingsList = document.getElementById('gangnam-bookings-list');
    if (!bookingsList) return;
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="no-data">해당 상태의 예약이 없습니다.</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-item gangnam-booking">
            <div class="booking-info">
                <div class="booking-header">
                    <h4>환자: ${booking.patient} (${getNationalityName(booking.nationality)})</h4>
                    <span class="booking-status ${booking.status}">${getStatusKoreanName(booking.status)}</span>
                </div>
                <div class="booking-details">
                    <p><span class="icon">📅</span> ${formatDateKorean(booking.date)} ${booking.time}</p>
                    <p><span class="icon">🏥</span> ${booking.procedure}</p>
                    <p><span class="icon">💰</span> 시급: ${booking.rate} / 총액: ${booking.total}</p>
                    <p><span class="icon">📝</span> ${booking.notes}</p>
                </div>
            </div>
            <div class="booking-actions">
                <button class="btn-secondary" onclick="viewBookingDetails(${booking.id})">상세보기</button>
                ${booking.status === 'upcoming' ? 
                    `<button class="btn-edit" onclick="editGangnamBooking(${booking.id})">수정</button>` : ''
                }
                ${booking.status === 'completed' ? 
                    `<button class="btn-add" onclick="writeReview(${booking.id})">리뷰 작성</button>` : ''
                }
            </div>
        </div>
    `).join('');
}

function getNationalityName(nationality) {
    const names = {
        'us': '미국',
        'usa': '미국',
        '미국': '미국',
        'china': '중국',
        'chinese': '중국',
        '중국': '중국',
        'japan': '일본',
        'japanese': '일본',
        '일본': '일본',
        'korea': '한국',
        'korean': '한국',
        '한국': '한국'
    };
    return names[nationality.toLowerCase()] || nationality;
}

function getStatusKoreanName(status) {
    const names = {
        'upcoming': '예정',
        'completed': '완료',
        'cancelled': '취소',
        'pending': '대기'
    };
    return names[status] || status;
}

function formatDateKorean(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    
    return `${month}월 ${day}일 (${dayName})`;
}

function editGangnamBooking(bookingId) {
    const booking = gangnamGrandEyeBookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`예약 수정: ${booking.patient} 환자의 ${booking.procedure} 예약을 수정합니다.`);
        // 실제 구현에서는 수정 모달이나 폼을 표시
    }
}

function writeReview(bookingId) {
    const booking = gangnamGrandEyeBookings.find(b => b.id === bookingId);
    if (booking) {
        const rating = prompt('평점을 입력해주세요 (1-5점):');
        const comment = prompt('리뷰를 작성해주세요:');
        
        if (rating && comment) {
            alert(`리뷰가 작성되었습니다!\n평점: ${rating}점\n내용: ${comment}`);
            // 실제 구현에서는 서버에 리뷰 데이터 전송
        }
    }
}

// 대시보드 관련 함수들
function loadDashboardData() {
    loadInterpreterRequests('new');
    loadTodaySchedule();
}

function loadInterpreterRequests(type) {
    // 샘플 요청 데이터
    const sampleRequests = {
        new: [
            {
                id: 1,
                hospital: '강남 그랜드 안과',
                date: '2024-01-22',
                time: '09:00-12:00',
                department: '안과',
                procedure: '백내장 수술 상담',
                patient: '김환자 (미국)',
                rate: 30000,
                urgent: false
            },
            {
                id: 2,
                hospital: '강남 그랜드 안과',
                date: '2024-01-25',
                time: '14:00-16:00',
                department: '안과',
                procedure: '라식 수술 상담',
                patient: '이환자 (중국)',
                rate: 25000,
                urgent: true
            }
        ],
        accepted: [
            {
                id: 3,
                hospital: '강남 그랜드 안과',
                date: '2024-01-28',
                time: '10:00-13:00',
                department: '안과',
                procedure: '정기 검진',
                patient: '박환자 (일본)',
                rate: 25000,
                urgent: false
            }
        ],
        upcoming: [
            {
                id: 4,
                hospital: '강남 그랜드 안과',
                date: '2024-01-30',
                time: '15:00-17:00',
                department: '안과',
                procedure: '백내장 수술',
                patient: '정환자 (미국)',
                rate: 35000,
                urgent: false
            }
        ]
    };
    
    const requests = sampleRequests[type] || [];
    displayDashboardRequests(requests);
}

function displayDashboardRequests(requests) {
    const requestList = document.getElementById('interpreter-request-list');
    if (!requestList) return;
    
    if (requests.length === 0) {
        requestList.innerHTML = '<p class="no-data">요청이 없습니다.</p>';
        return;
    }
    
    requestList.innerHTML = requests.map(request => `
        <div class="request-item dashboard-request">
            <div class="request-header">
                <h4>${request.hospital}</h4>
                ${request.urgent ? '<span class="urgent-badge">긴급</span>' : ''}
            </div>
            <div class="request-details">
                <p><span class="icon">📅</span> ${formatDateKorean(request.date)} ${request.time}</p>
                <p><span class="icon">🏥</span> ${request.procedure}</p>
                <p><span class="icon">👤</span> ${request.patient}</p>
                <p><span class="icon">💰</span> ₩${request.rate.toLocaleString()}/시간</p>
            </div>
            <div class="request-actions">
                <button class="btn-primary" onclick="acceptRequest(${request.id})">승인</button>
                <button class="btn-secondary" onclick="declineRequest(${request.id})">거절</button>
            </div>
        </div>
    `).join('');
}

function loadTodaySchedule() {
    const todaySchedule = document.getElementById('today-schedule');
    if (!todaySchedule) return;
    
    // 오늘 날짜의 예약 찾기
    const today = new Date();
    const todayString = formatDateForKey(today);
    
    // 강남 그랜드 안과에서 오늘 예약된 일정 찾기
    const todayBookings = gangnamGrandEyeBookings.filter(booking => 
        booking.date === todayString && booking.status === 'upcoming'
    );
    
    if (todayBookings.length === 0) {
        todaySchedule.innerHTML = `
            <div class="no-schedule">
                <p>📅 오늘 예정된 일정이 없습니다.</p>
                <p>편안한 하루 보내세요!</p>
            </div>
        `;
        return;
    }
    
    todaySchedule.innerHTML = todayBookings.map(booking => `
        <div class="schedule-item">
            <div class="schedule-time">${booking.time.split('-')[0]}</div>
            <div class="schedule-details">
                <div class="schedule-title">${booking.procedure}</div>
                <div class="schedule-subtitle">${booking.patient} (${getNationalityName(booking.nationality)}) - 강남 그랜드 안과</div>
            </div>
        </div>
    `).join('');
}

function filterRequests(type) {
    // 탭 활성화 업데이트
    document.querySelectorAll('.request-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    loadInterpreterRequests(type);
}

function acceptRequest(requestId) {
    alert(`요청 ID ${requestId}를 승인했습니다.`);
    // 실제 구현에서는 서버에 승인 요청 전송
    loadInterpreterRequests('new'); // 목록 새로고침
}

function declineRequest(requestId) {
    const reason = prompt('거절 사유를 입력해주세요:');
    if (reason) {
        alert(`요청 ID ${requestId}를 거절했습니다.\n사유: ${reason}`);
        // 실제 구현에서는 서버에 거절 요청 전송
        loadInterpreterRequests('new'); // 목록 새로고침
    }
}