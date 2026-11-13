import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Users, Building2, BookOpen,
  TrendingUp, TrendingDown, MapPin, Clock, ChevronDown,
  UserPlus, UserCog, FileText, CalendarDays,
  Wallet, PartyPopper, BarChart3, Settings, Shield,
  Globe, Zap, Sparkles, ChevronRight, Activity, Brain,
  Upload, Filter, Search, CheckCircle, XCircle, AlertTriangle,
  Lock, Unlock, Download, RefreshCw, Send, CheckSquare, Layers
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();

  // ── Master Active Tab ──
  const [activeTab, setActiveTab] = useState("overview");

  // ── 1. Executive Analytics Data ──
  const STATS = [
    { label: "Total Students", value: "5,248", change: "+12.4% this sem", positive: true, icon: GraduationCap, color: "#6366f1" },
    { label: "Active Faculty", value: "312", change: "+5.2% recruited", positive: true, icon: Users, color: "#0ea5e9" },
    { label: "Academic Depts", value: "18", change: "6 Key Programs", positive: null, icon: Building2, color: "#10b981" },
    { label: "Campus Staff", value: "95", change: "98% attendance", positive: true, icon: Shield, color: "#f59e0b" },
  ];

  const DEPT_ATTENDANCE = [
    { dept: "CSE", pct: 89.2, total: 1420, color: "#6366f1" },
    { dept: "IT", pct: 92.0, total: 840, color: "#ec4899" },
    { dept: "ECE", pct: 85.4, total: 1150, color: "#0ea5e9" },
    { dept: "CIVIL", pct: 81.3, total: 520, color: "#f59e0b" },
    { dept: "MECH", pct: 78.6, total: 780, color: "#10b981" },
    { dept: "MBA", pct: 86.5, total: 538, color: "#8b5cf6" },
  ];

  const [feeBreakdownMode, setFeeBreakdownMode] = useState("category"); // 'category' | 'monthly'

  const feeCategoryData = {
    labels: ["Tuition Fee", "Bus Transport", "Hostel & Mess", "Exam & Lab"],
    datasets: [{
      data: [3.6, 0.62, 0.50, 0.10], // In Crores
      backgroundColor: ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b"],
      borderWidth: 0,
      cutout: "70%",
    }],
  };

  // ── 2. User & Dept Management State ──
  const [userSubTab, setUserSubTab] = useState("students");
  const [selectedBatch, setSelectedBatch] = useState("ALL");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [searchStudent, setSearchStudent] = useState("");
  const [showCsvModal, setShowCsvModal] = useState(false);

  const [studentList, setStudentList] = useState([
    { id: "CS2022001", name: "Arjun Sharma", regNo: "730422104001", dept: "CSE", batch: "2022-2026", section: "A", cgpa: 8.7, status: "ACTIVE" },
    { id: "CS2022002", name: "Ananya Krishnan", regNo: "730422104002", dept: "CSE", batch: "2022-2026", section: "A", cgpa: 9.1, status: "ACTIVE" },
    { id: "CS2022003", name: "Vikram Patel", regNo: "730422104003", dept: "CSE", batch: "2022-2026", section: "B", cgpa: 7.8, status: "ACTIVE" },
    { id: "EC2023010", name: "Deepika Sundar", regNo: "730423106010", dept: "ECE", batch: "2023-2027", section: "A", cgpa: 8.4, status: "ACTIVE" },
    { id: "ME2021045", name: "Karthik Raja", regNo: "730421114045", dept: "MECH", batch: "2021-2025", section: "A", cgpa: 6.9, status: "BLOCKED" },
    { id: "IT2022022", name: "Pooja Venkatesh", regNo: "730422205022", dept: "IT", batch: "2022-2026", section: "A", cgpa: 8.9, status: "ACTIVE" },
  ]);

  const toggleStudentStatus = (id) => {
    setStudentList(prev => prev.map(s => {
      if (s.id === id) {
        const next = s.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const [facultyList, setFacultyList] = useState([
    { id: "F001", name: "Dr. Priya Lakshmi", dept: "CSE", designation: "Professor & HOD", isHod: true, isMentor: false, workload: 14, maxWorkload: 18 },
    { id: "F002", name: "Dr. Suresh Kumar", dept: "CSE", designation: "Associate Professor", isHod: false, isMentor: true, workload: 18, maxWorkload: 20 },
    { id: "F003", name: "Prof. R. Ananth", dept: "ECE", designation: "Assistant Professor", isHod: false, isMentor: true, workload: 16, maxWorkload: 20 },
    { id: "F004", name: "Dr. Meena Ramesh", dept: "IT", designation: "Professor & HOD", isHod: true, isMentor: false, workload: 12, maxWorkload: 18 },
  ]);

  // ── 3. Academic & Operational Controls ──
  const [ttTest, setTtTest] = useState({ day: "Monday", period: "1", room: "LH-301", faculty: "Dr. Suresh Kumar" });
  const [conflictResult, setConflictResult] = useState(null);

  const testConflict = () => {
    if (ttTest.room === "LH-301" && ttTest.period === "1") {
      setConflictResult({
        conflict: true,
        message: "⚠️ Collision Detected! Room LH-301 is already booked for CS8501 (Yr-3 Sec A) during Period 1 on Monday.",
      });
    } else {
      setConflictResult({
        conflict: false,
        message: `✅ Slot Available! Room ${ttTest.room} and ${ttTest.faculty} have zero schedule collisions for ${ttTest.day} Period ${ttTest.period}.`,
      });
    }
  };

  const [escalatedLeaves, setEscalatedLeaves] = useState([
    { id: "LV-901", applicant: "Arjun Sharma (CS2022001)", role: "STUDENT", dept: "CSE", type: "Medical Leave (5 Days)", reason: "Hospitalization for viral fever. Discharge slip attached.", status: "PENDING" },
    { id: "LV-902", applicant: "Prof. R. Ananth", role: "FACULTY", dept: "ECE", type: "On-Duty (4 Days)", reason: "Paper presentation at IEEE International Conference, Bengaluru.", status: "PENDING" },
  ]);

  const handleLeaveDecision = (id, decision) => {
    setEscalatedLeaves(prev => prev.map(l => l.id === id ? { ...l, status: decision } : l));
  };

  // ── 4. Placement & Examination Center ──
  const [placementForm, setPlacementForm] = useState({
    company: "Google Cloud",
    role: "Cloud Engineer",
    packageLpa: "12.0",
    minCgpa: "8.0",
    dept: "CSE",
  });
  const [eligibleCount, setEligibleCount] = useState(148);
  const [gradeLocked, setGradeLocked] = useState(false);

  const calculateEligibility = (cgpa) => {
    const val = parseFloat(cgpa) || 0;
    if (val >= 8.5) setEligibleCount(64);
    else if (val >= 8.0) setEligibleCount(148);
    else if (val >= 7.5) setEligibleCount(312);
    else setEligibleCount(520);
  };

  // ── 5. System Settings & Audit Logs ──
  const [rbac, setRbac] = useState({
    ADMIN: { read: true, write: true, delete: true, approve: true },
    HOD: { read: true, write: true, delete: false, approve: true },
    FACULTY: { read: true, write: true, delete: false, approve: false },
    STUDENT: { read: true, write: false, delete: false, approve: false },
  });

  const toggleRbac = (role, perm) => {
    setRbac(prev => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] }
    }));
  };

  const [auditLogs] = useState([
    { id: "LOG-501", action: "GRADE_LOCKED", entity: "Exam Results", actor: "Rajesh Kumar (Admin)", time: "12 mins ago", ip: "192.168.1.45" },
    { id: "LOG-502", action: "STUDENT_BLOCKED", entity: "Karthik Raja (ME2021045)", actor: "Rajesh Kumar (Admin)", time: "1 hour ago", ip: "192.168.1.45" },
    { id: "LOG-503", action: "TIMETABLE_RESOLVED", entity: "Lab-3 Conflict", actor: "Rajesh Kumar (Admin)", time: "3 hours ago", ip: "192.168.1.45" },
    { id: "LOG-504", action: "FEE_CATEGORY_CONFIG", entity: "Hostel Fee Fine", actor: "Rajesh Kumar (Admin)", time: "1 day ago", ip: "192.168.1.45" },
    { id: "LOG-505", action: "RBAC_UPDATED", entity: "Faculty Role", actor: "Rajesh Kumar (Admin)", time: "2 days ago", ip: "192.168.1.45" },
  ]);

  const filteredStudents = studentList.filter(s => {
    if (selectedDept !== "ALL" && s.dept !== selectedDept) return false;
    if (selectedBatch !== "ALL" && s.batch !== selectedBatch) return false;
    if (searchStudent && !s.name.toLowerCase().includes(searchStudent.toLowerCase()) && !s.regNo.includes(searchStudent)) return false;
    return true;
  });

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── INSTITUTIONAL HERO COMMAND HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          borderRadius: "24px",
          padding: "26px 32px",
          background: isDark
            ? "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)"
            : "linear-gradient(135deg, #e0e7ff 0%, #ffffff 60%, #ecfeff 100%)",
          border: isDark ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(99,102,241,0.2)",
          boxShadow: isDark ? "0 12px 36px rgba(0,0,0,0.5)" : "0 12px 30px rgba(99,102,241,0.08)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58, height: 58,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "24px", fontWeight: 800,
                boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  SSEC Institutional Admin Portal
                </h1>
                <span className="badge badge-success" style={{ fontWeight: 700 }}>
                  Live Authority Control
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                {today} • Sri Shanmugha College of Engineering & Technology • Master System
              </p>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              onClick={() => { setActiveTab("users"); setUserSubTab("students"); setShowCsvModal(true); }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 15px", gap: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <UserPlus size={16} /> Bulk Add Students
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 15px", gap: 8 }}
            >
              <FileText size={16} /> Broadcast Notice
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="btn btn-ghost btn-sm"
              style={{ borderRadius: "12px", padding: "9px 15px", gap: 8 }}
            >
              <BarChart3 size={16} /> BI Reports
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 5 MASTER DOMAIN NAVIGATION TABS ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 6,
          background: isDark ? "rgba(15,23,42,0.8)" : "rgba(241,245,249,0.9)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          overflowX: "auto",
        }}
      >
        {[
          { key: "overview", label: "Executive Analytics", icon: BarChart3 },
          { key: "users", label: "User & Dept Management", icon: Users },
          { key: "academics", label: "Academic & Operations", icon: BookOpen },
          { key: "exams_placement", label: "Placement & Exams", icon: GraduationCap },
          { key: "security", label: "RBAC & Audit Trail", icon: Shield },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "12px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              border: activeTab === tab.key ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
              background: activeTab === tab.key ? (isDark ? "#1e293b" : "#ffffff") : "transparent",
              color: activeTab === tab.key ? "#6366f1" : "var(--text-tertiary)",
              boxShadow: activeTab === tab.key ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: EXECUTIVE ANALYTICS DASHBOARD ── */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* 4 Metric Cards */}
          <div className="dashboard-grid">
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="glass-card"
                style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}
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
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Department Attendance Overview & Fee Collection Status */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Real-time College Attendance Overview */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Real-time College Attendance Overview
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Campus Aggregate: <strong style={{ color: "#10b981" }}>84.8%</strong> • Cutoff: 75%
                  </p>
                </div>
                <span className="badge badge-success">Live Sync</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {DEPT_ATTENDANCE.map(d => (
                  <div key={d.dept} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 700 }}>
                      <span style={{ color: "var(--text-primary)" }}>{d.dept} Department</span>
                      <span style={{ color: d.pct < 80 ? "#f59e0b" : "#10b981" }}>
                        {d.pct}% ({Math.round(d.total * (d.pct / 100))} / {d.total} Present)
                      </span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${d.pct}%`,
                          height: "100%",
                          borderRadius: 4,
                          background: d.pct < 80 ? "linear-gradient(90deg, #f59e0b, #ef4444)" : `linear-gradient(90deg, ${d.color}, #10b981)`,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Collection Status */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Fee Collection Status (FY 2026-27)
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Total Target: ₹5.50 Cr • 87.5% Realized
                  </p>
                </div>
                <div style={{ display: "flex", gap: 4, background: isDark ? "#1e293b" : "#f1f5f9", padding: 3, borderRadius: 8 }}>
                  <button
                    onClick={() => setFeeBreakdownMode("category")}
                    style={{
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      background: feeBreakdownMode === "category" ? "#6366f1" : "transparent",
                      color: feeBreakdownMode === "category" ? "#fff" : "var(--text-tertiary)",
                    }}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => setFeeBreakdownMode("monthly")}
                    style={{
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      background: feeBreakdownMode === "monthly" ? "#6366f1" : "transparent",
                      color: feeBreakdownMode === "monthly" ? "#fff" : "var(--text-tertiary)",
                    }}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 140, height: 140, position: "relative", flexShrink: 0 }}>
                  <Doughnut data={feeCategoryData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#10b981" }}>₹4.82 Cr</span>
                    <span style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 700 }}>Collected</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Pending Dues</span>
                    <strong style={{ fontSize: 12, color: "#ef4444" }}>₹68.5 Lakhs (94 Students)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Gateway Reconciliation</span>
                    <strong style={{ fontSize: 12, color: "#10b981" }}>100% Verified</strong>
                  </div>
                  <button
                    onClick={() => setActiveTab("academics")}
                    className="btn btn-ghost btn-sm"
                    style={{ justifyContent: "center", fontSize: 12, color: "#6366f1" }}
                  >
                    View Defaulters & Audit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: USER & DEPARTMENT MANAGEMENT ── */}
      {activeTab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Sub Tab Switcher */}
          <div style={{ display: "flex", gap: 10, borderBottom: "1px solid var(--border-color)", paddingBottom: 10 }}>
            {["students", "faculty", "departments"].map(t => (
              <button
                key={t}
                onClick={() => setUserSubTab(t)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: userSubTab === t ? "2px solid #6366f1" : "2px solid transparent",
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  color: userSubTab === t ? "#6366f1" : "var(--text-tertiary)",
                  textTransform: "capitalize",
                }}
              >
                {t} Management
              </button>
            ))}
          </div>

          {/* Sub Tab: Students */}
          {userSubTab === "students" && (
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Controls bar: CSV Upload + Filters */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                  <div style={{ position: "relative" }}>
                    <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-tertiary)" }} />
                    <input
                      type="text"
                      placeholder="Search Name or Reg No..."
                      value={searchStudent}
                      onChange={e => setSearchStudent(e.target.value)}
                      style={{
                        padding: "8px 12px 8px 32px",
                        borderRadius: 10,
                        border: "1px solid var(--border-color)",
                        background: isDark ? "#1e293b" : "#f8fafc",
                        color: "var(--text-primary)",
                        fontSize: 12.5,
                      }}
                    />
                  </div>

                  <select
                    value={selectedDept}
                    onChange={e => setSelectedDept(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid var(--border-color)",
                      background: isDark ? "#1e293b" : "#f8fafc",
                      color: "var(--text-primary)",
                      fontSize: 12.5,
                    }}
                  >
                    <option value="ALL">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="IT">IT</option>
                  </select>

                  <select
                    value={selectedBatch}
                    onChange={e => setSelectedBatch(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      border: "1px solid var(--border-color)",
                      background: isDark ? "#1e293b" : "#f8fafc",
                      color: "var(--text-primary)",
                      fontSize: 12.5,
                    }}
                  >
                    <option value="ALL">All Batches</option>
                    <option value="2022-2026">2022-2026 (Yr-3)</option>
                    <option value="2023-2027">2023-2027 (Yr-2)</option>
                    <option value="2021-2025">2021-2025 (Yr-4)</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowCsvModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ gap: 8, borderRadius: 10 }}
                >
                  <Upload size={14} /> Bulk CSV Ingestion
                </button>
              </div>

              {/* Students Data Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                      <th style={{ padding: "10px 12px" }}>Student</th>
                      <th style={{ padding: "10px 12px" }}>Register No</th>
                      <th style={{ padding: "10px 12px" }}>Dept & Batch</th>
                      <th style={{ padding: "10px 12px" }}>Section</th>
                      <th style={{ padding: "10px 12px" }}>CGPA</th>
                      <th style={{ padding: "10px 12px" }}>Account Status</th>
                      <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(s => (
                      <tr key={s.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{s.regNo}</td>
                        <td style={{ padding: "12px" }}>
                          <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                            {s.dept} • {s.batch}
                          </span>
                        </td>
                        <td style={{ padding: "12px", fontWeight: 700 }}>Sec {s.section}</td>
                        <td style={{ padding: "12px", fontWeight: 800, color: s.cgpa >= 8.5 ? "#10b981" : "#f59e0b" }}>{s.cgpa}</td>
                        <td style={{ padding: "12px" }}>
                          <span
                            className="badge"
                            style={{
                              background: s.status === "ACTIVE" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                              color: s.status === "ACTIVE" ? "#10b981" : "#ef4444",
                              fontWeight: 700,
                            }}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px", textAlign: "right" }}>
                          <button
                            onClick={() => toggleStudentStatus(s.id)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: 8,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: "pointer",
                              border: "1px solid var(--border-color)",
                              background: s.status === "ACTIVE" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                              color: s.status === "ACTIVE" ? "#ef4444" : "#10b981",
                            }}
                          >
                            {s.status === "ACTIVE" ? "Block Account" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub Tab: Faculty */}
          {userSubTab === "faculty" && (
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Faculty Workload & Role Allocations
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Track AI-optimized weekly teaching hours and HOD/Mentor duties
                  </p>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ gap: 6, borderRadius: 10 }}>
                  <UserCog size={14} /> Assign New Faculty
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {facultyList.map(f => (
                  <div
                    key={f.id}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>{f.name}</h4>
                        <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{f.dept} Dept • {f.designation}</span>
                      </div>
                      {f.isHod && <span className="badge badge-primary">HOD</span>}
                      {f.isMentor && <span className="badge badge-success">Mentor</span>}
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                        <span style={{ color: "var(--text-secondary)" }}>Workload Hours</span>
                        <span style={{ color: f.workload >= f.maxWorkload ? "#ef4444" : "#10b981" }}>
                          {f.workload} / {f.maxWorkload} hrs/wk
                        </span>
                      </div>
                      <div style={{ width: "100%", height: 6, background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${(f.workload / f.maxWorkload) * 100}%`,
                            height: "100%",
                            background: f.workload >= f.maxWorkload ? "#ef4444" : "#6366f1",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Tab: Departments */}
          {userSubTab === "departments" && (
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Academic Departments & Regulations
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Manage curriculum scheme (R2021/R2024), semester syllabus, and credit matrices
                  </p>
                </div>
                <button className="btn btn-primary btn-sm" style={{ gap: 6, borderRadius: 10 }}>
                  <Building2 size={14} /> Add Department
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
                {DEPT_ATTENDANCE.map(d => (
                  <div
                    key={d.dept}
                    style={{
                      padding: 16,
                      borderRadius: 14,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: 15, color: "var(--text-primary)" }}>{d.dept}</strong>
                      <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 700 }}>
                        Scheme R2024
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Total Enrolled: <strong>{d.total} Students</strong>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 8px" }}>
                        Syllabus Map
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: "4px 8px" }}>
                        Assign HOD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: ACADEMIC & OPERATIONAL CONTROLS ── */}
      {activeTab === "academics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Conflict-Free Timetable Builder */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Conflict-Free Master Timetable Builder
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                AI scheduler simulator that detects room double-booking and faculty collisions before publishing
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Day</label>
                <select
                  value={ttTest.day}
                  onChange={e => setTtTest({ ...ttTest, day: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Period</label>
                <select
                  value={ttTest.period}
                  onChange={e => setTtTest({ ...ttTest, period: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                >
                  <option value="1">Period 1 (09:00 - 09:50 AM)</option>
                  <option value="2">Period 2 (09:50 - 10:40 AM)</option>
                  <option value="3">Period 3 (10:55 - 11:45 AM)</option>
                  <option value="4">Period 4 (11:45 - 12:35 PM)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Classroom / Lab</label>
                <select
                  value={ttTest.room}
                  onChange={e => setTtTest({ ...ttTest, room: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                >
                  <option value="LH-301">LH-301 (Lecture Hall)</option>
                  <option value="LH-302">LH-302 (Lecture Hall)</option>
                  <option value="LAB-03">LAB-03 (DBMS Lab)</option>
                  <option value="LAB-05">LAB-05 (AI Research Lab)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Faculty</label>
                <select
                  value={ttTest.faculty}
                  onChange={e => setTtTest({ ...ttTest, faculty: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                >
                  <option value="Dr. Suresh Kumar">Dr. Suresh Kumar</option>
                  <option value="Dr. Priya Lakshmi">Dr. Priya Lakshmi</option>
                  <option value="Prof. R. Ananth">Prof. R. Ananth</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={testConflict}
                  className="btn btn-primary"
                  style={{ width: "100%", borderRadius: 8, height: 38 }}
                >
                  <Sparkles size={15} /> Check Conflict
                </button>
              </div>
            </div>

            {conflictResult && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  background: conflictResult.conflict ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)",
                  color: conflictResult.conflict ? "#ef4444" : "#10b981",
                  border: `1px solid ${conflictResult.conflict ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`,
                }}
              >
                {conflictResult.message}
              </div>
            )}
          </div>

          {/* Leave & OD Final Approvals */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Escalated Leave & On-Duty (OD) Final Approvals
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Applications exceeding 3 days or conference travel requiring Executive Principal/Admin sign-off
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {escalatedLeaves.map(l => (
                <div
                  key={l.id}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{l.applicant}</strong>
                      <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{l.type}</span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-secondary)" }}>{l.reason}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {l.status === "PENDING" ? (
                      <>
                        <button
                          onClick={() => handleLeaveDecision(l.id, "APPROVED")}
                          className="btn btn-success btn-sm"
                          style={{ borderRadius: 8, padding: "6px 12px", background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleLeaveDecision(l.id, "REJECTED")}
                          className="btn btn-danger btn-sm"
                          style={{ borderRadius: 8, padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className="badge"
                        style={{
                          background: l.status === "APPROVED" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                          color: l.status === "APPROVED" ? "#10b981" : "#ef4444",
                          fontWeight: 700,
                        }}
                      >
                        {l.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: PLACEMENT & EXAMINATION CENTER ── */}
      {activeTab === "exams_placement" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Placement Management */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Campus Placement Drive Coordinator
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Post company recruitment drives and filter eligible students automatically
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Company Name</label>
                <input
                  type="text"
                  value={placementForm.company}
                  onChange={e => setPlacementForm({ ...placementForm, company: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Package (CTC LPA)</label>
                  <input
                    type="text"
                    value={placementForm.packageLpa}
                    onChange={e => setPlacementForm({ ...placementForm, packageLpa: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Min CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={placementForm.minCgpa}
                    onChange={e => {
                      setPlacementForm({ ...placementForm, minCgpa: e.target.value });
                      calculateEligibility(e.target.value);
                    }}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                  />
                </div>
              </div>

              <div style={{ padding: "12px", borderRadius: 10, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#6366f1" }}>Matched Eligible Candidates</span>
                <strong style={{ fontSize: 15, color: "#6366f1" }}>{eligibleCount} Students</strong>
              </div>

              <button className="btn btn-primary" style={{ borderRadius: 10, marginTop: 4 }}>
                <Send size={15} /> Publish Drive & Notify Students
              </button>
            </div>
          </div>

          {/* Exam & Results Lock */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Examination & Result Command
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Hall ticket distribution, exam schedules, and grade lock enforcement
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: 14, borderRadius: 12, border: "1px solid var(--border-color)", background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>Hall Tickets (Nov 2026 End Sem)</strong>
                  <span className="badge badge-success">Generated (5,248)</span>
                </div>
                <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: "4px 0 0" }}>
                  Eligible students (&ge; 75% attendance) can download barcoded tickets online.
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, border: "1px solid var(--border-color)", background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>End Semester Grade Lock</strong>
                  <button
                    onClick={() => setGradeLocked(!gradeLocked)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 11.5,
                      fontWeight: 700,
                      background: gradeLocked ? "#ef4444" : "#6366f1",
                      color: "#fff",
                    }}
                  >
                    {gradeLocked ? <Lock size={13} /> : <Unlock size={13} />}
                    {gradeLocked ? "Grades Locked" : "Lock Grades & Publish"}
                  </button>
                </div>
                <p style={{ fontSize: 11.5, color: "var(--text-secondary)", margin: 0 }}>
                  {gradeLocked
                    ? "🔒 Grades are sealed. Faculty marks modification has been disabled."
                    : "⚠️ Locking will finalize marks, compute semester GPA, and push results to portals."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: RBAC & AUDIT TRAIL ── */}
      {activeTab === "security" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Role-Based Access Control (RBAC) Permissions Matrix */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Role-Based Access Control (RBAC) Permissions Matrix
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Enforce granular privilege separation between Admin, HOD, Faculty, and Students
              </p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 14px" }}>System Role</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Read (View)</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Write (Create/Edit)</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Delete</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Authorize / Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(rbac).map(role => (
                    <tr key={role} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800, color: "var(--text-primary)" }}>{role}</td>
                      {["read", "write", "delete", "approve"].map(perm => (
                        <td key={perm} style={{ padding: "12px 14px", textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={rbac[role][perm]}
                            disabled={role === "ADMIN"}
                            onChange={() => toggleRbac(role, perm)}
                            style={{ width: 16, height: 16, accentColor: "#6366f1", cursor: role === "ADMIN" ? "not-allowed" : "pointer" }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Audit Logs */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Institutional Security & Audit Trail
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Immutable log of all administrative actions, data edits, and authorization grants
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ gap: 6, fontSize: 12 }}>
                <Download size={14} /> Export Audit Log
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {auditLogs.map(log => (
                <div
                  key={log.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    fontSize: 12.5,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="badge" style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1", fontWeight: 700 }}>
                      {log.action}
                    </span>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>{log.entity}</strong>
                      <span style={{ color: "var(--text-tertiary)", marginLeft: 6 }}>by {log.actor} ({log.ip})</span>
                    </div>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: BULK CSV INGESTION ── */}
      {showCsvModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: 20,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: 500,
              padding: 28,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "var(--text-primary)" }}>
                Bulk Ingest Student Records
              </h3>
              <button
                onClick={() => setShowCsvModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}
              >
                <XCircle size={20} />
              </button>
            </div>

            <div
              style={{
                border: "2px dashed var(--border-strong)",
                borderRadius: 14,
                padding: "32px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                cursor: "pointer",
              }}
            >
              <Upload size={32} style={{ color: "#6366f1" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                  Drag & Drop Student CSV File
                </p>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
                  Must include headers: name, regNo, dept, batch, section, phone
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowCsvModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Sample batch student CSV parsed and imported successfully!");
                  setShowCsvModal(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8 }}
              >
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
