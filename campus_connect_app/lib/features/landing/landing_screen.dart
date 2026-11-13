import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";
import "package:provider/provider.dart";
import "../../core/theme/app_colors.dart";
import "../../core/theme/app_theme.dart";

class LandingScreen extends StatefulWidget {
  const LandingScreen({super.key});

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen> with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _floatController;

  final List<_StatItem> _stats = const [
    _StatItem("4,856+", "Students Enrolled", Icons.school),
    _StatItem("312+", "Expert Faculty", Icons.people),
    _StatItem("18", "Departments", Icons.apartment),
    _StatItem("164", "Courses", Icons.menu_book),
  ];

  final List<_FeatureItem> _features = const [
    _FeatureItem(Icons.psychology, "AI Intelligence", "Smart recommendations & predictive analytics", Color(0xFF6366F1)),
    _FeatureItem(Icons.verified, "Blockchain Certs", "Tamper-proof digital certificates", Color(0xFF0EA5E9)),
    _FeatureItem(Icons.video_call, "Virtual Classrooms", "Immersive online learning experience", Color(0xFF22C55E)),
    _FeatureItem(Icons.work, "Placement Portal", "Connect students with top companies", Color(0xFFF59E0B)),
    _FeatureItem(Icons.security, "Security Center", "Enterprise-grade data protection", Color(0xFFEF4444)),
    _FeatureItem(Icons.analytics, "Smart Analytics", "Data-driven institutional insights", Color(0xFFEC4899)),
  ];

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat(reverse: true);
    _floatController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _floatController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final themeNotifier = Provider.of<ThemeNotifier>(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: BoxDecoration(
              gradient: isDark
                  ? const LinearGradient(
                      colors: [Color(0xFF020D02), Color(0xFF0A1F0A), Color(0xFF071407)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    )
                  : const LinearGradient(
                      colors: [Color(0xFFF0FDF4), Color(0xFFDCFCE7), Color(0xFFBBF7D0)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
            ),
          ),

          // Animated background orbs
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, child) {
              return Stack(
                children: [
                  Positioned(
                    top: -size.height * 0.15 + (_pulseController.value * 20),
                    right: -size.width * 0.2,
                    child: Container(
                      width: size.width * 0.7,
                      height: size.width * 0.7,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: RadialGradient(
                          colors: [
                            AppColors.primaryGreen.withOpacity(isDark ? 0.15 : 0.12),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: -size.height * 0.1 - (_pulseController.value * 15),
                    left: -size.width * 0.2,
                    child: Container(
                      width: size.width * 0.6,
                      height: size.width * 0.6,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: RadialGradient(
                          colors: [
                            AppColors.accentGreen.withOpacity(isDark ? 0.1 : 0.08),
                            Colors.transparent,
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),

          // Main content
          SafeArea(
            child: CustomScrollView(
              slivers: [
                // Header
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 36,
                              height: 36,
                              decoration: BoxDecoration(
                                gradient: AppColors.primaryGradient,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Icon(Icons.school, color: Colors.white, size: 20),
                            ).animate().fadeIn(delay: 200.ms).scale(begin: const Offset(0.8, 0.8)),
                            const SizedBox(width: 10),
                            Text(
                              "CampusConnect",
                              style: GoogleFonts.inter(
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                                color: isDark ? Colors.white : const Color(0xFF111827),
                              ),
                            ).animate().fadeIn(delay: 300.ms).slideX(begin: -0.2),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton(
                              onPressed: themeNotifier.toggleTheme,
                              icon: Icon(
                                isDark ? Icons.light_mode : Icons.dark_mode,
                                color: isDark ? Colors.white70 : const Color(0xFF374151),
                              ),
                            ).animate().fadeIn(delay: 400.ms),
                            const SizedBox(width: 4),
                            ElevatedButton(
                              onPressed: () => context.go("/login"),
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                              ),
                              child: Text("Sign In", style: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w600)),
                            ).animate().fadeIn(delay: 400.ms),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Hero Section
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 32, 20, 0),
                    child: Column(
                      children: [
                        // Badge
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.primaryGreen.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.primaryGreen.withOpacity(0.3)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 6, height: 6,
                                decoration: const BoxDecoration(color: AppColors.primaryGreen, shape: BoxShape.circle),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                "Next-Gen Educational ERP",
                                style: GoogleFonts.inter(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.primaryGreen,
                                ),
                              ),
                            ],
                          ),
                        ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.3),

                        const SizedBox(height: 24),

                        // Main title
                        Text(
                          "Campus Management\nReinvented",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.inter(
                            fontSize: size.width > 400 ? 36 : 28,
                            fontWeight: FontWeight.w800,
                            color: isDark ? Colors.white : const Color(0xFF111827),
                            height: 1.1,
                          ),
                        ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.3),

                        const SizedBox(height: 8),

                        // Green highlight
                        ShaderMask(
                          shaderCallback: (bounds) => const LinearGradient(
                            colors: [Color(0xFF22C55E), Color(0xFF16A34A)],
                          ).createShader(bounds),
                          child: Text(
                            "with AI Intelligence",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.inter(
                              fontSize: size.width > 400 ? 36 : 28,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              height: 1.1,
                            ),
                          ),
                        ).animate().fadeIn(delay: 700.ms).slideY(begin: 0.3),

                        const SizedBox(height: 20),

                        Text(
                          "Streamline admissions, academics, finance & student life in one powerful platform trusted by 500+ institutions.",
                          textAlign: TextAlign.center,
                          style: GoogleFonts.inter(
                            fontSize: 15,
                            color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
                            height: 1.6,
                          ),
                        ).animate().fadeIn(delay: 800.ms),

                        const SizedBox(height: 32),

                        // CTA Buttons
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () => context.go("/login"),
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text("Get Started", style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600)),
                                    const SizedBox(width: 6),
                                    const Icon(Icons.arrow_forward, size: 16),
                                  ],
                                ),
                              ).animate().fadeIn(delay: 900.ms).scale(begin: const Offset(0.95, 0.95)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: OutlinedButton(
                                onPressed: () {},
                                style: OutlinedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                  side: BorderSide(color: AppColors.primaryGreen.withOpacity(0.5)),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                ),
                                child: Text(
                                  "Watch Demo",
                                  style: GoogleFonts.inter(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.primaryGreen,
                                  ),
                                ),
                              ).animate().fadeIn(delay: 1000.ms).scale(begin: const Offset(0.95, 0.95)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Stats Section
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 40, 20, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Trusted by institutions nationwide",
                          style: GoogleFonts.inter(
                            fontSize: 13,
                            fontWeight: FontWeight.w500,
                            color: isDark ? const Color(0xFF6B7280) : const Color(0xFF9CA3AF),
                            letterSpacing: 0.5,
                          ),
                          textAlign: TextAlign.center,
                        ).animate().fadeIn(delay: 1100.ms),
                        const SizedBox(height: 16),
                        GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 12,
                            mainAxisSpacing: 12,
                            childAspectRatio: 1.6,
                          ),
                          itemCount: _stats.length,
                          itemBuilder: (context, i) {
                            return _StatCard(stat: _stats[i], index: i, isDark: isDark);
                          },
                        ),
                      ],
                    ),
                  ),
                ),

                // Features Section
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 40, 20, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Everything you need",
                          style: GoogleFonts.inter(
                            fontSize: 22,
                            fontWeight: FontWeight.w700,
                            color: isDark ? Colors.white : const Color(0xFF111827),
                          ),
                        ).animate().fadeIn(delay: 400.ms),
                        const SizedBox(height: 4),
                        Text(
                          "34+ integrated modules for complete campus management",
                          style: GoogleFonts.inter(
                            fontSize: 13,
                            color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
                          ),
                        ).animate().fadeIn(delay: 500.ms),
                        const SizedBox(height: 20),
                        ...List.generate(_features.length, (i) {
                          return _FeatureCard(feature: _features[i], index: i, isDark: isDark);
                        }),
                      ],
                    ),
                  ),
                ),

                // Footer CTA
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Container(
                      padding: const EdgeInsets.all(28),
                      decoration: BoxDecoration(
                        gradient: AppColors.primaryGradient,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Column(
                        children: [
                          Text(
                            "Ready to Transform Your Campus?",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.inter(
                              fontSize: 20,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            "Join 500+ institutions already using CampusConnect ERP",
                            textAlign: TextAlign.center,
                            style: GoogleFonts.inter(fontSize: 13, color: Colors.white70),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () => context.go("/login"),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                foregroundColor: AppColors.primaryGreen,
                                padding: const EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                              child: Text(
                                "Start Free Trial",
                                style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.2),
                  ),
                ),

                const SliverToBoxAdapter(child: SizedBox(height: 20)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StatItem {
  final String value;
  final String label;
  final IconData icon;
  const _StatItem(this.value, this.label, this.icon);
}

class _StatCard extends StatelessWidget {
  final _StatItem stat;
  final int index;
  final bool isDark;
  const _StatCard({required this.stat, required this.index, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF111B11) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              Container(
                width: 32, height: 32,
                decoration: BoxDecoration(
                  color: AppColors.primaryGreen.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(stat.icon, size: 18, color: AppColors.primaryGreen),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            stat.value,
            style: GoogleFonts.inter(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: AppColors.primaryGreen,
            ),
          ),
          Text(
            stat.label,
            style: GoogleFonts.inter(
              fontSize: 11,
              color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
            ),
          ),
        ],
      ),
    ).animate().fadeIn(delay: Duration(milliseconds: 1200 + index * 100)).scale(begin: const Offset(0.9, 0.9));
  }
}

class _FeatureItem {
  final IconData icon;
  final String title;
  final String description;
  final Color color;
  const _FeatureItem(this.icon, this.title, this.description, this.color);
}

class _FeatureCard extends StatelessWidget {
  final _FeatureItem feature;
  final int index;
  final bool isDark;
  const _FeatureCard({required this.feature, required this.index, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF111B11) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 44, height: 44,
            decoration: BoxDecoration(
              color: feature.color.withOpacity(0.12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(feature.icon, color: feature.color, size: 22),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  feature.title,
                  style: GoogleFonts.inter(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: isDark ? Colors.white : const Color(0xFF111827),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  feature.description,
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    color: isDark ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
                  ),
                ),
              ],
            ),
          ),
          Icon(Icons.arrow_forward_ios, size: 14, color: isDark ? const Color(0xFF4B5563) : const Color(0xFFD1D5DB)),
        ],
      ),
    ).animate().fadeIn(delay: Duration(milliseconds: 600 + index * 100)).slideX(begin: 0.15);
  }
}
