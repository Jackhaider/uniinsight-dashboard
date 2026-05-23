import React from 'react';
import { Outlet } from 'react-router-dom';
import './student/StudentDashboard.css'; // We will create this centralized CSS

const StudentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
};

export default StudentDashboard;
