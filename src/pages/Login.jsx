import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Mail, Lock, Loader2 } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [displayEmail, setDisplayEmail] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  
  // Hidden actual credentials
  const [actualEmail, setActualEmail] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const finalEmail = actualEmail || displayEmail;
    const finalPassword = actualPassword || displayPassword;
    
    if (!finalEmail || !finalPassword) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(finalEmail, finalPassword);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const fillDemo = (demoEmail) => {
    setActualEmail(demoEmail);
    setActualPassword('password');
    setDisplayEmail('Just click Sign In button');
    setDisplayPassword('password'); // Just visually filling it
  };

  const handleEmailChange = (e) => {
    setDisplayEmail(e.target.value);
    setActualEmail(''); // reset hidden email if user starts typing manually
  };

  const handlePasswordChange = (e) => {
    setDisplayPassword(e.target.value);
    setActualPassword('');
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

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {error && <div className="error-message" style={{ color: '#FF3B30', background: '#ffebe9', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}
            
            <div className="input-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#1d1d1f', fontWeight: 500 }}>Email Address</label>
              <div className="input-wrapper" style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                <input 
                  type="text" 
                  value={displayEmail}
                  onChange={handleEmailChange}
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
                  value={displayPassword}
                  onChange={handlePasswordChange}
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
