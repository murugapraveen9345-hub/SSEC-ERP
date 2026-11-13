import React, { useState } from 'react';
import {
  CheckCircle, XCircle, Clock, AlertTriangle, Download,
  Fingerprint, Camera, ShieldCheck, Cpu, Send, RefreshCw
} from 'lucide-react';
import { ATTENDANCE_RECORDS, STUDENTS } from '../../data/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function generateWeekAttendance() {
  return DAYS.reduce((acc, day) => {
    acc[day] = day === 'Sat' || day === 'Sun' ? null : Math.random() > 0.18 ? 'P' : Math.random() > 0.5 ? 'A' : 'OD';
    return acc;
  }, {});
}

export default function AttendanceManagement() {
  const [view, setView] = useState('overview');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [markStatus, setMarkStatus] = useState({});
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [alertSent, setAlertSent] = useState(false);

  const weeklyData = STUDENTS.slice(0, 6).map((s) => ({ ...s, week: generateWeekAttendance() }));

  const handleMark = (id, status) => setMarkStatus((prev) => ({ ...prev, [id]: status }));

  const handleSimulateScan = (type) => {
    setBiometricScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setBiometricScanning(false);
      setScanResult({
        type,
        student: 'Arjun Sharma (CS2022001)',
        time: new Date().toLocaleTimeString(),
        confidence: type === 'face' ? '99.4% Liveness Match' : 'Biometric Hash Verified',
        room: 'CS-Lab 1 (Door Gateway #04)',
      });
    }, 1500);
  };

  const handleSendSmartAlerts = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Attendance Management</h1>
          <p className="page-subtitle" style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Biometric & Facial AI Check-in · Automated Parent Alerts · Real-Time Analytics
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSendSmartAlerts}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <Send size={14} /> Send Low-Attendance Warnings
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {alertSent && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '10px',
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
          <div>
            <strong style={{ color: '#f59e0b' }}>Automated Smart Alerts Dispatched!</strong>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              SMS and portal notices delivered to guardians of 436 students with attendance &lt; 75%.
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="dashboard-grid" style={{ marginBottom: 10 }}>
        {[
          { label: 'Overall Avg', value: '82%', color: '#6366f1', icon: '📊' },
          { label: 'Above 85%', value: 3240, color: '#10b981', icon: '✅' },
          { label: '75-85%', value: 1180, color: '#f59e0b', icon: '⚠️' },
          { label: 'Below 75%', value: 436, color: '#ef4444', icon: '🚨' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 10, width: 'fit-content' }}>
        {[
          { key: 'overview', label: '📊 Overview' },
          { key: 'mark', label: '✅ Mark Attendance' },
          { key: 'biometric', label: '📷 Biometric & Face Check-in' },
          { key: 'weekly', label: '📅 Weekly View' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab ${view === tab.key ? 'active' : ''}`}
            onClick={() => setView(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {view === 'overview' && (
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <span className="card-title" style={{ fontSize: '1.15rem', fontWeight: 700 }}>Subject-wise Attendance Rates</span>
            </div>
            {ATTENDANCE_RECORDS.map((rec) => (
              <div key={rec.subject} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{rec.subject}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: 12, marginLeft: 12 }}>{rec.faculty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{rec.present}/{rec.total} classes</span>
                    <span style={{ fontWeight: 800, fontSize: 14, color: rec.percent < 75 ? '#ef4444' : rec.percent >= 85 ? '#10b981' : '#f59e0b' }}>
                      {rec.percent}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '100%', height: 6, background: 'var(--bg-page)', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${rec.percent}%`,
                      height: '100%',
                      background: rec.percent < 75 ? '#ef4444' : rec.percent >= 85 ? '#10b981' : '#f59e0b',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mark Attendance Tab */}
      {view === 'mark' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Roll Call: CSE 3rd Year - Section A</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
              style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STUDENTS.map((s) => {
              const currentStatus = markStatus[s.id] || 'P';
              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 700 }}>
                      {s.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.id}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    {['P', 'A', 'OD'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleMark(s.id, st)}
                        className="btn btn-sm"
                        style={{
                          padding: '4px 12px',
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 6,
                          background:
                            currentStatus === st
                              ? st === 'P'
                                ? '#10b981'
                                : st === 'A'
                                ? '#ef4444'
                                : '#f59e0b'
                              : 'transparent',
                          color: currentStatus === st ? '#fff' : 'var(--text-secondary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                        }}
                      >
                        {st === 'P' ? 'Present' : st === 'A' ? 'Absent' : 'On-Duty'}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BIOMETRIC & FACE RECOGNITION TAB */}
      {view === 'biometric' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Biometric Scanner Card */}
          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Fingerprint size={28} style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Biometric Fingerprint Gate</h3>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>● Device Gateway Online</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Integrates with ZKTeco and Suprema IoT hardware readers. Synchronizes millisecond fingerprint check-ins to cloud database.
              </p>
            </div>

            <button
              onClick={() => handleSimulateScan('biometric')}
              disabled={biometricScanning}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {biometricScanning ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Reading Sensor...
                </>
              ) : (
                <>
                  <Fingerprint size={18} /> Simulate Fingerprint Scan
                </>
              )}
            </button>
          </div>

          {/* Facial AI Scanner Card */}
          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Camera size={28} style={{ color: '#0ea5e9' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>AI Facial Recognition Gate</h3>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>● Neural Vision Active</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Real-time optical face recognition with infrared anti-spoofing and liveness check. Supports walk-through corridor scanning.
              </p>
            </div>

            <button
              onClick={() => handleSimulateScan('face')}
              disabled={biometricScanning}
              className="btn"
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                background: '#0ea5e9',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              {biometricScanning ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Recognizing Face...
                </>
              ) : (
                <>
                  <Camera size={18} /> Simulate Face Verification
                </>
              )}
            </button>
          </div>

          {/* Scan result banner */}
          {scanResult && (
            <div
              className="glass-card"
              style={{
                gridColumn: '1 / -1',
                padding: '1.5rem',
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ShieldCheck size={36} style={{ color: '#10b981' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#10b981' }}>
                    Access Authorized: Attendance Marked Present!
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                    <strong>{scanResult.student}</strong> at {scanResult.time} ({scanResult.room})
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', background: '#10b981', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '20px', fontWeight: 700 }}>
                {scanResult.confidence}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Weekly View tab */}
      {view === 'weekly' && (
        <div className="table-container glass-card" style={{ overflowX: 'auto', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Student</th>
                {DAYS.map((d) => (
                  <th key={d} style={{ padding: '1rem', textAlign: 'center' }}>{d}</th>
                ))}
                <th style={{ padding: '1rem', textAlign: 'center' }}>Week %</th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((s) => {
                const days = Object.values(s.week).filter(Boolean);
                const present = days.filter((d) => d === 'P' || d === 'OD').length;
                const pct = Math.round((present / days.length) * 100);
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                          {s.avatar}
                        </div>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                      </div>
                    </td>
                    {DAYS.map((day) => (
                      <td key={day} style={{ textAlign: 'center', padding: '1rem' }}>
                        {s.week[day] === null ? (
                          <span style={{ color: 'var(--text-secondary)' }}>—</span>
                        ) : s.week[day] === 'P' ? (
                          <CheckCircle size={16} color="#10b981" />
                        ) : s.week[day] === 'OD' ? (
                          <span style={{ fontSize: 10, background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>OD</span>
                        ) : (
                          <XCircle size={16} color="#ef4444" />
                        )}
                      </td>
                    ))}
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 800, color: pct < 75 ? '#ef4444' : pct >= 85 ? '#10b981' : '#f59e0b' }}>
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
