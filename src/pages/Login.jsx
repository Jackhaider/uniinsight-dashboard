import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Mail, Lock, Loader2 } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="login-container">
      <div className="login-visual">
        <div className="brand-logo animate-fade">
          <TrendingUp size={48} className="text-blue" />
          <h1>UniInsight<span>AI</span></h1>
        </div>
        <p className="tagline animate-fade">Where Education meets Predictive Excellence</p>
      </div>

      <div className="login-card-wrapper animate-fade">
        <div className="login-card glass">
          <h2>Welcome to UniInsight</h2>
          <p>Sign in to your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message" style={{ color: '#FF3B30', background: '#ffebe9', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}
            
            <div className="input-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#1d1d1f', fontWeight: 500 }}>Email Address</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@uniinsight.edu" 
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#1d1d1f', fontWeight: 500 }}>Password</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading} style={{ width: '100%', padding: '14px', background: '#007AFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? <Loader2 className="spinner" size={20} /> : 'Sign In'}
            </button>
          </form>

          <div className="demo-hints" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '10px' }}>Demo Accounts (Password: <strong>password</strong>)</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              <button onClick={() => fillDemo('admin@uniinsight.edu')} style={{ background: 'rgba(0,122,255,0.1)', color: '#007AFF', border: 'none', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer' }}>Admin</button>
              <button onClick={() => fillDemo('sarah.dsouza@uniinsight.edu')} style={{ background: 'rgba(52,199,89,0.1)', color: '#34C759', border: 'none', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer' }}>Teacher</button>
              <button onClick={() => fillDemo('student1@uniinsight.edu')} style={{ background: 'rgba(255,149,0,0.1)', color: '#FF9500', border: 'none', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer' }}>Student</button>
              <button onClick={() => fillDemo('parent@demo.edu')} style={{ background: 'rgba(175,82,222,0.1)', color: '#AF52DE', border: 'none', padding: '6px 10px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer' }}>Parent</button>
            </div>
          </div>

          <div className="login-footer">
            <p>© 2024 UniInsight Intelligence System. All rights reserved.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
