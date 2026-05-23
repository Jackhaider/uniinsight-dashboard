import React from 'react';
import { Outlet } from 'react-router-dom';
import './admin/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
