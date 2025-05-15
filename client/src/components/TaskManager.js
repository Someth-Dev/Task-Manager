import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Khmer and English translations (same as provided)
const translations = {
  en: {
    title: "Task Manager",
    addTask: "Add Task",
    updateTask: "Update Task",
    cancel: "Cancel",
    taskTitle: "Title",
    description: "Description",
    status: "Status",
    priority: "Priority",
    dueDate: "Due Date",
    category: "Category",
    progress: "Progress (%)",
    selectCategory: "Select Category",
    pending: "Pending",
    completed: "Completed",
    low: "Low",
    medium: "Medium",
    high: "High",
    manageReminders: "Manage Reminders",
    addReminder: "Add Reminder",
    shareTask: "Share Task",
    shareWithEmail: "Share with email",
    share: "Share",
    searchByTitle: "Search by title",
    filterByStatus: "Filter by Status:",
    all: "All",
    sortByPriority: "Sort by Priority:",
    none: "None",
    lowToHigh: "Low to High",
    highToLow: "High to Low",
    id: "ID",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    confirmDelete: "Are you sure?"
  },
  km: {
    title: "កម្មវិធីគ្រប់គ្រងភារកិច្ច",
    addTask: "បន្ថែមភារកិច្ច",
    updateTask: "ធ្វើបច្ចុប្បន្នភាពភារកិច្ច",
    cancel: "បោះបង់",
    taskTitle: "ចំណងជើង",
    description: "ការពិពណ៌នា",
    status: "ស្ថានភាព",
    priority: "អាទិភាព",
    dueDate: "កាលបរិច្ឆេទកំណត់",
    category: "ប្រភេទ",
    progress: "ដំណើរការ (%)",
    selectCategory: "ជ្រើសរើសប្រភេទ",
    pending: "កំពុងរង់ចាំ",
    completed: "បានបញ្ចប់",
    low: "ទាប",
    medium: "មធ្យម",
    high: "ខ្ពស់",
    manageReminders: "គ្រប់គ្រងការរំលឹក",
    addReminder: "បន្ថែមការរំលឹក",
    shareTask: "ចែករំលែកភារកិច្ច",
    shareWithEmail: "ចែករំលែកតាមអ៊ីមែល",
    share: "ចែករំលែក",
    searchByTitle: "ស្វែងរកតាមចំណងជើង",
    filterByStatus: "តម្រៀបតាមស្ថានភាព៖",
    all: "ទាំងអស់",
    sortByPriority: "តម្រៀបតាមPriority៖",
    none: "គ្មាន",
    lowToHigh: "ពីទាបទៅខ្ពស់",
    highToLow: "ពីខ្ពស់ទៅទាប",
    id: "លេខសម្គាល់",
    actions: "សកម្មភាព",
    edit: "កែប្រែ",
    delete: "លុប",
    previous: "ក្រោយ",
    next: "បន្ទាប់",
    page: "ទំព័រ",
    of: "នៃ",
    confirmDelete: "តើអ្នកប្រាកដទេ?"
  }
};

// Task Form Component
const TaskForm = ({ editId, title, description, status, priority, dueDate, categoryId, progress, categories, handleSubmit, resetForm, t, loading, setTitle, setDescription, setStatus, setPriority, setDueDate, setCategoryId, setProgress }) => (
  <div className="card mb-4">
    <div className="card-header">
      <h5 className="card-title mb-0">{editId ? t.updateTask : t.addTask}</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t.taskTitle}</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">{t.description}</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
        <div className="mb-3">
          <label className="form-label">{t.status}</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">{t.pending}</option>
            <option value="Completed">{t.completed}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t.priority}</label>
          <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">{t.low}</option>
            <option value="Medium">{t.medium}</option>
            <option value="High">{t.high}</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t.dueDate}</label>
          <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">{t.category}</label>
          <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">{t.selectCategory}</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">{t.progress}</label>
          <input type="range" className="form-range" value={progress} onChange={(e) => setProgress(e.target.value)} min="0" max="100" />
          <div className="progress">
            <div className={`progress-bar ${getProgressBarColor(progress)}`} style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              {progress}%
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
            {editId ? t.updateTask : t.addTask}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>{t.cancel}</button>
          )}
        </div>
      </form>
    </div>
  </div>
);

