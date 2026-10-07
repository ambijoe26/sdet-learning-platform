import React from 'react';
import { sdetCurriculum } from '../data/curriculum';
import '../styles/ModuleView.css';

interface ModuleViewProps {
  moduleId: string;
  onNavigate: (view: string, moduleId?: string, lessonId?: string) => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ moduleId, onNavigate }) => {
  const module = sdetCurriculum.modules.find(m => m.id === moduleId);

  if (!module) {
    return <div className="error-message">Module not found</div>;
  }

  return (
    <div className="module-view">
      <div className="module-header">
        <button className="btn-back" onClick={() => onNavigate('course')}>← Back to Course</button>
        <h2>{module.title}</h2>
        <p>{module.description}</p>
      </div>

      <div className="module-content">
        {/* Lessons Section */}
        <section className="lessons-section">
          <h3>📖 Lessons ({module.lessons.length})</h3>
          <div className="lessons-list">
            {module.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="lesson-item"
                onClick={() => onNavigate('lesson', moduleId, lesson.id)}
              >
                <div className="lesson-number">{idx + 1}</div>
                <div className="lesson-info">
                  <h4>{lesson.title}</h4>
                  <p>{lesson.description}</p>
                  <div className="lesson-meta">
                    <span>⏱️ {lesson.estimatedTime} min</span>
                    <span>✏️ {lesson.exercises.length} exercises</span>
                    {lesson.quiz && <span>📝 Quiz included</span>}
                  </div>
                </div>
                <span className="lesson-arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <h3>🚀 Projects ({module.projects.length})</h3>
          <div className="projects-list">
            {module.projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <span className={`difficulty-badge ${project.difficulty}`}>
                    {project.difficulty}
                  </span>
                </div>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>⏱️ {project.estimatedTime} hours</span>
                  <span>✓ {project.requirements.length} requirements</span>
                </div>
                <button className="btn-start-project">Start Project →</button>
              </div>
            ))}
          </div>
        </section>

        {/* Module Stats */}
        <section className="module-stats">
          <h3>📊 Module Stats</h3>
          <div className="stats-container">
            <div className="stat">
              <span className="stat-label">Total Lessons</span>
              <span className="stat-value">{module.lessons.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Exercises</span>
              <span className="stat-value">{module.lessons.reduce((sum, l) => sum + l.exercises.length, 0)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Estimated Hours</span>
              <span className="stat-value">{module.estimatedHours}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Projects</span>
              <span className="stat-value">{module.projects.length}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModuleView;
