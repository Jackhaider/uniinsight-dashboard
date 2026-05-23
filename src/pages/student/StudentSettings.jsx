import React from 'react';
import { Settings, User, Bell, Shield } from 'lucide-react';

const StudentSettings = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Profile Settings</h2>
          <p className="text-muted">Configure your personal academic profile and security</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass module-card">
          <div className="flex-start"><User size={20} className="text-blue"/> <h3>Profile Identity</h3></div>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0 0 4px 0' }}>Profile Avatar</p>
              <div style={{ width: '60px', height: '60px', background: '#2962ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>JD</div>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.8rem', margin: '0 0 4px 0' }}>Full Name</p>
              <p style={{ margin: 0 }}>John Doe</p>
            </div>
          </div>
        </div>

        <div className="glass module-card">
          <div className="flex-start"><Bell size={20} className="text-warning"/> <h3>Notification Preferences</h3></div>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <span>Risk Alerts (Critical)</span>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }}/>
            </div>
            <div className="flex-between">
              <span>Daily Action Plan emails</span>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }}/>
            </div>
            <div className="flex-between">
              <span>Leaderboard updates</span>
              <input type="checkbox" style={{ width: '18px', height: '18px' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentSettings;
