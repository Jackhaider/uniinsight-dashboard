import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';

const ParentCommunication = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Institutional Communication</h2>
          <p className="text-muted">Direct line to teachers and administration</p>
        </div>
        <button className="btn btn-primary"><Calendar size={18} /> Book Meeting</button>
      </div>

      <div className="glass module-card" style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Send Message to Teacher</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <select style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px' }}>
            <option>Prof. Ada Lovelace (Mathematics)</option>
            <option>Prof. Alan Turing (Computer Science)</option>
          </select>
          <textarea rows="4" placeholder="Type your message..." style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px' }}></textarea>
          <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }}><MessageSquare size={16}/> Send</button>
        </div>
      </div>
    </div>
  );
};
export default ParentCommunication;
