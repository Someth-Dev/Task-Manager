import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Translations for English and Khmer
const translations = {
  en: {
    dashboard: "Dashboard",
    totalTasks: "Total Tasks",
    pendingTasks: "Pending Tasks",
    completedTasks: "Completed Tasks",
    averageProgress: "Average Progress",
    refreshData: "Refresh Data",
    taskProgress: "Task Progress",
    dataFetchError: "Error fetching data"
  },
  km: {
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
    totalTasks: "កិច្ចការសរុប",
    pendingTasks: "កិច្ចការកំពុងរង់ចាំ",
    completedTasks: "កិច្ចការបានបញ្ចប់",
    averageProgress: "វឌ្ឍនភាពជាមធ្យម",
    refreshData: "បន្ទាន់សម័យ",
    taskProgress: "វឌ្ឍនភាពកិច្ចការ",
    dataFetchError: "បញ្ហាក្នុងការទាញយកទិន្នន័យ"
  }
};

// Reusable Card Component
const StatCard = ({ color, icon, title, value, loading }) => (
  <div className="col-md-3">
    <div className={`card text-center p-3 mb-3 border-${color}`}>
      <div
        className={`bg-${color}-light p-3 rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3`}
        style={{ width: '60px', height: '60px' }}
      >
        <i className={`${icon} fs-3 text-${color}`}></i>
      </div>
      <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
      <p className="display-4 mb-0">{loading ? '-' : value}</p>
    </div>
  </div>
);

const Dashboard = ({ language = 'km', darkMode = false }) => {
  const validLanguage = translations[language] ? language : 'km';
  const t = translations[validLanguage];

  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    averageProgress: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
  try {
    setLoading(true);
    const response = await fetch('https://task-manager-backend.free.nf/api/?page=1&search=');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const tasks = data.tasks;
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const averageProgress = tasks.length
      ? (tasks.reduce((sum, task) => sum + parseFloat(task.progress), 0) / tasks.length).toFixed(1)
      : 0;

    setStats({ totalTasks, pendingTasks, completedTasks, averageProgress });
    setLoading(false);
  } catch (err) {
    console.error("Error fetching data:", err);
    setError(err.message);
    // Fallback data
    setStats({
      totalTasks: 24,
      pendingTasks: 10,
      completedTasks: 14,
      averageProgress: 58.5
    });
    setLoading(false);
  }
};

  const cardColors = ["primary", "warning", "success", "info"];
  const icons = ["bi-list-check", "bi-hourglass-split", "bi-check-circle", "bi-graph-up"];
  const statKeys = ["totalTasks", "pendingTasks", "completedTasks", "averageProgress"];

  return (
    <div className={`container mt-5 ${darkMode ? 'dark-mode' : ''}`} style={{ fontFamily: "'Hanuman', 'Khmer OS', sans-serif" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanuman:wght@300;400;700&display=swap');
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
        .card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .bg-primary-light { background-color: rgba(13, 110, 253, 0.1); }
        .bg-success-light { background-color: rgba(25, 135, 84, 0.1); }
        .bg-warning-light { background-color: rgba(255, 193, 7, 0.1); }
        .bg-info-light { background-color: rgba(13, 202, 240, 0.1); }
        .dark-mode {
          background-color: #121212;
          color: #e0e0e0;
        }
        .dark-mode .card {
          background-color: #1e1e1e;
          border-color: #333;
        }
        .dark-mode .card:hover {
          box-shadow: 0 10px 20px rgba(255,255,255,0.1);
        }
        .dark-mode .alert {
          background-color: #5c2d2d;
          color: #e0e0e0;
        }
        .dark-mode .progress {
          background-color: #333;
        }
        .dark-mode .bg-primary-light,
        .dark-mode .bg-success-light,
        .dark-mode .bg-warning-light,
        .dark-mode .bg-info-light {
          filter: brightness(0.7);
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0" style={{ fontWeight: 'bold' }}>{t.dashboard}</h2>
        <button
          onClick={fetchStats}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <i className="bi bi-arrow-clockwise me-2"></i>
          )}
          {t.refreshData}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {t.dataFetchError}: {error}
        </div>
      )}

      <div className="row">
        {statKeys.map((key, index) => (
          <StatCard
            key={key}
            color={cardColors[index]}
            icon={icons[index]}
            title={t[key]}
            value={key === "averageProgress" ? `${stats[key]}%` : stats[key]}
            loading={loading}
          />
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card p-4">
            <h5 style={{ fontWeight: 'bold' }}>{t.taskProgress}</h5>
            <div className="mt-3">
              <div className="progress" style={{ height: '25px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${stats.averageProgress}%` }}
                  aria-valuenow={stats.averageProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {stats.averageProgress}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  language: PropTypes.oneOf(['en', 'km']),
  darkMode: PropTypes.bool
};

export default Dashboard;