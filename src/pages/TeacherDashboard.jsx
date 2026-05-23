import React from 'react';
import { Outlet } from 'react-router-dom';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard-container">
      <Outlet />
    </div>
  );
};

export default TeacherDashboard;
