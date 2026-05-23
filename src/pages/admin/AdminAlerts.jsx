import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const AdminAlerts = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Systemic Risks & Alerts</h2>
          <p className="text-muted">Macro-level institutional warnings</p>
        </div>
        <div className="badge critical">2 Active Risks</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div className="glass module-card" style={{ borderLeft: '4px solid #FF3B30' }}>
          <div className="flex-start">
            <AlertTriangle size={20} color="#FF3B30"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>High Dropout Risk Identified</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>AI flags 20 students in the Mechanical department as High Risk for dropping out next semester due to compounding poor marks and low attendance.</p>
        </div>

        <div className="glass module-card" style={{ borderLeft: '4px solid #facc15' }}>
          <div className="flex-start">
            <AlertCircle size={20} color="#facc15"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Pending Dues Spike</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>There is an 8% increase in late fee submissions compared to last term.</p>
        </div>
      </div>
    </div>
  );
};
export default AdminAlerts;
