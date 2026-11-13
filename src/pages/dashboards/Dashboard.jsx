import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../data/mockData';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case ROLES.STUDENT: return <StudentDashboard />;
    case ROLES.FACULTY: return <FacultyDashboard />;
    case ROLES.ADMIN:   return <AdminDashboard />;
    default: return <StudentDashboard />;
  }
}
