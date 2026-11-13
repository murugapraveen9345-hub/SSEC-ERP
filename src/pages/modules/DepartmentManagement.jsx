import React, { useState } from 'react';
import { Building2, Users, BookOpen, GraduationCap, Plus, Search, Layers, Award } from 'lucide-react';
import { DEPARTMENTS } from '../../data/mockData';

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState(null);

  const filteredDepts = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.hod.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
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
            <span style={{ fontSize: '2rem' }}>🏛️</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Academic Departments</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '600px' }}>
            Overview of university academic departments, department heads (HODs), student enrollment, faculty allocations, and curriculum tracks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.8rem 1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{departments.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Departments</div>
          </div>
          <div className="glass-card" style={{ padding: '0.8rem 1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
              {departments.reduce((acc, d) => acc + d.students, 0)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Students</div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '0.6rem 1rem',
          gap: '0.75rem',
          maxWidth: '450px',
        }}
      >
        <Search size={18} style={{ color: 'var(--text-secondary)' }} />
        <input
          type="text"
          placeholder="Search by department name, code, or HOD..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            width: '100%',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Departments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    background: 'rgba(99,102,241,0.15)',
                    color: 'var(--brand-primary)',
                  }}
                >
                  {dept.code}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dept ID: #{dept.id}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                {dept.name}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Head of Department:</strong> {dept.hod}
              </div>

              {/* Department Numbers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--bg-page)', padding: '0.75rem 0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.students}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Students</div>
                </div>

                <div style={{ background: 'var(--bg-page)', padding: '0.75rem 0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.faculty}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Faculty</div>
                </div>

                <div style={{ background: 'var(--bg-page)', padding: '0.75rem 0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.courses}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Courses</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedDept(dept)}
              className="btn"
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                background: 'var(--bg-page)',
                border: '1px solid var(--border-color)',
                color: 'var(--brand-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              View Department Details
            </button>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedDept && (
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
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '500px', padding: '2rem', animation: 'scaleIn 0.2s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{selectedDept.name}</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Department Code: {selectedDept.code}</div>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div><strong>HOD:</strong> {selectedDept.hod}</div>
              <div><strong>Active Students:</strong> {selectedDept.students} students enrolled</div>
              <div><strong>Faculty Strength:</strong> {selectedDept.faculty} professors and lecturers</div>
              <div><strong>Curriculum Courses:</strong> {selectedDept.courses} active subject modules</div>
              <div><strong>Laboratories:</strong> 6 Dedicated Advanced Labs</div>
              <div><strong>Accreditation:</strong> NBA Accredited, Tier-1 Institute Standards</div>
            </div>

            <button
              onClick={() => setSelectedDept(null)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '8px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
