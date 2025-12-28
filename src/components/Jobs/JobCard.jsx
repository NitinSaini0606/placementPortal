import React from 'react';
import { getJobById } from '../../utils/dataUtils';
import './JobCard.css';
import { Building2, IndianRupee, CalendarDays, Target, Users } from 'lucide-react';

const JobCard = ({ 
  job, 
  onApply, 
  hasApplied, 
  userSkills = [], 
  isRecommended = false,
  showApplicationCount = false,
  applicationCount = 0
}) => {
  const skillMatch = job.requiredSkills.filter(skill => 
    userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ).length;

  const matchPercentage = job.requiredSkills.length > 0 
    ? Math.round((skillMatch / job.requiredSkills.length) * 100) 
    : 0;

  return (
    <div className={`job-card ${isRecommended ? 'recommended' : ''}`}>
      {isRecommended && (
        <div className="recommendation-badge">
          <span>⭐ Recommended</span>
        </div>
      )}
      
      <div className="job-header">
        <div className="company-logo">
          <span>{job.company.charAt(0)}</span>
        </div>
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
      </div>

      <div className="job-details">
        <div className="job-meta">
          <div className="meta-item">
            <span className="meta-icon"><Building2 size={16} /></span>
            <span>{job.department}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon"><IndianRupee size={16} /></span>
            <span>₹{job.stipend.toLocaleString()}/month</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon"><CalendarDays size={16} /></span>
            <span>{job.duration} months</span>
          </div>
          {job.conversionChance && (
            <div className="meta-item">
              <span className="meta-icon"><Target size={16} /></span>
              <span>{job.conversionChance}% conversion</span>
            </div>
          )}
        </div>

        <div className="job-description">
          <p>{job.description}</p>
        </div>

        <div className="required-skills">
          <h4>Required Skills:</h4>
          <div className="skills-list">
            {job.requiredSkills.map((skill, index) => {
              const isMatched = userSkills.some(userSkill => 
                userSkill.toLowerCase().includes(skill.toLowerCase())
              );
              return (
                <span 
                  key={index} 
                  className={`skill-tag ${isMatched ? 'matched' : ''}`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        {userSkills.length > 0 && (
          <div className="skill-match">
            <div className="match-bar">
              <div 
                className="match-fill" 
                style={{ width: `${matchPercentage}%` }}
              ></div>
            </div>
            <span className="match-text">{matchPercentage}% skill match</span>
          </div>
        )}
      </div>

      <div className="job-footer">
        {showApplicationCount && (
          <div className="application-count">
            <span className="count-icon"><Users size={16} /></span>
            <span>{applicationCount} applications</span>
          </div>
        )}
        
        {onApply && (
          <button
            className={`btn ${hasApplied ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => onApply(job.id)}
            disabled={hasApplied}
          >
            {hasApplied ? 'Applied ✓' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;