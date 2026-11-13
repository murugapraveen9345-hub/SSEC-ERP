import "package:flutter/material.dart";
import "package:flutter/services.dart";
import "package:provider/provider.dart";
import "core/services/auth_service.dart";
import "core/theme/app_theme.dart";
import "app.dart";

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Set system UI overlay style
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthService()),
        ChangeNotifierProvider(create: (_) => ThemeNotifier()),
      ],
      child: const CampusConnectApp(),
    ),
  );
}
