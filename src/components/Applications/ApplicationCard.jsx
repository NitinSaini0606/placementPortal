import React from 'react';
import { getJobById, getStudentData } from '../../utils/dataUtils';
import './ApplicationCard.css';

const ApplicationCard = ({ application, showActions = false, onStatusUpdate }) => {
  const job = getJobById(application.jobId);
  const student = getStudentData(application.studentId);

  if (!job || !student) {
    return null;
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge-pending', text: 'Pending Approval', icon: '⏳' },
      approved: { class: 'badge-approved', text: 'Approved', icon: '✅' },
      rejected: { class: 'badge-rejected', text: 'Rejected', icon: '❌' },
      scheduled: { class: 'badge-scheduled', text: 'Interview Scheduled', icon: '📅' },
      completed: { class: 'badge-approved', text: 'Completed', icon: '🎉' }
    };
    
    const badge = badges[status] || badges.pending;
    return (
      <span className={`badge ${badge.class}`}>
        <span className="badge-icon">{badge.icon}</span>
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="application-card">
      <div className="application-header">
        <div className="application-info">
          <div className="company-logo">
            <span>{job.company.charAt(0)}</span>
          </div>
          <div className="application-details">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>
            <p className="application-date">Applied on {formatDate(application.appliedDate)}</p>
          </div>
        </div>
        <div className="application-status">
          {getStatusBadge(application.status)}
        </div>
      </div>

      {showActions && (
        <div className="student-info">
          <div className="student-avatar">
            <img 
              src={`https://randomuser.me/api/portraits/${student.gender === 'female' ? 'women' : 'men'}/${student.id.slice(-1)}.jpg`}
              alt={student.name}
            />
          </div>
          <div className="student-details">
            <h4>{student.name}</h4>
            <p>{student.department} • CGPA: {student.cgpa}</p>
            <div className="student-skills">
              {student.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
              {student.skills.length > 3 && (
                <span className="skill-more">+{student.skills.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="application-meta">
        <div className="meta-item">
          <span className="meta-icon">💰</span>
          <span>₹{job.stipend.toLocaleString()}/month</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{job.duration} months</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🏢</span>
          <span>{job.department}</span>
        </div>
      </div>

      {showActions && application.status === 'pending' && (
        <div className="application-actions">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onStatusUpdate(application.id, 'approved')}
          >
            ✅ Approve
          </button>
          <button
            className="btn btn-error btn-sm"
            onClick={() => onStatusUpdate(application.id, 'rejected')}
          >
            ❌ Reject
          </button>
        </div>
      )}

      {application.status === 'scheduled' && (
        <div className="interview-info">
          <div className="interview-badge">
            <span className="interview-icon">📅</span>
            <span>Interview scheduled for next week</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;