// UniCore ERP — Rich Mock Data for all modules
// Production-like data for demonstrations

export const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin',
};

// Demo Users
export const DEMO_USERS = [
  {
    id: 'S001',
    name: 'Arjun Sharma',
    email: 'arjun@unicore.edu',
    password: 'student123',
    role: ROLES.STUDENT,
    avatar: 'AS',
    department: 'Computer Science',
    year: '3rd Year',
    regNo: 'CS2022001',
    section: 'A',
    phone: '+91 98765 43210',
    cgpa: 8.7,
    attendance: 82,
    fees_due: 15000,
  },
  {
    id: 'F001',
    name: 'Dr. Priya Lakshmi',
    email: 'priya@unicore.edu',
    password: 'faculty123',
    role: ROLES.FACULTY,
    avatar: 'PL',
    department: 'Computer Science',
    designation: 'Associate Professor',
    phone: '+91 87654 32109',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    experience: '12 years',
  },
  {
    id: 'A001',
    name: 'Rajesh Kumar',
    email: 'admin@unicore.edu',
    password: 'admin123',
    role: ROLES.ADMIN,
    avatar: 'RK',
    designation: 'System Administrator',
    phone: '+91 76543 21098',
  },
];

// Dashboard Stats
export const ADMIN_STATS = {
  total_students: 4856,
  total_faculty: 312,
  total_departments: 18,
  total_courses: 164,
  active_sessions: 48,
  pending_requests: 23,
  fees_collected_month: 2845000,
  placements_this_year: 387,
};

export const STUDENT_STATS = {
  attendance: 82,
  cgpa: 8.7,
  pending_fees: 15000,
  upcoming_exams: 3,
  pending_assignments: 2,
  leave_balance: 8,
  placement_applications: 4,
};

// Students
export const STUDENTS = [
  { id: 'CS2022001', name: 'Arjun Sharma', dept: 'CSE', year: '3rd', section: 'A', cgpa: 8.7, attendance: 82, status: 'Active', avatar: 'AS', phone: '+91 98765 43210', email: 'arjun@unicore.edu' },
  { id: 'CS2022002', name: 'Ananya Krishnan', dept: 'CSE', year: '3rd', section: 'A', cgpa: 9.1, attendance: 91, status: 'Active', avatar: 'AK', phone: '+91 87654 32100', email: 'ananya@unicore.edu' },
  { id: 'CS2022003', name: 'Vikram Patel', dept: 'CSE', year: '3rd', section: 'B', cgpa: 7.8, attendance: 75, status: 'Active', avatar: 'VP', phone: '+91 76543 21000', email: 'vikram@unicore.edu' },
  { id: 'CS2022004', name: 'Sneha Reddy', dept: 'CSE', year: '3rd', section: 'B', cgpa: 8.2, attendance: 88, status: 'Active', avatar: 'SR', phone: '+91 65432 10000', email: 'sneha@unicore.edu' },
  { id: 'EC2022001', name: 'Karthik Raja', dept: 'ECE', year: '3rd', section: 'A', cgpa: 8.5, attendance: 79, status: 'Active', avatar: 'KR', phone: '+91 54321 00000', email: 'karthik@unicore.edu' },
  { id: 'EC2022002', name: 'Divya Menon', dept: 'ECE', year: '3rd', section: 'A', cgpa: 9.3, attendance: 95, status: 'Active', avatar: 'DM', phone: '+91 43210 99999', email: 'divya@unicore.edu' },
  { id: 'ME2022001', name: 'Rohan Gupta', dept: 'ME', year: '3rd', section: 'A', cgpa: 7.5, attendance: 68, status: 'Warning', avatar: 'RG', phone: '+91 32109 88888', email: 'rohan@unicore.edu' },
  { id: 'CS2021001', name: 'Preethi Kumar', dept: 'CSE', year: '4th', section: 'A', cgpa: 8.9, attendance: 85, status: 'Active', avatar: 'PK', phone: '+91 21098 77777', email: 'preethi@unicore.edu' },
];

