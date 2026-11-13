import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { TenantProvider } from './context/TenantContext';
import { CampusDataProvider } from './context/CampusDataContext';

// Layout & Global Components
import Layout from './components/layout/Layout';
import ChatbotWidget from './components/chatbot/ChatbotWidget';

// Authentication & Landing
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

// ─── Essential Core Dashboards ──────────────────────────────────────────────
const Dashboard            = lazy(() => import('./pages/dashboards/Dashboard'));
const StudentDashboard     = lazy(() => import('./pages/dashboards/StudentDashboard'));
const FacultyDashboard     = lazy(() => import('./pages/dashboards/FacultyDashboard'));
const AdminDashboard       = lazy(() => import('./pages/dashboards/AdminDashboard'));

// ─── Essential Core ERP Modules ─────────────────────────────────────────────
const StudentManagement    = lazy(() => import('./pages/modules/StudentManagement'));
const FacultyManagement    = lazy(() => import('./pages/modules/FacultyManagement'));
const DepartmentManagement = lazy(() => import('./pages/modules/DepartmentManagement'));
const AttendanceManagement = lazy(() => import('./pages/modules/AttendanceManagement'));
const TimetableManagement  = lazy(() => import('./pages/modules/TimetableManagement'));
const ExaminationResults   = lazy(() => import('./pages/modules/ExaminationResults'));
const FeesPayment          = lazy(() => import('./pages/modules/FeesPayment'));
const LeaveODManagement    = lazy(() => import('./pages/modules/LeaveODManagement'));
const PlacementPortal      = lazy(() => import('./pages/modules/PlacementPortal'));
const EventsClubs          = lazy(() => import('./pages/modules/EventsClubs'));
const Notifications        = lazy(() => import('./pages/modules/Notifications'));
const ReportsAnalytics     = lazy(() => import('./pages/modules/ReportsAnalytics'));
const Settings             = lazy(() => import('./pages/modules/Settings'));

// ─── AI Intelligence Suite ──────────────────────────────────────────────────
const AiStudyPlanner       = lazy(() => import('./pages/modules/AiStudyPlanner'));

// ─── Loading Skeleton ────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ height: 32, width: 240, borderRadius: 8, background: 'var(--bg-tertiary)', marginBottom: '0.75rem', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ height: 16, width: 360, borderRadius: 6, background: 'var(--bg-tertiary)', marginBottom: '2rem', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: 88, borderRadius: 12, background: 'var(--bg-tertiary)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div style={{ height: 320, borderRadius: 12, background: 'var(--bg-tertiary)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
      <ChatbotWidget />
    </Layout>
  );
}

// Public Route Guard
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <TenantProvider>
        <ThemeProvider>
          <AuthProvider>
            <CampusDataProvider>
              <ChatbotProvider>
                <Routes>
                  {/* Public Auth Route */}
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                  {/* Core Dashboards */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                  {/* ERP Core Modules */}
                  <Route path="/students"      element={<ProtectedRoute><StudentManagement /></ProtectedRoute>} />
                  <Route path="/faculty"       element={<ProtectedRoute><FacultyManagement /></ProtectedRoute>} />
                  <Route path="/departments"   element={<ProtectedRoute><DepartmentManagement /></ProtectedRoute>} />
                  <Route path="/attendance"    element={<ProtectedRoute><AttendanceManagement /></ProtectedRoute>} />
                  <Route path="/timetable"     element={<ProtectedRoute><TimetableManagement /></ProtectedRoute>} />
                  <Route path="/exams"         element={<ProtectedRoute><ExaminationResults /></ProtectedRoute>} />
                  <Route path="/fees"          element={<ProtectedRoute><FeesPayment /></ProtectedRoute>} />
                  <Route path="/leave"         element={<ProtectedRoute><LeaveODManagement /></ProtectedRoute>} />
                  <Route path="/placement"     element={<ProtectedRoute><PlacementPortal /></ProtectedRoute>} />
                  <Route path="/events"        element={<ProtectedRoute><EventsClubs /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                  <Route path="/reports"       element={<ProtectedRoute><ReportsAnalytics /></ProtectedRoute>} />
                  <Route path="/settings"      element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                  {/* AI Intelligence Lab */}
                  <Route path="/study-planner" element={<ProtectedRoute><AiStudyPlanner /></ProtectedRoute>} />

                  {/* Landing Page as primary root */}
                  <Route path="/"        element={<LandingPage />} />
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="*"        element={<Navigate to="/" replace />} />
                </Routes>
              </ChatbotProvider>
            </CampusDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </TenantProvider>
    </BrowserRouter>
  );
}
