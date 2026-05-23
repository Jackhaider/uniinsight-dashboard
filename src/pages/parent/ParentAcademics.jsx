import React from 'react';
import { BookOpen } from 'lucide-react';

const ParentAcademics = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Academic Performance Details</h2>
          <p className="text-muted">Raw marks, attendance numbers, and submission records</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recent Examination Results</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Computer Science</td><td>85/100</td><td><span className="badge success">Excellent</span></td></tr>
            <tr><td>Physics</td><td>70/100</td><td><span className="badge info">Average</span></td></tr>
            <tr><td>Mathematics</td><td style={{color:'#FF3B30'}}>45/100</td><td><span className="badge critical">Poor</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ParentAcademics;
