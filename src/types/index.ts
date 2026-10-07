// Core Types for SDET Learning Platform

export interface User {
  id: string;
  name: string;
  email: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  yearsOfExperience: number;
  joinedDate: Date;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  objectives: string[];
  content: string; // markdown
  codeExample: string; // executable code
  codeExplanation: string; // detailed breakdown
  testCase?: TestCase;
  bonusChallenge?: string;
  resources: Resource[];
  tags: string[];
}

export interface TestCase {
  input?: any;
  expectedOutput?: any;
  description: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswers: number[]; // indices
  explanation: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in hours
  requirements: string[];
  resources: Resource[];
  rubric: ProjectRubric;
}

export interface ProjectRubric {
  criteria: RubricCriteria[];
  totalPoints: number;
}

export interface RubricCriteria {
  name: string;
  description: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  content: string; // markdown
  exercises: Exercise[];
  quiz?: Quiz;
  relatedLessons: string[]; // lesson IDs
  learningOutcomes: string[];
  estimatedTime: number; // in minutes
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  month: number;
  weeks: number;
  lessons: Lesson[];
  projects: Project[];
  estimatedHours: number;
  prerequisites: string[]; // module IDs
  skills: string[];
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalDurationWeeks: number;
  targetRole: string;
  modules: Module[];
  learningOutcomes: string[];
  targetCompanies: string[];
}

export interface Progress {
  userId: string;
  courseId: string;
  moduleProgress: ModuleProgress[];
  lessonsCompleted: string[]; // lesson IDs
  exercisesCompleted: string[]; // exercise IDs
  quizScores: QuizScore[];
  projectsSubmitted: ProjectSubmission[];
  overallProgress: number; // percentage
  lastUpdated: Date;
  totalTimeSpent: number; // in hours
}

export interface ModuleProgress {
  moduleId: string;
  lessonsCompleted: number;
  totalLessons: number;
  progress: number; // percentage
  completedDate?: Date;
  timeSpent: number; // in hours
}

export interface QuizScore {
  quizId: string;
  score: number; // percentage
  attemptCount: number;
  bestScore: number;
  lastAttempted: Date;
}

export interface ProjectSubmission {
  projectId: string;
  submissionDate: Date;
  status: 'submitted' | 'reviewing' | 'approved' | 'revision-needed';
  score?: number;
  feedback?: string;
  repositoryLink?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'article' | 'video' | 'tool';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  unlockedDate?: Date;
}

export interface WeakArea {
  topic: string;
  accuracy: number; // percentage
  recommendedExercises: string[]; // exercise IDs
  estimatedTimeToMastery: number; // in hours
}

export interface DashboardStats {
  totalProgress: number;
  moduleProgress: ModuleProgress[];
  weakAreas: WeakArea[];
  earnedBadges: Badge[];
  timeSpentThisWeek: number;
  completedExercises: number;
  totalExercises: number;
  upcomingDue: {
    module: string;
    dueDate: Date;
  }[];
}

export interface AppVersion {
  version: string;
  releaseDate: Date;
  changes: string[];
  features: string[];
  bugFixes: string[];
}

export interface ShareableLink {
  id: string;
  userId: string;
  courseId: string;
  link: string;
  createdDate: Date;
  expiresDate?: Date;
  accessType: 'view' | 'collaborate' | 'admin';
}
