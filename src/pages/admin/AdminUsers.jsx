import React from 'react';
import { UserPlus, Users } from 'lucide-react';

const AdminUsers = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Identity Access & User Management</h2>
          <p className="text-muted">Control all roles across the institutional platform</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={16}/> Provision New User</button>
      </div>
      
      <div className="glass module-card">
        <p className="text-muted">Currently managing 4,250 Students, 120 Teachers, and 4,000+ Parent Accounts.</p>
      </div>
    </div>
  );
};
export default AdminUsers;
