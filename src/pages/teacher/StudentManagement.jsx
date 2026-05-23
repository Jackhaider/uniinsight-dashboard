import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  MoreHorizontal, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ChevronRight,
  Download,
  Mail,
  Zap,
  Clock,
  ClipboardList,
  Target,
  BarChart3,
  Award
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const studentsData = [
  { id: 1, name: 'Alice Smith', roll: '2024CS01', attendance: '95%', score: 88, status: 'good', email: 'alice.s@college.edu', assignments: '12/12' },
  { id: 2, name: 'Bob Johnson', roll: '2024CS02', attendance: '62%', score: 55, status: 'risk', email: 'bob.j@college.edu', assignments: '8/12' },
  { id: 3, name: 'Charlie Brown', roll: '2024CS03', attendance: '82%', score: 72, status: 'average', email: 'charlie.b@college.edu', assignments: '10/12' },
  { id: 4, name: 'Diana Prince', roll: '2024CS04', attendance: '98%', score: 94, status: 'good', email: 'diana.p@college.edu', assignments: '12/12' },
  { id: 5, name: 'Evan Williams', roll: '2024CS05', attendance: '72%', score: 68, status: 'average', email: 'evan.w@college.edu', assignments: '9/12' },
  { id: 6, name: 'Fiona Gallagher', roll: '2024CS06', attendance: '58%', score: 48, status: 'risk', email: 'fiona.g@college.edu', assignments: '6/12' },
];

