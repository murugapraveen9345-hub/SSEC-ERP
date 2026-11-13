import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, ClipboardCheck, CreditCard, Briefcase,
  Calendar, Bell, ArrowRight, Award, Clock, Sparkles, Zap, Brain,
  ChevronRight, CheckCircle, AlertTriangle, Download, Upload,
  FileText, ShieldCheck, QrCode, Search, Send, Filter, Check,
  XCircle, Printer, DollarSign, MapPin
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCampusData } from "../../context/CampusDataContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function StudentDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Shared Campus Context State
  const {
    leaves,
    feeRecord,
    materials,
    assignments,
    drives,
    applyLeave,
    payFees,
    applyToDrive,
  } = useCampusData();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'academics' | 'requests_fees' | 'placement_ai'

  // Student Profile
  const studentProfile = {
    name: user?.name || "Arjun Sharma",
    regNo: "730422104001",
    dept: "Computer Science & Engineering",
    batch: "2022 - 2026",
    semester: "Semester 5",
    section: "A",
    cgpa: 8.72,
    mentor: "Dr. Suresh Kumar (Assoc. Professor)",
    mentorPhone: "+91 94440 12346",
  };

  const attendanceStats = {
    overall: 82.6,
    threshold: 75.0,
    subjects: [
      { code: "CS8501", name: "Theory of Computation", attended: 38, total: 46, pct: 82.6 },
      { code: "CS8502", name: "Database Management Systems", attended: 40, total: 44, pct: 90.9 },
      { code: "CS8503", name: "Computer Networks", attended: 28, total: 38, pct: 73.7 }, // <75%
      { code: "CS8511", name: "DBMS Laboratory", attended: 22, total: 24, pct: 91.7 },
      { code: "MA8551", name: "Algebra & Number Theory", attended: 35, total: 44, pct: 79.5 },
    ],
  };

  const todaySchedule = [
    { period: 1, time: "09:00 - 09:50 AM", subject: "CS8501 Theory of Computation", room: "LH-301", faculty: "Dr. Suresh Kumar", status: "COMPLETED" },
    { period: 2, time: "09:50 - 10:40 AM", subject: "CS8502 Database Management Systems", room: "LH-301", faculty: "Dr. Priya Lakshmi", status: "IN_PROGRESS" },
    { period: 3, time: "10:55 - 11:45 AM", subject: "MA8551 Algebra & Number Theory", room: "LH-301", faculty: "Prof. R. Ananth", status: "UPCOMING" },
    { period: 4, time: "11:45 - 12:35 PM", subject: "CS8511 DBMS Laboratory", room: "LAB-03", faculty: "Prof. Anitha", status: "UPCOMING" },
  ];

  const semesterGpa = [
    { sem: "Sem 1", gpa: 8.4 },
    { sem: "Sem 2", gpa: 8.6 },
    { sem: "Sem 3", gpa: 8.5 },
    { sem: "Sem 4", gpa: 8.9 },
    { sem: "Sem 5 (Current)", gpa: 8.72 },
  ];

  const examSchedule = [
    { code: "CS8501", subject: "Theory of Computation", date: "Nov 22, 2026", session: "FN (10:00 AM - 01:00 PM)", venue: "Exam Hall A-102" },
    { code: "CS8502", subject: "Database Management Systems", date: "Nov 25, 2026", session: "FN (10:00 AM - 01:00 PM)", venue: "Exam Hall A-104" },
    { code: "CS8503", subject: "Computer Networks", date: "Nov 28, 2026", session: "FN (10:00 AM - 01:00 PM)", venue: "Exam Hall B-201" },
  ];

  const aiStudyPlan = [
    { day: "Today (Evening)", subject: "CS8503 Computer Networks", topic: "TCP Congestion Control & Sliding Window", priority: "HIGH (Weak Area)", estMinutes: 75 },
    { day: "Tomorrow (Morning)", subject: "CS8501 Theory of Computation", topic: "Pumping Lemma for Context Free Languages", priority: "MEDIUM", estMinutes: 60 },
    { day: "Tomorrow (Evening)", subject: "CS8502 DBMS", topic: "B+ Tree Indexing & Transaction ACID Properties", priority: "HIGH", estMinutes: 90 },
  ];

  // Modals
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSubmitAssignmentModal, setShowSubmitAssignmentModal] = useState(null);

  // Leave Form
  const [leaveForm, setLeaveForm] = useState({
    type: "Medical Leave",
    dates: "Nov 20 - Nov 22 (2 Days)",
    reason: "",
  });

  const handleApplyLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.reason) return;
    applyLeave({
      student: studentProfile.name,
      regNo: studentProfile.regNo,
      dept: "CSE",
      type: leaveForm.type,
      dates: leaveForm.dates,
      reason: leaveForm.reason,
      proof: "uploaded_proof_doc.pdf",
    });
    setShowApplyLeaveModal(false);
    setLeaveForm({ type: "Medical Leave", dates: "Nov 20 - Nov 22 (2 Days)", reason: "" });
  };

  const handleConfirmPay = () => {
    payFees();
    setShowPayModal(false);
  };

  const attendanceRingData = {
    datasets: [{
      data: [attendanceStats.overall, 100 - attendanceStats.overall],
      backgroundColor: [attendanceStats.overall >= 75 ? "#10b981" : "#ef4444", isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"],
      borderWidth: 0,
      cutout: "78%",
    }],
  };

  const gpaChartData = {
    labels: semesterGpa.map((s) => s.sem),
    datasets: [{
      label: "GPA",
      data: semesterGpa.map((s) => s.gpa),
      borderColor: "#6366f1",
      backgroundColor: isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.08)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: "#6366f1",
    }],
  };

  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── STUDENT HERO & PROFILE CARD ── */}
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
                width: 60,
                height: 60,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                fontWeight: 800,
                boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
              }}
            >
              🎓
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  {studentProfile.name}
                </h1>
                <span className="badge badge-success" style={{ fontWeight: 700 }}>
                  0 Backlogs (All Clear)
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                Reg No: <strong>{studentProfile.regNo}</strong> • {studentProfile.dept} • {studentProfile.semester} (Batch {studentProfile.batch})
              </p>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3 }}>
                Faculty Mentor: <strong>{studentProfile.mentor}</strong> ({studentProfile.mentorPhone})
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setShowHallTicketModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 16px", gap: 6, background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Download size={15} /> Hall Ticket
            </button>
            <button
              onClick={() => setShowApplyLeaveModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 16px", gap: 6 }}
            >
              <FileText size={15} /> Apply Leave / OD
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
          { key: "overview", label: "Academic Profile & Cutoff Guard", icon: GraduationCap },
          { key: "academics", label: `Exams & Courseware (${materials.length})`, icon: BookOpen },
          { key: "requests_fees", label: `Self-Service & Fees (Due: ₹${feeRecord.balance.toLocaleString()})`, icon: CreditCard },
          { key: "placement_ai", label: "Career & AI Revision Planner", icon: Brain },
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

      {/* ── TAB 1: ACADEMIC PROFILE & ATTENDANCE GUARD ── */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Quick Stats Grid */}
          <div className="dashboard-grid">
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Cumulative CGPA</span>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#10b981", marginTop: 4 }}>
                {studentProfile.cgpa} <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>/ 10</span>
              </div>
              <span style={{ fontSize: 11.5, color: "#10b981", fontWeight: 700 }}>Top 5% in CSE Department</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Overall Attendance</span>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#6366f1", marginTop: 4 }}>
                {attendanceStats.overall}%
              </div>
              <span style={{ fontSize: 11.5, color: "#6366f1", fontWeight: 700 }}>Above 75% Regulatory Cutoff</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Fee Balance</span>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: feeRecord.balance > 0 ? "#ef4444" : "#10b981", marginTop: 4 }}>
                ₹{feeRecord.balance.toLocaleString()}
              </div>
              <span style={{ fontSize: 11.5, color: feeRecord.balance > 0 ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                {feeRecord.balance > 0 ? `Due by ${feeRecord.dueDate}` : "All Dues Cleared"}
              </span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Active Leave / OD</span>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0ea5e9", marginTop: 4 }}>
                {leaves.length} Requests
              </div>
              <span style={{ fontSize: 11.5, color: "#0ea5e9", fontWeight: 700 }}>Track Live Status</span>
            </div>
          </div>

          {/* Dynamic 75% Cutoff Alert Banner */}
          {attendanceStats.subjects.some((s) => s.pct < 75) && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <AlertTriangle size={20} style={{ color: "#f59e0b", flexShrink: 0 }} />
              <div style={{ fontSize: 12.5, color: "var(--text-primary)" }}>
                <strong>University Attendance Warning:</strong> Your attendance in <strong>CS8503 Computer Networks (73.7%)</strong> is currently below the mandatory 75% university eligibility requirement. You must attend the next <strong>3 consecutive lectures</strong> without absence to restore examination clearance.
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Attendance Meter & Breakdown */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Course Attendance Breakdown
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Minimum 75% required for Anna University Hall Ticket clearance
                  </p>
                </div>
                <div style={{ width: 68, height: 68, position: "relative" }}>
                  <Doughnut data={attendanceRingData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#10b981" }}>
                    {attendanceStats.overall}%
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {attendanceStats.subjects.map((sub) => (
                  <div key={sub.code} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                      <div>
                        <strong style={{ color: "var(--text-primary)" }}>{sub.code}</strong>{" "}
                        <span style={{ color: "var(--text-secondary)" }}>{sub.name}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: sub.pct < 75 ? "#ef4444" : "#10b981" }}>
                        {sub.pct}% ({sub.attended}/{sub.total})
                      </span>
                    </div>
                    <div style={{ width: "100%", height: 6, background: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${sub.pct}%`, height: "100%", background: sub.pct < 75 ? "#ef4444" : "#6366f1" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Classroom Wayfinder */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Today's Classroom Schedule
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  {todayStr} • Main Academic Block
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {todaySchedule.map((slot) => (
                  <div
                    key={slot.period}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: slot.status === "IN_PROGRESS" ? "rgba(99,102,241,0.08)" : isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                      border: slot.status === "IN_PROGRESS" ? "1px solid #6366f1" : "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: slot.status === "IN_PROGRESS" ? "#6366f1" : "rgba(99,102,241,0.1)", color: slot.status === "IN_PROGRESS" ? "#fff" : "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12 }}>
                        P{slot.period}
                      </div>
                      <div>
                        <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{slot.subject}</strong>
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                          {slot.time} • {slot.faculty}
                        </div>
                      </div>
                    </div>
                    <span className="badge" style={{ background: isDark ? "#1e293b" : "#e0e7ff", color: "#6366f1", fontWeight: 700, fontSize: 11 }}>
                      <MapPin size={11} style={{ marginRight: 2 }} /> {slot.room}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: EXAMS & COURSEWARE ── */}
      {activeTab === "academics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* GPA & Exam Schedule */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Semester-Wise GPA Progress
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Current CGPA: <strong style={{ color: "#10b981" }}>8.72</strong> (First Class with Distinction)
                </p>
              </div>
              <div style={{ height: 190 }}>
                <Line data={gpaChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 7.0, max: 10.0 } } }} />
              </div>
            </div>

            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    End-Semester University Schedule
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Anna University Affiliated Examinations
                  </p>
                </div>
                <button onClick={() => setShowHallTicketModal(true)} className="btn btn-primary btn-sm" style={{ gap: 6, borderRadius: 8, fontSize: 11.5 }}>
                  <Download size={13} /> Hall Ticket
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {examSchedule.map((ex) => (
                  <div key={ex.code} style={{ padding: "12px 14px", borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{ex.code}: {ex.subject}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{ex.date} • {ex.session}</div>
                    </div>
                    <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{ex.venue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Courseware Download & Assignments */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {/* Learning Materials */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Verified Lecture Notes & Lab Manuals
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {materials.map((mat) => (
                  <div key={mat.id} style={{ padding: 12, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{mat.title}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{mat.subject} • {mat.size}</div>
                    </div>
                    <button onClick={() => alert(`Downloading ${mat.title}...`)} className="btn btn-ghost btn-sm" style={{ gap: 4, color: "#6366f1", fontSize: 11 }}>
                      <Download size={13} /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Submission Desk */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Active Assignments & Submission Desk
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {assignments.map((ass) => (
                  <div key={ass.id} style={{ padding: 12, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{ass.title}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{ass.subject} • Due: <strong style={{ color: "#ef4444" }}>{ass.deadline}</strong></div>
                    </div>
                    <button onClick={() => setShowSubmitAssignmentModal(ass)} className="btn btn-primary btn-sm" style={{ borderRadius: 8, fontSize: 11 }}>
                      Submit File
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: SELF-SERVICE & FEES ── */}
      {activeTab === "requests_fees" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Leave / OD Multi-Tier Tracker */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Online Leave / OD Status Tracker
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Mentor &rarr; HOD &rarr; Admin 3-tier approval progress
                </p>
              </div>
              <button onClick={() => setShowApplyLeaveModal(true)} className="btn btn-primary btn-sm" style={{ gap: 4, borderRadius: 8 }}>
                <Upload size={13} /> Apply
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {leaves.map((l) => (
                <div key={l.id} style={{ padding: 14, borderRadius: 12, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 13.5, color: "var(--text-primary)" }}>{l.type}</strong>
                      <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 2 }}>{l.dates} • {l.reason}</div>
                    </div>
                    <span className="badge" style={{ background: l.status === "APPROVED" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: l.status === "APPROVED" ? "#10b981" : "#f59e0b", fontWeight: 700 }}>
                      {l.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 4 }}>
                    {(l.steps || ["Mentor Endorsement", "HOD Approval", "Admin Final Sign"]).map((st, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ height: 4, borderRadius: 2, background: l.status === "APPROVED" || i === 0 ? "#10b981" : isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />
                        <span style={{ fontSize: 9.5, color: l.status === "APPROVED" || i === 0 ? "#10b981" : "var(--text-tertiary)", fontWeight: 600 }}>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Account & Instant Receipts */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Institutional Fee Account
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Semester 5 tuition, lab, and transport fee reconciliation
                </p>
              </div>
              {feeRecord.balance > 0 && (
                <button onClick={() => setShowPayModal(true)} className="btn btn-primary btn-sm" style={{ gap: 6, borderRadius: 8, background: "#10b981" }}>
                  <CreditCard size={14} /> Pay ₹{feeRecord.balance.toLocaleString()}
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: 14, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>Total Semester Demand</strong>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>Tuition, Bus, and Examination Fees</div>
                </div>
                <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>₹{feeRecord.totalFee.toLocaleString()}</strong>
              </div>

              <div style={{ padding: 14, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>Total Paid to Date</strong>
                  <div style={{ fontSize: 11, color: "#10b981", marginTop: 2 }}>Payment Verified via Razorpay UPI</div>
                </div>
                <strong style={{ fontSize: 14, color: "#10b981" }}>₹{feeRecord.paid.toLocaleString()}</strong>
              </div>

              <div style={{ padding: 14, borderRadius: 10, background: feeRecord.balance > 0 ? "rgba(239,68,68,0.06)" : "rgba(16,185,129,0.06)", border: `1px solid ${feeRecord.balance > 0 ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: 13, color: feeRecord.balance > 0 ? "#ef4444" : "#10b981" }}>
                    {feeRecord.balance > 0 ? "Outstanding Dues" : "Zero Balance Cleared"}
                  </strong>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                    {feeRecord.balance > 0 ? `Must be cleared before ${feeRecord.dueDate}` : "All University fees settled"}
                  </div>
                </div>
                {feeRecord.balance === 0 ? (
                  <button onClick={() => alert("Downloading Official Payment Receipt PDF...")} className="btn btn-ghost btn-sm" style={{ gap: 4, color: "#10b981", fontSize: 11.5 }}>
                    <Download size={13} /> Receipt PDF
                  </button>
                ) : (
                  <strong style={{ fontSize: 15, color: "#ef4444" }}>₹{feeRecord.balance.toLocaleString()}</strong>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: CAREER & AI REVISION PLANNER ── */}
      {activeTab === "placement_ai" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Placement Drives */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                SSEC Placement & Internship Portal
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Drives matching your 8.72 CGPA qualification
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {drives.map((d) => (
                <div key={d.id} style={{ padding: 14, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{d.company}</strong>
                      <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 2 }}>{d.role} • Package: <strong style={{ color: "#10b981" }}>{d.ctc}</strong></div>
                    </div>
                    {d.applied ? (
                      <span className="badge badge-success">Applied</span>
                    ) : (
                      <button onClick={() => applyToDrive(d.id)} className="btn btn-primary btn-sm" style={{ borderRadius: 6, fontSize: 11 }}>
                        1-Click Apply
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#6366f1", fontWeight: 600 }}>Status: {d.resumeStatus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Revision Planner */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Brain size={18} style={{ color: "#6366f1" }} />
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  AI Smart Revision Planner
                </h3>
              </div>
              <button onClick={() => navigate("/study-planner")} className="btn btn-ghost btn-sm" style={{ color: "#6366f1", fontSize: 11 }}>
                Open Full AI Hub →
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {aiStudyPlan.map((plan, i) => (
                <div key={i} style={{ padding: 12, borderRadius: 10, background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1" }}>{plan.day}</span>
                    <strong style={{ display: "block", fontSize: 13, color: "var(--text-primary)", marginTop: 2 }}>{plan.subject}</strong>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{plan.topic}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 10 }}>{plan.priority}</span>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 3 }}>{plan.estMinutes} mins</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: HALL TICKET ── */}
      {showHallTicketModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 500, padding: 26, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: 10 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "var(--text-primary)" }}>Anna University Examination Hall Ticket</h3>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Nov/Dec 2026 Examination Session</span>
              </div>
              <button onClick={() => setShowHallTicketModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}>
                <XCircle size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
              <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 4, color: "var(--text-secondary)" }}>
                <div>Student Name: <strong>{studentProfile.name}</strong></div>
                <div>Register Number: <strong>{studentProfile.regNo}</strong></div>
                <div>Degree & Branch: <strong>B.E. Computer Science & Engineering</strong></div>
                <div>Center: <strong>Sri Shanmugha College of Engineering (7304)</strong></div>
                <div style={{ color: "#10b981", fontWeight: 700, marginTop: 4 }}>✓ Verified: Attendance &gt; 75% • Fee Dues Cleared</div>
              </div>
              <div style={{ width: 75, height: 75, border: "2px solid var(--border-color)", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", color: "#000" }}>
                <QrCode size={52} />
                <span style={{ fontSize: 7, fontWeight: 800 }}>VERIFIED</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
              <button onClick={() => setShowHallTicketModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Close</button>
              <button onClick={() => { alert("Hall ticket downloaded as official PDF!"); setShowHallTicketModal(false); }} className="btn btn-primary btn-sm" style={{ borderRadius: 8, gap: 6 }}>
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: APPLY LEAVE / OD ── */}
      {showApplyLeaveModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <form onSubmit={handleApplyLeaveSubmit} className="glass-card" style={{ width: "100%", maxWidth: 460, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Submit Leave / OD Request</h3>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Category</label>
              <select value={leaveForm.type} onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}>
                <option value="Medical Leave">Medical Leave (Doctor Slip Required)</option>
                <option value="On-Duty (Symposium/Conference)">On-Duty (Paper / Symposium Presentation)</option>
                <option value="On-Duty (Sports/NSS)">On-Duty (Sports / NSS Activity)</option>
                <option value="Personal Leave">Personal Leave</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Date Range</label>
              <input type="text" value={leaveForm.dates} onChange={(e) => setLeaveForm({ ...leaveForm, dates: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Reason / Justification</label>
              <textarea required rows={3} placeholder="State reason clearly for Faculty Mentor review..." value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
              <button type="button" onClick={() => setShowApplyLeaveModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 8 }}>Submit Request</button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL: PAY FEES ── */}
      {showPayModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 420, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Instant University Fee Payment</h3>
            <div style={{ padding: 14, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Payable Semester Dues</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981", marginTop: 2 }}>₹{feeRecord.balance.toLocaleString()}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>• Official receipt generated instantly and synced with Admin accounting.</div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowPayModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button onClick={handleConfirmPay} className="btn btn-primary btn-sm" style={{ borderRadius: 8, background: "#10b981" }}>Confirm & Pay Now</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: SUBMIT ASSIGNMENT ── */}
      {showSubmitAssignmentModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 440, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Upload Assignment Solution</h3>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)" }}>{showSubmitAssignmentModal.title} ({showSubmitAssignmentModal.subject})</p>
            <div style={{ border: "2px dashed var(--border-strong)", borderRadius: 12, padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
              <Upload size={28} style={{ color: "#6366f1" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>Drag & drop your PDF or Source Code archive</div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowSubmitAssignmentModal(null)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button onClick={() => { alert("Assignment solution submitted to faculty successfully!"); setShowSubmitAssignmentModal(null); }} className="btn btn-primary btn-sm" style={{ borderRadius: 8 }}>Submit Solution</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
