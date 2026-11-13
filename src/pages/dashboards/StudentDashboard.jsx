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
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function StudentDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'academics' | 'requests_fees' | 'placement_ai'

  // ── 1. Academic Overview Data ──
  const studentProfile = {
    name: user?.name || "Arjun Sharma",
    regNo: "730422104001",
    dept: "Computer Science & Engineering",
    batch: "2022 - 2026",
    semester: "Semester 5",
    section: "A",
    cgpa: 8.72,
    mentor: "Dr. Suresh Kumar (Assoc. Prof)",
    mentorPhone: "+91 94440 12346",
    backlogs: 0,
  };

  const [attendanceStats] = useState({
    overall: 82.6,
    threshold: 75.0,
    totalConducted: 240,
    totalAttended: 198,
    subjects: [
      { code: "CS8501", name: "Theory of Computation", attended: 38, total: 46, pct: 82.6, status: "GOOD" },
      { code: "CS8502", name: "Database Management Systems", attended: 40, total: 44, pct: 90.9, status: "EXCELLENT" },
      { code: "CS8503", name: "Computer Networks", attended: 28, total: 38, pct: 73.7, status: "WARNING" }, // <75%
      { code: "CS8511", name: "DBMS Laboratory", attended: 22, total: 24, pct: 91.7, status: "EXCELLENT" },
      { code: "MA8551", name: "Algebra & Number Theory", attended: 35, total: 44, pct: 79.5, status: "GOOD" },
    ],
  });

  const todaySchedule = [
    { period: 1, time: "09:00 - 09:50 AM", subject: "CS8501 Theory of Computation", room: "LH-301", faculty: "Dr. Suresh Kumar", status: "COMPLETED" },
    { period: 2, time: "09:50 - 10:40 AM", subject: "CS8502 Database Management Systems", room: "LH-301", faculty: "Dr. Priya Lakshmi", status: "IN_PROGRESS" },
    { period: 3, time: "10:55 - 11:45 AM", subject: "MA8551 Algebra & Number Theory", room: "LH-301", faculty: "Prof. R. Ananth", status: "UPCOMING" },
    { period: 4, time: "11:45 - 12:35 PM", subject: "CS8511 DBMS Laboratory", room: "LAB-03", faculty: "Prof. Anitha", status: "UPCOMING" },
  ];

  // ── 2. Exams & Academics Data ──
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

  const learningMaterials = [
    { id: "MAT1", title: "Unit 3 - Pushdown Automata Lecture Notes", subject: "CS8501", by: "Dr. Suresh Kumar", size: "4.2 MB", date: "Nov 10" },
    { id: "MAT2", title: "DBMS SQL & Normalization Comprehensive Question Bank", subject: "CS8502", by: "Dr. Priya Lakshmi", size: "2.1 MB", date: "Nov 08" },
    { id: "MAT3", title: "Lab Manual Exercise 1 to 10 with Solutions", subject: "CS8511", by: "Prof. Anitha", size: "5.0 MB", date: "Nov 04" },
  ];

  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  // ── 3. Self-Service Requests & Fees Data ──
  const [leaveHistory, setLeaveHistory] = useState([
    { id: "LV-101", type: "Medical Leave", dates: "Nov 15 - Nov 17", days: 3, reason: "Viral fever recovery", currentStep: 2, status: "HOD_REVIEW", steps: ["Mentor Approved", "Under HOD Review", "Admin Final Sign"] },
    { id: "LV-092", type: "On-Duty (Hackathon)", dates: "Oct 12 - Oct 14", days: 3, reason: "Smart India Hackathon Zonal Round", currentStep: 3, status: "APPROVED", steps: ["Mentor Approved", "HOD Approved", "Admin Approved"] },
  ]);

  const [newLeaveForm, setNewLeaveForm] = useState({ type: "Medical Leave", fromDate: "", toDate: "", reason: "", attachment: null });
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);

  const [feeDetails, setFeeDetails] = useState({
    totalDemand: 85000,
    paidAmount: 70000,
    balance: 15000,
    dueDate: "Dec 15, 2026",
    categories: [
      { name: "Tuition Fee (Sem 5)", amount: 55000, status: "PAID", receiptId: "REC-2026-901" },
      { name: "College Bus Transport", amount: 15000, status: "PAID", receiptId: "REC-2026-902" },
      { name: "End Semester Exam & Lab Fee", amount: 15000, status: "PENDING", receiptId: null },
    ],
  });

  const [showPayModal, setShowPayModal] = useState(false);

  const handlePayFee = () => {
    setFeeDetails(prev => ({
      ...prev,
      paidAmount: prev.totalDemand,
      balance: 0,
      categories: prev.categories.map(c => ({ ...c, status: "PAID", receiptId: "REC-2026-999" })),
    }));
    setShowPayModal(false);
  };

  // ── 4. Placement & AI Study Planner Data ──
  const [placementDrives, setPlacementDrives] = useState([
    { id: "P1", company: "TCS Digital", role: "Systems Engineer Specialist", ctc: "7.5 LPA", minCgpa: 7.5, deadline: "Nov 25, 2026", applied: true, resumeStatus: "Shortlisted for Technical Round" },
    { id: "P2", company: "Google Cloud", role: "Cloud Support Associate", ctc: "12.0 LPA", minCgpa: 8.0, deadline: "Nov 30, 2026", applied: false, resumeStatus: "Eligible to Apply" },
    { id: "P3", company: "Zoho Corporation", role: "Software Developer", ctc: "8.4 LPA", minCgpa: 7.0, deadline: "Dec 05, 2026", applied: false, resumeStatus: "Eligible to Apply" },
  ]);

  const [aiStudyPlan] = useState([
    { day: "Today (Evening)", subject: "CS8503 Computer Networks", topic: "TCP Congestion Control & Sliding Window", priority: "HIGH (Weak Area)", estMinutes: 75 },
    { day: "Tomorrow (Morning)", subject: "CS8501 Theory of Computation", topic: "Pumping Lemma for CFLs", priority: "MEDIUM", estMinutes: 60 },
    { day: "Tomorrow (Evening)", subject: "CS8502 DBMS", topic: "B+ Tree Indexing & Query Execution", priority: "HIGH", estMinutes: 90 },
  ]);

  const attendanceRingData = {
    datasets: [{
      data: [attendanceStats.overall, 100 - attendanceStats.overall],
      backgroundColor: [attendanceStats.overall >= 75 ? "#10b981" : "#ef4444", isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"],
      borderWidth: 0,
      cutout: "78%",
    }],
  };

  const gpaChartData = {
    labels: semesterGpa.map(s => s.sem),
    datasets: [{
      label: "GPA",
      data: semesterGpa.map(s => s.gpa),
      borderColor: "#6366f1",
      backgroundColor: isDark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.08)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: "#6366f1",
    }],
  };

  const todayStr = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

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
                width: 60, height: 60,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "24px", fontWeight: 800,
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
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Download size={16} /> Hall Ticket
            </button>
            <button
              onClick={() => setShowApplyLeaveModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "12px", padding: "9px 16px", gap: 8 }}
            >
              <FileText size={16} /> Apply Leave / OD
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 4 STUDENT DOMAIN TABS ── */}
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
          { key: "overview", label: "Academic Overview", icon: GraduationCap },
          { key: "academics", label: "Exams & Learning Hub", icon: BookOpen },
          { key: "requests_fees", label: "Self-Service & Fees", icon: CreditCard },
          { key: "placement_ai", label: "Placement & AI Study Planner", icon: Brain },
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

      {/* ── TAB 1: ACADEMIC OVERVIEW ── */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Quick Metrics */}
          <div className="dashboard-grid">
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Cumulative CGPA</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981", marginTop: 4 }}>
                {studentProfile.cgpa} <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>/ 10</span>
              </div>
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>Top 5% in CSE Department</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Total Attendance</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#6366f1", marginTop: 4 }}>
                {attendanceStats.overall}%
              </div>
              <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>Above 75% Regulatory Cutoff</span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Outstanding Fees</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: feeDetails.balance > 0 ? "#ef4444" : "#10b981", marginTop: 4 }}>
                ₹{feeDetails.balance.toLocaleString()}
              </div>
              <span style={{ fontSize: 11, color: feeDetails.balance > 0 ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                {feeDetails.balance > 0 ? "Due Dec 15" : "All Fees Cleared"}
              </span>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Eligible Placement Drives</span>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0ea5e9", marginTop: 4 }}>3 Companies</div>
              <span style={{ fontSize: 11, color: "#0ea5e9", fontWeight: 700 }}>TCS Digital Applied</span>
            </div>
          </div>

          {/* Cutoff Alert Banner (If Any Subject < 75%) */}
          {attendanceStats.subjects.some(s => s.pct < 75) && (
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
                <strong>Attendance Warning:</strong> Your attendance in <strong>CS8503 Computer Networks (73.7%)</strong> is currently below the mandatory 75% university eligibility requirement. You must attend the next <strong>3 consecutive lectures</strong> without absence to restore eligibility.
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {/* Circular Attendance Meter & Subject Breakdown */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Course-Wise Attendance Breakdown
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Minimum 75% required for Anna University Exam Hall Ticket eligibility
                  </p>
                </div>
                <div style={{ width: 68, height: 68, position: "relative" }}>
                  <Doughnut data={attendanceRingData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#10b981" }}>
                    {attendanceStats.overall}%
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {attendanceStats.subjects.map(sub => (
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

            {/* Today's Class Schedule */}
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
                {todaySchedule.map(slot => (
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
                      <div
                        style={{
                          width: 36, height: 36,
                          borderRadius: 8,
                          background: slot.status === "IN_PROGRESS" ? "#6366f1" : "rgba(99,102,241,0.1)",
                          color: slot.status === "IN_PROGRESS" ? "#fff" : "#6366f1",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: 12,
                        }}
                      >
                        P{slot.period}
                      </div>
                      <div>
                        <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{slot.subject}</strong>
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                          {slot.time} • {slot.faculty}
                        </div>
                      </div>
                    </div>
                    <span
                      className="badge"
                      style={{
                        background: isDark ? "#1e293b" : "#e0e7ff",
                        color: "#6366f1",
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    >
                      <MapPin size={11} style={{ marginRight: 2 }} /> {slot.room}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: EXAMS & LEARNING HUB ── */}
      {activeTab === "academics" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* GPA Progress & Grade Sheet */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Semester-Wise GPA & CGPA Trajectory
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Current CGPA: <strong style={{ color: "#10b981" }}>8.72</strong> (First Class with Distinction)
                </p>
              </div>
              <div style={{ height: 200 }}>
                <Line data={gpaChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 7.0, max: 10.0 } } }} />
              </div>
            </div>

            {/* University Exam Schedule */}
            <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    Nov/Dec 2026 End Semester Exam Schedule
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                    Anna University Affiliated Examinations
                  </p>
                </div>
                <button
                  onClick={() => setShowHallTicketModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ gap: 6, borderRadius: 8, fontSize: 11.5 }}
                >
                  <Download size={13} /> Hall Ticket
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {examSchedule.map(ex => (
                  <div
                    key={ex.code}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{ex.code}: {ex.subject}</strong>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                        {ex.date} • {ex.session}
                      </div>
                    </div>
                    <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                      {ex.venue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digital Learning Hub (Materials & Notes) */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                Digital Learning Hub — Lecture Notes & Lab Manuals
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Verified academic resources uploaded by your department faculty
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {learningMaterials.map(mat => (
                <div
                  key={mat.id}
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
                  <div>
                    <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: 10 }}>
                      {mat.subject}
                    </span>
                    <strong style={{ display: "block", fontSize: 13, color: "var(--text-primary)", marginTop: 6 }}>
                      {mat.title}
                    </strong>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                      By {mat.by} • {mat.size} • Uploaded {mat.date}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start", gap: 6, fontSize: 11.5, color: "#6366f1" }}>
                    <Download size={13} /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: SELF-SERVICE & FEES ── */}
      {activeTab === "requests_fees" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Online Leave & OD Applications */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Online Leave & On-Duty (OD) Tracker
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Multi-tier approval workflow (Mentor &rarr; HOD &rarr; Admin)
                </p>
              </div>
              <button
                onClick={() => setShowApplyLeaveModal(true)}
                className="btn btn-primary btn-sm"
                style={{ gap: 6, borderRadius: 8 }}
              >
                <Upload size={14} /> New Request
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {leaveHistory.map(l => (
                <div
                  key={l.id}
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
                      <strong style={{ fontSize: 13.5, color: "var(--text-primary)" }}>{l.type}</strong>
                      <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", marginTop: 2 }}>
                        {l.dates} ({l.days} Days) • {l.reason}
                      </div>
                    </div>
                    <span
                      className="badge"
                      style={{
                        background: l.status === "APPROVED" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                        color: l.status === "APPROVED" ? "#10b981" : "#f59e0b",
                        fontWeight: 700,
                      }}
                    >
                      {l.status}
                    </span>
                  </div>

                  {/* 3-Step Visual Progress Bar */}
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {l.steps.map((st, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ height: 4, borderRadius: 2, background: i < l.currentStep ? "#10b981" : isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0" }} />
                        <span style={{ fontSize: 9.5, color: i < l.currentStep ? "#10b981" : "var(--text-tertiary)", fontWeight: 600 }}>
                          {st}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fees Breakdown & Instant Payment */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Institutional Fee Account & Receipts
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Official semester payment reconciliation & instant PDF download
                </p>
              </div>
              {feeDetails.balance > 0 && (
                <button
                  onClick={() => setShowPayModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ gap: 6, borderRadius: 8, background: "#10b981" }}
                >
                  <CreditCard size={14} /> Pay ₹{feeDetails.balance.toLocaleString()}
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {feeDetails.categories.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{c.name}</strong>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                      ₹{c.amount.toLocaleString()} • {c.status === "PAID" ? `Receipt: ${c.receiptId}` : `Due: ${feeDetails.dueDate}`}
                    </div>
                  </div>
                  {c.status === "PAID" ? (
                    <button
                      onClick={() => alert(`Downloading PDF Receipt ${c.receiptId}...`)}
                      className="btn btn-ghost btn-sm"
                      style={{ gap: 4, fontSize: 11, color: "#10b981" }}
                    >
                      <Download size={12} /> Receipt
                    </button>
                  ) : (
                    <span className="badge badge-danger" style={{ fontSize: 10 }}>Due</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: PLACEMENT & AI STUDY PLANNER ── */}
      {activeTab === "placement_ai" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {/* Placement Portal */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                SSEC Placement & Internship Portal
              </h3>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                Campus recruitment drives matching your CGPA ({studentProfile.cgpa})
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {placementDrives.map(drive => (
                <div
                  key={drive.id}
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
                      <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{drive.company}</strong>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                        {drive.role} • Package: <strong style={{ color: "#10b981" }}>{drive.ctc}</strong>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                        Apply by: {drive.deadline} • Min CGPA: {drive.minCgpa}
                      </div>
                    </div>
                    {drive.applied ? (
                      <span className="badge badge-success">Applied</span>
                    ) : (
                      <button
                        onClick={() => {
                          setPlacementDrives(prev => prev.map(d => d.id === drive.id ? { ...d, applied: true, resumeStatus: "Application Submitted" } : d));
                        }}
                        className="btn btn-primary btn-sm"
                        style={{ borderRadius: 8, fontSize: 11.5 }}
                      >
                        1-Click Apply
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#6366f1", fontWeight: 600 }}>
                    Status: {drive.resumeStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Study Planner */}
          <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
                  <Brain size={18} style={{ color: "#6366f1" }} />
                  AI Smart Revision Planner
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: "4px 0 0" }}>
                  Dynamic study schedule adjusted for upcoming exams & weak topics
                </p>
              </div>
              <button onClick={() => navigate("/study-planner")} className="btn btn-ghost btn-sm" style={{ color: "#6366f1", fontSize: 11.5 }}>
                Full Planner →
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {aiStudyPlan.map((plan, i) => (
                <div
                  key={i}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    background: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1" }}>{plan.day}</span>
                    <strong style={{ display: "block", fontSize: 13, color: "var(--text-primary)", marginTop: 2 }}>
                      {plan.subject}
                    </strong>
                    <div style={{ fontSize: 11.5, color: "var(--text-secondary)", marginTop: 2 }}>
                      {plan.topic}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 10 }}>
                      {plan.priority}
                    </span>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>
                      {plan.estMinutes} mins
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: HALL TICKET PREVIEW ── */}
      {showHallTicketModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 520, padding: 28, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "var(--text-primary)" }}>
                  Anna University Examination Hall Ticket
                </h3>
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
                <div>Degree & Branch: <strong>B.E. Computer Science & Engg</strong></div>
                <div>Center: <strong>Sri Shanmugha College of Engineering (7304)</strong></div>
                <div style={{ color: "#10b981", fontWeight: 700, marginTop: 4 }}>✓ Verified: Attendance &gt; 75% • Fee Dues Cleared</div>
              </div>
              <div style={{ width: 80, height: 80, border: "2px solid var(--border-color)", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", color: "#000" }}>
                <QrCode size={56} />
                <span style={{ fontSize: 8, fontWeight: 700 }}>VERIFIED</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
              <button onClick={() => setShowHallTicketModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Close</button>
              <button
                onClick={() => {
                  alert("Hall Ticket PDF generated and downloaded to device!");
                  setShowHallTicketModal(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8, gap: 6 }}
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: APPLY LEAVE / OD ── */}
      {showApplyLeaveModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 460, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>
              Submit Online Leave / On-Duty Request
            </h3>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Leave Category</label>
              <select
                value={newLeaveForm.type}
                onChange={e => setNewLeaveForm({ ...newLeaveForm, type: e.target.value })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
              >
                <option value="Medical Leave">Medical Leave (Doctor Slip Required)</option>
                <option value="On-Duty (Symposium/Conference)">On-Duty (Paper / Symposium)</option>
                <option value="On-Duty (Sports/NSS)">On-Duty (Sports / NSS Activity)</option>
                <option value="Personal Leave">Personal Leave</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>From Date</label>
                <input
                  type="date"
                  onChange={e => setNewLeaveForm({ ...newLeaveForm, fromDate: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>To Date</label>
                <input
                  type="date"
                  onChange={e => setNewLeaveForm({ ...newLeaveForm, toDate: e.target.value })}
                  style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Detailed Justification</label>
              <textarea
                rows={3}
                placeholder="State your reason clearly for Faculty Mentor & HOD review..."
                onChange={e => setNewLeaveForm({ ...newLeaveForm, reason: e.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
              <button onClick={() => setShowApplyLeaveModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button
                onClick={() => {
                  setLeaveHistory(prev => [
                    {
                      id: `LV-${Date.now().toString().slice(-3)}`,
                      type: newLeaveForm.type,
                      dates: "Nov 20 - Nov 21",
                      days: 2,
                      reason: newLeaveForm.reason || "Submitted online request",
                      currentStep: 1,
                      status: "MENTOR_REVIEW",
                      steps: ["Under Mentor Review", "HOD Approval", "Admin Final Sign"],
                    },
                    ...prev,
                  ]);
                  setShowApplyLeaveModal(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 8 }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ONLINE FEE PAYMENT ── */}
      {showPayModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: 440, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>
              SSEC Instant Fee Payment Gateway
            </h3>
            <div style={{ padding: 14, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Payable Exam & Lab Fee</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981", marginTop: 2 }}>
                ₹{feeDetails.balance.toLocaleString()}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div>• Instant University Receipt generation</div>
              <div>• 100% Secure SSL encrypted gateway (UPI / Cards / Net Banking)</div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setShowPayModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button onClick={handlePayFee} className="btn btn-primary btn-sm" style={{ borderRadius: 8, background: "#10b981" }}>
                Confirm & Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
