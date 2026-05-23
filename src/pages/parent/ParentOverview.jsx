import React from 'react';
import { TrendingUp, Target, AlertTriangle, Briefcase } from 'lucide-react';

const ParentOverview = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Parent Dashboard (Overview)</h2>
          <p className="text-muted">A summary of your child's academic performance</p>
        </div>
        <div className="badge success" style={{ background: '#e5f0ff', color: '#007AFF', border: 'none' }}>All Systems Go</div>
      </div>

      <div className="stats-grid">
        <div className="module-card">
          <p className="text-muted" style={{ paddingBottom: '10px' }}><TrendingUp size={16} color="#34C759" style={{display:'inline'}}/> Academic Performance Score</p>
          <h3 style={{ fontSize: '2.5rem', fontFamily: 'monospace', margin: 0, color: '#1d1d1f' }}>845 <span style={{fontSize: '1rem', color:'#86868b'}}>PTS</span></h3>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '10px' }}>Ranked #4 in Class (Top 15%)</p>
        </div>

        <div className="module-card" style={{ borderBottom: '3px solid #007AFF' }}>
          <p className="text-muted" style={{ paddingBottom: '10px' }}><Briefcase size={16} color="#007AFF" style={{display:'inline'}}/> Placement Readiness</p>
          <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#007AFF' }}>84%</h3>
          <div className="progress-container"><div className="progress-fill primary" style={{width: '84%', background: '#007AFF'}}></div></div>
          <p style={{ color: '#34C759', fontSize: '0.85rem', marginTop: '10px' }}>Ready for corporate interviews</p>
        </div>

        <div className="module-card" style={{ borderBottom: '3px solid #FF3B30' }}>
          <p className="text-muted" style={{ paddingBottom: '10px' }}><AlertTriangle size={16} color="#FF3B30" style={{display:'inline'}}/> Immediate Risks</p>
          <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#1d1d1f' }}>Attendance Warning</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '10px' }}>Advanced Math attendance is at 76% (Near penalty threshold)</p>
        </div>
      </div>
    </div>
  );
};

export default ParentOverview;
