import React from 'react';
import { sdetCurriculum } from '../data/curriculum';
import '../styles/CourseView.css';

interface CourseViewProps {
  onNavigate: (view: string, moduleId?: string) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ onNavigate }) => {
  return (
    <div className="course-view">
      <div className="course-header">
        <h2>{sdetCurriculum.title}</h2>
        <p className="course-description">{sdetCurriculum.description}</p>
      </div>

      <section className="course-section">
        <h3>📚 Course Modules</h3>
        <div className="modules-grid">
          {sdetCurriculum.modules.map((module) => (
            <div
              key={module.id}
              className="module-card"
              onClick={() => onNavigate('module', module.id)}
            >
              <div className="module-icon">{module.icon}</div>
              <h4>{module.title}</h4>
              <p>{module.description}</p>
              <div className="module-meta">
                <span>📖 {module.lessons.length} lessons</span>
                <span>🚀 {module.projects.length} projects</span>
                <span>⏱️ {module.estimatedHours}h</span>
              </div>
              <div className="module-skills">
                {module.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
              <button className="btn-start">Start Module →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="course-section">
        <h3>🎯 Learning Outcomes</h3>
        <ul className="outcomes-list">
          {sdetCurriculum.learningOutcomes.map((outcome, idx) => (
            <li key={idx}>✓ {outcome}</li>
          ))}
        </ul>
      </section>

      <section className="course-section">
        <h3>🏢 Target Companies</h3>
        <div className="companies-list">
          {sdetCurriculum.targetCompanies.map((company, idx) => (
            <span key={idx} className="company-badge">{company}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseView;
