import React from 'react';
import { Briefcase, Building } from 'lucide-react';

const AdminPlacements = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Global Placement Analytics</h2>
          <p className="text-muted">Track corporate partnerships and final IPO exits</p>
        </div>
        <button className="btn btn-outline"><Building size={16}/> Add Corporate Partner</button>
      </div>

      <div className="stats-grid">
        <div className="glass module-card">
          <p className="text-muted">Total Placed Students</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>854</h3>
        </div>
        <div className="glass module-card">
          <p className="text-muted">Average Package (CTC)</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#4ade80' }}>8.5 LPA</h3>
        </div>
        <div className="glass module-card" style={{ borderLeft: '3px solid #6366f1' }}>
          <p className="text-muted">Highest Package</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>42 LPA</h3>
        </div>
      </div>
    </div>
  );
};
export default AdminPlacements;
