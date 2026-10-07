import React from 'react';

const ProgressChart: React.FC = () => {
  // Mock data for weekly activity
  const weeklyData = [
    { day: 'Mon', hours: 2, exercises: 5 },
    { day: 'Tue', hours: 3, exercises: 8 },
    { day: 'Wed', hours: 1.5, exercises: 3 },
    { day: 'Thu', hours: 4, exercises: 12 },
    { day: 'Fri', hours: 2.5, exercises: 7 },
    { day: 'Sat', hours: 5, exercises: 15 },
    { day: 'Sun', hours: 1, exercises: 2 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="progress-chart">
      <div className="chart-container">
        <div className="chart-bars">
          {weeklyData.map((data, idx) => (
            <div key={idx} className="bar-item">
              <div
                className="bar"
                style={{
                  height: `${(data.hours / maxHours) * 200}px`,
                  background: `linear-gradient(180deg, #667eea 0%, #764ba2 100%)`
                }}
                title={`${data.hours} hours, ${data.exercises} exercises`}
              />
              <span className="bar-label">{data.day}</span>
              <span className="bar-value">{data.hours}h</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <span>📊 Hours spent learning this week</span>
      </div>
    </div>
  );
};

export default ProgressChart;