const perfTrend = [
  { month: 'Aug', score: 65 },
  { month: 'Sep', score: 72 },
  { month: 'Oct', score: 68 },
  { month: 'Nov', score: 78 },
];

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStudents = studentsData.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm);
    if (activeFilter === 'risk') return matchesSearch && s.status === 'risk';
    if (activeFilter === 'good') return matchesSearch && s.status === 'good';
    return matchesSearch;
  });

  return (
    <div className="student-management-module animate-fade">
      {/* Header & Global Filters */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Student Performance Center</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Monitor individual progress and identify academic risks.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
          <div className="search-box-premium" style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder="Search by Name or Roll..." 
              style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15, 23, 42, 0.4)', fontSize: '0.9rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline"><Filter size={16} /> Filters</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        
        {/* Left Column: Student Census & Filters */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          
          {/* Performance Filters Row */}
          <div className="flex-start" style={{ gap: '10px' }}>
             <button onClick={() => setActiveFilter('all')} className={`chip ${activeFilter === 'all' ? 'active' : ''}`} style={{ padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.06)', background: activeFilter === 'all' ? '#0f172a' : '#fff', color: activeFilter === 'all' ? '#fff' : '#475569', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>All Students</button>
             <button onClick={() => setActiveFilter('good')} className={`chip ${activeFilter === 'good' ? 'active' : ''}`} style={{ padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.06)', background: activeFilter === 'good' ? '#34C759' : '#fff', color: activeFilter === 'good' ? '#fff' : '#475569', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Top Performers 🥇</button>
             <button onClick={() => setActiveFilter('risk')} className={`chip ${activeFilter === 'risk' ? 'active' : ''}`} style={{ padding: '8px 16px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.06)', background: activeFilter === 'risk' ? '#FF3B30' : '#fff', color: activeFilter === 'risk' ? '#fff' : '#475569', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>At Risk 🔴</button>
          </div>

          <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
               <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Active Student List</h4>
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f5f5f7', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Student</th>
                    <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Attend</th>
                    <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Score</th>
                    <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr 
                      key={student.id} 
                      onClick={() => setSelectedStudent(student)}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer', background: selectedStudent?.id === student.id ? '#f1f5f9' : 'transparent', transition: 'all 0.2s' }}
                      className="hover-row"
                    >
                      <td style={{ padding: '15px 20px' }}>
                        <div className="flex-start" style={{ gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{student.name[0]}</div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{student.name}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{student.roll}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '15px 20px', fontWeight: 600, color: parseInt(student.attendance) < 75 ? '#FF3B30' : '#0f172a' }}>{student.attendance}</td>
                      <td style={{ textAlign: 'center', padding: '15px 20px', fontWeight: 600 }}>{student.score}</td>
                      <td style={{ textAlign: 'center', padding: '15px 20px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: student.status === 'risk' ? '#FF3B30' : student.status === 'good' ? '#34C759' : '#FF9500', margin: '0 auto' }}></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Group Insights (Class Level) */}
          <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}><BarChart3 size={18} color="#0f172a" /> Class Level Aggregate</h4>
             <div className="flex-between">
                <div>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Average Performance:</p>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>78 / 100</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Distribution:</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}><span style={{color: '#34C759'}}>42% Top</span> • <span style={{color: '#FF3B30'}}>14% Risk</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Deep-Dive Student Profile */}
        <div className="flex-col">
          {selectedStudent ? (
            <div className="animate-slide-up" style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              
              {/* Profile Header Card */}
              <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                  <div className="flex-start" style={{ gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: '#007AFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700 }}>{selectedStudent.name[0]}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{selectedStudent.name}</h3>
                      <p className="text-muted" style={{ margin: 0 }}>Roll No: {selectedStudent.roll} • {selectedStudent.email}</p>
                    </div>
                  </div>
                  <div className="flex-col" style={{ alignItems: 'flex-end', gap: '8px' }}>
                     <span className="badge" style={{ background: selectedStudent.status === 'risk' ? '#fff1f2' : '#f0fdf4', color: selectedStudent.status === 'risk' ? '#be123c' : '#166534', padding: '6px 14px', border: `1px solid ${selectedStudent.status === 'risk' ? '#fecaca' : '#bbf7d0'}`, borderRadius: '50px', fontWeight: 700, fontSize: '0.75rem' }}>
                       {selectedStudent.status.toUpperCase()} STATUS
                     </span>
                     <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Mail size={14} /> Contact Parent</button>
                  </div>
                </div>

                {/* AI Insight (Powerful Blunt View) */}
                <div style={{ background: 'rgba(88, 86, 214, 0.03)', border: '1px solid rgba(88, 86, 214, 0.2)', padding: '1.2rem', borderRadius: '10px', display: 'flex', gap: '12px', marginBottom: '1.5rem', borderLeft: '5px solid #5856D6' }}>
                   <Zap size={24} color="#5856D6" style={{ flexShrink: 0 }} />
                   <p style={{ margin: 0, fontSize: '0.95rem', color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
                     <strong style={{color: '#5856D6'}}>Teaching Assistant Insights:</strong> {selectedStudent.status === 'risk' 
                       ? `"They've missed quite a few classes recently (62% attendance) and fallen behind on 4 assignments. A quick check-in to see how they're doing could really help them get back on track."` 
                       : `"They are doing wonderfully! Punctual with all assignments and consistently performing at the top of the class. Keep encouraging this great momentum!"`}
                   </p>
                </div>

                {/* Performance Chart */}
                <div>
                   <h4 className="flex-start" style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}><TrendingUp size={18} color="#0f172a" /> Growth Trajectory</h4>
                   <div style={{ height: '220px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={perfTrend}>
                        <defs>
                          <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={selectedStudent.status === 'risk' ? '#FF3B30' : '#007AFF'} stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={selectedStudent.status === 'risk' ? '#FF3B30' : '#007AFF'} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                        <XAxis dataKey="month" stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                        <YAxis stroke="#86868b" fontSize={12} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}} />
                        <Area type="monotone" dataKey="score" stroke={selectedStudent.status === 'risk' ? '#FF3B30' : '#007AFF'} strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Academic Data: Attendance, Marks, Assignments */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
                    <h4 className="flex-start" style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}><ClipboardList size={18} color="#FF9500" /> Academic Record</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                       <div className="flex-between" style={{ padding: '8px', background: '#f5f5f7', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Internal 1:</span>
                          <span style={{ fontWeight: 700 }}>82 / 100</span>
                       </div>
                       <div className="flex-between" style={{ padding: '8px', background: '#f5f5f7', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Internal 2:</span>
                          <span style={{ fontWeight: 700, color: selectedStudent.status === 'risk' ? '#FF3B30' : '#0f172a' }}>{selectedStudent.status === 'risk' ? '45' : '88'} / 100</span>
                       </div>
                       <div className="flex-between" style={{ padding: '8px', background: '#f5f5f7', borderRadius: '6px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>External Target:</span>
                          <span style={{ fontWeight: 700 }}>90 / 100</span>
                       </div>
                    </div>
                 </div>

                 <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
                    <h4 className="flex-start" style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}><Clock size={18} color="#007AFF" /> Attendance & Progress</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       <div>
                          <div className="flex-between" style={{ marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Attendance:</span>
                            <span style={{ fontWeight: 700 }}>{selectedStudent.attendance}</span>
                          </div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                            <div style={{ width: selectedStudent.attendance, height: '100%', background: parseInt(selectedStudent.attendance) < 75 ? '#FF3B30' : '#007AFF', borderRadius: '10px' }}></div>
                          </div>
                       </div>
                       <div className="flex-between" style={{ marginTop: '8px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Tasks Done:</span>
                          <span style={{ fontWeight: 700 }}>{selectedStudent.assignments}</span>
                       </div>
                       <button className="btn btn-outline" style={{ width: '100%', padding: '6px', fontSize: '0.8rem' }}>Check Absence Log</button>
                    </div>
                 </div>
              </div>

              {/* Actions & Feedback */}
              <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                 <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                   <h4 className="flex-start" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1d1d1f' }}><CheckCircle2 size={18} color="#34C759" /> Faculty Interventions</h4>
                   <span style={{ fontSize: '0.75rem', color: '#86868b' }}>Actions recorded for student progress history</span>
                 </div>
                 <div className="flex-start" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                    <button className="btn" style={{ background: '#007AFF', color: 'white', border: 'none' }}>Quick Attendance</button>
                    <button className="btn" style={{ background: '#34C759', color: 'white', border: 'none' }}>Update Marks</button>
                    <button className="btn" style={{ background: '#5856D6', color: 'white', border: 'none' }}>Award Badge</button>
                 </div>
                 <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#86868b' }}>Instructor Remarks (Sent to Parent/Student):</p>
                    <textarea 
                      placeholder="Add performance feedback or behavioral observations..." 
                      style={{ width: '100%', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '10px', color: '#1d1d1f', fontSize: '0.9rem', minHeight: '80px', outline: 'none' }}
                    ></textarea>
                    <div className="flex-between" style={{ marginTop: '10px' }}>
                       <span style={{ fontSize: '0.75rem', color: '#86868b' }}>Press Enter to save remark</span>
                       <button className="btn" style={{ background: '#e5e5ea', color: '#1d1d1f', padding: '6px 16px', fontSize: '0.85rem' }}>Submit Feedback</button>
                    </div>
                 </div>
              </div>

            </div>
          ) : (
            <div className="module-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f7', border: '1px dashed #cbd5e1', borderRadius: '12px' }}>
               <User size={64} color="#94a3b8" style={{ marginBottom: '1rem', opacity: 0.3 }} />
               <h3 style={{ margin: 0, color: '#64748b' }}>No Student Selected</h3>
               <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Select a student from the list to view their full academic profile.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentManagement;
