import React, { createContext, useContext, useState, useEffect } from "react";

const CampusDataContext = createContext(null);

const INITIAL_DATA = {
  students: [
    { id: "CS2022001", name: "Arjun Sharma", regNo: "730422104001", dept: "CSE", batch: "2022-2026", semester: "Semester 5", section: "A", cgpa: 8.72, attendance: 82.6, status: "ACTIVE", phone: "+91 98765 43210" },
    { id: "CS2022002", name: "Ananya Krishnan", regNo: "730422104002", dept: "CSE", batch: "2022-2026", semester: "Semester 5", section: "A", cgpa: 9.14, attendance: 91.2, status: "ACTIVE", phone: "+91 98765 43211" },
    { id: "CS2022003", name: "Vikram Patel", regNo: "730422104003", dept: "CSE", batch: "2022-2026", semester: "Semester 5", section: "B", cgpa: 7.20, attendance: 71.4, status: "ACTIVE", phone: "+91 98765 43212" },
    { id: "EC2023010", name: "Deepika Sundar", regNo: "730423106010", dept: "ECE", batch: "2023-2027", semester: "Semester 3", section: "A", cgpa: 8.40, attendance: 86.0, status: "ACTIVE", phone: "+91 98765 43213" },
    { id: "ME2021045", name: "Karthik Raja", regNo: "730421114045", dept: "MECH", batch: "2021-2025", semester: "Semester 7", section: "A", cgpa: 6.90, attendance: 68.4, status: "BLOCKED", phone: "+91 98765 43214" },
    { id: "IT2022022", name: "Pooja Venkatesh", regNo: "730422205022", dept: "IT", batch: "2022-2026", semester: "Semester 5", section: "A", cgpa: 8.90, attendance: 93.8, status: "ACTIVE", phone: "+91 98765 43215" },
  ],
  faculty: [
    { id: "F001", name: "Dr. Priya Lakshmi", empId: "EMP-CSE-001", dept: "CSE", designation: "Professor & HOD", phone: "+91 94440 12345", assignedCourses: "CS8502 DBMS" },
    { id: "F002", name: "Dr. Suresh Kumar", empId: "EMP-CSE-004", dept: "CSE", designation: "Associate Professor", phone: "+91 94440 12346", assignedCourses: "CS8501 Theory of Computation" },
    { id: "F003", name: "Prof. R. Ananth", empId: "EMP-ECE-002", dept: "ECE", designation: "Assistant Professor", phone: "+91 94440 12347", assignedCourses: "EC8392 Digital Electronics" },
    { id: "F004", name: "Dr. Meena Ramesh", empId: "EMP-IT-001", dept: "IT", designation: "Professor & HOD", phone: "+91 94440 12348", assignedCourses: "IT8501 Web Technology" },
  ],
  notices: [
    { id: "N1", title: "CIA-2 Question Paper Submission Deadline", details: "All department faculty must submit moderated question papers by Friday 5 PM.", target: "Faculty", date: "Today", urgent: true },
    { id: "N2", title: "Nov/Dec 2026 End Semester Exam Hall Ticket Release", details: "Students with >= 75% attendance can download barcoded tickets online.", target: "Students", date: "Yesterday", urgent: false },
    { id: "N3", title: "Annual Technical Symposium & Hackathon Registrations", details: "SSEC Innovate 2026 registrations are open for all department teams.", target: "All", date: "2 days ago", urgent: false },
  ],
  leaves: [
    { id: "LV-101", student: "Arjun Sharma", regNo: "730422104001", dept: "CSE", type: "Medical Leave", dates: "Nov 15 - Nov 17 (3 Days)", reason: "Hospitalization for viral fever. Medical fitness slip attached.", status: "PENDING_HOD", steps: ["Mentor Approved", "HOD Review", "Admin Final Sign"], proof: "discharge_slip.pdf" },
    { id: "LV-102", student: "Bhavana Reddy", regNo: "730422104004", dept: "CSE", type: "On-Duty (Sports)", dates: "Nov 17 - Nov 19 (3 Days)", reason: "Anna University Inter-Zonal Tournament representation.", status: "APPROVED", steps: ["Mentor Approved", "HOD Approved", "Admin Approved"], proof: "sports_invite.pdf" },
  ],
  feeRecord: {
    totalFee: 85000,
    paid: 70000,
    balance: 15000,
    dueDate: "Dec 15, 2026",
  },
  materials: [
    { id: "M1", title: "Unit 3 - Pushdown Automata & CFL Notes", subject: "CS8501 Theory of Computation", by: "Dr. Suresh Kumar", size: "4.2 MB", downloads: 58, date: "Nov 10, 2026" },
    { id: "M2", title: "Relational Algebra & Normalization Question Bank", subject: "CS8502 DBMS", by: "Dr. Priya Lakshmi", size: "1.8 MB", downloads: 64, date: "Nov 08, 2026" },
    { id: "M3", title: "PL/SQL Triggers and Cursors Lab Manual", subject: "CS8511 DBMS Lab", by: "Prof. Anitha", size: "3.5 MB", downloads: 62, date: "Nov 02, 2026" },
  ],
  assignments: [
    { id: "A1", title: "Turing Machine State Diagram Design", subject: "CS8501", deadline: "Nov 20, 2026", submitted: 54, total: 64, evaluated: 40 },
    { id: "A2", title: "Hospital Database Schema Normalization (3NF & BCNF)", subject: "CS8502", deadline: "Nov 24, 2026", submitted: 48, total: 64, evaluated: 12 },
  ],
  drives: [
    { id: "DRV1", company: "TCS Digital", role: "Systems Engineer Specialist", ctc: "7.5 LPA", minCgpa: 7.5, deadline: "Nov 25, 2026", applied: true, resumeStatus: "Shortlisted for Technical Round" },
    { id: "DRV2", company: "Google Cloud", role: "Cloud Support Associate", ctc: "12.0 LPA", minCgpa: 8.0, deadline: "Nov 30, 2026", applied: false, resumeStatus: "Eligible to Apply" },
    { id: "DRV3", company: "Zoho Corporation", role: "Software Developer", ctc: "8.4 LPA", minCgpa: 7.0, deadline: "Dec 05, 2026", applied: false, resumeStatus: "Eligible to Apply" },
  ]
};

