import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

const ParentActivity = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Behavior & Activity Log</h2>
          <p className="text-muted">Daily summary of actions</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Today's Summary</h3>
        <p style={{ fontSize: '1.1rem', background: 'var(--bg-hover)', padding: '1rem', borderRadius: '8px' }}>
          "Attended 3 out of 4 scheduled classes. Missed 1 Assignment submission deadline."
        </p>
      </div>

      <div className="glass module-card" style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recent Actions</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <li className="flex-start"><CheckCircle2 size={16} className="text-green"/> Submitted Physics Lab Report (Yesterday)</li>
             <li className="flex-start"><Target size={16} className="text-blue"/> Joined Coding Club Seminar (Monday)</li>
        </ul>
      </div>
    </div>
  );
};
export default ParentActivity;
