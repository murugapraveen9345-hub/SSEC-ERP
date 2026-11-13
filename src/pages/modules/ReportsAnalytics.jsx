import React, { useState } from 'react';
import {
  FileSpreadsheet, FileText, Download, Printer, Filter,
  Calendar, CheckCircle2, RefreshCw, BarChart3, ShieldCheck
} from 'lucide-react';
import { DEPARTMENTS } from '../../data/mockData';

const AVAILABLE_REPORTS = [
  {
    id: 'REP-ACAD',
    title: 'Comprehensive Academic Performance & CGPA Report',
    category: 'Academic',
    desc: 'Department-wise GPA distributions, pass percentages, toppers list, and backlog statistics.',
    format: 'PDF / Excel',
    lastGenerated: '2026-09-08',
  },
  {
    id: 'REP-ATTN',
    title: 'Biometric Attendance & Defaulter Audit Report',
    category: 'Attendance',
    desc: 'List of students falling below the statutory 75% attendance threshold with guardian alert logs.',
    format: 'PDF / CSV',
    lastGenerated: '2026-09-09',
  },
  {
    id: 'REP-FIN',
    title: 'Bursar Financial Audit & Fee Reconciliation',
    category: 'Finance',
    desc: 'Tuition, hostel, and lab fee collections, outstanding dues breakdown, and transaction references.',
    format: 'Excel (XLSX)',
    lastGenerated: '2026-09-07',
  },
  {
    id: 'REP-PLACE',
    title: 'Annual Campus Placement & CTC Distribution Report',
    category: 'Placement',
    desc: 'Company-wise hiring figures, salary package tiers (3 LPA to 32 LPA), and department placement rates.',
    format: 'PDF / Presentation',
    lastGenerated: '2026-09-05',
  },
  {
    id: 'REP-NAAC',
    title: 'Institutional Accreditation & NAAC/NBA Dossier',
    category: 'Compliance',
    desc: 'Faculty-student ratios, research publications, lab infrastructure metrics, and outcome-based education (OBE) metrics.',
    format: 'PDF Dossier',
    lastGenerated: '2026-08-30',
  },
];

export default function ReportsAnalytics() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '2026-01-01', to: '2026-09-09' });
  const [generatingReport, setGeneratingReport] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const filteredReports = AVAILABLE_REPORTS.filter((rep) => {
    return selectedCategory === 'All' || rep.category === selectedCategory;
  });

  const handleGenerate = (report) => {
    setGeneratingReport(report.id);

    setTimeout(() => {
      setGeneratingReport(null);
      setDownloadSuccess(report.title);

      // Trigger dummy file download
      const element = document.createElement('a');
      const file = new Blob([`UniCore Institutional Report: ${report.title}\nGenerated on: ${new Date().toISOString()}\nDepartment: ${selectedDept}\nPeriod: ${dateRange.from} to ${dateRange.to}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${report.id}_${selectedDept}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.12) 100%)',
          borderColor: 'rgba(99,102,241,0.25)',
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
            <span style={{ fontSize: '2rem' }}>📊</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Automated Report & Analytics Generator</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '650px' }}>
            Generate institution-wide compliance dossiers, semester academic transcripts, bursar finance audits, and NAAC/NBA accreditation filings in one click.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.8rem 1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)' }}>100%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automated Pipelines</div>
          </div>
          <div className="glass-card" style={{ padding: '0.8rem 1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>NBA / NAAC</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Format Ready</div>
          </div>
        </div>
      </div>

      {/* Filter Parameters Card */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--brand-primary)' }} />
          Report Scope & Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Academic Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-page)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">All Departments (University-Wide)</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.code}>
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-page)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Attendance">Attendance</option>
              <option value="Finance">Finance</option>
              <option value="Placement">Placement</option>
              <option value="Compliance">Compliance & Accreditation</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Date From
            </label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-page)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Date To
            </label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-page)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <CheckCircle2 size={22} style={{ color: '#10b981' }} />
          <div>
            <strong style={{ color: '#10b981' }}>Report Generated & Downloaded!</strong>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{downloadSuccess} has been saved to your downloads folder.</div>
          </div>
        </div>
      )}

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filteredReports.map((report) => {
          const isGenerating = generatingReport === report.id;

          return (
            <div
              key={report.id}
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(99,102,241,0.15)',
                      color: 'var(--brand-primary)',
                    }}
                  >
                    {report.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format: {report.format}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                  {report.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {report.desc}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Last compiled: <strong>{report.lastGenerated}</strong>
                </div>
              </div>

              <button
                onClick={() => handleGenerate(report)}
                disabled={isGenerating}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Generating Document...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Generate & Download
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
