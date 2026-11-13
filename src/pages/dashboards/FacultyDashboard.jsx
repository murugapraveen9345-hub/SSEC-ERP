import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, ClipboardCheck, BookOpen, Bell, ArrowRight, TrendingUp,
  Star, Brain, Sparkles, AlertTriangle, Calendar,
  ChevronRight
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Tooltip, Legend, PointElement, LineElement, Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { STUDENTS, ATTENDANCE_RECORDS } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, PointElement, LineElement, Filler);

export default function FacultyDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const lowAttendance = STUDENTS.filter(s => s.attendance < 75).length;
  const avgAttendance = Math.round(STUDENTS.reduce((a, s) => a + s.attendance, 0) / STUDENTS.length);
  const avgCGPA = (STUDENTS.reduce((a, s) => a + s.cgpa, 0) / STUDENTS.length).toFixed(1);

  const attendanceBarData = {
    labels: ATTENDANCE_RECORDS.map(r => r.subject.split(' ')[0]),
    datasets: [{
      label: 'Batch Average %',
      data: ATTENDANCE_RECORDS.map(r => r.percent.toFixed(0)),
      backgroundColor: ATTENDANCE_RECORDS.map(r => r.percent < 75 ? '#ef4444' : '#6366f1'),
      borderRadius: 8,
    }],
  };

  const chartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { family: 'Inter', size: 11 } },
      },
      y: {
        grid: { color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
        ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { family: 'Inter', size: 11 } },
        min: 60, max: 100,
      },
    },
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── HERO BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '28px 32px',
          background: isDark
            ? 'linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)'
            : 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 60%, #f0fdf4 100%)',
          border: isDark ? '1px solid rgba(14,165,233,0.3)' : '1px solid rgba(14,165,233,0.2)',
          boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.5)' : '0 12px 30px rgba(14,165,233,0.08)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 56, height: 56,
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '22px', fontWeight: 800,
                boxShadow: '0 8px 20px rgba(14,165,233,0.4)',
              }}
            >
              {user?.avatar || 'PL'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Welcome, {user?.name || 'Dr. Priya Lakshmi'} 👩‍🏫
                </h1>
                <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                  Faculty Portal
                </span>
              </div>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>
                {today} • {user?.designation || 'Associate Professor'} • {user?.department || 'Computer Science'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => navigate('/attendance')}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '12px', padding: '9px 16px', gap: 8, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
            >
              <ClipboardCheck size={16} /> Mark Live Attendance
            </button>
            <button
              onClick={() => navigate('/study-planner')}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '12px', padding: '9px 16px', gap: 8 }}
            >
              <Brain size={16} /> AI Study Assistant
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── STATS ROW ── */}
      <div className="dashboard-grid">
        {[
          { label: 'Assigned Students', value: '180', sub: 'CSE 3rd & 4th Year', icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.12)', path: '/students' },
          { label: 'Batch Avg Attendance', value: `${avgAttendance}%`, sub: 'Above university min', icon: ClipboardCheck, color: '#10b981', bg: 'rgba(16,185,129,0.12)', path: '/attendance' },
          { label: 'Class Avg CGPA', value: avgCGPA, sub: 'Top performing branch', icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', path: '/exams' },
          { label: 'At-Risk Students', value: lowAttendance, sub: 'Attendance < 75%', icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.12)', path: '/students' },
        ].map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => navigate(s.path)}
            className="glass-card"
            style={{ padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: '12px',
                  background: s.bg,
                  color: s.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <s.icon size={22} />
              </div>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>View</span>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 2 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                {s.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="dashboard-grid-2">
        {/* Attendance Distribution */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Course Attendance Breakdown
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                Mean percentage attendance by subject
              </p>
            </div>
            <button onClick={() => navigate('/attendance')} className="btn btn-ghost btn-sm" style={{ color: 'var(--brand-primary)', fontSize: 12 }}>
              Detailed Sheet <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ height: 220 }}>
            <Bar data={attendanceBarData} options={chartOpts} />
          </div>
        </div>

        {/* Attention Needed / Risk List */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                ⚠️ Critical Attendance Warnings
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                Students under 80% threshold requiring counseling
              </p>
            </div>
            <span className="badge badge-danger">{lowAttendance} At-Risk</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STUDENTS.filter(s => s.attendance < 80).map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg, #ef4444, #f59e0b)', fontSize: 11, fontWeight: 800 }}>
                  {s.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.id} • Sec {s.section} • CGPA {s.cgpa}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#ef4444' }}>{s.attendance}%</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Attendance</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STUDENTS ROSTER TABLE ── */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              👥 Enrolled Student Roster
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
              Academic standing, internal performance and contact details
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/students')}>
            View All Students <ArrowRight size={13} />
          </button>
        </div>

        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Registration No.</th>
                <th>Section</th>
                <th>Attendance</th>
                <th>CGPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.slice(0, 6).map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 11, fontWeight: 800 }}>
                        {s.avatar}
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{s.id}</td>
                  <td>Section {s.section}</td>
                  <td>
                    <span style={{ fontWeight: 800, color: s.attendance < 75 ? '#ef4444' : s.attendance >= 85 ? '#10b981' : '#f59e0b' }}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{s.cgpa}</td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
