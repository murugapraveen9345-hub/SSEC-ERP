import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FEE_DETAILS } from '../../data/mockData';

export default function FeesPayment() {
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 2000));
    setPaying(false);
    setPaid(true);
  };

  const paidPct = Math.round((FEE_DETAILS.paid / FEE_DETAILS.total_fee) * 100);

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Fees & Payments</h1>
          <p className="page-subtitle">Academic Year 2026-27 · Secure online payment portal</p>
        </div>
        <button className="btn btn-secondary btn-sm"><Download size={14} /> Fee Receipt</button>
      </div>

      {/* Overview card */}
      <div className="card" style={{ marginBottom: 24, background: 'var(--gradient-primary)', border: 'none', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>Total Fee</div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em' }}>₹{FEE_DETAILS.total_fee.toLocaleString('en-IN')}</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Payment Progress</div>
              <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', height: 8, width: 250 }}>
                <div style={{ height: '100%', background: 'white', borderRadius: 'var(--radius-full)', width: `${paidPct}%`, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>{paidPct}% paid · ₹{FEE_DETAILS.due.toLocaleString('en-IN')} remaining</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'Paid', value: `₹${FEE_DETAILS.paid.toLocaleString('en-IN')}`, bg: 'rgba(255,255,255,0.15)' },
              { label: 'Due', value: `₹${FEE_DETAILS.due.toLocaleString('en-IN')}`, bg: 'rgba(239,68,68,0.25)' },
            ].map(item => (
              <div key={item.label} style={{ background: item.bg, borderRadius: 12, padding: '14px 20px', textAlign: 'center', minWidth: 120 }}>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{item.value}</div>
                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2, fontWeight: 600 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {FEE_DETAILS.due > 0 && !paid && (
        <div className="alert alert-warning" style={{ marginBottom: 20 }}>
          <AlertCircle size={16} />
          <div><strong>Due Date Alert:</strong> ₹{FEE_DETAILS.due.toLocaleString('en-IN')} is due by {FEE_DETAILS.due_date}. Late payment will incur ₹500 penalty.</div>
        </div>
      )}

      {paid && (
        <div className="alert alert-success" style={{ marginBottom: 20 }}>
          <CheckCircle size={16} />
          <div><strong>Payment Successful!</strong> Your payment of ₹{FEE_DETAILS.due.toLocaleString('en-IN')} has been processed. Transaction ID: TXN{Date.now()}</div>
        </div>
      )}

      <div className="dashboard-grid-2">
        {/* Fee Breakdown */}
        <div className="card">
          <div className="card-header"><span className="card-title">📋 Fee Breakdown</span></div>
          {FEE_DETAILS.breakdown.map((item) => (
            <div key={item.item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.item}</div>
                {item.date && <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Paid on {item.date}</div>}
                {item.due && <div style={{ fontSize: 11, color: '#ef4444' }}>₹{item.due.toLocaleString('en-IN')} pending</div>}
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 12 }}>
                <span style={{ fontWeight: 800, fontSize: 14 }}>₹{item.amount.toLocaleString('en-IN')}</span>
                <span className={`badge ${item.status === 'Paid' ? 'badge-success' : item.status === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>{item.status}</span>
              </div>
            </div>
          ))}

          {/* Pay Now */}
          {!paid && FEE_DETAILS.due > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Pay ₹{FEE_DETAILS.due.toLocaleString('en-IN')}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['UPI', 'Net Banking', 'Credit Card', 'Debit Card'].map(m => (
                    <button key={m} className="btn btn-secondary btn-sm">{m}</button>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary btn-full btn-lg" onClick={handlePay} disabled={paying}>
                {paying ? <><Loader size={16} className="animate-spin" /> Processing Payment...</> : <><CreditCard size={16} /> Pay Now — ₹{FEE_DETAILS.due.toLocaleString('en-IN')}</>}
              </button>
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="card">
          <div className="card-header"><span className="card-title">🧾 Payment History</span></div>
          {FEE_DETAILS.payment_history.map((txn) => (
            <div key={txn.txn} style={{ padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>₹{txn.amount.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{txn.txn}</div>
                </div>
                <span className="badge badge-success">{txn.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-tertiary)' }}>
                <span>{txn.date}</span>
                <span>{txn.mode}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
