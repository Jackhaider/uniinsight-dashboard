import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

const AdminFees = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Fee Management Portal</h2>
          <p className="text-muted">Global tracking of fee collections and pending dues</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="module-card">
          <p className="text-muted">Total Due (Current Term)</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#1d1d1f' }}>₹4.2 Cr</h3>
        </div>
        <div className="module-card" style={{ borderBottom: '3px solid #34C759' }}>
          <p className="text-muted">Successfully Collected</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#34C759' }}>₹3.8 Cr</h3>
          <div className="progress-container"><div className="progress-fill success" style={{width: '92%', background: '#34C759'}}></div></div>
        </div>
        <div className="module-card" style={{ borderBottom: '3px solid #FF3B30' }}>
          <p className="text-muted">Pending Recovery</p>
          <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#FF3B30' }}>₹40 Lakhs</h3>
        </div>
      </div>

      <div className="module-card" style={{ marginTop: '2rem' }}>
         <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#1d1d1f' }}>Students with Pending Dues</h3>
         <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><DollarSign size={16}/> Send Batch Reminders</button>
      </div>
    </div>
  );
};
export default AdminFees;
