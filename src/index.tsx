import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';
import './styles/Dashboard.css';
import './styles/CourseView.css';
import './styles/ModuleView.css';
import './styles/LessonView.css';
import './styles/Settings.css';
import './styles/Components.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
