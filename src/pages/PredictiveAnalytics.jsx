import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/aiService';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, ComposedChart, Line, Legend
} from 'recharts';
import {
  TrendingUp, BrainCircuit, Sparkles, Terminal, Code, Settings,
  AlertTriangle, Cpu, RefreshCw, BarChart3, HelpCircle,
  Layers, CheckCircle, User, Briefcase, CreditCard, Play
} from 'lucide-react';
import './PredictiveAnalytics.css';

const tickerItems = [
  { label: "CS COHORT PLACEMENT INDEX", value: "89.5%", up: true },
  { label: "PHYSICS BURNOUT RISK CANDIDATES", value: "3 STU", up: false },
  { label: "AVG WEEKLY CODING MINUTES", value: "248 MIN", up: true },
  { label: "INSTITUTIONAL REVENUE GAP", value: "$750K", up: false },
  { label: "CS DEPT RETENTION STATUS", value: "98.2%", up: true },
  { label: "ACTIVE INTERVENTIONS PENDING", value: "4 CHS", up: false },
];

export default function PredictiveAnalytics() {
  const { user } = useAuth();
  const activeRole = user?.role || 'student';
  const activeName = user?.name || 'User';

  // Semester Simulator slider parameters
  const [attendance, setAttendance] = useState(85);
  const [assignmentCompletion, setAssignmentCompletion] = useState(80);
  const [midtermMarks, setMidtermMarks] = useState(78);
  const [participation, setParticipation] = useState(8);
  const [technicalSkills, setTechnicalSkills] = useState(75);
  const [codingActivity, setCodingActivity] = useState(70);
  const [communication, setCommunication] = useState(72);
  const [projectCompletion, setProjectCompletion] = useState(8);
  const [aptitude, setAptitude] = useState(74);

  // Predictions fetched from API server
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  // SQL Terminal state
  const [sqlTab, setSqlTab] = useState("schemas"); // schemas | joins | console
  const [sqlSchema, setSqlSchema] = useState(null);
  const [sqlEditorText, setSqlEditorText] = useState("");
  const [sqlResult, setSqlResult] = useState([]);
  const [sqlColumns, setSqlColumns] = useState([]);
  const [sqlExplanation, setSqlExplanation] = useState("");

  // Load predictions
  const fetchPredictions = async () => {
    setLoading(true);
    const data = {
      attendance: parseFloat(attendance),
      assignment_completion: parseFloat(assignmentCompletion),
      midterm_marks: parseFloat(midtermMarks),
      participation: parseFloat(participation),
      technical_skills: parseFloat(technicalSkills),
      coding_activity: parseFloat(codingActivity),
      communication: parseFloat(communication),
      project_completion: parseFloat(projectCompletion),
      aptitude: parseFloat(aptitude)
    };
    try {
      const res = await aiService.fetchPredictiveAnalytics(data);
      setPredictions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [
    attendance, assignmentCompletion, midtermMarks, participation,
    technicalSkills, codingActivity, communication, projectCompletion, aptitude
  ]);

  // Load SQL schemas
  useEffect(() => {
    const loadSql = async () => {
      try {
        const res = await aiService.fetchSqlSchemaData();
        setSqlSchema(res);
        if (res && res.optimized_joins) {
          setSqlEditorText(res.optimized_joins.student_readiness);
          setSqlExplanation("Retrieves top CS students who have placement readiness above 75% sorted by aggregate midterm and internal grades.");
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadSql();
  }, []);

  // Execute relational database query simulator
  const handleRunSql = () => {
    if (!sqlSchema) return;
    const query = sqlEditorText.toLowerCase().trim();

    if (query.includes("fee_risk_correlation") || (query.includes("fee_transactions") && query.includes("attendance"))) {
      setSqlColumns(["student_id", "student_name", "amount_due", "payment_status", "avg_attendance"]);
      setSqlResult([
        [2, "Bob Johnson", "$1,250.00", "Pending", "42.0%"]
      ]);
    } else if (query.includes("placement_metrics") || query.includes("student_readiness") || (query.includes("students") && query.includes("placement"))) {
      setSqlColumns(["student_id", "student_name", "department", "placement_readiness", "avg_marks"]);
      setSqlResult([
        [4, "Diana Prince", "CS Core", "97.5%", "96.5"],
        [1, "Alice Smith", "CS Core", "89.5%", "90.0"],
        [3, "Charlie Brown", "Math", "64.2%", "64.0"]
      ]);
    } else if (query.includes("students")) {
      setSqlColumns(["id", "name", "email", "dept", "cohort_year"]);
      setSqlResult(sqlSchema.mock_data.students_rows.map(r => [r.id, r.name, r.email, r.dept, r.cohort_year]));
    } else if (query.includes("fee_transactions")) {
      setSqlColumns(["id", "student_name", "due", "status", "date"]);
      setSqlResult(sqlSchema.mock_data.fee_transactions_rows.map(r => [r.id, r.student_name, `$${r.due.toFixed(2)}`, r.status, r.date]));
    } else {
      setSqlColumns(["query_status", "records_matched", "description"]);
      setSqlResult([
        ["Success", "4 records", "Mock SQL engine parsed query successfully. Showing relational dataset response."]
      ]);
    }
  };

  // Recharts Data Processing
  const getGpaHistoryData = () => {
    const baseGpa = midtermMarks ? (midtermMarks / 25) + 0.5 : 3.0;
    return [
      { semester: 'Sem 1', gpa: Math.min(4.0, parseFloat((baseGpa - 0.4).toFixed(2))) },
      { semester: 'Sem 2', gpa: Math.min(4.0, parseFloat((baseGpa - 0.1).toFixed(2))) },
      { semester: 'Sem 3', gpa: Math.min(4.0, parseFloat(baseGpa.toFixed(2))) },
      { semester: 'Sem 4 (Forecast)', gpa: Math.min(4.0, parseFloat((baseGpa + (attendance > 80 ? 0.25 : -0.3)).toFixed(2))) }
    ];
  };

  const getSubjectForecastData = () => {
    if (!predictions?.subject_forecasts) return [];
    return [
      { subject: 'DBMS', Current: Math.round(midtermMarks * 0.9), Projected: Math.round(predictions.subject_forecasts.dbms) },
      { subject: 'DSA & Code', Current: Math.round(codingActivity * 0.9), Projected: Math.round(predictions.subject_forecasts.dsa) },
      { subject: 'Quantitative', Current: Math.round(aptitude * 0.95), Projected: Math.round(predictions.subject_forecasts.quantitative) }
    ];
  };

  // Calculate SVG circular stroke length (Radius=40, Circumference=251.2)
  const placementPercent = predictions?.placement_probability || 0;
  const strokeDashoffset = 251.2 - (251.2 * placementPercent) / 100;

  return (
    <div className="predictive-terminal">
      {/* Horizonal neon Bloomberg Ticker Ribbon */}
      <div className="ticker-ribbon">
        <div className="ticker-track">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className={`ticker-item ${item.up ? 'up' : 'down'}`}>
              <span className="label">{item.label}:</span>
              <span className="value">{item.value} {item.up ? '▲' : '▼'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-role-heading">
        <Cpu size={24} className="text-emerald-glow" />
        UniInsight AI Predictive Terminal
        <span>Role: {activeRole.toUpperCase()}</span>
      </div>

      {/* Dynamic Recommendation Banner */}
      <div className="ai-banner">
        <Sparkles size={20} />
        <div className="ai-banner-content">
          <strong>AI Insights Hub:</strong> {predictions?.insights?.[0] || "Adjust parameters below to trigger real-time AI projections via local Scikit-Learn models."}
        </div>
      </div>

      <div className="terminal-grid">
        {/* LEFT COLUMN: SEMESTER PARAMETERS SIMULATOR */}
        <div className="terminal-card">
          <div className="card-header">
            <h3 className="card-title">
              <Settings size={18} />
              Semester Simulator
            </h3>
            <RefreshCw size={14} className="text-muted cursor-pointer" onClick={fetchPredictions} />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Attendance Tracker</span>
              <span className="value">{attendance}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Assignment Completed</span>
              <span className="value">{assignmentCompletion}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={assignmentCompletion}
              onChange={(e) => setAssignmentCompletion(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Midterm Score Target</span>
              <span className="value">{midtermMarks}/100</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={midtermMarks}
              onChange={(e) => setMidtermMarks(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Class Participation</span>
              <span className="value">{participation}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={participation}
              onChange={(e) => setParticipation(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Technical Domain Skills</span>
              <span className="value">{technicalSkills}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={technicalSkills}
              onChange={(e) => setTechnicalSkills(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Coding Hub Labs Activity</span>
              <span className="value">{codingActivity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={codingActivity}
              onChange={(e) => setCodingActivity(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Communication Index</span>
              <span className="value">{communication}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={communication}
              onChange={(e) => setCommunication(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Projects Completed</span>
              <span className="value">{projectCompletion}/10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={projectCompletion}
              onChange={(e) => setProjectCompletion(e.target.value)}
              className="custom-range"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>Aptitude & Logical Score</span>
              <span className="value">{aptitude}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={aptitude}
              onChange={(e) => setAptitude(e.target.value)}
              className="custom-range"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: PREDICTIVE METRICS AND CHARTS */}
        <div className="terminal-content">
          <div className="kpi-grid">
            <div className="kpi-widget">
              <span className="kpi-header">Predicted Performance Score</span>
              <span className="kpi-value">{predictions?.predicted_score || 0}%</span>
              <span className="kpi-footer">
                <TrendingUp size={12} className="text-emerald-glow" /> Scikit-learn Linear Forecast
              </span>
            </div>

            <div className="kpi-widget">
              <span className="kpi-header">Behavioral Category</span>
              <span className="kpi-value" style={{ fontSize: '1.2rem', padding: '4px 0' }}>
                <span className={`behavior-badge ${
                  predictions?.behavior_flag === 'Active Outperformer' ? 'outperformer' :
                  predictions?.behavior_flag === 'Burnout Risk' ? 'burnout' :
                  predictions?.behavior_flag === 'High Risk' ? 'risk' :
                  predictions?.behavior_flag === 'Passive Learner' ? 'passive' : 'stable'
                }`}>
                  {predictions?.behavior_flag || "Stable Growth"}
                </span>
              </span>
              <span className="kpi-footer">
                <BrainCircuit size={12} /> Multivariate Clustering Classification
              </span>
            </div>

            <div className="kpi-widget">
              <span className="kpi-header">Attendance Risk Level</span>
              <span className="kpi-value" style={{ color: predictions?.attendance_shortage_risk > 30 ? 'var(--neon-rose)' : 'var(--neon-green)' }}>
                {predictions?.attendance_shortage_risk || 0}%
              </span>
              <span className="kpi-footer">
                <AlertTriangle size={12} /> Shortfall Projections (75% Criteria)
              </span>
            </div>

            <div className="kpi-widget">
              <span className="kpi-header">AI Projections Confidence</span>
              <span className="kpi-value">{predictions?.confidence_score || 0}%</span>
              <span className="kpi-footer">
                <CheckCircle size={12} className="text-emerald-glow" /> Weighted Confidence Ratio
              </span>
            </div>
          </div>

          {/* DYNAMIC ROLE-BASED DASHBOARDS */}
          {activeRole === 'student' && (
            <div className="terminal-card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header">
                <h3 className="card-title">
                  <User size={18} />
                  CS Student Placement Portfolio
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {/* Circular placement probability gauge */}
                <div className="gauge-container">
                  <svg width="120" height="120" className="gauge-svg">
                    <defs>
                      <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34C759" />
                        <stop offset="100%" stopColor="#00f2fe" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="40" className="gauge-circle-bg" />
                    <circle
                      cx="60"
                      cy="60"
                      r="40"
                      className="gauge-circle-val"
                      style={{ strokeDashoffset }}
                    />
                  </svg>
                  <div className="gauge-text">
                    <span className="gauge-percent">{placementPercent}%</span>
                    <span className="gauge-label">Placement Index</span>
                  </div>
                </div>

                {/* Company Readiness metrics */}
                <div className="company-bar-container">
                  <span className="kpi-header" style={{ marginBottom: '0.25rem' }}>Company Profiles Preparedness</span>
                  <div className="company-row">
                    <div className="company-label-row">
                      <span>MAANG High Tech</span>
                      <span className="text-emerald-glow">{predictions?.company_readiness?.maang}%</span>
                    </div>
                    <div className="company-track">
                      <div className="company-fill maang" style={{ width: `${predictions?.company_readiness?.maang}%` }} />
                    </div>
                  </div>
                  <div className="company-row">
                    <div className="company-label-row">
                      <span>Fintech & Quant Accounts</span>
                      <span className="text-emerald-glow">{predictions?.company_readiness?.fintech}%</span>
                    </div>
                    <div className="company-track">
                      <div className="company-fill fintech" style={{ width: `${predictions?.company_readiness?.fintech}%` }} />
                    </div>
                  </div>
                  <div className="company-row">
                    <div className="company-label-row">
                      <span>Business Advisory / consultancy</span>
                      <span className="text-emerald-glow">{predictions?.company_readiness?.consultancy}%</span>
                    </div>
                    <div className="company-track">
                      <div className="company-fill consultancy" style={{ width: `${predictions?.company_readiness?.consultancy}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'teacher' && (
            <div className="terminal-card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header">
                <h3 className="card-title">
                  <User size={18} />
                  Teacher's Class Audit & Support
                </h3>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <p style={{ marginBottom: '1rem' }}>
                  Analyzing classroom parameters indicates strong correlation between regular assignment submissions and final semester score outcomes.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--neon-amber)' }}>
                  <strong>Intervention Recommendation Alert:</strong><br />
                  Students categorized under "Burnout Risk" or "High Risk" are highly advised to enroll in lab tutoring. Adjusting midterm coursework marks above 60 removes students from the high-risk segment instantly.
                </div>
                <div className="insights-list">
                  <span className="insight-item">💡 Class average predicted index: {predictions?.predicted_score}% based on midterm adjustments.</span>
                  <span className="insight-item">💡 Class attendance risk warning index: {predictions?.attendance_shortage_risk}% shortfall possibility.</span>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'parent' && (
            <div className="terminal-card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header">
                <h3 className="card-title">
                  <User size={18} />
                  Parent advisory Portal (Child Progress)
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.85rem' }}>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Semester Performance Indicators</h4>
                  <p>Your child is trending stable. High participation ({participation}/10) is accelerating verbal engagement benchmarks.</p>
                  <div className={`alert-card ${attendance < 75 ? 'warn' : 'safe'}`} style={{ marginTop: '0.75rem' }}>
                    {attendance < 75
                      ? "⚠️ Warning: Low attendance requires immediate study session review to avoid examination exclusion."
                      : "🟢 Stable: Attendance levels satisfy school criteria. Keep up the consistent check-ins!"}
                  </div>
                </div>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Fee Balance & Placement link</h4>
                  <p>Operational data models indicate tuition clearance clears barriers to recruitment portal enrollment.</p>
                  <div className="alert-card safe" style={{ marginTop: '0.75rem' }}>
                    🟢 Child Placement Index is active at {placementPercent}%.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'admin' && (
            <div className="terminal-card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header">
                <h3 className="card-title">
                  <User size={18} />
                  Admin Executive Synergy KPIs
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TOTAL REGISTERED COHORTS</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '0.2rem' }}>500 Students</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CS PLACEMENT PROBABILITY MEAN</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-green)', marginTop: '0.2rem' }}>{placementPercent}%</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>COHORT ATTENDANCE AVERAGE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '0.2rem' }}>{attendance}%</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>INSTITUTIONAL PERFORMANCE GAP</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--neon-amber)', marginTop: '0.2rem' }}>{(100 - predictions?.predicted_score).toFixed(1)}% Gap</div>
                </div>
              </div>
            </div>
          )}

          {/* DUAL CHARTS GRID */}
          <div className="chart-grid">
            <div className="terminal-card">
              <div className="card-header">
                <span className="card-title">
                  <BarChart3 size={16} />
                  GPA Forecast Trajectory (4 Terms)
                </span>
              </div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <AreaChart data={getGpaHistoryData()}>
                    <defs>
                      <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="semester" stroke="#64748b" style={{ fontSize: '0.75rem' }} />
                    <YAxis domain={[0, 4.0]} stroke="#64748b" style={{ fontSize: '0.75rem' }} />
                    <Tooltip contentStyle={{ background: '#0d121f', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Area type="monotone" dataKey="gpa" stroke="#00f2fe" fillOpacity={1} fill="url(#colorGpa)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="terminal-card">
              <div className="card-header">
                <span className="card-title">
                  <BarChart3 size={16} />
                  Next Semester Subject Forecasts
                </span>
              </div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <ComposedChart data={getSubjectForecastData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="subject" stroke="#64748b" style={{ fontSize: '0.75rem' }} />
                    <YAxis domain={[0, 100]} stroke="#64748b" style={{ fontSize: '0.75rem' }} />
                    <Tooltip contentStyle={{ background: '#0d121f', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    <Bar dataKey="Current" fill="rgba(255, 255, 255, 0.15)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Projected" fill="#34C759" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="Projected" stroke="#00f2fe" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* INTERACTIVE RELATIONAL SQL EXPLORER TERMINAL */}
          <div className="terminal-card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <span className="card-title">
                <Terminal size={18} />
                Relational SQL Engine Console
              </span>
            </div>

            <div className="terminal-tabs">
              <button
                className={`tab-btn ${sqlTab === 'schemas' ? 'active' : ''}`}
                onClick={() => setSqlTab("schemas")}
              >
                <Layers size={14} /> Relational Schema structures
              </button>
              <button
                className={`tab-btn ${sqlTab === 'joins' ? 'active' : ''}`}
                onClick={() => {
                  setSqlTab("joins");
                  if (sqlSchema?.optimized_joins) {
                    setSqlEditorText(sqlSchema.optimized_joins.student_readiness);
                    setSqlExplanation("Retrieves top CS students who have placement readiness above 75% sorted by aggregate midterm and internal grades.");
                  }
                }}
              >
                <Code size={14} /> Optimized Join Templates
              </button>
              <button
                className={`tab-btn ${sqlTab === 'console' ? 'active' : ''}`}
                onClick={() => setSqlTab("console")}
              >
                <Terminal size={14} /> Interactive Query Console
              </button>
            </div>

            {sqlTab === 'schemas' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxHeight: 350, overflowY: 'auto' }}>
                {sqlSchema?.schemas && Object.entries(sqlSchema.schemas).map(([name, createSql]) => (
                  <div key={name} style={{ background: '#05070c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <strong style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--neon-emerald)' }}>Table: {name}</strong>
                      <span style={{ fontSize: '0.65rem', background: '#0d121f', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>Indexed</span>
                    </div>
                    <pre style={{ margin: 0, fontSize: '0.7rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'Fira Code, monospace' }}>
                      {createSql}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {sqlTab === 'joins' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  <div
                    style={{ background: '#05070c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
                    onClick={() => {
                      setSqlEditorText(sqlSchema?.optimized_joins?.student_readiness);
                      setSqlExplanation("Retrieves top CS students who have placement readiness above 75% sorted by aggregate midterm and internal grades.");
                      setSqlTab("console");
                    }}
                  >
                    <div style={{ color: 'var(--neon-emerald)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Query: student_readiness (CS Placement Link)</div>
                    <pre style={{ margin: 0, fontSize: '0.7rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'Fira Code, monospace' }}>
                      {sqlSchema?.optimized_joins?.student_readiness}
                    </pre>
                  </div>
                  <div
                    style={{ background: '#05070c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '1rem', cursor: 'pointer' }}
                    onClick={() => {
                      setSqlEditorText(sqlSchema?.optimized_joins?.fee_risk_correlation);
                      setSqlExplanation("Correlates tuition collection status (Pending) and low class attendance (below 75%) to identify potential dropouts.");
                      setSqlTab("console");
                    }}
                  >
                    <div style={{ color: 'var(--neon-emerald)', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Query: fee_risk_correlation (Finance Alert)</div>
                    <pre style={{ margin: 0, fontSize: '0.7rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'Fira Code, monospace' }}>
                      {sqlSchema?.optimized_joins?.fee_risk_correlation}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {sqlTab === 'console' && (
              <div className="sql-console">
                <div className="sql-console-header">
                  <span className="sql-prompt">uniinsight_db=# </span>
                  <div className="sql-actions">
                    <button className="sql-btn" onClick={() => setSqlEditorText("SELECT * FROM students;")}>Clear & Reset</button>
                    <button className="sql-btn run" onClick={handleRunSql}>
                      <Play size={10} style={{ display: 'inline', marginRight: '4px' }} /> Run Query
                    </button>
                  </div>
                </div>
                <textarea
                  className="sql-editor"
                  value={sqlEditorText}
                  onChange={(e) => setSqlEditorText(e.target.value)}
                  placeholder="Enter PostgreSQL / MySQL relational query..."
                />
                {sqlExplanation && (
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', padding: '0.5rem 1rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <strong>Active Query Explanation:</strong> {sqlExplanation}
                  </div>
                )}
                <div className="sql-table-container">
                  {sqlColumns.length > 0 ? (
                    <table className="sql-table">
                      <thead>
                        <tr>
                          {sqlColumns.map((col, idx) => (
                            <th key={idx}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sqlResult.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((val, valIdx) => (
                              <td key={valIdx}>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                      Terminal active. Proactively click "Run Query" above to fetch optimized joined tables.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
