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
