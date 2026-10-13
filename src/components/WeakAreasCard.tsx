import React, { useMemo } from 'react';
import { useProgress } from '../context/ProgressContext';
import { sdetCurriculum } from '../data/curriculum';

const colorFor = (percent: number) => {
  if (percent < 35) return '#e53e3e';
  if (percent < 70) return '#ed8936';
  return '#48bb78';
};

const WeakAreasCard: React.FC = () => {
  const { progress } = useProgress();

  const focusAreas = useMemo(() => {
    const completed = new Set(progress?.lessonsCompleted ?? []);

    return sdetCurriculum.modules
      .map((module) => {
        const total = module.lessons.length;
        const done = module.lessons.filter((lesson) => completed.has(lesson.id)).length;
        return {
          id: module.id,
          topic: module.title,
          done,
          total,
          percent: total === 0 ? 0 : Math.round((done / total) * 100)
        };
      })
      .filter((area) => area.done > 0 && area.done < area.total)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);
  }, [progress]);

  if (focusAreas.length === 0) {
    return (
      <div className="weak-areas-card">
        <p className="no-data">No focus areas yet. Start a lesson and your in-progress modules will appear here.</p>
      </div>
    );
  }

  return (
    <div className="weak-areas-card">
      <div className="weak-areas-list">
        {focusAreas.map((area) => {
          const color = colorFor(area.percent);
          return (
            <div key={area.id} className="weak-area-item">
              <div className="area-header">
                <span className="area-topic">{area.topic}</span>
                <span className="area-accuracy" style={{ color }}>
                  {area.percent}%
                </span>
              </div>
              <div className="area-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${area.percent}%`, backgroundColor: color }} />
                </div>
              </div>
              <p className="area-recommendation">
                📖 {area.done} of {area.total} lessons done, {area.total - area.done} left
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeakAreasCard;
