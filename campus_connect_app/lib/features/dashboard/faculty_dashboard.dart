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

class FacultyDashboard extends StatelessWidget {
  const FacultyDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = auth.currentUser!;

    final facultyModules = MockData.modules.where((m) => [
      "attendance","timetable","results","leave","events","notifications",
      "settings","auto-grading","virtual-class","reports","student","documents"
    ].contains(m["id"])).toList();

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Faculty Portal", style: GoogleFonts.inter(fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
            Text(user.name, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700)),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: Provider.of<ThemeNotifier>(context, listen: false).toggleTheme,
          ),
          PopupMenuButton<dynamic>(
            child: CircleAvatar(radius: 18, backgroundColor: const Color(0xFF3B82F6), child: Text(user.avatar, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white))),
            itemBuilder: (_) => <PopupMenuEntry>[
              PopupMenuItem(child: Text(user.name, style: GoogleFonts.inter(fontWeight: FontWeight.w600))),
              const PopupMenuDivider(),
              PopupMenuItem(onTap: () { auth.logout(); context.go("/"); }, child: Row(children: [const Icon(Icons.logout, size: 16), const SizedBox(width: 8), const Text("Sign Out")])),
            ],
          ),
          const SizedBox(width: 8),
        ],
        leading: Builder(builder: (ctx) => IconButton(icon: const Icon(Icons.menu), onPressed: () => Scaffold.of(ctx).openDrawer())),
      ),
      drawer: AppDrawerWidget(modules: facultyModules),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(colors: [Color(0xFF1D4ED8), Color(0xFF3B82F6)]),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(radius: 28, backgroundColor: Colors.white.withOpacity(0.2), child: Text(user.avatar, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white))),
                        const SizedBox(width: 14),
                        Expanded(child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(user.name, style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white)),
                            Text(user.designation ?? "Faculty", style: GoogleFonts.inter(fontSize: 12, color: Colors.white70)),
                            Text(user.department ?? "Department", style: GoogleFonts.inter(fontSize: 11, color: Colors.white60)),
                          ],
                        )),
                      ],
                    ),
                  ).animate().fadeIn(delay: 200.ms),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "142", label: "Students", icon: Icons.school, color: AppColors.primaryGreen, index: 0)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "4", label: "Subjects", icon: Icons.menu_book, color: const Color(0xFF3B82F6), index: 1)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "8", label: "Classes Today", icon: Icons.schedule, color: const Color(0xFF8B5CF6), index: 2)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "23", label: "Pending Tasks", icon: Icons.task, color: const Color(0xFFF59E0B), index: 3)),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text("My Tools", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 500.ms),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
          ModuleGridSliver(modules: facultyModules),
          const SliverToBoxAdapter(child: SizedBox(height: 24)),
        ],
      ),
    );
  }
}
