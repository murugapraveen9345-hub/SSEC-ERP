import React, { useState } from 'react';
import {
  Settings as SettingsIcon, User, Moon, Sun, Bell,
  Shield, Key, Save, CheckCircle, Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [passwordState, setPasswordState] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '850px', margin: '0 auto' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>System & Account Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
          Manage your account profile, visual appearance theme, and notification preferences.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} style={{ color: 'var(--brand-primary)' }} />
          Profile Information
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-primary), #8b5cf6)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
            }}
          >
            {user?.avatar || 'U'}
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{user?.name || 'User Name'}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {user?.email} • <span style={{ textTransform: 'uppercase', fontWeight: 700, color: 'var(--brand-primary)' }}>{user?.role}</span>
            </div>
            {user?.regNo && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Reg No: {user.regNo} ({user.department} - {user.year})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theme & Display */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {theme === 'dark' ? <Moon size={18} style={{ color: '#8b5cf6' }} /> : <Sun size={18} style={{ color: '#f59e0b' }} />}
          Appearance & Theme
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600 }}>Color Mode</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Currently using <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: 'var(--bg-page)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} style={{ color: '#10b981' }} />
          Notification Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Push Notifications</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Receive real-time alerts for attendance, exam hall tickets, and fee dues
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Email Announcements</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Weekly digest of placement drives, campus events, and grade sheets
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600 }}>SMS Urgent Alerts</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Emergency campus notifications and fee deadlines
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
            />
          </label>
        </div>
      </div>

      {/* Security & Password */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} style={{ color: '#ef4444' }} />
          Security & Password
        </h3>

        <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Current Password
              </label>
              <input
                type="password"
                value={passwordState.current}
                onChange={(e) => setPasswordState({ ...passwordState, current: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-page)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                New Password
              </label>
              <input
                type="password"
                value={passwordState.newPass}
                onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-page)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem', borderRadius: '8px' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {savedSuccess && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--bg-card)',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 9999,
          }}
        >
          <CheckCircle size={20} style={{ color: '#10b981' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Settings Updated!</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your preferences have been saved successfully.</div>
          </div>
        </div>
      )}
    </div>
  );
}
