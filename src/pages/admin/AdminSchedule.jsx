import React from 'react';
import { CalendarDays } from 'lucide-react';

const AdminSchedule = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Global Institutional Calendar</h2>
          <p className="text-muted">Manage college events, holidays, and exam timelines</p>
        </div>
        <button className="btn btn-outline"><CalendarDays size={16}/> Declare Holiday</button>
      </div>
    </div>
  );
};
export default AdminSchedule;
