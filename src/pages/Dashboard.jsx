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
      id: 1,
      key: 'rhinoplasty',
      category: 'plastic',
      department: '성형외과',
      icon: <Smile size={32} />,
      estimatedTime: '2-3시간',
      price: '300만원~',
      popularity: 95
    },
    {
      id: 2,
      key: 'blepharoplasty',
      category: 'plastic',
      department: '성형외과',
      icon: <Eye size={32} />,
      estimatedTime: '1-2시간',
      price: '150만원~',
      popularity: 92
    },
    {
      id: 3,
      key: 'botox',
      category: 'derma',
      department: '피부과',
      icon: <Shield size={32} />,
      estimatedTime: '30분',
      price: '20만원~',
      popularity: 88
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