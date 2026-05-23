import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Zap, AlertCircle, Info, 
  BrainCircuit, CheckCircle, Clock, Trophy, Bell, BookOpen, CreditCard, Activity, Loader2 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiFetch } from '../../utils/api';

const performanceData = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 680 },
  { month: 'Mar', score: 640 },
  { month: 'Apr', score: 720 },
  { month: 'May', score: 750 },
  { month: 'Jun', score: 700 }, // drop
  { month: 'Jul', score: 680 }, // current drop
];

const StudentOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiFetch('/students/me/dashboard');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="student-module animate-fade">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Student Dashboard</h2>
          <p className="text-muted">Real-time performance and insights</p>
        </div>
      </div>

      {/* Row 1: The AI Insight Banner (Most Powerful) */}
      <div className="uni-card" style={{ borderLeft: '4px solid #5856D6', background: '#f5f3ff', borderColor: '#ddd6fe', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Pulse Indicator */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5856D6', boxShadow: '0 0 10px #5856D6', animation: 'pulse 2s infinite' }}></div>
          <span className="text-indigo" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', color: '#5856D6' }}>AI ACTIVE</span>
        </div>
        <div className="flex-start">
          <BrainCircuit size={22} className="text-indigo" color="#5856D6" />
          <h3 className="text-indigo" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#5856D6' }}>Your Learning Assistant</h3>
        </div>
        <p style={{ marginTop: '0.8rem', color: '#1d1d1f', fontWeight: 500, fontSize: '1rem', lineHeight: '1.6' }}>
          "It looks like you've had a tough week with Physics attendance and Advanced Math assignments. Let's tackle your action plan today to get you back on track—you've got this!"
        </p>
      </div>

      {/* Row 2: Top Overview Cards */}
      <div className="uni-kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '2rem' }}>
        <div className="uni-kpi blue">
          <span className="uni-kpi-label"><TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }}/> Performance Score</span>
          <span className="uni-kpi-value">{dashboardData?.score || 0}</span>
          <span className="uni-kpi-desc text-red"><TrendingDown size={12}/> -4.2%</span>
        </div>

        <div className="uni-kpi green">
          <span className="uni-kpi-label"><Target size={14} style={{ display: 'inline', marginRight: '4px' }}/> Placement Ready</span>
          <span className="uni-kpi-value text-green">84%</span>
          <span className="uni-kpi-desc text-muted">Tier 1 Competency</span>
        </div>

        <div className="uni-kpi amber">
          <span className="uni-kpi-label"><Zap size={14} style={{ display: 'inline', marginRight: '4px' }}/> Attendance</span>
          <span className="uni-kpi-value">{dashboardData?.attendance || 0}%</span>
          <span className="uni-kpi-desc text-warning">Near threshold</span>
        </div>

        <div className="uni-kpi purple">
          <span className="uni-kpi-label"><Trophy size={14} style={{ display: 'inline', marginRight: '4px' }}/> Class Rank</span>
          <span className="uni-kpi-value">{dashboardData?.rank || '--'}<span className="text-muted" style={{ fontSize: '1rem' }}>/{dashboardData?.total_students || '--'}</span></span>
          <span className="uni-kpi-desc text-muted">Top {( (dashboardData?.rank / dashboardData?.total_students) * 100).toFixed(0)}%</span>
        </div>

        <div className="uni-kpi blue">
          <span className="uni-kpi-label"><CreditCard size={14} style={{ display: 'inline', marginRight: '4px' }}/> Fees Status</span>
          <span className="uni-kpi-value text-green">Paid</span>
          <span className="uni-kpi-desc text-muted">No pending dues</span>
        </div>
      </div>

      {/* Row 3: Performance Graph & Alerts */}
      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: '2rem' }}>
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">Performance History</h4>
          </div>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Area type="monotone" dataKey="score" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="uni-card" style={{ borderTop: '4px solid #FF3B30', justifyContent: 'flex-start' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={20} color="#FF3B30" />
            <h4 className="uni-card-title" style={{ margin: 0 }}>Needs Attention</h4>
          </div>
          
          <div className="flex-col" style={{ gap: '10px' }}>
            <div style={{ padding: '12px', background: '#fff0f0', borderRadius: '8px', border: '1px solid #ffe5e5' }}>
              <p style={{ margin: 0, color: '#FF3B30', fontSize: '0.9rem', fontWeight: 600 }}>🔴 Low Attendance (Physics)</p>
            </div>
            
            <div style={{ padding: '12px', background: '#fff0f0', borderRadius: '8px', border: '1px solid #ffe5e5' }}>
              <p style={{ margin: 0, color: '#FF3B30', fontSize: '0.9rem', fontWeight: 600 }}>🔴 Missing Assignment</p>
              <p style={{ margin: '4px 0 0', color: '#FF3B30', fontSize: '0.8rem', opacity: 0.8 }}>Adv. Math - Due 2 days ago</p>
            </div>

            <div style={{ padding: '12px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7' }}>
              <p style={{ margin: 0, color: '#FF9500', fontSize: '0.9rem', fontWeight: 600 }}>🟡 Performance Dropping</p>
              <p style={{ margin: '4px 0 0', color: '#FF9500', fontSize: '0.8rem', opacity: 0.8 }}>Overall score fell 4.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Action Plan & Academic Snapshot */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '2rem' }}>
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Target size={20} className="text-blue"/> Today's Action Plan</h4>
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>A personalized plan to help you reach your goals.</p>
          
          <div className="flex-start" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#007AFF' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Complete Math Assignment</p>
              <p className="text-red" style={{ margin: '4px 0 0', fontSize: '0.8rem', fontWeight: 600 }}>Overdue</p>
            </div>
          </div>
          <div className="flex-start" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#007AFF' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Attend all classes today</p>
            </div>
          </div>
          <div className="flex-start" style={{ padding: '12px 0' }}>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#007AFF' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Revise Physics Chapters 4 & 5</p>
              <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>Recommended for upcoming test</p>
            </div>
          </div>
        </div>

        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><BookOpen size={20} className="text-blue"/> Academic Snapshot</h4>
          </div>
          <table className="data-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th style={{ padding: '0.8rem 0' }}>Subject</th>
                <th style={{ padding: '0.8rem 0', textAlign: 'right' }}>Mark</th>
                <th style={{ padding: '0.8rem 0', textAlign: 'right' }}>Att.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem 0' }}>CS Core</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>92%</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }} className="text-green">90%</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0' }}>Mathematics</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>85%</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>82%</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0' }}>Physics</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }} className="text-warning">71%</td>
                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }} className="text-red">65%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 5: Leaderboard, Schedule, Notifications */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Trophy size={18} className="text-warning"/> Leaderboard</h4>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>1. Alex Chen</span> <span className="uni-badge warning">980 PTS</span>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>2. Sarah Miller</span> <span className="uni-badge" style={{ background: '#f5f5f7', color: '#1d1d1f' }}>945 PTS</span>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>3. James Wilson</span> <span className="uni-badge" style={{ background: '#f5f5f7', color: '#1d1d1f' }}>920 PTS</span>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem', marginTop: '0.8rem', background: '#e5f0ff', borderRadius: '6px', border: '1px solid rgba(0, 122, 255, 0.1)' }}>
            <span style={{ fontWeight: 600 }}>14. You</span> <span className="text-blue" style={{ fontWeight: 700, color: '#007AFF' }}>680 PTS</span>
          </div>
        </div>

        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Clock size={18} className="text-blue"/> Schedule Today</h4>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>09:00 AM</span> <span className="text-muted">Physics Lecture</span>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>11:30 AM</span> <span className="text-muted">Math Theory</span>
          </div>
          <div className="flex-between" style={{ padding: '0.8rem 0' }}>
            <span style={{ fontWeight: 500 }}>02:00 PM</span> <span className="text-muted">CS Lab</span>
          </div>
        </div>

        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Bell size={18} className="text-blue"/> Notifications</h4>
          </div>
          <div className="flex-col" style={{ gap: '1rem' }}>
            <div style={{ padding: '12px', background: '#f5f5f7', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#1d1d1f' }}>New Assignment Uploaded</p>
              <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>CS Core - 2 hrs ago</p>
            </div>
            <div style={{ padding: '12px', background: '#fff0f0', border: '1px solid #ffe5e5', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#FF3B30' }}>Attendance Alert</p>
              <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>Physics class missed yesterday</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default StudentOverview;
