import React, { useState } from 'react';
import { 
  Save, 
  Search, 
  Download, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  MinusCircle, 
  Zap, 
  MessageSquare, 
  ChevronDown,
  User,
  MoreVertical,
  History,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';

const initialStudents = [
  { id: 1, name: 'Alice Smith', roll: '2024CS01', marks: 88, status: 'pass', feedback: 'Extremely consistent performance.' },
  { id: 2, name: 'Bob Johnson', roll: '2024CS02', marks: 28, status: 'fail', feedback: 'Needs urgent remedial attention.' },
  { id: 3, name: 'Charlie Brown', roll: '2024CS03', marks: 55, status: 'pass', feedback: 'Maintaining average performance.' },
  { id: 4, name: 'Diana Prince', roll: '2024CS04', marks: 94, status: 'pass', feedback: 'Top tier logic skills.' },
  { id: 5, name: 'Evan Williams', roll: '2024CS05', marks: 32, status: 'fail', feedback: 'Borderline failure, requires intervention.' },
  { id: 6, name: 'Fiona Gallagher', roll: '2024CS06', marks: 48, status: 'pass', feedback: 'Just cleared the threshold.' },
  { id: 7, name: 'George Miller', roll: '2024CS07', marks: 72, status: 'pass', feedback: 'Steady improvement observed.' },
];

const distributionData = [
  { range: '0-35', count: 2, color: '#FF3B30' },
  { range: '36-60', count: 2, color: '#FF9500' },
  { range: '61-80', count: 1, color: '#007AFF' },
  { range: '81-100', count: 2, color: '#34C759' },
];

const passRateData = [
  { name: 'Passed', value: 72, fill: '#34C759' },
  { name: 'Failed', value: 28, fill: '#FF3B30' },
];

const MarksManagement = () => {
  const [data, setData] = useState(initialStudents);
  const [selectedExam, setSelectedExam] = useState('internal_1');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    avg: (data.reduce((acc, s) => acc + s.marks, 0) / data.length).toFixed(1),
    highest: Math.max(...data.map(s => s.marks)),
    lowest: Math.min(...data.map(s => s.marks)),
    passRate: ((data.filter(s => s.marks >= 35).length / data.length) * 100).toFixed(0)
  };

  const handleMarkChange = (id, val) => {
    const mark = parseInt(val) || 0;
    setData(prev => prev.map(s => s.id === id ? { ...s, marks: mark, status: mark >= 35 ? 'pass' : 'fail' } : s));
  };

  const filtered = data.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.roll.includes(searchTerm));

  return (
    <div className="marks-module animate-fade">
      {/* Header & Session Controls */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Academic Grading Records</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Detailed marks entry, failure threshold monitoring, and performance diagnostics.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
           <div className="dropdown-premium" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Exam:</span>
              <select 
                value={selectedExam} 
                onChange={(e) => setSelectedExam(e.target.value)}
                style={{ border: 'none', fontWeight: 700, background: 'transparent', outline: 'none', cursor: 'pointer' }}
              >
                <option value="internal_1">Internal Assessment 1</option>
                <option value="internal_2">Internal Assessment 2</option>
                <option value="external">Final External Exam</option>
              </select>
              <ChevronDown size={14} color="#94a3b8" />
           </div>
           <button className="btn btn-primary" style={{ padding: '12px 24px' }}>Save Grading Records</button>
        </div>
      </div>

      {/* Row 1: Academic Pulse (KPIs) */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#64748b' }}>Class Average</p>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{stats.avg}%</h3>
          <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Standard Baseline: 72%</p>
        </div>
        <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#34C759', fontWeight: 600 }}>Highest Score</p>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#34C759' }}>{stats.highest} / 100</h3>
        </div>
        <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#FF3B30', fontWeight: 600 }}>Fail Cases</p>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#FF3B30' }}>{data.filter(s => s.status === 'fail').length} Students</h3>
        </div>
        <div className="module-card" style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#64748b' }}>Pass Rate</p>
          <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>{stats.passRate}%</h3>
          <progress value={stats.passRate} max="100" style={{ width: '100%', height: '6px', borderRadius: '10px' }}></progress>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Marks Entry Ledger */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          
          <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Grading Entry Feed</h4>
               <div className="flex-start" style={{ gap: '1rem' }}>
                  <div className="search-box-mini" style={{ position: 'relative', width: '220px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="Search Student..." 
                      style={{ width: '100%', padding: '6px 10px 6px 32px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem' }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}><Download size={14} /> Import CSV</button>
               </div>
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'rgba(30, 41, 59, 0.4)', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '15px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Student Details</th>
                    <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Score (100)</th>
                    <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Threshold Status</th>
                    <th style={{ textAlign: 'center', padding: '15px 20px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Instructor Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(student => (
                    <tr 
                      key={student.id} 
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.02)', 
                        background: student.status === 'fail' ? '#fff1f2' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '15px 20px' }}>
                        <div className="flex-start" style={{ gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: student.status === 'fail' ? '#FF3B30' : '#f1f5f9', color: student.status === 'fail' ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>{student.name[0]}</div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{student.name}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>ID: {student.roll}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '15px 20px' }}>
                         <input 
                           type="number" 
                           value={student.marks} 
                           onChange={(e) => handleMarkChange(student.id, e.target.value)}
                           style={{ width: '70px', padding: '8px', border: `2px solid ${student.status === 'fail' ? '#FF3B30' : '#e2e8f0'}`, borderRadius: '6px', textAlign: 'center', fontWeight: 800, fontSize: '1.1rem', background: 'rgba(15, 23, 42, 0.4)', color: student.status === 'fail' ? '#FF3B30' : '#0f172a' }}
                         />
                      </td>
                      <td style={{ textAlign: 'center', padding: '15px 20px' }}>
                         <span className="badge" style={{ background: student.status === 'fail' ? '#FF3B30' : '#34C759', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>
                           {student.status.toUpperCase()}
                         </span>
                      </td>
                      <td style={{ padding: '15px 20px' }}>
                         <div className="flex-start" style={{ gap: '10px' }}>
                            <input 
                              type="text" 
                              placeholder="Add clinical observation..." 
                              value={student.feedback}
                              className="table-input"
                              style={{ flex: 1, padding: '8px', border: 'none', background: 'transparent', fontSize: '0.85rem' }}
                            />
                            <button className="icon-btn tiny"><MessageSquare size={14} color="#94a3b8" /></button>
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
          
          {/* Academic Strategic Briefing */}
          <div className="module-card" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #5856D6' }}>
             <div className="flex-start" style={{ gap: '10px', marginBottom: '10px' }}>
                <Zap size={20} color="#5856D6" />
                <h4 style={{ margin: 0, color: '#5b21b6', fontWeight: 700 }}>Academic Performance Briefing</h4>
             </div>
             <p style={{ margin: 0, color: '#4c1d95', fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>
               "External performance rate is **critically low (28% failure)**. Strategic correlation detected: Weak Internal 2 scores directly predict 85% of current external failures. Recommend immediate remedial intervention for failure clusters."
             </p>
          </div>

          {/* Grade Distribution Bar Chart */}
          <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
             <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h4 className="flex-start" style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}><BarChart3 size={18} color="#0f172a" /> Grade Topology</h4>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>Score Distribution</span>
             </div>
             <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="range" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Elite Bracket (Top Performers) */}
          <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 1.2rem', fontSize: '1rem', fontWeight: 700, color: '#34C759' }}><TrendingUp size={18} /> Elite Bracket Performers</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.filter(s => s.marks >= 80).sort((a,b) => b.marks - a.marks).map(student => (
                   <div key={student.id} className="flex-between" style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <div className="flex-start" style={{ gap: '10px' }}>
                         <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#34C759', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{student.name[0]}</div>
                         <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{student.name}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: '#166534' }}>{student.marks}/100</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Institutional History Toggle */}
          <div className="module-card" style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.2rem', borderRadius: '12px' }}>
             <h4 className="flex-start" style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}><History size={16} /> Performance Variance</h4>
             <div className="flex-between">
                <div>
                   <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Prev Semester Avg:</p>
                   <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>71.5%</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Growth:</p>
                   <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#34C759' }}>+2.7% ↗</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MarksManagement;
