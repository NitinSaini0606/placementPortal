// import React, { useState, useEffect } from 'react';
// import { getEmployerData, getApplications, updateApplicationStatus, getStudents } from '../../utils/dataUtils';
// import CandidateCard from '../Candidates/CandidateCard';
// import './Dashboard.css';
// import { Users, Calendar, FileText } from 'lucide-react';

// const EmployerDashboard = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('candidates');
//   const [employerData, setEmployerData] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, [user.id]);

//   const loadData = () => {
//     const data = getEmployerData(user.id);
//     setEmployerData(data);
    
//     const allApplications = getApplications();
//     const employerApplications = allApplications.filter(app => 
//       data.jobIds.includes(app.jobId) && app.status === 'approved'
//     );
//     setApplications(employerApplications);
    
//     setStudents(getStudents());
//   };

//   const handleScheduleInterview = (applicationId) => {
//     updateApplicationStatus(applicationId, 'scheduled');
//     loadData();
//   };

//   const handleProvideFeedback = (applicationId, feedback) => {
//     // In a real app, this would update the application with feedback
//     updateApplicationStatus(applicationId, 'completed');
//     loadData();
//   };

//   const getCandidatesWithDetails = () => {
//     return applications.map(app => {
//       const student = students.find(s => s.id === app.studentId);
//       return {
//         ...app,
//         student
//       };
//     });
//   };

//   const tabs = [
//     { id: 'candidates', label: 'Candidates', icon: <Users size={18} /> },
//     { id: 'interviews', label: 'Interviews', icon: <Calendar size={18} /> },
//     { id: 'feedback', label: 'Feedback', icon: <FileText size={18} /> }
//   ];

//   if (!employerData) {
//     return <div className="loading">Loading...</div>;
//   }

//   const candidates = getCandidatesWithDetails();
//   const scheduledInterviews = candidates.filter(c => c.status === 'scheduled');
//   const completedInterviews = candidates.filter(c => c.status === 'completed');

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome, {user.name}</h1>
//         <p>{user.company} - Recruiter Dashboard</p>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon"><Users size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{candidates.length}</div>
//             <div className="stat-label">Total Candidates</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><Calendar size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{scheduledInterviews.length}</div>
//             <div className="stat-label">Scheduled Interviews</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><FileText size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{completedInterviews.length}</div>
//             <div className="stat-label">Completed Interviews</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><Calendar size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{employerData.jobIds.length}</div>
//             <div className="stat-label">Active Job Postings</div>
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
//           </button>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {activeTab === 'candidates' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Approved Candidates</h2>
//               <p>Review candidate profiles and schedule interviews</p>
//             </div>
//             {candidates.length > 0 ? (
//               <div className="candidates-grid">
//                 {candidates.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     onScheduleInterview={handleScheduleInterview}
//                     showScheduleButton={candidate.status === 'approved'}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><Users size={32} /></span>
//                 <h3>No candidates yet</h3>
//                 <p>Approved candidates will appear here</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'interviews' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Scheduled Interviews</h2>
//               <p>Manage your upcoming interviews</p>
//             </div>
//             {scheduledInterviews.length > 0 ? (
//               <div className="candidates-grid">
//                 {scheduledInterviews.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     onProvideFeedback={handleProvideFeedback}
//                     showFeedbackButton={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><Calendar size={32} /></span>
//                 <h3>No scheduled interviews</h3>
//                 <p>Schedule interviews with approved candidates</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'feedback' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Interview Feedback</h2>
//               <p>Completed interviews and feedback</p>
//             </div>
//             {completedInterviews.length > 0 ? (
//               <div className="candidates-grid">
//                 {completedInterviews.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     showCompleted={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><FileText size={32} /></span>
//                 <h3>No completed interviews</h3>
//                 <p>Completed interviews will appear here</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployerDashboard;


// import React, { useState, useEffect } from 'react';
// import { getEmployerData, getApplications, updateApplicationStatus, getStudents } from '../../utils/dataUtils';
// import CandidateCard from '../Candidates/CandidateCard';
// import './Dashboard.css';
// import { Users, Calendar, FileText } from 'lucide-react';

// // Static student requests for demonstration
// const staticStudentRequests = [
//   {
//     id: 'req1',
//     name: 'John Doe',
//     email: 'john@example.com',
//     message: 'I am interested in your company and would like to apply.',
//     status: 'pending'
//   },
//   {
//     id: 'req2',
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     message: 'Can I get more details about the internship?',
//     status: 'pending'
//   }
// ];

// const EmployerDashboard = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('candidates');
//   const [employerData, setEmployerData] = useState(null);
//   const [applications, setApplications] = useState([]);
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, [user.id]);

//   const loadData = () => {
//     const data = getEmployerData(user.id);
//     setEmployerData(data);
    
