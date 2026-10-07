import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Progress, QuizScore, ProjectSubmission, User, Badge } from '../types';

interface ProgressContextType {
  user: User | null;
  progress: Progress | null;
  badges: Badge[];
  setUser: (user: User) => void;
  completeLesson: (lessonId: string) => void;
  completeExercise: (exerciseId: string) => void;
  submitQuiz: (quizId: string, score: number) => void;
  submitProject: (projectId: string, submission: ProjectSubmission) => void;
  updateProgress: (progress: Progress) => void;
  unlockBadge: (badge: Badge) => void;
  getOverallProgress: () => number;
  getWeakAreas: () => any[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressAction {
  type: string;
  payload?: any;
}

const initialProgress: Progress = {
  userId: '',
  courseId: 'sr-sdet-5month',
  moduleProgress: [],
  lessonsCompleted: [],
  exercisesCompleted: [],
  quizScores: [],
  projectsSubmitted: [],
  overallProgress: 0,
  lastUpdated: new Date(),
  totalTimeSpent: 0
};

const progressReducer = (state: Progress, action: ProgressAction): Progress => {
  switch (action.type) {
    case 'COMPLETE_LESSON': {
      const updatedLessons = [...new Set([...state.lessonsCompleted, action.payload])];
      return {
        ...state,
        lessonsCompleted: updatedLessons,
        lastUpdated: new Date(),
        overallProgress: calculateProgress(updatedLessons, state.exercisesCompleted, state.projectsSubmitted)
      };
    }
    case 'COMPLETE_EXERCISE': {
      const updatedExercises = [...new Set([...state.exercisesCompleted, action.payload])];
      return {
        ...state,
        exercisesCompleted: updatedExercises,
        lastUpdated: new Date(),
        overallProgress: calculateProgress(state.lessonsCompleted, updatedExercises, state.projectsSubmitted)
      };
    }
    case 'SUBMIT_QUIZ': {
      const existingScore = state.quizScores.find(q => q.quizId === action.payload.quizId);
      const newScore: QuizScore = {
        quizId: action.payload.quizId,
        score: action.payload.score,
        attemptCount: existingScore ? existingScore.attemptCount + 1 : 1,
        bestScore: existingScore ? Math.max(existingScore.bestScore, action.payload.score) : action.payload.score,
        lastAttempted: new Date()
      };
      const updatedScores = existingScore
        ? state.quizScores.map(q => q.quizId === action.payload.quizId ? newScore : q)
        : [...state.quizScores, newScore];
      return {
        ...state,
        quizScores: updatedScores,
        lastUpdated: new Date()
      };
    }
    case 'SUBMIT_PROJECT': {
      return {
        ...state,
        projectsSubmitted: [...state.projectsSubmitted, action.payload],
        lastUpdated: new Date()
      };
    }
    case 'UPDATE_PROGRESS': {
      return action.payload;
    }
    case 'SET_TIME_SPENT': {
      return {
        ...state,
        totalTimeSpent: action.payload,
        lastUpdated: new Date()
      };
    }
    default:
      return state;
  }
};

export function calculateProgress(
  lessonsCompleted: string[],
  exercisesCompleted: string[],
  projectsSubmitted: ProjectSubmission[]
): number {
  // Import curriculum to get actual counts
  const { sdetCurriculum } = require('../data/curriculum');

  let totalLessons = 0;
  let totalExercises = 0;

  sdetCurriculum.modules.forEach((module: any) => {
    totalLessons += module.lessons.length;
    module.lessons.forEach((lesson: any) => {
      totalExercises += lesson.exercises.length;
    });
  });

  const totalProjects = sdetCurriculum.modules.reduce((sum: number, m: any) => sum + m.projects.length, 0);
  const totalItems = totalLessons + totalExercises + totalProjects;

  const completedItems = lessonsCompleted.length + exercisesCompleted.length + projectsSubmitted.length;
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, dispatch] = useReducer(progressReducer, initialProgress);
  const [user, setUserState] = React.useState<User | null>(null);
  const [badges, setBadges] = React.useState<Badge[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('sdet-progress');
    const savedUser = localStorage.getItem('sdet-user');

    if (savedProgress) {
      try {
        dispatch({ type: 'UPDATE_PROGRESS', payload: JSON.parse(savedProgress) });
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Fix date deserialization
        if (parsedUser.joinedDate && typeof parsedUser.joinedDate === 'string') {
          parsedUser.joinedDate = new Date(parsedUser.joinedDate);
        }
        setUserState(parsedUser);
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress.userId) {
      localStorage.setItem('sdet-progress', JSON.stringify(progress));
    }
  }, [progress]);

  // Save user to localStorage (with date serialization fix)
  useEffect(() => {
    if (user) {
      const userWithSerializedDate = {
        ...user,
        joinedDate: user.joinedDate instanceof Date ? user.joinedDate.toISOString() : user.joinedDate
      };
      localStorage.setItem('sdet-user', JSON.stringify(userWithSerializedDate));
    }
  }, [user]);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    dispatch({ type: 'UPDATE_PROGRESS', payload: { ...progress, userId: newUser.id } });
  };

  const completeLesson = (lessonId: string) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  };

  const completeExercise = (exerciseId: string) => {
    dispatch({ type: 'COMPLETE_EXERCISE', payload: exerciseId });
  };

  const submitQuiz = (quizId: string, score: number) => {
    dispatch({ type: 'SUBMIT_QUIZ', payload: { quizId, score } });
  };

  const submitProject = (projectId: string, submission: ProjectSubmission) => {
    dispatch({ type: 'SUBMIT_PROJECT', payload: submission });
  };

  const updateProgress = (newProgress: Progress) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: newProgress });
  };

  const unlockBadge = (badge: Badge) => {
    const newBadge = { ...badge, unlockedDate: new Date() };
    setBadges([...badges, newBadge]);
    localStorage.setItem('sdet-badges', JSON.stringify([...badges, newBadge]));
  };

  const getOverallProgress = () => progress.overallProgress;

  const getWeakAreas = () => {
    // This would analyze quiz scores and exercise performance
    // For now, return mock data
    return [];
  };

  const value: ProgressContextType = {
    user,
    progress,
    badges,
    setUser,
    completeLesson,
    completeExercise,
    submitQuiz,
    submitProject,
    updateProgress,
    unlockBadge,
    getOverallProgress,
    getWeakAreas
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
