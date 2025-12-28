import React, { useState } from 'react';
import './JobForm.css';

const JobForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    department: 'Computer Science',
    description: '',
    requiredSkills: '',
    stipend: '',
    duration: '',
    conversionChance: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
      stipend: parseInt(formData.stipend),
      duration: parseInt(formData.duration),
      conversionChance: formData.conversionChance ? parseInt(formData.conversionChance) : null,
      postedDate: new Date().toISOString().split('T')[0]
    };
    onSubmit(jobData);
  };

  return (
    <div className="job-form-container">
      <div className="job-form-header">
        <h2>Post New Job</h2>
        <p>Create a new internship opportunity</p>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Software Development Intern"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., TechCorp Solutions"
              required
            />
          </div>
        </div>

        <div className="form-row">
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
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Monthly Stipend (₹)</label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 15000"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Duration (months)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 6"
              min="1"
              max="12"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Conversion Chance (%)</label>
            <input
              type="number"
              name="conversionChance"
              value={formData.conversionChance}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 80"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Required Skills (comma-separated)</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., JavaScript, React, Node.js, MongoDB"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            placeholder="Describe the role, responsibilities, and what the intern will learn..."
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;