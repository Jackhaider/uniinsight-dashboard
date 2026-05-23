import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  Filter, 
  Plus, 
  MoreVertical, 
  ChevronRight, 
  ArrowRight,
  Zap,
  Bell,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowLeft,
  LayoutGrid,
  List,
  CalendarDays
} from 'lucide-react';

const todaySchedule = [
  { id: 1, time: '10:00 AM', title: 'Data Structures', class: 'CS-A', room: '302', duration: '60 min', status: 'upcoming' },
  { id: 2, time: '12:00 PM', title: 'Python Programming', class: 'CS-B', room: 'Lab 4', duration: '90 min', status: 'upcoming' },
  { id: 3, time: '02:30 PM', title: 'Mentorship Session', class: 'Mixed', room: 'Cabin 12', duration: '45 min', status: 'upcoming' },
];

const weeklySchedule = {
  'Mon': [{ time: '09:00', title: 'Data Structures' }, { time: '11:00', title: 'Python' }],
  'Tue': [{ time: '10:00', title: 'OS' }, { time: '14:00', title: 'DSA Lab' }],
  'Wed': [{ time: '09:00', title: 'Data Structures' }, { time: '12:00', title: 'Review' }],
  'Thu': [{ time: '11:00', title: 'Python' }],
  'Fri': [{ time: '10:00', title: 'OS' }],
};

