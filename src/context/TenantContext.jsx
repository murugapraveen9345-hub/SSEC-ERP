import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext(null);

export const TENANTS = [
  {
    id: 'tnt_mit_01',
    name: 'Madras Institute of Tech (MIT)',
    code: 'MIT',
    domain: 'mit.unicore.edu',
    plan: 'Enterprise University',
    logo: '🏛️',
    students: 4856,
    maxStudents: 6000,
    faculty: 312,
    renewalDate: '2027-06-30',
    status: 'Active',
    currency: 'USD',
    mrr: 4500,
    accentColor: '#6366f1',
  },
  {
    id: 'tnt_bms_02',
    name: 'Bengaluru Metropolitan State University',
    code: 'BMSU',
    domain: 'bmsu.unicore.edu',
    plan: 'Growth Tier',
    logo: '🎓',
    students: 2340,
    maxStudents: 3000,
    faculty: 160,
    renewalDate: '2027-03-15',
    status: 'Active',
    currency: 'USD',
    mrr: 2200,
    accentColor: '#0ea5e9',
  },
  {
    id: 'tnt_hce_03',
    name: 'Hyderabad College of Engineering & Research',
    code: 'HCER',
    domain: 'hcer.unicore.edu',
    plan: 'Enterprise University',
    logo: '🔬',
    students: 5890,
    maxStudents: 7500,
    faculty: 410,
    renewalDate: '2026-11-20',
    status: 'Active',
    currency: 'USD',
    mrr: 5800,
    accentColor: '#10b981',
  },
  {
    id: 'tnt_dcu_04',
    name: 'Delhi Capital University',
    code: 'DCU',
    domain: 'dcu.unicore.edu',
    plan: 'Starter Pilot',
    logo: '🏛️',
    students: 750,
    maxStudents: 1000,
    faculty: 55,
    renewalDate: '2026-10-01',
    status: 'Active',
    currency: 'USD',
    mrr: 850,
    accentColor: '#f59e0b',
  },
];

export function TenantProvider({ children }) {
  const [activeTenant, setActiveTenant] = useState(() => {
    const saved = localStorage.getItem('unicore_tenant');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return TENANTS[0];
  });

  useEffect(() => {
    if (activeTenant) {
      localStorage.setItem('unicore_tenant', JSON.stringify(activeTenant));
    }
  }, [activeTenant]);

  const switchTenant = (tenantId) => {
    const found = TENANTS.find((t) => t.id === tenantId);
    if (found) setActiveTenant(found);
  };

  return (
    <TenantContext.Provider value={{ activeTenant, switchTenant, tenants: TENANTS }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
}
