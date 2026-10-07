import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, total, icon, color }) => {
  const percentage = (value / total) * 100;

  const colorMap = {
    blue: '#667eea',
    green: '#48bb78',
    purple: '#9f7aea',
    orange: '#ed8936'
  };

  return (
    <div className="stat-card" style={{ borderLeftColor: colorMap[color] }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h4>{title}</h4>
        <div className="stat-numbers">
          <span className="value">{value}</span>
          <span className="total">/ {total}</span>
        </div>
      </div>
      <div className="stat-progress">
        <div className="progress-ring" style={{ '--progress': percentage } as any}>
          <span className="progress-text">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
