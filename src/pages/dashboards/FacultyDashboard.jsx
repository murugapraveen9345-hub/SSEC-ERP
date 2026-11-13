import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ClipboardCheck, BookOpen, Bell, ArrowRight, TrendingUp,
  Star, Brain, Sparkles, AlertTriangle, Calendar, ChevronRight,
  Clock, CheckCircle, XCircle, FileText, Upload, Send, MessageSquare,
  Award, BarChart3, Plus, Search, Eye, Download, ShieldCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCampusData } from "../../context/CampusDataContext";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Shared Campus Context State
  const {
    students,
    notices,
    leaves,
    materials,
    assignments,
    updateLeaveStatus,
    uploadMaterial,
  } = useCampusData();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("workspace"); // 'workspace' | 'attendance_marks' | 'mentor' | 'materials'

  // ── 1. Faculty Workspace & Schedule Data ──
  const [todayClasses] = useState([
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

  // ── 2. Attendance & Marks State ──
  const [attendanceRoster, setAttendanceRoster] = useState(
    students.map((s) => ({
      id: s.id,
      regNo: s.regNo,
      name: s.name,
      status: s.attendance < 75 ? "ABSENT" : "PRESENT",
    }))
  );
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  const toggleStudentAttendance = (regNo) => {
    setAttendanceRoster((prev) =>
      prev.map((s) => {
        if (s.regNo === regNo) {
          const next =
            s.status === "PRESENT"
              ? "ABSENT"
              : s.status === "ABSENT"
              ? "ON_DUTY"
              : "PRESENT";
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const markAllPresent = () => {
    setAttendanceRoster((prev) => prev.map((s) => ({ ...s, status: "PRESENT" })));
  };

  const triggerAbsenteeSms = () => {
    setSmsSentNotice(true);
    setTimeout(() => setSmsSentNotice(false), 4000);
  };

  // Marks Entry (CIA 1 / CIA 2 / Model)
  const [marksData, setMarksData] = useState(
    students.map((s, idx) => ({
      regNo: s.regNo,
      name: s.name,
      cia1: 42 + (idx % 8),
      cia2: 40 + (idx % 9),
      model: 84 + (idx % 12),
    }))
  );

  const updateMark = (regNo, field, val) => {
    const num = Math.min(field === "model" ? 100 : 50, Math.max(0, Number(val) || 0));
    setMarksData((prev) =>
      prev.map((m) => (m.regNo === regNo ? { ...m, [field]: num } : m))
    );
  };

  // ── 3. Mentor & Communication State ──
  const [parentRemarkModal, setParentRemarkModal] = useState(null);
  const [newRemarkText, setNewRemarkText] = useState("");
  const [mentorRemarksMap, setMentorRemarksMap] = useState({
    "730422104001": "Active participation; consistent semester progress.",
    "730422104003": "Attendance below 75%; parent contacted for academic guidance.",
  });

  // ── 4. Upload Material Modal State ──
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subject: "CS8501 Theory of Computation",
    size: "3.2 MB",
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newMaterial.title) return;
    uploadMaterial({
      title: newMaterial.title,
      subject: newMaterial.subject,
      by: user?.name || "Dr. Suresh Kumar",
      size: newMaterial.size,
    });
    setShowUploadModal(false);
    setNewMaterial({ title: "", subject: "CS8501 Theory of Computation", size: "3.2 MB" });
  };

  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
                width: 58,
                height: 58,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                fontWeight: 800,
                boxShadow: "0 8px 24px rgba(14,165,233,0.4)",
              }}
            >
              👨‍🏫
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Faculty Academic Suite
                </h1>
                <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                  Advisor: CSE-3A
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                {todayStr} • Dept of Computer Science & Engineering • Sri Shanmugha College
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setActiveTab("attendance_marks")}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 16px", gap: 6, background: "#0ea5e9" }}
            >
              <ClipboardCheck size={15} /> Mark Attendance
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 16px", gap: 6 }}
            >
              <Upload size={15} /> Share Notes
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 4 TABS ── */}
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
          { key: "workspace", label: "Schedule & Curriculum", icon: Calendar },
          { key: "attendance_marks", label: "Attendance & CIA Calculator", icon: ClipboardCheck },
          { key: "mentor", label: `Mentee & Leave Desk (${leaves.length})`, icon: Users },
          { key: "materials", label: `Courseware & Assignments (${materials.length})`, icon: BookOpen },
        ].map((tab) => (
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

      {/* ── TAB 1: WORKSPACE & SCHEDULE ── */}
      {activeTab === "workspace" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Today's Timetable */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Today's Class Timetable
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Active lecture slots & quick attendance trigger
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {todayClasses.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: c.status === "IN_PROGRESS" ? "rgba(14,165,233,0.08)" : isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                      border: c.status === "IN_PROGRESS" ? "1px solid #0ea5e9" : "1px solid var(--border-color)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: c.status === "IN_PROGRESS" ? "#0ea5e9" : "rgba(14,165,233,0.12)", color: c.status === "IN_PROGRESS" ? "#fff" : "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>
                        P{c.period}
                      </div>
                      <div>
                        <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{c.subject}</strong>
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                          {c.time} • Room: <strong>{c.room}</strong> • {c.studentsCount} Students
                        </div>
                      </div>
                    </div>
                    {c.attendanceTaken ? (
                      <span className="badge badge-success" style={{ fontSize: 10 }}>Marked</span>
                    ) : (
                      <button
                        onClick={() => setActiveTab("attendance_marks")}
                        className="btn btn-primary btn-sm"
                        style={{ borderRadius: 6, fontSize: 11, padding: "4px 10px", background: "#0ea5e9" }}
                      >
                        Mark
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Progress & Circulars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Syllabus Progress */}
              <div className="glass-card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Syllabus Completion Tracker
                </h3>
                {assignedSubjects.map((sub) => (
                  <div key={sub.code} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                      <strong style={{ color: "var(--text-primary)" }}>{sub.code}: {sub.title}</strong>
                      <span style={{ color: "#10b981", fontWeight: 700 }}>{sub.syllabusCompleted}% Done</span>
                    </div>
                    <div style={{ width: "100%", height: 6, background: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${sub.syllabusCompleted}%`, height: "100%", background: "#10b981" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Notices */}
              <div className="glass-card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Admin Circulars for Faculty
                </h3>
                {notices.slice(0, 3).map((n) => (
                  <div key={n.id} style={{ padding: "8px 12px", borderRadius: 8, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", fontSize: 12 }}>
                    <strong style={{ color: "var(--text-primary)" }}>{n.title}</strong>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{n.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ATTENDANCE & CIA MARKS ── */}
      {activeTab === "attendance_marks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Period Attendance Suite */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Period 2 Live Attendance Marker (CS8502 DBMS - Sec A)
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Click status pill to toggle between Present, Absent, and On-Duty
                </p>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={markAllPresent} className="btn btn-secondary btn-sm" style={{ borderRadius: 8, fontSize: 11.5 }}>
                  <CheckCircle size={13} /> Bulk Mark All Present
                </button>
                <button onClick={triggerAbsenteeSms} className="btn btn-primary btn-sm" style={{ borderRadius: 8, fontSize: 11.5, background: "#0ea5e9" }}>
                  <Send size={13} /> Trigger Absentee SMS
                </button>
              </div>
            </div>

            {smsSentNotice && (
              <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 12, fontWeight: 700 }}>
                ✅ SMS Notice Dispatched: Automated absence alerts sent to parent contacts.
              </div>
            )}

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Register No</th>
                    <th style={{ padding: "10px 12px" }}>Student Name</th>
                    <th style={{ padding: "10px 12px" }}>Status (Toggle)</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRoster.map((s) => (
                    <tr key={s.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px", color: "var(--text-secondary)", fontFamily: "monospace" }}>{s.regNo}</td>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</td>
                      <td style={{ padding: "12px" }}>
                        <button
                          onClick={() => toggleStudentAttendance(s.regNo)}
                          style={{
                            border: "none",
                            borderRadius: 16,
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
                          style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11, border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-tertiary)", cursor: "pointer" }}
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Continuous Internal Assessment (CIA) Calculator */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Continuous Internal Assessment (CIA) & Marks Calculator
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  CIA-1 (/50), CIA-2 (/50), Model Exam (/100) auto-converted to 20 marks
                </p>
              </div>
              <button onClick={() => alert("Marks exported to CSV successfully!")} className="btn btn-secondary btn-sm" style={{ gap: 6, borderRadius: 8 }}>
                <Download size={13} /> Export Marks CSV
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Student</th>
                    <th style={{ padding: "10px 12px" }}>CIA-1 (/50)</th>
                    <th style={{ padding: "10px 12px" }}>CIA-2 (/50)</th>
                    <th style={{ padding: "10px 12px" }}>Model (/100)</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Internal (/20)</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.map((m) => {
                    const internal = (((m.cia1 + m.cia2) / 100) * 10 + (m.model / 100) * 10).toFixed(1);
                    return (
                      <tr key={m.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>
                          {m.name}
                          <span style={{ display: "block", fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>{m.regNo}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" value={m.cia1} onChange={(e) => updateMark(m.regNo, "cia1", e.target.value)} style={{ width: 55, padding: 6, borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }} />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" value={m.cia2} onChange={(e) => updateMark(m.regNo, "cia2", e.target.value)} style={{ width: 55, padding: 6, borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }} />
                        </td>
                        <td style={{ padding: "12px" }}>
                          <input type="number" value={m.model} onChange={(e) => updateMark(m.regNo, "model", e.target.value)} style={{ width: 60, padding: 6, borderRadius: 6, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)" }} />
                        </td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: 800, color: internal >= 16 ? "#10b981" : "#f59e0b", fontSize: 14 }}>
                          {internal} / 20
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

      {/* ── TAB 3: MENTOR & LEAVE DESK ── */}
      {activeTab === "mentor" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Mentee List */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              Assigned Mentee Cohort Roster ({students.length} Students)
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                    <th style={{ padding: "10px 12px" }}>Mentee</th>
                    <th style={{ padding: "10px 12px" }}>Register No</th>
                    <th style={{ padding: "10px 12px" }}>CGPA</th>
                    <th style={{ padding: "10px 12px" }}>Attendance</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Parent Remark Log</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((m) => (
                    <tr key={m.regNo} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{m.name}</td>
                      <td style={{ padding: "12px", color: "var(--text-secondary)", fontFamily: "monospace" }}>{m.regNo}</td>
                      <td style={{ padding: "12px", fontWeight: 800, color: m.cgpa >= 8.0 ? "#10b981" : "#f59e0b" }}>{m.cgpa || 8.2}</td>
                      <td style={{ padding: "12px" }}>
                        <span className="badge" style={{ background: m.attendance < 75 ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)", color: m.attendance < 75 ? "#ef4444" : "#10b981", fontWeight: 800 }}>
                          {m.attendance}% {m.attendance < 75 && "⚠️ Cutoff Alert"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <button
                          onClick={() => { setParentRemarkModal(m); setNewRemarkText(mentorRemarksMap[m.regNo] || ""); }}
                          className="btn btn-ghost btn-sm"
                          style={{ gap: 4, color: "#0ea5e9", fontSize: 11.5 }}
                        >
                          <MessageSquare size={13} /> {mentorRemarksMap[m.regNo] ? "Edit Remark" : "Add Remark"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Leave & OD Approvals */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              Student Leave & On-Duty Approval Queue
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {leaves.map((l) => (
                <div
                  key={l.id}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{l.student} ({l.regNo})</strong>
                      <span className="badge" style={{ background: "rgba(14,165,233,0.15)", color: "#0ea5e9" }}>{l.type}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                      Dates: <strong>{l.dates}</strong> • Reason: {l.reason}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {l.status.includes("PENDING") ? (
                      <>
                        <button onClick={() => updateLeaveStatus(l.id, "APPROVED")} className="btn btn-success btn-sm" style={{ borderRadius: 6, background: "#10b981", color: "#fff", border: "none" }}>
                          Approve
                        </button>
                        <button onClick={() => updateLeaveStatus(l.id, "REJECTED")} className="btn btn-danger btn-sm" style={{ borderRadius: 6, background: "#ef4444", color: "#fff", border: "none" }}>
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="badge" style={{ background: l.status === "APPROVED" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: l.status === "APPROVED" ? "#10b981" : "#ef4444", fontWeight: 700 }}>
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

      {/* ── TAB 4: MATERIALS & ASSIGNMENTS ── */}
      {activeTab === "materials" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Learning Materials */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Digital Courseware Shared
              </h3>
              <button onClick={() => setShowUploadModal(true)} className="btn btn-primary btn-sm" style={{ borderRadius: 8, gap: 4 }}>
                <Plus size={13} /> Share Material
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {materials.map((mat) => (
                <div key={mat.id} style={{ padding: 12, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{mat.title}</strong>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                      {mat.subject} • {mat.size} • {mat.downloads || 0} Downloads
                    </div>
                  </div>
                  <Download size={15} style={{ color: "var(--text-tertiary)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              Assignment Desk & Evaluations
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {assignments.map((ass) => (
                <div key={ass.id} style={{ padding: 14, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{ass.title}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                        {ass.subject} • Due: <strong style={{ color: "#ef4444" }}>{ass.deadline}</strong>
                      </div>
                    </div>
                    <span className="badge badge-primary">{ass.submitted} / {ass.total} Submissions</span>
                  </div>
                  <div style={{ width: "100%", height: 5, background: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${(ass.evaluated / ass.submitted) * 100}%`, height: "100%", background: "#0ea5e9" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: PARENT REMARKS ── */}
      {parentRemarkModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 440, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>
              Parent Communication Log: {parentRemarkModal.name}
            </h3>
            <textarea
              rows={4}
              value={newRemarkText}
              onChange={(e) => setNewRemarkText(e.target.value)}
              placeholder="Record academic progress observations, attendance notes, or conduct remarks..."
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", fontSize: 12.5 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setParentRemarkModal(null)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button
                onClick={() => {
                  setMentorRemarksMap({ ...mentorRemarksMap, [parentRemarkModal.regNo]: newRemarkText });
                  setParentRemarkModal(null);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8, background: "#0ea5e9" }}
              >
                Save & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: UPLOAD MATERIAL ── */}
      {showUploadModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <form onSubmit={handleUploadSubmit} className="glass-card" style={{ width: "100%", maxWidth: 460, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Share Learning Material</h3>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Document Title</label>
              <input required type="text" placeholder="e.g. Unit 4 - Context Free Grammars" value={newMaterial.title} onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Course</label>
              <select value={newMaterial.subject} onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}>
                <option value="CS8501 Theory of Computation">CS8501 Theory of Computation</option>
                <option value="CS8502 DBMS">CS8502 DBMS</option>
                <option value="CS8511 DBMS Lab">CS8511 DBMS Lab</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
              <button type="button" onClick={() => setShowUploadModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 8, background: "#0ea5e9" }}>Publish to Students</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
