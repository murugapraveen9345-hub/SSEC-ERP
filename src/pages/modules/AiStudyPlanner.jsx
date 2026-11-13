import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Calendar, Clock, Target, Zap, BookOpen, Play, Pause,
  RotateCcw, CheckCircle, ChevronRight, Sparkles, TrendingUp,
  AlertCircle, Coffee, Moon, Sun, Award, Plus, X, BarChart2
} from 'lucide-react';

const SUBJECTS = [
  { id: 1, name: 'Data Structures', color: '#6366f1', credits: 4, progress: 68, deadline: '2026-09-20', priority: 'High' },
  { id: 2, name: 'Machine Learning', color: '#8b5cf6', credits: 4, progress: 45, deadline: '2026-09-18', priority: 'Critical' },
  { id: 3, name: 'Database Systems', color: '#06b6d4', credits: 3, progress: 72, deadline: '2026-09-25', priority: 'Medium' },
  { id: 4, name: 'Computer Networks', color: '#10b981', credits: 3, progress: 30, deadline: '2026-09-15', priority: 'Critical' },
  { id: 5, name: 'Software Engineering', color: '#f59e0b', credits: 3, progress: 55, deadline: '2026-09-28', priority: 'Low' },
  { id: 6, name: 'Operating Systems', color: '#ef4444', credits: 4, progress: 40, deadline: '2026-09-22', priority: 'High' },
];

const WEEKLY_PLAN = {
  Monday:    [{ subject: 'Machine Learning', time: '09:00', duration: 90, type: 'Study' }, { subject: 'Computer Networks', time: '14:00', duration: 60, type: 'Revision' }],
  Tuesday:   [{ subject: 'Data Structures', time: '10:00', duration: 90, type: 'Practice' }, { subject: 'Operating Systems', time: '15:00', duration: 90, type: 'Study' }],
  Wednesday: [{ subject: 'Machine Learning', time: '09:00', duration: 120, type: 'Project' }, { subject: 'Database Systems', time: '14:00', duration: 60, type: 'Revision' }],
  Thursday:  [{ subject: 'Computer Networks', time: '09:00', duration: 90, type: 'Study' }, { subject: 'Data Structures', time: '14:00', duration: 60, type: 'Practice' }],
  Friday:    [{ subject: 'Software Engineering', time: '10:00', duration: 90, type: 'Study' }, { subject: 'Operating Systems', time: '15:00', duration: 60, type: 'Revision' }],
  Saturday:  [{ subject: 'All Subjects', time: '09:00', duration: 180, type: 'Mock Test' }],
  Sunday:    [{ subject: 'Rest & Review', time: '18:00', duration: 60, type: 'Light Revision' }],
};

const AI_INSIGHTS = [
  { type: 'warning', icon: AlertCircle, color: '#f59e0b', text: 'Computer Networks needs 3x more study time — exam is in 6 days!' },
  { type: 'tip', icon: Sparkles, color: '#6366f1', text: 'Your peak focus window is 9AM–11AM based on past session data.' },
  { type: 'success', icon: Award, color: '#10b981', text: 'Data Structures is on track — maintain current pace for A+ outcome.' },
  { type: 'info', icon: Brain, color: '#8b5cf6', text: 'Spaced repetition for ML formulas recommended every 48 hours.' },
];

