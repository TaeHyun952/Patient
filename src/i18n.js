import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // 사용자의 브라우저 언어를 감지합니다.
  .use(LanguageDetector)
  // i18n 인스턴스를 react-i18next에 전달합니다.
  .use(initReactI18next)
  // i18n 초기화 옵션을 설정합니다.
  .init({
    // 디버그 모드를 활성화하여 콘솔에 로그를 출력합니다.
    debug: true,
    // 기본 언어를 영어로 설정합니다.
    fallbackLng: 'en',
    interpolation: {
      // React는 기본적으로 XSS 공격으로부터 안전하므로 이스케이프 기능을 비활성화합니다.
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          "Select Procedure": "Select Procedure",
          "Click on the desired treatment area to select a hospital": "Click on the desired treatment area to select a hospital",
          "Search for procedure name or department...": "Search for procedure name or department...",
          "Estimated Time:": "Estimated Time:",
          "Estimated Cost:": "Estimated Cost:",
          "Popularity": "Popularity",
          
          // Navbar
          "Hospital Interpretation Service": "Hospital Interpretation Service",
          "Procedure Selection": "Procedure Selection",
          "Booking History": "Booking History",
          "My Page": "My Page",
          "Profile": "Profile",
          "Login": "Login",
          "Active": "Active",
          "Inactive": "Inactive",
          
          // Hospital Selection
          "Hospital Selection": "Hospital Selection",
          "Please select a hospital for procedure": "Please select a hospital for {{procedure}} procedure",
          "Please select a hospital for interpretation service": "Please select a hospital for interpretation service",
          "Selected Procedure:": "Selected Procedure:",
          "Sorry": "Sorry",
          "No hospitals currently provide this procedure": "No hospitals currently provide \"{{procedure}}\" procedure.",
          "Choose Different Procedure": "Choose Different Procedure",
          "Main Departments": "Main Departments",
          "Assigned Interpreters": "Assigned Interpreters",
          "interpreters": "interpreters",
          "Wait Time": "Wait Time",
          "View Interpreters": "View Interpreters",
          "Book Appointment": "Book Appointment",
          "more": "more",
          
          // MyPage
          "Patient My Page": "Patient My Page",
          "Hello,": "Hello,",
          "Active": "Active",
          "This Month's Appointments": "This Month's Appointments",
          "Visited Hospitals": "Visited Hospitals",
          "Service Satisfaction": "Service Satisfaction",
          "Upcoming": "Upcoming",
          "Upcoming Appointments": "Upcoming Appointments",
          "Quick Settings": "Quick Settings",
          "Appointment Notifications": "Appointment Notifications",
          "Receive confirmation and reminder notifications": "Receive confirmation and reminder notifications",
          "Language Support Service": "Language Support Service",
          "When language support is needed during treatment": "When language support is needed during treatment",
          "Auto Appointment Confirmation": "Auto Appointment Confirmation",
          "Automatic confirmation of appointment changes": "Automatic confirmation of appointment changes",
          "Appointment Management": "Appointment Management",
          "Scheduled Appointments": "Scheduled Appointments",
          "Completed Treatments": "Completed Treatments",
          "Cancelled Appointments": "Cancelled Appointments",
          "No appointments": "No appointments",
          "Standby": "Standby",
          "Reschedule": "Reschedule",
          "Cancel Appointment": "Cancel Appointment",
          "Today's Schedule": "Today's Schedule",
          "No schedule for today": "📅 No schedule for today.",
          "Have a comfortable day!": "Have a comfortable day!",
          "Personal Information Management": "Personal Information Management",
          "Edit": "Edit",
          "Cancel": "Cancel",
          "Save": "Save",
          "Name:": "Name:",
          "Email:": "Email:",
          "Phone:": "Phone:",
          "Medical Information & Notes": "Medical Information & Notes",
          "Medical History": "Medical History",
          "Add": "Add",
          "Treatment Date:": "Treatment Date:",
          "Diagnosis:": "Diagnosis:",
          "Doctor:": "Doctor:",
          "Insurance Information": "Insurance Information",
          "Insurance Number:": "Insurance Number:",
          "Valid Until:": "Valid Until:",
          "Treatment Reviews": "Treatment Reviews",
          "Satisfaction:": "Satisfaction:",
          "Verified Patient": "Verified Patient",
          "Hospital Interpretation Service User": "Hospital Interpretation Service User",
          "Language Support": "Language Support",
          "Satisfaction": "Satisfaction",
          "Visited Hospitals": "Visited Hospitals",
          
          // Schedule Page
          "My Appointment History": "My Appointment History",
          "Appointment Status": "Appointment Status",
          "Total Appointments": "Total Appointments",
          "Scheduled Appointments": "Scheduled Appointments",
          "Completed Appointments": "Completed Appointments",
          "Cancelled Appointments": "Cancelled Appointments",
          "All": "All",
          "Scheduled": "Scheduled",
          "Completed": "Completed",
          "Cancelled": "Cancelled",
          "Department:": "Department:",
          "Location:": "Location:",
          "Notes:": "Notes:",
          "Language Support:": "Language Support:",
          "Language support requested": "Language support requested",
          "Language support not needed": "Language support not needed",
          "View Details": "View Details",
          "Write Review": "Write Review",
          "No appointments found": "No appointments found for the selected status.",
          
          // Login Page
          "Login": "Login",
          "Email": "Email",
          "Password": "Password",
          "Don't have an account?": "Don't have an account?",
          "Sign Up": "Sign Up",
          
          // Time and Price units
          "hours": "hours",
          "minutes": "minutes", 
          "won": "won",
          
          procedures: {
            rhinoplasty: {
              name: "Rhinoplasty",
              description: "Nose bridge, nose tip, alar reduction"
            },
            blepharoplasty: {
              name: "Blepharoplasty",
              description: "Double eyelid, ptosis correction, canthoplasty"
            },
            botox: {
              name: "Botox",
              description: "Wrinkle improvement, jawline botox"
            },
            filler: {
              name: "Filler",
              description: "Volume enhancement, lip filler, smile lines"
            },
            lasik: {
              name: "LASIK/LASEK",
              description: "Vision correction surgery"
            },
            implant: {
              name: "Dental Implant",
              description: "Artificial tooth root placement"
            },
            orthodontics: {
              name: "Orthodontics",
              description: "Invisalign, metal braces"
            },
            laserToning: {
              name: "Laser Toning",
              description: "Melasma, freckle removal"
            },
            breastAugmentation: {
              name: "Breast Augmentation",
              description: "Breast enlargement, breast reduction"
            },
            liposuction: {
              name: "Liposuction",
              description: "Abdomen, thigh, arm fat removal"
            },
            cataract: {
              name: "Cataract Surgery",
              description: "Intraocular lens implantation"
            },
            healthCheckup: {
              name: "Health Check-up",
              description: "Comprehensive health screening, cancer screening"
            }
          }
        }
      },
      ko: {
        translation: {
          "Select Procedure": "시술 선택",
          "Click on the desired treatment area to select a hospital": "원하시는 시술 분야를 클릭하여 병원을 선택하세요",
          "Search for procedure name or department...": "시술명 또는 진료과를 검색하세요...",
          "Estimated Time:": "소요시간:",
          "Estimated Cost:": "예상비용:",
          "Popularity": "인기도",
          
          // Navbar
          "Hospital Interpretation Service": "병원 통역 서비스",
          "Procedure Selection": "시술 선택",
          "Booking History": "예약 내역",
          "My Page": "마이페이지",
          "Profile": "프로필",
          "Login": "로그인",
          "Active": "활동 중",
          "Inactive": "비활성",
          
          // Hospital Selection
          "Hospital Selection": "병원 선택",
          "Please select a hospital for procedure": "{{procedure}} 시술을 위한 병원을 선택해주세요",
          "Please select a hospital for interpretation service": "통역 서비스를 이용할 병원을 선택해주세요",
          "Selected Procedure:": "선택된 시술:",
          "Sorry": "죄송합니다",
          "No hospitals currently provide this procedure": "현재 \"{{procedure}}\" 시술을 제공하는 병원이 없습니다.",
          "Choose Different Procedure": "다른 시술 선택하기",
          "Main Departments": "주요 진료과",
          "Assigned Interpreters": "배치된 통역사",
          "interpreters": "명",
          "Wait Time": "대기시간",
          "View Interpreters": "통역사 보기",
          "Book Appointment": "예약하기",
          "more": "명 더",
          
          // MyPage
          "Patient My Page": "환자 마이페이지",
          "Hello,": "안녕하세요,",
          "Active": "활동 중",
          "This Month's Appointments": "이번 달 예약",
          "Visited Hospitals": "방문한 병원",
          "Service Satisfaction": "서비스 만족도",
          "Upcoming": "예정",
          "Upcoming Appointments": "다가오는 예약",
          "Quick Settings": "빠른 설정",
          "Appointment Notifications": "예약 알림",
          "Receive confirmation and reminder notifications": "예약 확인 및 리마인더 알림 수신",
          "Language Support Service": "언어 지원 서비스",
          "When language support is needed during treatment": "진료 시 언어 지원이 필요한 경우",
          "Auto Appointment Confirmation": "자동 예약 확인",
          "Automatic confirmation of appointment changes": "예약 변경 사항 자동 확인",
          "Appointment Management": "예약 관리",
          "Scheduled Appointments": "예정된 예약",
          "Completed Treatments": "완료된 진료",
          "Cancelled Appointments": "취소된 예약",
          "No appointments": "예약이 없습니다.",
          "Standby": "대기",
          "Reschedule": "일정 변경",
          "Cancel Appointment": "예약 취소",
          "Today's Schedule": "오늘의 일정",
          "No schedule for today": "📅 오늘 예정된 일정이 없습니다.",
          "Have a comfortable day!": "편안한 하루 보내세요!",
          "Personal Information Management": "개인정보 관리",
          "Edit": "편집",
          "Cancel": "취소",
          "Save": "저장",
          "Name:": "이름:",
          "Email:": "이메일:",
          "Phone:": "전화번호:",
          "Medical Information & Notes": "의료 정보 및 특이사항",
          "Medical History": "진료 내역",
          "Add": "추가",
          "Treatment Date:": "진료일:",
          "Diagnosis:": "진단:",
          "Doctor:": "담당 의사:",
          "Insurance Information": "보험 정보",
          "Insurance Number:": "보험증 번호:",
          "Valid Until:": "유효기간:",
          "Treatment Reviews": "진료 후기",
          "Satisfaction:": "만족도:",
          "Verified Patient": "인증된 환자",
          "Hospital Interpretation Service User": "병원 통역 서비스 이용자",
          "Language Support": "언어 지원",
          "Satisfaction": "만족도",
          "Visited Hospitals": "방문 병원",
          
          // Schedule Page
          "My Appointment History": "나의 예약 내역",
          "Appointment Status": "예약 현황",
          "Total Appointments": "전체 예약",
          "Scheduled Appointments": "예정된 예약",
          "Completed Appointments": "완료된 예약",
          "Cancelled Appointments": "취소된 예약",
          "All": "전체",
          "Scheduled": "예정",
          "Completed": "완료",
          "Cancelled": "취소",
          "Department:": "진료과:",
          "Location:": "위치:",
          "Notes:": "메모:",
          "Language Support:": "언어 지원:",
          "Language support requested": "언어 지원 요청",
          "Language support not needed": "언어 지원 불필요",
          "View Details": "상세보기",
          "Write Review": "후기 작성",
          "No appointments found": "선택한 상태의 예약이 없습니다.",
          
          // Login Page
          "Login": "로그인",
          "Email": "이메일",
          "Password": "비밀번호",
          "Don't have an account?": "계정이 없으신가요?",
          "Sign Up": "회원가입",
          
          // Time and Price units
          "hours": "시간",
          "minutes": "분", 
          "won": "만원",
          
          procedures: {
            rhinoplasty: {
              name: "코성형",
              description: "콧대, 코끝, 콧볼 성형술"
            },
            blepharoplasty: {
              name: "눈성형",
              description: "쌍꺼풀, 눈매교정, 트임술"
            },
            botox: {
              name: "보톡스",
              description: "주름개선, 턱라인 보톡스"
            },
            filler: {
              name: "필러",
              description: "볼륨개선, 입술필러, 팔자주름"
            },
            lasik: {
              name: "라식/라섹",
              description: "시력교정술"
            },
            implant: {
              name: "임플란트",
              description: "치아 임플란트 시술"
            },
            orthodontics: {
              name: "치아교정",
              description: "투명교정, 메탈교정"
            },
            laserToning: {
              name: "레이저토닝",
              description: "기미, 잡티 제거"
            },
            breastAugmentation: {
              name: "가슴성형",
              description: "가슴확대, 가슴축소술"
            },
            liposuction: {
              name: "지방흡입",
              description: "복부, 허벅지, 팔뚝 지방흡입"
            },
            cataract: {
              name: "백내장 수술",
              description: "인공수정체 삽입술"
            },
            healthCheckup: {
              name: "건강검진",
              description: "종합건강검진, 암검진"
            }
          }
        }
      }
    }
  });

export default i18n;