export function CampusDataProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("ssec_campus_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse campus data from localStorage", e);
      }
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem("ssec_campus_data", JSON.stringify(data));
  }, [data]);

  // Admin Actions
  const addStudent = (student) => {
    setData((prev) => ({
      ...prev,
      students: [
        {
          id: `CS2026${String(prev.students.length + 1).padStart(3, "0")}`,
          status: "ACTIVE",
          cgpa: 0.0,
          attendance: 100.0,
          ...student,
        },
        ...prev.students,
      ],
    }));
  };

  const toggleStudentStatus = (id) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === id || s.regNo === id
          ? { ...s, status: s.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" }
          : s
      ),
    }));
  };

  const addFaculty = (facultyMember) => {
    setData((prev) => ({
      ...prev,
      faculty: [
        {
          id: `F00${prev.faculty.length + 1}`,
          ...facultyMember,
        },
        ...prev.faculty,
      ],
    }));
  };

  const addNotice = (notice) => {
    setData((prev) => ({
      ...prev,
      notices: [
        { id: `N${Date.now().toString().slice(-4)}`, date: "Just now", ...notice },
        ...prev.notices,
      ],
    }));
  };

  // Student & Faculty Actions
  const applyLeave = (leaveReq) => {
    setData((prev) => ({
      ...prev,
      leaves: [
        {
          id: `LV-${Date.now().toString().slice(-3)}`,
          status: "PENDING_MENTOR",
          steps: ["Under Mentor Review", "HOD Approval", "Admin Sign"],
          ...leaveReq,
        },
        ...prev.leaves,
      ],
    }));
  };

  const updateLeaveStatus = (id, newStatus) => {
    setData((prev) => ({
      ...prev,
      leaves: prev.leaves.map((l) =>
        l.id === id ? { ...l, status: newStatus } : l
      ),
    }));
  };

  const payFees = () => {
    setData((prev) => ({
      ...prev,
      feeRecord: {
        ...prev.feeRecord,
        paid: prev.feeRecord.totalFee,
        balance: 0,
      },
    }));
  };

  const uploadMaterial = (material) => {
    setData((prev) => ({
      ...prev,
      materials: [
        { id: `M${Date.now().toString().slice(-4)}`, downloads: 0, date: "Today", ...material },
        ...prev.materials,
      ],
    }));
  };

  const applyToDrive = (driveId) => {
    setData((prev) => ({
      ...prev,
      drives: prev.drives.map((d) =>
        d.id === driveId ? { ...d, applied: true, resumeStatus: "Application Submitted" } : d
      ),
    }));
  };

  return (
    <CampusDataContext.Provider
      value={{
        ...data,
        addStudent,
        toggleStudentStatus,
        addFaculty,
        addNotice,
        applyLeave,
        updateLeaveStatus,
        payFees,
        uploadMaterial,
        applyToDrive,
      }}
    >
      {children}
    </CampusDataContext.Provider>
  );
}

export function useCampusData() {
  const context = useContext(CampusDataContext);
  if (!context) {
    throw new Error("useCampusData must be used within a CampusDataProvider");
  }
  return context;
}
