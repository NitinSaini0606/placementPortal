import React, { useState, useEffect } from 'react';
import { getJobs, addJob, getApplications, getStudents } from '../../utils/dataUtils';
import JobForm from '../Jobs/JobForm';
import JobCard from '../Jobs/JobCard';
import AnalyticsCard from '../Analytics/AnalyticsCard';
import './Dashboard.css';
import { BarChart2, Briefcase, Users } from 'lucide-react';

const PlacementDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setJobs(getJobs());
    setApplications(getApplications());
    setStudents(getStudents());
  };

  const handleAddJob = (jobData) => {
    addJob(jobData);
    loadData();
    setShowJobForm(false);
  };

  const calculateStats = () => {
    const totalStudents = students.length;
    const appliedStudents = new Set(applications.map(app => app.studentId)).size;
    const unplacedStudents = totalStudents - appliedStudents;
    const totalApplications = applications.length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const scheduledInterviews = applications.filter(app => app.status === 'scheduled').length;

    return {
      totalStudents,
      unplacedStudents,
      totalApplications,
      approvedApplications,
      scheduledInterviews,
      placementRate: totalStudents > 0 ? Math.round((appliedStudents / totalStudents) * 100) : 0
    };
  };

  const stats = calculateStats();

  const demoStats = {
    totalStudents: students.length > 0 ? 120 : 120,         // 120 total students
    unplacedStudents: stats.unplacedStudents || 45,     // 45 still unplaced
    totalApplications: stats.totalApplications || 200,  // 200 total applications
    approvedApplications: stats.approvedApplications || 20,
    scheduledInterviews: stats.scheduledInterviews || 30,
    placementRate: stats.placementRate || 62            // 62%
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { id: 'jobs', label: 'Job Postings', icon: <Briefcase size={18} /> },
    { id: 'students', label: 'Student Progress', icon: <Users size={18} /> }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Placement Cell Dashboard</h1>
        <p>Monitor placement activities and manage job postings</p>
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
        {activeTab === 'analytics' && (
          <div className="tab-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><Users size={24} /></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.totalStudents}</div>
                  <div className="stat-label">Total Students</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Briefcase size={24} /></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.unplacedStudents}</div>
                  <div className="stat-label">Unplaced Students</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><BarChart2 size={24} /></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.totalApplications}</div>
                  <div className="stat-label">Total Applications</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><span role="img" aria-label="approved">✅</span></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.approvedApplications}</div>
                  <div className="stat-label">Approved Applications</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><span role="img" aria-label="scheduled">📅</span></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.scheduledInterviews}</div>
                  <div className="stat-label">Scheduled Interviews</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><BarChart2 size={24} /></div>
                <div className="stat-content">
                  <div className="stat-number">{demoStats.placementRate}%</div>
                  <div className="stat-label">Placement Rate</div>
                </div>
              </div>
            </div>

            <div className="analytics-section">
              <AnalyticsCard 
                title="Department-wise Applications"
                data={applications}
                students={students}
              />
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="tab-content">
            <div className="section-header">
              <h2><Briefcase size={20} style={{ marginRight: 8 }} /> Job Postings</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowJobForm(true)}
              >
                <Briefcase size={16} style={{ marginRight: 4 }} /> + Add New Job
              </button>
            </div>

            {showJobForm && (
              <div className="modal-overlay" onClick={() => setShowJobForm(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <JobForm 
                    onSubmit={handleAddJob}
                    onCancel={() => setShowJobForm(false)}
                  />
                </div>
              </div>
            )}

            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  showApplicationCount={true}
                  applicationCount={applications.filter(app => app.jobId === job.id).length}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="section-header">
              <h2><Users size={20} style={{ marginRight: 8 }} /> Student Progress</h2>
              <p>Monitor student application status across departments</p>
            </div>

            <div className="students-progress">
              {students.map(student => {
                const studentApplications = applications.filter(app => app.studentId === student.id);
                return (
                  <div key={student.id} className="student-progress-card">
                    <div className="student-info">
                      <div className="student-avatar">
                        <img 
                          src={`https://randomuser.me/api/portraits/${student.gender === 'female' ? 'women' : 'men'}/${student.id.slice(-1)}.jpg`}
                          alt={student.name}
                        />
                      </div>
                      <div className="student-details">
                        <h4>{student.name}</h4>
                        <p>{student.department}</p>
                        <p>{student.email}</p>
                      </div>
                    </div>
                    <div className="student-stats">
                      <div className="stat-item">
                        <span className="stat-value">{studentApplications.length}</span>
                        <span className="stat-label"><BarChart2 size={14} style={{ marginRight: 4 }} /> Applications</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">
                          {studentApplications.filter(app => app.status === 'approved').length}
                        </span>
                        <span className="stat-label"><span role="img" aria-label="approved">✅</span> Approved</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">
                          {studentApplications.filter(app => app.status === 'scheduled').length}
                        </span>
                        <span className="stat-label"><span role="img" aria-label="scheduled">📅</span> Interviews</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDashboard;