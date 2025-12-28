import React from 'react';
import './AnalyticsCard.css';

const AnalyticsCard = ({ title, data, students }) => {
  // Calculate department-wise statistics
  const getDepartmentStats = () => {
    const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
    
    return departments.map(dept => {
      const deptStudents = students.filter(s => s.department === dept);
      const deptApplications = data.filter(app => {
        const student = students.find(s => s.id === app.studentId);
        return student && student.department === dept;
      });
      
      return {
        department: dept,
        totalStudents: deptStudents.length,
        applications: deptApplications.length,
        approved: deptApplications.filter(app => app.status === 'approved').length,
        placementRate: deptStudents.length > 0 
          ? Math.round((deptApplications.length / deptStudents.length) * 100) 
          : 0
      };
    });
  };

  const departmentStats = getDepartmentStats();
  const maxApplications = Math.max(...departmentStats.map(d => d.applications));

  return (
    <div className="analytics-card">
      <div className="analytics-header">
        <h3>{title}</h3>
      </div>
      
      <div className="analytics-content">
        <div className="stats-table">
          <div className="table-header">
            <div className="header-cell">Department</div>
            <div className="header-cell">Students</div>
            <div className="header-cell">Applications</div>
            <div className="header-cell">Approved</div>
            <div className="header-cell">Rate</div>
          </div>
          
          {departmentStats.map(stat => (
            <div key={stat.department} className="table-row">
              <div className="table-cell department-name">
                {stat.department}
              </div>
              <div className="table-cell">
                {stat.totalStudents}
              </div>
              <div className="table-cell">
                <div className="application-bar">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: maxApplications > 0 
                        ? `${(stat.applications / maxApplications) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                  <span className="bar-text">{stat.applications}</span>
                </div>
              </div>
              <div className="table-cell">
                <span className="approved-count">{stat.approved}</span>
              </div>
              <div className="table-cell">
                <span className={`rate-badge ${stat.placementRate >= 70 ? 'high' : stat.placementRate >= 40 ? 'medium' : 'low'}`}>
                  {stat.placementRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="analytics-summary">
          <div className="summary-item">
            <span className="summary-label">Total Applications:</span>
            <span className="summary-value">{data.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average Placement Rate:</span>
            <span className="summary-value">
              {Math.round(departmentStats.reduce((acc, stat) => acc + stat.placementRate, 0) / departmentStats.length)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;