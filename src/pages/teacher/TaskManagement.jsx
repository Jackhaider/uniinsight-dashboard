import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Users, 
  BarChart3, 
  Zap, 
  MessageSquare, 
  AlertCircle, 
  Calendar,
  MoreVertical,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Bell
} from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Chapter 4: Data Structure Exercises', class: 'CS-A', subject: 'Data Structures', deadline: 'Today, 5:00 PM', completed: 42, total: 60, status: 'in-progress', type: 'practice' },
  { id: 2, title: 'Python Weekly Practice Quiz 04', class: 'CS-B', subject: 'Python', deadline: 'Tomorrow', completed: 58, total: 58, status: 'completed', type: 'quiz' },
  { id: 3, title: 'Mid-term Revision Checklist', class: 'All Sections', subject: 'Exam Prep', deadline: 'Oct 30', completed: 15, total: 240, status: 'not-started', type: 'checklist' },
  { id: 4, title: 'Lab 03 Documentation (Pending)', class: 'CS-A', subject: 'Lab', deadline: 'Oct 20 (Overdue)', completed: 30, total: 60, status: 'overdue', type: 'documentation' },
];

const studentStatuses = [
  { id: 1, name: 'Alice Smith', roll: '2024CS01', status: 'completed', time: '10:45 AM' },
  { id: 2, name: 'Bob Johnson', roll: '2024CS02', status: 'pending', time: '-' },
  { id: 3, name: 'Charlie Brown', roll: '2024CS03', status: 'completed', time: 'Yesterday' },
  { id: 4, name: 'Diana Prince', roll: '2024CS04', status: 'completed', time: '2h ago' },
  { id: 5, name: 'Evan Williams', roll: '2024CS05', status: 'pending', time: '-' },
  { id: 6, name: 'Fiona Gallagher', roll: '2024CS06', status: 'pending', time: '-' },
];

