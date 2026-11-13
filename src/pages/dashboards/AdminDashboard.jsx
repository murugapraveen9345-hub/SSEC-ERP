import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, GraduationCap, Building2, Search, Plus, Filter,
  CheckCircle, XCircle, FileText, Bell, Phone, ShieldCheck,
  Send, UserPlus, UserCog, ArrowRight
} from "lucide-react";
import { useCampusData } from "../../context/CampusDataContext";
import { useTheme } from "../../context/ThemeContext";

export default function AdminDashboard() {
  const {
    students,
    faculty,
    notices,
    addStudent,
    toggleStudentStatus,
    addFaculty,
    addNotice,
  } = useCampusData();

  const { isDark } = useTheme();

  // Active View Tab: 'students' | 'faculty' | 'notices'
  const [activeTab, setActiveTab] = useState("students");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");

  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // New Student Form
  const [newStudent, setNewStudent] = useState({
    name: "",
    regNo: "",
    dept: "CSE",
    batch: "2024-2028",
    semester: "Semester 1",
    section: "A",
    phone: "",
  });

  // New Faculty Form
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    empId: "",
    dept: "CSE",
    designation: "Assistant Professor",
    phone: "",
    assignedCourses: "",
  });

  // Broadcast Notice Form
  const [newNotice, setNewNotice] = useState({
    title: "",
    details: "",
    target: "All",
    urgent: false,
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.regNo) return;
    addStudent(newStudent);
    setShowAddStudentModal(false);
    setNewStudent({
      name: "",
      regNo: "",
      dept: "CSE",
      batch: "2024-2028",
      semester: "Semester 1",
      section: "A",
      phone: "",
    });
  };

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.empId) return;
    addFaculty(newFaculty);
    setShowAddFacultyModal(false);
    setNewFaculty({
      name: "",
      empId: "",
      dept: "CSE",
      designation: "Assistant Professor",
      phone: "",
      assignedCourses: "",
    });
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.details) return;
    addNotice(newNotice);
    setShowBroadcastModal(false);
    setNewNotice({ title: "", details: "", target: "All", urgent: false });
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    if (deptFilter !== "ALL" && s.dept !== deptFilter) return false;
    if (
      searchTerm &&
      !s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !s.regNo.includes(searchTerm)
    )
      return false;
    return true;
  });

  // Filtered Faculty
  const filteredFaculty = faculty.filter((f) => {
    if (deptFilter !== "ALL" && f.dept !== deptFilter) return false;
    if (
      searchTerm &&
      !f.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !f.empId.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="animate-fadeIn" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── HEADER BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          borderRadius: "24px",
          padding: "26px 32px",
          background: isDark
            ? "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(15,23,42,0.95) 50%, rgba(17,24,39,0.9) 100%)"
            : "linear-gradient(135deg, #dcfce7 0%, #ffffff 60%, #e0f2fe 100%)",
          border: isDark ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(16,185,129,0.2)",
          boxShadow: isDark ? "0 12px 36px rgba(0,0,0,0.5)" : "0 12px 30px rgba(16,185,129,0.08)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "18px",
                background: "linear-gradient(135deg, #10b981, #0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                fontWeight: 800,
                boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  SSEC Institutional Administration
                </h1>
                <span className="badge badge-success" style={{ fontWeight: 700 }}>
                  Central Control
                </span>
              </div>
              <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>
                {todayStr} • Sri Shanmugha College of Engineering & Technology
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 14px", gap: 6, background: "#10b981" }}
            >
              <UserPlus size={15} /> Add Student
            </button>
            <button
              onClick={() => setShowAddFacultyModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 14px", gap: 6, background: "#0ea5e9" }}
            >
              <UserCog size={15} /> Add Faculty
            </button>
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "10px", padding: "8px 14px", gap: 6 }}
            >
              <Bell size={15} /> Broadcast Notice
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 1. EXECUTIVE METRICS BAR ── */}
      <div className="dashboard-grid">
        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Total Students</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 6 }}>
            {students.length}
          </div>
          <span style={{ fontSize: 11.5, color: "#10b981", fontWeight: 700 }}>Enrolled Across 6 Departments</span>
        </div>

        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Faculty Members</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(14,165,233,0.12)", color: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 6 }}>
            {faculty.length}
          </div>
          <span style={{ fontSize: 11.5, color: "#0ea5e9", fontWeight: 700 }}>Teaching & Research Staff</span>
        </div>

        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Academic Departments</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.12)", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 6 }}>
            6
          </div>
          <span style={{ fontSize: 11.5, color: "#6366f1", fontWeight: 700 }}>CSE, ECE, MECH, IT, CIVIL, MBA</span>
        </div>

        <div className="glass-card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>Campus Circulars</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.12)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 6 }}>
            {notices.length}
          </div>
          <span style={{ fontSize: 11.5, color: "#f59e0b", fontWeight: 700 }}>Active Announcements</span>
        </div>
      </div>

      {/* ── TAB SELECTOR: STUDENTS / FACULTY / NOTICES ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: 8,
        }}
      >
        {[
          { key: "students", label: `Students Directory (${students.length})`, icon: GraduationCap },
          { key: "faculty", label: `Faculty Directory (${faculty.length})`, icon: Users },
          { key: "notices", label: `Announcements (${notices.length})`, icon: Bell },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSearchTerm("");
            }}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.key ? "2px solid #10b981" : "2px solid transparent",
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              color: activeTab === tab.key ? "#10b981" : "var(--text-tertiary)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s ease",
            }}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 2. STUDENT DIRECTORY & DETAILS ── */}
      {activeTab === "students" && (
        <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Controls Bar: Search & Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--text-tertiary)" }} />
                <input
                  type="text"
                  placeholder="Search by Name or Reg No..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "7px 12px 7px 30px",
                    borderRadius: 8,
                    border: "1px solid var(--border-color)",
                    background: isDark ? "#1e293b" : "#f8fafc",
                    color: "var(--text-primary)",
                    fontSize: 12.5,
                    width: 220,
                  }}
                />
              </div>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                style={{
                  padding: "7px 10px",
                  borderRadius: 8,
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
            </div>

            <button
              onClick={() => setShowAddStudentModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 8, gap: 6, background: "#10b981" }}
            >
              <Plus size={14} /> Add New Student
            </button>
          </div>

          {/* Student Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                  <th style={{ padding: "10px 12px" }}>Student Name</th>
                  <th style={{ padding: "10px 12px" }}>Register Number</th>
                  <th style={{ padding: "10px 12px" }}>Department & Batch</th>
                  <th style={{ padding: "10px 12px" }}>Semester & Sec</th>
                  <th style={{ padding: "10px 12px" }}>Contact</th>
                  <th style={{ padding: "10px 12px" }}>Account Status</th>
                  <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{s.name}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)", fontFamily: "monospace" }}>{s.regNo}</td>
                    <td style={{ padding: "12px" }}>
                      <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 700 }}>
                        {s.dept} • {s.batch}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>{s.semester} (Sec {s.section})</td>
                    <td style={{ padding: "12px", color: "var(--text-tertiary)", fontSize: 12 }}>{s.phone}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        className="badge"
                        style={{
                          background: s.status === "ACTIVE" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
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
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                          border: "1px solid var(--border-color)",
                          background: s.status === "ACTIVE" ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
                          color: s.status === "ACTIVE" ? "#ef4444" : "#10b981",
                        }}
                      >
                        {s.status === "ACTIVE" ? "Block" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 3. FACULTY DIRECTORY & DETAILS ── */}
      {activeTab === "faculty" && (
        <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              Faculty Ledger & Department Workload
            </h3>
            <button
              onClick={() => setShowAddFacultyModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 8, gap: 6, background: "#0ea5e9" }}
            >
              <Plus size={14} /> Add Faculty
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", textAlign: "left", color: "var(--text-tertiary)" }}>
                  <th style={{ padding: "10px 12px" }}>Faculty Name</th>
                  <th style={{ padding: "10px 12px" }}>Employee ID</th>
                  <th style={{ padding: "10px 12px" }}>Department</th>
                  <th style={{ padding: "10px 12px" }}>Designation</th>
                  <th style={{ padding: "10px 12px" }}>Assigned Courses</th>
                  <th style={{ padding: "10px 12px" }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((f) => (
                  <tr key={f.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{f.name}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)", fontFamily: "monospace" }}>{f.empId}</td>
                    <td style={{ padding: "12px", fontWeight: 700, color: "#0ea5e9" }}>{f.dept}</td>
                    <td style={{ padding: "12px" }}>
                      <span className="badge" style={{ background: "rgba(14,165,233,0.12)", color: "#0ea5e9" }}>
                        {f.designation}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{f.assignedCourses}</td>
                    <td style={{ padding: "12px", color: "var(--text-tertiary)", fontSize: 12 }}>{f.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 4. NOTICES BOARD ── */}
      {activeTab === "notices" && (
        <div className="glass-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              Campus Circulars & Broadcast Log
            </h3>
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 8, gap: 6 }}
            >
              <Send size={14} /> New Notice
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {notices.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: n.urgent ? "rgba(239,68,68,0.06)" : isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                  border: `1px solid ${n.urgent ? "rgba(239,68,68,0.25)" : "var(--border-color)"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{n.title}</strong>
                    <span className="badge" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: 10 }}>
                      Target: {n.target}
                    </span>
                    {n.urgent && <span className="badge badge-danger" style={{ fontSize: 10 }}>Urgent</span>}
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "var(--text-secondary)" }}>{n.details}</p>
                </div>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: ADD STUDENT ── */}
      {showAddStudentModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <form onSubmit={handleCreateStudent} className="glass-card" style={{ width: "100%", maxWidth: 480, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Add New Student Record</h3>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Student Full Name</label>
              <input required type="text" placeholder="e.g. Rahul Krishnan" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Register Number</label>
                <input required type="text" placeholder="730424104055" value={newStudent.regNo} onChange={(e) => setNewStudent({ ...newStudent, regNo: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Department</label>
                <select value={newStudent.dept} onChange={(e) => setNewStudent({ ...newStudent, dept: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Batch</label>
                <input type="text" value={newStudent.batch} onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Phone Contact</label>
                <input type="text" placeholder="+91 98765 00000" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => setShowAddStudentModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 8, background: "#10b981" }}>Save Student</button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL: ADD FACULTY ── */}
      {showAddFacultyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <form onSubmit={handleCreateFaculty} className="glass-card" style={{ width: "100%", maxWidth: 480, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Add Faculty Member</h3>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Faculty Name</label>
              <input required type="text" placeholder="Dr. S. Karthikeyan" value={newFaculty.name} onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Employee ID</label>
                <input required type="text" placeholder="EMP-CSE-012" value={newFaculty.empId} onChange={(e) => setNewFaculty({ ...newFaculty, empId: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Department</label>
                <select value={newFaculty.dept} onChange={(e) => setNewFaculty({ ...newFaculty, dept: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Designation</label>
              <input type="text" placeholder="Associate Professor / Class Advisor" value={newFaculty.designation} onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Assigned Courses</label>
              <input type="text" placeholder="e.g. CS8501 Theory of Computation" value={newFaculty.assignedCourses} onChange={(e) => setNewFaculty({ ...newFaculty, assignedCourses: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => setShowAddFacultyModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 8, background: "#0ea5e9" }}>Save Faculty</button>
            </div>
          </form>
        </div>
      )}

      {/* ── MODAL: BROADCAST NOTICE ── */}
      {showBroadcastModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
          <form onSubmit={handlePostNotice} className="glass-card" style={{ width: "100%", maxWidth: 480, padding: 24, borderRadius: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Publish Campus Circular</h3>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Circular Title</label>
              <input required type="text" placeholder="e.g. End Semester Practical Schedule" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Audience Target</label>
              <select value={newNotice.target} onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }}>
                <option value="All">All Campus Users</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty Only</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>Announcement Body</label>
              <textarea required rows={3} placeholder="Type the official message details..." value={newNotice.details} onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isDark ? "#1e293b" : "#fff", color: "var(--text-primary)", marginTop: 4 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => setShowBroadcastModal(false)} className="btn btn-secondary btn-sm" style={{ borderRadius: 8 }}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: 8 }}>Publish Notice</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
