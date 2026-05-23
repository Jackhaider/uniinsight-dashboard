import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Download, 
  Zap, 
  AlertCircle, 
  TrendingUp, 
  ClipboardCheck,
  MoreVertical,
  MinusCircle,
  Activity
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './ClassroomIntelligence.css'; // Leverage existing animation/badge classes if needed

const studentsData = [
  { id: 1, name: 'Alice Smith', roll: '2024CS01', status: 'present', avgAttend: '95%' },
  { id: 2, name: 'Bob Johnson', roll: '2024CS02', status: 'absent', avgAttend: '62%' },
  { id: 3, name: 'Charlie Brown', roll: '2024CS03', status: 'present', avgAttend: '82%' },
  { id: 4, name: 'Diana Prince', roll: '2024CS04', status: 'present', avgAttend: '98%' },
  { id: 5, name: 'Evan Williams', roll: '2024CS05', status: 'present', avgAttend: '72%' },
  { id: 6, name: 'Fiona Gallagher', roll: '2024CS06', status: 'absent', avgAttend: '58%' },
  { id: 7, name: 'George Miller', roll: '2024CS07', status: 'present', avgAttend: '88%' },
];

const trendData = [
  { day: '10/10', attendance: 85 },
  { day: '12/10', attendance: 78 },
  { day: '14/10', attendance: 92 },
  { day: '16/10', attendance: 88 },
  { day: '18/10', attendance: 65 },
  { day: '20/10', attendance: 90 },
  { day: '22/10', attendance: 82 },
];

