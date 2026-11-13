import "package:flutter/material.dart";

class AppColors {
  // Brand greens
  static const Color primaryGreen = Color(0xFF22C55E);
  static const Color primaryGreenLight = Color(0xFFDCFCE7);
  static const Color primaryGreenDark = Color(0xFF166534);
  static const Color accentGreen = Color(0xFF16A34A);
  static const Color greenGlow = Color(0xFF4ADE80);

  // Light mode
  static const Color lightBackground = Color(0xFFF0FDF4);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightText = Color(0xFF111827);
  static const Color lightTextSecondary = Color(0xFF6B7280);
  static const Color lightBorder = Color(0xFFE5E7EB);
  static const Color lightInputBg = Color(0xFFF9FAFB);
  static const Color lightCard = Color(0xFFFFFFFF);

  // Dark mode
  static const Color darkBackground = Color(0xFF0A0F0A);
  static const Color darkSurface = Color(0xFF111B11);
  static const Color darkCard = Color(0xFF1A2E1A);
  static const Color darkText = Color(0xFFF9FAFB);
  static const Color darkTextSecondary = Color(0xFF9CA3AF);
  static const Color darkBorder = Color(0xFF1F2E1F);
  static const Color darkInputBg = Color(0xFF1A2E1A);

  // Status colors
  static const Color success = Color(0xFF22C55E);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color info = Color(0xFF3B82F6);

  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFF16A34A), Color(0xFF22C55E)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient darkGradient = LinearGradient(
    colors: [Color(0xFF052E16), Color(0xFF14532D)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient cardGradientGreen = LinearGradient(
    colors: [Color(0xFF22C55E), Color(0xFF16A34A)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
