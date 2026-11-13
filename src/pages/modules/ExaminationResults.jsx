import React, { useState } from 'react';
import { Download, Trophy, AlertTriangle } from 'lucide-react';
import { EXAM_RESULTS, UPCOMING_EXAMS, STUDENT_STATS } from '../../data/mockData';

const GRADE_COLOR = { 'A+': '#6366f1', 'A': '#10b981', 'B+': '#0ea5e9', 'B': '#f59e0b', 'C': '#ef4444' };

export default function ExaminationResults() {
  const [tab, setTab] = useState('results');
  const totalMarks = EXAM_RESULTS.reduce((a, r) => a + r.total, 0);
  const totalMax = EXAM_RESULTS.reduce((a, r) => a + r.max, 0);
  const overallPct = Math.round((totalMarks / totalMax) * 100);

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Examinations & Results</h1>
          <p className="page-subtitle">Semester 5 · Academic Year 2026-27</p>
        </div>
        <button className="btn btn-secondary btn-sm"><Download size={14} /> Download Marksheet</button>
      </div>

      {/* Overview */}
      <div className="dashboard-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'CGPA', value: STUDENT_STATS.cgpa, color: '#6366f1', icon: '🎓' },
          { label: 'Overall Score', value: `${overallPct}%`, color: '#10b981', icon: '📊' },
          { label: 'Subjects Cleared', value: `${EXAM_RESULTS.filter(r => r.result === 'Pass').length}/${EXAM_RESULTS.length}`, color: '#0ea5e9', icon: '✅' },
          { label: 'Upcoming Exams', value: UPCOMING_EXAMS.length, color: '#f59e0b', icon: '📅' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs" style={{ marginBottom: 24, width: 'fit-content' }}>
        {['results', 'upcoming'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'results' ? '📋 Results' : '📅 Upcoming'}
          </button>
        ))}
      </div>

      {tab === 'results' && (
        <div>
          {/* Results cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 16, marginBottom: 24 }}>
            {EXAM_RESULTS.map(r => {
              const pct = Math.round((r.total / r.max) * 100);
              const gradeColor = GRADE_COLOR[r.grade] || '#6366f1';
              return (
                <div key={r.subject} className="glass-card" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{r.subject}</div>
                      <span className={`badge ${r.result === 'Pass' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: 6 }}>{r.result}</span>
                    </div>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: gradeColor + '18', border: `2.5px solid ${gradeColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 900, fontSize: 16, color: gradeColor }}>{r.grade}</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                    {[
                      { label: 'Internal', value: `${r.internal}/50` },
                      { label: 'External', value: `${r.external}/100` },
                      { label: 'Total', value: `${r.total}/150` },
                    ].map(f => (
                      <div key={f.label} style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 13, fontWeight: 800 }}>{f.value}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600 }}>{f.label}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'var(--text-tertiary)' }}>Score</span>
                      <span style={{ fontWeight: 700, color: gradeColor }}>{pct}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${pct}%`, background: `linear-gradient(135deg, ${gradeColor}, ${gradeColor}99)` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rank card */}
          <div className="card" style={{ background: 'var(--gradient-primary)', border: 'none', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Trophy size={40} style={{ flexShrink: 0, opacity: 0.9 }} />
              <div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Semester Rank</div>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em' }}>12 <span style={{ fontSize: 16, fontWeight: 600, opacity: 0.7 }}>/ 60</span></div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>CSE Section A · Keep it up! 🎉</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'upcoming' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {UPCOMING_EXAMS.map((exam) => {
            const daysUntil = Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
            return (
              <div key={exam.subject} className="glass-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-lg)', background: daysUntil <= 5 ? 'rgba(239,68,68,0.12)' : 'rgba(99,102,241,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${daysUntil <= 5 ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.2)'}` }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: daysUntil <= 5 ? '#ef4444' : '#6366f1' }}>{new Date(exam.date).getDate()}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)' }}>{new Date(exam.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{exam.subject}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {exam.time} · {exam.room} · {exam.type} · {exam.duration}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${daysUntil <= 3 ? 'badge-danger' : daysUntil <= 7 ? 'badge-warning' : 'badge-gray'}`} style={{ fontSize: 12, padding: '5px 12px' }}>
                    {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                  </span>
                  {daysUntil <= 3 && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertTriangle size={11} /> Prepare now!</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
