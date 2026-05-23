import React from 'react';
import { Star, TrendingUp } from 'lucide-react';

const AdminFaculty = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Faculty Performance Overview</h2>
          <p className="text-muted">Track teaching effectiveness and student improvement rates</p>
        </div>
      </div>

      <div className="glass module-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Professor</th>
              <th>Department</th>
              <th>Student Improvement (Term)</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Dr. Alan Turing</strong></td>
              <td>Computer Science</td>
              <td className="text-green"><TrendingUp size={14}/> +18% Class Average</td>
              <td><span className="badge warning"><Star size={12} fill="currentColor"/> 4.8/5.0</span></td>
            </tr>
            <tr>
              <td><strong>Dr. Ada Lovelace</strong></td>
              <td>Mathematics</td>
              <td className="text-green"><TrendingUp size={14}/> +12% Class Average</td>
              <td><span className="badge warning"><Star size={12} fill="currentColor"/> 4.5/5.0</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminFaculty;
