import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/theme/app_theme.dart";

class ModulesScreen extends StatelessWidget {
  final String moduleId;
  const ModulesScreen({super.key, required this.moduleId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final config = _moduleConfig[moduleId] ?? _ModuleConfig(
      title: moduleId.replaceAll("-", " ").toUpperCase(),
      icon: Icons.widgets,
      color: AppColors.primaryGreen,
      description: "Module overview and management.",
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(config.title),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: Provider.of<ThemeNotifier>(context, listen: false).toggleTheme,
          ),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          // Hero banner
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [config.color, config.color.withOpacity(0.7)]),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          config.title,
                          style: GoogleFonts.inter(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          config.description,
                          style: GoogleFonts.inter(fontSize: 13, color: Colors.white70, height: 1.5),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Container(
                    width: 64, height: 64,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Icon(config.icon, color: Colors.white, size: 32),
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.2),
          ),

          // Stats row
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: config.stats.asMap().entries.map((e) {
                  return Expanded(
                    child: Container(
                      margin: EdgeInsets.only(right: e.key < config.stats.length - 1 ? 10 : 0),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF111B11) : Colors.white,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB)),
                      ),
                      child: Column(
                        children: [
                          Text(e.value.value, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w800, color: config.color)),
                          const SizedBox(height: 2),
                          Text(e.value.label, textAlign: TextAlign.center, style: GoogleFonts.inter(fontSize: 10, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
                        ],
                      ),
                    ).animate().fadeIn(delay: Duration(milliseconds: 200 + e.key * 100)).scale(begin: const Offset(0.9, 0.9)),
                  );
                }).toList(),
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 24)),

          // Content list
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text("Recent Activity", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))),
            ).animate().fadeIn(delay: 400.ms),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 12)),

          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (ctx, i) => _ActivityItem(
                  title: config.activities[i % config.activities.length],
                  time: "${(i + 1) * 2}h ago",
                  color: config.color,
                  index: i,
                ),
                childCount: config.activities.length,
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 24)),

          // Action buttons
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: config.actions.asMap().entries.map((e) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: e.key == 0 ? config.color : Colors.transparent,
                        foregroundColor: e.key == 0 ? Colors.white : config.color,
                        side: e.key != 0 ? BorderSide(color: config.color) : null,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        elevation: 0,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(e.value.icon, size: 18),
                          const SizedBox(width: 8),
                          Text(e.value.label, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ).animate().fadeIn(delay: Duration(milliseconds: 600 + e.key * 100)),
                  );
                }).toList(),
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 32)),
        ],
      ),
    );
  }
}

class _ActivityItem extends StatelessWidget {
  final String title;
  final String time;
  final Color color;
  final int index;
  const _ActivityItem({required this.title, required this.time, required this.color, required this.index});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF111B11) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB)),
      ),
      child: Row(
        children: [
          Container(
            width: 8, height: 8,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(title, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w500, color: isDark ? Colors.white : const Color(0xFF111827))),
          ),
          Text(time, style: GoogleFonts.inter(fontSize: 11, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
        ],
      ),
    ).animate().fadeIn(delay: Duration(milliseconds: 400 + index * 80)).slideX(begin: 0.1);
  }
}

class _StatValue {
  final String value;
  final String label;
  const _StatValue(this.value, this.label);
}

class _ActionItem {
  final IconData icon;
  final String label;
  const _ActionItem(this.icon, this.label);
}

class _ModuleConfig {
  final String title;
  final IconData icon;
  final Color color;
  final String description;
  final List<_StatValue> stats;
  final List<String> activities;
  final List<_ActionItem> actions;

  const _ModuleConfig({
    required this.title,
    required this.icon,
    required this.color,
    required this.description,
    this.stats = const [],
    this.activities = const ["No recent activity"],
    this.actions = const [],
  });
}

