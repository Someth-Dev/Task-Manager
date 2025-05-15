import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import About from './components/About';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [language, setLanguage] = useState('km'); // Default to Khmer
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Task Manager</Link>
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">Dashboard</Link>
            <Link className="nav-link" to="/tasks">Tasks</Link>
            <Link className="nav-link" to="/about">About</Link>
          </div>
          <div className="d-flex align-items-center">
            <select
              className="form-select me-2"
              style={{ width: '120px' }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="km">ខ្មែរ</option>
            </select>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard language={language} darkMode={darkMode} />} />
        <Route
          path="/tasks"
          element={<TaskManager language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/about"
          element={<About language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </Router>
  );
};

export default App;