import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, ClipboardCheck, Calendar,
  CreditCard, PartyPopper, Plane, Briefcase, Bell,
  Settings, LogOut, ChevronLeft, ChevronRight, Building2,
  BookOpen, BarChart3, Brain
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/mockData';

const NAV_CONFIG = {
  [ROLES.STUDENT]: [
    { label: 'Overview', items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/notifications', icon: Bell, label: 'Notifications', badge: 3 },
    ]},
    { label: 'Academics', items: [
      { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
      { path: '/timetable', icon: Calendar, label: 'Timetable' },
      { path: '/exams', icon: BookOpen, label: 'Exams & Results' },
    ]},
    { label: '🧠 AI Intelligence', items: [
      { path: '/study-planner', icon: Brain, label: 'AI Study Planner' },
    ]},
    { label: 'Campus Services', items: [
      { path: '/fees', icon: CreditCard, label: 'Fees & Payment' },
      { path: '/leave', icon: Plane, label: 'Leave & OD' },
      { path: '/placement', icon: Briefcase, label: 'Placement Hub' },
      { path: '/events', icon: PartyPopper, label: 'Events & Clubs' },
    ]},
  ],
  [ROLES.FACULTY]: [
    { label: 'Overview', items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/notifications', icon: Bell, label: 'Notifications', badge: 2 },
    ]},
    { label: 'Teaching & Students', items: [
      { path: '/students', icon: GraduationCap, label: 'My Students' },
      { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
      { path: '/timetable', icon: Calendar, label: 'Timetable' },
      { path: '/exams', icon: BookOpen, label: 'Exams & Marks' },
    ]},
    { label: '🧠 AI Intelligence', items: [
      { path: '/study-planner', icon: Brain, label: 'AI Study Planner' },
    ]},
    { label: 'Management', items: [
      { path: '/leave', icon: Plane, label: 'Leave Requests' },
      { path: '/events', icon: PartyPopper, label: 'Events & Clubs' },
    ]},
  ],
  [ROLES.ADMIN]: [
    { label: 'Overview', items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/notifications', icon: Bell, label: 'Notifications', badge: 5 },
    ]},
    { label: 'Academic Directory', items: [
      { path: '/students', icon: GraduationCap, label: 'Students' },
      { path: '/faculty', icon: Users, label: 'Faculty' },
      { path: '/departments', icon: Building2, label: 'Departments' },
    ]},
    { label: 'Academic Operations', items: [
      { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
      { path: '/timetable', icon: Calendar, label: 'Timetable' },
      { path: '/exams', icon: BookOpen, label: 'Examinations' },
    ]},
    { label: '🧠 AI Intelligence', items: [
      { path: '/study-planner', icon: Brain, label: 'AI Study Planner' },
    ]},
    { label: 'Administration', items: [
      { path: '/fees', icon: CreditCard, label: 'Fees & Finance' },
      { path: '/leave', icon: Plane, label: 'Leave Management' },
      { path: '/placement', icon: Briefcase, label: 'Placement Cell' },
      { path: '/events', icon: PartyPopper, label: 'Events & Clubs' },
    ]},
    { label: 'System', items: [
      { path: '/reports', icon: BarChart3, label: 'Reports & Analytics' },
      { path: '/settings', icon: Settings, label: 'Settings' },
    ]},
  ],
};

const ROLE_COLORS = {
  [ROLES.STUDENT]: '#6366f1',
  [ROLES.FACULTY]: '#0ea5e9',
  [ROLES.ADMIN]: '#10b981',
};

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navConfig = NAV_CONFIG[user?.role] || NAV_CONFIG[ROLES.STUDENT];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarClass = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  const roleColor = ROLE_COLORS[user?.role] || '#6366f1';

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 'var(--z-sidebar)',
            backdropFilter: 'blur(6px)',
          }}
        />
      )}

      <aside className={sidebarClass} role="navigation" aria-label="Main navigation">
        {/* Logo Header */}
        <div className="sidebar-logo">
          <div
            className="sidebar-logo-icon"
            style={{
              background: `linear-gradient(135deg, ${roleColor}, #8b5cf6)`,
              boxShadow: `0 4px 14px ${roleColor}40`,
            }}
          >
            U
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div className="sidebar-logo-text">UniCore ERP</div>
              <div style={{ fontSize: 10, color: roleColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {user?.role ? `${user.role} workspace` : 'Enterprise'}
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="btn btn-ghost btn-icon-sm"
            style={{ marginLeft: 'auto', flexShrink: 0, borderRadius: '8px' }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="ERP modules">
          {navConfig.map((section) => (
            <div key={section.label} style={{ marginBottom: 12 }}>
              {!collapsed && (
                <div className="nav-section-label">{section.label}</div>
              )}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  title={collapsed ? item.label : undefined}
                  onClick={onMobileClose}
                  aria-label={item.label}
                >
                  <item.icon size={18} className="nav-item-icon" />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1, fontWeight: 600 }}>{item.label}</span>
                      {item.badge && (
                        <span className="nav-item-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="nav-item-badge" style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, padding: 0, borderRadius: '50%' }} />
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User profile footer */}
        <div className="sidebar-user">
          <div
            className="avatar avatar-sm"
            style={{
              background: `linear-gradient(135deg, ${roleColor}, #8b5cf6)`,
              boxShadow: `0 2px 8px ${roleColor}30`,
              fontWeight: 800,
            }}
          >
            {user?.avatar || user?.name?.[0] || 'U'}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }} className="truncate">
                {user?.email || 'user@unicore.edu'}
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-icon-sm"
              title="Logout"
              aria-label="Logout"
              style={{ color: 'var(--brand-danger)' }}
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
