import React, { useState } from 'react';
import {
  Plane, Plus, Calendar, Clock, CheckCircle2, XCircle,
  AlertCircle, FileText, Check, X, Filter, User
} from 'lucide-react';
import { LEAVE_APPLICATIONS, ROLES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const STATUS_BADGES = {
  Approved: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', icon: CheckCircle2 },
  Pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', icon: AlertCircle },
  Rejected: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', icon: XCircle },
};

export default function LeaveODManagement() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(LEAVE_APPLICATIONS);
  const [filter, setFilter] = useState('All');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Medical Leave',
    from: '',
    to: '',
    reason: '',
    docs: '',
  });

  const isStaff = user?.role === ROLES.FACULTY || user?.role === ROLES.ADMIN;

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.reason) return;

    const startDate = new Date(formData.from);
    const endDate = new Date(formData.to);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newApp = {
      id: `L00${applications.length + 1}`,
      type: formData.type,
      from: formData.from,
      to: formData.to,
      days: diffDays || 1,
      reason: formData.reason,
      status: 'Pending',
      applied: new Date().toISOString().split('T')[0],
      approver: null,
      docs: formData.docs ? 'Document_Uploaded.pdf' : null,
      studentName: user?.name || 'Arjun Sharma',
    };

    setApplications([newApp, ...applications]);
    setShowApplyModal(false);
    setFormData({ type: 'Medical Leave', from: '', to: '', reason: '', docs: '' });
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: newStatus,
              approver: newStatus === 'Approved' ? (user?.name || 'Faculty Advisor') : app.approver,
            }
          : app
      )
    );
  };

  const filteredApps = applications.filter((app) => {
    if (filter === 'All') return true;
    return app.status === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Leave & On-Duty (OD) Portal</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            Submit, track, and manage official leave and on-duty requests seamlessly.
          </p>
        </div>

        {!isStaff && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '10px' }}
          >
            <Plus size={18} /> Apply Leave / OD
          </button>
        )}
      </div>

      {/* Leave Balance Stats Cards (For Students) */}
      {!isStaff && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Medical Leave Balance</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#10b981' }}>5 Days</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Valid with medical doc</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Casual Leave Balance</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#6366f1' }}>3 Days</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Max 2 consecutive</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>OD (On Duty) Utilized</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#f59e0b' }}>2 Days</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Attendance protected</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending Requests</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#0ea5e9' }}>
              {applications.filter((a) => a.status === 'Pending').length}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Awaiting HOD/Advisor review</span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Filter by:</span>
        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === status ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)',
              background: filter === status ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
              color: filter === status ? 'var(--brand-primary)' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Application List Table / Cards */}
      <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Application ID</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Duration</th>
                <th style={{ padding: '1rem' }}>Days</th>
                <th style={{ padding: '1rem' }}>Reason & Docs</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Action / Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => {
                const badge = STATUS_BADGES[app.status] || STATUS_BADGES.Pending;
                const StatusIcon = badge.icon;

                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{app.id}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.type}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Applied on {app.applied}</div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                      {app.from} to {app.to}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>{app.days} {app.days === 1 ? 'day' : 'days'}</td>
                    <td style={{ padding: '1rem', maxWidth: '250px' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {app.reason}
                      </div>
                      {app.docs && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--brand-primary)', marginTop: '4px' }}>
                          <FileText size={12} /> {app.docs}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        <StatusIcon size={14} />
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {isStaff && app.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleStatusChange(app.id, 'Approved')}
                            className="btn"
                            style={{
                              padding: '0.4rem 0.75rem',
                              background: '#10b981',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            }}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(app.id, 'Rejected')}
                            className="btn"
                            style={{
                              padding: '0.4rem 0.75rem',
                              background: '#ef4444',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            }}
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {app.approver ? `Reviewed by ${app.approver}` : 'Awaiting review'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyModal && (
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
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '2rem',
              animation: 'scaleIn 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Apply for Leave / OD</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Leave Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-page)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="OD (On Duty)">OD (On Duty - Technical / Hackathon)</option>
                  <option value="Special Leave">Special Leave (Sports / Cultural)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    From Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-page)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    To Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-page)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Detailed Reason
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Explain reason for absence or details of the event..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-page)',
                    color: 'var(--text-primary)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Supporting Document (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, docs: e.target.files[0]?.name || '' })}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px dashed var(--border-color)',
                    background: 'var(--bg-page)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="btn"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '8px' }}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