// Faculty
export const FACULTY = [
  { id: 'F001', name: 'Dr. Priya Lakshmi', dept: 'CSE', designation: 'Associate Professor', subjects: ['DS', 'Algo', 'DBMS'], experience: 12, students: 180, avatar: 'PL', status: 'Active', email: 'priya@unicore.edu' },
  { id: 'F002', name: 'Prof. Ramesh Nair', dept: 'CSE', designation: 'Professor', subjects: ['OS', 'CN', 'TOC'], experience: 18, students: 210, avatar: 'RN', status: 'Active', email: 'ramesh@unicore.edu' },
  { id: 'F003', name: 'Dr. Meena Sundaram', dept: 'ECE', designation: 'Assistant Professor', subjects: ['Signals', 'VLSI'], experience: 7, students: 120, avatar: 'MS', status: 'Active', email: 'meena@unicore.edu' },
  { id: 'F004', name: 'Prof. Arjun Das', dept: 'ME', designation: 'Professor', subjects: ['Thermodynamics', 'Fluid Mechanics'], experience: 22, students: 90, avatar: 'AD', status: 'On Leave', email: 'arjun.d@unicore.edu' },
  { id: 'F005', name: 'Dr. Kavitha Rajan', dept: 'MBA', designation: 'Associate Professor', subjects: ['Marketing', 'HRM'], experience: 10, students: 85, avatar: 'KR', status: 'Active', email: 'kavitha@unicore.edu' },
];