//     const allApplications = getApplications();
//     const employerApplications = allApplications.filter(app => 
//       data.jobIds.includes(app.jobId) && app.status === 'approved'
//     );
//     setApplications(employerApplications);
    
//     setStudents(getStudents());
//   };

//   const handleScheduleInterview = (applicationId) => {
//     updateApplicationStatus(applicationId, 'scheduled');
//     loadData();
//   };

//   const handleProvideFeedback = (applicationId, feedback) => {
//     updateApplicationStatus(applicationId, 'completed');
//     loadData();
//   };

//   const getCandidatesWithDetails = () => {
//     return applications.map(app => {
//       const student = students.find(s => s.id === app.studentId);
//       return {
//         ...app,
//         student
//       };
//     });
//   };

//   const tabs = [
//     { id: 'candidates', label: 'Candidates', icon: <Users size={18} /> },
//     { id: 'interviews', label: 'Interviews', icon: <Calendar size={18} /> },
//     { id: 'feedback', label: 'Feedback', icon: <FileText size={18} /> }
//   ];

//   if (!employerData) {
//     return <div className="loading">Loading...</div>;
//   }

//   const candidates = getCandidatesWithDetails();
//   const scheduledInterviews = candidates.filter(c => c.status === 'scheduled');
//   const completedInterviews = candidates.filter(c => c.status === 'completed');

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome, {user.name}</h1>
//         <p>{user.company} - Recruiter Dashboard</p>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon"><Users size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{candidates.length}</div>
//             <div className="stat-label">Total Candidates</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><Calendar size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{scheduledInterviews.length}</div>
//             <div className="stat-label">Scheduled Interviews</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><FileText size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{completedInterviews.length}</div>
//             <div className="stat-label">Completed Interviews</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon"><Calendar size={24} /></div>
//           <div className="stat-content">
//             <div className="stat-number">{employerData.jobIds.length}</div>
//             <div className="stat-label">Active Job Postings</div>
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
//           </button>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {activeTab === 'candidates' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Approved Candidates</h2>
//               <p>Review candidate profiles and schedule interviews</p>
//             </div>
//             {/* Show static student requests */}
//             <div className="student-requests">
//               <h3>Student Requests</h3>
//               {staticStudentRequests.map(req => (
//                 <div key={req.id} className="student-request-card">
//                   <strong>{req.name}</strong> ({req.email})
//                   <p>{req.message}</p>
//                   <span className="request-status">{req.status}</span>
//                 </div>
//               ))}
//             </div>
//             {candidates.length > 0 ? (
//               <div className="candidates-grid">
//                 {candidates.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     onScheduleInterview={handleScheduleInterview}
//                     showScheduleButton={candidate.status === 'approved'}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><Users size={32} /></span>
//                 <h3>No candidates yet</h3>
//                 <p>Approved candidates will appear here</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'interviews' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Scheduled Interviews</h2>
//               <p>Manage your upcoming interviews</p>
//             </div>
//             {/* Show static student requests */}
//             <div className="student-requests">
//               <h3>Student Requests</h3>
//               {staticStudentRequests.map(req => (
//                 <div key={req.id} className="student-request-card">
//                   <strong>{req.name}</strong> ({req.email})
//                   <p>{req.message}</p>
//                   <span className="request-status">{req.status}</span>
//                 </div>
//               ))}
//             </div>
//             {scheduledInterviews.length > 0 ? (
//               <div className="candidates-grid">
//                 {scheduledInterviews.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     onProvideFeedback={handleProvideFeedback}
//                     showFeedbackButton={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><Calendar size={32} /></span>
//                 <h3>No scheduled interviews</h3>
//                 <p>Schedule interviews with approved candidates</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'feedback' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Interview Feedback</h2>
//               <p>Completed interviews and feedback</p>
//             </div>
//             {/* Show static student requests */}
//             <div className="student-requests">
//               <h3>Student Requests</h3>
//               {staticStudentRequests.map(req => (
//                 <div key={req.id} className="student-request-card">
//                   <strong>{req.name}</strong> ({req.email})
//                   <p>{req.message}</p>
//                   <span className="request-status">{req.status}</span>
//                 </div>
//               ))}
//             </div>
//             {completedInterviews.length > 0 ? (
//               <div className="candidates-grid">
//                 {completedInterviews.map(candidate => (
//                   <CandidateCard
//                     key={candidate.id}
//                     candidate={candidate}
//                     showCompleted={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"><FileText size={32} /></span>
//                 <h3>No completed interviews</h3>
//                 <p>Completed interviews will appear here</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployerDashboard;



import React, { useState, useEffect } from 'react';
import { getEmployerData, getApplications, updateApplicationStatus, getStudents } from '../../utils/dataUtils';
import CandidateCard from '../Candidates/CandidateCard';
import './Dashboard.css';
import { Users, Calendar, FileText } from 'lucide-react';

