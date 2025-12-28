import React, { useState } from 'react';
import { updateStudentData } from '../../utils/dataUtils';
import './ProfileCard.css';

const ProfileCard = ({ student, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    department: student.department,
    skills: student.skills.join(', '),
    resume: student.resume,
    phone: student.phone,
    cgpa: student.cgpa
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    };
    updateStudentData(student.id, updatedData);
    setIsEditing(false);
    onUpdate();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={`https://randomuser.me/api/portraits/${student.gender === 'female' ? 'women' : 'men'}/${student.id.slice(-1)}.jpg`}
            alt={student.name}
          />
        </div>
        <div className="profile-info">
          <h2>{student.name}</h2>
          <p>{student.department}</p>
          <div className="profile-actions">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics and Communication Engineering</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Electrical">Electrical Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">CGPA</label>
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="form-input"
              min="0"
              max="10"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-input"
              placeholder="JavaScript, React, Node.js, Python"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Resume/Bio</label>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="form-textarea"
              rows="6"
              placeholder="Write a brief description about yourself, your experience, and career goals..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{student.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{student.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{student.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CGPA:</span>
                <span className="detail-value">{student.cgpa}/10</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {student.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Resume/Bio</h3>
            <p className="resume-text">{student.resume}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;