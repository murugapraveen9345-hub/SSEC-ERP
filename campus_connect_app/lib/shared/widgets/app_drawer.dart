import "package:flutter/material.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/services/auth_service.dart";

class AppDrawerWidget extends StatelessWidget {
  final List<Map<String, dynamic>> modules;
  const AppDrawerWidget({super.key, required this.modules});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final auth = Provider.of<AuthService>(context);
    final user = auth.currentUser;

    return Drawer(
      backgroundColor: isDark ? const Color(0xFF0A0F0A) : Colors.white,
      child: Column(
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(gradient: AppColors.primaryGradient),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Colors.white.withOpacity(0.25),
                  child: Text(user?.avatar ?? "U", style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white)),
                ),
                const SizedBox(height: 10),
                Text(user?.name ?? "User", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white)),
                Text(user?.email ?? "", style: GoogleFonts.inter(fontSize: 11, color: Colors.white70)),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: modules.length,
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemBuilder: (context, i) {
                final m = modules[i];
                return ListTile(
                  leading: Container(
                    width: 36, height: 36,
                    decoration: BoxDecoration(
                      color: Color(m["color"] as int).withOpacity(0.12),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(Icons.widgets, color: Color(m["color"] as int), size: 18),
                  ),
                  title: Text(m["title"] as String, style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w500, color: isDark ? Colors.white : const Color(0xFF111827))),
                  onTap: () {
                    Navigator.pop(context);
                    context.go("/module/${m["id"]}");
                  },
                );
              },
            ),
          ),
          Divider(color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB)),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: Text("Sign Out", style: GoogleFonts.inter(fontSize: 13, color: Colors.red)),
            onTap: () {
              auth.logout();
              context.go("/");
            },
          ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
