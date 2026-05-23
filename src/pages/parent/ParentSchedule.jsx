import React from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const ParentSchedule = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Student Schedule Overview</h2>
          <p className="text-muted">Track daily whereabouts and academic load</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Today's Institutional Timeline</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="flex-start" style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #2962ff' }}>
            <Clock size={20} className="text-blue" style={{ minWidth: '20px' }}/>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Data Structures (CS-301)</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> Lecture Hall A</p>
            </div>
            <div className="badge info">09:00 AM - 10:30 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParentSchedule;
