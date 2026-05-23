import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Semester 1', avg: 72 },
  { name: 'Semester 2', avg: 75 },
  { name: 'Semester 3', avg: 68 },
  { name: 'Semester 4', avg: 82 },
  { name: 'Semester 5', avg: 86 },
];

const AdminAnalytics = () => {
  return (
    <div className="admin-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Global Student Analytics</h2>
          <p className="text-muted">Macro-level performance distribution across the campus</p>
        </div>
      </div>

      <div className="module-card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#1d1d1f' }}>Average Performance by Semester</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#86868b" axisLine={false} tickLine={false} />
              <YAxis stroke="#86868b" axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }} />
              <Bar dataKey="avg" fill="#007AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default AdminAnalytics;
