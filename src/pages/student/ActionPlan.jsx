import React from 'react';
import { Target, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const tasks = [
  { id: 1, title: 'Complete Mathematics Assignment 4', type: 'Critical', time: 'Today', status: 'pending' },
  { id: 2, title: 'Practice Graph Traversal Algorithms', type: 'Growth', time: 'This Week', status: 'pending' },
  { id: 3, title: 'Attend Mock Technical Interview', type: 'Requirement', time: 'Tomorrow 10 AM', status: 'completed' },
];

const ActionPlan = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Daily Action Plan</h2>
          <p className="text-muted">Your personalized mentor guidance for optimal growth</p>
        </div>
        <div className="badge blue"><Target size={14}/> 2 Actions Required</div>
      </div>

      <div className="glass module-card" style={{ maxWidth: '800px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target className="text-blue" size={20} /> Suggested Steps to Recover Value
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '1rem', background: 'var(--bg-main)', borderRadius: '8px',
              borderLeft: task.status === 'completed' ? '3px solid #34C759' : '3px solid #2962ff',
              opacity: task.status === 'completed' ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {task.status === 'completed' ? <CheckCircle2 size={24} color="#34C759"/> : <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #374151' }}></div>}
                <div>
                  <h4 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</h4>
                  <div className="flex-start">
                    <span className={`badge ${task.type === 'Critical' ? 'critical' : 'info'}`} style={{ padding: '2px 8px', fontSize: '0.65rem' }}>{task.type}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {task.time}</span>
                  </div>
                </div>
              </div>
              <button className="icon-btn"><ArrowRight size={20} className="text-muted" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ActionPlan;