// Reminder Manager Component
const ReminderManager = ({ taskId, reminders, newReminder, setNewReminder, handleAddReminder, t, language }) => (
  <div className="card mb-4">
    <div className="card-header">
      <h5 className="card-title mb-0">{t.manageReminders}</h5>
    </div>
    <div className="card-body">
      <div className="input-group mb-2">
        <input type="datetime-local" className="form-control" value={newReminder} onChange={(e) => setNewReminder(e.target.value)} />
        <button className="btn btn-outline-primary" onClick={() => handleAddReminder(taskId)}>{t.addReminder}</button>
      </div>
      <ul className="list-group">
        {reminders[taskId]?.map(reminder => (
          <li key={reminder.id} className="list-group-item">
            {new Date(reminder.reminder_date).toLocaleString(language === 'km' ? 'km-KH' : 'en-US')}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Share Manager Component
const ShareManager = ({ taskId, shares, shareEmail, setShareEmail, handleShareTask, t, language }) => (
  <div className="card mb-4">
    <div className="card-header">
      <h5 className="card-title mb-0">{t.shareTask}</h5>
    </div>
    <div className="card-body">
      <div className="input-group mb-2">
        <input type="email" className="form-control" placeholder={t.shareWithEmail} value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} />
        <button className="btn btn-outline-primary" onClick={() => handleShareTask(taskId)}>{t.share}</button>
      </div>
      <ul className="list-group">
        {shares[taskId]?.map(share => (
          <li key={share.id} className="list-group-item">
            {share.email} ({language === 'km' ? 'បានចែករំលែក៖' : 'Shared:'} {new Date(share.shared_at).toLocaleString(language === 'km' ? 'km-KH' : 'en-US')})
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Task Table Component
const TaskTable = ({ filteredTasks, handleEdit, handleDelete, t }) => (
  <div className="table-responsive">
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{t.id}</th>
          <th>{t.taskTitle}</th>
          <th>{t.description}</th>
          <th>{t.status}</th>
          <th>{t.priority}</th>
          <th>{t.dueDate}</th>
          <th>{t.category}</th>
          <th>{t.progress}</th>
          <th>{t.actions}</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map(task => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td><span className={getStatusBadgeClass(task.status)}>{task.status === 'Pending' ? t.pending : t.completed}</span></td>
            <td><span className={getPriorityBadgeClass(task.priority)}>{task.priority === 'Low' ? t.low : task.priority === 'Medium' ? t.medium : t.high}</span></td>
            <td>{task.due_date}</td>
            <td>{task.category_name}</td>
            <td>
              <div className="progress" style={{ height: '15px' }}>
                <div className={`progress-bar ${getProgressBarColor(task.progress)}`} style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin="0" aria-valuemax="100">
                  {task.progress}%
                </div>
              </div>
            </td>
            <td>
              <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(task)}>{t.edit}</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>{t.delete}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Utility Functions
const getProgressBarColor = (progress) => {
  if (progress < 30) return 'bg-danger';
  if (progress < 70) return 'bg-warning';
  return 'bg-success';
};

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'High': return 'badge bg-danger';
    case 'Medium': return 'badge bg-warning text-dark';
    default: return 'badge bg-info text-dark';
  }
};

const getStatusBadgeClass = (status) => {
  return status === 'Completed' ? 'badge bg-success' : 'badge bg-secondary';
};

// Main Component
const TaskManager = ({ language = 'km', darkMode = false }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reminders, setReminders] = useState({});
  const [shares, setShares] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [progress, setProgress] = useState(0);
  const [newReminder, setNewReminder] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortPriority, setSortPriority] = useState('None');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const validLanguage = translations[language] ? language : 'km';
  const t = translations[validLanguage];

  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, [page, search]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const fetchCategories = async () => {
  try {
    setLoading(true);
    const response = await axios.get('https://task-manager-backend.free.nf/api/categories.php');
    setCategories(response.data);
  } catch (err) {
    setError('Failed to fetch categories');
  } finally {
    setLoading(false);
  }
};

const fetchTasks = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`https://task-manager-backend.free.nf/api/index.php?page=${page}&search=${search}`);
    setTasks(response.data.tasks);
    setTotalPages(Math.ceil(response.data.total / response.data.limit));
  } catch (err) {
    setError('Failed to fetch tasks');
  } finally {
    setLoading(false);
  }
};

const fetchReminders = async (taskId) => {
  try {
    const response = await axios.get(`https://task-manager-backend.free.nf/api/reminders.php?task_id=${taskId}`);
    setReminders(prev => ({ ...prev, [taskId]: response.data }));
  } catch (err) {
    setError('Failed to fetch reminders');
  }
};

const fetchShares = async (taskId) => {
  try {
    const response = await axios.get(`https://task-manager-backend.free.nf/api/shares.php?task_id=${taskId}`);
    setShares(prev => ({ ...prev, [taskId]: response.data }));
  } catch (err) {
    setError('Failed to fetch shares');
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const task = { title, description, status, priority, due_date: dueDate, category_id: categoryId, progress };
    if (editId) {
      await axios.put('https://task-manager-backend.free.nf/api/index.php', { id: editId, ...task });
      showNotification(`${t.taskTitle} ${title} ${language === 'km' ? 'បានធ្វើបច្ចុប្បន្នភាព' : 'updated successfully'}`, 'success');
      setEditId(null);
    } else {
      await axios.post('https://task-manager-backend.free.nf/api/index.php', task);
      showNotification(`${t.taskTitle} ${title} ${language === 'km' ? 'បានបន្ថែម' : 'added successfully'}`, 'success');
    }
    resetForm();
    fetchTasks();
  } catch (err) {
    setError('Failed to save task');
  } finally {
    setLoading(false);
  }
};

const handleAddReminder = async (taskId) => {
  if (!newReminder) return;
  try {
    await axios.post('https://task-manager-backend.free.nf/api/reminders.php', { task_id: taskId, reminder_date: newReminder });
    setNewReminder('');
    fetchReminders(taskId);
    showNotification(language === 'km' ? 'បានបន្ថែមការរំលឹក' : 'Reminder added successfully', 'success');
  } catch (err) {
    setError('Failed to add reminder');
  }
};

const handleShareTask = async (taskId) => {
  if (!shareEmail) return;
  try {
    await axios.post('https://task-manager-backend.free.nf/api/shares.php', { task_id: taskId, email: shareEmail });
    setShareEmail('');
    fetchShares(taskId);
    showNotification(language === 'km' ? 'បានចែករំលែកភារកិច្ច' : 'Task shared successfully', 'success');
  } catch (err) {
    setError('Failed to share task');
  }
};

const handleDelete = async (id) => {
  if (!window.confirm(t.confirmDelete)) return;
  try {
    await axios.delete('https://task-manager-backend.free.nf/api/index.php', { data: { id } });
    fetchTasks();
    showNotification(language === 'km' ? 'បានលុបភារកិច្ច' : 'Task deleted successfully', 'success');
  } catch (err) {
    setError('Failed to delete task');
  }
};
const handleEdit = (task) => {
  setTitle(task.title);
  setDescription(task.description);
  setStatus(task.status);
  setPriority(task.priority);
  setDueDate(task.due_date);
  setCategoryId(task.category_id);
  setProgress(task.progress);
  setEditId(task.id);
  fetchReminders(task.id);
  fetchShares(task.id);
};
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setPriority('Low');
    setDueDate('');
    setCategoryId('');
    setProgress(0);
    setNewReminder('');
    setShareEmail('');
    setEditId(null);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const filteredTasks = tasks
    .filter(task => filterStatus === 'All' || task.status === filterStatus)
    .sort((a, b) => {
      if (sortPriority === 'None') return 0;
      const order = { Low: 1, Medium: 2, High: 3 };
      return sortPriority === 'Asc' ? order[a.priority] - order[b.priority] : order[b.priority] - order[a.priority];
    });

  return (
    <div className={`container mt-4 ${darkMode ? 'dark-mode' : ''}`} style={{ fontFamily: "'Hanuman', 'Khmer OS', sans-serif" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanuman:wght@300;400;700&display=swap');
        body {
          transition: background-color 0.3s, color 0.3s;
        }
        .dark-mode {
          background-color: #121212;
          color: #e0e0e0;
        }
        .dark-mode .card {
          background-color: #1e1e1e;
          border-color: #333;
        }
        .dark-mode .card-header,
        .dark-mode .card-footer {
          background-color: #252525;
          border-color: #333;
        }
        .dark-mode .table {
          color: #e0e0e0;
        }
        .dark-mode .table-hover tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.075);
        }
        .dark-mode .form-control,
        .dark-mode .form-select {
          background-color: #333;
          border-color: #555;
          color: #e0e0e0;
        }
        .dark-mode .input-group-text {
          background-color: #444;
          border-color: #555;
          color: #e0e0e0;
        }
        .dark-mode .list-group-item {
          background-color: #333;
          border-color: #444;
          color: #e0e0e0;
        }
      `}</style>

      {notification.show && (
        <div className={`alert alert-${notification.type} alert-dismissible fade show`}>
          {notification.message}
          <button type="button" className="btn-close" onClick={() => setNotification({ show: false, message: '', type: '' })}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <TaskForm
            editId={editId}
            title={title}
            description={description}
            status={status}
            priority={priority}
            dueDate={dueDate}
            categoryId={categoryId}
            progress={progress}
            categories={categories}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            t={t}
            loading={loading}
            setTitle={setTitle}
            setDescription={setDescription}
            setStatus={setStatus}
            setPriority={setPriority}
            setDueDate={setDueDate}
            setCategoryId={setCategoryId}
            setProgress={setProgress}
          />

          {editId && (
            <>
              <ReminderManager
                taskId={editId}
                reminders={reminders}
                newReminder={newReminder}
                setNewReminder={setNewReminder}
                handleAddReminder={handleAddReminder}
                t={t}
                language={language}
              />
              <ShareManager
                taskId={editId}
                shares={shares}
                shareEmail={shareEmail}
                setShareEmail={setShareEmail}
                handleShareTask={handleShareTask}
                t={t}
                language={language}
              />
            </>
          )}
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-3">{t.title}</h5>
              <div className="row g-3">
                <div className="col-md-5">
                  <input type="text" className="form-control" placeholder={t.searchByTitle} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <span className="input-group-text">{t.filterByStatus}</span>
                    <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="All">{t.all}</option>
                      <option value="Pending">{t.pending}</option>
                      <option value="Completed">{t.completed}</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text">{t.sortByPriority}</span>
                    <select className="form-select" value={sortPriority} onChange={(e) => setSortPriority(e.target.value)}>
                      <option value="None">{t.none}</option>
                      <option value="Asc">{t.lowToHigh}</option>
                      <option value="Desc">{t.highToLow}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredTasks.length > 0 ? (
                <TaskTable filteredTasks={filteredTasks} handleEdit={handleEdit} handleDelete={handleDelete} t={t} />
              ) : (
                <div className="text-center py-4">
                  <p>{language === 'km' ? 'មិនមានភារកិច្ចទេ' : 'No tasks found'}</p>
                </div>
              )}
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary" disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>{t.previous}</button>
                <span>{t.page} {page} {t.of} {totalPages}</span>
                <button className="btn btn-secondary" disabled={page === totalPages || loading} onClick={() => setPage(page + 1)}>{t.next}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskManager.propTypes = {
  language: PropTypes.oneOf(['en', 'km']),
  darkMode: PropTypes.bool,
};

export default TaskManager;