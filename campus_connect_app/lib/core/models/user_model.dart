class UserModel {
  final String id;
  final String name;
  final String email;
  final String password;
  final String role;
  final String avatar;
  final String? department;
  final String? year;
  final String? regNo;
  final String? section;
  final String? phone;
  final double? cgpa;
  final int? attendance;
  final double? feesDue;
  final String? designation;

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.role,
    required this.avatar,
    this.department,
    this.year,
    this.regNo,
    this.section,
    this.phone,
    this.cgpa,
    this.attendance,
    this.feesDue,
    this.designation,
  });
}

class MockData {
  static const List<UserModel> demoUsers = [
    UserModel(
      id: "S001",
      name: "Arjun Sharma",
      email: "arjun@unicore.edu",
      password: "student123",
      role: "student",
      avatar: "AS",
      department: "Computer Science",
      year: "3rd Year",
      regNo: "CS2022001",
      section: "A",
      phone: "+91 98765 43210",
      cgpa: 8.7,
      attendance: 82,
      feesDue: 15000,
    ),
    UserModel(
      id: "F001",
      name: "Dr. Priya Lakshmi",
      email: "priya@unicore.edu",
      password: "faculty123",
      role: "faculty",
      avatar: "PL",
      department: "Computer Science",
      designation: "Associate Professor",
      phone: "+91 87654 32109",
    ),
    UserModel(
      id: "A001",
      name: "Rajesh Kumar",
      email: "admin@unicore.edu",
      password: "admin123",
      role: "admin",
      avatar: "RK",
      designation: "System Administrator",
      phone: "+91 76543 21098",
    ),
    UserModel(
      id: "P001",
      name: "Suresh Sharma",
      email: "parent@unicore.edu",
      password: "parent123",
      role: "parent",
      avatar: "SS",
      phone: "+91 65432 10987",
    ),
  ];

  static Map<String, dynamic> get adminStats => {
    "total_students": 4856,
    "total_faculty": 312,
    "total_departments": 18,
    "total_courses": 164,
    "active_sessions": 48,
    "pending_requests": 23,
    "fees_collected_month": 2845000,
    "placements_this_year": 387,
  };

  static Map<String, dynamic> get studentStats => {
    "attendance": 82,
    "cgpa": 8.7,
    "pending_fees": 15000,
    "completed_courses": 24,
    "upcoming_exams": 3,
    "assignments_due": 2,
  };

  static List<Map<String, dynamic>> get modules => [
    {"id": "attendance", "title": "Attendance", "icon": "calendar_today", "color": 0xFF22C55E},
    {"id": "fees", "title": "Fees & Payment", "icon": "payment", "color": 0xFF3B82F6},
    {"id": "timetable", "title": "Timetable", "icon": "schedule", "color": 0xFF8B5CF6},
    {"id": "results", "title": "Exam Results", "icon": "grade", "color": 0xFFF59E0B},
    {"id": "placement", "title": "Placement Portal", "icon": "work", "color": 0xFF06B6D4},
    {"id": "leave", "title": "Leave & OD", "icon": "event_busy", "color": 0xFFEC4899},
    {"id": "events", "title": "Events & Clubs", "icon": "celebration", "color": 0xFFF97316},
    {"id": "library", "title": "Digital Library", "icon": "library_books", "color": 0xFF14B8A6},
    {"id": "ai-study", "title": "AI Study Planner", "icon": "psychology", "color": 0xFF6366F1},
    {"id": "mock-interview", "title": "Mock Interview", "icon": "record_voice_over", "color": 0xFFEF4444},
    {"id": "blockchain", "title": "Blockchain Certs", "icon": "verified", "color": 0xFF0EA5E9},
    {"id": "digital-id", "title": "Digital Student ID", "icon": "badge", "color": 0xFF10B981},
    {"id": "notifications", "title": "Notifications", "icon": "notifications", "color": 0xFFF59E0B},
    {"id": "settings", "title": "Settings", "icon": "settings", "color": 0xFF6B7280},
    {"id": "reports", "title": "Reports & Analytics", "icon": "analytics", "color": 0xFF8B5CF6},
    {"id": "department", "title": "Department Mgmt", "icon": "apartment", "color": 0xFF22C55E},
    {"id": "faculty", "title": "Faculty Management", "icon": "people", "color": 0xFF3B82F6},
    {"id": "student", "title": "Student Management", "icon": "school", "color": 0xFF06B6D4},
    {"id": "ai-analytics", "title": "AI Analytics", "icon": "bar_chart", "color": 0xFF6366F1},
    {"id": "security", "title": "Security Center", "icon": "security", "color": 0xFFEF4444},
    {"id": "virtual-class", "title": "Virtual Classroom", "icon": "video_call", "color": 0xFF0EA5E9},
    {"id": "workflow", "title": "Workflow Automation", "icon": "account_tree", "color": 0xFFF97316},
    {"id": "parent-portal", "title": "Parent Portal", "icon": "family_restroom", "color": 0xFFEC4899},
    {"id": "alumni", "title": "Alumni Network", "icon": "groups", "color": 0xFF14B8A6},
    {"id": "documents", "title": "Document Requests", "icon": "folder_open", "color": 0xFF8B5CF6},
    {"id": "subscription", "title": "Subscription", "icon": "subscriptions", "color": 0xFFF59E0B},
    {"id": "audit-logs", "title": "Audit Logs", "icon": "history", "color": 0xFF6B7280},
    {"id": "super-admin", "title": "Super Admin", "icon": "admin_panel_settings", "color": 0xFFEF4444},
    {"id": "white-label", "title": "White Label", "icon": "palette", "color": 0xFF10B981},
    {"id": "integration", "title": "Integration Hub", "icon": "hub", "color": 0xFF0EA5E9},
    {"id": "auto-grading", "title": "Auto Grading Engine", "icon": "auto_awesome", "color": 0xFF6366F1},
    {"id": "resume", "title": "Resume Analyzer", "icon": "description", "color": 0xFF3B82F6},
    {"id": "engagement", "title": "Engagement Analytics", "icon": "trending_up", "color": 0xFF22C55E},
    {"id": "ai-billing", "title": "AI Usage & Billing", "icon": "receipt_long", "color": 0xFFF97316},
  ];
}
