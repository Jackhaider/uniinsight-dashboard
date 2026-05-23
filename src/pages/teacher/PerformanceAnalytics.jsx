import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Line, Cell, PieChart, Pie, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  AlertTriangle, 
  Target, 
  Zap, 
  Users, 
  Activity, 
  BarChart3, 
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardCheck,
  ZapOff
} from 'lucide-react';

const performanceHistory = [
  { month: 'Internal 1', score: 65, attendance: 92 },
  { month: 'Internal 2', score: 72, attendance: 85 },
  { month: 'Mid-Term', score: 68, attendance: 78 },
  { month: 'External', score: 84, attendance: 90 },
];

const subjectPulse = [
  { name: 'Python', score: 88, attendance: 94 },
  { name: 'DSA', score: 62, attendance: 72 },
  { name: 'Math', score: 74, attendance: 82 },
  { name: 'OS', score: 58, attendance: 65 },
  { name: 'Networking', score: 81, attendance: 88 },
];

const correlationData = [
  { attendance: 95, score: 88, name: 'Alice' },
  { attendance: 62, score: 55, name: 'Bob' },
  { attendance: 82, score: 72, name: 'Charlie' },
  { attendance: 98, score: 94, name: 'Diana' },
  { attendance: 72, score: 68, name: 'Evan' },
  { attendance: 58, score: 48, name: 'Fiona' },
  { attendance: 88, score: 82, name: 'George' },
  { attendance: 65, score: 52, name: 'Hannah' },
];

const distributionData = [
  { range: 'Elite (90+)', count: 5, fill: '#34C759' },
  { range: 'High (75-90)', count: 12, fill: '#007AFF' },
  { range: 'Avg (40-75)', count: 8, fill: '#FF9500' },
  { range: 'Risk (<40)', count: 4, fill: '#FF3B30' },
];

