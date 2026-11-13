import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/theme/app_theme.dart";
import "../../core/services/auth_service.dart";
import "../../core/models/user_model.dart";
import "../../shared/widgets/app_drawer.dart";
import "../../shared/widgets/stat_card.dart";
import "../../shared/widgets/module_grid.dart";

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthService>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = auth.currentUser!;
    final stats = MockData.adminStats;

    final adminModules = MockData.modules;

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Welcome back,", style: GoogleFonts.inter(fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
            Text(user.name, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700)),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 8),
            child: _ThemeToggle(),
          ),
          _AvatarButton(user: user),
          const SizedBox(width: 12),
        ],
        leading: Builder(builder: (ctx) => IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => Scaffold.of(ctx).openDrawer(),
        )),
      ),
      drawer: AppDrawerWidget(modules: adminModules),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Stats row
                  Text("Overview", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "${stats["total_students"]}", label: "Students", icon: Icons.school, color: AppColors.primaryGreen, index: 0)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "${stats["total_faculty"]}", label: "Faculty", icon: Icons.people, color: const Color(0xFF3B82F6), index: 1)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(child: StatCard(value: "${stats["total_departments"]}", label: "Departments", icon: Icons.apartment, color: const Color(0xFF8B5CF6), index: 2)),
                      const SizedBox(width: 10),
                      Expanded(child: StatCard(value: "${stats["placements_this_year"]}", label: "Placements", icon: Icons.work, color: const Color(0xFFF59E0B), index: 3)),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // Quick action cards
                  Text("Quick Actions", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 400.ms),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(child: _QuickActionCard(icon: Icons.person_add, label: "Add Student", color: AppColors.primaryGreen, onTap: () => context.go("/module/student"), index: 0)),
                      const SizedBox(width: 10),
                      Expanded(child: _QuickActionCard(icon: Icons.calendar_today, label: "Attendance", color: const Color(0xFF3B82F6), onTap: () => context.go("/module/attendance"), index: 1)),
                      const SizedBox(width: 10),
                      Expanded(child: _QuickActionCard(icon: Icons.payment, label: "Fees", color: const Color(0xFF8B5CF6), onTap: () => context.go("/module/fees"), index: 2)),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // All Modules
                  Text("All Modules", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: isDark ? Colors.white : const Color(0xFF111827))).animate().fadeIn(delay: 500.ms),
                  const SizedBox(height: 4),
                  Text("${adminModules.length} modules available", style: GoogleFonts.inter(fontSize: 12, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))).animate().fadeIn(delay: 600.ms),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
          ModuleGridSliver(modules: adminModules),
          const SliverToBoxAdapter(child: SizedBox(height: 24)),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  final int index;
  const _QuickActionCard({required this.icon, required this.label, required this.color, required this.onTap, required this.index});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: color.withOpacity(0.25)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 6),
            Text(label, textAlign: TextAlign.center, style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w600, color: color)),
          ],
        ),
      ),
    ).animate().fadeIn(delay: Duration(milliseconds: 600 + index * 100)).scale(begin: const Offset(0.9, 0.9));
  }
}

class _ThemeToggle extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return IconButton(
      icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
      onPressed: themeNotifier.toggleTheme,
    );
  }
}

class _AvatarButton extends StatelessWidget {
  final UserModel user;
  const _AvatarButton({required this.user});

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
        PopupMenuItem(
          child: Text(user.name, style: GoogleFonts.inter(fontWeight: FontWeight.w600)),
        ),
        PopupMenuItem(
          child: Text(user.email, style: GoogleFonts.inter(fontSize: 12, color: Colors.grey)),
        ),
        const PopupMenuDivider(),
        PopupMenuItem(
          onTap: () {
            auth.logout();
            context.go("/");
          },
          child: Row(children: [
            const Icon(Icons.logout, size: 16),
            const SizedBox(width: 8),
            Text("Sign Out", style: GoogleFonts.inter()),
          ]),
        ),
      ],
    );
  }
}
