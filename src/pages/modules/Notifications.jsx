import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, CheckCheck, Trash2, AlertTriangle, Info,
  AlertCircle, CheckCircle2, ArrowRight, Filter
} from 'lucide-react';
import { NOTIFICATIONS } from '../../data/mockData';

const TYPE_ICONS = {
  warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  info: { icon: Info, color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)' },
  danger: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  success: { icon: CheckCircle2, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'important'

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((item) => {
    if (filter === 'unread') return !item.read;
    if (filter === 'important') return item.type === 'danger' || item.type === 'warning';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Notification Center</h1>
            {unreadCount > 0 && (
              <span
                style={{
                  background: 'var(--brand-primary)',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Stay updated with academic notices, exam alerts, deadlines, and university announcements.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[
          { key: 'all', label: `All (${notifications.length})` },
          { key: 'unread', label: `Unread (${unreadCount})` },
          { key: 'important', label: 'Important Alerts' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === tab.key ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)',
              background: filter === tab.key ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
              color: filter === tab.key ? 'var(--brand-primary)' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Bell size={40} style={{ color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem' }}>No notifications to display</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
              You're all caught up! When you have new alerts, they will appear here.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const typeConfig = TYPE_ICONS[item.type] || TYPE_ICONS.info;
            const Icon = typeConfig.icon;

            return (
              <div
                key={item.id}
                className="glass-card"
                onClick={() => markAsRead(item.id)}
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  borderLeft: !item.read ? `4px solid ${typeConfig.color}` : '1px solid var(--border-color)',
                  background: !item.read ? 'rgba(99,102,241,0.03)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: typeConfig.bg,
                    color: typeConfig.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: !item.read ? 700 : 600, margin: 0, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.message}
                  </p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.6,
                  }}
                  title="Dismiss notification"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
