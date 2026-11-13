import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:go_router/go_router.dart";
import "core/theme/app_theme.dart";
import "features/landing/landing_screen.dart";
import "features/auth/login_screen.dart";
import "features/dashboard/admin_dashboard.dart";
import "features/dashboard/student_dashboard.dart";
import "features/dashboard/faculty_dashboard.dart";
import "features/dashboard/parent_dashboard.dart";
import "features/modules/modules_screen.dart";

class CampusConnectApp extends StatelessWidget {
  const CampusConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<ThemeNotifier>(context);

    final router = GoRouter(
      initialLocation: "/",
      redirect: (context, state) {
        // We avoid accessing providers in redirect since it runs on every navigation
        return null;
      },
      routes: [
        GoRoute(path: "/", builder: (ctx, state) => const LandingScreen()),
        GoRoute(path: "/login", builder: (ctx, state) => const LoginScreen()),
        GoRoute(path: "/admin-dashboard", builder: (ctx, state) => const AdminDashboard()),
        GoRoute(path: "/student-dashboard", builder: (ctx, state) => const StudentDashboard()),
        GoRoute(path: "/faculty-dashboard", builder: (ctx, state) => const FacultyDashboard()),
        GoRoute(path: "/parent-dashboard", builder: (ctx, state) => const ParentDashboard()),
        GoRoute(
          path: "/module/:id",
          builder: (ctx, state) => ModulesScreen(moduleId: state.pathParameters["id"] ?? ""),
        ),
      ],
    );

    return MaterialApp.router(
      title: "CampusConnect ERP",
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: themeNotifier.themeMode,
      routerConfig: router,
    );
  }
}
