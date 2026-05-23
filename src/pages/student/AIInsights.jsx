import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, AlertTriangle, Zap, Target, TrendingDown, 
  Activity, Briefcase, FileWarning, CheckCircle, BarChart2
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const AIInsights = () => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      // Simulate features: [attendance, assignments, marks, participation]
      // Try slightly weak attendance and assignments to trigger "At Risk" text
      const features = [55, 45, 60, 4]; 
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
          <h2>Learning Insights</h2>
          <p className="text-muted">Personalized feedback to help you understand your progress and reach your full potential.</p>
        </div>
        <div className="badge info" style={{ background: '#e5f0ff', color: '#007AFF', border: 'none' }}>
          <Activity size={14} /> Insights Engine Active
        </div>
      </div>

      {/* Row 1: The Briefing & Priority */}
      <div className="module-card" style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)', borderLeft: loading ? '4px solid #d2d2d7' : aiData?.risk_category === 'At Risk' ? '4px solid #FF3B30' : aiData?.risk_category === 'Average' ? '4px solid #FF9500' : '4px solid #34C759', marginBottom: '1.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div className="flex-start">
            <BrainCircuit size={24} color={loading ? '#d2d2d7' : aiData?.risk_category === 'At Risk' ? '#FF3B30' : aiData?.risk_category === 'Average' ? '#FF9500' : '#34C759'} />
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1d1d1f' }}>Your Progress Summary</h3>
          </div>
          {!loading && (
             <span className={`badge ${aiData?.risk_category === 'At Risk' ? 'danger' : aiData?.risk_category === 'Average' ? 'warning' : 'success'}`} style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
               <AlertTriangle size={14} style={{ marginRight: '6px' }}/> Status: {aiData?.risk_category?.toUpperCase()}
             </span>
          )}
        </div>
        <div style={{ margin: 0, color: '#1d1d1f', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500 }}>
          {loading ? (
             <p>Gathering your insights...</p>
          ) : (
             <>
               <p style={{ marginBottom: "10px" }}>We've been looking at your recent progress, and right now you're doing <strong>{aiData?.risk_category}</strong>. If you keep this up, you're on track for a score of about {aiData?.predicted_score}/100. Based on your study habits ({aiData?.cluster?.description}):</p>
               <ul style={{ paddingLeft: '20px' }}>
                 {aiData?.insights.map((insight, idx) => (
                   <li key={idx} style={{ marginBottom: "5px" }}>{insight}</li>
                 ))}
               </ul>
             </>
          )}
        </div>
      </div>

      {/* Row 2: Diagnostics (Problems vs Strengths) */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card" style={{ borderTop: '4px solid #FF3B30' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <FileWarning size={20} color="#FF3B30" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Areas for Growth</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loading ? <li style={{ color: '#86868b' }}>Loading details...</li> : (
              <>
                {aiData?.insights.find(i => i.toLowerCase().includes('attendance')) && (
                  <li className="flex-start" style={{ fontWeight: 500, color: '#FF3B30' }}>🔴 Missing a few classes recently</li>
                )}
                {aiData?.insights.find(i => i.toLowerCase().includes('assignment')) && (
                  <li className="flex-start" style={{ fontWeight: 500, color: '#FF3B30' }}>🔴 A couple of assignments slipped by</li>
                )}
                {aiData?.risk_category === 'At Risk' && (
                  <li className="flex-start" style={{ fontWeight: 500, color: '#FF9500' }}>🟡 Let's work together to boost your grades</li>
                )}
              </>
            )}
          </ul>
        </div>

        <div className="module-card" style={{ borderTop: '4px solid #34C759' }}>
          <div className="flex-start" style={{ marginBottom: '1.2rem' }}>
            <Zap size={20} color="#34C759" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Your Strengths</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loading ? <li style={{ color: '#86868b' }}>Loading details...</li> : (
              <>
                {aiData?.predicted_score > 50 && (
                   <li className="flex-start" style={{ fontWeight: 500, color: '#34C759' }}>🟢 You've got a solid foundation! (Score: {aiData?.predicted_score})</li>
                )}
                {aiData?.risk_category === 'Good' && (
                  <li className="flex-start" style={{ fontWeight: 500, color: '#34C759' }}>🟢 Great job keeping up with coding assignments!</li>
                )}
                <li className="flex-start text-muted" style={{ fontWeight: 500 }}>🟢 Thanks for participating in class!</li>
              </>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};
export default AIInsights;
