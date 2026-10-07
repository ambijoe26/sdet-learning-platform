import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { APP_VERSION } from '../data/curriculum';
import '../styles/Settings.css';

interface SettingsProps {
  onNavigate: (view: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { user, progress } = useProgress();

  const handleExportProgress = () => {
    if (progress) {
      const dataStr = JSON.stringify(progress, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sdet-progress-${new Date().toISOString()}.json`;
      link.click();
    }
  };

  const handleGenerateShareLink = () => {
    const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Share Link Generated: https://sdet.learn/join/${shareCode}\n\nShare this link to let others view your progress!`);
  };

  return (
    <div className="settings-container">
      <h2>Settings & Account</h2>

      {/* User Profile */}
      <section className="settings-section">
        <h3>👤 Profile</h3>
        <div className="profile-info">
          <div className="info-item">
            <label>Name</label>
            <p>{user?.name}</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>
          <div className="info-item">
            <label>Years of Experience</label>
            <p>{user?.yearsOfExperience} years</p>
          </div>
          <div className="info-item">
            <label>Experience Level</label>
            <p>{user?.experienceLevel}</p>
          </div>
          <div className="info-item">
            <label>Joined</label>
            <p>{user?.joinedDate.toLocaleDateString()}</p>
          </div>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="settings-section">
        <h3>📊 Progress Summary</h3>
        <div className="progress-summary">
          <div className="summary-item">
            <label>Overall Progress</label>
            <span className="value">{progress?.overallProgress}%</span>
          </div>
          <div className="summary-item">
            <label>Lessons Completed</label>
            <span className="value">{progress?.lessonsCompleted.length}</span>
          </div>
          <div className="summary-item">
            <label>Exercises Completed</label>
            <span className="value">{progress?.exercisesCompleted.length}</span>
          </div>
          <div className="summary-item">
            <label>Total Time Spent</label>
            <span className="value">{progress?.totalTimeSpent} hours</span>
          </div>
          <div className="summary-item">
            <label>Last Updated</label>
            <span className="value">{progress?.lastUpdated.toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      {/* Data Export & Sharing */}
      <section className="settings-section">
        <h3>📤 Data & Sharing</h3>
        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleExportProgress}>
            📥 Export Progress (JSON)
          </button>
          <button className="btn-secondary" onClick={handleGenerateShareLink}>
            🔗 Generate Share Link
          </button>
          <button className="btn-secondary" onClick={() => {
            if (window.confirm('This will reset all progress. Are you sure?')) {
              localStorage.removeItem('sdet-progress');
              window.location.reload();
            }
          }}>
            🔄 Reset All Progress
          </button>
        </div>
      </section>

      {/* Version Info */}
      <section className="settings-section">
        <h3>ℹ️ Application Version</h3>
        <div className="version-info">
          <div className="info-item">
            <label>Current Version</label>
            <p>{APP_VERSION.version}</p>
          </div>
          <div className="info-item">
            <label>Release Date</label>
            <p>{APP_VERSION.releaseDate.toLocaleDateString()}</p>
          </div>
          <div className="info-item">
            <label>Latest Features</label>
            <ul className="feature-list">
              {APP_VERSION.features.map((feature, idx) => (
                <li key={idx}>✨ {feature}</li>
              ))}
            </ul>
          </div>
          <div className="info-item">
            <label>Recent Changes</label>
            <ul className="changes-list">
              {APP_VERSION.changes.map((change, idx) => (
                <li key={idx}>• {change}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="settings-section">
        <h3>❓ Help & Support</h3>
        <div className="help-links">
          <a href="#faq" className="help-link">📖 FAQ</a>
          <a href="#docs" className="help-link">📚 Documentation</a>
          <a href="#feedback" className="help-link">💬 Send Feedback</a>
          <a href="#report" className="help-link">🐛 Report Issue</a>
        </div>
      </section>

      <button className="btn-primary" onClick={() => onNavigate('dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Settings;
