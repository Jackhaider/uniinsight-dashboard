import React, { useState, useEffect } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';
import {
  ScanFace, AlertTriangle, BrainCircuit, Users, TrendingUp, Activity, 
  Video, ShieldAlert, CheckCircle, Eye, EyeOff, LayoutGrid, MonitorPlay, 
  MapPin, Clock, Filter, PlayCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import './ClassroomIntelligence.css';

// --- MOCK DATA ---
const ALL_ROOMS = [
  { id: 'room-a204', building: 'Block A', name: 'Room A-204', type: 'Lecture', subject: 'DBMS', faculty: 'Dr. Ramesh', status: 'live', engage: 85, attend: 92, risk: 'Low' },
  { id: 'room-b101', building: 'Block B', name: 'AI Lab 1', type: 'Lab', subject: 'Machine Learning', faculty: 'Prof. Sarah', status: 'critical', engage: 45, attend: 65, risk: 'High' },
  { id: 'room-c305', building: 'Block C', name: 'Room C-305', type: 'Lecture', subject: 'Operating Systems', faculty: 'Dr. Amit', status: 'warning', engage: 65, attend: 75, risk: 'Moderate' },
  { id: 'room-a102', building: 'Block A', name: 'Java Practical Lab', type: 'Lab', subject: 'Java Programming', faculty: 'Prof. Sarah', status: 'live', engage: 90, attend: 95, risk: 'Low' },
  { id: 'room-d401', building: 'Block D', name: 'Auditorium', type: 'Seminar', subject: 'Guest Lecture', faculty: 'External', status: 'inactive', engage: 0, attend: 0, risk: 'N/A' },
];

const MOCK_STUDENTS = [
  { id: '1', name: 'Alice Smith', status: 'present', engagement: 92, x: 20, y: 30 },
  { id: '2', name: 'Bob Johnson', status: 'present', engagement: 45, x: 45, y: 35 },
  { id: '3', name: 'Charlie Brown', status: 'absent', engagement: 0, x: null, y: null },
  { id: '4', name: 'Diana Prince', status: 'present', engagement: 88, x: 75, y: 40 },
  { id: '5', name: 'Evan Williams', status: 'present', engagement: 30, x: 30, y: 65 },
  { id: '6', name: 'Unknown_Face_01', status: 'unknown', engagement: 0, x: 60, y: 70 },
];

const INITIAL_ALERTS = [
  { id: 1, type: 'info', time: '09:00:15', msg: 'Insights Engine Initialized. Ready for class.' },
  { id: 2, type: 'success', time: '09:01:22', msg: 'Alice Smith is marked present automatically.' },
  { id: 3, type: 'warning', time: '09:05:40', msg: 'Bob Johnson seems a bit distracted right now.' }
];

const ENGAGEMENT_DATA = [
  { time: '09:00', score: 85 }, { time: '09:10', score: 88 }, { time: '09:20', score: 90 },
  { time: '09:30', score: 75 }, { time: '09:40', score: 65 }, { time: '09:50', score: 82 },
  { time: '10:00', score: 85 }
];

const RISK_RADAR_DATA = [
  { subject: 'Attendance', A: 80, fullMark: 100 },
  { subject: 'Attentiveness', A: 65, fullMark: 100 },
  { subject: 'Participation', A: 45, fullMark: 100 },
  { subject: 'Punctuality', A: 90, fullMark: 100 },
  { subject: 'Device Focus', A: 55, fullMark: 100 },
];

export default function ClassroomIntelligence() {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;
  
  const [activeView, setActiveView] = useState(isAdmin ? 'grid' : 'stream'); // 'grid' or 'stream'
  const [selectedRoom, setSelectedRoom] = useState(isAdmin ? null : ALL_ROOMS[0]);
  
  // Smart Selector States
  const [filterBuilding, setFilterBuilding] = useState('All');
  const [filterDept, setFilterDept] = useState('All');

  // Simulation states
  const [faces, setFaces] = useState(MOCK_STUDENTS.filter(s => s.x !== null));
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [engagementTrend, setEngagementTrend] = useState(ENGAGEMENT_DATA);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (activeView !== 'stream') return;

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setFaces(prev => prev.map(f => ({
        ...f,
        x: Math.max(5, Math.min(90, f.x + (Math.random() * 2 - 1))),
        y: Math.max(5, Math.min(90, f.y + (Math.random() * 2 - 1))),
        engagement: f.status === 'unknown' ? 0 : Math.max(10, Math.min(100, f.engagement + (Math.random() * 6 - 3)))
      })));

      if (Math.random() > 0.85) {
        const r = Math.random();
        let newAlert = { id: Date.now(), time: new Date().toLocaleTimeString() };
        if (r > 0.8) { newAlert.type = 'critical'; newAlert.msg = 'Attention needed: We noticed some unusual attendance patterns that might need your manual verification.'; }
        else if (r > 0.5) { newAlert.type = 'warning'; newAlert.msg = `The class energy seems to be dipping a bit.`; }
        else { newAlert.type = 'info'; newAlert.msg = 'Routine class check completed smoothly.'; }
        setAlerts(prev => [newAlert, ...prev].slice(0, 15));
      }

      if (Math.random() > 0.7) {
        setEngagementTrend(prev => {
          const newArr = [...prev.slice(1)];
          newArr.push({ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), score: Math.floor(Math.random() * 30 + 60) });
          return newArr;
        });
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [activeView]);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setActiveView('stream');
  };

  const filteredRooms = ALL_ROOMS.filter(r => 
    (filterBuilding === 'All' || r.building === filterBuilding) &&
    (filterDept === 'All' || (filterDept === 'CS' ? r.subject.includes('Java') || r.subject.includes('OS') || r.subject.includes('DBMS') || r.subject.includes('ML') : true))
  );

  const renderSelector = () => (
    <div className="cv-selector-bar">
      <div className="cv-select-group">
        <span className="cv-select-label">Building / Block</span>
        <select className="cv-select" value={filterBuilding} onChange={e => setFilterBuilding(e.target.value)}>
          <option>All</option>
          <option>Block A</option>
          <option>Block B</option>
          <option>Block C</option>
        </select>
      </div>
      <div className="cv-select-group">
        <span className="cv-select-label">Department</span>
        <select className="cv-select" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
          <option>All</option>
          <option>CS</option>
          <option>Engineering</option>
        </select>
      </div>
      {isAdmin && (
        <div className="cv-select-group">
          <span className="cv-select-label">Quick Actions</span>
          <button className="btn-command" onClick={() => { setActiveView('grid'); setSelectedRoom(null); }}>
            <LayoutGrid size={16} /> View All Rooms
          </button>
        </div>
      )}
      {!isAdmin && (
        <div className="cv-select-group">
          <span className="cv-select-label">My Classrooms</span>
          <select className="cv-select" onChange={(e) => handleRoomSelect(ALL_ROOMS.find(r => r.id === e.target.value))} value={selectedRoom?.id}>
            {ALL_ROOMS.filter(r => r.faculty.includes(user?.name.split(' ')[0] || 'Ramesh')).map(r => (
              <option key={r.id} value={r.id}>{r.name} - {r.subject}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderAdminGrid = () => (
    <div className="admin-grid">
      {filteredRooms.map(room => (
        <div key={room.id} className="room-card" onClick={() => handleRoomSelect(room)}>
          <div className="room-card-header">
            <h3 className="room-card-title"><MonitorPlay size={18} color="#5856D6"/> {room.name}</h3>
            <span className={`status-badge ${room.status}`}>{room.status}</span>
          </div>
          <div className="room-card-footer">
            <MapPin size={14} color="#94a3b8" /> {room.building} | {room.subject}
          </div>
          <div className="room-metrics">
            <div className="room-metric">
              <span className="room-metric-label">Avg Engagement</span>
              <span className="room-metric-value">{room.engage}%</span>
            </div>
            <div className="room-metric">
              <span className="room-metric-label">Attendance Ratio</span>
              <span className="room-metric-value">{room.attend}%</span>
            </div>
          </div>
          <div className="room-card-footer" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}><Users size={14} style={{ display: 'inline', marginRight: '4px'}}/> Faculty: {room.faculty}</span>
            <button className="btn" style={{ background: 'transparent', border: '1px solid #5856D6', color: '#5856D6', padding: '4px 10px', fontSize: '0.7rem' }}>ENTER STREAM</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStreamView = () => {
    if (!selectedRoom) return null;
    const avgEngagement = Math.round(faces.filter(f => f.status !== 'unknown').reduce((acc, f) => acc + f.engagement, 0) / (faces.length - 1));

    return (
      <>
        {/* KPIs */}
        <div className="cv-kpi-grid">
          <div className="cv-kpi-card blue">
            <span className="cv-kpi-label">Auto Checked-In</span>
            <span className="cv-kpi-value">4 / 7</span>
            <span className="cv-kpi-desc"><Users size={12}/> {selectedRoom.name} Enrolled</span>
          </div>
          <div className="cv-kpi-card green">
            <span className="cv-kpi-label">Classroom Engagement</span>
            <span className="cv-kpi-value">{avgEngagement}%</span>
            <span className="cv-kpi-desc"><Activity size={12}/> Real-time focus metrics</span>
          </div>
          <div className="cv-kpi-card amber">
            <span className="cv-kpi-label">Unknown Faces</span>
            <span className="cv-kpi-value">1</span>
            <span className="cv-kpi-desc"><Eye size={12}/> Pending verification review</span>
          </div>
          <div className="cv-kpi-card rose">
            <span className="cv-kpi-label">System Validations</span>
            <span className="cv-kpi-value">2</span>
            <span className="cv-kpi-desc"><ShieldAlert size={12}/> Unusual check-ins verified</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="cv-main-grid">
          {/* Left Column: Camera Feed & Insight */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="cv-panel">
              <div className="cv-panel-header">
                <h3 className="cv-panel-title"><Video size={18}/> Live Feed: {selectedRoom.name} ({selectedRoom.subject})</h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{currentTime}</span>
              </div>
              <div className="cv-panel-content" style={{ padding: '1rem' }}>
                <div className="camera-container">
                  <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={64} color="#334155" opacity={0.5}/>
                  </div>
                  <div className="camera-overlay"></div>
                  
                  {/* Render bounding boxes */}
                  {faces.map(face => {
                    const isUnknown = face.status === 'unknown';
                    const isAlert = !isUnknown && face.engagement < 40;
                    const boxClass = `face-box ${isUnknown ? 'unknown' : isAlert ? 'alert' : ''}`;
                    
                    return (
                      <div key={face.id} className={boxClass} style={{ left: `${face.x}%`, top: `${face.y}%`, width: '12%', height: '25%' }}>
                        <div className="face-label">
                          {isUnknown ? 'UNKNOWN' : `${face.name} (${Math.round(face.engagement)}%)`}
                        </div>
                      </div>
                    );
                  })}
                  <div className="camera-hud">YOLOv8 Detection | FPS: 24 | Latency: 42ms</div>
                </div>
              </div>
            </div>

            <div className="ai-insight-banner">
              <BrainCircuit size={24} color="#5856D6" />
              <p>
                <strong style={{color: '#5856D6'}}>Teaching Assistant Insights:</strong> It looks like the students in the back rows are having a little trouble staying focused. This might be a perfect moment for a quick, interactive poll to get everyone engaged!
              </p>
            </div>

          </div>

          {/* Right Column: Analytics & Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="cv-panel">
              <div className="cv-panel-header">
                <h3 className="cv-panel-title"><TrendingUp size={18}/> Real-time Analytics</h3>
              </div>
              <div className="cv-panel-content">
                <div className="chart-wrapper" style={{ height: '180px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Engagement Trend</span>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementTrend}>
                      <defs>
                        <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#34C759" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}/>
                      <Area type="monotone" dataKey="score" stroke="#34C759" fillOpacity={1} fill="url(#colorEngage)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-wrapper" style={{ height: '220px', marginBottom: 0 }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>Behavioral Risk Radar</span>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RISK_RADAR_DATA}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Class Average" dataKey="A" stroke="#5856D6" fill="#5856D6" fillOpacity={0.4} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d2d2d7', borderRadius: '8px', color: '#1d1d1f' }}/>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="cv-panel" style={{ flex: 1 }}>
              <div className="cv-panel-header">
                <h3 className="cv-panel-title"><AlertTriangle size={18}/> Activity Stream</h3>
              </div>
              <div className="cv-panel-content" style={{ padding: '1rem 0.5rem 1rem 1rem' }}>
                <div className="alert-log">
                  {alerts.map(alert => {
                    let Icon = AlertTriangle; let color = '#94a3b8';
                    if (alert.type === 'critical') { Icon = ShieldAlert; color = '#FF3B30'; } 
                    else if (alert.type === 'warning') { Icon = EyeOff; color = '#FF9500'; } 
                    else if (alert.type === 'success') { Icon = CheckCircle; color = '#34C759'; }
                    return (
                      <div key={alert.id} className={`alert-item ${alert.type}`}>
                        <Icon size={16} color={color} className="alert-icon" />
                        <div className="alert-content">
                          <div className="alert-time">{alert.time}</div>
                          <div className="alert-message">{alert.msg}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="cv-intelligence-container">
      {/* Header */}
      <div className="cv-header">
        <div className="cv-header-title">
          <ScanFace size={32} color="#5856D6" />
          <div>
            <h2>{isAdmin ? 'Institution Overview' : 'Classroom Insights'}</h2>
            <p>Real-time Session Monitoring & Support</p>
          </div>
        </div>
        <div className="live-badge">
          <div className="pulse-dot"></div>
          {activeView === 'grid' ? 'Grid Matrix Live' : 'Live CV Stream Active'}
        </div>
      </div>

      {renderSelector()}

      <div style={{ marginTop: '0.5rem' }}>
        {activeView === 'grid' && isAdmin ? renderAdminGrid() : renderStreamView()}
      </div>
    </div>
  );
}