const _moduleConfig = {
  "attendance": _ModuleConfig(
    title: "Attendance Management",
    icon: Icons.calendar_today,
    color: Color(0xFF22C55E),
    description: "Track and manage student & faculty attendance with real-time monitoring and automated alerts.",
    stats: [_StatValue("82%", "Average"), _StatValue("248", "Present Today"), _StatValue("36", "Absent")],
    activities: ["Arjun Sharma marked present - CS301", "Dr. Priya updated batch attendance", "Alert: Rahul has <75% attendance", "Timetable sync completed for Week 38"],
    actions: [_ActionItem(Icons.add, "Mark Attendance"), _ActionItem(Icons.download, "Download Report")],
  ),
  "fees": _ModuleConfig(
    title: "Fees & Payment",
    icon: Icons.payment,
    color: Color(0xFF3B82F6),
    description: "Manage student fees, payments, and generate receipts with integrated payment gateway.",
    stats: [_StatValue("₹28.4L", "Collected"), _StatValue("₹4.2L", "Pending"), _StatValue("387", "Paid")],
    activities: ["Arjun Sharma paid ₹25,000 – Semester Fee", "Fee reminder sent to 47 students", "New fee structure applied for 2024-25", "Payment gateway reconciliation complete"],
    actions: [_ActionItem(Icons.payment, "Pay Fees"), _ActionItem(Icons.receipt, "View Receipt")],
  ),
  "timetable": _ModuleConfig(
    title: "Timetable Management",
    icon: Icons.schedule,
    color: Color(0xFF8B5CF6),
    description: "Create and manage class schedules, room allocations, and faculty assignments.",
    stats: [_StatValue("48", "Classes/Week"), _StatValue("18", "Rooms"), _StatValue("164", "Courses")],
    activities: ["CS301 moved to Room 204 – Monday 10AM", "Faculty substitution: Dr. Raj for Dr. Priya", "New elective timetable published", "Exam hall allocation completed"],
    actions: [_ActionItem(Icons.add, "Add Class"), _ActionItem(Icons.print, "Print Timetable")],
  ),
  "results": _ModuleConfig(
    title: "Examination Results",
    icon: Icons.grade,
    color: Color(0xFFF59E0B),
    description: "Publish and manage examination results, grades, and academic performance reports.",
    stats: [_StatValue("8.7", "Avg CGPA"), _StatValue("94%", "Pass Rate"), _StatValue("3", "Rank")],
    activities: ["Semester 5 results published", "Grade card download available", "Revaluation request submitted for MA301", "Top 10 rankers list updated"],
    actions: [_ActionItem(Icons.visibility, "View Results"), _ActionItem(Icons.download, "Download Grade Card")],
  ),
  "placement": _ModuleConfig(
    title: "Placement Portal",
    icon: Icons.work,
    color: Color(0xFF06B6D4),
    description: "Connect students with top companies. Manage drives, interviews, and placement statistics.",
    stats: [_StatValue("387", "Placed"), _StatValue("156", "Companies"), _StatValue("₹8.4L", "Avg CTC")],
    activities: ["Google campus drive – 45 shortlisted", "Resume upload deadline: Tomorrow", "Mock interview scheduled – 3 PM", "Infosys offer letters released"],
    actions: [_ActionItem(Icons.upload_file, "Upload Resume"), _ActionItem(Icons.event, "View Drives")],
  ),
  "leave": _ModuleConfig(
    title: "Leave & OD Management",
    icon: Icons.event_busy,
    color: Color(0xFFEC4899),
    description: "Apply for leaves, on-duty requests, and track approval status in real-time.",
    stats: [_StatValue("2", "Pending"), _StatValue("14", "Approved"), _StatValue("3", "OD Taken")],
    activities: ["Medical leave approved – 2 days", "OD request for Tech Fest submitted", "Leave balance updated", "Faculty leave application pending HOD approval"],
    actions: [_ActionItem(Icons.add, "Apply Leave"), _ActionItem(Icons.history, "Leave History")],
  ),
  "events": _ModuleConfig(
    title: "Events & Clubs",
    icon: Icons.celebration,
    color: Color(0xFFF97316),
    description: "Discover campus events, join clubs, and manage registrations for workshops and fests.",
    stats: [_StatValue("12", "Active Clubs"), _StatValue("28", "Events"), _StatValue("856", "Registered")],
    activities: ["Hackathon 2024 – Registration open", "Cultural Fest performers announced", "Coding Club new project kick-off", "Sports meet results declared"],
    actions: [_ActionItem(Icons.event, "Browse Events"), _ActionItem(Icons.groups, "Join Club")],
  ),
  "ai-study": _ModuleConfig(
    title: "AI Study Planner",
    icon: Icons.psychology,
    color: Color(0xFF6366F1),
    description: "Personalized AI-powered study plans, recommendations, and performance predictions.",
    stats: [_StatValue("92%", "Plan Adherence"), _StatValue("3", "Exams Left"), _StatValue("8.7", "Predicted CGPA")],
    activities: ["Study plan for DS updated", "Weak areas: Graph Algorithms identified", "Recommended 2 new practice papers", "Streak: 12 days continuous study"],
    actions: [_ActionItem(Icons.auto_awesome, "Generate Plan"), _ActionItem(Icons.quiz, "Take Practice Test")],
  ),
  "mock-interview": _ModuleConfig(
    title: "Mock Interview",
    icon: Icons.record_voice_over,
    color: Color(0xFFEF4444),
    description: "Practice technical and HR interviews with AI-powered feedback and scoring.",
    stats: [_StatValue("8", "Sessions Done"), _StatValue("76%", "Avg Score"), _StatValue("92%", "Confidence")],
    activities: ["DSA round completed – Score: 85/100", "HR interview feedback available", "New coding challenge added", "Peer review session scheduled"],
    actions: [_ActionItem(Icons.play_arrow, "Start Interview"), _ActionItem(Icons.history, "Past Sessions")],
  ),
  "blockchain": _ModuleConfig(
    title: "Blockchain Certificates",
    icon: Icons.verified,
    color: Color(0xFF0EA5E9),
    description: "Issue and verify tamper-proof digital certificates secured by blockchain technology.",
    stats: [_StatValue("2,456", "Issued"), _StatValue("100%", "Verified"), _StatValue("12", "Courses")],
    activities: ["Certificate issued: Data Structures – A+", "Degree certificate verification requested", "New batch certificates generated", "QR code verification enabled"],
    actions: [_ActionItem(Icons.download, "Download Certificate"), _ActionItem(Icons.qr_code, "Verify Certificate")],
  ),
  "digital-id": _ModuleConfig(
    title: "Digital Student ID",
    icon: Icons.badge,
    color: Color(0xFF10B981),
    description: "Access your digital student ID card, QR code, and official identity verification.",
    stats: [_StatValue("Active", "Status"), _StatValue("CS2022001", "Reg No"), _StatValue("2025", "Valid Till")],
    activities: ["ID card downloaded", "QR code scanned at Library gate", "Hostel access granted", "Bus pass linked to digital ID"],
    actions: [_ActionItem(Icons.download, "Download ID"), _ActionItem(Icons.share, "Share ID")],
  ),
  "notifications": _ModuleConfig(
    title: "Notifications",
    icon: Icons.notifications,
    color: Color(0xFFF59E0B),
    description: "Stay updated with all campus announcements, alerts, and personalized notifications.",
    stats: [_StatValue("7", "Unread"), _StatValue("48", "This Week"), _StatValue("3", "Urgent")],
    activities: ["Exam schedule released", "Fee payment reminder", "Library book due tomorrow", "Holiday declared – Oct 2"],
    actions: [_ActionItem(Icons.mark_email_read, "Mark All Read"), _ActionItem(Icons.settings, "Notification Settings")],
  ),
  "settings": _ModuleConfig(
    title: "Settings",
    icon: Icons.settings,
    color: Color(0xFF6B7280),
    description: "Manage your account preferences, security settings, and app customization.",
    stats: [_StatValue("Dark", "Theme"), _StatValue("EN", "Language"), _StatValue("On", "Notifications")],
    activities: ["Password changed", "Profile photo updated", "Email verified", "Two-factor auth enabled"],
    actions: [_ActionItem(Icons.person, "Edit Profile"), _ActionItem(Icons.security, "Security")],
  ),
  "reports": _ModuleConfig(
    title: "Reports & Analytics",
    icon: Icons.analytics,
    color: Color(0xFF8B5CF6),
    description: "Generate comprehensive analytical reports for student performance, attendance, and institutional metrics.",
    stats: [_StatValue("156", "Reports"), _StatValue("94%", "Accuracy"), _StatValue("Real-time", "Updates")],
    activities: ["Monthly attendance report generated", "Financial summary Q3 ready", "Department-wise performance analysis", "AI predictive report published"],
    actions: [_ActionItem(Icons.add_chart, "Generate Report"), _ActionItem(Icons.download, "Export PDF")],
  ),
  "department": _ModuleConfig(
    title: "Department Management",
    icon: Icons.apartment,
    color: Color(0xFF22C55E),
    description: "Manage department details, faculty allocations, and academic programs.",
    stats: [_StatValue("18", "Departments"), _StatValue("312", "Faculty"), _StatValue("164", "Courses")],
    activities: ["New HOD appointed – CS Dept", "Lab allocation updated", "Syllabus revision approved", "Department budget approved"],
    actions: [_ActionItem(Icons.add, "Add Department"), _ActionItem(Icons.edit, "Edit Details")],
  ),
  "student": _ModuleConfig(
    title: "Student Management",
    icon: Icons.school,
    color: Color(0xFF06B6D4),
    description: "Manage student enrollments, profiles, academic records, and progression.",
    stats: [_StatValue("4,856", "Students"), _StatValue("312", "New Admits"), _StatValue("94%", "Retention")],
    activities: ["New student enrolled: Priya R", "Batch transfer approved", "TC issued for 5 students", "Alumni update sent"],
    actions: [_ActionItem(Icons.person_add, "Add Student"), _ActionItem(Icons.upload_file, "Bulk Import")],
  ),
  "faculty": _ModuleConfig(
    title: "Faculty Management",
    icon: Icons.people,
    color: Color(0xFF3B82F6),
    description: "Manage faculty profiles, workload, publications, and performance evaluations.",
    stats: [_StatValue("312", "Faculty"), _StatValue("24", "PhD Holders"), _StatValue("4.6", "Avg Rating")],
    activities: ["New faculty onboarded: Dr. Ravi", "Workload report generated", "Faculty feedback published", "Leave request from Dr. Priya"],
    actions: [_ActionItem(Icons.person_add, "Add Faculty"), _ActionItem(Icons.assessment, "View Performance")],
  ),
  "ai-analytics": _ModuleConfig(
    title: "AI Predictive Analytics",
    icon: Icons.bar_chart,
    color: Color(0xFF6366F1),
    description: "AI-powered predictions for student performance, dropout risk, and institutional trends.",
    stats: [_StatValue("93%", "Accuracy"), _StatValue("4,856", "Predictions"), _StatValue("12", "Insights")],
    activities: ["3 students at dropout risk identified", "Performance trend: CS batch improving", "Fee default prediction generated", "Placement success model updated"],
    actions: [_ActionItem(Icons.auto_awesome, "Run Analysis"), _ActionItem(Icons.download, "Export Insights")],
  ),
  "security": _ModuleConfig(
    title: "Security Center",
    icon: Icons.security,
    color: Color(0xFFEF4444),
    description: "Monitor system security, access logs, threats, and configure multi-factor authentication.",
    stats: [_StatValue("0", "Threats"), _StatValue("100%", "Uptime"), _StatValue("2FA", "Enabled")],
    activities: ["Suspicious login attempt blocked", "Password policy updated", "System backup completed", "Security audit report generated"],
    actions: [_ActionItem(Icons.lock, "Security Scan"), _ActionItem(Icons.history, "View Audit Log")],
  ),
  "virtual-class": _ModuleConfig(
    title: "Virtual Classroom",
    icon: Icons.video_call,
    color: Color(0xFF0EA5E9),
    description: "Join live classes, record sessions, share resources, and interact with faculty online.",
    stats: [_StatValue("8", "Live Now"), _StatValue("1,240", "Recordings"), _StatValue("98%", "Uptime")],
    activities: ["CS301 – Data Structures live now", "AI/ML recorded session uploaded", "Assignment submitted via classroom", "Whiteboard session saved"],
    actions: [_ActionItem(Icons.video_call, "Join Class"), _ActionItem(Icons.play_circle, "Recordings")],
  ),
  "workflow": _ModuleConfig(
    title: "Workflow Automation",
    icon: Icons.account_tree,
    color: Color(0xFFF97316),
    description: "Automate routine administrative tasks, approvals, and notifications.",
    stats: [_StatValue("24", "Workflows"), _StatValue("89%", "Efficiency"), _StatValue("2.4K", "Tasks Auto")],
    activities: ["Fee reminder workflow triggered", "Leave approval workflow updated", "New automation: Exam notification", "100 emails sent automatically"],
    actions: [_ActionItem(Icons.add, "New Workflow"), _ActionItem(Icons.play_arrow, "Run Automation")],
  ),
  "parent-portal": _ModuleConfig(
    title: "Parent Portal",
    icon: Icons.family_restroom,
    color: Color(0xFFEC4899),
    description: "Parents can monitor ward attendance, academic performance, fees, and communicate with faculty.",
    stats: [_StatValue("82%", "Attendance"), _StatValue("8.7", "CGPA"), _StatValue("₹15K", "Fees Due")],
    activities: ["Parent-teacher meeting scheduled", "Monthly report shared with parents", "Fee reminder sent to parent", "Attendance alert: <75%"],
    actions: [_ActionItem(Icons.message, "Message Faculty"), _ActionItem(Icons.payment, "Pay Fees")],
  ),
  "alumni": _ModuleConfig(
    title: "Alumni Network",
    icon: Icons.groups,
    color: Color(0xFF14B8A6),
    description: "Connect with alumni, mentorship programs, and job referral networks.",
    stats: [_StatValue("12,456", "Alumni"), _StatValue("248", "Mentors"), _StatValue("89", "Referrals")],
    activities: ["Alumni meet 2024 announced", "New mentorship pairing: Arjun ↔ Pradeep", "Job referral from TCS alumni", "Alumni fund contribution received"],
    actions: [_ActionItem(Icons.person_search, "Find Alumni"), _ActionItem(Icons.event, "Alumni Events")],
  ),
  "documents": _ModuleConfig(
    title: "Document Requests",
    icon: Icons.folder_open,
    color: Color(0xFF8B5CF6),
    description: "Request and download official documents like transcripts, bonafide certificates, and NOCs.",
    stats: [_StatValue("3", "Pending"), _StatValue("18", "Completed"), _StatValue("1 Day", "Avg Time")],
    activities: ["Bonafide certificate ready for download", "Transcript request submitted", "NOC approved for internship", "Character certificate issued"],
    actions: [_ActionItem(Icons.add, "New Request"), _ActionItem(Icons.download, "Download Document")],
  ),
  "subscription": _ModuleConfig(
    title: "Subscription & Billing",
    icon: Icons.subscriptions,
    color: Color(0xFFF59E0B),
    description: "Manage institution subscription plans, billing, and payment history.",
    stats: [_StatValue("Pro", "Plan"), _StatValue("Active", "Status"), _StatValue("Oct 2025", "Renewal")],
    activities: ["Invoice #1247 generated", "Auto-renewal enabled", "Add-on: AI Suite activated", "Payment of ₹1.2L received"],
    actions: [_ActionItem(Icons.upgrade, "Upgrade Plan"), _ActionItem(Icons.receipt, "View Invoices")],
  ),
  "audit-logs": _ModuleConfig(
    title: "Audit Logs",
    icon: Icons.history,
    color: Color(0xFF6B7280),
    description: "Track all system activities, user actions, and administrative changes for compliance.",
    stats: [_StatValue("48.2K", "Logs"), _StatValue("0", "Critical"), _StatValue("100%", "Compliant")],
    activities: ["Admin login: 192.168.1.45", "Fee structure modified by admin", "Student record updated", "Bulk import completed: 45 records"],
    actions: [_ActionItem(Icons.filter_list, "Filter Logs"), _ActionItem(Icons.download, "Export Logs")],
  ),
  "super-admin": _ModuleConfig(
    title: "Super Admin Dashboard",
    icon: Icons.admin_panel_settings,
    color: Color(0xFFEF4444),
    description: "Manage all institutions, tenants, and system-wide configurations from a central console.",
    stats: [_StatValue("500+", "Institutions"), _StatValue("2.4M", "Users"), _StatValue("99.9%", "Uptime")],
    activities: ["New institution onboarded: XYZ College", "System update deployed", "Backup completed for all tenants", "API usage limit reset"],
    actions: [_ActionItem(Icons.add_business, "Add Institution"), _ActionItem(Icons.settings, "System Config")],
  ),
  "white-label": _ModuleConfig(
    title: "White Label Branding",
    icon: Icons.palette,
    color: Color(0xFF10B981),
    description: "Customize the ERP with your institution's branding, colors, logo, and theme.",
    stats: [_StatValue("Custom", "Domain"), _StatValue("Brand", "Applied"), _StatValue("100%", "Match")],
    activities: ["New color scheme applied", "Logo updated", "Custom domain verified", "Mobile app theme updated"],
    actions: [_ActionItem(Icons.palette, "Customize Brand"), _ActionItem(Icons.preview, "Preview")],
  ),
  "integration": _ModuleConfig(
    title: "Integration Hub",
    icon: Icons.hub,
    color: Color(0xFF0EA5E9),
    description: "Connect with third-party tools like Google Workspace, Zoom, payment gateways, and LMS.",
    stats: [_StatValue("12", "Connected"), _StatValue("3", "Pending"), _StatValue("99%", "Sync Rate")],
    activities: ["Google Workspace sync complete", "Zoom integration updated", "Razorpay gateway active", "LMS content imported"],
    actions: [_ActionItem(Icons.add, "Add Integration"), _ActionItem(Icons.refresh, "Sync All")],
  ),
  "auto-grading": _ModuleConfig(
    title: "Auto Grading Engine",
    icon: Icons.auto_awesome,
    color: Color(0xFF6366F1),
    description: "AI-powered automatic grading for assignments, quizzes, and coding assessments.",
    stats: [_StatValue("2,456", "Graded"), _StatValue("98%", "Accuracy"), _StatValue("< 5s", "Speed")],
    activities: ["CS301 Assignment graded: 45 submissions", "Plagiarism check complete", "Grade distribution published", "Auto-feedback sent to students"],
    actions: [_ActionItem(Icons.auto_awesome, "Grade Assignments"), _ActionItem(Icons.analytics, "View Distribution")],
  ),
  "resume": _ModuleConfig(
    title: "Resume Analyzer",
    icon: Icons.description,
    color: Color(0xFF3B82F6),
    description: "AI-powered resume review, scoring, and suggestions to boost placement success.",
    stats: [_StatValue("87%", "Match Score"), _StatValue("12", "Suggestions"), _StatValue("Top 5%", "Ranking")],
    activities: ["Resume scored: 87/100", "5 skills gap identified", "ATS optimization complete", "LinkedIn profile linked"],
    actions: [_ActionItem(Icons.upload_file, "Upload Resume"), _ActionItem(Icons.auto_fix_high, "Improve Resume")],
  ),
  "engagement": _ModuleConfig(
    title: "Engagement Analytics",
    icon: Icons.trending_up,
    color: Color(0xFF22C55E),
    description: "Track student and faculty engagement levels across all ERP modules and activities.",
    stats: [_StatValue("78%", "Engagement"), _StatValue("92%", "Retention"), _StatValue("4.8/5", "Satisfaction")],
    activities: ["Peak usage: 9-11 AM detected", "Module adoption: Attendance 94%", "Low engagement: Alumni Module", "Gamification badges issued: 156"],
    actions: [_ActionItem(Icons.bar_chart, "View Analytics"), _ActionItem(Icons.download, "Export Report")],
  ),
  "ai-billing": _ModuleConfig(
    title: "AI Usage & Billing",
    icon: Icons.receipt_long,
    color: Color(0xFFF97316),
    description: "Monitor AI feature usage, token consumption, and billing for AI-powered modules.",
    stats: [_StatValue("1.2M", "Tokens Used"), _StatValue("₹4,200", "This Month"), _StatValue("Pro", "Plan")],
    activities: ["AI Study Planner: 2,456 plans generated", "Mock Interview API: 867 sessions", "Resume Analyzer: 312 analyses", "Monthly bill ₹4,200 due Oct 1"],
    actions: [_ActionItem(Icons.upgrade, "Upgrade Plan"), _ActionItem(Icons.receipt, "View Bill")],
  ),
};
