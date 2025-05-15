import React from 'react';
import PropTypes from 'prop-types';

// Translations (same as before)
const translations = {
  en: {
    aboutUs: "About Us",
    developerInfo: "Developer Information",
    name: "Name",
    class: "Class",
    aboutWebsite: "About Our Website",
    overview: "Overview",
    keyFeatures: "Key Features",
    crudOperations: "CRUD Operations",
    searchPagination: "Search & Pagination",
    filteringSorting: "Filtering & Sorting",
    reminders: "Reminders",
    sharing: "Sharing",
    progressTracking: "Progress Tracking",
    dashboard: "Dashboard",
    profile: "Profile",
    aboutPage: "About Page",
    technicalDetails: "Technical Details",
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    deployment: "Deployment",
    purpose: "Purpose",
    allRightsReserved: "All Rights Reserved"
  },
  km: {
    aboutUs: "អំពីយើង",
    developerInfo: "ព័ត៌មានអ្នកអភិវឌ្ឍន៍",
    name: "ឈ្មោះ",
    class: "ថ្នាក់",
    aboutWebsite: "អំពីគេហទំព័ររបស់យើង",
    overview: "ទិដ្ឋភាពទូទៅ",
    keyFeatures: "លក្ខណៈពិសេស",
    crudOperations: "ប្រតិបត្តិការ CRUD",
    searchPagination: "ស្វែងរក និងទំព័រ",
    filteringSorting: "ការច្រោះ និងតម្រៀប",
    reminders: "ការរំលឹក",
    sharing: "ការចែករំលែក",
    progressTracking: "ការតាមដានដំណើរការ",
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
    profile: "ទម្រង់",
    aboutPage: "ទំព័រអំពី",
    technicalDetails: "ព័ត៌មានបច្ចេកទេស",
    frontend: "ផ្នែកខាងមុខ",
    backend: "ផ្នែកខាងក្រោយ",
    database: "មូលដ្ឋានទិន្នន័យ",
    deployment: "ការដាក់ឲ្យប្រើប្រាស់",
    purpose: "គោលបំណង",
    allRightsReserved: "រក្សាសិទ្ធិគ្រប់យ៉ាង"
  }
};

