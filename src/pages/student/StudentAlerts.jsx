import React from 'react';
import { AlertTriangle, Info, BellRing } from 'lucide-react';

const StudentAlerts = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Risk Warnings & Alerts</h2>
          <p className="text-muted">Critical system notifications regarding your progress</p>
        </div>
        <div className="badge critical"><BellRing size={14}/> 1 Critical Error</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass module-card" style={{ borderLeft: '4px solid #FF3B30' }}>
          <div className="flex-start">
            <AlertTriangle size={20} color="#FF3B30"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Attendance Deficiency Warning</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>Your attendance in Advanced Mathematics has fallen to 76%. If it drops below 75%, it will negatively impact your final GPA score.</p>
        </div>

        <div className="glass module-card" style={{ borderLeft: '4px solid #2962ff' }}>
          <div className="flex-start">
            <Info size={20} color="#2962ff"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Syllabus Update</h3>
          </div>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>The evaluation criteria for the CS-301 final project has been updated. Check the assignment panel.</p>
        </div>
      </div>
    </div>
  );
};
export default StudentAlerts;
