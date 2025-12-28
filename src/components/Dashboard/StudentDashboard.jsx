// import React, { useState, useEffect } from 'react';
// import { getStudentData, getJobs, applyToJob, getApplications } from '../../utils/dataUtils';
// import ProfileCard from '../Profile/ProfileCard';
// import JobCard from '../Jobs/JobCard';
// import ApplicationCard from '../Applications/ApplicationCard';
// import './Dashboard.css';
// import { User, Briefcase, Star, ClipboardList } from 'lucide-react';
// import Chatbot from '../Chat/Chatbot';

// const StudentDashboard = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [studentData, setStudentData] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [recommendedJobs, setRecommendedJobs] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, [user.id]);

//   const loadData = () => {
//     const data = getStudentData(user.id);
//     setStudentData(data);
    
//     const allJobs = getJobs();
//     setJobs(allJobs);
    
//     const userApplications = getApplications().filter(app => app.studentId === user.id);
//     setApplications(userApplications);
    
//     // Simple recommendation based on skills and department
//     if (data && data.skills) {
//       const recommended = allJobs.filter(job => {
//         const skillMatch = job.requiredSkills.some(skill => 
//           data.skills.some(studentSkill => 
//             studentSkill.toLowerCase().includes(skill.toLowerCase())
//           )
//         );
//         const deptMatch = job.department === data.department;
//         return skillMatch || deptMatch;
//       }).slice(0, 3);
//       setRecommendedJobs(recommended);
//     }
//   };

//   const handleApply = (jobId) => {
//     applyToJob(user.id, jobId);
//     loadData(); // Refresh data
//   };

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: <User size={18} /> },
//     { id: 'jobs', label: 'All Jobs', icon: <Briefcase size={18} /> },
//     { id: 'recommended', label: 'Recommended', icon: <Star size={18} /> },
//     { id: 'applications', label: 'My Applications', icon: <ClipboardList size={18} /> }
//   ];

//   if (!studentData) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Welcome back, {user.name}!</h1>
//         <p>Manage your profile and track your internship applications</p>
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
//             {tab.id === 'applications' && applications.length > 0 && (
//               <span className="tab-badge">{applications.length}</span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="dashboard-content">
//         {activeTab === 'profile' && (
//           <div className="tab-content">
//             <ProfileCard student={studentData} onUpdate={loadData} />
//           </div>
//         )}

//         {activeTab === 'jobs' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>All Available Positions</h2>
//               <p>Browse through all internship opportunities</p>
//             </div>
//             <div className="jobs-grid">
//               {jobs.map(job => (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   onApply={handleApply}
//                   hasApplied={applications.some(app => app.jobId === job.id)}
//                   userSkills={studentData.skills}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'recommended' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>Recommended for You</h2>
//               <p>Jobs matching your skills and department</p>
//             </div>
//             {recommendedJobs.length > 0 ? (
//               <div className="jobs-grid">
//                 {recommendedJobs.map(job => (
//                   <JobCard
//                     key={job.id}
//                     job={job}
//                     onApply={handleApply}
//                     hasApplied={applications.some(app => app.jobId === job.id)}
//                     userSkills={studentData.skills}
//                     isRecommended={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon">🎯</span>
//                 <h3>No recommendations yet</h3>
//                 <p>Complete your profile to get personalized job recommendations</p>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'applications' && (
//           <div className="tab-content">
//             <div className="section-header">
//               <h2>My Applications</h2>
//               <p>Track the status of your internship applications</p>
//             </div>
//             {applications.length > 0 ? (
//               <div className="applications-list">
//                 {applications.map(application => (
//                   <ApplicationCard
//                     key={application.id}
//                     application={application}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <span className="empty-icon"></span>
//                 <h3>No applications yet</h3>
//                 <p>Start applying to internships to see them here</p>
//               </div>
//             )}
//           </div>
//         )}
//         {/* <div className="tab-content"></div> */}

//         {/* Remove stray tab-content completely */}
//         <div className="chatbot-container">
//           <Chatbot />
//         </div>


//       </div>
//     </div>

    
//   );
// };

// export default StudentDashboard;


import React, { useState, useEffect } from 'react';
import { getStudentData, getJobs, applyToJob, getApplications } from '../../utils/dataUtils';
import ProfileCard from '../Profile/ProfileCard';
import JobCard from '../Jobs/JobCard';
import ApplicationCard from '../Applications/ApplicationCard';
import './Dashboard.css';
import { User, Briefcase, Star, ClipboardList } from 'lucide-react';
import Chatbot from '../Chat/Chatbot';

const StudentDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [studentData, setStudentData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = () => {
    const data = getStudentData(user.id);
    setStudentData(data);

    const allJobs = getJobs();
    setJobs(allJobs);

    const userApplications = getApplications().filter(app => app.studentId === user.id);
    setApplications(userApplications);

    if (data && data.skills) {
      const recommended = allJobs.filter(job => {
        const skillMatch = job.requiredSkills.some(skill =>
          data.skills.some(studentSkill =>
            studentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );
        const deptMatch = job.department === data.department;
        return skillMatch || deptMatch;
      }).slice(0, 3);
      setRecommendedJobs(recommended);
    }
  };

  const handleApply = (jobId) => {
    applyToJob(user.id, jobId);
    loadData();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'jobs', label: 'All Jobs', icon: <Briefcase size={18} /> },
    { id: 'recommended', label: 'Recommended', icon: <Star size={18} /> },
    { id: 'applications', label: 'My Applications', icon: <ClipboardList size={18} /> }
  ];

  if (!studentData) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Manage your profile and track your internship applications</p>
      </div>

      {/* TABS */}
      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.id === 'applications' && applications.length > 0 && (
              <span className="tab-badge">{applications.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="tab-content">
            <ProfileCard student={studentData} onUpdate={loadData} />
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>All Available Positions</h2>
              <p>Browse through all internship opportunities</p>
            </div>
            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  hasApplied={applications.some(app => app.jobId === job.id)}
                  userSkills={studentData.skills}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommended' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Recommended for You</h2>
              <p>Jobs matching your skills and department</p>
            </div>
            {recommendedJobs.length ? (
              <div className="jobs-grid">
                {recommendedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    hasApplied={applications.some(app => app.jobId === job.id)}
                    userSkills={studentData.skills}
                    isRecommended={true}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🎯</span>
                <h3>No recommendations yet</h3>
                <p>Complete your profile to get personalized job recommendations</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>My Applications</h2>
              <p>Track the status of your internship applications</p>
            </div>
            {applications.length ? (
              <div className="applications-list">
                {applications.map(app => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📭</span>
                <h3>No applications yet</h3>
                <p>Start applying to internships to see them here</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CHATBOT FIXED */}
      <Chatbot />
    </div>
  );
};

export default StudentDashboard;
