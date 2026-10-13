import React, { useState, useEffect } from 'react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';
import ModuleView from './pages/ModuleView';
import LessonView from './pages/LessonView';
import Settings from './pages/Settings';
import { User } from './types';
import './styles/App.css';

type CurrentView = 'dashboard' | 'course' | 'module' | 'lesson' | 'settings';

interface ViewState {
  view: CurrentView;
  moduleId?: string;
  lessonId?: string;
}

const appVersion = '1.0.0';

const AppContent: React.FC = () => {
  const { user, setUser } = useProgress();
  const [viewState, setViewState] = useState<ViewState>({ view: 'dashboard' });

  useEffect(() => {
    // Check for user on mount
    if (!user) {
      const newUser: User = {
        id: 'user-' + Date.now(),
        name: 'SDET Learner',
        email: 'sdet@example.com',
        experienceLevel: 'intermediate',
        yearsOfExperience: 8,
        joinedDate: new Date()
      };
      setUser(newUser);
    }
  }, [user, setUser]);

  const navigate = (view: CurrentView, moduleId?: string, lessonId?: string) => {
    setViewState({ view, moduleId, lessonId });
  };

  const renderContent = () => {
    switch (viewState.view) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'course':
        return <CourseView onNavigate={navigate} />;
      case 'module':
        return <ModuleView moduleId={viewState.moduleId || ''} onNavigate={navigate} />;
      case 'lesson':
        return <LessonView lessonId={viewState.lessonId || ''} moduleId={viewState.moduleId} onNavigate={navigate} />;
      case 'settings':
        return <Settings onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">🚀 Sr. SDET Learning Platform</h1>
          <span className="version-badge">v{appVersion}</span>
        </div>
        <nav className="app-nav">
          <button
            className={`nav-btn ${viewState.view === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigate('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-btn ${viewState.view === 'course' ? 'active' : ''}`}
            onClick={() => navigate('course')}
          >
            📚 Course
          </button>
          <button
            className={`nav-btn ${viewState.view === 'settings' ? 'active' : ''}`}
            onClick={() => navigate('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>
      </header>

      <main className="app-main">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>Sr. SDET Interview Preparation | Version {appVersion} | Last Updated: Oct 7, 2026</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
          <a href="#feedback">Feedback</a>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
};

export default App;