const TaskManagement = () => {
  const [view, setView] = useState('list'); // 'list' or 'progress'
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalActive: initialTasks.filter(t => t.status !== 'completed').length,
    completionRate: '74.2%',
    overdueTasks: initialTasks.filter(t => t.status === 'overdue').length
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setView('progress');
  };

  return (
    <div className="task-module animate-fade">
      
      {view === 'list' ? (
        <>
          {/* 1. Header & Overview */}
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Daily Practice & Activity Hub</h2>
              <p className="text-muted" style={{ fontSize: '1rem' }}>Assign daily exercises, track completion rates, and monitor practice trends.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>
              <Plus size={18} /> Create New Activity
            </button>
          </div>

          {/* 2. Task KPI Pulse */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#1d1d1f', fontWeight: 600 }}>Active Practice Items</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>{stats.totalActive}</h3>
            </div>
            <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#34C759', fontWeight: 600 }}>Avg Completion Rate</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#34C759' }}>{stats.completionRate}</h3>
            </div>
            <div className="module-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#FF3B30', fontWeight: 700 }}>Overdue Practice Clusters</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#FF3B30' }}>{stats.overdueTasks} Tasks</h3>
            </div>
          </div>

          {/* 3. Teaching Assistant Insights */}
          <div className="module-card" style={{ background: 'rgba(88, 86, 214, 0.03)', border: '1px solid rgba(88, 86, 214, 0.2)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
             <div className="flex-start" style={{ gap: '10px', marginBottom: '8px' }}>
                <Zap size={20} color="#5856D6" />
                <h4 style={{ margin: 0, color: '#5856D6', fontWeight: 800 }}>Teaching Assistant Insights</h4>
             </div>
             <p style={{ margin: 0, color: '#1d1d1f', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
               "Class activity is looking stable at 74%, which is great! However, a few students seem to be getting stuck on the Chapter 4 exercises. A quick review session could help clear things up before the next quiz."
             </p>
          </div>

          {/* 4. The Activity Feed */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Global Practice Feed</h4>
               <div className="flex-start" style={{ gap: '10px' }}>
                  <div className="search-box-mini" style={{ position: 'relative', width: '220px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input 
                      type="text" 
                      placeholder="Search Activities..." 
                      style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.8rem' }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}><Filter size={14} /> Only Overdue</button>
               </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f5f5f7' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Activity Details</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Class</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Submission Rate</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Deadline</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {initialTasks.map(task => (
                  <tr key={task.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover-row">
                    <td style={{ padding: '18px 20px' }}>
                       <div className="flex-start" style={{ gap: '12px' }}>
                          <div style={{ padding: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px' }}><ClipboardCheck size={20} color="#475569" /></div>
                          <div>
                             <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{task.title}</p>
                             <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569' }}>{task.subject} • {task.type.toUpperCase()}</p>
                          </div>
                       </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px', fontSize: '0.85rem', fontWeight: 700 }}>{task.class}</td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <div style={{ width: '120px', margin: '0 auto' }}>
                          <div className="flex-between" style={{ marginBottom: '4px', fontSize: '0.75rem' }}>
                             <span style={{ fontWeight: 800 }}>{task.completed}/{task.total}</span>
                             <span style={{ color: '#475569' }}>{Math.round((task.completed/task.total)*100)}%</span>
                          </div>
                          <div style={{ height: '5px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                             <div style={{ width: `${(task.completed/task.total)*100}%`, height: '100%', background: '#007AFF', borderRadius: '10px' }}></div>
                          </div>
                       </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px', fontSize: '0.8rem', color: task.status === 'overdue' ? '#FF3B30' : '#64748b', fontWeight: task.status === 'overdue' ? 700 : 500 }}>{task.deadline}</td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <span style={{ 
                         fontSize: '0.65rem', 
                         fontWeight: 800, 
                         padding: '4px 10px', 
                         borderRadius: '50px', 
                         background: task.status === 'completed' ? '#f0fdf4' : task.status === 'overdue' ? '#fef2f2' : '#fffbeb',
                         color: task.status === 'completed' ? '#166534' : task.status === 'overdue' ? '#991b1b' : '#92400e',
                         border: `1px solid ${task.status === 'completed' ? '#bbf7d0' : task.status === 'overdue' ? '#fecaca' : '#fde68a'}`
                       }}>
                         {task.status.toUpperCase().replace('-', ' ')}
                       </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '18px 20px' }}>
                       <button onClick={() => handleTaskClick(task)} className="btn btn-outline tiny" style={{ fontSize: '0.75rem' }}>Monitor Progress <ArrowRight size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Progress Monitoring View */
        <div className="animate-slide-right">
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
             <button onClick={() => setView('list')} className="btn btn-outline" style={{ padding: '8px 16px' }}>
                <ArrowLeft size={16} /> Back to Practice Hub
             </button>
             <div className="flex-start" style={{ gap: '10px' }}>
                <button className="btn btn-outline"><Bell size={16} /> Nudge Pending Students</button>
                <button className="btn btn-primary">Bulk Complete</button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '2rem' }}>
             
             {/* Task Context Card */}
             <div className="flex-col" style={{ gap: '1.5rem' }}>
                <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '16px' }}>
                   <div style={{ marginBottom: '1.5rem' }}>
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.05)', color: '#1d1d1f', marginBottom: '8px' }}>Practice Task</span>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{selectedTask.title}</h3>
                   </div>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: '#f5f5f7', padding: '1rem', borderRadius: '12px', border: '1px solid #d2d2d7' }}>
                         <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Class Completed</p>
                         <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{selectedTask.completed} <span style={{fontSize: '0.85rem', color: '#475569', fontWeight: 400}}>/ {selectedTask.total}</span></p>
                      </div>
                      <div style={{ background: '#f5f5f7', padding: '1rem', borderRadius: '12px', border: '1px solid #d2d2d7' }}>
                         <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Deadline Factor</p>
                         <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FF3B30' }}>{selectedTask.deadline.split(',')[0]}</p>
                      </div>
                   </div>

                   <div className="flex-col" style={{ gap: '12px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Instruction Context</h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                        Students must complete the exercises in the Chapter 4 workbook and upload the scan for initial review. This is fundamental for next week's sorting algorithm workshop.
                      </p>
                   </div>
                </div>

                <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '16px', borderLeft: '5px solid #007AFF' }}>
                   <h4 className="flex-start" style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 800 }}><MessageSquare size={18} color="#007AFF" /> Activity Remarks Feed</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ background: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}>
                         <p style={{ margin: 0, fontWeight: 700 }}>Prof. Admin:</p>
                         <p style={{ margin: '4px 0 0', color: '#444' }}>Students having trouble with Q3 can refer to the handout uploaded yesterday.</p>
                      </div>
                   </div>
                   <div className="flex-start" style={{ marginTop: '1rem', gap: '10px' }}>
                      <input type="text" placeholder="Post a remark..." style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.85rem' }} />
                      <button className="btn btn-primary tiny">Post</button>
                   </div>
                </div>
             </div>

             {/* STUDENT PROGRESS TRACKER */}
             <div className="module-card" style={{ background: '#ffffff', border: 'none', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Completion Overview</h4>
                   <div className="flex-start" style={{ gap: '6px' }}>
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#166534' }}>{selectedTask.completed} Completed</span>
                      <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#991b1b' }}>{selectedTask.total - selectedTask.completed} Pending</span>
                   </div>
                </div>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead style={{ background: '#f5f5f7', position: 'sticky', top: 0 }}>
                         <tr>
                            <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '0.7rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Student Identity</th>
                            <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.7rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.7rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Timestamp</th>
                            <th style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.7rem', color: '#1d1d1f', textTransform: 'uppercase' }}>Action</th>
                         </tr>
                      </thead>
                      <tbody>
                         {studentStatuses.map(student => (
                           <tr key={student.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                              <td style={{ padding: '12px 20px' }}>
                                 <div className="flex-start" style={{ gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: student.status === 'completed' ? '#f0fdf4' : '#fef2f2', color: student.status === 'completed' ? '#34C759' : '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.7rem' }}>{student.name[0]}</div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{student.name}</span>
                                 </div>
                              </td>
                              <td style={{ textAlign: 'center', padding: '12px 20px' }}>
                                 {student.status === 'completed' ? <CheckCircle2 size={18} color="#34C759" /> : <Circle size={18} color="#e2e8f0" />}
                              </td>
                              <td style={{ textAlign: 'center', padding: '12px 20px', fontSize: '0.75rem', color: '#475569' }}>{student.time}</td>
                              <td style={{ textAlign: 'center', padding: '12px 20px' }}>
                                 {student.status === 'pending' && <button className="icon-btn tiny" style={{color: '#5856D6'}}><Bell size={16} /></button>}
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

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: '#ffffff', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
           <div className="module-card animate-slide-up" style={{ width: '100%', maxWidth: '540px', background: '#ffffff', borderRadius: '16px', border: '1px solid #d2d2d7', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                 <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>Assign Daily Activity</h3>
                 <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>Assign a practice goal or checklist to your students.</p>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                 <div className="flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Activity Title</label>
                    <input type="text" placeholder="e.g. Chapter 4 Practice Exercises" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.9rem' }} />
                 </div>
                 <div className="flex-col" style={{ gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Target Group / Class</label>
                    <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.9rem' }}>
                       <option>Computer Science A</option>
                       <option>Mathematics B</option>
                       <option>All Sections</option>
                    </select>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="flex-col" style={{ gap: '6px' }}>
                       <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Activity Type</label>
                       <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.9rem' }}>
                          <option>Practice Exercise</option>
                          <option>Quick Quiz</option>
                          <option>Review Checklist</option>
                       </select>
                    </div>
                    <div className="flex-col" style={{ gap: '6px' }}>
                       <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Goal Deadline</label>
                       <input type="datetime-local" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '0.9rem' }} />
                    </div>
                 </div>
              </div>
              <div style={{ padding: '1.5rem', background: '#f5f5f7', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                 <button onClick={() => setShowCreateModal(false)} className="btn btn-outline" style={{ background: 'white' }}>Cancel</button>
                 <button className="btn btn-primary" style={{ padding: '10px 24px' }}>Assign Task</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default TaskManagement;
