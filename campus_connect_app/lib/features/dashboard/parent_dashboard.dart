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

class ParentDashboard extends StatelessWidget {
  const ParentDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = auth.currentUser!;

    final parentModules = MockData.modules.where((m) => [
      "attendance","fees","results","timetable","leave","notifications","settings","parent-portal","events"
    ].contains(m["id"])).toList();

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Parent Portal", style: GoogleFonts.inter(fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
            Text(user.name, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700)),
          ],
        ),
        actions: [
          IconButton(icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode), onPressed: Provider.of<ThemeNotifier>(context, listen: false).toggleTheme),
          PopupMenuButton<dynamic>(
            child: CircleAvatar(radius: 18, backgroundColor: const Color(0xFFEC4899), child: Text(user.avatar, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white))),
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
      drawer: AppDrawerWidget(modules: parentModules),
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
                      gradient: const LinearGradient(colors: [Color(0xFFBE185D), Color(0xFFEC4899)]),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.family_restroom, color: Colors.white, size: 40),
                        const SizedBox(width: 14),
                        Expanded(child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Monitoring: Arjun Sharma", style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700, color: Colors.white)),
                            Text("CS2022001 • 3rd Year", style: GoogleFonts.inter(fontSize: 12, color: Colors.white70)),
                            Text("Computer Science", style: GoogleFonts.inter(fontSize: 11, color: Colors.white60)),
                          ],
                        )),
                      ],
                    ),
                  ).animate().fadeIn(delay: 200.ms),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "82%", label: "Attendance", icon: Icons.calendar_today, color: AppColors.primaryGreen, index: 0)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "8.7", label: "CGPA", icon: Icons.grade, color: const Color(0xFF3B82F6), index: 1)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "₹15K", label: "Fees Due", icon: Icons.payment, color: const Color(0xFFEF4444), index: 2)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "3", label: "Exams Soon", icon: Icons.quiz, color: const Color(0xFFF59E0B), index: 3)),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text("Parent Tools", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 500.ms),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
          ModuleGridSliver(modules: parentModules),
          const SliverToBoxAdapter(child: SizedBox(height: 24)),
        ],
      ),
    );
  }
}
