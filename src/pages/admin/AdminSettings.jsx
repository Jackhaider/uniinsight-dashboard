import React from 'react';
import { Settings, Shield } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Platform Configuration</h2>
          <p className="text-muted">Root access settings for the UniInsight platform</p>
        </div>
        <div className="badge critical"><Shield size={14}/> Root Access</div>
      </div>
    </div>
  );
};
export default AdminSettings;
