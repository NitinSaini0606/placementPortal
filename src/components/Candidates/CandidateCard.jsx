import React, { useState } from 'react';
import { getJobById } from '../../utils/dataUtils';
import './CandidateCard.css';

const CandidateCard = ({ 
  candidate, 
  onScheduleInterview, 
  onProvideFeedback,
  showScheduleButton = false,
  showFeedbackButton = false,
  showCompleted = false
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const job = getJobById(candidate.jobId);
  const student = candidate.student;

  if (!job || !student) {
    return null;
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    onProvideFeedback(candidate.id, feedback);
    setShowFeedbackForm(false);
    setFeedback('');
  };

  return (
    <div className="candidate-card">
      <div className="candidate-header">
        <div className="candidate-avatar">
          <img 
            src={`https://randomuser.me/api/portraits/${student.gender === 'female' ? 'women' : 'men'}/${student.id.slice(-1)}.jpg`}
            alt={student.name}
          />
        </div>
        <div className="candidate-info">
          <h3>{student.name}</h3>
          <p>{student.department}</p>
          <p className="candidate-email">{student.email}</p>
        </div>
      </div>

      <div className="job-info">
        <h4>Applied for: {job.title}</h4>
        <p>{job.company}</p>
      </div>

      <div className="candidate-details">
        <div className="detail-item">
          <span className="detail-label">CGPA:</span>
          <span className="detail-value">{student.cgpa}/10</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{student.phone}</span>
        </div>
      </div>

      <div className="candidate-skills">
        <h5>Skills:</h5>
        <div className="skills-list">
          {student.skills.map((skill, index) => {
            const isRequired = job.requiredSkills.some(reqSkill => 
              reqSkill.toLowerCase().includes(skill.toLowerCase())
            );
            return (
              <span 
                key={index} 
                className={`skill-tag ${isRequired ? 'required' : ''}`}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      <div className="candidate-resume">
        <h5>About:</h5>
        <p>{student.resume}</p>
      </div>

      <div className="candidate-actions">
        {showScheduleButton && (
          <button
            className="btn btn-primary"
            onClick={() => onScheduleInterview(candidate.id)}
          >
            📅 Schedule Interview
          </button>
        )}

        {showFeedbackButton && !showFeedbackForm && (
          <button
            className="btn btn-success"
            onClick={() => setShowFeedbackForm(true)}
          >
            📝 Provide Feedback
          </button>
        )}

        {showCompleted && (
          <div className="completed-badge">
            <span className="completed-icon">✅</span>
            <span>Interview Completed</span>
          </div>
        )}
      </div>

      {showFeedbackForm && (
        <div className="feedback-form">
          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label className="form-label">Interview Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="form-textarea"
                rows="4"
                placeholder="Provide feedback about the candidate's performance..."
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-sm">
                Submit Feedback
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowFeedbackForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;