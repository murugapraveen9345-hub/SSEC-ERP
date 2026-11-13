import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, BookOpen, CreditCard, Bell, Users, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/mockData';

const BOTTOM_NAV_STUDENT = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/exams', icon: BookOpen, label: 'Exams' },
  { path: '/fees', icon: CreditCard, label: 'Fees' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
];

const BOTTOM_NAV_FACULTY = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { path: '/students', icon: GraduationCap, label: 'Students' },
  { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/exams', icon: BookOpen, label: 'Marks' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
];

const BOTTOM_NAV_ADMIN = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { path: '/students', icon: GraduationCap, label: 'Students' },
  { path: '/faculty', icon: Users, label: 'Faculty' },
  { path: '/fees', icon: CreditCard, label: 'Finance' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
];

export default function BottomNav() {
  const { user } = useAuth();
  const items =
    user?.role === ROLES.ADMIN
      ? BOTTOM_NAV_ADMIN
      : user?.role === ROLES.FACULTY
      ? BOTTOM_NAV_FACULTY
      : BOTTOM_NAV_STUDENT;

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Mobile navigation">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          aria-label={item.label}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

