import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  BrainCircuit, TrendingUp, TrendingDown, Target, ShieldCheck, 
  AlertOctagon, Download, History, BookOpen, AlertCircle
} from 'lucide-react';

const trendData = [
  { exam: 'Internal 1', score: 65 },
  { exam: 'Internal 2', score: 72 },
  { exam: 'External/Sem', score: 85 },
];

const distributionData = [
  { subject: 'Math', marks: 87 },
  { subject: 'Physics', marks: 63 },
  { subject: 'CS', marks: 95 },
  { subject: 'English', marks: 82 },
];

const StudentMarks = () => {
  const [activeExamFilter, setActiveExamFilter] = useState('All');

  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Academic Performance Statement</h2>
          <p className="text-muted">A detailed record of your exam results</p>
        </div>
      </div>

      {/* Row 1: Overall Summary & AI Insight */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="module-card flex-col" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Semester Overall Performance</p>
          <div className="flex-start" style={{ alignItems: 'flex-end', gap: '8px' }}>
            <h3 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1, color: '#0f172a' }}>78<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>%</span></h3>
          </div>
          <div className="flex-start" style={{ marginTop: '1rem', gap: '8px' }}>
            <span className="badge success" style={{ fontSize: '1rem', padding: '6px 12px' }}><ShieldCheck size={16}/> PASSED</span>
            <span className="badge" style={{ fontSize: '1rem', padding: '6px 12px', background: '#f5f5f7', color: '#1d1d1f' }}>Rank: 14</span>
          </div>
        </div>

        <div className="uni-card" style={{ background: '#f5f5f7', borderLeft: '4px solid #007AFF', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex-start">
            <BrainCircuit size={20} color="#007AFF" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Your Learning Assistant</h3>
          </div>
          <p style={{ marginTop: '1rem', color: '#1d1d1f', fontWeight: 500, lineHeight: 1.6, fontSize: '1.05rem' }}>
            "You've been doing amazing in CS! However, your <strong style={{color: '#FF3B30'}}>Physics (63/100)</strong> score could use a little boost, particularly on the external exams. If you focus on that area, your overall ranking will skyrocket! Keep up the great work."
          </p>
        </div>
      </div>

      {/* Row 2: Trend & Distribution */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card">
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Marks Trajectory</h3>
            <span className="badge info">Exam vs Exam</span>
          </div>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="exam" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                />
                <Line type="monotone" dataKey="score" stroke="#007AFF" strokeWidth={3} dot={{ stroke: '#007AFF', strokeWidth: 2, r: 6, fill: 'white' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="module-card flex-col" style={{ gap: 0 }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Subject Performance Overview</h3>
          <div style={{ height: '160px', width: '100%', marginBottom: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="subject" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Bar dataKey="marks" fill="#5856D6" radius={[4, 4, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.marks < 75 ? '#FF3B30' : '#5856D6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginTop: 'auto', background: '#fff0f0', border: '1px solid #ffe5e5', padding: '0.8rem', borderRadius: '8px' }}>
            <div className="flex-start" style={{ color: '#FF3B30', fontWeight: 600, fontSize: '0.9rem' }}>
               <AlertCircle size={16} /> <span>Alert: You are failing in Physics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Full Accounting (Subject-wise & Exam Breakdown Filter) */}
      <div className="module-card">
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
           <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Your Report Card</h3>
           <div className="flex-start">
             <button className={`btn ${activeExamFilter === 'All' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveExamFilter('All')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Sem 1 (All)</button>
             <button className={`btn ${activeExamFilter === 'Int1' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveExamFilter('Int1')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Int 1</button>
             <button className={`btn ${activeExamFilter === 'Int2' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveExamFilter('Int2')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Int 2</button>
             <button className={`btn ${activeExamFilter === 'Ext' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveExamFilter('Ext')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>External</button>
           </div>
        </div>

        <table className="data-table" style={{ marginTop: 0 }}>
          <thead>
            <tr>
              <th style={{ padding: '0.8rem' }}>Subject</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>Internal 1 (20)</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>Internal 2 (20)</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>External (60)</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>Total (100)</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.8rem', fontWeight: 500 }}>CS Core</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>20</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>20</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 500 }}>55</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 600 }}>95</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#34C759' }}>🟢</td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', fontWeight: 500 }}>Mathematics</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>18</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>19</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 500 }}>50</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 600 }}>87</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#34C759' }}>🟢</td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', fontWeight: 500 }}>English Comm.</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>17</td>
              <td className="text-muted" style={{ padding: '0.8rem', textAlign: 'center' }}>18</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 500 }}>47</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 600 }}>82</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#34C759' }}>🟢</td>
            </tr>
            <tr style={{ background: '#fff0f0' }}>
              <td style={{ padding: '0.8rem', fontWeight: 600 }}>Physics</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#FF3B30' }}>15</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#FF3B30' }}>18</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 600, color: '#FF3B30' }}>30</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', fontWeight: 700, color: '#FF3B30' }}>63</td>
              <td style={{ padding: '0.8rem', textAlign: 'center', color: '#FF3B30' }}>🔴</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Row 4: Benchmarking, History, Download */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="module-card">
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <Target size={18} className="text-indigo"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Peer Benchmarking</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div className="flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>vs Class Average (Math)</span>
              <span className="text-green flex-start" style={{ fontWeight: 600 }}><TrendingUp size={14}/> +12 Marks</span>
            </div>
            <div className="flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span>vs Class Average (Physics)</span>
              <span className="text-red flex-start" style={{ fontWeight: 600 }}><TrendingDown size={14}/> -10 Marks</span>
            </div>
            <div className="flex-between" style={{ padding: '0.6rem 0' }}>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Gap to Topper (Overall)</span>
              <span className="text-muted" style={{ fontWeight: 600, fontSize: '0.9rem' }}>-20 Marks</span>
            </div>
          </div>
        </div>

        <div className="module-card">
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <History size={18} className="text-blue"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Exam History</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div className="flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>Semester 1</p>
                <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.8rem' }}>Final Exams</p>
              </div>
              <span className="badge success">Passed (78%)</span>
            </div>
            <div className="flex-between" style={{ padding: '0.6rem 0' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500, color: '#1d1d1f' }}>Pre-University Board</p>
                <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.8rem' }}>Entrance Exam</p>
              </div>
              <span className="badge" style={{ background: '#f5f5f7', color: '#1d1d1f' }}>82%</span>
            </div>
          </div>
        </div>

        <div className="module-card flex-col" style={{ alignItems: 'center', justifyContent: 'center', background: '#e5f0ff', border: '1px dashed #cce0ff' }}>
           <Download size={32} color="#007AFF" style={{ marginBottom: '1rem' }}/>
           <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: '#1d1d1f' }}>Official Transcript</h3>
           <p className="text-muted" style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Download your formally audited semester report card.</p>
           <button className="btn btn-primary" style={{ width: '100%', background: '#007AFF', color: 'white', border: 'none' }}>Generate PDF</button>
        </div>
      </div>

    </div>
  );
};
export default StudentMarks;
