import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  BrainCircuit, TrendingUp, Target, BarChart2, 
  UserCheck, Flame 
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const trendData = [
  { week: 'Week 1', score: 65, average: 60 },
  { week: 'Week 2', score: 68, average: 62 },
  { week: 'Week 3', score: 72, average: 61 },
  { week: 'Week 4', score: 78, average: 63 }, // current
];

const marksBreakdown = [
  { subject: 'Math', internal1: 18, internal2: 19, external: 48 },
  { subject: 'Physics', internal1: 12, internal2: 14, external: 34 },
  { subject: 'CS Core', internal1: 19, internal2: 20, external: 53 },
];

const MyPerformance = () => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      // Simulate features: [attendance, assignments, marks, participation]
      // Try slightly weak physics attendance but good overall scores
      const features = [85, 90, 78, 8]; 
      const data = await aiService.predictAll(features);
      setAiData(data);
      setLoading(false);
    };
    fetchAI();
  }, []);

  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Deep Performance Analytics</h2>
          <p className="text-muted">A comprehensive breakdown of your academic achievement and performance standing</p>
        </div>
      </div>

      {/* Row 1: The AI Analyst (The Golden Feature) */}
      <div className="module-card" style={{ background: '#f5f5f7', borderLeft: '4px solid #007AFF', marginBottom: '1.5rem', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex-start">
          <BrainCircuit size={20} color="#007AFF" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Your Performance Insights</h3>
        </div>
        {!loading && aiData ? (
          <div style={{ marginTop: '0.8rem', color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
            <p><strong>Where you're headed:</strong> {aiData.predicted_score}/100</p>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              {aiData.insights.map((insight, idx) => (
                <li key={idx} style={{ marginBottom: '5px' }}>{insight}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading your insights...</p>
        )}
      </div>

      {/* Row 2: Macro Metrics & Trend Graph */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="module-card" style={{ justifyContent: 'center' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem', textAlign: 'center' }}>Current Projected Score</p>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
             <h3 style={{ fontSize: '4rem', margin: 0, lineHeight: 1, color: '#1d1d1f' }}>
               {loading ? '...' : Math.round(aiData?.predicted_score || 78)}
               <span style={{ fontSize: '1.5rem', color: '#86868b' }}>/100</span>
             </h3>
          </div>
          <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '1px dashed #34C759', textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem', color: '#34C759' }} className="flex-center">
               <TrendingUp size={18} style={{ marginRight: '6px' }}/> Looking Steady
            </p>
          </div>
        </div>

        <div className="module-card">
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Performance Trajectory (vs Baseline)</h3>
            <span className="badge info" style={{ background: '#e5f0ff', color: '#007AFF', border: 'none' }}>Insights</span>
          </div>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Area type="monotone" dataKey="score" name="Your Score" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                <Line type="monotone" dataKey="average" name="Class Avg" stroke="#86868b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Performance Breakdown (Subject Level) & Comparison */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card">
           <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <Target size={18} color="#5856D6"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Benchmarking Comparison</h3>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 500, color: '#1d1d1f' }}>You vs Class Average (Overall)</span>
                  <span style={{ fontWeight: 600, color: '#34C759' }}>+15%</span>
                </div>
                <div className="progress-container" style={{ margin: 0, background: '#e5e5ea' }}><div className="progress-fill" style={{ width: '78%', background: '#007AFF' }}></div></div>
             </div>
           </div>
        </div>

        <div className="module-card">
           <h4 style={{ margin: '0 0 0.5rem', color: '#1d1d1f' }}>Current Momentum</h4>
           <div className="flex-start" style={{ gap: '8px', margin: '0 0 0.5rem' }}>
             <Flame size={28} color="#FF9500"/>
             <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#FF9500' }}>Accelerating</h3>
           </div>
           <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.4 }}>You have recovered from last month's dip and are on a positive 3-week climbing trend.</p>
        </div>
      </div>

      {/* Row 4: Mark Breakdown */}
      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
         <div className="module-card">
           <div className="flex-start" style={{ marginBottom: '1.5rem' }}>
             <BarChart2 size={18} color="#007AFF"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Granular Mark Breakdown</h3>
           </div>
           <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="subject" stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#86868b" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#1d1d1f' }} />
                <Bar dataKey="internal1" name="Internal 1 (20)" stackId="a" fill="#5AC8FA" />
                <Bar dataKey="internal2" name="Internal 2 (20)" stackId="a" fill="#007AFF" />
                <Bar dataKey="external" name="External (60)" stackId="a" fill="#5856D6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
         </div>

         <div className="module-card flex-col" style={{ borderTop: '4px solid #34C759', justifyContent: 'flex-start' }}>
           <div className="flex-start" style={{ marginBottom: '1rem' }}>
             <UserCheck size={20} color="#34C759"/>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Your Learning Profile</h3>
           </div>
           <p className="text-muted" style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>Based on your recent learning patterns.</p>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
             <div style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
               <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: '#1d1d1f' }}>Overall Status</h4>
               <strong style={{ color: loading ? '#999' : '#34C759', fontSize: '1.2rem' }}>
                 {loading ? '...' : aiData?.risk_category}
               </strong>
             </div>
             <div style={{ padding: '1rem', background: '#f5f5f7', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
               <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: '#1d1d1f' }}>Learning Style</h4>
               <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>
                 {loading ? '...' : aiData?.cluster?.description}
               </p>
             </div>
           </div>
         </div>
      </div>

    </div>
  );
};
export default MyPerformance;