const AttendanceManagement = () => {
  const [attendanceList, setAttendanceList] = useState(studentsData);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    total: attendanceList.length,
    present: attendanceList.filter(s => s.status === 'present').length,
    absent: attendanceList.filter(s => s.status === 'absent').length,
    leave: attendanceList.filter(s => s.status === 'leave').length,
    percentage: ((attendanceList.filter(s => s.status === 'present').length / attendanceList.length) * 100).toFixed(1)
  };

  const setAllStatus = (status) => {
    setAttendanceList(prev => prev.map(s => ({ ...s, status })));
  };

  const toggleStatus = (id, newStatus) => {
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const filteredStudents = attendanceList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm)
  );

  return (
    <div className="teacher-module animate-fade">
      {/* Header & Session Select */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Attendance Intelligence Terminal</h2>
          <p className="text-muted">Real-time classroom monitoring, pulse tracking, and AI anomaly detection.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
           <div className="uni-card" style={{ padding: '8px 16px', flexDirection: 'row', alignItems: 'center', gap: '12px', background: 'rgba(30, 41, 59, 0.4)' }}>
              <Calendar size={18} className="text-blue" />
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontWeight: 600, color: '#fff', fontSize: '0.95rem', outline: 'none' }}
              />
           </div>
           <button className="btn btn-primary" style={{ padding: '10px 24px', letterSpacing: '0.5px' }}>Sync Live</button>
        </div>
      </div>

      {/* Row 1: Attendance Summary (KPIs) */}
      <div className="uni-kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '2rem' }}>
        <div className="uni-kpi blue">
          <span className="uni-kpi-label"><Users size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Enrolled</span>
          <span className="uni-kpi-value">{stats.total}</span>
          <span className="uni-kpi-desc text-muted">B.Tech CSE - Section A</span>
        </div>
        <div className="uni-kpi green">
          <span className="uni-kpi-label"><CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Present</span>
          <span className="uni-kpi-value text-green">{stats.present}</span>
        </div>
        <div className="uni-kpi rose">
          <span className="uni-kpi-label"><XCircle size={14} style={{ display: 'inline', marginRight: '4px' }}/> Total Absent</span>
          <span className="uni-kpi-value text-red">{stats.absent}</span>
        </div>
        <div className="uni-kpi amber">
          <span className="uni-kpi-label"><Activity size={14} style={{ display: 'inline', marginRight: '4px' }}/> Live Attendance Rate</span>
          <span className="uni-kpi-value" style={{ color: '#fff' }}>{stats.percentage}%</span>
          <span className="uni-kpi-desc" style={{ color: stats.percentage > 75 ? 'var(--color-positive)' : 'var(--color-negative)' }}>
            <TrendingUp size={12}/> {stats.percentage > 75 ? 'Optimal Threshold' : 'Critical System Warning!'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: AI Data Grid (Table) */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          
          <div className="uni-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            {/* Action Bar */}
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.4)' }}>
               <div className="flex-start" style={{ gap: '1rem' }}>
                 <div style={{ position: 'relative', width: '280px' }}>
                   <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                   <input 
                     type="text" 
                     placeholder="Query student records..." 
                     style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--border-strong)', background: 'rgba(30, 41, 59, 0.6)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
               </div>
               <div className="flex-start" style={{ gap: '10px' }}>
                  <button onClick={() => setAllStatus('present')} className="btn" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-positive)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Mark All PRES</button>
                  <button onClick={() => setAllStatus('absent')} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-negative)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>Mark All ABS</button>
                  <button onClick={() => setAllStatus('leave')} className="btn" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>Reset</button>
               </div>
            </div>

            {/* Premium Data Grid */}
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(15, 23, 42, 0.8)', position: 'sticky', top: 0, backdropFilter: 'blur(10px)', zIndex: 10 }}>
                  <tr>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-strong)' }}>Identity & Registration</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-strong)', textAlign: 'center' }}>AI Historical %</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-strong)', textAlign: 'center' }}>Live Action Override</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '1.2rem 1.5rem' }}>
                        <div className="flex-start" style={{ gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
                            {student.name[0]}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{student.name}</p>
                            <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>{student.roll}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '1.2rem 1.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: parseInt(student.avgAttend) < 75 ? 'var(--color-negative)' : 'var(--text-secondary)' }}>
                          {student.avgAttend}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', padding: '1.2rem 1.5rem' }}>
                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                           <button 
                            onClick={() => toggleStatus(student.id, 'present')}
                            style={{ 
                              padding: '8px 16px', borderRadius: '8px', 
                              border: student.status === 'present' ? '1px solid var(--color-positive)' : '1px solid var(--border-strong)', 
                              background: student.status === 'present' ? 'rgba(16, 185, 129, 0.15)' : 'transparent', 
                              color: student.status === 'present' ? 'var(--color-positive)' : 'var(--text-muted)',
                              fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                              boxShadow: student.status === 'present' ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none'
                            }}
                           >PRES</button>
                           <button 
                            onClick={() => toggleStatus(student.id, 'absent')}
                            style={{ 
                              padding: '8px 16px', borderRadius: '8px', 
                              border: student.status === 'absent' ? '1px solid var(--color-negative)' : '1px solid var(--border-strong)', 
                              background: student.status === 'absent' ? 'rgba(239, 68, 68, 0.15)' : 'transparent', 
                              color: student.status === 'absent' ? 'var(--color-negative)' : 'var(--text-muted)',
                              fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                              boxShadow: student.status === 'absent' ? '0 0 10px rgba(239, 68, 68, 0.2)' : 'none'
                            }}
                           >ABS</button>
                           <button 
                            onClick={() => toggleStatus(student.id, 'leave')}
                            style={{ 
                              padding: '8px 16px', borderRadius: '8px', 
                              border: student.status === 'leave' ? '1px solid var(--color-warning)' : '1px solid var(--border-strong)', 
                              background: student.status === 'leave' ? 'rgba(245, 158, 11, 0.15)' : 'transparent', 
                              color: student.status === 'leave' ? 'var(--color-warning)' : 'var(--text-muted)',
                              fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s',
                              boxShadow: student.status === 'leave' ? '0 0 10px rgba(245, 158, 11, 0.2)' : 'none'
                            }}
                           >LEAVE</button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics, Risks & AI */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          
          {/* Holographic AI Behavioral Diagnostic */}
          <div className="uni-card" style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.4)', borderLeft: '4px solid var(--accent-primary)', position: 'relative', overflow: 'hidden' }}>
             {/* Pulse Indicator */}
             <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)', animation: 'pulse 2s infinite' }}></div>
                <span className="text-indigo" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px' }}>AI ACTIVE</span>
             </div>
             
             <div className="flex-start" style={{ gap: '10px', marginBottom: '1rem' }}>
                <Zap size={22} className="text-indigo" />
                <h4 className="text-indigo" style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>Predictive Diagnostic</h4>
             </div>
             <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
               "Anomaly detected: <strong>12% drop on Mondays</strong> and post-lunch sessions for this cohort. 6 students have crossed the critical 75% boundary this week."
             </p>
             <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse {
                  0% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.5; transform: scale(1.2); }
                  100% { opacity: 1; transform: scale(1); }
                }
             `}} />
          </div>

          {/* Attendance Trend Chart */}
          <div className="uni-card">
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <h4 className="flex-start" style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}><TrendingUp size={18} className="text-blue" /> Cohort Presence Trend</h4>
              <span className="uni-badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)' }}>Last 14 Days</span>
            </div>
            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="attColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{background: '#0f172a', border: '1px solid #334155', borderRadius: '8px'}} />
                  <Area type="monotone" dataKey="attendance" stroke="var(--color-info)" strokeWidth={3} fillOpacity={1} fill="url(#attColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critical Risk Students (<75%) */}
          <div className="uni-card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)' }}>
             <div className="uni-card-header" style={{ marginBottom: '1rem' }}>
               <h4 className="uni-card-title text-red"><AlertCircle size={18} /> Probation Watch List ({"<"}75%)</h4>
             </div>
             <div className="flex-col" style={{ gap: '10px' }}>
                <div className="flex-between" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                   <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Bob Johnson</span>
                   <span className="text-red" style={{ fontSize: '0.85rem', fontWeight: 800 }}>62%</span>
                </div>
                <div className="flex-between" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                   <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Fiona Gallagher</span>
                   <span className="text-red" style={{ fontSize: '0.85rem', fontWeight: 800 }}>58%</span>
                </div>
                <div className="flex-between" style={{ padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                   <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Evan Williams</span>
                   <span className="text-warning" style={{ fontSize: '0.85rem', fontWeight: 800 }}>72%</span>
                </div>
             </div>
             <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.2rem', justifyContent: 'center' }}>Download Risk Report</button>
          </div>

          {/* Mini Calendar Snapshot */}
          <div className="uni-card">
             <div className="uni-card-header">
               <h4 className="uni-card-title">Institutional Calendar Log</h4>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {[...Array(28)].map((_, i) => {
                  let bg = 'rgba(16, 185, 129, 0.2)'; // Present default
                  let border = '1px solid rgba(16, 185, 129, 0.3)';
                  if (i % 7 === 0) { bg = 'rgba(239, 68, 68, 0.2)'; border = '1px solid rgba(239, 68, 68, 0.3)'; }
                  else if (i % 5 === 0) { bg = 'rgba(245, 158, 11, 0.2)'; border = '1px solid rgba(245, 158, 11, 0.3)'; }
                  return (
                    <div key={i} style={{ aspectRatio: '1', borderRadius: '4px', background: bg, border: border }}></div>
                  )
                })}
             </div>
             <p className="text-muted" style={{ margin: '15px 0 0', fontSize: '0.75rem', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase' }}>October 2024 Signal Density</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AttendanceManagement;
