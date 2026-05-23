import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

const ParentAlerts = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Risk Indicators & Warnings</h2>
          <p className="text-muted">Early warnings to prevent academic decline</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div className="glass module-card" style={{ borderLeft: '4px solid #FF3B30' }}>
          <div className="flex-start">
            <AlertCircle size={20} color="#FF3B30"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>High Risk: May Fail Advanced Mathematics</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>The student score has dropped 25% below class average. Immediate intervention is required.</p>
        </div>

        <div className="glass module-card" style={{ borderLeft: '4px solid #facc15' }}>
          <div className="flex-start">
            <ShieldAlert size={20} color="#facc15"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Warning: Missing Assignments</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>2 homework assignments are currently pending submission.</p>
        </div>
      </div>
    </div>
  );
};
export default ParentAlerts;
