import React, { useState } from 'react';
import {
  Briefcase, TrendingUp, Building, Award, CheckCircle,
  Clock, ArrowUpRight, Search, FileText, CheckCircle2, ChevronRight
} from 'lucide-react';
import { PLACEMENT_DATA } from '../../data/mockData';

export default function PlacementPortal() {
  const [activeTab, setActiveTab] = useState('drives'); // 'drives' | 'my-applications' | 'companies'
  const [appliedJobs, setAppliedJobs] = useState(['TCS', 'Amazon', 'Cognizant']);
  const [justApplied, setJustApplied] = useState(null);

  const stats = PLACEMENT_DATA.stats;

  const availableDrives = [
    {
      id: 'D001',
      company: 'Google Cloud',
      role: 'Associate Cloud Engineer',
      package: '18 - 24 LPA',
      location: 'Bengaluru / Hyderabad',
      deadline: '2026-09-30',
      minCgpa: 8.0,
      departments: ['CSE', 'IT', 'ECE'],
      status: 'Open',
    },
    {
      id: 'D002',
      company: 'Microsoft',
      role: 'Software Development Engineer',
      package: '22 - 28 LPA',
      location: 'Noida / Bengaluru',
      deadline: '2026-10-05',
      minCgpa: 8.5,
      departments: ['CSE', 'IT'],
      status: 'Open',
    },
    {
      id: 'D003',
      company: 'TCS Digital',
      role: 'Systems Engineer',
      package: '7.5 LPA',
      location: 'Pan India',
      deadline: '2026-09-25',
      minCgpa: 7.0,
      departments: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
      status: 'Closing Soon',
    },
    {
      id: 'D004',
      company: 'Qualcomm',
      role: 'Embedded Systems Engineer',
      package: '14 - 16 LPA',
      location: 'Chennai / Hyderabad',
      deadline: '2026-10-12',
      minCgpa: 7.5,
      departments: ['ECE', 'CSE'],
      status: 'Open',
    },
  ];

  const handleApply = (companyName) => {
    if (appliedJobs.includes(companyName)) return;
    setAppliedJobs([...appliedJobs, companyName]);
    setJustApplied(companyName);
    setTimeout(() => setJustApplied(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(99,102,241,0.12) 100%)',
          borderColor: 'rgba(16,185,129,0.25)',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>🚀</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Career & Placement Portal</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '600px' }}>
            Explore campus hiring drives, track interview rounds, submit applications, and connect with top multinational recruiters.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.35rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {[
            { key: 'drives', label: 'Active Drives' },
            { key: 'my-applications', label: 'My Applications' },
            { key: 'companies', label: 'Top Recruiters' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '9px',
                fontWeight: 600,
                fontSize: '0.875rem',
                background: activeTab === tab.key ? 'var(--brand-primary)' : 'transparent',
                color: activeTab === tab.key ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Placed Students</span>
            <Award size={18} style={{ color: '#10b981' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            {stats.placed}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>92% Placement rate</span>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Offers</span>
            <Briefcase size={18} style={{ color: '#6366f1' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            {stats.offers}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Multiple offer holders: 125</span>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Package</span>
            <TrendingUp size={18} style={{ color: '#0ea5e9' }} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            {stats.avg_package} LPA
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>+12% vs last year</span>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Highest Package</span>
            <span style={{ fontSize: '1.2rem' }}>🏆</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: '#f59e0b' }}>
            {stats.highest_package} LPA
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Secured at Google</span>
        </div>
      </div>

      {/* TAB: ACTIVE DRIVES */}
      {activeTab === 'drives' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {availableDrives.map((drive) => {
            const hasApplied = appliedJobs.includes(drive.company);

            return (
              <div
                key={drive.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{drive.company}</h3>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: drive.status === 'Open' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: drive.status === 'Open' ? '#10b981' : '#ef4444',
                      }}
                    >
                      {drive.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
                    {drive.role}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    <div>💰 <strong>Package:</strong> {drive.package}</div>
                    <div>📍 <strong>Location:</strong> {drive.location}</div>
                    <div>🎓 <strong>Min CGPA:</strong> {drive.minCgpa} (Eligible depts: {drive.departments.join(', ')})</div>
                    <div>⏳ <strong>Apply by:</strong> {drive.deadline}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(drive.company)}
                  disabled={hasApplied}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: hasApplied ? 'rgba(16,185,129,0.15)' : 'var(--brand-primary)',
                    color: hasApplied ? '#10b981' : '#fff',
                    border: hasApplied ? '1px solid rgba(16,185,129,0.3)' : 'none',
                    cursor: hasApplied ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle size={16} /> Application Submitted
                    </>
                  ) : (
                    <>
                      Apply for Drive <ChevronRight size={16} />
                    </>
                  )}
                </button>

                {justApplied === drive.company && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(16,185,129,0.95)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                  >
                    <CheckCircle2 size={36} style={{ marginBottom: '0.5rem' }} />
                    <h4 style={{ margin: 0 }}>Applied Successfully!</h4>
                    <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>Resume & Profile sent to {drive.company}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: MY APPLICATIONS */}
      {activeTab === 'my-applications' && (
        <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Company</th>
                <th style={{ padding: '1rem' }}>Role</th>
                <th style={{ padding: '1rem' }}>Applied On</th>
                <th style={{ padding: '1rem' }}>Current Round</th>
                <th style={{ padding: '1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {PLACEMENT_DATA.student_applications.map((app, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, fontSize: '1rem' }}>{app.company}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{app.role}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{app.applied}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{app.round}</td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor:
                          app.status === 'Selected'
                            ? 'rgba(16,185,129,0.1)'
                            : app.status === 'Aptitude Cleared'
                            ? 'rgba(99,102,241,0.1)'
                            : 'rgba(245,158,11,0.1)',
                        color:
                          app.status === 'Selected'
                            ? '#10b981'
                            : app.status === 'Aptitude Cleared'
                            ? '#6366f1'
                            : '#f59e0b',
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: TOP RECRUITERS */}
      {activeTab === 'companies' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {PLACEMENT_DATA.top_recruiters.map((rec, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>{rec.logo}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{rec.company}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Offers Made: <strong style={{ color: 'var(--text-primary)' }}>{rec.offers}</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Avg CTC: <strong style={{ color: '#10b981' }}>{rec.package}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
