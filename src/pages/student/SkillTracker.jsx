import React from 'react';
import { Activity, Code, Database, Layout } from 'lucide-react';

const SkillTracker = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Skill & Competency Tracker</h2>
          <p className="text-muted">Analyze your technical skills</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass module-card">
          <div className="flex-start"><Code size={20} className="text-blue"/> <h3>Core Programming</h3></div>
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><span>Python (Level 4)</span> <span>85%</span></div>
            <div className="progress-container" style={{ margin: '0' }}><div className="progress-fill primary" style={{ width: '85%' }}></div></div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><span>Java (Level 2)</span> <span>45%</span></div>
            <div className="progress-container" style={{ margin: '0' }}><div className="progress-fill primary" style={{ width: '45%' }}></div></div>
          </div>
        </div>

        <div className="glass module-card">
          <div className="flex-start"><Database size={20} className="text-green"/> <h3>Data Engineering</h3></div>
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><span>SQL (Level 3)</span> <span>60%</span></div>
            <div className="progress-container" style={{ margin: '0' }}><div className="progress-fill success" style={{ width: '60%' }}></div></div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><span>MongoDB (Level 1)</span> <span>25%</span></div>
            <div className="progress-container" style={{ margin: '0' }}><div className="progress-fill success" style={{ width: '25%' }}></div></div>
          </div>
        </div>

        <div className="glass module-card">
          <div className="flex-start"><Layout size={20} className="text-warning"/> <h3>Frontend Dev</h3></div>
          <div style={{ marginTop: '1rem' }}>
            <div className="flex-between text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><span>React (Level 4)</span> <span>90%</span></div>
            <div className="progress-container" style={{ margin: '0' }}><div className="progress-fill warning" style={{ width: '90%' }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkillTracker;
