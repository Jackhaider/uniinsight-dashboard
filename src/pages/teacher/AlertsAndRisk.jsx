import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Bell, Search, Clock, Zap, MoreVertical, Plus, ShieldHalf, ArrowRight
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const studentRoster = [
  { id: 1, name: 'Bob Johnson', roll: '2024CS02', features: [50, 40, 45, 2] },
  { id: 2, name: 'Evan Williams', roll: '2024CS05', features: [85, 50, 55, 4] },
  { id: 3, name: 'Fiona Gallagher', roll: '2024CS06', features: [95, 90, 85, 9] },
  { id: 4, name: 'Charlie Brown', roll: '2024CS03', features: [60, 65, 50, 5] },
  { id: 5, name: 'Diana Prince', roll: '2024CS04', features: [100, 95, 98, 10] },
];

const AlertsAndRisk = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [analyzedStudents, setAnalyzedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPredictions = async () => {
      const results = await Promise.all(studentRoster.map(async (student) => {
        const aiData = await aiService.predictAll(student.features);
        return {
          ...student,
          aiData,
          priority: aiData.risk_category === 'At Risk' ? 'high' : aiData.risk_category === 'Average' ? 'med' : 'low',
        };
      }));
      setAnalyzedStudents(results);
      setLoading(false);
    };
    fetchAllPredictions();
  }, []);

  const filteredAlerts = analyzedStudents.filter(a => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'critical' && a.priority === 'high');
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: analyzedStudents.length,
    critical: analyzedStudents.filter(a => a.priority === 'high').length,
    interventions: 2
  };

  return (
    <div className="alerts-module animate-fade">
      {/* Header & High-Level Pulse */}
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: '1.8rem', color: '#0f172a', marginBottom: '4px' }}>Academic Alert System</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Active intervention radar powered by Scikit-Learn Machine Learning.</p>
        </div>
        <div className="flex-start" style={{ gap: '1rem' }}>
           <div className="badge-premium" style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#FF3B30', padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #fee2e2' }}>
              <ShieldHalf size={16} /> <strong>{loading ? '...' : stats.critical} Critical Risks</strong>
           </div>
        </div>
      </div>

      {/* Section 1: HIGH PRIORITY SNIPER (GOLDEN FEATURE) */}
      <div className="module-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', borderLeft: '6px solid #FF3B30' }}>
         <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <h4 className="flex-start" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#991b1b' }}>
               <Zap size={20} fill="#FF3B30" color="#FF3B30" /> Critical Performance Watch (ML Predicted)
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 800 }}>Immediate Intervention Required</span>
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {loading ? <p>Running AI inferences...</p> : analyzedStudents.filter(a => a.priority === 'high').map(alert => (
              <div key={alert.id} className="module-card" style={{ background: 'white', border: '1px solid #fee2e2', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <div className="flex-between">
                    <div className="flex-start" style={{ gap: '10px' }}>
                       <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.05)', color: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{alert.name[0]}</div>
                       <div>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{alert.name}</p>
                          <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8' }}>Roll: {alert.roll}</p>
                       </div>
                    </div>
                    <span className="badge" style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '50px' }}>CRITICAL</span>
                 </div>
                 <div style={{ background: '#fff1f2', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid #FF3B30' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#991b1b' }}>Predicted Score: {alert.aiData.predicted_score}/100</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#991b1b' }}>{alert.aiData.insights[0]}</p>
                 </div>
                 <div className="flex-start" style={{ gap: '8px' }}>
                    <button className="btn btn-outline tiny" style={{ flex: 1, borderColor: '#FF3B30', color: '#FF3B30' }}>Call Parent</button>
                    <button className="icon-btn tiny"><ArrowRight size={14} /></button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Alert Ledger & Feed */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
          <div className="module-card" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
             <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex-start" style={{ gap: '1.5rem' }}>
                   <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Scikit-Learn Student Analysis</h4>
                   <div className="flex-start" style={{ gap: '4px' }}>
                      <button onClick={() => setFilter('all')} className={`badge-btn ${filter==='all'?'active':''}`}>All Predicted</button>
                      <button onClick={() => setFilter('critical')} className={`badge-btn ${filter==='critical'?'active':''}`}>At Risk Only</button>
                   </div>
                </div>
                <div className="search-box-mini" style={{ width: '220px', position: 'relative' }}>
                   <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                   <input type="text" placeholder="Search Students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem' }} />
                </div>
             </div>

             <div className="alert-ledger-feed">
               {loading ? <p style={{padding: "20px"}}>Running K-Means Clustering & Random Forest Classification...</p> : 
                filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
                  <div key={alert.id} className="alert-row-premium" style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s', cursor: 'pointer' }}>
                     <div style={{ width: '40px', flexShrink: 0 }}>
                        {alert.priority === 'high' ? <AlertTriangle size={20} color="#FF3B30" /> : <Bell size={20} color="#007AFF" />}
                     </div>
                     <div style={{ flex: 1 }}>
                        <div className="flex-start" style={{ gap: '8px', marginBottom: '4px' }}>
                           <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{alert.name}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
                          Category: <strong>{alert.aiData.risk_category}</strong> | Predicted Score: <strong>{alert.aiData.predicted_score}</strong>
                        </p>
                     </div>
                     <div style={{ textAlign: 'right', paddingRight: '2rem' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '0.75rem', color: '#94a3b8' }}>{alert.aiData.cluster.description}</p>
                        <span className={`priority-tag ${alert.priority}`}>{alert.priority.toUpperCase()}</span>
                     </div>
                  </div>
                )) : (
                  <div style={{ padding: '4rem', textAlign: 'center' }}>
                     <p style={{ color: '#94a3b8', fontSize: '1rem' }}>No AI records matching the current search parameters.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column: AI Intervention & Time Filters */}
        <div className="flex-col" style={{ gap: '1.5rem' }}>
           {/* AI Tactical Explanation */}
           <div className="module-card" style={{ background: '#1e293b', border: '1px solid #334155', padding: '1.5rem', borderRadius: '16px', color: 'white' }}>
              <div className="flex-start" style={{ gap: '10px', marginBottom: '1.2rem' }}>
                 <Zap size={22} color="#5856D6" fill="#5856D6" />
                 <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>AI Clustering Diagnostic</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                "K-Means Clustering has grouped the class into distinct profiles. Ensure At Risk profiles are given individual support plans."
              </p>
           </div>
        </div>
      </div>

      <style>{`
        .badge-btn { padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; background: rgba(255,255,255,0.02); color: #64748b; border: none; cursor: pointer; transition: all 0.2s; }
        .badge-btn.active { background: #0f172a; color: white; }
        .priority-tag { font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
        .priority-tag.high { background: #fef2f2; color: #FF3B30; }
        .priority-tag.med { background: #fffbeb; color: #FF9500; }
        .priority-tag.low { background: #f0fdf4; color: #34C759; }
      `}</style>
    </div>
  );
};
export default AlertsAndRisk;
