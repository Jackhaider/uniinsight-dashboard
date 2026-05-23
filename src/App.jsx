import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Teacher Imports
import TeacherOverview from './pages/teacher/TeacherOverview';
import StudentManagement from './pages/teacher/StudentManagement';
import AttendanceManagement from './pages/teacher/AttendanceManagement';
import AssignmentManagement from './pages/teacher/AssignmentManagement';
import MarksManagement from './pages/teacher/MarksManagement';
import PerformanceAnalytics from './pages/teacher/PerformanceAnalytics';
import AlertsAndRisk from './pages/teacher/AlertsAndRisk';
import TaskManagement from './pages/teacher/TaskManagement';
import FeedbackSystem from './pages/teacher/FeedbackSystem';
import ScheduleManagement from './pages/teacher/ScheduleManagement';
import TeacherSettings from './pages/teacher/TeacherSettings';
import ClassroomIntelligence from './pages/teacher/ClassroomIntelligence';

// Student Imports
import StudentOverview from './pages/student/StudentOverview';
import MyPerformance from './pages/student/MyPerformance';
import AIInsights from './pages/student/AIInsights';
import ActionPlan from './pages/student/ActionPlan';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentMarks from './pages/student/StudentMarks';
import StudentAttendance from './pages/student/StudentAttendance';
import Leaderboard from './pages/student/Leaderboard';
import SkillTracker from './pages/student/SkillTracker';
import PlacementTracker from './pages/student/PlacementTracker';
import FeesManagement from './pages/student/FeesManagement';
import StudentAlerts from './pages/student/StudentAlerts';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentSettings from './pages/student/StudentSettings';

// Parent Imports
import ParentOverview from './pages/parent/ParentOverview';
import ParentPerformance from './pages/parent/ParentPerformance';
import ParentAIInsights from './pages/parent/ParentAIInsights';
import ParentAlerts from './pages/parent/ParentAlerts';
import ParentFees from './pages/parent/ParentFees';
import ParentAcademics from './pages/parent/ParentAcademics';
import ParentComparison from './pages/parent/ParentComparison';
import ParentPlacement from './pages/parent/ParentPlacement';
import ParentActivity from './pages/parent/ParentActivity';
import ParentCommunication from './pages/parent/ParentCommunication';
import ParentReports from './pages/parent/ParentReports';
import ParentSchedule from './pages/parent/ParentSchedule';
import ParentSettings from './pages/parent/ParentSettings';

// Admin Imports
import AdminOverview from './pages/admin/AdminOverview';
import AdminStudents from './pages/admin/AdminStudents';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminGrowth from './pages/admin/AdminGrowth';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminPlacements from './pages/admin/AdminPlacements';
import AdminAlerts from './pages/admin/AdminAlerts';
import AdminFees from './pages/admin/AdminFees';
import AdminAcademics from './pages/admin/AdminAcademics';
import AdminReports from './pages/admin/AdminReports';
import AdminFeedback from './pages/admin/AdminFeedback';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSchedule from './pages/admin/AdminSchedule';
import AdminSettings from './pages/admin/AdminSettings';
import RagAssistant from './pages/RagAssistant';
import PredictiveAnalytics from './pages/PredictiveAnalytics';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case ROLES.STUDENT: return <Navigate to="/student" replace />;
    case ROLES.TEACHER: return <Navigate to="/teacher" replace />;
    case ROLES.ADMIN: return <Navigate to="/admin" replace />;
    case ROLES.PARENT: return <Navigate to="/parent" replace />;
    default: return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardRedirect />} />
            
            <Route path="student" element={
              <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                <StudentDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<StudentOverview />} />
              <Route path="performance" element={<MyPerformance />} />
              <Route path="insights" element={<AIInsights />} />
              <Route path="action-plan" element={<ActionPlan />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="marks" element={<StudentMarks />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="skills" element={<SkillTracker />} />
              <Route path="placement" element={<PlacementTracker />} />
              <Route path="fees" element={<FeesManagement />} />
              <Route path="alerts" element={<StudentAlerts />} />
              <Route path="feedback" element={<StudentFeedback />} />
              <Route path="schedule" element={<StudentSchedule />} />
              <Route path="assistant" element={<RagAssistant />} />
              <Route path="predictive" element={<PredictiveAnalytics />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>
            
            <Route path="teacher" element={
              <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<TeacherOverview />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="assignments" element={<AssignmentManagement />} />
              <Route path="marks" element={<MarksManagement />} />
              <Route path="analytics" element={<PerformanceAnalytics />} />
              <Route path="alerts" element={<AlertsAndRisk />} />
              <Route path="tasks" element={<TaskManagement />} />
              <Route path="feedback" element={<FeedbackSystem />} />
              <Route path="schedule" element={<ScheduleManagement />} />
              <Route path="assistant" element={<RagAssistant />} />
              <Route path="predictive" element={<PredictiveAnalytics />} />
              <Route path="classroom-intelligence" element={<ClassroomIntelligence />} />
              <Route path="settings" element={<TeacherSettings />} />
            </Route>
            
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<AdminOverview />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="growth" element={<AdminGrowth />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="placements" element={<AdminPlacements />} />
              <Route path="alerts" element={<AdminAlerts />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="academics" element={<AdminAcademics />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="schedule" element={<AdminSchedule />} />
              <Route path="assistant" element={<RagAssistant />} />
              <Route path="predictive" element={<PredictiveAnalytics />} />
              <Route path="classroom-intelligence" element={<ClassroomIntelligence />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="parent" element={
              <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
                <ParentDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<ParentOverview />} />
              <Route path="performance" element={<ParentPerformance />} />
              <Route path="insights" element={<ParentAIInsights />} />
              <Route path="alerts" element={<ParentAlerts />} />
              <Route path="fees" element={<ParentFees />} />
              <Route path="academics" element={<ParentAcademics />} />
              <Route path="comparison" element={<ParentComparison />} />
              <Route path="placement" element={<ParentPlacement />} />
              <Route path="activity" element={<ParentActivity />} />
              <Route path="communication" element={<ParentCommunication />} />
              <Route path="reports" element={<ParentReports />} />
              <Route path="schedule" element={<ParentSchedule />} />
              <Route path="assistant" element={<RagAssistant />} />
              <Route path="predictive" element={<PredictiveAnalytics />} />
              <Route path="settings" element={<ParentSettings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
