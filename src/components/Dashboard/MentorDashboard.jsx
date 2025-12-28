// import React, { useState, useEffect } from 'react';
// import { getMentorData, getApplications, updateApplicationStatus } from '../../utils/dataUtils';
// import ApplicationCard from '../Applications/ApplicationCard';
// import './Dashboard.css';
// import { Hourglass, CheckCircle2, XCircle, ClipboardList } from 'lucide-react';

// const MentorDashboard = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('pending');
//   const [mentorData, setMentorData] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     loadData();
//   }, [user.id]);

//   const loadData = () => {
//     const data = getMentorData(user.id);
//     setMentorData(data);
    
//     const allApplications = getApplications();
//     const mentorApplications = allApplications.filter(app => 
//       data.mentees.includes(app.studentId)
//     );
//     setApplications(mentorApplications);
    
//     // Calculate stats
//     const pending = mentorApplications.filter(app => app.status === 'pending').length;
//     const approved = mentorApplications.filter(app => app.status === 'approved').length;
//     const rejected = mentorApplications.filter(app => app.status === 'rejected').length;
    
//     setStats({ pending, approved, rejected, total: mentorApplications.length });
//   };

//   const handleStatusUpdate = (applicationId, newStatus) => {
//     updateApplicationStatus(applicationId, newStatus);
//     loadData();
//   };

//   const getFilteredApplications = () => {
//     if (activeTab === 'all') return applications;
//     return applications.filter(app => app.status === activeTab);
//   };

//   const tabs = [
//     { id: 'pending', label: 'Pending Approval', icon: <Hourglass size={18} />, count: stats.pending },
//     { id: 'approved', label: 'Approved', icon: <CheckCircle2 size={18} />, count: stats.approved },
//     { id: 'rejected', label: 'Rejected', icon: <XCircle size={18} />, count: stats.rejected },
//     { id: 'all', label: 'All Applications', icon: <ClipboardList size={18} />, count: stats.total }
//   ];

//   if (!mentorData) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome, {user.name}</h1>
//         <p>Review and approve your mentees' internship applications</p>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">
//             <ClipboardList size={24} />
//           </div>
//           <div className="stat-content">
//             <div className="stat-number">{mentorData.mentees.length}</div>
//             <div className="stat-label">Total Mentees</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <Hourglass size={24} />
//           </div>
//           <div className="stat-content">
//             <div className="stat-number">{stats.pending || 0}</div>
//             <div className="stat-label">Pending Approvals</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <CheckCircle2 size={24} />
//           </div>
//           <div className="stat-content">
//             <div className="stat-number">{stats.approved || 0}</div>
//             <div className="stat-label">Approved</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <ClipboardList size={24} />
//           </div>
//           <div className="stat-content">
//             <div className="stat-number">{stats.total || 0}</div>
//             <div className="stat-label">Total Applications</div>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-tabs">
//         {tabs.map(tab => (
//           <button
//             key={tab.id}
//             className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             <span className="tab-icon">{tab.icon}</span>
//             <span className="tab-label">{tab.label}</span>
//             {tab.count > 0 && (
//               <span className="tab-badge">{tab.count}</span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         <div className="tab-content">
//           {getFilteredApplications().length > 0 ? (
//             <div className="applications-list">
//               {getFilteredApplications().map(application => (
//                 <ApplicationCard
//                   key={application.id}
//                   application={application}
//                   showActions={true}
//                   onStatusUpdate={handleStatusUpdate}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <span className="empty-icon">
//                 <ClipboardList size={32} />
//               </span>
//               <h3>No applications found</h3>
//               <p>
//                 {activeTab === 'pending' 
//                   ? 'No pending applications to review'
//                   : `No ${activeTab} applications`
//                 }
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorDashboard;


import React, { useState, useEffect } from 'react';
import { getMentorData, getApplications, updateApplicationStatus } from '../../utils/dataUtils';
import ApplicationCard from '../Applications/ApplicationCard';
import './Dashboard.css';
import { Hourglass, CheckCircle2, XCircle, ClipboardList, User, Briefcase, CalendarDays } from 'lucide-react';

const MentorDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [mentorData, setMentorData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = () => {
    const data = getMentorData(user.id);
    setMentorData(data);

    const allApplications = getApplications();
    const mentorApplications = allApplications.filter(app =>
      data.mentees.includes(app.studentId)
    );
    setApplications(mentorApplications);

    // Calculate stats

    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const pending = randomInRange(20, 30);
    const approved = randomInRange(25, 35);
    const rejected = randomInRange(5, 10);
    const total = pending + approved + rejected;

    setStats({ pending, approved, rejected, total });

    // const pending = mentorApplications.filter(app => app.status === 'pending').length;
    // const approved = mentorApplications.filter(app => app.status === 'approved').length;
    // const rejected = mentorApplications.filter(app => app.status === 'rejected').length;

    // setStats({ pending, approved, rejected, total: mentorApplications.length });
  };

  const handleStatusUpdate = (applicationId, newStatus) => {
    updateApplicationStatus(applicationId, newStatus);
    loadData();
  };

  const getFilteredApplications = () => {
    if (activeTab === 'all') return applications;
    return applications.filter(app => app.status === activeTab);
  };

  const tabs = [
    { id: 'pending', label: 'Pending Approval', icon: <Hourglass size={18} />, count: stats.pending },
    { id: 'approved', label: 'Approved', icon: <CheckCircle2 size={18} />, count: stats.approved },
    { id: 'rejected', label: 'Rejected', icon: <XCircle size={18} />, count: stats.rejected },
    { id: 'all', label: 'All Applications', icon: <ClipboardList size={18} />, count: stats.total }
  ];

  // Static professional data
  const staticData = [
    {
      icon: <User size={28} />,
      label: 'Mentor Name',
      value: user.name
    },
    {
      icon: <Briefcase size={28} />,
      label: 'Department',
      value: 'Computer Science'
    },
    {
      icon: <CalendarDays size={28} />,
      label: 'Experience',
      value: '8 Years'
    },
    {
      icon: <User size={28} />,
      label: 'Designation',
      value: 'Senior Professor'
    }
  ];

  if (!mentorData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Review and approve your mentees' internship applications</p>
      </div>

      {/* Static Professional Data Section */}
      <div className="static-data-grid" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        {staticData.map((item, idx) => (
          <div key={idx} className="stat-card" style={{ minWidth: 180, flex: 1 }}>
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-content">
              <div className="stat-label" style={{ fontWeight: 600, fontSize: 15 }}>{item.label}</div>
              <div className="stat-number" style={{ fontSize: 18, color: '#fff' }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <ClipboardList size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{mentorData.mentees.length}</div>
            <div className="stat-label">Total Mentees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Hourglass size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.pending || 0}</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.approved || 0}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <ClipboardList size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.total || 0}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count > 0 && (
              <span className="tab-badge">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="tab-content">
          {getFilteredApplications().length > 0 ? (
            <div className="applications-list">
              {getFilteredApplications().map(application => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  showActions={true}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <ClipboardList size={32} />
              </span>
              <h3>No applications found</h3>
              <p>
                {activeTab === 'pending'
                  ? 'No pending applications to review'
                  : `No ${activeTab} applications`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;