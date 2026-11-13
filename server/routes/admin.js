import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// ── In-Memory State for Standalone Development & Verification ──
let auditLogs = [
  { id: 'LOG-101', action: 'LOGIN', entity: 'Auth', entityId: 'A001', performedBy: 'Rajesh Kumar (Admin)', ipAddress: '192.168.1.45', details: 'Successful administrative login', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 'LOG-102', action: 'GRADE_LOCKED', entity: 'Examination', entityId: 'EX-2026-NOV', performedBy: 'Rajesh Kumar (Admin)', ipAddress: '192.168.1.45', details: 'Semester 5 CS8501 Grades locked for result processing', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: 'LOG-103', action: 'STUDENT_STATUS_UPDATED', entity: 'Student', entityId: 'CS2022003', performedBy: 'Rajesh Kumar (Admin)', ipAddress: '192.168.1.45', details: 'Student account status toggled to ACTIVE', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 'LOG-104', action: 'FEE_FINE_CONFIGURED', entity: 'FeeManagement', entityId: 'FEE-2026', performedBy: 'Rajesh Kumar (Admin)', ipAddress: '192.168.1.45', details: 'Daily overdue fine set to ₹50/day post due date', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 'LOG-105', action: 'TIMETABLE_SLOT_ALLOCATED', entity: 'Timetable', entityId: 'TT-CSE-3A', performedBy: 'Rajesh Kumar (Admin)', ipAddress: '192.168.1.45', details: 'CS8502 allocated to Lab 3 without conflict', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString() },
];

let students = [
  { id: 'CS2022001', name: 'Arjun Sharma', regNo: '730422104001', dept: 'CSE', batch: '2022-2026', year: 3, section: 'A', cgpa: 8.7, attendance: 82.6, status: 'ACTIVE', phone: '+91 98765 43210' },
  { id: 'CS2022002', name: 'Ananya Krishnan', regNo: '730422104002', dept: 'CSE', batch: '2022-2026', year: 3, section: 'A', cgpa: 9.1, attendance: 91.2, status: 'ACTIVE', phone: '+91 98765 43211' },
  { id: 'CS2022003', name: 'Vikram Patel', regNo: '730422104003', dept: 'CSE', batch: '2022-2026', year: 3, section: 'B', cgpa: 7.8, attendance: 73.5, status: 'ACTIVE', phone: '+91 98765 43212' },
  { id: 'EC2023010', name: 'Deepika Sundar', regNo: '730423106010', dept: 'ECE', batch: '2023-2027', year: 2, section: 'A', cgpa: 8.4, attendance: 86.0, status: 'ACTIVE', phone: '+91 98765 43213' },
  { id: 'ME2021045', name: 'Karthik Raja', regNo: '730421114045', dept: 'MECH', batch: '2021-2025', year: 4, section: 'A', cgpa: 6.9, attendance: 68.4, status: 'BLOCKED', phone: '+91 98765 43214' },
  { id: 'IT2022022', name: 'Pooja Venkatesh', regNo: '730422205022', dept: 'IT', batch: '2022-2026', year: 3, section: 'A', cgpa: 8.9, attendance: 93.8, status: 'ACTIVE', phone: '+91 98765 43215' },
];

let facultyList = [
  { id: 'F001', name: 'Dr. Priya Lakshmi', empId: 'EMP-CSE-001', dept: 'CSE', designation: 'Professor & HOD', isHod: true, isMentor: false, workloadHours: 14, maxHours: 18, email: 'priya@unicore.edu', phone: '+91 94440 12345' },
  { id: 'F002', name: 'Dr. Suresh Kumar', empId: 'EMP-CSE-004', dept: 'CSE', designation: 'Associate Professor', isHod: false, isMentor: true, workloadHours: 18, maxHours: 20, email: 'suresh@unicore.edu', phone: '+91 94440 12346' },
  { id: 'F003', name: 'Prof. R. Ananth', empId: 'EMP-ECE-002', dept: 'ECE', designation: 'Assistant Professor', isHod: false, isMentor: true, workloadHours: 16, maxHours: 20, email: 'ananth@unicore.edu', phone: '+91 94440 12347' },
  { id: 'F004', name: 'Dr. Meena Ramesh', empId: 'EMP-IT-001', dept: 'IT', designation: 'Professor & HOD', isHod: true, isMentor: false, workloadHours: 12, maxHours: 18, email: 'meena@unicore.edu', phone: '+91 94440 12348' },
];

