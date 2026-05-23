import React from 'react';
import { BrainCircuit, TrendingDown, Target } from 'lucide-react';

const AdminGrowth = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>University Growth & Macro AI Insights</h2>
          <p className="text-muted">AI-driven analysis of long-term trends and systemic issues</p>
        </div>
      </div>

      {/* The Golden Feature: AI Macro Analysis */}
      <div className="glass module-card" style={{ padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.4)', background: 'var(--bg-surface)' }}>
        <div className="flex-start" style={{ marginBottom: '1.5rem' }}>
          <BrainCircuit size={28} color="#818cf8" />
          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>System Assessment: Why is Placement Growth Stagnating?</h3>
        </div>
        
        <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #FF3B30' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0, color: 'var(--text-primary)' }}>
            "The overall placement rate has flatlined at 88% due to systemic underperformance in the <strong style={{ color: '#facc15' }}>Mechanical Engineering Department</strong>. 
            AI Analysis reveals a <span style={{ color: '#FF3B30', fontWeight: 'bold' }}>lack of modern syllabus integration</span> (AI/ML tools) resulting in a 40% rejection rate during HR rounds for Mechanical students."
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h4 className="flex-start" style={{ color: '#4ade80', fontSize: '1.1rem', marginBottom: '1rem' }}><Target size={20}/> Recommended Actions (Institutional Leadership):</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li className="flex-start" style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px' }}>
              <span className="badge warning">Action</span> Mandate a curriculum review for the Mechanical department by end of Q3.
            </li>
            <li className="flex-start" style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px' }}>
              <span className="badge info">Action</span> Implement soft-skills bootcamps targeting 3rd-year non-IT branches.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AdminGrowth;