// Departments
export const DEPARTMENTS = [
  { id: 1, name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Priya Lakshmi', students: 960, faculty: 48, courses: 32 },
  { id: 2, name: 'Electronics & Communication', code: 'ECE', hod: 'Prof. Ramesh Kumar', students: 720, faculty: 36, courses: 28 },
  { id: 3, name: 'Mechanical Engineering', code: 'ME', hod: 'Prof. Arjun Das', students: 640, faculty: 32, courses: 26 },
  { id: 4, name: 'Civil Engineering', code: 'CE', hod: 'Dr. Sunitha Patel', students: 480, faculty: 24, courses: 22 },
  { id: 5, name: 'Business Administration', code: 'MBA', hod: 'Dr. Kavitha Rajan', students: 360, faculty: 18, courses: 20 },
  { id: 6, name: 'Information Technology', code: 'IT', hod: 'Prof. Krishna Murthy', students: 480, faculty: 24, courses: 24 },
];

// Attendance Records
export const ATTENDANCE_RECORDS = [
  { subject: 'Data Structures', present: 38, total: 46, percent: 82.6, faculty: 'Dr. Priya Lakshmi', last: '2026-09-05' },
  { subject: 'Algorithms', present: 40, total: 44, percent: 90.9, faculty: 'Dr. Priya Lakshmi', last: '2026-09-06' },
  { subject: 'Database Systems', present: 32, total: 42, percent: 76.2, faculty: 'Prof. Ramesh Nair', last: '2026-09-07' },
  { subject: 'Operating Systems', present: 35, total: 45, percent: 77.8, faculty: 'Prof. Ramesh Nair', last: '2026-09-08' },
  { subject: 'Computer Networks', present: 28, total: 38, percent: 73.7, faculty: 'Dr. Meena Sundaram', last: '2026-09-04' },
];

// Timetable
export const TIMETABLE = {
  Monday: [
    { time: '9:00 - 10:00', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '10:00 - 11:00', subject: 'Algorithms', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '11:15 - 12:15', subject: 'Database Systems', room: 'CS-Lab1', faculty: 'Prof. Ramesh Nair', type: 'lab' },
    { time: '2:00 - 3:00', subject: 'Operating Systems', room: 'CS-202', faculty: 'Prof. Ramesh Nair', type: 'lecture' },
    { time: '3:00 - 4:00', subject: 'Computer Networks', room: 'CS-202', faculty: 'Dr. Meena Sundaram', type: 'lecture' },
  ],
  Tuesday: [
    { time: '9:00 - 10:00', subject: 'Algorithms', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '10:00 - 11:00', subject: 'Operating Systems', room: 'CS-201', faculty: 'Prof. Ramesh Nair', type: 'lecture' },
    { time: '11:15 - 1:15', subject: 'DS Lab', room: 'CS-Lab2', faculty: 'Dr. Priya Lakshmi', type: 'lab' },
    { time: '2:00 - 3:00', subject: 'Computer Networks', room: 'CS-202', faculty: 'Dr. Meena Sundaram', type: 'lecture' },
    { time: '3:00 - 4:00', subject: 'Database Systems', room: 'CS-202', faculty: 'Prof. Ramesh Nair', type: 'lecture' },
  ],
  Wednesday: [
    { time: '9:00 - 11:00', subject: 'Networks Lab', room: 'CS-Lab3', faculty: 'Dr. Meena Sundaram', type: 'lab' },
    { time: '11:15 - 12:15', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '2:00 - 3:00', subject: 'Algorithms', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '3:00 - 4:00', subject: 'Database Systems', room: 'CS-Lab1', faculty: 'Prof. Ramesh Nair', type: 'tutorial' },
  ],
  Thursday: [
    { time: '9:00 - 10:00', subject: 'Database Systems', room: 'CS-201', faculty: 'Prof. Ramesh Nair', type: 'lecture' },
    { time: '10:00 - 11:00', subject: 'Computer Networks', room: 'CS-201', faculty: 'Dr. Meena Sundaram', type: 'lecture' },
    { time: '11:15 - 1:15', subject: 'OS Lab', room: 'CS-Lab2', faculty: 'Prof. Ramesh Nair', type: 'lab' },
    { time: '2:00 - 4:00', subject: 'Project Work', room: 'CS-Project Lab', faculty: 'Dr. Priya Lakshmi', type: 'lab' },
  ],
  Friday: [
    { time: '9:00 - 10:00', subject: 'Operating Systems', room: 'CS-201', faculty: 'Prof. Ramesh Nair', type: 'lecture' },
    { time: '10:00 - 11:00', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Priya Lakshmi', type: 'lecture' },
    { time: '11:15 - 12:15', subject: 'Algorithms', room: 'CS-Lab1', faculty: 'Dr. Priya Lakshmi', type: 'tutorial' },
    { time: '2:00 - 3:00', subject: 'Computer Networks', room: 'CS-202', faculty: 'Dr. Meena Sundaram', type: 'lecture' },
    { time: '3:00 - 4:00', subject: 'Elective: ML Basics', room: 'CS-203', faculty: 'Dr. Kavitha Rajan', type: 'lecture' },
  ],
};

// Exam Results
export const EXAM_RESULTS = [
  { subject: 'Data Structures', internal: 43, external: 72, total: 115, max: 150, grade: 'A', result: 'Pass' },
  { subject: 'Algorithms', internal: 47, external: 78, total: 125, max: 150, grade: 'A+', result: 'Pass' },
  { subject: 'Database Systems', internal: 38, external: 64, total: 102, max: 150, grade: 'B+', result: 'Pass' },
  { subject: 'Operating Systems', internal: 40, external: 70, total: 110, max: 150, grade: 'A', result: 'Pass' },
  { subject: 'Computer Networks', internal: 35, external: 60, total: 95, max: 150, grade: 'B', result: 'Pass' },
];

// Upcoming Exams
export const UPCOMING_EXAMS = [
  { subject: 'Data Structures', date: '2026-09-20', time: '10:00 AM', room: 'Hall-A', type: 'End Semester', duration: '3 hrs' },
  { subject: 'Algorithms', date: '2026-09-22', time: '10:00 AM', room: 'Hall-B', type: 'End Semester', duration: '3 hrs' },
  { subject: 'Database Systems', date: '2026-09-25', time: '2:00 PM', room: 'Hall-A', type: 'End Semester', duration: '3 hrs' },
  { subject: 'Operating Systems', date: '2026-09-27', time: '10:00 AM', room: 'Hall-C', type: 'End Semester', duration: '3 hrs' },
];

// Fees
export const FEE_DETAILS = {
  total_fee: 85000,
  paid: 70000,
  due: 15000,
  due_date: '2026-10-15',
  breakdown: [
    { item: 'Tuition Fee', amount: 60000, status: 'Paid', date: '2026-06-01' },
    { item: 'Hostel Fee', amount: 24000, status: 'Partial', paid: 18000, due: 6000, date: '2026-06-01' },
    { item: 'Exam Fee', amount: 3000, status: 'Due', date: null },
    { item: 'Library Fee', amount: 1500, status: 'Due', date: null },
    { item: 'Lab Fee', amount: 4500, status: 'Paid', date: '2026-06-01' },
  ],
  payment_history: [
    { txn: 'TXN202600101', date: '2026-06-01', amount: 60000, mode: 'UPI', status: 'Success' },
    { txn: 'TXN202600102', date: '2026-06-15', amount: 18000, mode: 'Net Banking', status: 'Success' },
    { txn: 'TXN202600200', date: '2026-07-01', amount: 4500, mode: 'UPI', status: 'Success' },
  ],
};

// Events
export const EVENTS = [
  { id: 1, title: 'TechFest 2026', type: 'Technical', date: '2026-10-15', endDate: '2026-10-17', venue: 'Main Auditorium', organizer: 'CS Club', registrations: 340, maxReg: 500, status: 'Open', description: 'Annual technical festival with hackathons, coding competitions, and workshops.' },
  { id: 2, title: 'Cultural Night', type: 'Cultural', date: '2026-09-25', endDate: '2026-09-25', venue: 'Open Air Theatre', organizer: 'Student Council', registrations: 280, maxReg: 600, status: 'Open', description: 'Celebrate cultural diversity with music, dance, and drama performances.' },
  { id: 3, title: 'IEEE Workshop: IoT', type: 'Workshop', date: '2026-09-18', endDate: '2026-09-18', venue: 'CS Lab 1', organizer: 'IEEE Student Chapter', registrations: 45, maxReg: 50, status: 'Almost Full', description: 'Hands-on workshop on IoT using Raspberry Pi and Arduino.' },
  { id: 4, title: 'Placement Drive - TCS', type: 'Placement', date: '2026-09-30', endDate: '2026-09-30', venue: 'Placement Hall', organizer: 'Placement Cell', registrations: 120, maxReg: 200, status: 'Open', description: 'TCS campus placement for final year students.' },
  { id: 5, title: 'Blood Donation Camp', type: 'Social', date: '2026-10-02', endDate: '2026-10-02', venue: 'Ground Floor Lobby', organizer: 'NSS', registrations: 85, maxReg: 200, status: 'Open', description: 'Annual blood donation drive in collaboration with Red Cross.' },
];

// Clubs
export const CLUBS = [
  { id: 1, name: 'Computer Science Club', category: 'Technical', members: 145, lead: 'Arjun Sharma', faculty_advisor: 'Dr. Priya Lakshmi', events: 12, logo: '💻' },
  { id: 2, name: 'IEEE Student Chapter', category: 'Professional', members: 89, lead: 'Ananya Krishnan', faculty_advisor: 'Prof. Ramesh Nair', events: 8, logo: '⚡' },
  { id: 3, name: 'Photography Club', category: 'Cultural', members: 67, lead: 'Sneha Reddy', faculty_advisor: 'Dr. Kavitha Rajan', events: 15, logo: '📷' },
  { id: 4, name: 'Debate Club', category: 'Literary', members: 54, lead: 'Karthik Raja', faculty_advisor: 'Prof. Arjun Das', events: 10, logo: '🎙️' },
  { id: 5, name: 'Robotics Club', category: 'Technical', members: 78, lead: 'Vikram Patel', faculty_advisor: 'Dr. Meena Sundaram', events: 6, logo: '🤖' },
];

// Leave Applications
export const LEAVE_APPLICATIONS = [
  { id: 'L001', type: 'Medical Leave', from: '2026-09-10', to: '2026-09-12', days: 3, reason: 'Fever and medical checkup', status: 'Approved', applied: '2026-09-09', approver: 'Dr. Priya Lakshmi', docs: 'Medical Certificate.pdf' },
  { id: 'L002', type: 'OD (On Duty)', from: '2026-09-15', to: '2026-09-15', days: 1, reason: 'Hackathon at IIT Madras', status: 'Pending', applied: '2026-09-08', approver: null, docs: 'Invitation Letter.pdf' },
  { id: 'L003', type: 'Casual Leave', from: '2026-08-25', to: '2026-08-26', days: 2, reason: 'Family function', status: 'Rejected', applied: '2026-08-22', approver: 'Dr. Priya Lakshmi', docs: null },
  { id: 'L004', type: 'OD (On Duty)', from: '2026-08-10', to: '2026-08-10', days: 1, reason: 'Cultural competition at Anna University', status: 'Approved', applied: '2026-08-08', approver: 'Prof. Ramesh Nair', docs: 'Participation Certificate.pdf' },
];

// Placement Data
export const PLACEMENT_DATA = {
  stats: { placed: 387, offers: 512, avg_package: 6.8, highest_package: 32, companies_visited: 68, active_drives: 5 },
  top_recruiters: [
    { company: 'TCS', offers: 85, package: '3.5 LPA', logo: '🏢', status: 'Active Drive' },
    { company: 'Infosys', offers: 72, package: '4.0 LPA', logo: '🏢', status: 'Completed' },
    { company: 'Wipro', offers: 64, package: '3.5 LPA', logo: '🏢', status: 'Completed' },
    { company: 'Accenture', offers: 48, package: '4.5 LPA', logo: '🏢', status: 'Completed' },
    { company: 'Microsoft', offers: 8, package: '20.0 LPA', logo: '🖥️', status: 'Completed' },
    { company: 'Google', offers: 3, package: '32.0 LPA', logo: '🔍', status: 'Completed' },
  ],
  student_applications: [
    { company: 'TCS', role: 'Software Engineer', applied: '2026-09-01', status: 'Aptitude Cleared', round: 'Technical Interview' },
    { company: 'Amazon', role: 'SDE-1', applied: '2026-08-20', status: 'Under Review', round: 'Applied' },
    { company: 'Cognizant', role: 'Programmer Analyst', applied: '2026-08-15', status: 'Selected', round: 'Offer Received' },
  ],
};

// Notifications
export const NOTIFICATIONS = [
  { id: 1, title: 'Attendance Alert', message: 'Your Computer Networks attendance has fallen below 75%. Attend all upcoming classes to avoid detention.', type: 'warning', time: '2 hours ago', read: false, icon: '⚠️' },
  { id: 2, title: 'Exam Schedule Published', message: 'End semester examination schedule for Nov 2026 has been published. Check the examination portal for details.', type: 'info', time: '5 hours ago', read: false, icon: '📅' },
  { id: 3, title: 'Fee Due Reminder', message: 'Your hostel fee of ₹6,000 is due on October 15, 2026. Pay now to avoid late fee charges.', type: 'danger', time: '1 day ago', read: false, icon: '💰' },
  { id: 4, title: 'Leave Approved', message: 'Your medical leave application (L001) for Sep 10-12 has been approved by Dr. Priya Lakshmi.', type: 'success', time: '2 days ago', read: true, icon: '✅' },
  { id: 5, title: 'TCS Drive Registration', message: 'Campus placement drive by TCS is open for registration. Last date: September 25, 2026.', type: 'info', time: '3 days ago', read: true, icon: '🏢' },
  { id: 6, title: 'TechFest Registration Open', message: 'Register now for TechFest 2026. Early bird registration closes September 30.', type: 'info', time: '4 days ago', read: true, icon: '🎉' },
];

// Documents
export const DOCUMENT_REQUESTS = [
  { id: 'DOC001', type: 'Bonafide Certificate', purpose: 'Bank Loan', requested: '2026-09-01', status: 'Ready', available: '2026-09-05', ref: 'BON-2026-001' },
  { id: 'DOC002', type: 'Course Completion Certificate', purpose: 'Job Application', requested: '2026-08-20', status: 'Processing', available: null, ref: 'CCC-2026-001' },
  { id: 'DOC003', type: 'Transcript', purpose: 'Higher Studies Abroad', requested: '2026-08-10', status: 'Delivered', available: '2026-08-18', ref: 'TRN-2026-001' },
];

// Alumni
export const ALUMNI = [
  { id: 'AL001', name: 'Kavya Suresh', batch: '2020-2024', dept: 'CSE', company: 'Microsoft', role: 'Software Engineer', location: 'Bangalore', avatar: 'KS', linkedin: '#', package: '22 LPA' },
  { id: 'AL002', name: 'Arun Prakash', batch: '2019-2023', dept: 'ECE', company: 'Samsung R&D', role: 'Hardware Engineer', location: 'Noida', avatar: 'AP', linkedin: '#', package: '14 LPA' },
  { id: 'AL003', name: 'Deepika Nair', batch: '2020-2024', dept: 'MBA', company: 'Deloitte', role: 'Business Analyst', location: 'Chennai', avatar: 'DN', linkedin: '#', package: '10 LPA' },
  { id: 'AL004', name: 'Manoj Raj', batch: '2018-2022', dept: 'CSE', company: 'Google', role: 'Senior SDE', location: 'Hyderabad', avatar: 'MR', linkedin: '#', package: '45 LPA' },
  { id: 'AL005', name: 'Priya Venkat', batch: '2021-2025', dept: 'CSE', company: 'Zoho', role: 'Full Stack Developer', location: 'Chennai', avatar: 'PV', linkedin: '#', package: '8 LPA' },
];

// Monthly fee collection data for chart
export const FEE_CHART_DATA = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    { label: 'Collected (₹ Lakhs)', data: [28, 35, 42, 18, 22, 30], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true },
    { label: 'Target (₹ Lakhs)', data: [40, 40, 40, 25, 25, 35], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)', fill: false, borderDash: [5,5] },
  ],
};

