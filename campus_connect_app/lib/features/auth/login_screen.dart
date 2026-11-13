import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/theme/app_theme.dart";
import "../../core/services/auth_service.dart";

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _showPass = false;
  String _selectedRole = "student";

  final List<_RoleConfig> _roles = [
    _RoleConfig("student", "Student", Icons.school, "arjun@unicore.edu", "student123"),
    _RoleConfig("faculty", "Faculty", Icons.people, "priya@unicore.edu", "faculty123"),
    _RoleConfig("admin", "Admin", Icons.admin_panel_settings, "admin@unicore.edu", "admin123"),
    _RoleConfig("parent", "Parent", Icons.family_restroom, "parent@unicore.edu", "parent123"),
  ];

  @override
  void initState() {
    super.initState();
    _setCredentials("student");
  }

  void _setCredentials(String role) {
    final r = _roles.firstWhere((r) => r.id == role);
    _emailCtrl.text = r.email;
    _passCtrl.text = r.password;
    setState(() => _selectedRole = role);
  }

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    final auth = Provider.of<AuthService>(context, listen: false);
    final success = await auth.login(_emailCtrl.text, _passCtrl.text);

    if (!mounted) return;
    if (success) {
      final role = auth.currentUser!.role;
      if (role == "admin") context.go("/admin-dashboard");
      else if (role == "faculty") context.go("/faculty-dashboard");
      else if (role == "parent") context.go("/parent-dashboard");
      else context.go("/student-dashboard");
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final auth = Provider.of<AuthService>(context);
    final themeNotifier = Provider.of<ThemeNotifier>(context);

    return Scaffold(
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: BoxDecoration(
              gradient: isDark
                  ? const LinearGradient(
                      colors: [Color(0xFF020D02), Color(0xFF0A1F0A)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    )
                  : const LinearGradient(
                      colors: [Color(0xFFF0FDF4), Color(0xFFDCFCE7)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
            ),
          ),

          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  // Top bar
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        onPressed: () => context.go("/"),
                        icon: Icon(
                          Icons.arrow_back_ios,
                          color: isDark ? Colors.white70 : const Color(0xFF374151),
                          size: 20,
                        ),
                      ),
                      IconButton(
                        onPressed: themeNotifier.toggleTheme,
                        icon: Icon(
                          isDark ? Icons.light_mode : Icons.dark_mode,
                          color: isDark ? Colors.white70 : const Color(0xFF374151),
                        ),
                      ),
                    ],
                  ).animate().fadeIn(delay: 200.ms),

                  const SizedBox(height: 24),

                  // Logo & Title
                  Container(
                    width: 60, height: 60,
                    decoration: BoxDecoration(
                      gradient: AppColors.primaryGradient,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.primaryGreen.withOpacity(0.4),
                          blurRadius: 20,
                          spreadRadius: 4,
                        ),
                      ],
                    ),
                    child: const Icon(Icons.school, color: Colors.white, size: 30),
                  ).animate().fadeIn(delay: 300.ms).scale(begin: const Offset(0.6, 0.6)),

                  const SizedBox(height: 16),

                  Text(
                    "Welcome Back",
                    style: GoogleFonts.inter(
                      fontSize: 26,
                      fontWeight: FontWeight.w800,
                      color: isDark ? Colors.white : const Color(0xFF111827),
                    ),
                  ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.3),

                  const SizedBox(height: 4),

                  Text(
                    "Sign in to your CampusConnect account",
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
                    ),
                  ).animate().fadeIn(delay: 500.ms),

                  const SizedBox(height: 32),

                  // Login Card
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF111B11) : Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB),
                      ),
                      boxShadow: isDark ? [] : [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 20,
                          spreadRadius: 0,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Role selector
                        Text(
                          "Login as",
                          style: GoogleFonts.inter(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
                            letterSpacing: 0.5,
                          ),
                        ),
                        const SizedBox(height: 10),
                        GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 4,
                            crossAxisSpacing: 8,
                            mainAxisSpacing: 8,
                            childAspectRatio: 0.85,
                          ),
                          itemCount: _roles.length,
                          itemBuilder: (context, i) {
                            final r = _roles[i];
                            final isSelected = _selectedRole == r.id;
                            return GestureDetector(
                              onTap: () => _setCredentials(r.id),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: isSelected
                                      ? AppColors.primaryGreen.withOpacity(0.15)
                                      : (isDark ? const Color(0xFF1A2E1A) : const Color(0xFFF9FAFB)),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: isSelected ? AppColors.primaryGreen : Colors.transparent,
                                    width: 1.5,
                                  ),
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(r.icon, size: 20, color: isSelected ? AppColors.primaryGreen : (isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280))),
                                    const SizedBox(height: 4),
                                    Text(
                                      r.label,
                                      style: GoogleFonts.inter(
                                        fontSize: 10,
                                        fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                                        color: isSelected ? AppColors.primaryGreen : (isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280)),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),

                        const SizedBox(height: 20),

                        // Email field
                        Text("Email", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF374151))),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _emailCtrl,
                          keyboardType: TextInputType.emailAddress,
                          style: GoogleFonts.inter(color: isDark ? Colors.white : const Color(0xFF111827)),
                          decoration: InputDecoration(
                            hintText: "Enter your email",
                            prefixIcon: const Icon(Icons.email_outlined, size: 18),
                          ),
                        ),

                        const SizedBox(height: 16),

                        // Password field
                        Text("Password", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600, color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF374151))),
                        const SizedBox(height: 6),
                        TextField(
                          controller: _passCtrl,
                          obscureText: !_showPass,
                          style: GoogleFonts.inter(color: isDark ? Colors.white : const Color(0xFF111827)),
                          decoration: InputDecoration(
                            hintText: "Enter your password",
                            prefixIcon: const Icon(Icons.lock_outline, size: 18),
                            suffixIcon: IconButton(
                              onPressed: () => setState(() => _showPass = !_showPass),
                              icon: Icon(_showPass ? Icons.visibility_off_outlined : Icons.visibility_outlined, size: 18),
                            ),
                          ),
                        ),

                        const SizedBox(height: 8),

                        // Error message
                        if (auth.error != null)
                          Container(
                            margin: const EdgeInsets.only(top: 8),
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              color: AppColors.error.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppColors.error.withOpacity(0.3)),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.error_outline, size: 14, color: AppColors.error),
                                const SizedBox(width: 6),
                                Expanded(child: Text(auth.error!, style: GoogleFonts.inter(fontSize: 12, color: AppColors.error))),
                              ],
                            ),
                          ),

                        const SizedBox(height: 20),

                        // Login button
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: auth.isLoading ? null : _handleLogin,
                            child: auth.isLoading
                                ? const SizedBox(
                                    width: 20, height: 20,
                                    child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                  )
                                : Text("Sign In", style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600)),
                          ),
                        ),
                      ],
                    ),
                  ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.2),

                  const SizedBox(height: 24),

                  // Demo credentials hint
                  Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: AppColors.primaryGreen.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.primaryGreen.withOpacity(0.2)),
                    ),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.info_outline, size: 14, color: AppColors.primaryGreen),
                            const SizedBox(width: 6),
                            Text(
                              "Demo Credentials",
                              style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.primaryGreen),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          "Select a role above to auto-fill credentials. Tap Sign In to explore.",
                          style: GoogleFonts.inter(fontSize: 11, color: isDark ? const Color(0xFF86EFAC) : const Color(0xFF16A34A)),
                        ),
                      ],
                    ),
                  ).animate().fadeIn(delay: 800.ms),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _RoleConfig {
  final String id;
  final String label;
  final IconData icon;
  final String email;
  final String password;
  const _RoleConfig(this.id, this.label, this.icon, this.email, this.password);
}
