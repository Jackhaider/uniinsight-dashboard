import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Zap,
  Bell,
  MoreVertical,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Upload
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const assignmentsData = [
  { id: 1, title: 'Data Structures Lab 04: Linked Lists', class: 'CS-A', subject: 'Data Structures', dueDate: 'Oct 28, 2024', submitted: 42, total: 64, status: 'active' },
  { id: 2, title: 'Python Basics Weekly Quiz', class: 'CS-B', subject: 'Python', dueDate: 'Oct 20, 2024', submitted: 64, total: 64, status: 'closed' },
  { id: 3, title: 'Semester Project Proposal', class: 'All Sections', subject: 'Project Work', dueDate: 'Nov 05, 2024', submitted: 15, total: 240, status: 'active' },
];

const studentsSubmissions = [
  { id: 1, name: 'Alice Smith', roll: '2024CS01', status: 'submitted', date: 'Oct 24, 2024', marks: 85, feedback: 'Excellent logic.' },
  { id: 2, name: 'Bob Johnson', roll: '2024CS02', status: 'missing', date: '-', marks: null, feedback: '' },
  { id: 3, name: 'Charlie Brown', roll: '2024CS03', status: 'submitted', date: 'Oct 25, 2024', marks: 72, feedback: 'Good effort, but check time complexity.' },
  { id: 4, name: 'Diana Prince', roll: '2024CS04', status: 'submitted', date: 'Oct 23, 2024', marks: 94, feedback: 'Perfect implementation.' },
  { id: 5, name: 'Evan Williams', roll: '2024CS05', status: 'missing', date: '-', marks: null, feedback: '' },
  { id: 6, name: 'Fiona Gallagher', roll: '2024CS06', status: 'missing', date: '-', marks: null, feedback: '' },
];

const analyticData = [
  { name: 'Mon', rate: 45 },
  { name: 'Tue', rate: 52 },
  { name: 'Wed', rate: 85 },
  { name: 'Thu', rate: 92 },
  { name: 'Fri', rate: 64 },
];

