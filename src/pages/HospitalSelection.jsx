import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { MapPin, Star, Users, Phone, Clock } from 'lucide-react';
import '../styles/pages/HospitalSelection.css';

const HospitalSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  const selectedProcedure = location.state?.selectedProcedure;

  // Redirect to dashboard if no procedure is selected
  React.useEffect(() => {
    if (!selectedProcedure) {
      navigate('/');
    }
  }, [selectedProcedure, navigate]);

  if (!selectedProcedure) {
    return <div>{t('Please select a hospital for interpretation service')}</div>;
  }

  const allHospitals = [
    {
      id: 1,
      name: 'Gangnam Severance Hospital',
      location: '211 Eonju-ro, Gangnam-gu, Seoul',
      rating: 4.8,
      reviewCount: 1250,
      phone: '02-2019-3114',
      departments: ['Plastic Surgery', 'Dermatology', 'Ophthalmology'],
      availableProcedures: ['rhinoplasty', 'blepharoplasty', 'breastAugmentation', 'liposuction', 'botox', 'filler', 'laserToning', 'lasik', 'cataract'],
      interpreters: [
        { name: 'Kim Young-soo', languages: ['English', 'Chinese'], rating: 4.9, experience: '5 years' },
        { name: 'Lee Min-jung', languages: ['Japanese', 'Russian'], rating: 4.7, experience: '3 years' },
        { name: 'Park Jun-ho', languages: ['English', 'German'], rating: 4.8, experience: '7 years' }
      ],
      distance: '2.5km',
      waitTime: '15 min'
    },
    {
      id: 2,
      name: 'Sinnonhyeon Plastic Surgery',
      location: '456 Gangnam-daero, Gangnam-gu, Seoul',
      rating: 4.7,
      reviewCount: 980,
      phone: '02-1234-5678',
      departments: ['Plastic Surgery', 'Dermatology'],
      availableProcedures: ['rhinoplasty', 'blepharoplasty', 'breastAugmentation', 'liposuction', 'botox', 'filler', 'laserToning'],
      interpreters: [
        { name: 'Choi Su-jin', languages: ['English', 'French'], rating: 4.8, experience: '4 years' },
        { name: 'Jung Ho-young', languages: ['Chinese', 'Vietnamese'], rating: 4.6, experience: '6 years' }
      ],
      distance: '3.8km',
      waitTime: '20 min'
    },
    {
      id: 3,
      name: 'Asan Medical Center',
      location: '88 Olympic-ro 43-gil, Songpa-gu, Seoul',
      rating: 4.9,
      reviewCount: 1540,
      phone: '02-3010-3114',
      departments: ['Ophthalmology', 'Internal Medicine', 'Dentistry'],
      availableProcedures: ['lasik', 'cataract', 'healthCheckup', 'implant', 'orthodontics'],
      interpreters: [
        { name: 'Kang Mi-ra', languages: ['English', 'Spanish'], rating: 4.9, experience: '8 years' },
        { name: 'Yoon Tae-seok', languages: ['Chinese', 'Thai'], rating: 4.7, experience: '4 years' },
        { name: 'Seo Ji-hyun', languages: ['Japanese', 'Arabic'], rating: 4.8, experience: '5 years' }
      ],
      distance: '5.2km',
      waitTime: '25 min'
    },
    {
      id: 4,
      name: 'Seoul National University Dental Hospital',
      location: '101 Daehak-ro, Jongno-gu, Seoul',
      rating: 4.6,
      reviewCount: 850,
      phone: '02-2072-2114',
      departments: ['Dentistry'],
      availableProcedures: ['implant', 'orthodontics'],
      interpreters: [
        { name: 'Lee Hyun-woo', languages: ['English', 'Chinese'], rating: 4.5, experience: '3 years' },
        { name: 'Park Seo-yeon', languages: ['Japanese', 'English'], rating: 4.7, experience: '4 years' }
      ],
      distance: '6.1km',
      waitTime: '30 min'
    },
    {
      id: 5,
      name: 'Apgujeong Dermatology',
      location: '123 Apgujeong-ro, Gangnam-gu, Seoul',
      rating: 4.5,
      reviewCount: 650,
      phone: '02-5678-9012',
      departments: ['Dermatology'],
      availableProcedures: ['botox', 'filler', 'laserToning'],
      interpreters: [
        { name: 'Kim Ji-soo', languages: ['English', 'Chinese'], rating: 4.4, experience: '2 years' },
        { name: 'Choi Min-ho', languages: ['Japanese', 'French'], rating: 4.6, experience: '5 years' }
      ],
      distance: '4.3km',
      waitTime: '10 min'
    },
    {
      id: 6,
      name: 'Leaders Plastic Surgery',
      location: '517 Nonhyeon-ro, Gangnam-gu, Seoul',
      rating: 4.7,
      reviewCount: 892,
      phone: '02-3456-7890',
      departments: ['Plastic Surgery'],
      availableProcedures: ['rhinoplasty', 'blepharoplasty', 'breastAugmentation', 'liposuction'],
      interpreters: [
        { name: 'Song Mi-young', languages: ['English', 'Japanese'], rating: 4.8, experience: '6 years' },
        { name: 'Lee Tae-min', languages: ['Chinese', 'Russian'], rating: 4.6, experience: '4 years' }
      ],
      distance: '3.2km',
      waitTime: '18 min'
    },
    {
      id: 7,
      name: 'Seoul National University Hospital',
      location: '101 Daehak-ro, Jongno-gu, Seoul',
      rating: 4.9,
      reviewCount: 2150,
      phone: '02-2072-2114',
      departments: ['Ophthalmology', 'Internal Medicine', 'Orthopedics', 'Plastic Surgery'],
      availableProcedures: ['lasik', 'cataract', 'healthCheckup', 'rhinoplasty', 'blepharoplasty'],
      interpreters: [
        { name: 'Dr. Kim', languages: ['English', 'German'], rating: 4.9, experience: '10 years' },
        { name: 'Nurse Park', languages: ['Chinese', 'Japanese'], rating: 4.8, experience: '7 years' },
        { name: 'Dr. Lee', languages: ['English', 'French'], rating: 4.7, experience: '5 years' }
      ],
      distance: '7.1km',
      waitTime: '35 min'
    },
    {
      id: 8,
      name: 'La Mer Dermatology',
      location: '542-3 Sinsa-dong, Gangnam-gu, Seoul',
      rating: 4.6,
      reviewCount: 743,
      phone: '02-4567-8901',
      departments: ['Dermatology'],
      availableProcedures: ['botox', 'filler', 'laserToning'],
      interpreters: [
        { name: 'Dr. Choi', languages: ['English', 'Chinese'], rating: 4.7, experience: '8 years' },
        { name: 'Kim Aesthetician', languages: ['Japanese', 'Thai'], rating: 4.5, experience: '3 years' }
      ],
      distance: '2.8km',
      waitTime: '12 min'
    },
    {
      id: 9,
      name: 'Yonsei University Dental Hospital',
      location: '50-1 Yonsei-ro, Seodaemun-gu, Seoul',
      rating: 4.8,
      reviewCount: 1156,
      phone: '02-2228-3114',
      departments: ['Dentistry', 'Oral Surgery'],
      availableProcedures: ['implant', 'orthodontics'],
      interpreters: [
        { name: 'Dr. Jung Dentist', languages: ['English', 'Chinese'], rating: 4.8, experience: '9 years' },
        { name: 'Dr. Kim Oral Surgeon', languages: ['Japanese', 'English'], rating: 4.6, experience: '5 years' },
        { name: 'Dr. Lee Orthodontist', languages: ['German', 'French'], rating: 4.7, experience: '6 years' }
      ],
      distance: '8.5km',
      waitTime: '40 min'
    },
    {
      id: 10,
      name: 'Seoul National University Bundang Hospital',
      location: '82 Gumi-ro 173-beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do',
      rating: 4.8,
      reviewCount: 1834,
      phone: '031-787-7114',
      departments: ['Internal Medicine', 'Ophthalmology', 'Orthopedics'],
      availableProcedures: ['healthCheckup', 'lasik', 'cataract'],
      interpreters: [
        { name: 'Dr. Park Bundang', languages: ['English', 'Chinese'], rating: 4.9, experience: '8 years' },
        { name: 'Kim Seongnam', languages: ['Japanese', 'Vietnamese'], rating: 4.7, experience: '4 years' }
      ],
      distance: '12.3km',
      waitTime: '45 min'
    },
    {
      id: 11,
      name: 'The Classic Plastic Surgery',
      location: '823-20 Yeoksam-dong, Gangnam-gu, Seoul',
      rating: 4.5,
      reviewCount: 612,
      phone: '02-5678-9012',
      departments: ['Plastic Surgery', 'Dermatology'],
      availableProcedures: ['rhinoplasty', 'blepharoplasty', 'breastAugmentation', 'liposuction', 'botox', 'filler'],
      interpreters: [
        { name: 'Lee Classic', languages: ['English', 'Chinese'], rating: 4.6, experience: '7 years' },
        { name: 'Park Yeoksam', languages: ['Japanese', 'French'], rating: 4.4, experience: '3 years' }
      ],
      distance: '4.1km',
      waitTime: '22 min'
    },
    {
      id: 12,
      name: 'Gangnam Eye Clinic',
      location: '518 Teheran-ro, Gangnam-gu, Seoul',
      rating: 4.4,
      reviewCount: 445,
      phone: '02-3456-7890',
      departments: ['Ophthalmology'],
      availableProcedures: ['lasik', 'cataract'],
      interpreters: [
        { name: 'Dr. Choi Ophthalmologist', languages: ['English', 'Chinese'], rating: 4.5, experience: '6 years' },
        { name: 'Kim Teheran', languages: ['Japanese', 'English'], rating: 4.3, experience: '4 years' }
      ],
      distance: '3.7km',
      waitTime: '16 min'
    }
  ];

  // Filter hospitals based on selected procedure
  const hospitals = allHospitals.filter(hospital => 
    hospital.availableProcedures.includes(selectedProcedure.key)
  );

  console.log('Selected procedure:', selectedProcedure);
  console.log('Filtered hospitals:', hospitals);

  const handleHospitalSelect = (hospital) => {
    console.log('Hospital selected:', hospital);
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
          <h1>{t('Hospital Selection')}</h1>
          {selectedProcedure ? (
            <p>{t('Please select a hospital for procedure', { procedure: selectedProcedure.name })}</p>
          ) : (
            <p>{t('Please select a hospital for interpretation service')}</p>
          )}
          {selectedProcedure && (
            <div className="selected-procedure-info">
              <span className="procedure-label">{t('Selected Procedure:')}</span>
              <span className="procedure-name">{selectedProcedure.name}</span>
            </div>
          )}
        </div>

        {hospitals.length === 0 ? (
          <div className="no-hospitals">
            <h3>{t('Sorry')}</h3>
            <p>{t('No hospitals currently provide this procedure', { procedure: selectedProcedure.name })}</p>
            <Button variant="outline" onClick={() => navigate('/')}>
              {t('Choose Different Procedure')}
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
                    <span>{t('Wait Time')} {hospital.waitTime}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={14} />
                    <span>{hospital.phone}</span>
                  </div>
                </div>

                <div className="departments">
                  <h4>{t('Main Departments')}</h4>
                  <div className="department-tags">
                    {hospital.departments.slice(0, 3).map((dept, index) => (
                      <Badge key={index} type="secondary" size="small">
                        {dept}
                      </Badge>
                    ))}
                    {hospital.departments.length > 3 && (
                      <Badge type="outline" size="small">
                        +{hospital.departments.length - 3} {t('more')}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="interpreters-preview">
                  <h4>
                    <Users size={16} />
                    {t('Assigned Interpreters')} ({hospital.interpreters.length} {t('interpreters')})
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
                        +{hospital.interpreters.length - 2} {t('more')}
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
                  {t('View Interpreters')}
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleHospitalSelect(hospital)}
                >
                  {t('Book Appointment')}
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