import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Button from '../components/Button';
import { Heart, Eye, Zap, Scissors, Smile, Shield, Search } from 'lucide-react';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const procedures = [
    {
      id: 1, key: 'rhinoplasty', category: 'plastic', department: '성형외과',
      icon: <Smile size={32} />, estimatedTime: '2-3시간', price: '300만원~', popularity: 95
    },
    {
      id: 2, key: 'blepharoplasty', category: 'plastic', department: '성형외과',
      icon: <Eye size={32} />, estimatedTime: '1-2시간', price: '150만원~', popularity: 92
    },
    {
      id: 3, key: 'botox', category: 'derma', department: '피부과',
      icon: <Shield size={32} />, estimatedTime: '30분', price: '20만원~', popularity: 88
    },
    {
      id: 4, key: 'filler', category: 'derma', department: '피부과',
      icon: <Heart size={32} />, estimatedTime: '30분-1시간', price: '30만원~', popularity: 85
    },
    {
      id: 5, key: 'lasik', category: 'eye', department: '안과',
      icon: <Eye size={32} />, estimatedTime: '30분-1시간', price: '150만원~', popularity: 83
    },
    {
      id: 6, key: 'implant', category: 'dental', department: '치과',
      icon: <Smile size={32} />, estimatedTime: '1-2시간', price: '120만원~', popularity: 80
    },
    {
      id: 7, key: 'orthodontics', category: 'dental', department: '치과',
      icon: <Smile size={32} />, estimatedTime: '1시간', price: '400만원~', popularity: 78
    },
    {
      id: 8, key: 'laserToning', category: 'derma', department: '피부과',
      icon: <Zap size={32} />, estimatedTime: '30분', price: '15만원~', popularity: 75
    },
    {
      id: 9, key: 'breastAugmentation', category: 'plastic', department: '성형외과',
      icon: <Heart size={32} />, estimatedTime: '2-3시간', price: '500만원~', popularity: 72
    },
    {
      id: 10, key: 'liposuction', category: 'plastic', department: '성형외과',
      icon: <Zap size={32} />, estimatedTime: '2-4시간', price: '400만원~', popularity: 70
    },
    {
      id: 11, key: 'cataract', category: 'eye', department: '안과',
      icon: <Eye size={32} />, estimatedTime: '30분-1시간', price: '200만원~', popularity: 68
    },
    {
      id: 12, key: 'healthCheckup', category: 'internal', department: '내과',
      icon: <Heart size={32} />, estimatedTime: '2-3시간', price: '50만원~', popularity: 65
    }
  ];

  const filteredProcedures = procedures.filter(procedure =>
    t(`procedures.${procedure.key}.name`).toLowerCase().includes(searchTerm.toLowerCase()) ||
    t(`procedures.${procedure.key}.description`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcedureSelect = (procedure) => {
    try {
      const procedureForState = {
        ...procedure,
        name: t(`procedures.${procedure.key}.name`),
        description: t(`procedures.${procedure.key}.description`),
      };
      delete procedureForState.icon;

      navigate('/hospitals', { 
        state: { 
          selectedProcedure: procedureForState 
        } 
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{t('Select Procedure')}</h1>
          <p>{t('Click on the desired treatment area to select a hospital')}</p>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder={t('Search for procedure name or department...')}
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
                <h3>{t(`procedures.${procedure.key}.name`)}</h3>
                <p className="procedure-description">{t(`procedures.${procedure.key}.description`)}</p>
                <div className="procedure-details">
                  <div className="detail-item">
                    <span className="detail-label">{t('Estimated Time:')}</span>
                    <span className="detail-value">{procedure.estimatedTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">{t('Estimated Cost:')}</span>
                    <span className="detail-value">{procedure.price}</span>
                  </div>
                  <div className="popularity-bar">
                    <span className="popularity-label">{t('Popularity')}</span>
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