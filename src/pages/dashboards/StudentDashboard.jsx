import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, CheckCircle,
  BookOpen, ClipboardCheck, CreditCard, Briefcase,
  Calendar, Bell, ArrowRight, Award, Clock, Sparkles,
  Zap, Brain, ChevronRight, PartyPopper, Plane
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  STUDENT_STATS, ATTENDANCE_RECORDS, UPCOMING_EXAMS,
  EXAM_RESULTS, ATTENDANCE_CHART_DATA
} from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function StudentDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const attendanceColor = STUDENT_STATS.attendance >= 85 ? '#10b981' : STUDENT_STATS.attendance >= 75 ? '#f59e0b' : '#ef4444';

  const chartOptions = {
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
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: 'Inter', weight: 'bold', size: 12 },
        bodyFont: { family: 'Inter', size: 12 },
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
      },
    },
  };

  const attendanceDoughnut = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [STUDENT_STATS.attendance, 100 - STUDENT_STATS.attendance],
      backgroundColor: [attendanceColor, isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'],
      borderWidth: 0,
      hoverOffset: 4,
      cutout: '75%',
    }],
  };

  const attendanceLine = {
    labels: ATTENDANCE_CHART_DATA.labels,
    datasets: [{
      label: 'Attendance %',
      data: ATTENDANCE_CHART_DATA.overall,
      borderColor: '#6366f1',
      backgroundColor: isDark ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
    }],
  };

  const marksBar = {
    labels: EXAM_RESULTS.map(r => r.subject.split(' ')[0]),
    datasets: [{
      label: 'Score %',
      data: EXAM_RESULTS.map(r => Math.round((r.total / r.max) * 100)),
      backgroundColor: EXAM_RESULTS.map(r => {
        const pct = r.total / r.max;
        return pct >= 0.8 ? '#10b981' : pct >= 0.65 ? '#6366f1' : '#f59e0b';
      }),
      borderRadius: 8,
    }],
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Morning';
    if (hr < 17) return 'Afternoon';
    return 'Evening';
  };

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── HERO GREETING BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '28px 32px',
          background: isDark
            ? 'linear-gradient(135deg, rgba(30,27,75,0.85) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)'
            : 'linear-gradient(135deg, #eef2ff 0%, #ffffff 60%, #f0fdf4 100%)',
          border: isDark ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(99,102,241,0.2)',
          boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 12px 30px rgba(99,102,241,0.08)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 56, height: 56,
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '22px', fontWeight: 800,
                boxShadow: '0 8px 20px rgba(99,102,241,0.4)',
              }}
            >
              {user?.avatar || 'AS'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
                  Good {getGreeting()}, {user?.name?.split(' ')[0]}! ✨
                </h1>
                <span className="badge badge-success" style={{ fontWeight: 700, fontSize: 11 }}>
                  Semester 5 · Active
                </span>
              </div>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{today}</span>
                <span>•</span>
                <span>{user?.department || 'Computer Science & Engineering'}</span>
                <span>•</span>
                <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>Reg: {user?.regNo || 'CS2022001'}</span>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/study-planner')}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '12px', padding: '9px 16px', gap: 8 }}
            >
              <Brain size={15} /> AI Study Planner
            </button>
            <button
              onClick={() => navigate('/timetable')}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '12px', padding: '9px 16px', gap: 8 }}
            >
              <Calendar size={15} /> Timetable
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 4 KPI STAT CARDS ── */}
      <div className="dashboard-grid">
        {[
          {
            label: 'Overall Attendance',
            value: `${STUDENT_STATS.attendance}%`,
            subtext: STUDENT_STATS.attendance >= 75 ? 'Safe Above 75% limit' : 'Warning: Below limit',
            icon: ClipboardCheck,
            color: attendanceColor,
            bg: `${attendanceColor}15`,
            trend: STUDENT_STATS.attendance >= 75 ? '+2.4% vs last mo' : '-1.5% drop',
            isPositive: STUDENT_STATS.attendance >= 75,
            path: '/attendance',
          },
          {
            label: 'Academic CGPA',
            value: STUDENT_STATS.cgpa,
            subtext: 'Rank #4 in CSE Dept',
            icon: Award,
            color: '#10b981',
            bg: 'rgba(16,185,129,0.15)',
            trend: '+0.2 improvement',
            isPositive: true,
            path: '/exams',
          },
          {
            label: 'Pending Fee Balance',
            value: `₹${STUDENT_STATS.pending_fees.toLocaleString('en-IN')}`,
            subtext: 'Due date: Oct 15, 2026',
            icon: CreditCard,
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.15)',
            trend: 'UPI / Net Banking',
            isPositive: false,
            path: '/fees',
          },
          {
            label: 'Upcoming End-Sem',
            value: `${STUDENT_STATS.upcoming_exams} Exams`,
            subtext: 'First: Data Structures (Sep 20)',
            icon: BookOpen,
            color: '#6366f1',
            bg: 'rgba(99,102,241,0.15)',
            trend: 'Hall Ticket Ready',
            isPositive: true,
            path: '/exams',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate(stat.path)}
            className="glass-card"
            style={{
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: '12px',
                  background: stat.bg,
                  color: stat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${stat.color}25`,
                }}
              >
                <stat.icon size={22} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '20px',
                  background: stat.isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                  color: stat.isPositive ? '#10b981' : '#f59e0b',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
                {stat.subtext}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── QUICK ACTION TILES DOCK ── */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {[
          { label: 'AI Study Plan', icon: Brain, color: '#6366f1', path: '/study-planner' },
          { label: 'Class Timetable', icon: Calendar, color: '#0ea5e9', path: '/timetable' },
          { label: 'Attendance Logs', icon: ClipboardCheck, color: '#10b981', path: '/attendance' },
          { label: 'Exams & Marks', icon: BookOpen, color: '#f59e0b', path: '/exams' },
          { label: 'Fees & Payment', icon: CreditCard, color: '#ec4899', path: '/fees' },
          { label: 'Apply Leave', icon: Plane, color: '#8b5cf6', path: '/leave' },
          { label: 'Placements', icon: Briefcase, color: '#06b6d4', path: '/placement' },
          { label: 'Events & Clubs', icon: PartyPopper, color: '#22c55e', path: '/events' },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: '12px',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = action.color;
              e.currentTarget.style.background = `${action.color}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
            }}
          >
            <div
              style={{
                width: 32, height: 32,
                borderRadius: '8px',
                background: `${action.color}20`,
                color: action.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <action.icon size={16} />
            </div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── 2-COLUMN MAIN CONTENT ── */}
      <div className="dashboard-grid-3">
        {/* Left Column (2fr) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Attendance Trend Chart */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Semester Attendance Velocity
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                  Weekly attendance trajectory across all registered courses
                </p>
              </div>
              <button
                onClick={() => navigate('/attendance')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: 12, gap: 4, color: 'var(--brand-primary)' }}
              >
                Detailed Logs <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ height: 220 }}>
              <Line data={attendanceLine} options={chartOptions} />
            </div>
          </div>

          {/* Academic Exam Score Distribution */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Subject Score Performance
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '2px 0 0' }}>
                  Continuous assessment & internal exam percentages
                </p>
              </div>
              <button
                onClick={() => navigate('/exams')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: 12, gap: 4, color: 'var(--brand-primary)' }}
              >
                Full Transcript <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ height: 220 }}>
              <Bar data={marksBar} options={chartOptions} />
            </div>
          </div>

          {/* Today's Schedule Agenda */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} style={{ color: 'var(--brand-primary)' }} />
                Today's Class Agenda
              </h3>
              <span className="badge badge-primary">5 Classes Scheduled</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { time: '09:00 - 10:00 AM', subject: 'Data Structures (CS-201)', faculty: 'Dr. Priya Lakshmi', type: 'Lecture', status: 'Completed', color: '#10b981' },
                { time: '10:00 - 11:00 AM', subject: 'Algorithms (CS-201)', faculty: 'Dr. Priya Lakshmi', type: 'Lecture', status: 'Live Now', color: '#6366f1' },
                { time: '11:15 - 12:15 PM', subject: 'Database Lab (CS-Lab1)', faculty: 'Prof. Ramesh Nair', type: 'Practical', status: 'Upcoming', color: '#f59e0b' },
                { time: '02:00 - 03:00 PM', subject: 'Operating Systems (CS-202)', faculty: 'Prof. Ramesh Nair', type: 'Lecture', status: 'Upcoming', color: '#94a3b8' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: item.status === 'Live Now' ? 'rgba(99,102,241,0.08)' : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: item.status === 'Live Now' ? '1px solid rgba(99,102,241,0.3)' : '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{item.subject}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{item.faculty} • {item.time}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: `${item.color}18`,
                      color: item.color,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1fr) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Attendance Donut Gauge */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 16px', color: 'var(--text-primary)' }}>
              Aggregate Attendance
            </h3>
            <div style={{ position: 'relative', width: 150, height: 150, margin: '0 auto' }}>
              <Doughnut data={attendanceDoughnut} options={{ cutout: '76%', plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: attendanceColor, letterSpacing: '-0.04em' }}>
                  {STUDENT_STATS.attendance}%
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>Overall</span>
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ATTENDANCE_RECORDS.slice(0, 3).map((rec) => (
                <div key={rec.subject} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }} className="truncate">{rec.subject}</span>
                  <span style={{ fontWeight: 700, color: rec.percent >= 75 ? 'var(--brand-success)' : 'var(--brand-danger)' }}>
                    {rec.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Campus Assistant Recommendation */}
          <div
            style={{
              padding: '22px',
              borderRadius: '20px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(79,70,229,0.2) 0%, rgba(139,92,246,0.1) 100%)'
                : 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 8px 24px rgba(99,102,241,0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 32, height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Sparkles size={16} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-primary)' }}>UniCore AI Insight</span>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
              "Your Computer Networks attendance is at <strong>73.7%</strong>. Attending the next 2 lectures will lift you above the 75% examination threshold!"
            </p>
            <button
              onClick={() => navigate('/study-planner')}
              className="btn btn-primary btn-sm btn-full"
              style={{ marginTop: 14, borderRadius: '10px', fontSize: 12 }}
            >
              Open AI Study Planner
            </button>
          </div>

          {/* Upcoming Exams Card */}
          <div className="glass-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Upcoming Exams
              </h3>
              <span className="badge badge-warning">Sep 2026</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {UPCOMING_EXAMS.slice(0, 3).map((exam, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>{exam.subject}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{exam.date} • {exam.time}</span>
                    <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>{exam.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
