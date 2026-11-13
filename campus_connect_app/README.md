# CampusConnect Flutter App

A complete Flutter mobile application for the CampusConnect ERP system.
Supports both **Android** and **iOS** platforms.

## Features

- 🎨 **Light & Dark Mode** - Beautiful green-themed design matching the web app
- ✨ **Full Animations** - Smooth animations on every screen using `flutter_animate`
- 🔐 **4 Role-Based Logins** - Student, Faculty, Admin, Parent
- 📱 **4 Dashboards** - Role-specific dashboards with key stats
- 📦 **34 ERP Modules** - All modules from the web app ported to Flutter
- 🤖 **AI-Powered Screens** - AI Study Planner, Mock Interview, Auto Grading, etc.

## Demo Credentials

| Role    | Email                   | Password     |
|---------|-------------------------|--------------|
| Student | arjun@unicore.edu       | student123   |
| Faculty | priya@unicore.edu       | faculty123   |
| Admin   | admin@unicore.edu       | admin123     |
| Parent  | parent@unicore.edu      | parent123    |

## Running the App

### Prerequisites
- Flutter SDK (installed via Puro)
- Android Studio with Android SDK 34
- Java JDK 17

### Commands

```bash
# Install dependencies
puro flutter pub get

# Run on connected device/emulator
puro flutter run

# Build Android APK
puro flutter build apk --release

# Build iOS (requires macOS + Xcode)
puro flutter build ios --release
```

## Project Structure

```
lib/
  main.dart                 # App entry point
  app.dart                  # Router & MaterialApp
  core/
    theme/
      app_theme.dart        # Light/Dark MaterialTheme
      app_colors.dart       # Brand colors (green palette)
    models/
      user_model.dart       # UserModel + MockData
    services/
      auth_service.dart     # Authentication provider
  features/
    landing/
      landing_screen.dart   # Animated landing page
    auth/
      login_screen.dart     # Login with role selector
    dashboard/
      admin_dashboard.dart
      student_dashboard.dart
      faculty_dashboard.dart
      parent_dashboard.dart
    modules/
      modules_screen.dart   # Universal screen for all 34 modules
  shared/
    widgets/
      stat_card.dart        # Stats card widget
      module_grid.dart      # Module grid layout
      app_drawer.dart       # Navigation drawer
assets/
  images/                   # Campus images
```
