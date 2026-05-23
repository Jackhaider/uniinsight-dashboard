import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Plus, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  MoreVertical,
  Reply,
  ArrowUpRight,
  ShieldCheck,
  Flag,
  LineChart,
  Target
} from 'lucide-react';

const incomingFeedback = [
  { id: 1, name: 'Alice Smith', type: 'student', category: 'academic', message: 'The lecture on Sorting was too fast, can we revise Binary Search?', priority: 'med', status: 'pending', time: '1h ago', performance: { marks: 88, attendance: 92 } },
  { id: 2, name: 'Mr. Johnson (Parent)', type: 'parent', category: 'marks', message: 'Concerned about Bobs Internal 1 scores. Please guide.', priority: 'high', status: 'urgent', time: '3h ago', performance: { marks: 28, attendance: 65 } },
  { id: 3, name: 'Charlie Brown', type: 'student', category: 'assignment', message: 'Submission link for Lab 3 is not working.', priority: 'high', status: 'pending', time: '5h ago', performance: { marks: 55, attendance: 82 } },
  { id: 4, name: 'Diana Prince', type: 'student', category: 'behavior', message: 'Can I join the advanced algorithms group?', priority: 'low', status: 'pending', time: 'Yesterday', performance: { marks: 98, attendance: 98 } },
];

const conversationHistory = [
  { sender: 'Alice Smith', text: 'The lecture on Sorting was too fast, can we revise Binary Search?', time: '10:00 AM', isMe: false },
  { sender: 'Prof. Admin', text: 'I understand, Alice. I will add a 15-min revision session next Monday.', time: '10:15 AM', isMe: true },
  { sender: 'Alice Smith', text: 'Thank you! That helps a lot.', time: '10:20 AM', isMe: false },
];