let departments = [
  { id: 'D01', code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. Priya Lakshmi', studentsCount: 1420, facultyCount: 68, regulation: 'R2024' },
  { id: 'D02', code: 'ECE', name: 'Electronics & Communication Engg', hod: 'Dr. N. Murugan', studentsCount: 1150, facultyCount: 54, regulation: 'R2024' },
  { id: 'D03', code: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. K. Ravichandran', studentsCount: 780, facultyCount: 42, regulation: 'R2021' },
  { id: 'D04', code: 'IT', name: 'Information Technology', hod: 'Dr. Meena Ramesh', studentsCount: 840, facultyCount: 38, regulation: 'R2024' },
  { id: 'D05', code: 'CIVIL', name: 'Civil Engineering', hod: 'Dr. S. Balaji', studentsCount: 520, facultyCount: 30, regulation: 'R2021' },
  { id: 'D06', code: 'MBA', name: 'Department of Management Studies', hod: 'Dr. V. Gomathi', studentsCount: 538, facultyCount: 22, regulation: 'R2024' },
];

let escalatedLeaves = [
  { id: 'LV-901', applicant: 'Arjun Sharma (CS2022001)', role: 'STUDENT', dept: 'CSE', type: 'Medical Leave', from: '2026-11-15', to: '2026-11-20', days: 5, reason: 'Typhoid hospitalization. Medical discharge summary attached.', status: 'PENDING_ADMIN', mentorRemark: 'Recommended by Mentor Dr. Suresh Kumar' },
  { id: 'LV-902', applicant: 'Prof. R. Ananth', role: 'FACULTY', dept: 'ECE', type: 'On-Duty (Conference)', from: '2026-11-18', to: '2026-11-21', days: 4, reason: 'IEEE International Conference Paper Presentation at IISc Bangalore.', status: 'PENDING_ADMIN', mentorRemark: 'Endorsed by HOD' },
];

let placementDrives = [
  { id: 'DRV-01', company: 'TCS Digital', role: 'System Engineer Specialist', packageLpa: 7.5, driveDate: '2026-11-25', minCgpa: 7.5, allowedDepts: ['CSE', 'IT', 'ECE'], maxBacklogs: 0, eligibleCount: 248, status: 'OPEN' },
  { id: 'DRV-02', company: 'Zoho Corporation', role: 'Software Development Engineer', packageLpa: 8.4, driveDate: '2026-12-05', minCgpa: 7.0, allowedDepts: ['CSE', 'IT', 'ECE', 'MECH'], maxBacklogs: 1, eligibleCount: 380, status: 'UPCOMING' },
];

let timetableSlots = [
  { id: 'TT-01', day: 'Monday', period: 1, dept: 'CSE', year: 3, section: 'A', room: 'LH-301', course: 'CS8501 Theory of Computation', faculty: 'Dr. Suresh Kumar' },
  { id: 'TT-02', day: 'Monday', period: 2, dept: 'CSE', year: 3, section: 'A', room: 'LH-301', course: 'CS8502 Database Systems', faculty: 'Prof. Anitha' },
  { id: 'TT-03', day: 'Monday', period: 3, dept: 'CSE', year: 3, section: 'A', room: 'LAB-03', course: 'CS8511 DBMS Laboratory', faculty: 'Prof. Anitha', isLab: true },
];

let rbacMatrix = {
  ADMIN: { canRead: true, canWrite: true, canDelete: true, canApprove: true },
  HOD: { canRead: true, canWrite: true, canDelete: false, canApprove: true },
  FACULTY: { canRead: true, canWrite: true, canDelete: false, canApprove: false },
  STUDENT: { canRead: true, canWrite: false, canDelete: false, canApprove: false },
};

function logAudit(action, entity, entityId, details, performedBy = 'Rajesh Kumar (Admin)') {
  auditLogs.unshift({
    id: `LOG-${Date.now().toString().slice(-4)}`,
    action,
    entity,
    entityId,
    performedBy,
    ipAddress: '192.168.1.45',
    details,
    timestamp: new Date().toISOString(),
  });
}

// ── 1. Executive Analytics Endpoint ──
router.get('/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      metrics: {
        totalStudents: 5248,
        activeFaculty: 312,
        departments: 18,
        campusStaff: 95,
        studentGrowthPct: 12.4,
        facultyRecruitedPct: 5.2,
      },
      attendance: {
        overall: 84.8,
        threshold: 75.0,
        defaultersCount: 142,
        deptWise: [
          { dept: 'CSE', percentage: 89.2, total: 1420, presentToday: 1266 },
          { dept: 'IT', percentage: 92.0, total: 840, presentToday: 773 },
          { dept: 'ECE', percentage: 85.4, total: 1150, presentToday: 982 },
          { dept: 'CIVIL', percentage: 81.3, total: 520, presentToday: 423 },
          { dept: 'MECH', percentage: 78.6, total: 780, presentToday: 613 },
          { dept: 'MBA', percentage: 86.5, total: 538, presentToday: 465 },
        ],
      },
      fees: {
        totalDemand: 55000000,   // ₹5.50 Cr
        totalCollected: 48150000,// ₹4.82 Cr
        pendingAmount: 6850000,  // ₹68.5 L
        collectionRate: 87.5,
        defaultersCount: 94,
        breakdown: [
          { category: 'Tuition Fee', collected: 36000000, pending: 4200000 },
          { category: 'Bus Transport', collected: 6200000, pending: 1100000 },
          { category: 'Hostel & Mess', collected: 4950000, pending: 1350000 },
          { category: 'Exam & Lab Fee', collected: 1000000, pending: 200000 },
        ],
        monthlyTrend: [
          { month: 'Jun', amount: 8500000 },
          { month: 'Jul', amount: 16200000 },
          { month: 'Aug', amount: 12400000 },
          { month: 'Sep', amount: 6800000 },
          { month: 'Oct', amount: 4250000 },
        ],
      },
    },
  });
});

