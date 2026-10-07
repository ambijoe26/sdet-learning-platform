import React from 'react';

const WeakAreasCard: React.FC = () => {
  const weakAreas = [
    { topic: 'Multithreading Concepts', accuracy: 65, recommended: 3 },
    { topic: 'XPath Advanced Queries', accuracy: 70, recommended: 2 },
    { topic: 'Custom Exception Handling', accuracy: 72, recommended: 2 }
  ];

  return (
    <div className="weak-areas-card">
      {weakAreas.length === 0 ? (
        <p className="no-data">No weak areas identified yet. Keep practicing!</p>
      ) : (
        <div className="weak-areas-list">
          {weakAreas.map((area, idx) => (
            <div key={idx} className="weak-area-item">
              <div className="area-header">
                <span className="area-topic">{area.topic}</span>
                <span className="area-accuracy" style={{
                  color: area.accuracy < 70 ? '#e53e3e' : area.accuracy < 80 ? '#ed8936' : '#48bb78'
                }}>
                  {area.accuracy}%
                </span>
              </div>
              <div className="area-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${area.accuracy}%`,
                      backgroundColor: area.accuracy < 70 ? '#e53e3e' : area.accuracy < 80 ? '#ed8936' : '#48bb78'
                    }}
                  />
                </div>
              </div>
              <p className="area-recommendation">
                📖 {area.recommended} more exercise(s) recommended
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeakAreasCard;
