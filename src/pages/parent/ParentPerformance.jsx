import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const yearlyData = [
  { term: 'T1', value: 780 },
  { term: 'T2', value: 810 },
  { term: 'T3', value: 790 },
  { term: 'T4', value: 845 },
];

const ParentPerformance = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Performance Tracking</h2>
          <p className="text-muted">Historical progress of your child</p>
        </div>
        <div className="badge purple" style={{ background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #d2d2d7' }}><Activity size={14}/> Up 6.9% YTD</div>
      </div>

      <div className="module-card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#1d1d1f' }}>Academic Score Growth</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="term" stroke="#86868b" axisLine={false} tickLine={false} />
              <YAxis stroke="#86868b" axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }} />
              <Area type="monotone" dataKey="value" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default ParentPerformance;
