import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Users, Trophy, Mail, Lock, Eye, EyeOff,
  Sun, Moon, Search, FileText, CreditCard, Calendar,
  Briefcase, Bus, Bed, Bot, ArrowRight, Settings, Sparkles,
  CheckCircle2, Globe, Shield, Zap, Award, BookOpen, Clock,
  MapPin, Phone, Send, MessageSquare, Star, ChevronRight, HelpCircle, Brain
} from 'lucide-react';
import { ROLES } from '../data/mockData';

// Inline Crisp Social Icons
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15"/>
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  // Active section state
  const [activeNav, setActiveNav] = useState('Home');

  // Login form states
  const [selectedRole, setSelectedRole] = useState(ROLES.ADMIN);
  const [email, setEmail] = useState('admin@unicore.edu');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Admissions Inquiry', message: '' });

  // Handle role tab change
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === ROLES.ADMIN) {
      setEmail('admin@unicore.edu');
      setPassword('admin123');
    } else if (role === ROLES.FACULTY) {
      setEmail('priya@unicore.edu');
      setPassword('faculty123');
    } else if (role === ROLES.STUDENT) {
      setEmail('arjun@unicore.edu');
      setPassword('student123');
    }
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please try again.');
    }
  };

  // SSO Login
  const handleSSO = async (provider) => {
    setLoading(true);
    let demoEmail = 'arjun@unicore.edu';
    let demoPass = 'student123';
    if (selectedRole === ROLES.ADMIN) {
      demoEmail = 'admin@unicore.edu';
      demoPass = 'admin123';
    } else if (selectedRole === ROLES.FACULTY) {
      demoEmail = 'priya@unicore.edu';
      demoPass = 'faculty123';
    }
    const res = await login(demoEmail, demoPass);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  // Contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', subject: 'Admissions Inquiry', message: '' });
    }, 4000);
  };

  // Bottom dock items
  const DOCK_ITEMS = [
    { label: 'Academics', icon: GraduationCap, color: '#16a34a', bgLight: '#dcfce7', bgDark: 'rgba(34, 197, 94, 0.25)', path: '/exams' },
    { label: 'Attendance', icon: Users, color: '#2563eb', bgLight: '#dbeafe', bgDark: 'rgba(37, 99, 235, 0.25)', path: '/attendance' },
    { label: 'Exams & Results', icon: FileText, color: '#e11d48', bgLight: '#ffe4e6', bgDark: 'rgba(225, 29, 72, 0.25)', path: '/exams' },
    { label: 'Fees', icon: CreditCard, color: '#ea580c', bgLight: '#ffedd5', bgDark: 'rgba(234, 88, 12, 0.25)', path: '/fees' },
    { label: 'Events & Clubs', icon: Calendar, color: '#9333ea', bgLight: '#f3e8ff', bgDark: 'rgba(147, 51, 234, 0.25)', path: '/events' },
    { label: 'Placements', icon: Briefcase, color: '#0d9488', bgLight: '#ccfbf1', bgDark: 'rgba(13, 148, 136, 0.25)', path: '/placement' },
    { label: 'Transport', icon: Bus, color: '#0891b2', bgLight: '#cffafe', bgDark: 'rgba(8, 145, 178, 0.25)', path: '/timetable' },
    { label: 'Hostel', icon: Bed, color: '#db2777', bgLight: '#fce7f3', bgDark: 'rgba(219, 39, 119, 0.25)', path: '/settings' },
    { label: 'AI Assistant', icon: Bot, color: '#4f46e5', bgLight: '#e0e7ff', bgDark: 'rgba(79, 70, 229, 0.25)', path: '/dashboard' },
  ];

  const NAV_ITEMS = ['Home', 'About', 'Features', 'Campus Life', 'Contact'];

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundImage: isDark
          ? 'url("/clean_campus_night.jpg")'
          : 'url("/clean_campus_panoramic.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        color: isDark ? '#f8fafc' : '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'background-image 0.5s ease',
      }}
    >
      {/* ── SUBTLE GLOBAL LIGHTING TINT ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, rgba(11, 17, 32, 0.55) 0%, rgba(11, 17, 32, 0.20) 35%, rgba(11, 17, 32, 0.35) 65%, rgba(11, 17, 32, 0.75) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 35%, rgba(255, 255, 255, 0.20) 65%, rgba(255, 255, 255, 0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── FLOATING CAPSULE ISLAND NAVBAR ── */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'sticky',
          top: 14,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1340,
          width: 'calc(100% - 48px)',
          margin: '0 auto 10px',
          padding: '12px 28px',
          borderRadius: 20,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          background: isDark ? 'rgba(15, 23, 42, 0.80)' : 'rgba(255, 255, 255, 0.90)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: isDark ? '0 12px 35px rgba(0,0,0,0.45), 0 0 20px rgba(34, 197, 94, 0.1)' : '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        {/* Left: Brand Logo & Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={() => setActiveNav('Home')}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: isDark
                  ? 'linear-gradient(135deg, #15803d, #22c55e)'
                  : 'linear-gradient(135deg, #16a34a, #15803d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              }}
            >
              <GraduationCap size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1 }}>
                <span style={{ color: isDark ? '#ffffff' : '#0f172a' }}>Campus</span>
                <span style={{ color: isDark ? '#22c55e' : '#16a34a' }}>Connect</span>
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: isDark ? '#cbd5e1' : '#475569', letterSpacing: 0.4 }}>
                UniCore ERP v3.0
              </div>
            </div>
          </motion.div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 9999,
              background: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(22, 163, 74, 0.1)',
              border: isDark ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(22, 163, 74, 0.25)',
              fontSize: 11,
              fontWeight: 800,
              color: isDark ? '#4ade80' : '#15803d',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
            Live Portal
          </div>
        </div>

        {/* Center: Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, background: isDark ? 'rgba(2, 6, 23, 0.45)' : 'rgba(241, 245, 249, 0.75)', padding: '4px 6px', borderRadius: 9999, border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}>
          {NAV_ITEMS.map((label) => {
            const active = activeNav === label;
            return (
              <motion.button
                key={label}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveNav(label)}
                style={{
                  position: 'relative',
                  fontSize: 13.5,
                  fontWeight: active ? 800 : 700,
                  color: active
                    ? (isDark ? '#22c55e' : '#15803d')
                    : (isDark ? '#f1f5f9' : '#0f172a'),
                  cursor: 'pointer',
                  padding: '7px 16px',
                  borderRadius: 9999,
                  border: 'none',
                  background: 'transparent',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: isDark ? 'rgba(34, 197, 94, 0.16)' : 'rgba(22, 163, 74, 0.12)',
                      border: isDark ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(22, 163, 74, 0.25)',
                      zIndex: -1,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Fast Explore */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Theme Switch Pill */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              width: 54,
              height: 28,
              borderRadius: 20,
              background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #cbd5e1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              padding: '2px 3px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.3s',
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                position: 'absolute',
                top: 2,
                left: isDark ? 28 : 3,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: isDark ? '#16a34a' : '#f8fafc',
                boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDark ? <Moon size={12} color="#ffffff" /> : <Sun size={12} color="#f59e0b" />}
            </motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px', opacity: 0.4 }}>
              <Sun size={11} color={isDark ? '#64748b' : '#f59e0b'} />
              <Moon size={11} color={isDark ? '#94a3b8' : '#64748b'} />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveNav('Home');
              setTimeout(() => {
                const el = document.getElementById('login-portal');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 50);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 9999,
              background: isDark
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : '#15803d',
              color: '#ffffff',
              fontSize: 12.5,
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.35)',
            }}
          >
            <Lock size={13} /> Portal Sign In
          </motion.button>
        </div>
      </motion.header>

      {/* ── DYNAMIC PAGE CONTENT CONTAINER ── */}
      <AnimatePresence mode="wait">
        {activeNav === 'Home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'relative',
              zIndex: 10,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 48px',
              maxWidth: 1440,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
              gap: 36,
            }}
          >
            {/* LEFT COLUMN: COMPACT HERO HEADINGS & STATS */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                flex: '0 1 420px',
                maxWidth: 420,
                background: isDark
                  ? 'rgba(15, 23, 42, 0.78)'
                  : 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderRadius: 22,
                padding: '22px 24px',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.18)'
                  : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark
                  ? '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(34, 197, 94, 0.12)'
                  : '0 10px 30px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Shimmer Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 9999,
                  background: isDark ? 'rgba(34, 197, 94, 0.16)' : 'rgba(22, 163, 74, 0.12)',
                  border: isDark ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(22, 163, 74, 0.3)',
                  color: isDark ? '#4ade80' : '#15803d',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.4px',
                  marginBottom: 10,
                }}
              >
                <Sparkles size={13} />
                NEXT-GEN AI CAMPUS 2026
              </div>

              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-1px',
                  margin: '0 0 10px 0',
                }}
              >
                <span style={{ display: 'block', color: isDark ? '#ffffff' : '#090d16' }}>Education Beyond</span>
                <span
                  style={{
                    display: 'block',
                    color: isDark ? '#22c55e' : '#15803d',
                    textShadow: isDark ? '0 0 25px rgba(34, 197, 94, 0.45)' : 'none',
                  }}
                >
                  Boundaries.
                </span>
              </h1>

              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: isDark ? '#e2e8f0' : '#1e293b',
                  margin: '0 0 16px 0',
                }}
              >
                Unified academic ERP, smart attendance, automated marks & 24/7 AI assistance.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/dashboard')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 18px',
                    borderRadius: 9999,
                    background: isDark
                      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                      : '#15803d',
                    color: '#ffffff',
                    fontSize: 12.5,
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: isDark
                      ? '0 4px 14px rgba(34, 197, 94, 0.45)'
                      : '0 3px 12px rgba(21, 128, 61, 0.35)',
                  }}
                >
                  Student Portal <ArrowRight size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveNav('Features')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 15px',
                    borderRadius: 9999,
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: 12.5,
                    fontWeight: 800,
                    border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                  }}
                >
                  Features ✨
                </motion.button>
              </div>

              {/* 4 Compact Stat Cards in 2x2 Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                {[
                  { label: 'Active Students', count: '5,000+', icon: Users, color: '#22c55e', bgLight: '#dcfce7', bgDark: 'rgba(34,197,94,0.2)' },
                  { label: 'Faculty Members', count: '300+', icon: GraduationCap, color: '#0284c7', bgLight: '#e0f2fe', bgDark: 'rgba(56,189,248,0.2)' },
                  { label: 'Pass Rate', count: '99.4%', icon: Trophy, color: '#ca8a04', bgLight: '#fef9c3', bgDark: 'rgba(250,204,21,0.2)' },
                  { label: 'Recruiters', count: '100+', icon: Briefcase, color: '#9333ea', bgLight: '#f3e8ff', bgDark: 'rgba(168,85,247,0.2)' },
                ].map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -2, scale: 1.02 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: 10,
                        background: isDark ? 'rgba(2, 6, 23, 0.65)' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.03)',
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: isDark ? stat.bgDark : stat.bgLight,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stat.color,
                          flexShrink: 0,
                        }}
                      >
                        <StatIcon size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', lineHeight: 1.1 }}>
                          {stat.count}
                        </div>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: isDark ? '#cbd5e1' : '#475569' }}>
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT COLUMN: CYBER-GLASS LOGIN PORTAL */}
            <motion.div
              id="login-portal"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                flex: '0 0 375px',
                maxWidth: 375,
                borderRadius: 22,
                background: isDark ? 'rgba(15, 23, 42, 0.78)' : 'rgba(255, 255, 255, 0.90)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark
                  ? '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(34, 197, 94, 0.15)'
                  : '0 15px 35px -10px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(0, 0, 0, 0.05)',
                padding: '22px 22px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 21, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: 0 }}>
                    Campus Portal
                  </h2>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: isDark ? '#94a3b8' : '#475569', margin: '3px 0 0 0' }}>
                    Select role & sign in
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 8px',
                    borderRadius: 8,
                    background: isDark ? 'rgba(34, 197, 94, 0.15)' : 'rgba(22, 163, 74, 0.1)',
                    border: isDark ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(22, 163, 74, 0.2)',
                    fontSize: 11,
                    fontWeight: 800,
                    color: isDark ? '#4ade80' : '#15803d',
                  }}
                >
                  <Shield size={12} /> 256-Bit SSL
                </div>
              </div>

              {/* Role Switcher Tabs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 6,
                  background: isDark ? 'rgba(2, 6, 23, 0.65)' : 'rgba(241, 245, 249, 0.9)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(203, 213, 225, 0.8)',
                  borderRadius: 12,
                  padding: 4,
                  marginBottom: 16,
                }}
              >
                {[
                  { role: ROLES.ADMIN, label: 'Admin', icon: Settings },
                  { role: ROLES.FACULTY, label: 'Faculty', icon: Users },
                  { role: ROLES.STUDENT, label: 'Student', icon: GraduationCap },
                ].map((tab) => {
                  const active = selectedRole === tab.role;
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.role}
                      type="button"
                      onClick={() => handleRoleSelect(tab.role)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        padding: '8px 4px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: active ? 800 : 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: active ? '#16a34a' : 'transparent',
                        color: active ? '#ffffff' : (isDark ? '#cbd5e1' : '#334155'),
                        boxShadow: active ? '0 2px 8px rgba(22, 163, 74, 0.35)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <TabIcon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>


              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {errorMsg && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: 12, borderRadius: 8, padding: '8px 12px', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#94a3b8' : '#64748b', display: 'flex' }}>
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Register Number / Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '11px 14px 11px 38px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                      background: isDark ? 'rgba(2, 6, 23, 0.75)' : '#ffffff',
                      border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid #cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a', outline: 'none',
                    }}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#94a3b8' : '#64748b', display: 'flex' }}>
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '11px 38px 11px 38px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                      background: isDark ? 'rgba(2, 6, 23, 0.75)' : '#ffffff',
                      border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid #cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a', outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: isDark ? '#94a3b8' : '#64748b', display: 'flex' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ accentColor: '#16a34a', width: 14, height: 14 }} />
                    <span style={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 700 }}>Remember me</span>
                  </label>
                  <span onClick={() => alert('Demo account passwords: student123, faculty123, admin123')} style={{ color: isDark ? '#22c55e' : '#15803d', fontWeight: 800, cursor: 'pointer' }}>
                    Forgot Password?
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 800, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    background: isDark ? 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' : '#15803d', color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                  }}
                >
                  {loading ? 'Authenticating...' : 'Sign In to Campus →'}
                </motion.button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => handleSSO('google')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, fontSize: 12, fontWeight: 800,
                      background: isDark ? 'rgba(2, 6, 23, 0.65)' : '#ffffff', border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a', cursor: 'pointer',
                      boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    Google SSO
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSSO('microsoft')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, fontSize: 12, fontWeight: 800,
                      background: isDark ? 'rgba(2, 6, 23, 0.65)' : '#ffffff', border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                      color: isDark ? '#ffffff' : '#0f172a', cursor: 'pointer',
                      boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    Microsoft
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.main>
        )}

        {/* ── ABOUT SECTION ── */}
        {activeNav === 'About' && (
          <motion.section
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '36px 48px',
              maxWidth: 1380,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                borderRadius: 28,
                padding: '36px 40px',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 12px 35px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 36px' }}>
                <span className="badge badge-primary" style={{ marginBottom: 12, fontSize: 12 }}>
                  About CampusConnect & UniCore ERP
                </span>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 12px' }}>
                  Empowering the Next Generation of Global Innovators
                </h2>
                <p style={{ fontSize: 15, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6 }}>
                  UniCore ERP is a modern AI-first institutional management platform engineered to unify academic administration, student engagement, faculty grading, and campus operations into a single intelligent ecosystem.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 36 }}>
                {[
                  { title: 'AI-Powered Intelligence', desc: 'Predictive dropout analytics, automated essay grading, personalized study schedules, and 24/7 multilingual campus assistant.', icon: Sparkles, color: '#6366f1' },
                  { title: 'Enterprise-Grade Security', desc: 'Immutable blockchain certificates, biometric RFID sync, end-to-end encrypted student records and audit logging.', icon: Shield, color: '#10b981' },
                  { title: 'Unified Multi-Campus Cloud', desc: 'Manage unlimited departments, automated exam workflows, multi-tenant billing, and smart fee gateways seamlessly.', icon: Globe, color: '#0ea5e9' },
                ].map((pillar) => (
                  <div
                    key={pillar.title}
                    style={{
                      padding: '24px',
                      borderRadius: 20,
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.02)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: `${pillar.color}20`, color: pillar.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <pillar.icon size={24} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Accreditations & Key Stats */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '20px 24px',
                  borderRadius: 16,
                  background: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(22, 163, 74, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                {[
                  { value: 'NAAC A++', label: 'Highest National Grade' },
                  { value: 'NIRF Top 25', label: 'National University Rank' },
                  { value: '98.4%', label: 'Placement Track Record' },
                  { value: 'ISO 27001', label: 'Certified Data Security' },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: isDark ? '#22c55e' : '#15803d' }}>{item.value}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#cbd5e1' : '#475569' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── FEATURES SECTION ── */}
        {activeNav === 'Features' && (
          <motion.section
            key="features"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '36px 48px',
              maxWidth: 1380,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                borderRadius: 28,
                padding: '36px 40px',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 12px 35px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 36px' }}>
                <span className="badge badge-success" style={{ marginBottom: 12, fontSize: 12 }}>
                  Module Architecture
                </span>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 12px' }}>
                  Complete End-to-End Higher Education ERP
                </h2>
                <p style={{ fontSize: 15, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6 }}>
                  Everything your institution needs to operate at peak efficiency, automated with state-of-the-art AI.
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {[
                  { title: 'AI Study Planner', desc: 'Custom daily revision schedules generated dynamically from exam dates and student strengths.', icon: Brain, color: '#6366f1', path: '/study-planner' },
                  { title: 'Live Attendance & Biometrics', desc: 'Real-time subject velocity tracking with automatic under-75% alerts and OD approvals.', icon: Users, color: '#0ea5e9', path: '/attendance' },
                  { title: 'AI Auto-Grading Engine', desc: 'Automated script evaluation, semantic answer rubric matching, and instant grade generation.', icon: Star, color: '#10b981', path: '/grading-engine' },
                  { title: 'Blockchain Degrees & Certs', desc: 'Cryptographically verifiable digital credentials stored securely on-chain for tamper-proof sharing.', icon: Award, color: '#f59e0b', path: '/blockchain-certs' },
                  { title: 'Placement & Career Hub', desc: 'Resume analyzer, automated mock interviews, recruiter drive tracking, and offer management.', icon: Briefcase, color: '#ec4899', path: '/placement' },
                  { title: 'Online Fees & Finance', desc: 'Instant UPI/Net Banking integration, automated receipt generation, and fee split tracking.', icon: CreditCard, color: '#8b5cf6', path: '/fees' },
                ].map((feat) => (
                  <motion.div
                    key={feat.title}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate('/dashboard')}
                    style={{
                      padding: '24px',
                      borderRadius: 20,
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.02)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: `${feat.color}20`, color: feat.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginBottom: 16,
                        }}
                      >
                        <feat.icon size={22} />
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
                        {feat.title}
                      </h3>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {feat.desc}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: feat.color, fontSize: 12.5, fontWeight: 700, marginTop: 16 }}>
                      Launch Portal <ArrowRight size={14} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── CAMPUS LIFE SECTION ── */}
        {activeNav === 'Campus Life' && (
          <motion.section
            key="campus-life"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '36px 48px',
              maxWidth: 1380,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                borderRadius: 28,
                padding: '36px 40px',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 12px 35px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 36px' }}>
                <span className="badge badge-warning" style={{ marginBottom: 12, fontSize: 12 }}>
                  Student Life & Clubs
                </span>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 12px' }}>
                  Vibrant Campus Experience & Active Clubs
                </h2>
                <p style={{ fontSize: 15, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6 }}>
                  From national hackathons and robotics symposiums to cultural night and sports meets, our campus fosters holistic student development.
                </p>
              </div>

              {/* Campus Life Highlights Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {[
                  { name: 'Computer Science Club', members: '145 Members', tag: 'Technical', desc: 'Weekly coding jams, open-source hackathons, and algorithm showdowns.', icon: '💻' },
                  { name: 'IEEE Student Chapter', members: '89 Members', tag: 'Research', desc: 'IoT workshops, drone building labs, and IEEE journal publishing support.', icon: '⚡' },
                  { name: 'Robotics & AI Society', members: '78 Members', tag: 'Innovation', desc: 'Autonomous rover development and bot combat competitions.', icon: '🤖' },
                  { name: 'Photography & Media', members: '67 Members', tag: 'Creative', desc: 'Campus photojournalism, short film production, and annual gallery exhibitions.', icon: '📷' },
                ].map((club) => (
                  <div
                    key={club.name}
                    style={{
                      padding: '24px',
                      borderRadius: 20,
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.02)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{club.icon}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{club.name}</h3>
                      <span className="badge badge-gray" style={{ fontSize: 10 }}>{club.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 8 }}>{club.members}</div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {club.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => navigate('/events')}
                  className="btn btn-primary"
                  style={{ borderRadius: 9999, padding: '12px 28px', gap: 8 }}
                >
                  Explore All Campus Events & Clubs <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* ── CONTACT SECTION ── */}
        {activeNav === 'Contact' && (
          <motion.section
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '36px 48px',
              maxWidth: 1380,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                borderRadius: 28,
                padding: '36px 40px',
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 12px 35px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 36px' }}>
                <span className="badge badge-info" style={{ marginBottom: 12, fontSize: 12 }}>
                  24/7 Campus Support
                </span>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 12px' }}>
                  Get In Touch With Us
                </h2>
                <p style={{ fontSize: 15, color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6 }}>
                  Have questions about admissions, course curricula, fees or ERP integration? Our helpdesk is ready to assist you.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                {/* Contact Information */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div
                    style={{
                      padding: '24px',
                      borderRadius: 20,
                      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.02)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MapPin size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Main Campus</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>University Tech Park, OMR Road, Chennai - 600119</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Phone size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Helpline & Emergency</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>+91 (044) 2890-4400 / +91 98765 43210</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Email Enquiries</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>admissions@unicore.edu / support@unicore.edu</div>
                      </div>
                    </div>
                  </div>

                  {/* Campus Hours */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: 16,
                      background: isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.06)',
                      border: '1px solid rgba(99,102,241,0.2)',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--brand-primary)', marginBottom: 6 }}>
                      Campus Helpdesk Working Hours
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      Monday – Saturday: 08:30 AM – 06:00 PM IST (AI Virtual Chatbot active 24/7)
                    </div>
                  </div>
                </div>

                {/* Direct Query Form */}
                <div
                  style={{
                    padding: '28px',
                    borderRadius: 20,
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,0.02)',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--border-color)',
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px' }}>
                    Send Direct Inquiry
                  </h3>

                  {contactSubmitted ? (
                    <div style={{ padding: '24px', borderRadius: 12, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', textAlign: 'center' }}>
                      <CheckCircle2 size={36} style={{ margin: '0 auto 10px', display: 'block' }} />
                      <div style={{ fontSize: 16, fontWeight: 800 }}>Thank you for reaching out!</div>
                      <div style={{ fontSize: 13, marginTop: 4 }}>Your message has been assigned Ticket #INQ-2026-9812. Our admissions office will respond within 24 hours.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="input"
                          style={{ borderRadius: 10 }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="input"
                          style={{ borderRadius: 10 }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Department / Query Category</label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="select"
                          style={{ borderRadius: 10 }}
                        >
                          <option value="Admissions Inquiry">Admissions & New Enrollment</option>
                          <option value="Exam / Marks Transcript">Examinations & Marksheets</option>
                          <option value="Fee Payment Issue">Fee Payment & Receipt Help</option>
                          <option value="Placement & Internship">Placement & Recruiter Connect</option>
                          <option value="Technical Support">ERP & Digital ID Technical Support</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Your Message</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="How can our university team assist you?"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="textarea"
                          style={{ borderRadius: 10 }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ borderRadius: 10, padding: '12px', gap: 8, marginTop: 6 }}
                      >
                        <Send size={16} /> Submit Query
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── BOTTOM MODULE DOCK ── */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '10px 48px 16px',
          maxWidth: 1380,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: isDark
              ? 'rgba(15, 23, 42, 0.78)'
              : 'rgba(255, 255, 255, 0.90)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 22,
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.18)'
              : '1px solid rgba(226, 232, 240, 0.95)',
            boxShadow: isDark
              ? '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.1)'
              : '0 10px 30px rgba(0, 0, 0, 0.08)',
            padding: '12px 18px',
            gap: 8,
            overflowX: 'auto',
          }}
        >
          {DOCK_ITEMS.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45 + idx * 0.05 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  minWidth: 72,
                  padding: '4px 6px',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isDark ? item.bgDark : item.bgLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isDark
                      ? `0 4px 12px ${item.color}33`
                      : '0 2px 6px rgba(0,0,0,0.05)',
                  }}
                >
                  <ItemIcon size={20} color={item.color} />
                </div>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: isDark ? '#f1f5f9' : '#0f172a',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 48px',
          borderTop: isDark
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(226, 232, 240, 0.8)',
          background: isDark
            ? 'rgba(11, 17, 32, 0.65)'
            : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontSize: 12,
          color: isDark ? '#94a3b8' : '#64748b',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
            Campus<span style={{ color: isDark ? '#22c55e' : '#16a34a' }}>Connect</span>
          </span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {['About', 'Features', 'Campus Life', 'Contact'].map((l) => (
              <span
                key={l}
                onClick={() => setActiveNav(l)}
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  color: activeNav === l ? (isDark ? '#22c55e' : '#16a34a') : 'inherit',
                  fontWeight: activeNav === l ? 700 : 500,
                }}
              >
                {l}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {[IconInstagram, IconLinkedin, IconYoutube, IconTwitter].map((Social, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.2, color: '#16a34a' }}
                style={{ cursor: 'pointer', opacity: 0.8, display: 'inline-flex' }}
              >
                <Social />
              </motion.span>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
