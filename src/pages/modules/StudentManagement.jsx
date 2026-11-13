import React, { useState } from 'react';
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { STUDENTS, DEPARTMENTS } from '../../data/mockData';

export default function StudentManagement() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const depts = ['All', ...new Set(STUDENTS.map(s => s.dept))];
  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || s.dept === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">{STUDENTS.length} students · Manage profiles, academic records & more</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Student</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="dashboard-grid" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Students', value: '4,856', color: '#6366f1' },
          { label: 'Active', value: '4,712', color: '#10b981' },
          { label: 'On Warning', value: '87', color: '#f59e0b' },
          { label: 'Detained', value: '57', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="input-wrapper" style={{ flex: 1, minWidth: 220 }}>
            <Search size={15} className="input-icon" />
            <input className="input" placeholder="Search by name or reg no..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {depts.map(d => (
              <button key={d} onClick={() => setDeptFilter(d)} className={`btn btn-sm ${deptFilter === d ? 'btn-primary' : 'btn-secondary'}`}>{d}</button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm"><Filter size={14} /> More Filters</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th><th>Reg No.</th><th>Department</th><th>Year</th>
              <th>Section</th><th>Attendance</th><th>CGPA</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 11 }}>{s.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.id}</td>
                <td><span className="badge badge-primary">{s.dept}</span></td>
                <td>{s.year}</td>
                <td>Sec {s.section}</td>
                <td>
                  <div style={{ display: 'flex', align: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 800, color: s.attendance < 75 ? '#ef4444' : s.attendance >= 85 ? '#10b981' : '#f59e0b' }}>{s.attendance}%</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                      <div className="progress progress-sm" style={{ width: 50 }}>
                        <div className="progress-bar" style={{ width: `${s.attendance}%`, background: s.attendance < 75 ? '#ef4444' : s.attendance >= 85 ? '#10b981' : '#f59e0b' }} />
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{s.cgpa}</td>
                <td><span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-icon-sm" title="View Profile" onClick={() => setSelectedStudent(s)}><Eye size={14} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Edit"><Edit size={14} /></button>
                    <button className="btn btn-ghost btn-icon-sm" title="Contact" style={{ color: '#6366f1' }}><Phone size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="avatar avatar-lg" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 24 }}>{selectedStudent.avatar}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedStudent.name}</h3>
                  <p style={{ margin: 0, fontSize: 13 }}>{selectedStudent.id} · {selectedStudent.dept} · {selectedStudent.year}</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon-sm" onClick={() => setSelectedStudent(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { label: 'Email', value: selectedStudent.email, icon: <Mail size={14} /> },
                  { label: 'Phone', value: selectedStudent.phone, icon: <Phone size={14} /> },
                  { label: 'Section', value: `Section ${selectedStudent.section}` },
                  { label: 'CGPA', value: selectedStudent.cgpa },
                  { label: 'Attendance', value: `${selectedStudent.attendance}%` },
                  { label: 'Status', value: selectedStudent.status },
                ].map(f => (
                  <div key={f.label} style={{ padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedStudent(null)}>Close</button>
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
