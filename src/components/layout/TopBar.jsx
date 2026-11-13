import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu, ChevronDown, LogOut, Building2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ROLES, NOTIFICATIONS, DEMO_USERS } from '../../data/mockData';

const ROLE_LABELS = {
  [ROLES.STUDENT]: { label: 'Student', color: '#6366f1', glow: 'rgba(99,102,241,0.25)' },
  [ROLES.FACULTY]: { label: 'Faculty', color: '#0ea5e9', glow: 'rgba(14,165,233,0.25)' },
  [ROLES.ADMIN]: { label: 'Admin', color: '#10b981', glow: 'rgba(16,185,129,0.25)' },
};

export default function TopBar({ collapsed, onMenuClick }) {
  const { user, logout, switchRole } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCampus, setActiveCampus] = useState('Main Campus (Chennai)');

  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).length;
  const roleInfo = ROLE_LABELS[user?.role] || ROLE_LABELS[ROLES.STUDENT];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`topbar ${collapsed ? 'sidebar-collapsed' : ''}`}
      role="banner"
    >
      {/* Mobile menu button */}
      <button
        className="btn btn-ghost btn-icon mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        id="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Search Bar */}
      <div className="topbar-search">
        <Search size={15} className="search-icon" />
        <input
          className="input"
          placeholder="Search students, courses, AI modules, timetable..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Global search"
          id="global-search"
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        {/* Quick 1-Click Role Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '2px',
            gap: 2,
          }}
          title="Quick 1-Click Role Switcher"
        >
          {[
            { role: ROLES.ADMIN, label: 'Admin', icon: '👨‍💼', color: '#10b981' },
            { role: ROLES.FACULTY, label: 'Faculty', icon: '👨‍🏫', color: '#0ea5e9' },
            { role: ROLES.STUDENT, label: 'Student', icon: '🎓', color: '#6366f1' },
          ].map((r) => {
            const isActive = user?.role === r.role;
            return (
              <button
                key={r.role}
                onClick={() => { switchRole(r.role); navigate('/dashboard'); }}
                style={{
                  border: 'none',
                  background: isActive ? r.color : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: 11.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{r.icon}</span> {r.label}
              </button>
            );
          })}
        </div>

        {/* Multi-Campus Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '4px 10px',
            backdropFilter: 'blur(10px)',
          }}
          title="Active University Campus"
        >
          <Building2 size={14} style={{ color: 'var(--brand-primary)' }} />
          <select
            value={activeCampus}
            onChange={(e) => setActiveCampus(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: 12,
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Main Campus (Chennai)">Main Campus (Chennai)</option>
            <option value="North Campus (Bengaluru)">North Campus (Bengaluru)</option>
            <option value="Tech Park Campus (Hyderabad)">Tech Park Campus (Hyderabad)</option>
          </select>
        </div>

        {/* Role switcher (for demo) */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{
              gap: 8,
              borderColor: roleInfo.color + '40',
              color: roleInfo.color,
              background: roleInfo.color + '15',
              boxShadow: `0 2px 8px ${roleInfo.glow}`,
              fontWeight: 700,
              borderRadius: '10px',
            }}
            onClick={() => { setShowUser(!showUser); setShowNotifs(false); }}
            aria-label="Switch role"
            id="role-switcher"
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: roleInfo.color, display: 'inline-block', boxShadow: `0 0 6px ${roleInfo.color}` }} />
            {roleInfo.label}
            <ChevronDown size={12} />
          </button>

          {showUser && (
            <div
              style={{
                position: 'absolute', top: '115%', right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                width: 240,
                zIndex: 'var(--z-dropdown)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                animation: 'slideUp 180ms ease-out',
              }}
            >
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Switch Demo Account
                </div>
              </div>
              {DEMO_USERS.map((u) => {
                const r = ROLE_LABELS[u.role] || ROLE_LABELS[ROLES.STUDENT];
                const isActive = user?.role === u.role;
                return (
                  <button
                    key={u.role}
                    onClick={() => { switchRole(u.role); setShowUser(false); navigate('/dashboard'); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      width: '100%', padding: '10px 14px',
                      background: isActive ? `${r.color}15` : 'transparent',
                      border: 'none', cursor: 'pointer',
                      color: isActive ? r.color : 'var(--text-secondary)',
                      fontSize: 13, fontWeight: isActive ? 700 : 500,
                      textAlign: 'left', transition: 'all 150ms',
                    }}
                    className="topbar-role-option"
                  >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0, boxShadow: isActive ? `0 0 6px ${r.color}` : 'none' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }} className="truncate">{u.name}</div>
                    </div>
                    {isActive && <Sparkles size={12} style={{ color: r.color }} />}
                  </button>
                );
              })}
              <div style={{ borderTop: '1px solid var(--border-subtle)', padding: 8, background: 'var(--bg-tertiary)' }}>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm btn-full"
                  style={{ justifyContent: 'flex-start', gap: 8, color: 'var(--brand-danger)', fontWeight: 600 }}
                >
                  <LogOut size={14} /> Log out of session
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-btn"
            onClick={() => { setShowNotifs(!showNotifs); setShowUser(false); }}
            aria-label={`${unreadNotifs} unread notifications`}
            id="notifications-btn"
            style={{ borderRadius: '10px' }}
          >
            <Bell size={18} />
            {unreadNotifs > 0 && (
              <span className="notif-dot" style={{ width: 16, height: 16, fontSize: 9 }}>{unreadNotifs}</span>
            )}
          </button>

          {showNotifs && (
            <div
              style={{
                position: 'absolute', top: '115%', right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-2xl)',
                width: 360,
                zIndex: 'var(--z-dropdown)',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                animation: 'slideUp 180ms ease-out',
              }}
            >
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-tertiary)' }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>Live Campus Alerts</div>
                <span className="badge badge-danger">{unreadNotifs} New</span>
              </div>
              <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                {NOTIFICATIONS.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      background: n.read ? 'transparent' : 'rgba(99,102,241,0.06)',
                      display: 'flex', gap: 12, cursor: 'pointer',
                      transition: 'background 150ms',
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>{n.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.message}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{n.time}</div>
                    </div>
                    {!n.read && <span className="dot dot-info" style={{ marginTop: 6 }} />}
                  </div>
                ))}
              </div>
              <div style={{ padding: 10, borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)' }}>
                <button
                  onClick={() => { navigate('/notifications'); setShowNotifs(false); }}
                  className="btn btn-ghost btn-sm btn-full"
                  style={{ fontSize: 12, fontWeight: 600 }}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          className="topbar-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          id="theme-toggle"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            borderRadius: '10px',
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            color: isDark ? '#fbbf24' : '#6366f1',
          }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User avatar */}
        <div
          className="avatar avatar-sm"
          style={{
            background: `linear-gradient(135deg, ${roleInfo.color}, #8b5cf6)`,
            boxShadow: `0 2px 10px ${roleInfo.glow}`,
            cursor: 'pointer', fontSize: 12, fontWeight: 800,
          }}
          title={user?.name}
          onClick={() => navigate('/settings')}
        >
          {user?.avatar || user?.name?.[0] || 'U'}
        </div>
      </div>
    </header>
  );
}
