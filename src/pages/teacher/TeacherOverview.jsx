import React from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Clock, 
  ArrowRight, 
  Zap, 
  MessageSquare, 
  Bell,
  MoreVertical,
  ClipboardList,
  Target,
  UserPlus,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const attendanceData = [
  { day: 'Mon', percentage: 92 },
  { day: 'Tue', percentage: 88 },
  { day: 'Wed', percentage: 95 },
  { day: 'Thu', percentage: 82 },
  { day: 'Fri', percentage: 91 },
  { day: 'Sat', percentage: 85 },
];

const TeacherOverview = () => {
  return (
    <div className="teacher-module animate-fade">
      {/* Header */}
      <div className="flex-between">
        <div>
          <h2>Academic Instruction Overview</h2>
          <p className="text-muted">Manage your daily classes, track student risks, and execute core tasks.</p>
        </div>
        <div className="uni-card" style={{ padding: '0.8rem 1.5rem', flexDirection: 'row', alignItems: 'center', gap: '0.8rem' }}>
          <Clock size={16} className="text-muted" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Friday, Oct 24, 2024</span>
        </div>
      </div>

      {/* Row 1: Top Overview Cards (KPIs) */}
      <div className="uni-kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '2rem' }}>
        <div className="uni-kpi blue">
          <span className="uni-kpi-label"><Users size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Students</span>
          <span className="uni-kpi-value">64</span>
          <span className="uni-kpi-desc text-muted">B.Tech CSE - Section A</span>
        </div>
        <div className="uni-kpi green">
          <span className="uni-kpi-label"><CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }}/> Today's Attendance</span>
          <span className="uni-kpi-value text-green">92.5%</span>
          <span className="uni-kpi-desc text-green"><TrendingUp size={12}/> Above Threshold</span>
        </div>
        <div className="uni-kpi amber">
          <span className="uni-kpi-label"><BookOpen size={14} style={{ display: 'inline', marginRight: '4px' }}/> Pending Assignments</span>
          <span className="uni-kpi-value text-warning">12</span>
          <span className="uni-kpi-desc text-muted">Due within 48 hours</span>
        </div>
        <div className="uni-kpi purple">
          <span className="uni-kpi-label"><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }}/> Classes Today</span>
          <span className="uni-kpi-value">4</span>
          <span className="uni-kpi-desc text-muted">Next: Math @ 10:00 AM</span>
        </div>
      </div>

      {/* Row 2: Golden Feature (Quick Actions) */}
      <div className="uni-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(30, 41, 59, 0.6)', borderLeft: '4px solid var(--accent-primary)' }}>
        <div className="flex-start" style={{ gap: '2rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Quick Action Center</h4>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Execute frequent academic tasks instantly.</p>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)', height: '40px' }}></div>
          <div className="flex-start" style={{ gap: '1rem' }}>
            <button className="btn btn-outline"><CheckCircle2 size={16} className="text-green" /> Mark Attendance</button>
            <button className="btn btn-primary"><Plus size={16} /> Upload Assignment</button>
            <button className="btn btn-outline"><ClipboardList size={16} className="text-warning" /> Enter Marks</button>
          </div>
        </div>
        <button className="icon-btn"><MoreVertical size={20} /></button>
      </div>

      {/* Row 3: Today's Schedule, Risks & AI Insight */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        
        {/* Today's Schedule */}
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Calendar size={18} className="text-blue" /> Today's Schedule</h4>
            <span className="text-blue" style={{ fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>View Full</span>
          </div>
          <div className="flex-col" style={{ gap: '1rem' }}>
            <div className="flex-start" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--color-info)' }}>
              <div style={{ width: '60px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>10:00</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>AM</p>
              </div>
              <div style={{ marginLeft: '12px' }}>
                <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Mathematics</h5>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Section A • Room 302</p>
              </div>
            </div>
            <div className="flex-start" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', borderLeft: '4px solid var(--border-strong)' }}>
              <div style={{ width: '60px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>12:00</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>PM</p>
              </div>
              <div style={{ marginLeft: '12px' }}>
                <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Physics Lab</h5>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Section B • Lab 04</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Risk Panel */}
        <div className="uni-card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <div className="uni-card-header">
            <h4 className="uni-card-title text-red"><AlertCircle size={18} /> Academic Alerts</h4>
            <span className="uni-badge danger">5 Students</span>
          </div>
          <div className="flex-col" style={{ gap: '10px' }}>
            <div className="flex-between" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Alice Williams</span>
              <span className="text-red" style={{ fontSize: '0.75rem', fontWeight: 700 }}>Low Attendance (62%)</span>
            </div>
            <div className="flex-between" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Bob Johnson</span>
              <span className="text-red" style={{ fontSize: '0.75rem', fontWeight: 700 }}>3 Missing Assignments</span>
            </div>
            <div className="flex-between" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Charlie Brown</span>
              <span className="text-warning" style={{ fontSize: '0.75rem', fontWeight: 700 }}>Critical Marks Drop</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="uni-card" style={{ border: '1px solid rgba(88, 86, 214, 0.2)', background: 'rgba(88, 86, 214, 0.03)', justifyContent: 'center' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <Zap size={24} color="#5856D6" />
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#5856D6' }}>Teaching Assistant Insights</h4>
          </div>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', fontWeight: 500, color: 'var(--text-secondary)' }}>
            "We've noticed a dip in class momentum recently, mainly because assignment submissions are down 42% this week. It might be a good time to check in with the 5 students slipping near the 60% line—a quick encouraging word could really help them bounce back."
          </p>
          <button className="btn" style={{ marginTop: '1.5rem', background: 'transparent', color: '#5856D6', padding: 0, justifyContent: 'flex-start', fontWeight: 600 }}>Review these students →</button>
        </div>

      </div>

      {/* Row 4: Performance, Assignments & Attendance trend */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
        
        {/* Student Performance Snapshot */}
        <div className="uni-card">
           <div className="uni-card-header">
             <h4 className="uni-card-title"><Target size={18} className="text-blue" /> Performance Snapshot</h4>
           </div>
           <div className="flex-col" style={{ gap: '1.2rem', flex: 1, justifyContent: 'center' }}>
              <div className="flex-between">
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>Average Class Score:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>78 / 100</span>
              </div>
              <div className="progress-container">
                <div className="progress-fill primary" style={{ width: '78%' }}></div>
              </div>
              <div className="flex-between" style={{ gap: '1rem', marginTop: '10px' }}>
                <div style={{ flex: 1, padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--color-positive)' }}>
                  <p className="text-green" style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>TOP PERFORMER</p>
                  <p style={{ margin: '6px 0 0', fontWeight: 700, fontSize: '1.1rem' }}>Diana Prince</p>
                </div>
                <div style={{ flex: 1, padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--color-negative)' }}>
                  <p className="text-red" style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>NEEDS ATTENTION</p>
                  <p style={{ margin: '6px 0 0', fontWeight: 700, fontSize: '1.1rem' }}>Bob Johnson</p>
                </div>
              </div>
           </div>
        </div>

        {/* Attendance Trend Chart */}
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title">Weekly Attendance Visibility</h4>
            <span className="uni-badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)' }}>Last 7 Days</span>
          </div>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                <Area type="monotone" dataKey="percentage" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorAttend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 5: Assignment Overview, Notifications & Messages */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        
        {/* Assignment Tracking */}
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><ClipboardList size={18} className="text-warning" /> Assignment Status</h4>
          </div>
          <div className="flex-col" style={{ gap: '1rem', flex: 1 }}>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.95rem' }}>Assignments Given</span>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>18</span>
            </div>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.95rem' }}>Submissions Recv</span>
              <span className="text-green" style={{ fontWeight: 700, fontSize: '1.1rem' }}>542</span>
            </div>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.95rem' }}>Pending Review</span>
              <span className="text-red" style={{ fontWeight: 700, fontSize: '1.1rem' }}>24</span>
            </div>
          </div>
          <div className="progress-container" style={{ marginTop: 'auto' }}>
             <div className="progress-fill warning" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Notifications */}
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><Bell size={18} className="text-blue" /> Activity Feed</h4>
          </div>
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-start" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--color-info)', borderRadius: '50%', boxShadow: '0 0 5px var(--color-info)' }}></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>5 new assignments uploaded</p>
                <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.75rem' }}>10 mins ago</p>
              </div>
            </div>
            <div className="flex-start">
              <div style={{ width: '8px', height: '8px', background: 'var(--border-strong)', borderRadius: '50%' }}></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>System Maintenance @ 10:00 PM</p>
                <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.75rem' }}>1h ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="uni-card">
          <div className="uni-card-header">
            <h4 className="uni-card-title"><MessageSquare size={18} className="text-indigo" /> Student Communications</h4>
          </div>
          <div className="flex-col" style={{ gap: '12px', flex: 1 }}>
            <div className="flex-start" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--border-strong)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>AS</div>
              <div style={{ marginLeft: '10px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Alice Smith</p>
                <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.8rem' }}>Sir, I will be late today...</p>
              </div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>Open Hub</button>
        </div>

      </div>

    </div>
  );
};

export default TeacherOverview;
