import React from 'react';
import { BookOpen, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

const StudentAssignments = () => {
  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Project Submissions & Tasks</h2>
          <p className="text-muted">Manage your pending deliverables to boost your academic cap</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Pending Deliverables</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Task Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="text-blue font-bold">CS-301</span></td>
              <td>Graph Theory Implementation (Python)</td>
              <td>Tomorrow, 11:59 PM</td>
              <td><span className="badge critical">Urgent</span></td>
              <td><button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><UploadCloud size={14}/> Submit</button></td>
            </tr>
            <tr>
              <td><span className="text-blue font-bold">MTH-201</span></td>
              <td>Calculus Workings - Chapter 4</td>
              <td>Next Friday</td>
              <td><span className="badge warning">Pending</span></td>
              <td><button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><UploadCloud size={14}/> Submit</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="glass module-card" style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recently Completed</h3>
        <table className="data-table">
          <tbody>
            <tr>
              <td><span className="text-muted">ENG-101</span></td>
              <td className="text-muted" style={{ textDecoration: 'line-through' }}>Essay: The Impact of AI</td>
              <td><span className="badge success"><CheckCircle2 size={12}/> Graded (9/10)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentAssignments;
