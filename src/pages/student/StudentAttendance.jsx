import React, { useState } from 'react';
import { 
  CalendarCheck, ShieldAlert, Check, TrendingUp, TrendingDown,
  BrainCircuit, Calculator, Bell, Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { name: 'Week 1', percent: 85 },
  { name: 'Week 2', percent: 82 },
  { name: 'Week 3', percent: 79 },
  { name: 'Week 4', percent: 78 }, // Current
];

const StudentAttendance = () => {
  const [currentAttendance] = useState(78);
  const requiredAttendance = 75;

  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Attendance Intelligence</h2>
          <p className="text-muted">Analyze your physical presence and institutional compliance</p>
        </div>
      </div>

      {/* Feature 6: AI Insight (High Impact) */}
      <div className="module-card" style={{ background: '#f5f5f7', borderLeft: '4px solid #007AFF', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex-start">
          <BrainCircuit size={20} color="#007AFF" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Your Learning Assistant</h3>
        </div>
        <p style={{ marginTop: '0.8rem', color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
          "You're doing great overall with {currentAttendance}% attendance, putting you in the <span style={{color: '#34C759'}}>SAFE</span> zone! Just a friendly heads-up: your <strong style={{color: '#FF3B30'}}>Physics</strong> attendance is at 65% since you've missed a few Monday mornings. Let's try to make those next week!"
        </p>
      </div>

      <div className="stats-grid">
        {/* Feature 1: Overview */}
        <div className="module-card">
          <p className="text-muted">Course Attendance Overview</p>
          <div className="flex-start" style={{ alignItems: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
            <h3 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{currentAttendance}%</h3>
            <div style={{ paddingBottom: '0.5rem' }}>
              <span className="badge success" style={{ fontSize: '0.85rem' }}><Check size={14}/> Safe</span>
              <p className="text-muted" style={{ fontSize: '0.8rem', margin: '4px 0 0 0' }}>Required limit: 75%</p>
            </div>
          </div>
          <p className="text-muted flex-start" style={{ fontSize: '0.85rem', marginTop: 'auto' }}>
            <TrendingDown size={14} className="text-warning"/> Dropped 1% since last week
          </p>
        </div>

        {/* Feature 7: Required Classes Calculator (Golden Feature) */}
        <div className="uni-card" style={{ background: '#e5f0ff', border: '1px solid #cce0ff' }}>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
             <p style={{ color: '#007AFF', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Calculator size={18}/> Goal Tracker</p>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>Physics is at 65%</h4>
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px dashed #007AFF' }}>
            <p style={{ margin: 0, color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
              To hit that 75% goal, all you need to do is attend your next <strong style={{ fontSize: '1.4rem', color: '#007AFF' }}>5</strong> Physics classes. You can totally do this!
            </p>
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Feature 4: Trend Graph */}
        <div className="module-card">
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Macro Attendance Trend</h3>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Area type="monotone" dataKey="percent" stroke="#007AFF" strokeWidth={2} fillOpacity={1} fill="url(#colorPercent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature 3: Subject-wise & Feature 5: Risk Indicator */}
        <div className="module-card flex-col" style={{ gap: '0' }}>
           <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Subject-wise Attendance</h3>
           <table className="data-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th style={{ padding: '0.8rem' }}>Subject</th>
                <th style={{ padding: '0.8rem', textAlign: 'right' }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.8rem' }}><strong>CS (Core)</strong></td>
                <td style={{ padding: '0.8rem', textAlign: 'right', fontWeight: 600 }} className="text-green">90%</td>
              </tr>
              <tr>
                <td style={{ padding: '0.8rem' }}><strong>Math</strong></td>
                <td style={{ padding: '0.8rem', textAlign: 'right', fontWeight: 600 }}>82%</td>
              </tr>
              <tr style={{ background: '#fff0f0' }}>
                <td style={{ padding: '0.8rem' }}><strong>Physics</strong></td>
                <td style={{ padding: '0.8rem', textAlign: 'right', fontWeight: 600, color: '#FF3B30' }}>65%</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <div className="flex-start" style={{ fontSize: '0.85rem', fontWeight: 500, color: '#FF3B30' }}><ShieldAlert size={14} color="#FF3B30" /> Attention Needed</div>
          </div>
        </div>
      </div>

      {/* Feature 2: Calendar View */}
      <div className="module-card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Monthly Compliance Calendar (Current)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', paddingBottom: '0.5rem' }}>{day}</div>
          ))}
          {/* Mock Calendar Grid - First week */}
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #fecaca' }}><span style={{color: '#991b1b', fontWeight: 'bold'}}>A</span></div>
          {/* Second week */}
          <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #fecaca' }}><span style={{color: '#991b1b', fontWeight: 'bold'}}>A</span></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#fef9c3', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #fef08a' }}><span style={{color: '#854d0e', fontWeight: 'bold'}}>L</span></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}><Check size={16} color="#166534"/></div>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', paddingTop: '1rem', fontSize: '0.85rem' }}>
            <span style={{ marginRight: '1rem' }}><span style={{ display:'inline-block', width:'10px', height:'10px', background:'#dcfce7', borderRadius:'50%', marginRight:'4px' }}></span> Present</span>
            <span style={{ marginRight: '1rem' }}><span style={{ display:'inline-block', width:'10px', height:'10px', background:'#fee2e2', borderRadius:'50%', marginRight:'4px' }}></span> Absent (A)</span>
            <span><span style={{ display:'inline-block', width:'10px', height:'10px', background:'#fef9c3', borderRadius:'50%', marginRight:'4px' }}></span> Leave (L)</span>
          </div>
        </div>
      </div>

      {/* Feature 8 & 10: Daily Log & Notifications */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Daily Attendance Log</h3>
           <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
             <div>
               <p style={{ margin: 0, fontWeight: 500 }}>Oct 24, Today</p>
               <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.85rem' }}>Physics Lecture</p>
             </div>
             <span className="badge critical">Absent</span>
           </div>
           <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
             <div>
               <p style={{ margin: 0, fontWeight: 500 }}>Oct 23, Yesterday</p>
               <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.85rem' }}>CS Lab & Theory</p>
             </div>
             <span className="badge success">Present</span>
           </div>
           <div className="flex-between" style={{ padding: '0.8rem 0' }}>
             <div>
               <p style={{ margin: 0, fontWeight: 500 }}>Oct 22</p>
               <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.85rem' }}>Advanced Math</p>
             </div>
             <span className="badge warning">Leave</span>
           </div>
        </div>
        
        <div className="module-card" style={{ borderTop: '4px solid #FF9500', justifyContent: 'flex-start' }}>
           <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <Bell size={20} color="#FF9500"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Active Notifications</h3>
           </div>
           <div style={{ background: '#fff0f0', padding: '1rem', borderRadius: '8px', border: '1px solid #ffe5e5', marginBottom: '0.5rem' }}>
             <p style={{ margin: 0, color: '#FF3B30', fontSize: '0.9rem', fontWeight: 500 }}>You missed today's Physics class.</p>
           </div>
           <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '8px', border: '1px solid #fef3c7' }}>
             <p style={{ margin: 0, color: '#FF9500', fontSize: '0.9rem', fontWeight: 500 }}>Warning: Overall attendance is dropping near 75%.</p>
           </div>
        </div>
      </div>

    </div>
  );
};
export default StudentAttendance;
