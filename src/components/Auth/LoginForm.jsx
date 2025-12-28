import React, { useState } from 'react';
import { initializeData } from '../../utils/dataUtils';
import './LoginForm.css';
import { GraduationCap, UserCheck, Briefcase, Building2 } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize sample data
  React.useEffect(() => {
    initializeData();
  }, []);

  const users = {
    student: [
      { id: 'student1', name: 'Aarav Sharma', email: 'aarav.sharma@college.edu', department: 'Computer Science Engineering' },
      { id: 'student2', name: 'Priya Verma', email: 'priya.verma@college.edu', department: 'Electronics and Communication Engineering' },
      { id: 'student3', name: 'Arjun Patel', email: 'arjun.patel@college.edu', department: 'Mechanical Engineering' },
      { id: 'student4', name: 'Ananya Singh', email: 'ananya.singh@college.edu', department: 'Computer Science Engineering' },
      { id: 'student5', name: 'Rohan Desai', email: 'rohan.desai@college.edu', department: 'Civil Engineering' },
      { id: 'student6', name: 'Sneha Nair', email: 'sneha.nair@college.edu', department: 'Information Technology' },
      { id: 'student7', name: 'Karan Malhotra', email: 'karan.malhotra@college.edu', department: 'Electrical Engineering' },
      { id: 'student8', name: 'Meera Choudhary', email: 'meera.choudhary@college.edu', department: 'Chemical Engineering' },
      { id: 'student9', name: 'Vivek Sinha', email: 'vivek.sinha@college.edu', department: 'Computer Science Engineering' }
    ],
    mentor: [
      { id: 'mentor1', name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@college.edu', department: 'Computer Science' },
      { id: 'mentor2', name: 'Prof. Sunita Gupta', email: 'sunita.gupta@college.edu', department: 'Electronics' }
    ],
    placement: [
      { id: 'placement1', name: 'Vikram Mehta', email: 'vikram.mehta@college.edu', department: 'Placement Cell' }
    ],
    employer: [
      { id: 'employer1', name: 'Ravi Agarwal', email: 'ravi@techcorp.com', company: 'TechCorp Solutions' },
      { id: 'employer2', name: 'Neha Joshi', email: 'neha@innovate.com', company: 'Innovate Systems' }
    ]
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users[selectedRole].find(u => u.id === selectedUser);
    onLogin({ ...user, role: selectedRole });
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to Campus Placement Portal</h1>
          <p>Select your role and user to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <div className="role-selector">
              {Object.keys(users).map(role => (
                <button
                  key={role}
                  type="button"
                  className={`role-btn ${selectedRole === role ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedRole(role);
                    setSelectedUser('');
                  }}
                >
                  <span className="role-icon">
                    {role === 'student' && <GraduationCap size={20} />}
                    {role === 'mentor' && <UserCheck size={20} />}
                    {role === 'placement' && <Briefcase size={20} />}
                    {role === 'employer' && <Building2 size={20} />}
                  </span>
                  <span className="role-name">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select User</label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Choose a user...</option>
              {users[selectedRole].map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={!selectedUser || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-info">
          <h3>Features:</h3>
          <ul>
            <li><strong>Students:</strong> Manage profile, apply to jobs, track applications</li>
            <li><strong>Mentors:</strong> Approve student applications, track mentee progress</li>
            <li><strong>Placement Cell Officers:</strong> Post jobs, view analytics, monitor progress</li>
            <li><strong>Recruiters:</strong> View candidates, schedule interviews, provide feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;