import React from 'react';
import { BookOpen } from 'lucide-react';

const AdminAcademics = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Curriculum Management</h2>
          <p className="text-muted">Oversee courses, subjects, and institutional syllabus</p>
        </div>
        <button className="btn btn-primary"><BookOpen size={16}/> Add New Subject</button>
      </div>
      
      <div className="glass module-card">
        <p className="text-muted">Curriculum configuration is currently locked for the active semester.</p>
      </div>
    </div>
  );
};
export default AdminAcademics;
