import React from 'react';
import { FileText, Download } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Institutional Reports</h2>
          <p className="text-muted">Generate AI-summarized official documents for accreditation and board meetings</p>
        </div>
      </div>

      <div className="glass module-card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Generate New Report</h3>
        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}><FileText size={16}/> Compile Annual Performance Summary</button>
      </div>
    </div>
  );
};
export default AdminReports;