const PerformanceAnalytics = () => {
  return (
    <div className="performance-analytics animate-fade">
      {/* 1. Header & Quick Pulse */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Class Intelligence Dashboard</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Surgical analytics identifying the factors behind academic performance.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
           <div className="badge-ai-active" style={{background: '#f5f3ff', color: '#5856D6', border: 'none'}}>
              <Zap size={14} fill="#5856D6" color="#5856D6" /> Insights Engine Active
           </div>
           <button className="btn btn-primary">Generate Strategy PDF</button>
        </div>
      </div>

      {/* 2. Top Overview KPI Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '10px' }}>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Average Class Score</p>
            <span style={{ color: '#34C759', fontSize: '0.75rem', fontWeight: 700 }}><ArrowUpRight size={14} /> +4.2%</span>
          </div>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>74.8 <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 400 }}>/ 100</span></h3>
        </div>
        <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '10px' }}>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Current Pass Rate</p>
            <span style={{ color: '#FF3B30', fontSize: '0.75rem', fontWeight: 700 }}><ArrowDownRight size={14} /> -2.1%</span>
          </div>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>88.4%</h3>
        </div>
        <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '10px' }}>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Active Risk Factor</p>
          </div>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#FF3B30' }}>Critical</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>8 Students at high vulnerability</p>
        </div>
        <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex-between" style={{ marginBottom: '10px' }}>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Institutional Rating</p>
          </div>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#34C759' }}>A+ Tier</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#34C759', fontWeight: 700 }}>Top 5% in University</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }}>
        
        {/* Left Column: Analytical Trends & Correlations */}
        <div className="flex-col" style={{ gap: '2rem' }}>
          
          {/* Main Performance Trajectory */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
             <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}><TrendingUp size={18} color="#0f172a" style={{marginRight: '8px'}} /> Academic Growth Trajectory</h4>
                   <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Class outcome progression from Internal 1 to Final External exams.</p>
                </div>
                <div className="tabs-mini">
                   <button className="tab active">Monthly</button>
                   <button className="tab">Semester</button>
                </div>
             </div>
             <div style={{ height: '320px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceHistory}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{stroke: '#007AFF', strokeWidth: 1}} contentStyle={{background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="score" stroke="#007AFF" strokeWidth={4} fillOpacity={1} fill="url(#scoreColor)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* ATTENDANCE VS PERFORMANCE CORRELATION (GOLDEN FEATURE) */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
             <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}><Activity size={18} color="#FF3B30" style={{marginRight: '8px'}} /> Attendance x Performance Correlation</h4>
                   <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Direct causal mapping: How student presence density dictates grade outcomes.</p>
                </div>
                <span className="badge" style={{ background: '#f5f3ff', color: '#5856D6', fontWeight: 700 }}>Intelligent Map</span>
             </div>
             <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis type="number" dataKey="score" name="Score" unit="%" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                    <ZAxis type="category" dataKey="name" name="Student" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Students" data={correlationData} fill="#007AFF">
                      {correlationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.attendance < 75 ? '#FF3B30' : '#007AFF'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
             </div>
             <div style={{ marginTop: '1.5rem', background: '#f5f5f7', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '12px' }}>
                <Zap size={20} color="#5856D6" style={{flexShrink: 0}} />
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>
                  <strong>Diagnostic Insight:</strong> Students in the <span style={{color: '#FF3B30', fontWeight: 700}}>Red Zone</span> (Attendance {"<"} 75%) show an 82% higher probability of failing examinations. Presence is the primary success driver.
                </p>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
             {/* Subject Analysis */}
             <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 1.5rem', fontSize: '1rem', fontWeight: 800 }}><BarChart3 size={18} color="#0f172a" style={{marginRight: '8px'}} /> Subject Achievement Analysis</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                   {subjectPulse.map(subject => (
                     <div key={subject.name}>
                        <div className="flex-between" style={{ marginBottom: '6px' }}>
                           <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{subject.name}</span>
                           <span style={{ fontSize: '0.85rem', fontWeight: 700, color: subject.score < 65 ? '#FF3B30' : '#34C759' }}>{subject.score}% IQ Rating</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                           <div style={{ width: `${subject.score}%`, height: '100%', background: subject.score < 65 ? '#FF3B30' : '#007AFF', borderRadius: '10px' }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Grade Topology */}
             <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 1.5rem', fontSize: '1rem', fontWeight: 800 }}><Award size={18} color="#FF9500" style={{marginRight: '8px'}} /> Grade Distribution Overview</h4>
                <div style={{ height: '220px' }}>
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={distributionData} layout="vertical">
                         <XAxis type="number" hide />
                         <YAxis type="category" dataKey="range" fontSize={11} width={80} axisLine={false} tickLine={false} stroke="#64748b" />
                         <Tooltip />
                         <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {distributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

        </div>

        {/* Right Column: AI Strategic Summary & Lists */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          
          {/* AI Strategic outcome Briefing */}
          <div className="module-card" style={{ background: '#f5f5f7', border: 'none', padding: '1.5rem', borderRadius: '12px', color: '#1d1d1f' }}>
             <div className="flex-start" style={{ gap: '12px', marginBottom: '1.2rem' }}>
                <Zap size={22} color="#5856D6" fill="#5856D6" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Teaching Assistant Summary</h4>
             </div>
             <div className="flex-col" style={{ gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', borderLeft: '3px solid #5856D6' }}>
                   <p style={{ margin: 0, fontSize: '0.9rem', color: '#1d1d1f', lineHeight: 1.6 }}>
                     "The class is doing exceptionally well overall! However, a few top students are starting to miss the DSA module. It might be worth a gentle check-in to ensure they are keeping up with the material."
                   </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                   <div style={{ padding: '10px', background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.2)', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: 800 }}>Primary Strength</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem', fontWeight: 700 }}>Internal 2 Consistency</p>
                   </div>
                   <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#FF3B30', textTransform: 'uppercase', fontWeight: 800 }}>Main Bottleneck</p>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem', fontWeight: 700 }}>Assignment Submission Leak</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Critical Risk Audit (List) */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 800, color: '#FF3B30' }}><AlertCircle size={18} /> Critical Performance Risk Audit</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Bob Johnson', markers: ['Low Attendance', '2 Overdue Tasks'], risk: 'Critical' },
                  { name: 'Fiona Gallagher', markers: ['Marks Trend 📉', 'Low Attendance'], risk: 'High' },
                  { name: 'Hannah Watson', markers: ['3 Missing Assignments'], risk: 'Escalating' }
                ].map(student => (
                   <div key={student.name} style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '10px', border: '1px solid #fee2e2' }}>
                      <div className="flex-between">
                         <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#991b1b' }}>{student.name}</span>
                         <span style={{ fontSize: '0.65rem', padding: '2px 8px', background: '#991b1b', color: 'white', borderRadius: '50px', fontWeight: 800 }}>{student.risk.toUpperCase()}</span>
                      </div>
                      <div className="flex-start" style={{ gap: '6px', marginTop: '6px' }}>
                        {student.markers.map(m => <span key={m} style={{ fontSize: '0.7rem', color: '#be123c', fontWeight: 600 }}>• {m}</span>)}
                      </div>
                   </div>
                ))}
             </div>
             <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.2rem', fontSize: '0.8rem', padding: '10px' }}>Initiate Intervention</button>
          </div>

          {/* Market Outperformers (Elite List) */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 800, color: '#34C759' }}><Award size={18} /> Academic Standouts Feed</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="flex-between" style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                   <div className="flex-start" style={{ gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#34C759', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>D</div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Diana Prince</span>
                   </div>
                   <span style={{ fontWeight: 800, color: '#166534' }}>98.4%</span>
                </div>
                <div className="flex-between" style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                   <div className="flex-start" style={{ gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#34C759', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>A</div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Alice Smith</span>
                   </div>
                   <span style={{ fontWeight: 800, color: '#166534' }}>94.2%</span>
                </div>
             </div>
          </div>

          {/* Operational Pulse */}
          <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.06)', padding: '1.2rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 800 }}><Target size={16} color="#0f172a" /> Assignment Insight</h4>
             <div className="flex-between">
                <div>
                   <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Global Submission Avg:</p>
                   <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>82.4%</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Impact on Marks:</p>
                   <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#34C759' }}>+12 Point Lift ↗</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PerformanceAnalytics;
