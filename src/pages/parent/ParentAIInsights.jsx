import React from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Target, 
  CreditCard, 
  Activity, 
  BarChart3, 
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';

const ParentAIInsights = () => {
  return (
    <div className="parent-module animate-fade">
      <div className="flex-between">
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>AI Academic Insights</h2>
          <p className="text-muted" style={{ fontSize: '1rem', color: '#6b7280' }}>Institutional Intelligence: Enhancing student success through data.</p>
        </div>
        <div className="badge info" style={{ background: 'rgba(255,255,255,0.02)', color: '#007AFF', padding: '8px 16px', borderRadius: '50px', fontWeight: 600, fontSize: '0.85rem' }}>
          <Activity size={14} style={{ marginRight: '6px' }} /> Engine: High-Performance Analysis
        </div>
      </div>

      {/* 1. Overall AI Summary */}
      <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '2rem', marginTop: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div className="flex-start" style={{ marginBottom: '1.5rem' }}>
          <BrainCircuit size={28} color="#007AFF" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>Academic Progress Summary</h3>
        </div>
        
        <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #FF3B30' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7', margin: 0, color: '#1f2937', fontWeight: 500 }}>
            "The student’s academic performance is <span style={{ color: '#FF3B30', fontWeight: 700 }}>below the expected level</span> for the current term. 
            While foundational participation is stable, the academic performance is currently declining due to specific attendance bottlenecks."
          </p>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* 2. Performance Analysis */}
        <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <BarChart3 size={20} className="text-blue" />
            <h4 style={{ margin: 0, fontWeight: 600 }}>Performance Analysis</h4>
          </div>
          
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Target Score</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>85 / 100</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Current Score</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#FF3B30' }}>55 / 100</h3>
            </div>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.9rem' }}>STATUS: NEEDS IMPROVEMENT</span>
            <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.8rem' }}>Score is 15% below institutional benchmark.</p>
          </div>
        </div>

        {/* 4. Root Cause Analysis */}
        <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <Search size={20} color="#6366f1" />
            <h4 style={{ margin: 0, fontWeight: 600 }}>Root Cause Analysis</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Primary Bottleneck:</span>
              <span style={{ fontWeight: 600, color: '#FF3B30' }}>Attendance (60%)</span>
            </div>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Task Completion:</span>
              <span style={{ fontWeight: 600, color: '#FF9500' }}>3 Missing Assignments</span>
            </div>
            <div className="flex-between">
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Academic Weakness:</span>
              <span style={{ fontWeight: 600, color: '#FF3B30' }}>Physics Fundamentals</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* 5. Risk Alert */}
        <div className="module-card" style={{ background: '#fff1f2', border: '1px solid #fecaca', padding: '1.5rem' }}>
          <div className="flex-start" style={{ marginBottom: '1rem', color: '#be123c' }}>
            <ShieldAlert size={24} />
            <h4 style={{ margin: 0, fontWeight: 700 }}>Risk Forecast</h4>
          </div>
          <p style={{ margin: 0, color: '#9f1239', fontWeight: 600, lineHeight: '1.5' }}>
            "Student at high risk of <span style={{ textDecoration: 'underline' }}>poor academic outcome</span> if current trends continue. Institutional placement eligibility may be compromised."
          </p>
        </div>

        {/* 6. Action Recommendations */}
        <div className="module-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #bbf7d0', padding: '1.5rem' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem', color: '#15803d' }}>
            <Target size={20} />
            <h4 style={{ margin: 0, fontWeight: 700 }}>Recommended Action Plan</h4>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '1rem' }}>
             <li style={{ flex: 1, padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid #dcfce7', fontSize: '0.85rem', fontWeight: 600 }}>
               ✅ Ensure 100% attendance in Physics this week.
             </li>
             <li style={{ flex: 1, padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid #dcfce7', fontSize: '0.85rem', fontWeight: 600 }}>
               ✅ Monitor Mathematics assignment progress.
             </li>
             <li style={{ flex: 1, padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid #dcfce7', fontSize: '0.85rem', fontWeight: 600 }}>
               ✅ Schedule mentor call via "Communication".
             </li>
          </ul>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* 7. Trend Insight */}
        <div className="module-card" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <TrendingDown size={18} color="#FF3B30" />
            <h5 style={{ margin: 0, fontWeight: 600 }}>Performance Trend</h5>
          </div>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5' }}>
            "Academic output has declined by <span style={{ color: '#FF3B30', fontWeight: 600 }}>-4%</span> in the last 30 days."
          </p>
        </div>

        {/* 8. Comparison Insight */}
        <div className="module-card" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <Users size={18} color="#007AFF" />
            <h5 style={{ margin: 0, fontWeight: 600 }}>Institutional Benchmark</h5>
          </div>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5' }}>
            "Compared to peers in the same department, performance is in the <span style={{ fontWeight: 600 }}>bottom 30th percentile</span>."
          </p>
        </div>

        {/* 9. Punctuality Rating */}
        <div className="module-card" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <CheckCircle2 size={18} color="#34C759" />
            <h5 style={{ margin: 0, fontWeight: 600 }}>Punctuality Rating</h5>
          </div>
          <div className="flex-between">
            <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Reliability Score:</p>
            <span style={{ fontWeight: 700, color: '#34C759' }}>STRONG</span>
          </div>
          <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.75rem' }}>Student highly reliable with task submissions.</p>
        </div>
      </div>

      {/* 10. Future Prediction */}
      <div className="module-card" style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', marginTop: '1.5rem', borderLeft: '4px solid #007AFF' }}>
        <div className="flex-start" style={{ marginBottom: '0.8rem' }}>
          <Clock size={20} color="#007AFF" />
          <h4 style={{ margin: 0, fontWeight: 700 }}>Predictive Outcome Forecast</h4>
        </div>
        <p style={{ margin: 0, color: '#334155', fontWeight: 500 }}>
          "Current algorithmic projection: If existing attendance patterns persist, the student maintains a <span style={{ color: '#FF3B30', fontWeight: 700 }}>low probability (42%)</span> of a successful top-tier corporate placement."
        </p>
      </div>

    </div>
  );
};
export default ParentAIInsights;
