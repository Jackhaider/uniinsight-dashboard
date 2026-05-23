import React from 'react';
import { Briefcase } from 'lucide-react';

const ParentPlacement = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Placement Readiness Review</h2>
          <p className="text-muted">Is your child ready for the professional world?</p>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="glass module-card">
          <p className="text-muted" style={{ paddingBottom: '10px' }}>Readiness Score</p>
          <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#2962ff' }}>84<span style={{fontSize:'1rem'}}>/100</span></h3>
        </div>
        <div className="glass module-card" style={{ borderLeft: '3px solid #facc15'}}>
          <p className="text-muted" style={{ paddingBottom: '10px' }}>Identified Skill Gaps</p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li>Verbal Communication (HR Interviews)</li>
            <li>System Design exposure</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ParentPlacement;
