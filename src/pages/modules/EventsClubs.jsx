import React, { useState } from 'react';
import {
  PartyPopper, Calendar, MapPin, Users, CheckCircle, Plus,
  Sparkles, Trophy, Filter, ArrowRight, Clock, Star
} from 'lucide-react';
import { EVENTS, CLUBS } from '../../data/mockData';

const CATEGORY_COLORS = {
  Technical: { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
  Cultural: { bg: 'rgba(236,72,153,0.1)', color: '#ec4899' },
  Workshop: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  Placement: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  Social: { bg: 'rgba(14,165,233,0.1)', color: '#0ea5e9' },
  Professional: { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
  Literary: { bg: 'rgba(249,115,22,0.1)', color: '#f97316' },
};

export default function EventsClubs() {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'clubs'
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [eventsList, setEventsList] = useState(EVENTS);
  const [registeredEvents, setRegisteredEvents] = useState([1]); // IDs of registered events
  const [joinedClubs, setJoinedClubs] = useState([1]); // IDs of joined clubs
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(null);

  const filterCategories = ['All', 'Technical', 'Cultural', 'Workshop', 'Placement', 'Social'];

  const filteredEvents = eventsList.filter((event) => {
    if (selectedFilter === 'All') return true;
    return event.type.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleRegisterEvent = (eventId) => {
    if (registeredEvents.includes(eventId)) return;
    setRegisteredEvents((prev) => [...prev, eventId]);
    setEventsList((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registrations: e.registrations + 1 } : e))
    );
    setShowRegisterSuccess(eventId);
    setTimeout(() => setShowRegisterSuccess(null), 3000);
  };

  const handleJoinClub = (clubId) => {
    if (joinedClubs.includes(clubId)) {
      setJoinedClubs((prev) => prev.filter((id) => id !== clubId));
    } else {
      setJoinedClubs((prev) => [...prev, clubId]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.15) 100%)',
          borderColor: 'rgba(99,102,241,0.25)',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>🎉</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Campus Life & Activities</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '600px' }}>
            Discover campus fests, competitive hackathons, technical workshops, and student-run clubs to elevate your university journey.
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.35rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('events')}
            className="btn"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9px',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: activeTab === 'events' ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === 'events' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Events & Fests ({eventsList.length})
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className="btn"
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9px',
              fontWeight: 600,
              fontSize: '0.9rem',
              background: activeTab === 'clubs' ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === 'clubs' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Student Clubs ({CLUBS.length})
          </button>
        </div>
      </div>

      {/* EVENTS TAB CONTENT */}
      {activeTab === 'events' && (
        <>
          {/* Filters Bar */}
          <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedFilter === cat ? '1px solid var(--brand-primary)' : '1px solid var(--border-color)',
                  background: selectedFilter === cat ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
                  color: selectedFilter === cat ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredEvents.map((evt) => {
              const isRegistered = registeredEvents.includes(evt.id);
              const colorInfo = CATEGORY_COLORS[evt.type] || { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
              const fillPct = Math.min(100, Math.round((evt.registrations / evt.maxReg) * 100));

              return (
                <div
                  key={evt.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    {/* Header with Type Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span
                        style={{
                          padding: '0.3rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: colorInfo.bg,
                          color: colorInfo.color,
                        }}
                      >
                        {evt.type}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {evt.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {evt.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                      {evt.description}
                    </p>

                    {/* Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={15} style={{ color: 'var(--brand-primary)' }} />
                        <span>{evt.date} {evt.endDate !== evt.date && `to ${evt.endDate}`}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={15} style={{ color: '#ef4444' }} />
                        <span>{evt.venue}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={15} style={{ color: '#10b981' }} />
                        <span>By {evt.organizer}</span>
                      </div>
                    </div>

                    {/* Progress Bar for Seats */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>Registration slots</span>
                        <span style={{ fontWeight: 600 }}>{evt.registrations} / {evt.maxReg} ({fillPct}%)</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${fillPct}%`,
                            height: '100%',
                            background: fillPct > 80 ? '#ef4444' : 'var(--brand-primary)',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Register Action */}
                  <button
                    onClick={() => handleRegisterEvent(evt.id)}
                    disabled={isRegistered}
                    className="btn"
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      borderRadius: '10px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: isRegistered ? 'rgba(16,185,129,0.15)' : 'var(--brand-primary)',
                      color: isRegistered ? '#10b981' : '#fff',
                      border: isRegistered ? '1px solid rgba(16,185,129,0.3)' : 'none',
                      cursor: isRegistered ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle size={16} /> Registered
                      </>
                    ) : (
                      <>
                        Register Now <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {showRegisterSuccess === evt.id && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(16, 185, 129, 0.95)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        borderRadius: '12px',
                        animation: 'fadeIn 0.2s ease',
                      }}
                    >
                      <CheckCircle size={40} style={{ marginBottom: '0.5rem' }} />
                      <h4 style={{ margin: 0, fontWeight: 700 }}>Registered Successfully!</h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>E-ticket sent to your email</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* CLUBS TAB CONTENT */}
      {activeTab === 'clubs' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {CLUBS.map((club) => {
            const isMember = joinedClubs.includes(club.id);
            const colorInfo = CATEGORY_COLORS[club.category] || { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };

            return (
              <div
                key={club.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{club.logo}</div>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: colorInfo.bg,
                        color: colorInfo.color,
                      }}
                    >
                      {club.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                    {club.name}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Student Lead:</strong> {club.lead}
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Faculty Advisor:</strong> {club.faculty_advisor}
                    </div>
                  </div>

                  {/* Club Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ background: 'var(--bg-page)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {club.members + (isMember ? 1 : 0)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Members</div>
                    </div>
                    <div style={{ background: 'var(--bg-page)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{club.events}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Events Organized</div>
                    </div>
                  </div>
                </div>

                {/* Membership Action */}
                <button
                  onClick={() => handleJoinClub(club.id)}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: isMember ? 'rgba(239, 68, 68, 0.1)' : 'var(--brand-primary)',
                    color: isMember ? '#ef4444' : '#fff',
                    border: isMember ? '1px solid rgba(239, 68, 68, 0.25)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isMember ? 'Leave Club' : 'Join Club'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
