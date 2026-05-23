import React from 'react';
import { Outlet } from 'react-router-dom';
import './parent/ParentDashboard.css';

const ParentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
};

export default ParentDashboard;