const FeedbackSystem = () => {
  const [view, setView] = useState('ledger'); // 'ledger' or 'chat'
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [replyText, setReplyText] = useState('');

  const stats = {
    total: 24,
    pending: 8,
    urgent: 3
  };

  const handleOpenConversation = (conv) => {
    setSelectedConversation(conv);
    setView('chat');
  };

  return (
    <div className="feedback-module animate-fade">
      
      {view === 'ledger' ? (
        <>
          {/* Header & Feedback Pulse */}
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Smart Communication Hub</h2>
              <p className="text-muted" style={{ fontSize: '1rem' }}>Data-aware feedback loops between faculty, students, and parents.</p>
            </div>
            <div className="flex-start" style={{ gap: '1rem' }}>
               <div className="badge-premium" style={{ background: '#f5f3ff', color: '#5856D6', padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={16} fill="#5856D6" /> <strong style={{color: '#5856D6'}}>Insights Engine Active</strong>
               </div>
               <button className="btn btn-primary" style={{ padding: '12px 24px' }}>Initiate Outreach</button>
            </div>
          </div>

          {/* Feedback KPIs */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#64748b' }}>Total Interactivity</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>{stats.total}</h3>
            </div>
            <div className="module-card" style={{ background: '#ffffff', border: 'none', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#FF9500', fontWeight: 700 }}>Pending Replies</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#FF9500' }}>{stats.pending}</h3>
            </div>
            <div className="module-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#FF3B30', fontWeight: 700 }}>Urgent Priority</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#FF3B30' }}>{stats.urgent} Critical</h3>
            </div>
            <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#64748b' }}>Avg Resolution</p>
              <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>4.2h</h3>
            </div>
          </div>

          {/* Teaching Assistant Insights */}
          <div className="module-card" style={{ background: 'rgba(88, 86, 214, 0.03)', border: '1px solid rgba(88, 86, 214, 0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', borderLeft: '5px solid #5856D6' }}>
             <div className="flex-start" style={{ gap: '10px', marginBottom: '8px' }}>
                <Zap size={20} color="#5856D6" />
                <h4 style={{ margin: 0, color: '#5856D6', fontWeight: 800 }}>Teaching Assistant Insights</h4>
             </div>
             <p style={{ margin: 0, color: '#1d1d1f', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
               "It seems several students are struggling with the 'Binary Search' topic this week, particularly in Section A. Since many of them also had lower scores in Internal 1, hosting a quick revision session could really boost their confidence."
             </p>
          </div>

          {/* Feedback Communication Ledger */}
          <div className="module-card" style={{ background: '#ffffff', border: 'none', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div className="flex-start" style={{ gap: '1.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Communication History</h4>
                  <div className="flex-start" style={{ gap: '6px' }}>
                     <button onClick={() => setActiveFilter('all')} className={`badge-btn ${activeFilter==='all'?'active':''}`}>All</button>
                     <button onClick={() => setActiveFilter('student')} className={`badge-btn ${activeFilter==='student'?'active':''}`}>Students</button>
                     <button onClick={() => setActiveFilter('parent')} className={`badge-btn ${activeFilter==='parent'?'active':''}`}>Parents</button>
                  </div>
               </div>
               <div className="flex-start" style={{ gap: '10px' }}>
                  <div className="search-box-mini" style={{ position: 'relative', width: '220px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input type="text" placeholder="Search Threads..." style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem' }} />
                  </div>
               </div>
            </div>

            <div className="feedback-ledger-feed">
               {incomingFeedback.map(fb => (
                 <div key={fb.id} onClick={() => handleOpenConversation(fb)} className="feedback-row-premium" style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'background 0.2s' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: fb.priority === 'high' ? '#fef2f2' : '#f8fafc', color: fb.priority === 'high' ? '#FF3B30' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, marginRight: '1.2rem' }}>{fb.name[0]}</div>
                    <div style={{ flex: 1 }}>
                       <div className="flex-between" style={{ marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{fb.name} <span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#94a3b8', background: 'rgba(255,255,255,0.02)', padding: '2px 8px', borderRadius: '50px', marginLeft: '6px' }}>{fb.type.toUpperCase()}</span></span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}><Clock size={12} style={{marginRight: '4px'}} /> {fb.time}</span>
                       </div>
                       <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', fontWeight: 500, lineHeight: 1.4 }} className="line-clamp-1">"{fb.message}"</p>
                    </div>
                    <div style={{ width: '150px', textAlign: 'right', paddingRight: '1rem' }}>
                       <span className={`priority-tag ${fb.priority}`} style={{ textTransform: 'uppercase' }}>{fb.priority}</span>
                       <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{fb.category.toUpperCase()}</p>
                    </div>
                    <button className="icon-btn sm"><ChevronRight size={20} color="#cbd5e1" /></button>
                 </div>
               ))}
            </div>
          </div>
        </>
      ) : (
        /* CONVERSATION VIEW WITH CONTEXT SNIPER (GOLDEN FEATURE) */
        <div className="animate-slide-right chat-interface-container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', height: '700px', overflow: 'hidden' }}>
          
          {/* Main Chat Engine */}
          <div className="chat-main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
             <div className="chat-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => setView('ledger')} className="icon-btn"><ArrowLeft size={20} /></button>
                <div>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{selectedConversation.name}</h4>
                   <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Active Thread • {selectedConversation.category.toUpperCase()}</p>
                </div>
             </div>

             <div className="chat-messages" style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#f5f5f7' }}>
                 {conversationHistory.map((chat, idx) => (
                  <div key={idx} style={{ alignSelf: chat.isMe ? 'flex-end' : 'flex-start', maxWidth: '70%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                     <div style={{ background: chat.isMe ? '#007AFF' : '#ffffff', color: chat.isMe ? '#ffffff' : '#1d1d1f', padding: '12px 16px', borderRadius: chat.isMe ? '16px 16px 0 16px' : '0 16px 16px 16px', border: chat.isMe ? 'none' : '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                        {chat.text}
                     </div>
                     <span style={{ fontSize: '0.65rem', color: '#86868b', textAlign: chat.isMe ? 'right' : 'left' }}>{chat.time}</span>
                  </div>
                ))}
             </div>

             <div className="chat-input-area" style={{ padding: '1.5rem', borderTop: '1px solid #d2d2d7' }}>
                 <div style={{ display: 'flex', gap: '10px' }}>
                   <input 
                     type="text" 
                     placeholder="Type your response..." 
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                     style={{ flex: 1, padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', background: '#ffffff', color: '#1d1d1f', fontSize: '1rem' }} 
                   />
                   <button className="btn btn-primary" style={{ width: '54px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#007AFF', color: 'white', border: 'none' }}><Send size={20} /></button>
                </div>
             </div>
          </div>

          {/* RIGHT SIDEBAR: CONTEXT SNIPER (GOLDEN FEATURE) */}
          <div className="chat-sidebar" style={{ background: '#f5f5f7', borderLeft: '1px solid #d2d2d7', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div className="section-title">
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Academic Snapshot</h4>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Context-Aware Communication</p>
             </div>

             <div className="profile-micro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '1.5rem', background: '#f5f5f7', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>{selectedConversation.name[0]}</div>
                <div style={{ textAlign: 'center' }}>
                   <p style={{ margin: 0, fontWeight: 800 }}>{selectedConversation.name}</p>
                   <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{selectedConversation.roll}</p>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                   <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#166534', fontSize: '0.65rem' }}>Academic Performance</span>
                   <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#FF3B30', fontSize: '0.65rem' }}>Risk</span>
                </div>
             </div>

             <div className="performance-ledger" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="flex-between">
                   <div className="flex-start" style={{ gap: '10px' }}>
                      <Target size={18} color="#007AFF" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Current Marks</span>
                   </div>
                   <span style={{ fontWeight: 800, color: selectedConversation.performance.marks < 40 ? '#FF3B30' : '#0f172a' }}>{selectedConversation.performance.marks}%</span>
                </div>
                <div className="flex-between">
                   <div className="flex-start" style={{ gap: '10px' }}>
                      <Calendar size={18} color="#34C759" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Attendance</span>
                   </div>
                   <span style={{ fontWeight: 800, color: selectedConversation.performance.attendance < 75 ? '#FF3B30' : '#0f172a' }}>{selectedConversation.performance.attendance}%</span>
                </div>
                <div className="flex-between">
                   <div className="flex-start" style={{ gap: '10px' }}>
                      <LineChart size={18} color="#FF9500" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Performance 📉</span>
                   </div>
                   <span style={{ fontWeight: 800, color: '#FF3B30' }}>-12.4%</span>
                </div>
             </div>

             <div style={{ marginTop: 'auto', padding: '1rem', background: '#fff0f0', borderRadius: '12px', border: '1px solid #ffe5e5' }}>
                <h5 style={{ margin: '0 0 6px', fontSize: '0.75rem', fontWeight: 800, color: '#FF3B30' }}>Teaching Assistant Note</h5>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#1d1d1f', lineHeight: 1.4 }}>
                  "This student seems to be finding the coursework challenging. Reaching out to offer some extra help might be exactly what they need right now."
                </p>
             </div>

             <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>Update Academic Remark</button>
          </div>
        </div>
      )}

      <style>{`
        .badge-btn {
           padding: 4px 12px;
           border-radius: 6px;
           font-size: 0.75rem;
           font-weight: 700;
           background: rgba(255,255,255,0.02);
           color: #64748b;
           border: none;
           cursor: pointer;
           transition: all 0.2s;
        }
        .badge-btn.active {
           background: '#007AFF';
           color: white;
        }
        .priority-tag {
           font-size: 0.65rem;
           font-weight: 800;
           padding: 2px 8px;
           border-radius: 4px;
        }
        .priority-tag.high { background: #fef2f2; color: #FF3B30; }
        .priority-tag.med { background: #fffbeb; color: #FF9500; }
        .priority-tag.low { background: #f0fdf4; color: #34C759; }
        .priority-tag.urgent { background: #FF3B30; color: #ffffff; }

        .feedback-row-premium:hover {
           background: rgba(30, 41, 59, 0.4);
        }
        .line-clamp-1 {
           display: -webkit-box;
           -webkit-line-clamp: 1;
           -webkit-box-orient: vertical;
           overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FeedbackSystem;
