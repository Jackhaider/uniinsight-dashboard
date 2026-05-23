import React from 'react';
import { Layers, ArrowDown, ArrowUp } from 'lucide-react';

const AdminDepartments = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Departmental Performance Comparison</h2>
          <p className="text-muted">Compare Performance and Success across all institutional branches</p>
        </div>
      </div>

      <div className="glass module-card" style={{ padding: '1rem 2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Students</th>
              <th>Avg Attendance</th>
              <th>Placement Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: 'rgba(74, 222, 128, 0.05)' }}>
              <td><strong className="text-green">Computer Science (CSE)</strong></td>
              <td>1,200</td>
              <td>88%</td>
              <td style={{ fontWeight: 'bold' }}>94%</td>
              <td><span className="badge success"><ArrowUp size={12}/> High Performance</span></td>
            </tr>
            <tr>
              <td><strong>Electronics (ECE)</strong></td>
              <td>850</td>
              <td>82%</td>
              <td>81%</td>
              <td><span className="badge info">Stable</span></td>
            </tr>
            <tr style={{ background: 'rgba(248, 113, 113, 0.05)' }}>
              <td><strong className="text-red" style={{ color: '#FF3B30' }}>Mechanical (MECH)</strong></td>
              <td>600</td>
              <td>71%</td>
              <td style={{ fontWeight: 'bold', color: '#FF3B30' }}>55%</td>
              <td><span className="badge critical"><ArrowDown size={12}/> Performance Dropping</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDepartments;
