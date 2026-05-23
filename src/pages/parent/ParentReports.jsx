import React from 'react';
import { Download, FileText } from 'lucide-react';

const ParentReports = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Performance Reports</h2>
          <p className="text-muted">Downloadable official transcripts and performance summaries</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Available Documents</h3>
        <table className="data-table">
          <tbody>
            <tr>
              <td><FileText size={16} className="text-blue" style={{display:'inline', marginRight:'8px'}}/> Term 1 Final Performance Report</td>
              <td>Generated Oct 15</td>
              <td><button className="btn btn-outline" style={{ padding: '4px 12px' }}><Download size={14}/> PDF</button></td>
            </tr>
            <tr>
              <td><FileText size={16} className="text-blue" style={{display:'inline', marginRight:'8px'}}/> Monthly Attendance Summary (November)</td>
              <td>Generated Nov 01</td>
              <td><button className="btn btn-outline" style={{ padding: '4px 12px' }}><Download size={14}/> PDF</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ParentReports;
