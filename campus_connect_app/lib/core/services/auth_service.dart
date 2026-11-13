import "package:flutter/foundation.dart";
import "../models/user_model.dart";

class AuthService extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;
  String? _error;

  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isLoggedIn => _currentUser != null;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 800));

    final user = MockData.demoUsers.firstWhere(
      (u) => u.email == email.trim() && u.password == password.trim(),
      orElse: () => const UserModel(
        id: "", name: "", email: "", password: "", role: "", avatar: "",
      ),
    );

    _isLoading = false;

    if (user.id.isEmpty) {
      _error = "Invalid email or password. Please try again.";
      notifyListeners();
      return false;
    }

    _currentUser = user;
    notifyListeners();
    return true;
  }

  void logout() {
    _currentUser = null;
    _error = null;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
