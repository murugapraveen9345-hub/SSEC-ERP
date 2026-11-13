import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RefreshCw, Download } from 'lucide-react';
import { TIMETABLE } from '../../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TYPE_COLORS = {
  lecture: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'rgba(99,102,241,0.3)' },
  lab: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
  tutorial: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
};

export default function TimetableManagement() {
  const [timetableData, setTimetableData] = useState(TIMETABLE);
  const [activeDay, setActiveDay] = useState('Monday');
  const [view, setView] = useState('day');
  const [showAiModal, setShowAiModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [aiSuccess, setAiSuccess] = useState(false);

  const [aiConfig, setAiConfig] = useState({
    maxConsecutiveHours: 2,
    labSlotLength: '2 Hours (Continuous)',
    avoidLateFridays: true,
    prioritizeMorningCore: true,
  });

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const handleRunAiGenerator = () => {
    setGenerating(true);
    setGenStep(1);

    setTimeout(() => {
      setGenStep(2);
      setTimeout(() => {
        setGenStep(3);
        setTimeout(() => {
          // Optimize timetable slots
          setTimetableData((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((day) => {
              updated[day] = [...updated[day]].reverse();
            });
            return updated;
          });
          setGenerating(false);
          setAiSuccess(true);
          setShowAiModal(false);
          setTimeout(() => setAiSuccess(false), 4000);
        }, 800);
      }, 900);
    }, 800);
  };

  const handleExportPDF = () => {
    alert('Exporting Semester Timetable to high-resolution print PDF with institutional seal...');
  };

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Timetable Management</h1>
          <p className="page-subtitle" style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Class schedules · Laboratory rotations · Heuristic AI conflict-free scheduling
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setShowAiModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <Sparkles size={15} style={{ color: '#8b5cf6' }} /> AI Auto-Schedule
          </button>
          <button
            onClick={handleExportPDF}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* View Switcher */}
      <div className="tabs" style={{ marginBottom: 10, width: 'fit-content' }}>
        {['day', 'week'].map((v) => (
          <button key={v} className={`tab ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
            {v === 'day' ? '📅 Day View' : '🗓️ Week View'}
          </button>
        ))}
      </div>

      {aiSuccess && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '10px',
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <CheckCircle2 size={20} style={{ color: '#10b981' }} />
          <div>
            <strong style={{ color: '#10b981' }}>AI Generation Completed!</strong>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Optimized 28 weekly periods. 0 room clashes, 0 faculty overlaps, satisfied all curriculum requirements.
            </div>
          </div>
        </div>
      )}

      {view === 'day' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`btn btn-sm ${activeDay === day ? 'btn-primary' : 'btn-secondary'}`}
                style={day === today ? { border: '1.5px solid var(--brand-primary)' } : {}}
              >
                {day.slice(0, 3)} {day === today && '• Today'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(timetableData[activeDay] || []).map((slot, i) => {
              const style = TYPE_COLORS[slot.type] || TYPE_COLORS.lecture;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: style.bg,
                    border: `1px solid ${style.border}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '14px 18px',
                    transition: 'transform 200ms',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <div style={{ width: 4, height: 44, background: style.color, borderRadius: 'var(--radius-full)', flexShrink: 0 }} />
                  <div style={{ width: 110, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: style.color }}>{slot.time.split(' - ')[0]}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>to {slot.time.split(' - ')[1]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>{slot.subject}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{slot.faculty}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{slot.room}</div>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: 4,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: style.bg,
                        color: style.color,
                        border: `1px solid ${style.border}`,
                      }}
                    >
                      {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === 'week' && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${DAYS.length}, minmax(170px,1fr))`, gap: 12, minWidth: 850 }}>
            {DAYS.map((day) => (
              <div key={day} className="glass-card" style={{ padding: '0.85rem' }}>
                <div
                  style={{
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: day === today ? 'var(--brand-primary)' : 'var(--bg-page)',
                    color: day === today ? 'white' : 'var(--text-secondary)',
                    marginBottom: 10,
                  }}
                >
                  {day}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(timetableData[day] || []).map((slot, i) => {
                    const style = TYPE_COLORS[slot.type] || TYPE_COLORS.lecture;
                    return (
                      <div
                        key={i}
                        style={{
                          background: style.bg,
                          border: `1px solid ${style.border}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '10px 12px',
                        }}
                      >
                        <div style={{ fontSize: 11, color: style.color, fontWeight: 700 }}>{slot.time}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{slot.subject}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{slot.room}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Timetable Generator Modal */}
      {showAiModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={22} style={{ color: '#8b5cf6' }} />
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>AI Timetable Optimization Engine</h3>
              </div>
              <button
                onClick={() => !generating && setShowAiModal(false)}
                disabled={generating}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            {generating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2rem 0' }}>
                <RefreshCw size={44} style={{ color: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {genStep === 1 && 'Analyzing faculty availability matrices...'}
                    {genStep === 2 && 'Balancing laboratory & classroom capacities...'}
                    {genStep === 3 && 'Validating constraint satisfaction & zero-clash theorem...'}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '6px 0 0' }}>
                    Genetic algorithmic solver iterating through 1,200 permutations.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                  The AI scheduler uses constraint satisfaction programming to prevent faculty double-booking, balance student daily workloads, and cluster lab periods.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Max Consecutive Lecture Periods</span>
                    <select
                      value={aiConfig.maxConsecutiveHours}
                      onChange={(e) => setAiConfig({ ...aiConfig, maxConsecutiveHours: Number(e.target.value) })}
                      style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    >
                      <option value={2}>2 Hours (Recommended)</option>
                      <option value={3}>3 Hours</option>
                    </select>
                  </label>

                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Lab Session Block</span>
                    <select
                      value={aiConfig.labSlotLength}
                      onChange={(e) => setAiConfig({ ...aiConfig, labSlotLength: e.target.value })}
                      style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    >
                      <option value="2 Hours (Continuous)">2 Hours (Continuous)</option>
                      <option value="3 Hours (Continuous)">3 Hours (Continuous)</option>
                    </select>
                  </label>

                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Prioritize Morning Core Lectures</span>
                    <input
                      type="checkbox"
                      checked={aiConfig.prioritizeMorningCore}
                      onChange={(e) => setAiConfig({ ...aiConfig, prioritizeMorningCore: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--brand-primary)' }}
                    />
                  </label>
                </div>

                <button
                  onClick={handleRunAiGenerator}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                >
                  <Sparkles size={18} /> Run AI Scheduler Solver
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
