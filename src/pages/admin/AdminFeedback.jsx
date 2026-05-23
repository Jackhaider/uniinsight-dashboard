import React from 'react';
import { MessageSquare, ThumbsDown } from 'lucide-react';

const AdminFeedback = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Feedback & Sentiment Analysis</h2>
           <p className="text-muted">Monitor satisfaction from Student and Parent stakeholders</p>
        </div>
      </div>

      <div className="glass module-card" style={{ borderLeft: '3px solid #FF3B30' }}>
        <div className="flex-start">
          <ThumbsDown size={20} color="#FF3B30"/>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Negative Sentiment Spike Detected</h3>
        </div>
        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>AI NLP analysis detects a high volume of complaints regarding the delayed release of mid-term evaluation scores from the Electrical department.</p>
      </div>
    </div>
  );
};
export default AdminFeedback;
