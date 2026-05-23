import React from 'react';
import { Search, Filter, ShieldAlert } from 'lucide-react';

const AdminStudents = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Student Records & Analytics</h2>
          <p className="text-muted">Global registry of all institutional equities</p>
        </div>
      </div>

      <div className="glass module-card">
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div className="search-bar" style={{ width: '300px', background: 'var(--bg-main)' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Search by name, ID, or department..." style={{ padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
          <button className="btn btn-outline"><Filter size={16}/> Filter Risk Candidates</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Health Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>STD-1042</td>
              <td>Alex Chen</td>
              <td>B.Tech CSE</td>
              <td>92/100</td>
              <td><span className="badge success">Optimal</span></td>
            </tr>
            <tr>
              <td>STD-1089</td>
              <td>Sarah Miller</td>
              <td>B.Tech ECE</td>
              <td>78/100</td>
              <td><span className="badge info">Stable</span></td>
            </tr>
            <tr style={{ background: 'rgba(248, 113, 113, 0.05)' }}>
              <td>STD-1102</td>
              <td>James Wilson</td>
              <td>B.Tech MECH</td>
              <td style={{ color: '#FF3B30' }}>45/100</td>
              <td><span className="badge critical"><ShieldAlert size={12}/> High Risk</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminStudents;