const ScheduleManagement = () => {
  const [view, setView] = useState('today'); // 'today', 'weekly', 'monthly'
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [timeLeft, setTimeLeft] = useState('28:14');

  useEffect(() => {
    const timer = setInterval(() => {
      // Mock countdown logic
      setTimeLeft(prev => {
        const [m, s] = prev.split(':').map(Number);
        if (s > 0) return `${m}:${(s - 1).toString().padStart(2, '0')}`;
        if (m > 0) return `${(m - 1).toString().padStart(2, '0')}:59`;
        return '00:00';
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="schedule-module animate-fade">
      
      {/* 1. Header & Tactical Pulse */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Personal Timetable & Planner</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Active session tracking and academic session coordination.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
           <div className="tabs-mini" style={{ background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '10px', display: 'flex' }}>
              <button 
                onClick={() => setView('today')}
                className={`tab-btn-mini ${view === 'today' ? 'active' : ''}`}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', background: view === 'today' ? '#ffffff' : 'transparent', color: view === 'today' ? '#0f172a' : '#64748b', boxShadow: view === 'today' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                <Clock size={14} style={{marginRight: '6px'}}/> Today
              </button>
              <button 
                onClick={() => setView('weekly')}
                className={`tab-btn-mini ${view === 'weekly' ? 'active' : ''}`}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', background: view === 'weekly' ? '#ffffff' : 'transparent', color: view === 'weekly' ? '#0f172a' : '#64748b', boxShadow: view === 'weekly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                <LayoutGrid size={14} style={{marginRight: '6px'}}/> Weekly
              </button>
              <button 
                onClick={() => setView('monthly')}
                className={`tab-btn-mini ${view === 'monthly' ? 'active' : ''}`}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', background: view === 'monthly' ? '#ffffff' : 'transparent', color: view === 'monthly' ? '#0f172a' : '#64748b', boxShadow: view === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                <CalendarDays size={14} style={{marginRight: '6px'}}/> Monthly
              </button>
           </div>
        </div>
      </div>

      {/* 2. GOLDEN FEATURE: NEXT CLASS COUNTDOWN */}
      <div className="module-card" style={{ background: '#ffffff', color: '#1d1d1f', padding: '1.5rem 2rem', borderRadius: '20px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
         <div className="flex-start" style={{ gap: '2rem' }}>
            <div style={{ padding: '1.2rem', background: '#f5f5f7', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
               <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace' }}>{timeLeft}</h3>
               <p style={{ margin: 0, fontSize: '0.75rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Time Remaining</p>
            </div>
            <div>
               <div className="badge" style={{ background: '#e5f0ff', color: '#007AFF', marginBottom: '8px' }}>Upcoming Session</div>
               <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Data Structures & Algorithms</h3>
               <p style={{ margin: '4px 0 0', color: '#86868b', fontSize: '0.9rem' }}><MapPin size={14} /> Room 302 • Class CS-A</p>
            </div>
         </div>
         <div className="flex-start" style={{ gap: '1rem' }}>
            <button className="btn btn-outline" style={{ borderColor: 'rgba(0,0,0,0.1)', color: '#1d1d1f' }}>View Roster</button>
            <button className="btn btn-primary" style={{ background: '#007AFF', border: 'none', color: '#ffffff' }}>Launch Lecture Interface</button>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
         
         {/* Main Content Area */}
         <div className="flex-col" style={{ gap: '1.5rem' }}>
            {view === 'today' && (
              <div className="module-card animate-slide-up" style={{ background: '#ffffff', border: 'none', borderRadius: '16px', padding: '1.5rem' }}>
                 <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Today's Flight Plan</h4>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Thursday, Oct 17, 2024</span>
                 </div>
                 
                 <div className="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {todaySchedule.map((lecture, idx) => (
                      <div key={lecture.id} className="timeline-item" style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
                         <div style={{ width: '80px', flexShrink: 0, paddingTop: '10px' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{lecture.time}</p>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8' }}>{lecture.duration}</p>
                         </div>
                         <div style={{ width: '2px', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                            <div style={{ width: '10px', height: '10px', background: idx === 0 ? '#007AFF' : '#e2e8f0', borderRadius: '50%', position: 'absolute', left: '-4px', top: '15px', border: '2px solid white' }}></div>
                         </div>
                         <div onClick={() => setSelectedLecture(lecture)} className="lecture-strip" style={{ flex: 1, padding: '1.2rem', background: idx === 0 ? '#f0f7ff' : '#ffffff', border: `1px solid ${idx === 0 ? '#bfdbfe' : '#e2e8f0'}`, borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}>
                            <div className="flex-between">
                               <div>
                                  <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{lecture.title}</h5>
                                  <div className="flex-start" style={{ gap: '12px', marginTop: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                                     <span className="flex-start"><Users size={14} style={{marginRight: '4px'}}/> {lecture.class}</span>
                                     <span className="flex-start"><MapPin size={14} style={{marginRight: '4px'}}/> {lecture.room}</span>
                                  </div>
                               </div>
                               <div className="flex-start" style={{ gap: '8px' }}>
                                  <button className="icon-btn sm"><CheckCircle2 size={16} /></button>
                                  <button className="icon-btn sm"><ChevronRight size={18} /></button>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {view === 'weekly' && (
              <div className="module-card animate-fade" style={{ background: '#ffffff', border: 'none', borderRadius: '16px', padding: '1.5rem', overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                       <tr>
                          {Object.keys(weeklySchedule).map(day => (
                            <th key={day} style={{ textAlign: 'left', padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.02)', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>{day}</th>
                          ))}
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                          {Object.values(weeklySchedule).map((dayLects, idx) => (
                            <td key={idx} style={{ verticalAlign: 'top', padding: '10px', borderRight: '1px solid #f8fafc', height: '400px' }}>
                               {dayLects.map((lect, lIdx) => (
                                 <div key={lIdx} style={{ padding: '10px', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px', fontSize: '0.8rem' }}>
                                    <p style={{ margin: 0, fontWeight: 800 }}>{lect.title}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#64748b' }}>{lect.time}</p>
                                 </div>
                               ))}
                            </td>
                          ))}
                       </tr>
                    </tbody>
                 </table>
              </div>
            )}

            {view === 'monthly' && (
              <div className="module-card animate-fade" style={{ background: '#ffffff', border: 'none', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                 <Calendar size={48} color="#e2e8f0" style={{marginBottom: '1rem'}}/>
                 <h4 style={{ margin: 0, fontWeight: 800 }}>Monthly Grid View</h4>
                 <p className="text-muted" style={{ fontSize: '0.9rem' }}>Comprehensive institutional calendar for session planning.</p>
                 {/* Mock Monthly Grid */}
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginTop: '2rem' }}>
                    {[...Array(30)].map((_, i) => (
                      <div key={i} style={{ height: '60px', background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '4px', position: 'relative', fontSize: '0.7rem' }}>
                         <span style={{ position: 'absolute', top: '4px', left: '4px', color: '#94a3b8' }}>{i+1}</span>
                         {i === 17 && <div style={{width: '60%', height: '4px', background: '#FF3B30', borderRadius: '10px', margin: '30px auto 0'}}></div>}
                      </div>
                    ))}
                 </div>
              </div>
            )}
         </div>

         {/* Sidebar: AI insights & Events */}
         <div className="flex-col" style={{ gap: '1.5rem' }}>
            
            {/* Teaching Assistant Insights */}
            <div className="module-card" style={{ background: 'rgba(88, 86, 214, 0.03)', border: '1px solid rgba(88, 86, 214, 0.2)', padding: '1.5rem', borderRadius: '16px', borderLeft: '6px solid #5856D6' }}>
               <div className="flex-start" style={{ gap: '10px', marginBottom: '1rem' }}>
                  <Zap size={22} color="#5856D6" fill="#5856D6" />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#5856D6' }}>Teaching Assistant Insights</h4>
               </div>
               <p style={{ margin: 0, fontSize: '0.85rem', color: '#1d1d1f', lineHeight: 1.6, fontWeight: 500 }}>
                  "You have a busy day ahead with 3 back-to-back classes! To help you save some energy and time, I recommend turning on automated attendance—it'll give you an extra 15 minutes to focus on teaching."
               </p>
            </div>

            {/* Upcoming Institutional Events */}
            <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '16px' }}>
               <h4 style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 800 }}><Bell size={18} /> Institutional Signals</h4>
               <div className="flex-col" style={{ gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '10px', border: '1px solid #fde68a' }}>
                     <div className="flex-between">
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400e' }}>Main Internal Exams</span>
                        <span className="badge" style={{ background: '#92400e', color: 'white', fontSize: '0.65rem' }}>OCT 22</span>
                     </div>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                     <div className="flex-between">
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534' }}>Annual Hackathon</span>
                        <span className="badge" style={{ background: '#166534', color: 'white', fontSize: '0.65rem' }}>NOV 04</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Rescheduling Engine (Mock) */}
            <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '16px' }}>
               <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 800 }}><Calendar size={18} /> Schedule Adjuster</h4>
               <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>Initiate lecture swap or rescheduling notification.</p>
               <button className="btn btn-outline full-width" style={{ fontSize: '0.85rem' }}>Notify Change</button>
            </div>

         </div>

      </div>

      {/* 5. CLASS DETAIL PRE-LECTURE MODAL (Interactive Section) */}
      {selectedLecture && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
           <div className="module-card animate-slide-up" style={{ width: '100%', maxWidth: '580px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', background: '#f5f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{selectedLecture.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{selectedLecture.class} • {selectedLecture.time}</p>
                 </div>
                 <button onClick={() => setSelectedLecture(null)} className="icon-btn"><ArrowLeft size={20} /></button>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                       <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>Active Roster</p>
                       <p style={{ margin: '4px 0 0', fontSize: '1.1rem', fontWeight: 800 }}>60 Students</p>
                    </div>
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                       <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>Topic Context</p>
                       <p style={{ margin: '4px 0 0', fontSize: '1.1rem', fontWeight: 800 }}>Review Day</p>
                    </div>
                 </div>

                 <div className="flex-col" style={{ gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>Tactical Pre-Lecture Checklist</h4>
                    <div className="flex-col" style={{ gap: '8px' }}>
                       <div className="flex-between" style={{ padding: '10px', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mark Attendance (Bulk)</span>
                          <button className="btn btn-primary tiny">Action</button>
                       </div>
                       <div className="flex-between" style={{ padding: '10px', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Distribute Chapter 4 Handout</span>
                          <button className="btn btn-outline tiny">Deploy</button>
                       </div>
                    </div>
                 </div>
              </div>
              <div style={{ padding: '1.5rem', background: '#f5f5f7', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                 <button className="btn btn-primary" style={{ padding: '10px 24px' }}>Confirm Attendance & Start</button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .tab-btn-mini {
           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lecture-strip:hover {
           transform: translateX(6px);
           background: rgba(30, 41, 59, 0.4);
        }
        .badge {
           padding: 4px 10px;
           border-radius: 6px;
           font-size: 0.7rem;
           font-weight: 800;
           text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default ScheduleManagement;
