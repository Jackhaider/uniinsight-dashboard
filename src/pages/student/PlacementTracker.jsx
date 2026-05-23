import React from 'react';
import { Briefcase, FileText, UserCheck, Star } from 'lucide-react';

const PlacementTracker = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Career Readiness Tracker</h2>
          <p className="text-muted">Track your interview preparation for your professional career</p>
        </div>
        <button className="btn btn-primary"><Briefcase size={16}/> View Open Roles</button>
      </div>

      <div className="glass module-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #2962ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
            B+
          </div>
        </div>
        <div>
          <h3>Career Readiness: Solid</h3>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '8px 0 16px 0', lineHeight: 1.5 }}>Your technical skills hit the institutional standard, but your soft skills and resume formatting need polishing before primary campus placements.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass module-card">
          <div className="flex-start"><FileText size={20} className="text-blue"/> <h3>Resume Audit</h3></div>
          <p className="text-muted" style={{ margin: '0.5rem 0' }}>AI Score: <strong className="text-blue">7.2/10</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>
            <li>Action verbs missing in Experience block</li>
            <li>GitHub link is active</li>
          </ul>
        </div>
        
        <div className="glass module-card">
          <div className="flex-start"><UserCheck size={20} className="text-warning"/> <h3>Mock Interviews</h3></div>
          <p className="text-muted" style={{ margin: '0.5rem 0' }}>Technical: <strong className="text-green">Pass</strong> | HR: <strong className="text-red">Needs Work</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '10px 0', fontSize: '0.9rem', color: '#9ca3af' }}>
            <li>Great problem breakdown</li>
            <li>Lack of eye contact during HR questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PlacementTracker;
