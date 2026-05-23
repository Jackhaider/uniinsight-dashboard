import React from 'react';
import { Settings, Bell, Shield } from 'lucide-react';

const ParentSettings = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Parent Preferences (Settings)</h2>
          <p className="text-muted">Configure your notification frequency and account details</p>
        </div>
      </div>

      <div className="glass module-card">
        <div className="flex-start"><Bell size={20} className="text-warning"/> <h3>Alert Configuration</h3></div>
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <div className="flex-between">
            <span>Immediate SMS on Absence</span>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }}/>
          </div>
          <div className="flex-between">
            <span>Weekly Performance Summary Email</span>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }}/>
          </div>
          <div className="flex-between">
            <span>Fee Deadlines (7-day warning)</span>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentSettings;