// Attendance trend data
export const ATTENDANCE_CHART_DATA = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  CSE: [88, 85, 79, 82, 86, 84],
  ECE: [91, 88, 85, 87, 89, 90],
  ME: [75, 72, 68, 73, 71, 70],
  overall: [86, 83, 78, 81, 83, 82],
};

// Placement trend
export const PLACEMENT_CHART_DATA = {
  labels: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'],
  placed: [210, 265, 318, 356, 387],
  avg_package: [4.2, 5.1, 5.8, 6.3, 6.8],
};

// Chatbot FAQ / Training Data
export const CHATBOT_FAQ = [
  { q: 'What is my attendance?', a: 'Based on your records, your overall attendance is 82%. Data Structures: 82.6%, Algorithms: 90.9%, Database Systems: 76.2%, Operating Systems: 77.8%, Computer Networks: 73.7%. ⚠️ Your CN attendance is below 75% - please attend upcoming sessions.' },
  { q: 'When is my next exam?', a: '📅 Your next exam is **Data Structures** on September 20, 2026 at 10:00 AM in Hall-A (3 hours). After that: Algorithms (Sep 22), Database Systems (Sep 25), Operating Systems (Sep 27).' },
  { q: 'How much fees do I owe?', a: '💰 You have a pending fee of **₹15,000** due by October 15, 2026. This includes Hostel Fee balance: ₹6,000, Exam Fee: ₹3,000, and Library Fee: ₹1,500. You can pay via the Fees module.' },
  { q: 'What is my CGPA?', a: '🎓 Your current CGPA is **8.7** out of 10. Your highest grade this semester is A+ in Algorithms. Keep it up!' },
  { q: 'How to apply for leave?', a: 'To apply for leave: 1. Go to Leave & OD Management module 2. Click "Apply Leave" 3. Select leave type (Medical/Casual/OD) 4. Enter dates and reason 5. Upload supporting documents 6. Submit for faculty approval.' },
  { q: 'Show my timetable', a: '📅 Here is your today\'s schedule:\n• 9:00 - Data Structures (CS-201)\n• 10:00 - Algorithms (CS-201)\n• 11:15 - DB Lab (CS-Lab1)\n• 2:00 - Operating Systems (CS-202)\n• 3:00 - Computer Networks (CS-202)' },
  { q: 'Placement updates', a: '🏢 **Active Placement Drives:**\n• TCS - Software Engineer (Register by Sep 25)\n• Infosys - Systems Engineer (Ongoing)\n\n**Your Applications:**\n• Cognizant - ✅ Offer Received (Programmer Analyst)\n• TCS - 🔄 Technical Interview round\n• Amazon - 📋 Under Review' },
  { q: 'What clubs can I join?', a: '🎯 **Active Clubs:**\n• CS Club (145 members) - Technical\n• IEEE Student Chapter (89 members) - Professional\n• Photography Club (67 members) - Cultural\n• Robotics Club (78 members) - Technical\n• Debate Club (54 members) - Literary\n\nVisit Events & Clubs module to register.' },
];

// Chatbot Intents
export const CHATBOT_INTENTS = {
  attendance: ['attendance', 'present', 'absent', 'proxy', 'bunked', 'حضور'],
  exam: ['exam', 'test', 'schedule', 'hall ticket', 'result', 'marks', 'grade', 'cgpa', 'தேர்வு'],
  fees: ['fee', 'payment', 'due', 'pending', 'pay', 'receipt', 'கட்டணம்'],
  timetable: ['timetable', 'schedule', 'class', 'lecture', 'lab', 'period', 'time table'],
  leave: ['leave', 'od', 'absent', 'sick', 'apply leave', 'விடுப்பு'],
  placement: ['placement', 'job', 'company', 'internship', 'drive', 'offer'],
  cgpa: ['cgpa', 'gpa', 'marks', 'performance', 'grade', 'result'],
  clubs: ['club', 'event', 'fest', 'activity', 'cultural'],
};
