import "package:flutter/material.dart";
import "package:flutter_animate/flutter_animate.dart";
import "package:google_fonts/google_fonts.dart";
import "package:go_router/go_router.dart";

class ModuleGridSliver extends StatelessWidget {
  final List<Map<String, dynamic>> modules;
  const ModuleGridSliver({super.key, required this.modules});

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      sliver: SliverGrid(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
          childAspectRatio: 0.9,
        ),
        delegate: SliverChildBuilderDelegate(
          (ctx, i) => _ModuleCard(module: modules[i], index: i),
          childCount: modules.length,
        ),
      ),
    );
  }
}

class _ModuleCard extends StatelessWidget {
  final Map<String, dynamic> module;
  final int index;
  const _ModuleCard({required this.module, required this.index});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final color = Color(module["color"] as int);

    return GestureDetector(
      onTap: () => context.go("/module/${module["id"]}"),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF111B11) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: isDark ? const Color(0xFF1F2E1F) : const Color(0xFFE5E7EB)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 44, height: 44,
              decoration: BoxDecoration(
                color: color.withOpacity(0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(Icons.widgets, color: color, size: 22),
            ),
            const SizedBox(height: 8),
            Text(
              module["title"] as String,
              textAlign: TextAlign.center,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: GoogleFonts.inter(
                fontSize: 10.5,
                fontWeight: FontWeight.w600,
                color: isDark ? Colors.white : const Color(0xFF111827),
                height: 1.3,
              ),
            ),
          ],
        ),
      ).animate()
        .fadeIn(delay: Duration(milliseconds: 200 + index * 40))
        .scale(begin: const Offset(0.9, 0.9), delay: Duration(milliseconds: 200 + index * 40)),
    );
  }
}
