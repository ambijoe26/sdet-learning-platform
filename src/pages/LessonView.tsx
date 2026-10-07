import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { sdetCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import CodeEditor from '../components/CodeEditor';
import '../styles/LessonView.css';

interface LessonViewProps {
  lessonId: string;
  moduleId?: string;
  onNavigate: (view: string, moduleId?: string, lessonId?: string) => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lessonId, moduleId, onNavigate }) => {
  const { completeLesson } = useProgress();
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // Find the lesson in curriculum
  let lesson = null;
  for (const module of sdetCurriculum.modules) {
    lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) break;
  }

  if (!lesson) {
    return <div className="error-message">Lesson not found</div>;
  }

  const handleCompleteLesson = () => {
    completeLesson(lessonId);
    setLessonCompleted(true);
  };

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <button className="btn-back" onClick={() => {
          if (moduleId) {
            onNavigate('module', moduleId);
          } else {
            onNavigate('course');
          }
        }}>← Back</button>
        <h2>{lesson.title}</h2>
      </div>

      <div className="lesson-content">
        {/* Main Content */}
        <section className="lesson-section">
          <div className="markdown-content">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="outcomes-section">
          <h3>🎯 Learning Outcomes</h3>
          <ul>
            {lesson.learningOutcomes.map((outcome, idx) => (
              <li key={idx}>✓ {outcome}</li>
            ))}
          </ul>
        </section>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <section className="exercises-section">
            <h3>✏️ Exercises ({lesson.exercises.length})</h3>
            <div className="exercises-list">
              {lesson.exercises.map((exercise, idx) => (
                <div key={exercise.id} className="exercise-card">
                  <div className="exercise-header">
                    <h4>{exercise.title}</h4>
                    <span className={`difficulty ${exercise.difficulty}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <p>{exercise.description}</p>
                  <div className="exercise-details">
                    <span>⏱️ {exercise.estimatedTime} min</span>
                    {exercise.testCase && <span>✓ Has test cases</span>}
                    {exercise.bonusChallenge && <span>⭐ Bonus challenge</span>}
                  </div>
                  <button className="btn-exercise" onClick={() => alert(`Exercise: ${exercise.title}\n\nOpen in your IDE to complete.`)}>
                    Try Exercise →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code Examples from Exercises */}
        {lesson.exercises.length > 0 && lesson.exercises[0].codeExample && (
          <section className="code-section">
            <h3>💻 Code Example</h3>
            <div className="code-example-intro">
              <p>{lesson.exercises[0].codeExplanation || 'Here is a working example:'}</p>
            </div>
            <CodeEditor
              initialCode={lesson.exercises[0].codeExample}
              readOnly={true}
              language={lesson.exercises[0].tags.includes('java') ? 'java' : 'javascript'}
            />
          </section>
        )}

        {/* Related Lessons */}
        {lesson.relatedLessons.length > 0 && (
          <section className="resources-section">
            <h3>📚 Related Lessons</h3>
            <ul>
              {lesson.relatedLessons.map((relId) => {
                let relatedLesson = null;
                for (const module of sdetCurriculum.modules) {
                  relatedLesson = module.lessons.find(l => l.id === relId);
                  if (relatedLesson) break;
                }
                return relatedLesson ? (
                  <li key={relId}>
                    <button
                      className="link-button"
                      onClick={() => onNavigate('lesson', moduleId, relId)}
                    >
                      → {relatedLesson.title}
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
          </section>
        )}

        {/* Complete Button */}
        <section className="completion-section">
          <button
            className={`btn-complete ${lessonCompleted ? 'completed' : ''}`}
            onClick={handleCompleteLesson}
            disabled={lessonCompleted}
          >
            {lessonCompleted ? '✓ Lesson Completed!' : 'Mark as Complete ✓'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default LessonView;