// Static student requests for demonstration
const staticStudentRequests = [
  {
    id: 'req1',
    name: 'Rohan Desai',
    email: 'rohan.desai@gmail.com',
    message: 'I am interested in your company and would like to apply.',
    status: 'pending'
  },
  {
    id: 'req2',
    name: 'Sneha Nair',
    email: 'sneha.nair@gmail.com',
    message: 'Can I get more details about the internship?',
    status: 'pending'
  },
  {
    id: 'req3',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    message: 'Can u please provide more details about the internship?',
    status: 'pending'
  }
];

const EmployerDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('candidates');
  const [employerData, setEmployerData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = () => {
    const data = getEmployerData(user.id);
    setEmployerData(data);
    
    const allApplications = getApplications();
    const employerApplications = allApplications.filter(app => 
      data.jobIds.includes(app.jobId) && app.status === 'approved'
    );
    setApplications(employerApplications);
    
    setStudents(getStudents());
  };

  const handleScheduleInterview = (applicationId) => {
    updateApplicationStatus(applicationId, 'scheduled');
    loadData();
  };

  const handleProvideFeedback = (applicationId, feedback) => {
    updateApplicationStatus(applicationId, 'completed');
    loadData();
  };

  const getCandidatesWithDetails = () => {
    return applications.map(app => {
      const student = students.find(s => s.id === app.studentId);
      return {
        ...app,
        student
      };
    });
  };

  const tabs = [
    { id: 'candidates', label: 'Candidates', icon: <Users size={18} /> },
    { id: 'interviews', label: 'Interviews', icon: <Calendar size={18} /> },
    { id: 'feedback', label: 'Feedback', icon: <FileText size={18} /> }
  ];

  if (!employerData) {
    return <div className="loading">Loading...</div>;
  }

  const candidates = getCandidatesWithDetails();
  const scheduledInterviews = candidates.filter(c => c.status === 'scheduled');
  const completedInterviews = candidates.filter(c => c.status === 'completed');

  const totalCandidatesCount = candidates.length || 18;  // show 18 if none
  const scheduledInterviewsCount = scheduledInterviews.length || 12;
  const completedInterviewsCount = completedInterviews.length || 7;
  const activeJobsCount = employerData.jobIds.length || 4;

  // Helper function to render static student requests as cards
  const renderStaticRequests = () => (
    <div className="candidates-grid student-requests-grid">
      {staticStudentRequests.map(req => (
        <div key={req.id} className="candidate-card student-request-card">
          <div className="candidate-info">
            <h3 className="student-request-name">{req.name}</h3>
            <p className="student-request-email"><strong>Email:</strong> {req.email}</p>
            <p className="student-request-message"><strong>Message:</strong> {req.message}</p>
            <span className={`status-badge status-${req.status} student-request-status`}>
              {req.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>{user.company} - Recruiter Dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-content">
            <div className="stat-number">{totalCandidatesCount}</div>
            <div className="stat-label">Total Candidates</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Calendar size={24} /></div>
          <div className="stat-content">
            <div className="stat-number">{scheduledInterviewsCount}</div>
            <div className="stat-label">Scheduled Interviews</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FileText size={24} /></div>
          <div className="stat-content">
            <div className="stat-number">{completedInterviewsCount}</div>
            <div className="stat-label">Completed Interviews</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Calendar size={24} /></div>
          <div className="stat-content">
            <div className="stat-number">{activeJobsCount}</div>
            <div className="stat-label">Active Job Postings</div>
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
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'candidates' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Approved Candidates</h2>
              <p>Review candidate profiles and schedule interviews</p>
            </div>
            <h3>Student Requests</h3>
            {renderStaticRequests()}
            {candidates.length > 0 ? (
              <div className="candidates-grid">
                {candidates.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onScheduleInterview={handleScheduleInterview}
                    showScheduleButton={candidate.status === 'approved'}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><Users size={32} /></span>
                <h3>No candidates yet</h3>
                <p>Approved candidates will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'interviews' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Scheduled Interviews</h2>
              <p>Manage your upcoming interviews</p>
            </div>
            <h3>Student Requests</h3>
            {renderStaticRequests()}
            {scheduledInterviews.length > 0 ? (
              <div className="candidates-grid">
                {scheduledInterviews.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onProvideFeedback={handleProvideFeedback}
                    showFeedbackButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><Calendar size={32} /></span>
                <h3>No scheduled interviews</h3>
                <p>Schedule interviews with approved candidates</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Interview Feedback</h2>
              <p>Completed interviews and feedback</p>
            </div>
            <h3>Student Requests</h3>
            {renderStaticRequests()}
            {completedInterviews.length > 0 ? (
              <div className="candidates-grid">
                {completedInterviews.map(candidate => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    showCompleted={true}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><FileText size={32} /></span>
                <h3>No completed interviews</h3>
                <p>Completed interviews will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
