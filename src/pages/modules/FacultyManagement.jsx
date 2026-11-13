import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, BookOpen } from 'lucide-react';
import { FACULTY, DEPARTMENTS } from '../../data/mockData';

export default function FacultyManagement() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = FACULTY.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty Management</h1>
          <p className="page-subtitle">{FACULTY.length} faculty members across {DEPARTMENTS.length} departments</p>
        </div>
        <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Faculty</button>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Faculty', value: 312, color: '#6366f1' },
          { label: 'Professors', value: 48, color: '#0ea5e9' },
          { label: 'On Leave', value: 12, color: '#f59e0b' },
          { label: 'Departments', value: 18, color: '#10b981' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="input-wrapper">
          <Search size={15} className="input-icon" />
          <input className="input" placeholder="Search faculty by name or department..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(f => (
          <div key={f.id} className="glass-card" style={{ padding: 22, cursor: 'pointer' }} onClick={() => setSelected(f)}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <div className="avatar avatar-lg" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', fontSize: 22 }}>{f.avatar}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{f.designation}</div>
                <span className="badge badge-primary" style={{ marginTop: 6 }}>{f.dept}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {f.subjects.map(s => <span key={s} className="badge badge-gray">{s}</span>)}
            </div>
            <hr className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16 }}>{f.students}</div>
                <div style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>Students</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 16 }}>{f.experience}y</div>
                <div style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>Experience</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className={`badge ${f.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{f.status}</span>
                <div style={{ color: 'var(--text-tertiary)', fontWeight: 600, marginTop: 4 }}>Status</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={e => { e.stopPropagation(); }}><Mail size={13} /> Email</button>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={e => { e.stopPropagation(); setSelected(f); }}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="avatar avatar-lg" style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', fontSize: 24 }}>{selected.avatar}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{selected.name}</h3>
                  <p style={{ margin: 0, fontSize: 13 }}>{selected.designation} · {selected.dept}</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Email', value: selected.email },
                  { label: 'Department', value: selected.dept },
                  { label: 'Experience', value: `${selected.experience} years` },
                  { label: 'Students', value: selected.students },
                  { label: 'Status', value: selected.status },
                ].map(f => (
                  <div key={f.label} style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{f.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 8 }}>SUBJECTS</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selected.subjects.map(s => <span key={s} className="badge badge-primary">{s}</span>)}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
