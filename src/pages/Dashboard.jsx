import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Button from '../components/Button';
import { Heart, Eye, Zap, Scissors, Smile, Shield, Search } from 'lucide-react';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const procedures = [
    {
      id: 1, key: 'rhinoplasty', category: 'plastic', 
      icon: <Smile size={32} />, 
      estimatedTime: { ko: '2-3 hours', en: '2-3 hours' }, 
      price: { ko: '$2,500~', en: '$2,500~' }, 
      popularity: 95
    },
    {
      id: 2, key: 'blepharoplasty', category: 'plastic', 
      icon: <Eye size={32} />, 
      estimatedTime: { ko: '1-2 hours', en: '1-2 hours' }, 
      price: { ko: '$1,200~', en: '$1,200~' }, 
      popularity: 92
    },
    {
      id: 3, key: 'botox', category: 'derma', 
      icon: <Shield size={32} />, 
      estimatedTime: { ko: '30 minutes', en: '30 minutes' }, 
      price: { ko: '$150~', en: '$150~' }, 
      popularity: 88
    },
    {
      id: 4, key: 'filler', category: 'derma', 
      icon: <Heart size={32} />, 
      estimatedTime: { ko: '30 min-1 hour', en: '30 min-1 hour' }, 
      price: { ko: '$250~', en: '$250~' }, 
      popularity: 85
    },
    {
      id: 5, key: 'lasik', category: 'eye', 
      icon: <Eye size={32} />, 
      estimatedTime: { ko: '30 min-1 hour', en: '30 min-1 hour' }, 
      price: { ko: '$1,200~', en: '$1,200~' }, 
      popularity: 83
    },
    {
      id: 6, key: 'implant', category: 'dental', 
      icon: <Smile size={32} />, 
      estimatedTime: { ko: '1-2 hours', en: '1-2 hours' }, 
      price: { ko: '$1,000~', en: '$1,000~' }, 
      popularity: 80
    },
    {
      id: 7, key: 'orthodontics', category: 'dental', 
      icon: <Smile size={32} />, 
      estimatedTime: { ko: '1 hour', en: '1 hour' }, 
      price: { ko: '$3,300~', en: '$3,300~' }, 
      popularity: 78
    },
    {
      id: 8, key: 'laserToning', category: 'derma', 
      icon: <Zap size={32} />, 
      estimatedTime: { ko: '30 minutes', en: '30 minutes' }, 
      price: { ko: '$120~', en: '$120~' }, 
      popularity: 75
    },
    {
      id: 9, key: 'breastAugmentation', category: 'plastic', 
      icon: <Heart size={32} />, 
      estimatedTime: { ko: '2-3 hours', en: '2-3 hours' }, 
      price: { ko: '$4,200~', en: '$4,200~' }, 
      popularity: 72
    },
    {
      id: 10, key: 'liposuction', category: 'plastic', 
      icon: <Zap size={32} />, 
      estimatedTime: { ko: '2-4 hours', en: '2-4 hours' }, 
      price: { ko: '$3,300~', en: '$3,300~' }, 
      popularity: 70
    },
    {
      id: 11, key: 'cataract', category: 'eye', 
      icon: <Eye size={32} />, 
      estimatedTime: { ko: '30 min-1 hour', en: '30 min-1 hour' }, 
      price: { ko: '$1,700~', en: '$1,700~' }, 
      popularity: 68
    },
    {
      id: 12, key: 'healthCheckup', category: 'internal', 
      icon: <Heart size={32} />, 
      estimatedTime: { ko: '2-3 hours', en: '2-3 hours' }, 
      price: { ko: '$400~', en: '$400~' }, 
      popularity: 65
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
                    <span className="detail-value">{procedure.estimatedTime[i18n.language] || procedure.estimatedTime.ko}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">{t('Estimated Cost:')}</span>
                    <span className="detail-value">{procedure.price[i18n.language] || procedure.price.ko}</span>
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