// ── 2. Student Management ──
router.get('/students', (req, res) => {
  const { dept, batch, status, search } = req.query;
  let filtered = [...students];

  if (dept && dept !== 'ALL') filtered = filtered.filter(s => s.dept === dept);
  if (batch && batch !== 'ALL') filtered = filtered.filter(s => s.batch === batch);
  if (status && status !== 'ALL') filtered = filtered.filter(s => s.status === status);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.regNo.includes(q) || s.id.toLowerCase().includes(q));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

router.post('/students/bulk-upload', (req, res) => {
  const { studentList } = req.body;
  if (!Array.isArray(studentList) || studentList.length === 0) {
    return res.status(400).json({ success: false, message: 'Valid student records array is required.' });
  }

  const added = [];
  studentList.forEach((s, idx) => {
    const newStudent = {
      id: s.id || `CS2026${String(students.length + idx + 1).padStart(3, '0')}`,
      name: s.name,
      regNo: s.regNo || `730426${String(students.length + idx + 1).padStart(6, '0')}`,
      dept: s.dept || 'CSE',
      batch: s.batch || '2026-2030',
      year: parseInt(s.year || 1, 10),
      section: s.section || 'A',
      cgpa: parseFloat(s.cgpa || 0.0),
      attendance: 100.0,
      status: 'ACTIVE',
      phone: s.phone || '+91 99999 00000',
    };
    students.unshift(newStudent);
    added.push(newStudent);
  });

  logAudit('STUDENT_BULK_UPLOAD', 'Student', `${added.length} Records`, `Imported ${added.length} students via CSV Batch upload.`);
  res.json({ success: true, message: `Successfully ingested ${added.length} students into the database.`, data: added });
});

router.patch('/students/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const target = students.find(s => s.id === id || s.regNo === id);

  if (!target) return res.status(404).json({ success: false, message: 'Student not found.' });

  const oldStatus = target.status;
  target.status = status;
  logAudit('STUDENT_STATUS_UPDATED', 'Student', target.id, `Status modified from ${oldStatus} to ${status}`);

  res.json({ success: true, message: `Student status updated to ${status}`, student: target });
});

