import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_USERS, ROLES } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('unicore_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    // Login page opens first!
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('unicore_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('unicore_user');
      localStorage.removeItem('unicore_user');
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 600));

    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      setLoading(false);
      return { success: true, user: safeUser };
    } else {
      setError('Invalid email or password.');
      setLoading(false);
      return { success: false };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role) => {
    const demoUser = DEMO_USERS.find((u) => u.role === role);
    if (demoUser) {
      const { password: _, ...safeUser } = demoUser;
      setUser(safeUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
