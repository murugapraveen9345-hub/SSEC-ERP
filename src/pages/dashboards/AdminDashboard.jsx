import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, Building2, BookOpen,
  TrendingUp, TrendingDown, MapPin, Clock, ChevronDown,
  UserPlus, UserCog, FileText, CalendarDays,
  Wallet, PartyPopper, BarChart3, Settings, Shield,
  Globe, Zap, Sparkles, ChevronRight, Activity, Brain
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, Tooltip, Legend
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const STATS = [
  { label: "Total Students", value: "5,248", change: "+12% this sem", positive: true, icon: GraduationCap, color: "#6366f1", path: "/students" },
  { label: "Active Faculty", value: "312", change: "+5% recruited", positive: true, icon: Users, color: "#0ea5e9", path: "/faculty" },
  { label: "Academic Depts", value: "18", change: "6 Programs", positive: null, icon: Building2, color: "#10b981", path: "/departments" },
  { label: "Course Offerings", value: "480", change: "+8% new electives", positive: true, icon: BookOpen, color: "#f59e0b", path: "/exams" },
];

const ENROLLMENT = { labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"], values: [800,950,900,1100,1050,1300,1450,1700,2000] };

const DEPT_DATA = [
  { label: "Computer Science", pct: 32, color: "#6366f1" },
  { label: "Electronics & Comm", pct: 24, color: "#0ea5e9" },
  { label: "Mechanical", pct: 16, color: "#10b981" },
  { label: "Civil Engg", pct: 12, color: "#f59e0b" },
  { label: "Management (MBA)", pct: 10, color: "#8b5cf6" },
  { label: "Information Tech", pct: 6, color: "#ec4899" },
];

const QUICK_ACTIONS = [
  { label: "Add Student", icon: UserPlus, color: "#6366f1", path: "/students" },
  { label: "Add Faculty", icon: UserCog, color: "#0ea5e9", path: "/faculty" },
  { label: "Campus Notice", icon: FileText, color: "#f59e0b", path: "/notifications" },
  { label: "Schedule Exam", icon: CalendarDays, color: "#8b5cf6", path: "/exams" },
  { label: "Fee Collection", icon: Wallet, color: "#10b981", path: "/fees" },
  { label: "Host Event", icon: PartyPopper, color: "#ec4899", path: "/events" },
  { label: "Reports & BI", icon: BarChart3, color: "#06b6d4", path: "/reports" },
  { label: "System Config", icon: Settings, color: "#64748b", path: "/settings" },
];

const EVENTS = [
  { month: "SEP", day: "20", title: "End Semester Exams Begin", by: "Controller of Exams", venue: "Exam Halls A-D", time: "10:00 AM", color: "#ef4444" },
  { month: "SEP", day: "25", title: "TCS Placement Drive", by: "Placement Cell", venue: "Auditorium", time: "09:30 AM", color: "#6366f1" },
  { month: "OCT", day: "02", title: "National Innovation Summit", by: "R&D Council", venue: "Tech Park", time: "09:00 AM", color: "#10b981" },
];

const ACTIVITIES = [
  { title: "New student enrolled", sub: "Rahul Krishnan (CSE - Sec A)", time: "10 mins ago", color: "#10b981" },
  { title: "Exam timetable published", sub: "Nov 2026 End Semester Schedules", time: "1 hour ago", color: "#6366f1" },
  { title: "Fee transaction processed", sub: "₹60,000 received via UPI Gateway", time: "3 hours ago", color: "#f59e0b" },
  { title: "New faculty onboarding", sub: "Dr. Kavitha Rajan (MBA Dept)", time: "5 hours ago", color: "#0ea5e9" },
  { title: "Academic catalog verified", sub: "Semester 5 curriculum active", time: "1 day ago", color: "#8b5cf6" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();

  const barData = {
    labels: ENROLLMENT.labels,
    datasets: [{
      label: "Enrollments",
      data: ENROLLMENT.values,
      backgroundColor: ENROLLMENT.values.map((_, i) => i === ENROLLMENT.values.length - 1 ? "#6366f1" : (isDark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)")),
      hoverBackgroundColor: "#6366f1",
      borderRadius: 8,
    }],
  };

  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)",
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: isDark ? "#cbd5e1" : "#334155",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: isDark ? "#94a3b8" : "#64748b", font: { size: 11 } } },
      y: { grid: { color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }, ticks: { color: isDark ? "#94a3b8" : "#64748b", font: { size: 11 } }, min: 0, max: 2200 },
    },
  };

  const doughnutData = {
    labels: DEPT_DATA.map(d => d.label),
    datasets: [{
      data: DEPT_DATA.map(d => d.pct),
      backgroundColor: DEPT_DATA.map(d => d.color),
      borderWidth: 0,
      hoverOffset: 6,
      cutout: "70%",
    }],
  };

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── HERO BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          padding: "28px 32px",
          background: isDark
            ? "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)"
            : "linear-gradient(135deg, #dcfce7 0%, #ffffff 60%, #e0e7ff 100%)",
          border: isDark ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(16,185,129,0.2)",
          boxShadow: isDark ? "0 12px 36px rgba(0,0,0,0.5)" : "0 12px 30px rgba(16,185,129,0.08)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56, height: 56,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "22px", fontWeight: 800,
                boxShadow: "0 8px 20px rgba(16,185,129,0.4)",
              }}
            >
              {user?.avatar || "RK"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Institutional Command Center 🏛️
                </h1>
                <span className="badge badge-success" style={{ fontWeight: 700 }}>
                  System Active
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                {today} • UniCore Global University • Main Campus
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => navigate("/study-planner")}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8, background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
            >
              <Brain size={16} /> AI Intelligence Hub
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8 }}
            >
              <BarChart3 size={16} /> Analytics Hub
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 4 KPI STAT CARDS ── */}
      <div className="dashboard-grid">
        {STATS.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => navigate(s.path)}
            className="glass-card"
            style={{ padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: "12px",
                  background: `${s.color}15`,
                  color: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <s.icon size={22} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "20px",
                  background: s.positive ? "rgba(16,185,129,0.12)" : "rgba(99,102,241,0.12)",
                  color: s.positive ? "#10b981" : "#6366f1",
                  display: "flex", alignItems: "center", gap: 4,
                }}
              >
                {s.positive ? <TrendingUp size={12} /> : null}
                {s.change}
              </span>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── QUICK ACTION GRID ── */}
      <div
        className="glass-card"
        style={{
          padding: "18px 22px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 12,
        }}
      >
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: "12px",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = action.color;
              e.currentTarget.style.background = `${action.color}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
              e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
            }}
          >
            <div
              style={{
                width: 32, height: 32,
                borderRadius: "8px",
                background: `${action.color}20`,
                color: action.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <action.icon size={16} />
            </div>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── CHARTS & BREAKDOWNS ── */}
      <div className="dashboard-grid-3">
        {/* Left Column (2fr): Enrollment & Live Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Enrollment Trend */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Monthly Student Ingestion Growth
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "2px 0 0" }}>
                  Admissions and cross-campus enrolments across 2026
                </p>
              </div>
              <span className="badge badge-success">+18% vs 2025</span>
            </div>
            <div style={{ height: 240 }}>
              <Bar data={barData} options={barOpts} />
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
                <Activity size={18} style={{ color: "var(--brand-primary)" }} />
                Real-Time Campus Activity Stream
              </h3>
              <button onClick={() => navigate("/reports")} className="btn btn-ghost btn-sm" style={{ color: "var(--brand-primary)", fontSize: 12 }}>
                Full Reports <ChevronRight size={14} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ACTIVITIES.map((act, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: act.color, boxShadow: `0 0 6px ${act.color}` }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{act.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{act.sub}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1fr): Department Split & Key Events */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Department Breakdown */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "var(--text-primary)" }}>
              Department Distribution
            </h3>
            <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 16px" }}>
              <Doughnut data={doughnutData} options={{ cutout: "70%", plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--brand-primary)" }}>5,248</span>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>Students</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {DEPT_DATA.slice(0, 4).map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                    <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{d.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Events */}
          <div className="glass-card" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Key Academic Events
              </h3>
              <button onClick={() => navigate("/events")} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: 0, color: "var(--brand-primary)" }}>
                All Events
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {EVENTS.map((ev, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: `${ev.color}15`,
                      color: ev.color,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 9 }}>{ev.month}</span>
                    <span style={{ fontSize: 13, lineHeight: 1 }}>{ev.day}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)" }} className="truncate">{ev.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{ev.venue} • {ev.time}</div>
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
