import React from 'react';
import { 
  Users, 
  Target, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  BrainCircuit, 
  AlertTriangle, 
  ShieldAlert,
  TrendingDown,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  Briefcase,
  Bell,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';

const growthData = [
  { year: '2020', performance: 72, placement: 65 },
  { year: '2021', performance: 75, placement: 68 },
  { year: '2022', performance: 70, placement: 72 },
  { year: '2023', performance: 78, placement: 85 },
  { year: '2024', performance: 82, placement: 88 },
];

const deptData = [
  { name: 'CSE', perf: 85, place: 92 },
  { name: 'ME', perf: 72, place: 65 },
  { name: 'CE', perf: 68, place: 58 },
  { name: 'ECE', perf: 80, place: 82 },
];

const AdminOverview = () => {
  return (
    <div className="admin-module animate-fade">
      {/* Header */}
      <div className="flex-between">
        <div>
          <h2>Institutional Overview</h2>
          <p className="text-muted">Global monitoring of university performance, academic success, and corporate readiness.</p>
        </div>
        <div className="uni-card" style={{ padding: '0.8rem 1.5rem', flexDirection: 'row', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <span style={{ fontSize: '0.9rem', color: '#34C759', fontWeight: 600 }}>University Health Score:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34C759' }}>78 / 100</span>
        </div>
      </div>

      {/* Row 1: Top Overview Cards (KPIs) */}
      <div className="uni-kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginTop: '2rem' }}>
        <div className="uni-kpi blue">
          <span className="uni-kpi-label"><Users size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Students</span>
          <span className="uni-kpi-value">4,250</span>
          <span className="uni-kpi-desc text-green"><TrendingUp size={12}/> +12% YoY</span>
        </div>
        <div className="uni-kpi purple">
          <span className="uni-kpi-label"><Activity size={14} style={{ display: 'inline', marginRight: '4px' }}/> Avg Performance</span>
          <span className="uni-kpi-value">78.4%</span>
          <div className="progress-container">
            <div className="progress-fill primary" style={{ width: '78%' }}></div>
          </div>
        </div>
        <div className="uni-kpi green">
          <span className="uni-kpi-label"><Target size={14} style={{ display: 'inline', marginRight: '4px' }}/> Placement Rate</span>
          <span className="uni-kpi-value">88.2%</span>
          <span className="uni-kpi-desc text-green"><TrendingUp size={12}/> Above Benchmark</span>
        </div>
        <div className="uni-kpi amber">
          <span className="uni-kpi-label"><Clock size={14} style={{ display: 'inline', marginRight: '4px' }}/> Attendance %</span>
          <span className="uni-kpi-value">82.1%</span>
          <span className="uni-kpi-desc text-warning"><TrendingDown size={12}/> -2% vs prev week</span>
        </div>
        <div className="uni-kpi rose">
          <span className="uni-kpi-label"><DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }}/> Fees Collected</span>
          <span className="uni-kpi-value">92.5%</span>
          <div className="progress-container">
            <div className="progress-fill warning" style={{ width: '92.5%' }}></div>
          </div>
        </div>
      </div>

      {/* Row 2: AI Insight & Alerts */}
      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="uni-card" style={{ borderLeft: '4px solid #5856D6', justifyContent: 'center', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="uni-card-header" style={{ marginBottom: '0.5rem' }}>
            <h3 className="uni-card-title text-indigo" style={{ color: '#5856D6' }}><BrainCircuit size={24} /> Learning Assistant Insight</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', fontWeight: 500, color: '#1d1d1f' }}>
            "We've noticed that placement conversion has been a bit stagnant recently, even though coding scores look great! It seems like low attendance at mock interviews (especially in CSE/ECE) might be holding our students back. Encouraging participation in soft-skills training could really help boost their confidence and success rates."
          </p>
        </div>

        <div className="uni-card" style={{ border: '1px solid #ffe5e5', background: '#fff0f0' }}>
          <div className="uni-card-header">
            <h3 className="uni-card-title text-red"><ShieldAlert size={20} /> Global Risks</h3>
          </div>
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-between">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>High Risk Students (Fail Risk)</span>
              <span className="uni-badge danger">42</span>
            </div>
            <div className="flex-between">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Low Attendance Warnings</span>
              <span className="uni-badge danger">118</span>
            </div>
            <div className="flex-between">
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mech Dept Underperforming</span>
              <span className="uni-badge warning">-12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Performance, Placement & Department Snapshots */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">Performance Distribution</h4>
          </div>
          <div className="flex-col" style={{ gap: '1.5rem', flex: 1, justifyContent: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--color-positive)' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-positive)', fontWeight: 700, letterSpacing: '0.5px' }}>TOP PERFORMERS (ELITE)</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.8rem' }}>285 <span className="text-muted" style={{ fontSize: '0.85rem' }}>Students</span></h3>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--color-negative)' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-negative)', fontWeight: 700, letterSpacing: '0.5px' }}>WEAK / VULNERABLE</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.8rem' }}>142 <span className="text-muted" style={{ fontSize: '0.85rem' }}>Students</span></h3>
            </div>
          </div>
        </div>

        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">Placement Pipeline</h4>
          </div>
          <div className="flex-col" style={{ alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
             <h3 className="text-blue" style={{ fontSize: '3.5rem', margin: 0, fontWeight: 800 }}>52%</h3>
             <p className="uni-badge info" style={{ marginTop: '0.5rem' }}>CORPORATE READY</p>
             <div className="flex-between" style={{ gap: '10px', marginTop: '1.5rem', width: '100%' }}>
               <div style={{ flex: 1, padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: 'var(--color-positive)' }}>48% PLACED</div>
               <div style={{ flex: 1, padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', color: 'var(--color-negative)' }}>48% NOT READY</div>
             </div>
          </div>
        </div>

        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">Department Benchmarking</h4>
          </div>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#86868b" fontSize={12} width={40} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f'}} />
                <Bar dataKey="place" fill="#007AFF" radius={[0, 4, 4, 0]} name="Placement Ready (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: University Growth, Faculty & Fees */}
      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">University Progress Trend (YoY Growth)</h4>
            <div className="flex-start" style={{ gap: '12px' }}>
               <span className="flex-start" style={{ fontSize: '0.75rem', fontWeight: 600 }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--color-info)'}}></div> Academic Performance</span>
               <span className="flex-start" style={{ fontSize: '0.75rem', fontWeight: 600 }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--color-positive)'}}></div> Corporate Success</span>
            </div>
          </div>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34C759" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f'}} />
                <Area type="monotone" dataKey="performance" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                <Area type="monotone" dataKey="placement" stroke="#34C759" strokeWidth={3} fillOpacity={1} fill="url(#colorPlace)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-col" style={{ gap: '1.5rem' }}>
           <div className="uni-card">
             <div className="uni-card-header">
               <h4 className="uni-card-title"><Briefcase size={18} className="text-blue" /> Faculty Insight</h4>
             </div>
             <p className="text-muted" style={{ fontSize: '0.85rem', margin: '0 0 0.8rem' }}>Top Growth Drivers:</p>
             <div className="flex-col" style={{ gap: '10px' }}>
                <div className="flex-between" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Dr. Singh (CSE)</span>
                  <span className="text-green" style={{ fontSize: '0.85rem', fontWeight: 700 }}>+12% Progress</span>
                </div>
                <div className="flex-between" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Prof. Rao (Math)</span>
                  <span className="text-green" style={{ fontSize: '0.85rem', fontWeight: 700 }}>+8.5% Improv</span>
                </div>
             </div>
           </div>

           <div className="uni-card" style={{ flex: 1, justifyContent: 'space-between' }}>
             <div>
               <div className="uni-card-header" style={{ marginBottom: '0.5rem' }}>
                 <h4 className="uni-card-title"><DollarSign size={18} className="text-warning" /> Fiscal Health</h4>
               </div>
               <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>Fees Collected:</span>
                  <span style={{ fontWeight: 700 }}>₹1.2 Cr</span>
               </div>
               <div className="flex-between">
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>Outstanding Dues:</span>
                  <span className="text-red" style={{ fontWeight: 700 }}>₹15.4 L</span>
               </div>
             </div>
             <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '10px', fontSize: '0.85rem' }}>View Pending Dues List</button>
           </div>
        </div>
      </div>

      {/* Row 5: Today's Activity & Notifications */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="uni-card">
           <div className="uni-card-header">
             <h4 className="uni-card-title"><Clock size={18} className="text-indigo" /> Today's Pulse</h4>
           </div>
           <div className="flex-col" style={{ gap: '12px' }}>
              <div className="flex-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.9rem' }}>Academic Attendance Marked</span>
                <span className="uni-badge success">98.2% Done</span>
              </div>
              <div className="flex-between" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.9rem' }}>New Assignment Submissions</span>
                <span style={{ fontWeight: 600 }}>+1,420</span>
              </div>
              <div className="flex-between" style={{ padding: '12px 0' }}>
                <span style={{ fontSize: '0.9rem' }}>Lectures Conducted</span>
                <span style={{ fontWeight: 600 }}>85 / 112 Remaining</span>
              </div>
           </div>
        </div>

        <div className="uni-card">
           <div className="uni-card-header">
             <h4 className="uni-card-title"><Bell size={18} className="text-warning" /> Institutional Briefing</h4>
           </div>
           <div className="flex-col" style={{ gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--color-warning)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Campus Recruitment starts Monday (Google/Amazon)</p>
                <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.75rem' }}>3m ago • Placement Cell</p>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--color-info)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>NAAC Accreditation data collection nearing deadline</p>
                <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.75rem' }}>2h ago • Admin Office</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};
export default AdminOverview;