const AssignmentManagement = () => {
  const [view, setView] = useState('list'); // 'list' or 'detail'
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGradingPanel, setShowGradingPanel] = useState(null); // student object

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setView('detail');
  };

  const stats = {
    totalIssued: assignmentsData.length,
    activeAssignments: assignmentsData.filter(a => a.status === 'active').length,
    avgSubmission: '84.2%'
  };

  return (
    <div className="assignment-module animate-fade">
      
      {view === 'list' ? (
        <>
          {/* List View Header */}
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Assignment Center</h2>
              <p className="text-muted" style={{ fontSize: '1rem' }}>Manage assignment distribution, track student participation, and grade student work.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>
              <Plus size={18} /> Create Assignment
            </button>
          </div>

          {/* KPI Dashboard */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="module-card" style={{ background: '#ffffff', border: '1px solid #d2d2d7', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#1d1d1f' }}>Total Issued</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{stats.totalIssued}</h3>
            </div>
            <div className="module-card" style={{ background: '#ffffff', border: '1px solid #d2d2d7', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#007AFF', fontWeight: 600 }}>Active Now</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#007AFF' }}>{stats.activeAssignments}</h3>
            </div>
            <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid #d2d2d7', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#34C759', fontWeight: 600 }}>Avg Submission Rate</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#34C759' }}>{stats.avgSubmission}</h3>
            </div>
          </div>

          {/* Assignment Records */}
          <div className="module-card" style={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Assignment Records</h4>
               <div className="flex-start" style={{ gap: '10px' }}>
                  <div className="search-box-mini" style={{ position: 'relative', width: '200px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input type="text" placeholder="Search Assignments..." style={{ width: '100%', padding: '6px 10px 6px 32px', borderRadius: '6px', border: '1px solid #d2d2d7', fontSize: '0.8rem' }} />
                  </div>
                  <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><Filter size={14} /> Filters</button>
               </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f5f5f7' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Assignment Title</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Class / Section</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Due Date</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Participation</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignmentsData.map(assignment => (
                  <tr key={assignment.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover-row">
                    <td style={{ padding: '18px 20px' }}>
                      <div className="flex-start" style={{ gap: '12px' }}>
                        <div style={{ padding: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}><FileText size={18} color="#475569" /></div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>{assignment.title}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569' }}>{assignment.subject}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px', fontSize: '0.85rem', fontWeight: 600 }}>{assignment.class}</td>
                    <td style={{ textAlign: 'center', padding: '18px 20px', fontSize: '0.85rem', color: '#1d1d1f' }}>{assignment.dueDate}</td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <div style={{ width: '120px', margin: '0 auto' }}>
                          <div className="flex-between" style={{ marginBottom: '4px', fontSize: '0.75rem' }}>
                            <span style={{ fontWeight: 700 }}>{assignment.submitted}/{assignment.total}</span>
                            <span style={{ color: '#475569' }}>{Math.round((assignment.submitted/assignment.total)*100)}%</span>
                          </div>
                          <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                             <div style={{ width: `${(assignment.submitted/assignment.total)*100}%`, height: '100%', background: '#007AFF', borderRadius: '10px' }}></div>
                          </div>
                       </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <span className="badge" style={{ background: assignment.status === 'active' ? '#f0fdf4' : '#f8fafc', color: assignment.status === 'active' ? '#166534' : '#94a3b8', border: `1px solid ${assignment.status === 'active' ? '#bbf7d0' : '#e2e8f0'}`, fontSize: '0.7rem', fontWeight: 700, borderRadius: '50px', padding: '4px 12px' }}>
                         {assignment.status.toUpperCase()}
                       </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <button onClick={() => handleAssignmentClick(assignment)} className="btn btn-outline" style={{ fontSize: '0.75rem' }}>View Submissions <ArrowRight size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Detailed Submission Tracking View */
        <div className="animate-slide-right">
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <button onClick={() => setView('list')} className="btn btn-outline" style={{ padding: '8px 16px' }}>
              <ArrowLeft size={16} /> Back to Overview
            </button>
            <div className="flex-start" style={{ gap: '10px' }}>
               <button className="btn btn-outline"><Download size={16} /> Extract All Submissions</button>
               <button className="btn btn-primary">Publish Grades</button>
            </div>
          </div>

          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.6rem', color: '#0f172a', marginBottom: '4px' }}>{selectedAssignment.title}</h2>
              <p className="text-muted">Participation Overview • Submission Tracking</p>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #d2d2d7', padding: '10px 20px', borderRadius: '12px', display: 'flex', gap: '2rem' }}>
               <div>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Submissions</p>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{selectedAssignment.submitted} <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 400 }}>/ {selectedAssignment.total}</span></p>
               </div>
               <div style={{ borderLeft: '1px solid rgba(0,0,0,0.05)' }}></div>
               <div>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Participation</p>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#34C759' }}>{Math.round((selectedAssignment.submitted/selectedAssignment.total)*100)}%</p>
               </div>
               <div style={{ borderLeft: '1px solid rgba(0,0,0,0.05)' }}></div>
               <div>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Missing</p>
                  <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FF3B30' }}>{selectedAssignment.total - selectedAssignment.submitted}</p>
               </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
             
             {/* Pending Students (Golden Feature) */}
             <div className="flex-col" style={{ gap: '1.5rem' }}>
                <div className="module-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '12px' }}>
                   <div className="flex-between" style={{ marginBottom: '1.2rem' }}>
                      <h4 className="flex-start" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#991b1b' }}><AlertCircle size={18} /> Pending Submissions</h4>
                      <button className="btn" style={{ background: '#991b1b', color: 'white', border: 'none', padding: '4px 10px', fontSize: '0.7rem' }}>Nudge All</button>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {studentsSubmissions.filter(s => s.status === 'missing').map(student => (
                        <div key={student.id} className="flex-between" style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                           <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{student.name}</span>
                           <span style={{ fontSize: '0.7rem', color: '#475569' }}>ID: {student.roll}</span>
                           <button className="icon-btn tiny" style={{ color: '#FF3B30' }}><Bell size={14} /></button>
                        </div>
                      ))}
                   </div>
                </div>

                {/* AI Insight Diagnostic */}
                <div className="module-card" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #5856D6' }}>
                   <div className="flex-start" style={{ gap: '10px', marginBottom: '10px' }}>
                      <Zap size={20} color="#5856D6" />
                      <h4 style={{ margin: 0, color: '#5b21b6', fontWeight: 700 }}>Participation AI Insight</h4>
                   </div>
                   <p style={{ margin: 0, color: '#4c1d95', fontSize: '0.9rem', lineHeight: 1.5, fontWeight: 500 }}>
                     \"The current **84% submission rate** is lower than the historical average for this subject. 12 pending students identified. Majority of non-participants are also in the 'Risk' attendance category.\"
                   </p>
                </div>

                {/* Analytics Sparkline */}
                <div className="module-card" style={{ background: '#ffffff', border: '1px solid #d2d2d7', padding: '1.5rem', borderRadius: '12px' }}>
                   <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', fontWeight: 700 }}>Daily Submission Velocity</h4>
                   <div style={{ height: '150px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticData}>
                          <defs>
                            <linearGradient id="rateColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="rate" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#rateColor)" />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </div>
             </div>

             {/* Student Submission List & Grading */}
             <div className="flex-col" style={{ gap: '1.5rem' }}>
                <div className="module-card" style={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Submission Records</h4>
                     <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}><Filter size={14} /> Only Missing</button>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f5f5f7' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Student</th>
                        <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Timestamp</th>
                        <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Mark</th>
                        <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsSubmissions.map(student => (
                        <tr key={student.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <td style={{ padding: '15px 20px' }}>
                             <div className="flex-start" style={{ gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: student.status === 'missing' ? '#fef2f2' : '#f0fdf4', color: student.status === 'missing' ? '#FF3B30' : '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>{student.name[0]}</div>
                                <div>
                                   <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{student.name}</p>
                                   <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569' }}>ID: {student.roll} • {student.status}</p>
                                </div>
                             </div>
                          </td>
                          <td style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.8rem', color: '#1d1d1f' }}>{student.date}</td>
                          <td style={{ textAlign: 'center', padding: '15px 20px' }}>
                             {student.marks ? (
                               <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{student.marks} <span style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 400 }}>/ 100</span></span>
                             ) : (
                               <span style={{ color: '#475569', fontSize: '0.8rem' }}>Unmarked</span>
                             )}
                          </td>
                          <td style={{ textAlign: 'center', padding: '15px 20px' }}>
                             <div className="flex-center" style={{ gap: '10px' }}>
                                {student.status === 'submitted' ? (
                                  <>
                                    <button className="icon-btn" style={{ color: '#007AFF' }}><Download size={16} /></button>
                                    <button onClick={() => setShowGradingPanel(student)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#34C759', color: '#34C759' }}>Grade Task</button>
                                  </>
                                ) : (
                                  <button className="icon-btn" style={{ color: '#FF3B30' }}><Bell size={16} /></button>
                                )}
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>

          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: '#ffffff', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
           <div className="module-card animate-slide-up" style={{ width: '100%', maxWidth: '560px', background: '#ffffff', borderRadius: '16px', border: '1px solid #d2d2d7', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                 <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Create Session Assignment</h3>
                 <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>Assign a new academic task to your students.</p>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                 <div className="flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Assignment Title</label>
                    <input type="text" placeholder="e.g. Data Analysis Project Phase 1" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.95rem' }} />
                 </div>
                 <div className="flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Description / Guidelines</label>
                    <textarea placeholder="Outline the core objectives and requirements..." style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.95rem', minHeight: '100px' }}></textarea>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Target Subject</label>
                      <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.95rem' }}>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Computer Science</option>
                      </select>
                    </div>
                    <div className="flex-col" style={{ gap: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Due Deadline</label>
                      <input type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.95rem' }} />
                    </div>
                 </div>
                 <div style={{ border: '2px dashed #e2e8f0', padding: '2rem', borderRadius: '12px', textAlign: 'center', background: '#f5f5f7' }}>
                    <Upload size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#1d1d1f' }}>Drop instruction PDF/Doc, or <span style={{ color: '#007AFF', fontWeight: 700, cursor: 'pointer' }}>browse local files</span></p>
                 </div>
              </div>
              <div style={{ padding: '1.5rem', background: '#f5f5f7', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                 <button onClick={() => setShowCreateModal(false)} className="btn btn-outline" style={{ background: 'white' }}>Cancel</button>
                 <button className="btn btn-primary" style={{ padding: '10px 24px' }}>Assign to Students</button>
              </div>
           </div>
        </div>
      )}

      {/* Grading Drawer/Panel */}
      {showGradingPanel && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: '#ffffff', backdropFilter: 'blur(2px)', display: 'flex', justifyContent: 'flex-end', zIndex: 1001 }}>
           <div className="animate-slide-left" style={{ width: '100%', maxWidth: '480px', background: '#ffffff', height: '100%', borderLeft: '1px solid rgba(0,0,0,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="flex-between">
                 <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Grading Panel</h3>
                 <button onClick={() => setShowGradingPanel(null)} className="icon-btn"><XCircle size={24} /></button>
              </div>
              
              <div className="flex-start" style={{ gap: '1.2rem', padding: '1.2rem', background: '#f5f5f7', borderRadius: '12px' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#007AFF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}>{showGradingPanel.name[0]}</div>
                 <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{showGradingPanel.name}</h4>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Submitted on {showGradingPanel.date} • Roll: {showGradingPanel.roll}</p>
                 </div>
              </div>

              <div className="module-card" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid #d2d2d7', padding: '1.5rem', borderRadius: '12px' }}>
                 <div className="flex-between" style={{ marginBottom: '1.2rem' }}>
                    <span className="flex-start" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}><FileText size={16} /> student_submission_v1.pdf</span>
                    <button className="btn" style={{ padding: '4px 12px', background: '#ffffff', border: '1px solid #d2d2d7', fontSize: '0.75rem' }}>Open Viewer</button>
                 </div>
                 <div style={{ height: '160px', background: '#cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d1d1f' }}>
                    PDF Preview Not Available
                 </div>
              </div>

              <div className="flex-col" style={{ gap: '1.5rem' }}>
                 <div className="flex-col" style={{ gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Performance Score</label>
                    <div style={{ position: 'relative' }}>
                       <input type="number" placeholder="0 - 100" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #007AFF', fontSize: '1.2rem', fontWeight: 800 }} />
                       <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#475569', fontWeight: 700 }}>/ 100</span>
                    </div>
                 </div>
                 <div className="flex-col" style={{ gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>Instructor Feedback</label>
                    <textarea 
                      placeholder="Add specific remarks, observations, or improvement suggestions..." 
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.95rem', minHeight: '120px' }}
                    ></textarea>
                 </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                 <button onClick={() => setShowGradingPanel(null)} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 700 }}>Save Grades</button>
                 <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#475569' }}>Academic record will be synced to Student and Parent portals.</p>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default AssignmentManagement;
