import React from 'react';
import { User, Lock, Bell, Moon, Globe, Shield, LogOut } from 'lucide-react';

import './TeacherDashboard.css';

const TeacherSettings = () => {
  return (
    <div className="teacher-settings animate-fade">
      <div className="section-header">
        <div>
          <h2>Profile & System Settings</h2>
          <p className="text-muted">Manage your faculty account and preferences</p>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar card-list glass">
          <div className="setting-nav active">
            <User size={18} /> Profile Information
          </div>
          <div className="setting-nav">
            <Lock size={18} /> Security & Password
          </div>
          <div className="setting-nav">
            <Bell size={18} /> Notification Preferences
          </div>
          <div className="setting-nav">
            <Moon size={18} /> Interface & Theme
          </div>
          <div className="setting-nav">
            <Globe size={18} /> Regional & Language
          </div>
          <div className="setting-nav danger">
            <LogOut size={18} /> Sign Out
          </div>
        </div>

        <div className="settings-content glass">
          <div className="settings-section">
            <h3>Personal Information</h3>
            <div className="profile-edit-summary">
              <div className="avatar-large">JD</div>
              <div className="profile-actions">
                <button className="secondary-btn sm">Upload New Photo</button>
                <button className="text-btn red">Remove</button>
              </div>
            </div>

            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Prof. John Doe" />
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <input type="text" defaultValue="EMP2024091" disabled />
                </div>
              </div>
              
              <div className="form-group">
                <label>University Email</label>
                <input type="email" defaultValue="j.doe@university.edu" />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input type="text" defaultValue="Computer Science & Engineering" />
              </div>

              <div className="form-group">
                <label>Bio / Research Interests</label>
                <textarea defaultValue="Focused on Algorithm Design, Data Structures, and Predictive Educational Analytics."></textarea>
              </div>

              <div className="form-actions">
                <button className="primary-btn">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
