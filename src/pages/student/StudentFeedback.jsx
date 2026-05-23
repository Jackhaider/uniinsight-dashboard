import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

const StudentFeedback = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Feedback System</h2>
          <p className="text-muted">Connect with your Faculty / Administration</p>
        </div>
      </div>

      <div className="glass module-card" style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Submit Formal Inquiry</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Pertaining Subsystem (Teacher)</label>
            <select style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px' }}>
              <option>Prof. Alan Turing (CS-301)</option>
              <option>Prof. Ada Lovelace (MTH-201)</option>
            </select>
          </div>

          <div>
            <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Inquiry Details</label>
            <textarea 
              rows="4" 
              placeholder="State your question or feedback..."
              style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px', resize: 'vertical' }}
            ></textarea>
          </div>

          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}><Send size={16}/> Submit Request</button>
        </div>
      </div>
    </div>
  );
};
export default StudentFeedback;
