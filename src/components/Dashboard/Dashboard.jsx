import React from 'react';
import StudentDashboard from './StudentDashboard';
import MentorDashboard from './MentorDashboard';
import PlacementDashboard from './PlacementDashboard';
import EmployerDashboard from './EmployerDashboard';

const Dashboard = ({ user }) => {
  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'mentor':
        return <MentorDashboard user={user} />;
      case 'placement':
        return <PlacementDashboard user={user} />;
      case 'employer':
        return <EmployerDashboard user={user} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="dashboard fade-in">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;