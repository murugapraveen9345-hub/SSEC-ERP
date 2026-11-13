import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <TopBar
          collapsed={collapsed}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="page-wrapper animate-fadeIn">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