const PRIORITY_COLORS = { Critical: '#ef4444', High: '#f59e0b', Medium: '#06b6d4', Low: '#10b981' };
const TYPE_COLORS = { Study: '#6366f1', Revision: '#06b6d4', Practice: '#10b981', Project: '#8b5cf6', 'Mock Test': '#ef4444', 'Light Revision': '#94a3b8' };

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function PomodoroTimer() {
  const [mode, setMode] = useState('focus'); // focus | short | long
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const intervalRef = useRef(null);

  const MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = (m) => {
    const newMode = m || mode;
    setMode(newMode);
    setSeconds(MODES[newMode]);
    setRunning(false);
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  const progress = ((MODES[mode] - seconds) / MODES[mode]) * 100;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Clock size={18} style={{ color: 'var(--brand-primary)' }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Pomodoro Timer</h3>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        {Object.keys(MODES).map(m => (
          <button key={m} onClick={() => reset(m)}
            style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: mode === m ? 'var(--brand-primary)' : 'var(--bg-tertiary)',
              color: mode === m ? '#fff' : 'var(--text-secondary)', transition: 'all 0.2s' }}>
            {m === 'focus' ? '🎯 Focus' : m === 'short' ? '☕ Short' : '🌙 Long'}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 1.5rem' }}>
        <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={70} cy={70} r={54} fill="none" stroke="var(--border-color)" strokeWidth={8} />
          <circle cx={70} cy={70} r={54} fill="none" stroke="var(--brand-primary)" strokeWidth={8}
            strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{mins}:{secs}</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {mode === 'focus' ? 'Focus' : mode === 'short' ? 'Break' : 'Rest'}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <button onClick={() => setRunning(r => !r)}
          className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.6rem 1.25rem' }}>
          {running ? <Pause size={15} /> : <Play size={15} />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => reset()} className="btn btn-ghost" style={{ gap: '0.5rem' }}>
          <RotateCcw size={15} /> Reset
        </button>
      </div>
    </div>
  );
}

export default function AiStudyPlanner() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(new Set());

  const handleGenerate = () => {
    setGeneratingPlan(true);
    setTimeout(() => { setGeneratingPlan(false); setPlanGenerated(true); }, 2200);
  };

  const toggleSession = (key) => {
    setCompletedSessions(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const todayPlan = WEEKLY_PLAN[activeDay] || [];
  const totalWeekHours = Object.values(WEEKLY_PLAN).reduce((sum, day) => sum + day.reduce((s, s2) => s + s2.duration, 0), 0) / 60;

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={20} color="#fff" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>AI Study Planner</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Personalized study schedule powered by ML — optimized for your exam deadlines & learning style</p>
        </div>
        <button onClick={handleGenerate} disabled={generatingPlan}
          className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
          {generatingPlan ? (
            <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Generating AI Plan...</>
          ) : (
            <><Sparkles size={16} /> Regenerate AI Plan</>
          )}
        </button>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Study Hours / Week', value: `${totalWeekHours.toFixed(1)}h`, icon: Clock, color: '#6366f1' },
          { label: 'Subjects Tracked', value: SUBJECTS.length, icon: BookOpen, color: '#8b5cf6' },
          { label: 'Sessions Completed', value: `${completedSessions.size}/${Object.values(WEEKLY_PLAN).reduce((s,d)=>s+d.length,0)}`, icon: CheckCircle, color: '#10b981' },
          { label: 'AI Insights', value: AI_INSIGHTS.length, icon: Sparkles, color: '#f59e0b' },
        ].map((kpi) => (
          <div key={kpi.label} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <kpi.icon size={18} style={{ color: kpi.color }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Insights */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} style={{ color: 'var(--brand-primary)' }} /> AI-Generated Insights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {AI_INSIGHTS.map((insight, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: `${insight.color}08`, border: `1px solid ${insight.color}20` }}>
                  <insight.icon size={18} style={{ color: insight.color, flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Priority Matrix */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={16} style={{ color: 'var(--brand-primary)' }} /> Subject Priority & Progress
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SUBJECTS.sort((a,b) => ['Critical','High','Medium','Low'].indexOf(a.priority) - ['Critical','High','Medium','Low'].indexOf(b.priority)).map((sub) => (
                <div key={sub.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: sub.color }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{sub.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${PRIORITY_COLORS[sub.priority]}15`, color: PRIORITY_COLORS[sub.priority] }}>
                        {sub.priority}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Due {sub.deadline}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{sub.progress}%</span>
                    </div>
                  </div>
                  <div style={{ height: 6, borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${sub.progress}%`, borderRadius: 'var(--radius-full)', background: sub.color, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Timetable */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} style={{ color: 'var(--brand-primary)' }} /> Weekly Study Schedule
            </h3>
            {/* Day tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {DAYS.map(day => (
                <button key={day} onClick={() => setActiveDay(day)}
                  style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                    background: activeDay === day ? 'var(--brand-primary)' : 'var(--bg-tertiary)',
                    color: activeDay === day ? '#fff' : 'var(--text-secondary)', transition: 'all 0.2s' }}>
                  {day.slice(0,3)}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {todayPlan.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13, padding: '2rem' }}>No sessions planned for this day.</p>
              ) : todayPlan.map((session, i) => {
                const key = `${activeDay}-${i}`;
                const done = completedSessions.has(key);
                return (
                  <div key={i} onClick={() => toggleSession(key)}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', cursor: 'pointer',
                      background: done ? 'var(--bg-secondary)' : 'var(--bg-card)', opacity: done ? 0.7 : 1, transition: 'all 0.2s' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: done ? '#10b98115' : `${TYPE_COLORS[session.type] || '#6366f1'}15` }}>
                      {done ? <CheckCircle size={18} style={{ color: '#10b981' }} /> : <BookOpen size={18} style={{ color: TYPE_COLORS[session.type] || '#6366f1' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: done ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>
                        {session.subject}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {session.time} · {session.duration} min
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)',
                      background: `${TYPE_COLORS[session.type] || '#6366f1'}15`, color: TYPE_COLORS[session.type] || '#6366f1' }}>
                      {session.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <PomodoroTimer />

          {/* Focus Zone Recommendation */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={15} style={{ color: '#f59e0b' }} /> AI Focus Zones
            </h3>
            {[
              { label: 'Deep Work', time: '9AM–12PM', icon: Sun, color: '#f59e0b', score: 95 },
              { label: 'Active Study', time: '2PM–5PM', icon: TrendingUp, color: '#6366f1', score: 78 },
              { label: 'Light Review', time: '7PM–9PM', icon: Coffee, color: '#06b6d4', score: 60 },
              { label: 'Avoid Study', time: '12PM–2PM', icon: Moon, color: '#94a3b8', score: 25 },
            ].map(zone => (
              <div key={zone.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <zone.icon size={16} style={{ color: zone.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{zone.label}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{zone.time}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 'var(--radius-full)', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${zone.score}%`, background: zone.color, borderRadius: 'var(--radius-full)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Stats */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart2 size={15} style={{ color: 'var(--brand-primary)' }} /> This Week's Stats
            </h3>
            {[
              { label: 'Total Study Time', value: `${totalWeekHours.toFixed(0)}h`, color: '#6366f1' },
              { label: 'Sessions Planned', value: Object.values(WEEKLY_PLAN).reduce((s,d)=>s+d.length,0), color: '#8b5cf6' },
              { label: 'Exams in 2 Weeks', value: 3, color: '#ef4444' },
              { label: 'Avg Daily Hours', value: `${(totalWeekHours / 6).toFixed(1)}h`, color: '#10b981' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{stat.label}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
