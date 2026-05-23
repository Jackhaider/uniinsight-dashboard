import React from 'react';
import { Activity, Users, ArrowUp, ArrowDown } from 'lucide-react';

const ParentComparison = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Peer Comparison</h2>
          <p className="text-muted">See how your child performs against class averages</p>
        </div>
      </div>

      <div className="glass module-card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users className="text-blue" size={20} /> Child vs Class Average
        </h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Your Child</th>
              <th>Class Average</th>
              <th>Delta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Computer Science Marks</td>
              <td style={{ fontWeight: 'bold' }}>92%</td>
              <td>78%</td>
              <td><span className="text-green flex-start"><ArrowUp size={14}/> +14%</span></td>
            </tr>
            <tr>
              <td>Attendance</td>
              <td style={{ fontWeight: 'bold' }}>82%</td>
              <td>85%</td>
              <td><span className="text-red flex-start" style={{ color: '#FF3B30' }}><ArrowDown size={14}/> -3%</span></td>
            </tr>
            <tr>
              <td>Mathematics Marks</td>
              <td style={{ fontWeight: 'bold', color: '#FF3B30' }}>46%</td>
              <td>71%</td>
              <td><span className="badge critical"><ArrowDown size={12}/> -25% below average</span></td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248, 113, 113, 0.05)', borderRadius: '8px', borderLeft: '3px solid #FF3B30' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>Summary Insight:</strong> Your child is performing excellently in technical subjects, but is significantly underperforming in Mathematics compared to their peers.</p>
        </div>
      </div>
    </div>
  );
};
export default ParentComparison;