// Translation helper
const getTranslatedText = (t, key, language) => {
  const texts = {
    aboutWebsite: {
      en: 'Welcome to our Task Management System! This web application is designed to help you organize and manage your tasks efficiently. With features like task creation, categorization, progress tracking, reminders, and sharing, it aims to boost productivity and keep your tasks on track. Built with React.js for a dynamic frontend and PHP/MySQL for a robust backend, this system is perfect for students, professionals, and anyone looking to stay organized.',
      km: 'ស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងភារកិច្ចរបស់យើង! កម្មវិធីគេហទំព័រនេះត្រូវបានរចនាឡើងដើម្បីជួយអ្នករៀបចំ និងគ្រប់គ្រងភារកិច្ចរបស់អ្នកប្រកបដោយប្រសិទ្ធភាព។ ជាមួយនឹងមុខងារដូចជាការបង្កើតភារកិច្ច ការចាត់ថ្នាក់ ការតាមដានដំណើរការ ការរំលឹក និងការចែករំលែក វាមានគោលបំណងបង្កើនផលិតភាព និងរក្សាភារកិច្ចរបស់អ្នក។ សាងសង់ឡើងជាមួយ React.js សម្រាប់ផ្នែកខាងមុខដែលមានលក្ខណៈទាន់សម័យ និង PHP/MySQL សម្រាប់ផ្នែកខាងក្រោយដែលរឹងមាំ ប្រព័ន្ធនេះល្អឥតខ្ចោះសម្រាប់សិស្ស អ្នកជំនាញ និងអ្នកណាដែលចង់រៀបចំខ្លួន។'
    },
    overview: {
      en: 'The Task Management System is a web application designed to help users efficiently organize and track tasks. Built with React.js for a dynamic frontend and PHP/MySQL for a robust backend, it offers a user-friendly interface with Bootstrap styling for responsiveness.',
      km: 'ប្រព័ន្ធគ្រប់គ្រងភារកិច្ចគឺជាកម្មវិធីគេហទំព័រដែលត្រូវបានរចនាឡើងដើម្បីជួយអ្នកប្រើប្រាស់រៀបចំ និងតាមដានភារកិច្ចប្រកបដោយប្រសិទ្ធភាព។ សាងសង់ឡើងជាមួយ React.js សម្រាប់ផ្នែកខាងមុខដែលមានលក្ខណៈទាន់សម័យ និង PHP/MySQL សម្រាប់ផ្នែកខាងក្រោយដែលរឹងមាំ វាផ្តល់នូវចំណុចប្រទាក់អ្នកប្រើប្រាស់ដែលងាយស្រួលប្រើជាមួយនឹងរចនាបទ Bootstrap សម្រាប់ការឆ្លើយតប។'
    },
    crudOperations: {
      en: 'Create, read, update, and delete tasks with details like title, description, status (Pending/Completed), priority (Low/Medium/High), due date, category, and progress (0-100%).',
      km: 'បង្កើត អាន ធ្វើបច្ចុប្បន្នភាព និងលុបភារកិច្ចជាមួយនឹងព័ត៌មានលម្អិតដូចជាចំណងជើង ការពិពណ៌នា ស្ថានភាព (កំពុងរង់ចាំ/បានបញ្ចប់) អាទិភាព (ទាប/មធ្យម/ខ្ពស់) កាលបរិច្ឆេទកំណត់ ប្រភេទ និងដំណើរការ (0-100%)។'
    },
    searchPagination: {
      en: 'Search tasks by title and navigate through paginated results (5 tasks per page).',
      km: 'ស្វែងរកភារកិច្ចតាមចំណងជើង និងរុករកតាមរយៈលទ្ធផលដែលមានទំព័រ (៥ភារកិច្ចក្នុងមួយទំព័រ)។'
    },
    filteringSorting: {
      en: 'Filter by status (All, Pending, Completed) and sort by priority (Low to High, High to Low).',
      km: 'ច្រោះតាមស្ថានភាព (ទាំងអស់ កំពុងរង់ចាំ បានបញ្ចប់) និងតម្រៀបតាមអាទិភាព (ពីទាបទៅខ្ពស់ ពីខ្ពស់ទៅទាប)។'
    },
    reminders: {
      en: 'Add and view datetime-based reminders for tasks.',
      km: 'បន្ថែម និងមើលការរំលឹកផ្អែកលើកាលបរិច្ឆេទ និងពេលវេលាសម្រាប់ភារកិច្ច។'
    },
    sharing: {
      en: 'Share tasks via email input (stored in database).',
      km: 'ចែករំលែកភារកិច្ចតាមរយៈការបញ្ចូលអ៊ីមែល (ផ្ទុកក្នុងមូលដ្ឋានទិន្នន័យ)។'
    },
    progressTracking: {
      en: 'Monitor task completion with a percentage value.',
      km: 'តាមដានការបញ្ចប់ភារកិច្ចជាមួយនឹងតម្លៃភាគរយ។'
    },
    dashboard: {
      en: 'Displays statistics (total tasks, pending, completed, average progress).',
      km: 'បង្ហាញស្ថិតិ (ភារកិច្ចសរុប កំពុងរង់ចាំ បានបញ្ចប់ ដំណើរការជាមធ្យម)។'
    },
    profile: {
      en: 'Update user name and email (hardcoded user ID for simplicity).',
      km: 'ធ្វើបច្ចុប្បន្នភាពឈ្មោះអ្នកប្រើប្រាស់ និងអ៊ីមែល (លេខសម្គាល់អ្នកប្រើប្រាស់ដែលកំណត់សម្រាប់ភាពសាមញ្ញ)។'
    },
    frontend: {
      en: 'React.js, Bootstrap, react-router-dom for navigation (Dashboard, Tasks, Profile, About pages).',
      km: 'React.js, Bootstrap, react-router-dom សម្រាប់ការរុករក (ទំព័រផ្ទាំងគ្រប់គ្រង ភារកិច្ច ទម្រង់ អំពី)។'
    },
    backend: {
      en: 'PHP/MySQL with APIs for tasks, categories, reminders, shares, and user profile.',
      km: 'PHP/MySQL ជាមួយ APIs សម្រាប់ភារកិច្ច ប្រភេទ ការរំលឹក ការចែករំលែក និងទម្រង់អ្នកប្រើប្រាស់។'
    },
    database: {
      en: 'MySQL (task_manager_db) with tables for tasks, categories, reminders, shares, and users.',
      km: 'MySQL (task_manager_db) ជាមួយតារាងសម្រាប់ភារកិច្ច ប្រភេទ ការរំលឹក ការចែករំលែក និងអ្នកប្រើប្រាស់។'
    },
    deployment: {
      en: 'Runs locally with XAMPP (Apache, MySQL) and Node.js for React.',
      km: 'ដំណើរការមូលដ្ឋានជាមួយ XAMPP (Apache, MySQL) និង Node.js សម្រាប់ React។'
    },
    purpose: {
      en: 'This system helps students, professionals, and anyone manage tasks effectively, with features to enhance productivity and organization. The project demonstrates skills in full-stack development, API integration, and responsive UI design.',
      km: 'ប្រព័ន្ធនេះជួយដល់សិស្ស អ្នកជំនាញ និងអ្នកគ្រប់គ្នាគ្រប់គ្រងភារកិច្ចប្រកបដោយប្រសិទ្ធភាព ជាមួយនឹងមុខងារដើម្បីលើកកម្ពស់ផលិតភាព និងការរៀបចំ។ គម្រោងនេះបង្ហាញពីជំនាញក្នុងការអភិវឌ្ឍន៍ full-stack, សមាហរណកម្ម API និងការរចនា UI ដែលឆ្លើយតប។'
    }
  };
  return texts[key][language] || t[key];
};

