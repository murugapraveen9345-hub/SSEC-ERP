import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardCheck, BookOpen, Bell, ArrowRight, TrendingUp,
  Star, Brain, Sparkles, AlertTriangle, Calendar, ChevronRight,
  Clock, CheckCircle, XCircle, FileText, Upload, Send, MessageSquare,
  Award, BarChart3, Plus, Search, Eye, Download, ShieldCheck
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Tooltip, Legend, PointElement, LineElement, Filler, ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, PointElement, LineElement, Filler, ArcElement);

export default function FacultyDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("workspace"); // 'workspace' | 'attendance_marks' | 'mentor' | 'materials'

  // ── 1. Faculty Workspace & Schedule Data ──
  const [todayClasses, setTodayClasses] = useState([
    { id: "C1", period: 1, time: "09:00 - 09:50 AM", subject: "CS8501 Theory of Computation", code: "CS8501", section: "CSE-3A", room: "LH-301", studentsCount: 64, status: "COMPLETED", attendanceTaken: true },
    { id: "C2", period: 2, time: "09:50 - 10:40 AM", subject: "CS8502 Database Management Systems", code: "CS8502", section: "CSE-3A", room: "LH-301", studentsCount: 64, status: "IN_PROGRESS", attendanceTaken: false },
    { id: "C3", period: 4, time: "11:45 - 12:35 PM", subject: "CS8511 DBMS Laboratory", code: "CS8511", section: "CSE-3A (Batch 1)", room: "LAB-03", studentsCount: 32, status: "UPCOMING", attendanceTaken: false },
    { id: "C4", period: 6, time: "02:15 - 03:05 PM", subject: "CS8501 Theory of Computation", code: "CS8501", section: "CSE-3B", room: "LH-304", studentsCount: 62, status: "UPCOMING", attendanceTaken: false },
  ]);

  const assignedSubjects = [
    { code: "CS8501", title: "Theory of Computation", credits: 4, sem: 5, sections: "Sec A & B", totalStudents: 126, syllabusCompleted: 70 },
    { code: "CS8502", title: "Database Management Systems", credits: 3, sem: 5, sections: "Sec A", totalStudents: 64, syllabusCompleted: 82 },
    { code: "CS8511", title: "DBMS Laboratory", credits: 2, sem: 5, sections: "Sec A (Batches 1 & 2)", totalStudents: 64, syllabusCompleted: 85 },
  ];

  const circulars = [
    { id: 1, title: "CIA-2 Question Paper Submission Deadline", by: "Controller of Examinations", date: "Today, 11:30 AM", urgent: true },
    { id: 2, title: "Department NAAC Criteria 3 Documentation Review", by: "Dr. Priya Lakshmi (HOD CSE)", date: "Yesterday", urgent: false },
    { id: 3, title: "Industry Mentorship Sessions for Final Year Students", by: "Placement Cell", date: "2 days ago", urgent: false },
  ];

  // ── 2. Attendance Marking & Marks Entry State ──
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState(todayClasses[1]);
  const [attendanceRoster, setAttendanceRoster] = useState([
    { id: "CS2022001", regNo: "730422104001", name: "Arjun Sharma", status: "PRESENT" },
    { id: "CS2022002", regNo: "730422104002", name: "Ananya Krishnan", status: "PRESENT" },
    { id: "CS2022003", regNo: "730422104003", name: "Vikram Patel", status: "ABSENT" },
    { id: "CS2022004", regNo: "730422104004", name: "Bhavana Reddy", status: "ON_DUTY" },
    { id: "CS2022005", regNo: "730422104005", name: "Goutham Chandran", status: "PRESENT" },
    { id: "CS2022006", regNo: "730422104006", name: "Harini Sundaram", status: "PRESENT" },
  ]);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  const toggleStudentAttendance = (regNo) => {
    setAttendanceRoster(prev => prev.map(s => {
      if (s.regNo === regNo) {
        const next = s.status === "PRESENT" ? "ABSENT" : s.status === "ABSENT" ? "ON_DUTY" : "PRESENT";
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const markAllPresent = () => {
    setAttendanceRoster(prev => prev.map(s => ({ ...s, status: "PRESENT" })));
  };

  const triggerAbsenteeSms = () => {
    const absentees = attendanceRoster.filter(s => s.status === "ABSENT");
    setSmsSentNotice(true);
    setTimeout(() => setSmsSentNotice(false), 4000);
  };

  // Marks Entry State (CIA 1 / CIA 2 / Model)
  const [marksData, setMarksData] = useState([
    { regNo: "730422104001", name: "Arjun Sharma", cia1: 42, cia2: 45, model: 88 },
    { regNo: "730422104002", name: "Ananya Krishnan", cia1: 48, cia2: 49, model: 94 },
    { regNo: "730422104003", name: "Vikram Patel", cia1: 32, cia2: 36, model: 68 },
    { regNo: "730422104004", name: "Bhavana Reddy", cia1: 44, cia2: 41, model: 82 },
  ]);

  const updateMark = (regNo, field, val) => {
    const num = Math.min(field === "model" ? 100 : 50, Math.max(0, Number(val) || 0));
    setMarksData(prev => prev.map(m => m.regNo === regNo ? { ...m, [field]: num } : m));
  };

  // ── 3. Mentor / Class Advisor Portal State ──
  const [mentees, setMentees] = useState([
    { id: "M01", regNo: "730422104001", name: "Arjun Sharma", cgpa: 8.7, attendance: 82.6, feeDues: 0, status: "EXCELLENT", remarks: "Consistent performer; active in Hackathons." },
    { id: "M02", regNo: "730422104003", name: "Vikram Patel", cgpa: 7.2, attendance: 71.4, feeDues: 15000, status: "CRITICAL_ATTENDANCE", remarks: "Advised to avoid unexcused leaves; attendance below 75% threshold." },
    { id: "M03", regNo: "730422104004", name: "Bhavana Reddy", cgpa: 8.4, attendance: 88.0, feeDues: 0, status: "GOOD", remarks: "Sports representative; recommended for OD." },
    { id: "M04", regNo: "730422104007", name: "Kiran Kumar", cgpa: 6.9, attendance: 76.5, feeDues: 22000, status: "FEE_PENDING", remarks: "Parent notified regarding exam fee clearance." },
  ]);

  const [studentLeaveRequests, setStudentLeaveRequests] = useState([
    { id: "LR-101", student: "Arjun Sharma", regNo: "730422104001", type: "Medical Leave", dates: "Nov 15 - Nov 18 (3 Days)", reason: "Hospitalized for viral fever. Medical fitness certificate attached.", proof: "discharge_summary_med.pdf", status: "PENDING" },
    { id: "LR-102", student: "Bhavana Reddy", regNo: "730422104004", type: "On-Duty (Sports)", dates: "Nov 17 - Nov 19 (3 Days)", reason: "Anna University Inter-Zonal Basketball Tournament at Salem.", proof: "event_invite_sports.pdf", status: "PENDING" },
  ]);

  const [parentRemarkModal, setParentRemarkModal] = useState(null);
  const [newRemarkText, setNewRemarkText] = useState("");

  const handleLeaveDecision = (id, decision) => {
    setStudentLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: decision } : r));
  };

  // ── 4. Study Materials & Assignments State ──
  const [materials, setMaterials] = useState([
    { id: "M1", title: "Unit 3 - Pushdown Automata & CFL Notes", subject: "CS8501 Theory of Computation", type: "PDF Document", size: "4.2 MB", downloads: 58, date: "Nov 10, 2026" },
    { id: "M2", title: "Relational Algebra & Normalization Question Bank", subject: "CS8502 DBMS", type: "Question Bank", size: "1.8 MB", downloads: 64, date: "Nov 08, 2026" },
    { id: "M3", title: "PL/SQL Triggers and Cursors Lab Manual", subject: "CS8511 DBMS Lab", type: "Lab Manual", size: "3.5 MB", downloads: 62, date: "Nov 02, 2026" },
  ]);

  const [assignments, setAssignments] = useState([
    { id: "A1", title: "Turing Machine State Diagram Design", subject: "CS8501", deadline: "Nov 20, 2026", submitted: 54, total: 64, evaluated: 40 },
    { id: "A2", title: "Hospital Database Schema Normalization (3NF & BCNF)", subject: "CS8502", deadline: "Nov 24, 2026", submitted: 48, total: 64, evaluated: 12 },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: "", subject: "CS8501 Theory of Computation", type: "Lecture Notes" });

  const handleUploadMaterial = () => {
    if (!newMaterial.title) return;
    setMaterials(prev => [
      { id: `M${Date.now()}`, title: newMaterial.title, subject: newMaterial.subject, type: newMaterial.type, size: "2.4 MB", downloads: 0, date: "Today" },
      ...prev
    ]);
    setShowUploadModal(false);
    setNewMaterial({ title: "", subject: "CS8501 Theory of Computation", type: "Lecture Notes" });
  };

  const todayStr = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── FACULTY HERO BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          borderRadius: "24px",
          padding: "26px 32px",
          background: isDark
            ? "linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)"
            : "linear-gradient(135deg, #e0f2fe 0%, #ffffff 60%, #f0fdf4 100%)",
          border: isDark ? "1px solid rgba(14,165,233,0.3)" : "1px solid rgba(14,165,233,0.2)",
          boxShadow: isDark ? "0 12px 36px rgba(0,0,0,0.5)" : "0 12px 30px rgba(14,165,233,0.08)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58, height: 58,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "22px", fontWeight: 800,
                boxShadow: "0 8px 24px rgba(14,165,233,0.4)",
              }}
            >
              👨‍🏫
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Faculty Academic Console
                </h1>
                <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                  Class Advisor: CSE-3A
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                {todayStr} • Department of Computer Science & Engineering • SSEC
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { setActiveTab("attendance_marks"); }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8, background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}
            >
              <ClipboardCheck size={16} /> Mark Live Attendance
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8 }}
            >
              <Upload size={16} /> Upload Notes
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 4 FACULTY MASTER DOMAIN NAVIGATION TABS ── */}
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
          { key: "workspace", label: "Workspace & Schedule", icon: Calendar },
          { key: "attendance_marks", label: "Attendance & Academic Tracking", icon: ClipboardCheck },
          { key: "mentor", label: "Mentor / Class Advisor Portal", icon: Users },
          { key: "materials", label: "Study Materials & Assignments", icon: BookOpen },
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
              border: activeTab === tab.key ? "1px solid rgba(14,165,233,0.3)" : "1px solid transparent",
              background: activeTab === tab.key ? (isDark ? "#1e293b" : "#ffffff") : "transparent",
              color: activeTab === tab.key ? "#0ea5e9" : "var(--text-tertiary)",
              boxShadow: activeTab === tab.key ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: FACULTY WORKSPACE & SCHEDULE ── */}
      {activeTab === "workspace" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Top Quick Metric Row */}
          <div className="dashboard-grid">
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Today's Lectures</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>4 Sessions</div>
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>1 Lab + 3 Theories</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Assigned Students</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>126 Total</div>
              <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>Across 2 Sections</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Assigned Mentees</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>24 Mentees</div>
              <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700 }}>2 Below 75% Cutoff</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Pending Leave / OD</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0ea5e9", marginTop: 4 }}>2 Requests</div>
              <span style={{ fontSize: 11, color: "#0ea5e9", fontWeight: 700 }}>Awaiting Your Sign-off</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Today's Class Schedule */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Today's Interactive Class Schedule
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Track lecture slots and launch live attendance marking with one click
                  </p>
                </div>
                <span className="badge badge-success">Live Today</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {todayClasses.map(c => (
                  <div
                    key={c.id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 14,
                      background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                      border: c.status === "IN_PROGRESS" ? "1px solid #0ea5e9" : "1px solid var(--border-color)",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 42, height: 42,
                          borderRadius: 10,
                          background: c.status === "IN_PROGRESS" ? "rgba(14,165,233,0.15)" : "rgba(99,102,241,0.1)",
                          color: c.status === "IN_PROGRESS" ? "#0ea5e9" : "#6366f1",
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: 12,
                        }}
                      >
                        P{c.period}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <strong style={{ fontSize: 13.5, color: "var(--text-primary)" }}>{c.subject}</strong>
                          <span className="badge" style={{ fontSize: 10, background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                            {c.section}
                          </span>
                        </div>
                        <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 3 }}>
                          {c.time} • Room: <strong>{c.room}</strong> • {c.studentsCount} Students
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {c.attendanceTaken ? (
                        <span className="badge badge-success" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle size={12} /> Marked
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedClassForAttendance(c);
                            setActiveTab("attendance_marks");
                          }}
                          className="btn btn-primary btn-sm"
                          style={{
                            borderRadius: 8,
                            padding: "6px 12px",
                            fontSize: 12,
                            background: c.status === "IN_PROGRESS" ? "#0ea5e9" : "#6366f1",
                          }}
                        >
                          <ClipboardCheck size={14} /> Start / Mark
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Subjects & Circulars Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Assigned Subjects Breakdown */}
              <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Assigned Subjects & Curriculum Workload
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {assignedSubjects.map(sub => (
                    <div
                      key={sub.code}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{sub.code}: {sub.title}</strong>
                          <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                            {sub.credits} Credits • {sub.sections} • {sub.totalStudents} Students
                          </div>
                        </div>
                        <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 700 }}>
                          {sub.syllabusCompleted}% Complete
                        </span>
                      </div>
                      <div style={{ width: "100%", height: 5, background: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0", borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
                        <div style={{ width: `${sub.syllabusCompleted}%`, height: "100%", background: "#10b981" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circulars & HOD Announcements */}
              <div className="glass-card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Admin & HOD Circulars
                  </h3>
                  <Bell size={15} style={{ color: "var(--text-tertiary)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {circulars.map(circ => (
                    <div
                      key={circ.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: circ.urgent ? "rgba(239,68,68,0.06)" : isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                        border: `1px solid ${circ.urgent ? "rgba(239,68,68,0.2)" : "var(--border-color)"}`,
                        fontSize: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "var(--text-primary)" }}>{circ.title}</strong>
                        {circ.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>Urgent</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 3 }}>
                        By {circ.by} • {circ.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ATTENDANCE & MARKS TRACKING ── */}
      {activeTab === "attendance_marks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Period-wise Attendance Marker */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Period-Wise Attendance Marker: {selectedClassForAttendance.subject}
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  {selectedClassForAttendance.section} • Period {selectedClassForAttendance.period} ({selectedClassForAttendance.time}) • Room {selectedClassForAttendance.room}
                </p>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={markAllPresent}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: 8, fontSize: 12, gap: 6 }}
                >
                  <CheckCircle size={14} /> Bulk Mark All Present
                </button>
                <button
                  onClick={triggerAbsenteeSms}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: 8, fontSize: 12, gap: 6, background: "#0ea5e9" }}
                >
                  <Send size={14} /> Trigger Absentee Parent SMS
                </button>
              </div>
            </div>

            {smsSentNotice && (
              <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 12, fontWeight: 700, border: "1px solid rgba(16,185,129,0.2)" }}>
                ✅ SMS Dispatch Completed: Absentee parents have received automated period absence notification.
              </div>
            )}

            {/* Attendance Roster Grid */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Register No</th>
                    <th style={{ padding: "10px 12px" }}>Student Name</th>
                    <th style={{ padding: "10px 12px" }}>Status (Click to Toggle)</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>One-Click Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRoster.map(s => (
                    <tr key={s.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>{s.regNo}</td>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</td>
                      <td style={{ padding: "12px" }}>
                        <button
                          onClick={() => toggleStudentAttendance(s.regNo)}
                          style={{
                            border: "none",
                            borderRadius: 20,
                            padding: "4px 12px",
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: "pointer",
                            background: s.status === "PRESENT" ? "rgba(16,185,129,0.15)" : s.status === "ABSENT" ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)",
                            color: s.status === "PRESENT" ? "#10b981" : s.status === "ABSENT" ? "#ef4444" : "#6366f1",
                          }}
                        >
                          {s.status === "PRESENT" ? "✓ Present" : s.status === "ABSENT" ? "✕ Absent" : "⚑ On-Duty"}
                        </button>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <button
                          onClick={() => toggleStudentAttendance(s.regNo)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            background: "transparent",
                            border: "1px solid var(--border-color)",
                            cursor: "pointer",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Internal Assessment & Marks Entry */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Continuous Internal Assessment (CIA) & Marks Calculator
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Auto-calculates internal marks out of 20 (CIA-1: 50, CIA-2: 50, Model Exam: 100)
                </p>
              </div>
              <button className="btn btn-primary btn-sm" style={{ borderRadius: 8 }}>
                Save Marks to Database
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Student Name</th>
                    <th style={{ padding: "10px 12px" }}>CIA 1 (/50)</th>
                    <th style={{ padding: "10px 12px" }}>CIA 2 (/50)</th>
                    <th style={{ padding: "10px 12px" }}>Model Exam (/100)</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Internal (/20)</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.map(m => {
                    const internalCalc = (((m.cia1 + m.cia2) / 100) * 10 + (m.model / 100) * 10).toFixed(1);
                    return (
                      <tr key={m.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>
                          {m.name}
                          <span style={{ display: "block", fontSize: 11, color: "var(--text-tertiary)" }}>{m.regNo}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={m.cia1}
                            onChange={e => updateMark(m.regNo, "cia1", e.target.value)}
                            style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={m.cia2}
                            onChange={e => updateMark(m.regNo, "cia2", e.target.value)}
                            style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }}
                          />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input
                            type="number"
                            value={m.model}
                            onChange={e => updateMark(m.regNo, "model", e.target.value)}
                            style={{ width: 60, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }}
                          />
                        </td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: 800, fontSize: 14, color: internalCalc >= 16 ? "#10b981" : "#f59e0b" }}>
                          {internalCalc} / 20
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: MENTOR / CLASS ADVISOR PORTAL ── */}
      {activeTab === "mentor" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Mentee List Tracking */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Advisor Mentee Roster (CSE-3A Cohort)
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Monitor attendance cutoffs (&lt;75%), academic standing, fee clearances, and parent logs
                </p>
              </div>
              <span className="badge badge-primary">24 Assigned Mentees</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Mentee</th>
                    <th style={{ padding: "10px 12px" }}>Register No</th>
                    <th style={{ padding: "10px 12px" }}>CGPA</th>
                    <th style={{ padding: "10px 12px" }}>Attendance %</th>
                    <th style={{ padding: "10px 12px" }}>Fee Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Parent Communication</th>
                  </tr>
                </thead>
                <tbody>
                  {mentees.map(m => (
                    <tr key={m.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</td>
                      <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{m.regNo}</td>
                      <td style={{ padding: "12px", fontWeight: 800, color: m.cgpa >= 8.0 ? "#10b981" : "#f59e0b" }}>{m.cgpa}</td>
                      <td style={{ padding: "12px" }}>
                        <span
                          className="badge"
                          style={{
                            background: m.attendance < 75 ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
                            color: m.attendance < 75 ? "#ef4444" : "#10b981",
                            fontWeight: 800,
                          }}
                        >
                          {m.attendance}% {m.attendance < 75 && "⚠️ Cutoff Warning"}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        {m.feeDues > 0 ? (
                          <span style={{ fontSize: 12, color: "#ef4444", fontWeight: 700 }}>₹{m.feeDues.toLocaleString()} Pending</span>
                        ) : (
                          <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>Cleared</span>
                        )}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <button
                          onClick={() => { setParentRemarkModal(m); setNewRemarkText(m.remarks); }}
                          className="btn btn-ghost btn-sm"
                          style={{ gap: 6, fontSize: 11.5, color: "#0ea5e9" }}
                        >
                          <MessageSquare size={13} /> Log Remarks
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Leave & OD Approval Requests */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Student Medical Leave & On-Duty Approval Requests
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Verify medical certificates and event invitation documents before granting academic clearance
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {studentLeaveRequests.map(r => (
                <div
                  key={r.id}
                  style={{
                    padding: "16px 18px",
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
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{r.student} ({r.regNo})</strong>
                      <span className="badge" style={{ background: "rgba(14,165,233,0.15)", color: "#0ea5e9" }}>{r.type}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                      Duration: <strong>{r.dates}</strong> • Reason: {r.reason}
                    </div>
                    <div style={{ fontSize: 11, color: "#6366f1", marginTop: 4, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                      <Eye size={12} /> Attachment Proof: <u>{r.proof}</u>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {r.status === "PENDING" ? (
                      <>
                        <button
                          onClick={() => handleLeaveDecision(r.id, "APPROVED")}
                          className="btn btn-success btn-sm"
                          style={{ borderRadius: 8, padding: "6px 14px", background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                          Approve Leave
                        </button>
                        <button
                          onClick={() => handleLeaveDecision(r.id, "REJECTED")}
                          className="btn btn-danger btn-sm"
                          style={{ borderRadius: 8, padding: "6px 14px", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="badge" style={{ background: r.status === "APPROVED" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: r.status === "APPROVED" ? "#10b981" : "#ef4444", fontWeight: 800 }}>
                        {r.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: STUDY MATERIALS & ASSIGNMENTS ── */}
      {activeTab === "materials" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Lecture Notes & Materials */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Uploaded Learning Materials
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Lecture notes, question banks, and lab manuals
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary btn-sm"
                style={{ gap: 6, borderRadius: 8 }}
              >
                <Plus size={14} /> Upload
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {materials.map(mat => (
                <div
                  key={mat.id}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{mat.title}</strong>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                      {mat.subject} • {mat.type} • {mat.size} • {mat.downloads} Downloads
                    </div>
                  </div>
                  <Download size={16} style={{ color: "var(--text-tertiary)", cursor: "pointer" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Assignments Management */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Assignment Submissions & Grading
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Accept student code & PDF uploads, evaluate, and provide digital feedback
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {assignments.map(ass => (
                <div
                  key={ass.id}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 13.5, color: "var(--text-primary)" }}>{ass.title}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                        {ass.subject} • Deadline: <strong style={{ color: "#ef4444" }}>{ass.deadline}</strong>
                      </div>
                    </div>
                    <span className="badge badge-primary">
                      {ass.submitted} / {ass.total} Submitted
                    </span>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-tertiary)", marginBottom: 4 }}>
                      <span>Evaluation Progress</span>
                      <span>{ass.evaluated} / {ass.submitted} Graded</span>
                    </div>
                    <div style={{ width: "100%", height: 6, background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${(ass.evaluated / ass.submitted) * 100}%`, height: "100%", background: "#6366f1" }} />
                    </div>
                  </div>

                  <button className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-end", fontSize: 11.5, color: "#0ea5e9" }}>
                    Grade Submissions →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: PARENT REMARK LOGGING ── */}
      {parentRemarkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 460, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>
              Parent Communication Log: {parentRemarkModal.name}
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)" }}>
              Feedback logged here is visible on the Parent Portal and Student Report Card.
            </p>
            <textarea
              rows={4}
              value={newRemarkText}
              onChange={e => setNewRemarkText(e.target.value)}
              placeholder="Enter academic standing observations, conduct notes, or attendance alerts..."
              style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", fontSize: 12.5 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setParentRemarkModal(null)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button
                onClick={() => {
                  setMentees(prev => prev.map(m => m.regNo === parentRemarkModal.regNo ? { ...m, remarks: newRemarkText } : m));
                  setParentRemarkModal(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8 }}
              >
                Save & Dispatch to Parent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD STUDY MATERIAL ── */}
      {showUploadModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 480, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>
              Upload Study Material / Question Bank
            </h3>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Title</label>
              <input
                type="text"
                placeholder="e.g. Unit 4 - Context Free Grammars Notes"
                value={newMaterial.title}
                onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Target Subject</label>
              <select
                value={newMaterial.subject}
                onChange={e => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
              >
                <option value="CS8501 Theory of Computation">CS8501 Theory of Computation</option>
                <option value="CS8502 DBMS">CS8502 DBMS</option>
                <option value="CS8511 DBMS Lab">CS8511 DBMS Lab</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Material Category</label>
              <select
                value={newMaterial.type}
                onChange={e => setNewMaterial({ ...newMaterial, type: e.target.value })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
              >
                <option value="Lecture Notes">Lecture Notes (PDF)</option>
                <option value="Question Bank">Question Bank / 2-Marks</option>
                <option value="Lab Manual">Lab Manual & Code Snippets</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <button onClick={() => setShowUploadModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button onClick={handleUploadMaterial} className="btn btn-primary btn-sm" style={{ borderRadius: 8 }}>Upload File</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
