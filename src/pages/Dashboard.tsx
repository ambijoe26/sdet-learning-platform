import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { sdetCurriculum } from '../data/curriculum';
import ProgressChart from '../components/ProgressChart';
import StatCard from '../components/StatCard';
import WeakAreasCard from '../components/WeakAreasCard';
import '../styles/Dashboard.css';

interface DashboardProps {
  onNavigate: (view: string, moduleId?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { progress, user } = useProgress();

  const curriculumStats = useMemo(() => {
    let totalLessons = 0;
    let totalExercises = 0;
    let totalProjects = 0;

    sdetCurriculum.modules.forEach((module) => {
      totalLessons += module.lessons.length;
      totalProjects += module.projects.length;
      module.lessons.forEach((lesson) => {
        totalExercises += lesson.exercises.length;
      });
    });

    return { totalLessons, totalExercises, totalProjects };
  }, []);

  const stats = useMemo(() => {
    if (!progress) {
      return {
        overallProgress: 0,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        quizzesCompleted: 0,
        projectsSubmitted: 0,
        timeSpent: 0
      };
    }

    return {
      overallProgress: progress.overallProgress,
      lessonsCompleted: progress.lessonsCompleted.length,
      exercisesCompleted: progress.exercisesCompleted.length,
      quizzesCompleted: progress.quizScores.length,
      projectsSubmitted: progress.projectsSubmitted.length,
      timeSpent: progress.totalTimeSpent
    };
  }, [progress]);

  const upcomingMilestones = [
    { module: 'Month 1: Java & Selenium', progress: stats.overallProgress, daysLeft: 21 },
    { module: 'Month 2: TestNG & Cucumber', progress: 0, daysLeft: 56 },
    { module: 'Month 3: API & CI/CD', progress: 0, daysLeft: 91 }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {user?.name}! 👋</h2>
          <p className="subtitle">You have {stats.overallProgress}% progress toward Sr. SDET mastery</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('course')}>
          Continue Learning →
        </button>
      </div>

      {/* Overall Progress */}
      <section className="dashboard-section">
        <h3 className="section-title">📊 Overall Progress</h3>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.overallProgress}%` }}
            />
          </div>
          <span className="progress-text">{stats.overallProgress}% Complete</span>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="dashboard-section">
        <h3 className="section-title">📈 Your Stats</h3>
        <div className="stats-grid">
          <StatCard
            title="Lessons Completed"
            value={stats.lessonsCompleted}
            total={curriculumStats.totalLessons}
            icon="📖"
            color="blue"
          />
          <StatCard
            title="Exercises Completed"
            value={stats.exercisesCompleted}
            total={curriculumStats.totalExercises}
            icon="✏️"
            color="green"
          />
          <StatCard
            title="Quizzes Passed"
            value={stats.quizzesCompleted}
            total={40}
            icon="📝"
            color="purple"
          />
          <StatCard
            title="Projects Submitted"
            value={stats.projectsSubmitted}
            total={curriculumStats.totalProjects}
            icon="🚀"
            color="orange"
          />
        </div>
      </section>

      {/* Weekly Activity */}
      <section className="dashboard-section">
        <h3 className="section-title">📅 Weekly Activity</h3>
        <ProgressChart />
      </section>

      {/* Weak Areas */}
      <section className="dashboard-section">
        <h3 className="section-title">🎯 Focus Areas</h3>
        <WeakAreasCard />
      </section>

      {/* Upcoming Milestones */}
      <section className="dashboard-section">
        <h3 className="section-title">🏁 Upcoming Milestones</h3>
        <div className="milestones-grid">
          {upcomingMilestones.map((milestone, idx) => (
            <div key={idx} className="milestone-card">
              <h4>{milestone.module}</h4>
              <div className="milestone-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                <span>{milestone.progress}%</span>
              </div>
              <p className="milestone-time">
                {milestone.daysLeft} days remaining
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h3 className="section-title">⚡ Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => onNavigate('course')}>
            Start Next Lesson →
          </button>
          <button className="action-btn" onClick={() => onNavigate('settings')}>
            View Progress Details
          </button>
          <button className="action-btn" onClick={() => alert('Share link: https://sdet.learn/share/user-123')}>
            Share Progress 📤
          </button>
          <button className="action-btn" onClick={() => alert('Resources: See documentation links in course')}>
            Browse Resources 📚
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
