import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  TrendingUp,
  LogOut,
  Bell,
  Search,
  Settings,
  User as UserIcon,
  Users,
  CalendarCheck,
  LineChart,
  AlertCircle,
  ClipboardList,
  MessageSquare,
  Clock,
  BrainCircuit,
  Target,
  Trophy,
  Activity,
  Briefcase,
  CreditCard,
  BarChart4,
  Layers,
  FileText,
  UserPlus,
  CalendarDays,
  Sparkles,
  ScanFace
} from 'lucide-react';
import './DashboardLayout.css';
import GlobalCopilot from './GlobalCopilot';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const common = [
      { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' }
    ];

    switch (user?.role) {
      case ROLES.STUDENT:
        return [
          { path: '/student', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { path: '/student/performance', icon: <TrendingUp size={20} />, label: 'My Performance' },
          { path: '/student/insights', icon: <BrainCircuit size={20} />, label: 'AI Insights' },
          { path: '/student/action-plan', icon: <Target size={20} />, label: 'Action Plan' },
          { path: '/student/assignments', icon: <BookOpen size={20} />, label: 'Assignments' },
          { path: '/student/marks', icon: <BarChart3 size={20} />, label: 'Marks / Exams' },
          { path: '/student/attendance', icon: <CalendarCheck size={20} />, label: 'Attendance' },
          { path: '/student/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
          { path: '/student/skills', icon: <Activity size={20} />, label: 'Skill Tracker' },
          { path: '/student/placement', icon: <Briefcase size={20} />, label: 'Placement' },
          { path: '/student/fees', icon: <CreditCard size={20} />, label: 'Fees' },
          { path: '/student/alerts', icon: <AlertCircle size={20} />, label: 'Alerts' },
          { path: '/student/feedback', icon: <MessageSquare size={20} />, label: 'Feedback' },
          { path: '/student/schedule', icon: <Clock size={20} />, label: 'Schedule' },
          { path: '/student/assistant', icon: <Sparkles size={20} className="text-indigo" />, label: 'AI Doc Assistant' },
          { path: '/student/predictive', icon: <TrendingUp size={20} className="text-emerald-glow" />, label: 'Predictive AI Terminal' },
          { path: '/student/settings', icon: <Settings size={20} />, label: 'Settings' }
        ];
      case ROLES.TEACHER:
        return [
          { path: '/teacher', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { path: '/teacher/students', icon: <Users size={20} />, label: 'Students' },
          { path: '/teacher/attendance', icon: <CalendarCheck size={20} />, label: 'Attendance' },
          { path: '/teacher/assignments', icon: <BookOpen size={20} />, label: 'Assignments' },
          { path: '/teacher/marks', icon: <BarChart3 size={20} />, label: 'Marks' },
          { path: '/teacher/analytics', icon: <LineChart size={20} />, label: 'Analytics' },
          { path: '/teacher/alerts', icon: <AlertCircle size={20} />, label: 'Alerts' },
          { path: '/teacher/tasks', icon: <ClipboardList size={20} />, label: 'Tasks' },
          { path: '/teacher/feedback', icon: <MessageSquare size={20} />, label: 'Feedback' },
          { path: '/teacher/schedule', icon: <Clock size={20} />, label: 'Schedule' },
          { path: '/teacher/assistant', icon: <Sparkles size={20} className="text-indigo" />, label: 'AI Doc Assistant' },
          { path: '/teacher/predictive', icon: <TrendingUp size={20} className="text-emerald-glow" />, label: 'Predictive AI Terminal' },
          { path: '/teacher/classroom-intelligence', icon: <ScanFace size={20} className="text-emerald-glow" />, label: 'Classroom CV AI' },
          { path: '/teacher/settings', icon: <Settings size={20} />, label: 'Settings' },
        ];
      case ROLES.ADMIN:
        return [
          { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { path: '/admin/students', icon: <Users size={20} />, label: 'Students' },
          { path: '/admin/analytics', icon: <BarChart4 size={20} />, label: 'Analytics' },
          { path: '/admin/growth', icon: <TrendingUp size={20} />, label: 'University Growth' },
          { path: '/admin/departments', icon: <Layers size={20} />, label: 'Departments' },
          { path: '/admin/faculty', icon: <Briefcase size={20} />, label: 'Faculty' },
          { path: '/admin/placements', icon: <Target size={20} />, label: 'Placements' },
          { path: '/admin/alerts', icon: <AlertCircle size={20} />, label: 'Alerts' },
          { path: '/admin/fees', icon: <CreditCard size={20} />, label: 'Fees' },
          { path: '/admin/academics', icon: <BookOpen size={20} />, label: 'Academics' },
          { path: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' },
          { path: '/admin/feedback', icon: <MessageSquare size={20} />, label: 'Feedback' },
          { path: '/admin/users', icon: <UserPlus size={20} />, label: 'Users' },
          { path: '/admin/schedule', icon: <CalendarDays size={20} />, label: 'Schedule' },
          { path: '/admin/assistant', icon: <Sparkles size={20} className="text-indigo" />, label: 'AI Doc Assistant' },
          { path: '/admin/predictive', icon: <TrendingUp size={20} className="text-emerald-glow" />, label: 'Predictive AI Terminal' },
          { path: '/admin/classroom-intelligence', icon: <ScanFace size={20} className="text-emerald-glow" />, label: 'Classroom Command' },
          { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' }
        ];
      case ROLES.PARENT:
        return [
          { path: '/parent', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { path: '/parent/performance', icon: <TrendingUp size={20} />, label: 'Performance' },
          { path: '/parent/insights', icon: <BrainCircuit size={20} />, label: 'AI Insights' },
          { path: '/parent/alerts', icon: <AlertCircle size={20} />, label: 'Alerts' },
          { path: '/parent/fees', icon: <CreditCard size={20} />, label: 'Fees' },
          { path: '/parent/academics', icon: <BookOpen size={20} />, label: 'Academics' },
          { path: '/parent/comparison', icon: <Activity size={20} />, label: 'Comparison' },
          { path: '/parent/placement', icon: <Briefcase size={20} />, label: 'Placement' },
          { path: '/parent/activity', icon: <Target size={20} />, label: 'Activity' },
          { path: '/parent/communication', icon: <MessageSquare size={20} />, label: 'Communication' },
          { path: '/parent/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
          { path: '/parent/schedule', icon: <Clock size={20} />, label: 'Schedule' },
          { path: '/parent/assistant', icon: <Sparkles size={20} className="text-indigo" />, label: 'AI Doc Assistant' },
          { path: '/parent/predictive', icon: <TrendingUp size={20} className="text-emerald-glow" />, label: 'Predictive AI Terminal' },
          { path: '/parent/settings', icon: <Settings size={20} />, label: 'Settings' }
        ];
      default:
        return common;
    }
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div className="sidebar-brand">
          <TrendingUp className="text-blue" size={24} />
          <span>UniInsight</span>
        </div>

        <nav className="sidebar-nav">
          {getMenuItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-wrapper">
        <header className="navbar glass">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search students, performance, analytics..." />
          </div>

          <div className="navbar-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            <button className="icon-btn logout-header-btn" onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </button>

            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <img src={user?.avatar} alt="avatar" className="avatar" />
            </div>
          </div>
        </header>

        <section className="content-area">
          <Outlet />
        </section>
      </main>

      <GlobalCopilot />
    </div>
  );
};

export default DashboardLayout;
