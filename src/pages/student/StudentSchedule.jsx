import React from 'react';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

const StudentSchedule = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Academic Calendar</h2>
          <p className="text-muted">Class timeline and exam schedules</p>
        </div>
        <button className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}><CalendarDays size={16}/> Sync Apple Calendar</button>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Today's Timeline</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="flex-start" style={{ background: 'rgba(41, 98, 255, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #2962ff' }}>
            <Clock size={20} className="text-blue" style={{ minWidth: '20px' }}/>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Data Structures (CS-301)</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> Lecture Hall A</p>
            </div>
            <div className="badge info">09:00 AM - 10:30 AM</div>
          </div>

          <div className="flex-start" style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #34C759' }}>
            <Clock size={20} className="text-green" style={{ minWidth: '20px' }}/>
            <div style={{ flex: 1, marginLeft: '10px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Software Eng Lab</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> Computer Lab 3</p>
            </div>
            <div className="badge success">11:00 AM - 01:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentSchedule;
