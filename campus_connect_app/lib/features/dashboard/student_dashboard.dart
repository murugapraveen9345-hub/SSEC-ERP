import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/theme/app_theme.dart";
import "../../core/services/auth_service.dart";
import "../../core/models/user_model.dart";
import "../../shared/widgets/stat_card.dart";
import "../../shared/widgets/app_drawer.dart";
import "../../shared/widgets/module_grid.dart";

class StudentDashboard extends StatelessWidget {
  const StudentDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = auth.currentUser!;
    final stats = MockData.studentStats;

    final studentModules = MockData.modules.where((m) => [
      "attendance","fees","timetable","results","leave","events","placement",
      "ai-study","mock-interview","digital-id","notifications","settings",
      "resume","library","parent-portal","documents","blockchain","virtual-class"
    ].contains(m["id"])).toList();

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Good morning,", style: GoogleFonts.inter(fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
            Text(user.name.split(" ").first, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700)),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: Provider.of<ThemeNotifier>(context, listen: false).toggleTheme,
          ),
          _Avatar(user: user),
          const SizedBox(width: 8),
        ],
        leading: Builder(builder: (ctx) => IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => Scaffold.of(ctx).openDrawer(),
        )),
      ),
      drawer: AppDrawerWidget(modules: studentModules),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Profile card
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: AppColors.primaryGradient,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 28,
                          backgroundColor: Colors.white.withOpacity(0.2),
                          child: Text(user.avatar, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white)),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(user.name, style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white)),
                              Text("${user.department} • ${user.year}", style: GoogleFonts.inter(fontSize: 12, color: Colors.white70)),
                              Text("Reg: ${user.regNo}", style: GoogleFonts.inter(fontSize: 11, color: Colors.white60)),
                            ],
                          ),
                        ),
                        Column(
                          children: [
                            Text("${user.cgpa}", style: GoogleFonts.inter(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white)),
                            Text("CGPA", style: GoogleFonts.inter(fontSize: 10, color: Colors.white70)),
                          ],
                        ),
                      ],
                    ),
                  ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.2),

                  const SizedBox(height: 16),

                  // Stats
                  Text("Academic Overview", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 300.ms),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "${stats["attendance"]}%", label: "Attendance", icon: Icons.calendar_today, color: AppColors.primaryGreen, index: 0)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "₹${stats["pending_fees"]}", label: "Fees Due", icon: Icons.payment, color: const Color(0xFFEF4444), index: 1)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "${stats["upcoming_exams"]}", label: "Upcoming Exams", icon: Icons.quiz, color: const Color(0xFFF59E0B), index: 2)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "${stats["assignments_due"]}", label: "Assignments Due", icon: Icons.assignment, color: const Color(0xFF8B5CF6), index: 3)),
                    ],
                  ),

                  const SizedBox(height: 24),
                  Text("My Modules", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 500.ms),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
          ModuleGridSliver(modules: studentModules),
          const SliverToBoxAdapter(child: SizedBox(height: 24)),
        ],
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  final UserModel user;
  const _Avatar({required this.user});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context, listen: false);
    return PopupMenuButton<dynamic>(
      child: CircleAvatar(
        radius: 18,
        backgroundColor: AppColors.primaryGreen,
        child: Text(user.avatar, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
      ),
      itemBuilder: (_) => <PopupMenuEntry>[
        PopupMenuItem(child: Text(user.name, style: GoogleFonts.inter(fontWeight: FontWeight.w600))),
        const PopupMenuDivider(),
        PopupMenuItem(
          onTap: () { auth.logout(); context.go("/"); },
          child: Row(children: [const Icon(Icons.logout, size: 16), const SizedBox(width: 8), const Text("Sign Out")]),
        ),
      ],
    );
  }
}
