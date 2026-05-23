import React, { useState, useEffect } from 'react';
import { 
  Trophy, TrendingUp, TrendingDown, BrainCircuit, Target, 
  Award, Flame, Minus, Filter, Loader2
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

const Leaderboard = () => {
  const [filter, setFilter] = useState('Overall');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiFetch('/students/leaderboard');
        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data.leaderboard || []);
          setCurrentUserData(data.current_user_rank || null);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [filter]);

  if (loading) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  const top3 = leaderboardData.slice(0, 3);
  const currentUserRank = currentUserData?.rank || '--';
  const currentUserScore = currentUserData?.score || 0;

  return (
    <div className="student-module animate-fade">
      <div className="flex-between">
        <div>
          <h2>Academic Rankings & Leaderboard</h2>
          <p className="text-muted">Compare your academic performance against the institution</p>
        </div>
        <div className="flex-start">
           <button className={`btn ${filter === 'Overall' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('Overall')}>Overall</button>
           <button className={`btn ${filter === 'Subject' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('Subject')}>Subject-wise</button>
           <button className={`btn ${filter === 'Skill' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('Skill')}>Skill-based</button>
           <button className="btn btn-outline" style={{ marginLeft: '1rem' }}><Filter size={16}/> More Filters</button>
        </div>
      </div>

      {/* Feature 9 & 10: AI Insight & Motivation Banner */}
      <div className="module-card" style={{ background: '#f5f5f7', borderLeft: '4px solid #FF9500', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex-start">
          <BrainCircuit size={20} color="#FF9500" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Learning Assistant Insight</h3>
        </div>
        <p style={{ marginTop: '0.8rem', color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
          "Don't worry about slipping a few ranks this week—it happens! <strong style={{ color: '#1d1d1f' }}>You are incredibly close to the Top 10</strong>. Getting those Physics assignments in will bounce you right back up!"
        </p>
      </div>

      {/* Row 3: Your Position The Golden Feature */}
      <div className="uni-card" style={{ background: '#ebf9ee', border: '1px solid #d1f2db', padding: '1.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
           <p style={{ color: '#34C759', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Target size={18}/> Your Exact Position</p>
           <span className="badge warning" style={{ padding: '6px 12px', fontSize: '0.9rem', background: '#FF9500', color: 'white', border: 'none' }}>Rank: {currentUserRank}{currentUserRank === 1 ? 'st' : currentUserRank === 2 ? 'nd' : currentUserRank === 3 ? 'rd' : 'th'}</span>
        </div>
        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1d1d1f' }}>Current Score: {currentUserScore} PTS</h4>
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px dashed #34C759' }}>
          <p style={{ margin: 0, color: '#1d1d1f', fontWeight: 500, lineHeight: 1.5 }}>
            You're just <strong style={{ fontSize: '1.4rem', color: '#34C759' }}>12 Points</strong> away from breaking into the Top 10. Let's make it happen!
          </p>
        </div>
      </div>

      {/* Feature 1: The Podium (Top 3) */}
      <h3 style={{ marginTop: '1rem', marginBottom: '-0.5rem', fontSize: '1.2rem' }}>The Institutional Leaders</h3>
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* Bronze */}
        <div className="module-card" style={{ borderTop: '4px solid #cd7f32', transform: 'scale(0.95)' }}>
          <div className="flex-between">
            <h3 style={{ margin: 0, color: '#cd7f32' }}>#3</h3>
            <span className="text-green flex-start" style={{ fontSize: '0.8rem', fontWeight: 600 }}><TrendingUp size={14}/></span>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{top3[2]?.name || 'James Wilson'}</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>{top3[2]?.score || 920} PTS</p>
        </div>
        {/* Gold */}
        <div className="module-card" style={{ borderTop: '4px solid #FF9500', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transform: 'scale(1.05)', zIndex: 10 }}>
          <div className="flex-between">
            <h3 style={{ margin: 0, color: '#FF9500', fontSize: '1.5rem' }}>#1 👑</h3>
            <span style={{ color: '#34C759', fontSize: '0.8rem', fontWeight: 600 }} className="flex-start"><TrendingUp size={14}/></span>
          </div>
          <h4 style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>{top3[0]?.name || 'Alex Chen'}</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>{top3[0]?.score || 980} PTS</p>
        </div>
        {/* Silver */}
        <div className="module-card" style={{ borderTop: '4px solid #94a3b8', transform: 'scale(0.95)' }}>
          <div className="flex-between">
            <h3 style={{ margin: 0, color: '#64748b' }}>#2</h3>
            <span className="text-green flex-start" style={{ fontSize: '0.8rem', fontWeight: 600 }}><Minus size={14} className="text-muted"/></span>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{top3[1]?.name || 'Sarah Miller'}</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>{top3[1]?.score || 945} PTS</p>
        </div>
      </div>

      {/* Row 4: Performance Standouts & Receding Ranks (Academic feel) */}
      <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="module-card" style={{ borderLeft: '3px solid #34C759' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <TrendingUp size={20} color="#34C759"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Top Gainers (This Week)</h3>
          </div>
          <div className="flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>{leaderboardData[3]?.name || 'Liam Johnson'}</span> <span className="badge success">+12 Ranks</span>
          </div>
          <div className="flex-between" style={{ padding: '0.6rem 0' }}>
            <span style={{ fontWeight: 500 }}>{leaderboardData[4]?.name || 'Emma Davis'}</span> <span className="badge success">+8 Ranks</span>
          </div>
        </div>

        <div className="module-card" style={{ borderLeft: '3px solid #FF3B30' }}>
          <div className="flex-start" style={{ marginBottom: '1rem' }}>
            <TrendingDown size={20} color="#FF3B30"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1d1d1f' }}>Receding Ranks (This Week)</h3>
          </div>
          <div className="flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 500 }}>{leaderboardData[leaderboardData.length - 1]?.name || 'Noah Williams'}</span> <span className="badge critical">-15 Ranks</span>
          </div>
          <div className="flex-between" style={{ padding: '0.6rem 0' }}>
            <span style={{ fontWeight: 500 }}>You</span> <span className="badge critical">-3 Ranks</span>
          </div>
        </div>
      </div>

      {/* Row 5: Full Ranking Table & Gamification Sidebar */}
      <div className="stats-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="module-card">
           <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Global Institutional Roster</h3>
           <table className="data-table" style={{ marginTop: 0 }}>
            <thead>
              <tr>
                <th style={{ padding: '0.8rem 0', width: '60px' }}>Rank</th>
                <th style={{ padding: '0.8rem 0' }}>Student Name</th>
                <th style={{ padding: '0.8rem 0' }}>Score</th>
                <th style={{ padding: '0.8rem 0', textAlign: 'right' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((student, index) => (
                <tr key={student.id} style={student.is_current_user ? { background: '#f5f5f7' } : {}}>
                  <td style={{ padding: '0.8rem 0', fontWeight: student.is_current_user ? 700 : 600, color: student.is_current_user ? '#007AFF' : 'inherit', paddingLeft: student.is_current_user ? '8px' : '0' }}>{student.rank}</td>
                  <td style={{ padding: '0.8rem 0', fontWeight: student.is_current_user ? 700 : 'normal', color: student.is_current_user ? '#007AFF' : 'inherit' }}>
                    {student.is_current_user ? 'You' : student.name}
                  </td>
                  <td style={{ padding: '0.8rem 0', fontWeight: 600 }}>{student.score}</td>
                  <td style={{ padding: '0.8rem 0', textAlign: 'right', paddingRight: student.is_current_user ? '8px' : '0' }} className={student.is_current_user ? "text-danger" : "text-green"}>
                    {student.is_current_user ? <TrendingDown size={16}/> : <TrendingUp size={16}/>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature 7 & 8: Gamification Sidebar */}
        <div className="module-card">
          <div className="flex-start" style={{ marginBottom: '1.5rem' }}>
            <Award size={20} className="text-indigo"/>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Your Trophies</h3>
          </div>
          
          <h4 className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Active Streaks</h4>
          <div className="flex-start" style={{ padding: '0.8rem', background: '#fff0f0', borderRadius: '8px', border: '1px solid #ffe5e5', marginBottom: '1.5rem' }}>
            <Flame size={20} color="#FF3B30" />
            <div>
              <p style={{ margin: 0, color: '#FF3B30', fontWeight: 600 }}>5 Day Attendance Streak</p>
              <p style={{ margin: '2px 0 0', color: '#FF3B30', fontSize: '0.8rem' }}>Keep it up to earn +10 PTS</p>
            </div>
          </div>

          <h4 className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Badges Earned</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ padding: '0.6rem', textAlign: 'center', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px' }}>
              <Trophy size={24} color="#FF9500" style={{ margin: '0 auto 4px' }}/>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1d1d1f' }}>Top 15% Math</span>
            </div>
            <div style={{ padding: '0.6rem', textAlign: 'center', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px' }}>
              <TrendingUp size={24} color="#34C759" style={{ margin: '0 auto 4px' }}/>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1d1d1f' }}>Most Improved</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default Leaderboard;