// ── 3. Faculty Management & Workload ──
router.get('/faculty', (req, res) => {
  res.json({ success: true, data: facultyList });
});

router.patch('/faculty/:id', (req, res) => {
  const { id } = req.params;
  const { designation, workloadHours, isHod, isMentor, dept } = req.body;
  const target = facultyList.find(f => f.id === id || f.empId === id);

  if (!target) return res.status(404).json({ success: false, message: 'Faculty member not found.' });

  if (designation !== undefined) target.designation = designation;
  if (workloadHours !== undefined) target.workloadHours = Number(workloadHours);
  if (isHod !== undefined) target.isHod = Boolean(isHod);
  if (isMentor !== undefined) target.isMentor = Boolean(isMentor);
  if (dept !== undefined) target.dept = dept;

  logAudit('FACULTY_WORKLOAD_MODIFIED', 'Faculty', target.id, `Updated workload/designation: ${target.designation}, ${target.workloadHours} hrs/wk`);
  res.json({ success: true, message: 'Faculty profile updated successfully.', data: target });
});

// ── 4. Department & Regulation Setup ──
router.get('/departments', (req, res) => {
  res.json({ success: true, data: departments });
});

router.post('/departments', (req, res) => {
  const { code, name, hod, regulation } = req.body;
  if (!code || !name) return res.status(400).json({ success: false, message: 'Code and Name required' });

  const newDept = {
    id: `D${String(departments.length + 1).padStart(2, '0')}`,
    code: code.toUpperCase(),
    name,
    hod: hod || 'To be assigned',
    studentsCount: 0,
    facultyCount: 0,
    regulation: regulation || 'R2024',
  };

  departments.push(newDept);
  logAudit('DEPARTMENT_CREATED', 'Department', newDept.code, `New academic department ${newDept.name} initialized with ${newDept.regulation}`);
  res.json({ success: true, message: 'Department created successfully.', data: newDept });
});

// ── 5. Master Timetable Conflict Solver ──
router.post('/timetable/check-conflict', (req, res) => {
  const { day, period, room, faculty, dept, year, section } = req.body;

  // Check room conflict
  const roomConflict = timetableSlots.find(
    s => s.day === day && s.period === parseInt(period, 10) && s.room.toLowerCase() === room.toLowerCase()
  );

  if (roomConflict) {
    return res.json({
      success: false,
      conflict: true,
      type: 'ROOM_CONFLICT',
      message: `Collision Detected: Room ${room} is already booked for ${roomConflict.course} (${roomConflict.dept} Yr-${roomConflict.year}) during Period ${period} on ${day}.`,
    });
  }

  // Check faculty conflict
  const facultyConflict = timetableSlots.find(
    s => s.day === day && s.period === parseInt(period, 10) && s.faculty.toLowerCase() === faculty.toLowerCase()
  );

  if (facultyConflict) {
    return res.json({
      success: false,
      conflict: true,
      type: 'FACULTY_CONFLICT',
      message: `Schedule Clash: ${faculty} is already teaching ${facultyConflict.course} in ${facultyConflict.room} during Period ${period} on ${day}.`,
    });
  }

  res.json({
    success: true,
    conflict: false,
    message: `Slot Available: Room ${room} and ${faculty} have zero schedule collisions for ${day} Period ${period}.`,
  });
});

// ── 6. Leave & OD Final Approvals ──
router.get('/leaves/escalated', (req, res) => {
  res.json({ success: true, data: escalatedLeaves });
});