// Components
const DeveloperInfo = ({ developer, t, language }) => (
  <section className="mb-4">
    <h3 className="border-bottom pb-2 mb-3">{t.developerInfo}</h3>
    <div className="row">
      <div className="col-md-6">
        <div className="d-flex mb-3">
          <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" aria-label="Developer Avatar">
            {developer.initials}
          </div>
          <div>
            <p className="mb-1"><strong>{t.name}:</strong> {developer.name}</p>
            <p className="mb-1"><strong>{t.class}:</strong> {developer.class}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex h-100 align-items-center">
          <div className="d-flex flex-wrap">
            {developer.skills.map((skill, index) => (
              <span key={index} className={`badge m-1 ${skill.color}`}>{skill.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WebsiteInfo = ({ t, language }) => (
  <>
    <section className="mb-4">
      <h3 className="border-bottom pb-2 mb-3">{t.aboutWebsite}</h3>
      <p className="lead mb-4">{getTranslatedText(t, 'aboutWebsite', language)}</p>
    </section>
    <section className="mb-4">
      <h3 className="border-bottom pb-2 mb-3">{t.overview}</h3>
      <p>{getTranslatedText(t, 'overview', language)}</p>
    </section>
  </>
);

const KeyFeatures = ({ t, language }) => (
  <section className="mb-4">
    <h3 className="border-bottom pb-2 mb-3">{t.keyFeatures}</h3>
    <div className="row">
      <div className="col-md-6">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">1</span>
            <div>
              <strong>{t.crudOperations}:</strong> {getTranslatedText(t, 'crudOperations', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">2</span>
            <div>
              <strong>{t.searchPagination}:</strong> {getTranslatedText(t, 'searchPagination', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">3</span>
            <div>
              <strong>{t.filteringSorting}:</strong> {getTranslatedText(t, 'filteringSorting', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">4</span>
            <div>
              <strong>{t.reminders}:</strong> {getTranslatedText(t, 'reminders', language)}
            </div>
          </li>
        </ul>
      </div>
      <div className="col-md-6">
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">5</span>
            <div>
              <strong>{t.sharing}:</strong> {getTranslatedText(t, 'sharing', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">6</span>
            <div>
              <strong>{t.progressTracking}:</strong> {getTranslatedText(t, 'progressTracking', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">7</span>
            <div>
              <strong>{t.dashboard}:</strong> {getTranslatedText(t, 'dashboard', language)}
            </div>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="badge bg-primary rounded-pill me-2">8</span>
            <div>
              <strong>{t.profile}:</strong> {getTranslatedText(t, 'profile', language)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

const TechnicalDetails = ({ t, language }) => (
  <section className="mb-4">
    <h3 className="border-bottom pb-2 mb-3">{t.technicalDetails}</h3>
    <div className="row">
      {[
        { title: t.frontend, key: 'frontend' },
        { title: t.backend, key: 'backend' },
        { title: t.database, key: 'database' },
        { title: t.deployment, key: 'deployment' }
      ].map(({ title, key }) => (
        <div key={key} className="col-md-6">
          <div className="card mb-3 h-100">
            <div className="card-header bg-light">
              <strong>{title}</strong>
            </div>
            <div className="card-body">
              <p>{getTranslatedText(t, key, language)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Purpose = ({ t, language }) => (
  <section>
    <h3 className="border-bottom pb-2 mb-3">{t.purpose}</h3>
    <p>{getTranslatedText(t, 'purpose', language)}</p>
  </section>
);

const About = ({ language = 'km', setLanguage, darkMode = false, setDarkMode, developer = {
  name: 'Kong Chapsometh | គង់ ចាប់សុមេធ',
  class: 'Informations Technology (E-7), Year 3',
  initials: 'KC',
  skills: [
    { name: 'React.js', color: 'bg-primary' },
    { name: 'PHP', color: 'bg-success' },
    { name: 'MySQL', color: 'bg-info text-dark' },
    { name: 'Bootstrap', color: 'bg-warning text-dark' },
    { name: 'API', color: 'bg-danger' },
    { name: 'XAMPP', color: 'bg-secondary' }
  ]
} }) => {
  const validLanguage = translations[language] ? language : 'km';
  const t = translations[validLanguage];

  return (
    <div className={`container mt-4 ${darkMode ? 'dark-mode' : ''}`} style={{ fontFamily: "'Hanuman', 'Khmer OS', sans-serif" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanuman:wght@100;300;400;700;900&display=swap');
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
          background-color: #252525 !important;
          border-color: #333;
          color: #e0e0e0;
        }
        .dark-mode .list-group-item {
          background-color: #2a2a2a;
          border-color: #444;
          color: #e0e0e0;
        }
        .dark-mode .bg-light {
          background-color: #333 !important;
          color: #e0e0e0;
        }
        .dark-mode .text-muted {
          color: #aaa !important;
        }
        .avatar {
          width: 60px;
          height: 60px;
          font-size: 1.5rem;
          font-weight: bold;
        }
        @media (max-width: 576px) {
          .avatar {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
          .badge {
            font-size: 0.75rem;
          }
        }
      `}</style>

      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">{t.aboutUs}</h2>
            </div>
            <div className="card-body">
              <DeveloperInfo developer={developer} t={t} language={validLanguage} />
              <WebsiteInfo t={t} language={validLanguage} />
              <KeyFeatures t={t} language={validLanguage} />
              <TechnicalDetails t={t} language={validLanguage} />
              <Purpose t={t} language={validLanguage} />
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">© {new Date().getFullYear()} - {t.allRightsReserved}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  language: PropTypes.oneOf(['en', 'km']),
  setLanguage: PropTypes.func,
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
  developer: PropTypes.shape({
    name: PropTypes.string,
    class: PropTypes.string,
    initials: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string
    }))
  })
};

export default About;