router.patch('/leaves/:id/approval', (req, res) => {
  const { id } = req.params;
  const { decision, remarks } = req.body; // 'APPROVED' or 'REJECTED'

  const target = escalatedLeaves.find(l => l.id === id);
  if (!target) return res.status(404).json({ success: false, message: 'Leave record not found.' });

  target.status = decision === 'APPROVED' ? 'APPROVED' : 'REJECTED';
  target.adminRemarks = remarks || 'Decision finalized by Executive Admin';

  logAudit(`LEAVE_${decision}`, 'LeaveRequest', target.id, `Escalated application for ${target.applicant} was ${decision}`);
  res.json({ success: true, message: `Application ${decision.toLowerCase()} successfully.`, data: target });
});

// ── 7. Fee Management & Defaulters Export ──
router.get('/fees/defaulters', (req, res) => {
  const defaulters = [
    { regNo: '730421114045', name: 'Karthik Raja', dept: 'MECH', batch: '2021-2025', pendingFee: 45000, fine: 1500, daysOverdue: 30, phone: '+91 98765 43214' },
    { regNo: '730422104003', name: 'Vikram Patel', dept: 'CSE', batch: '2022-2026', pendingFee: 22000, fine: 600, daysOverdue: 12, phone: '+91 98765 43212' },
    { regNo: '730423106044', name: 'Siddharth M', dept: 'ECE', batch: '2023-2027', pendingFee: 65000, fine: 2250, daysOverdue: 45, phone: '+91 98765 43219' },
  ];
  res.json({ success: true, count: defaulters.length, data: defaulters });
});

// ── 8. Placement & Examination Center ──
router.get('/placements/drives', (req, res) => {
  res.json({ success: true, data: placementDrives });
});

router.post('/placements/drives', (req, res) => {
  const { company, role, packageLpa, driveDate, minCgpa, allowedDepts, maxBacklogs } = req.body;

  const eligibleCount = students.filter(
    s => s.cgpa >= parseFloat(minCgpa) && (allowedDepts.includes(s.dept) || allowedDepts.includes('ALL'))
  ).length;

  const newDrive = {
    id: `DRV-0${placementDrives.length + 1}`,
    company,
    role,
    packageLpa: parseFloat(packageLpa),
    driveDate,
    minCgpa: parseFloat(minCgpa),
    allowedDepts,
    maxBacklogs: parseInt(maxBacklogs || 0, 10),
    eligibleCount,
    status: 'OPEN',
  };

  placementDrives.unshift(newDrive);
  logAudit('PLACEMENT_DRIVE_POSTED', 'Placement', newDrive.id, `Campus drive for ${company} (${packageLpa} LPA) posted. ${eligibleCount} students eligible.`);
  res.json({ success: true, message: 'Campus placement drive scheduled.', data: newDrive });
});

router.post('/exams/grade-lock', (req, res) => {
  const { semester, department, examSession } = req.body;
  logAudit('GRADE_LOCK_ENFORCED', 'Examination', `${department}-${semester}`, `End-sem grades permanently locked for ${department} Sem ${semester} (${examSession}) and results queued for publication.`);
  res.json({
    success: true,
    message: `Grades successfully locked for ${department || 'All Departments'} Sem ${semester}. Results published to student portals and SMS dispatch triggered.`,
  });
});

// ── 9. System Settings & Audit Logs ──
router.get('/audit-logs', (req, res) => {
  res.json({ success: true, total: auditLogs.length, data: auditLogs });
});

router.get('/rbac', (req, res) => {
  res.json({ success: true, data: rbacMatrix });
});

router.patch('/rbac', (req, res) => {
  const { role, permissions } = req.body;
  if (rbacMatrix[role]) {
    rbacMatrix[role] = { ...rbacMatrix[role], ...permissions };
    logAudit('RBAC_UPDATED', 'Security', role, `Permissions updated for role ${role}`);
    return res.json({ success: true, message: `Permissions updated for ${role}`, data: rbacMatrix[role] });
  }
  res.status(404).json({ success: false, message: 'Role not found' });
});

export default router;

