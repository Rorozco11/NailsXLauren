'use client';

import { useEffect, useState, useCallback } from 'react';

type Booking = {
  id: string;
  full_name: string;
  phone_number: string | null;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  created_on: string;
  init_price: number | null;
};

type CalendarEvent = {
  booking: Booking;
  date: Date;
  time: string;
};

export default function CalendarView() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/bookings?search=&page=1&limit=1000');
      if (res.ok) {
        const json = await res.json();
        setBookings(json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    // Refresh bookings every 30 seconds to stay up to date
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  // Get calendar events grouped by date
  const getCalendarEvents = (): Map<string, CalendarEvent[]> => {
    const eventsMap = new Map<string, CalendarEvent[]>();

    bookings.forEach(booking => {
      if (booking.preferred_date) {
        const date = new Date(booking.preferred_date);
        const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        if (!eventsMap.has(dateKey)) {
          eventsMap.set(dateKey, []);
        }

        eventsMap.get(dateKey)!.push({
          booking,
          date,
          time: booking.preferred_time || 'Not specified'
        });
      }
    });

    // Sort events by time within each date
    eventsMap.forEach((events, dateKey) => {
      events.sort((a, b) => {
        if (!a.time || a.time === 'Not specified') return 1;
        if (!b.time || b.time === 'Not specified') return -1;
        return a.time.localeCompare(b.time);
      });
    });

    return eventsMap;
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  // Format time for display
  const formatTime = (time: string | null): string => {
    if (!time || time === 'Not specified') return 'Not specified';
    try {
      const [hours, minutes] = time.split(':');
      const hour24 = parseInt(hours, 10);
      if (isNaN(hour24)) return time;
      
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 < 12 ? 'AM' : 'PM';
      const mins = minutes || '00';
      
      return `${hour12}:${mins} ${ampm}`;
    } catch {
      return time;
    }
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle edit booking
  const handleEditBooking = (booking: Booking) => {
    // Close day details modal
    setSelectedDate(null);
    setSelectedDateEvents([]);
    // Open edit modal
    setEditingBooking(booking);
    // Format date for input (YYYY-MM-DD)
    if (booking.preferred_date) {
      const date = new Date(booking.preferred_date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setEditDate(`${year}-${month}-${day}`);
    } else {
      setEditDate('');
    }
    // Format time for input (HH:MM)
    setEditTime(booking.preferred_time || '');
  };

  // Handle save booking changes
  const handleSaveBooking = async () => {
    if (!editingBooking) return;

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingBooking.id,
          preferred_date: editDate || null,
          preferred_time: editTime || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update booking');
      }

      // Refresh bookings
      await fetchBookings();
      setEditingBooking(null);
      setEditDate('');
      setEditTime('');
      alert('Booking updated successfully');
    } catch (err) {
      console.error('Error updating booking:', err);
      alert(`Failed to update booking: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (bookingId: string, bookingName: string) => {
    if (!window.confirm(`Are you sure you want to delete the booking for "${bookingName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete booking');
      }

      // Refresh bookings and close modals
      await fetchBookings();
      setEditingBooking(null);
      setSelectedDate(null);
      setSelectedDateEvents([]);
      alert('Booking deleted successfully');
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert(`Failed to delete booking: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const eventsMap = getCalendarEvents();
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create array of days
  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontFamily: 'Work Sans, sans-serif',
        color: '#2C2C2C'
      }}>
        Loading calendar...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      fontFamily: 'Work Sans, sans-serif'
    }}>
      {/* Calendar Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#2C2C2C',
            fontFamily: 'Cormorant Garamond, serif'
          }}>
            {monthNames[month]} {year}
          </h2>
          <div style={{
            fontSize: '14px',
            color: '#666',
            padding: '6px 12px',
            background: '#FAF4F2',
            borderRadius: '6px'
          }}>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={goToPreviousMonth}
            style={{
              padding: '8px 12px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#2C2C2C',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FAF4F2';
              e.currentTarget.style.borderColor = '#A56C82';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#ddd';
            }}
          >
            ← Prev
          </button>
          <button
            onClick={goToToday}
            style={{
              padding: '8px 12px',
              background: '#A56C82',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'white',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8B5A6B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#A56C82';
            }}
          >
            Today
          </button>
          <button
            onClick={goToNextMonth}
            style={{
              padding: '8px 12px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#2C2C2C',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FAF4F2';
              e.currentTarget.style.borderColor = '#A56C82';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#ddd';
            }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {/* Day headers */}
        {dayNames.map(day => (
          <div
            key={day}
            style={{
              padding: '12px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '12px',
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} style={{ minHeight: '100px' }} />;
          }

          const dateKey = date.toISOString().split('T')[0];
          const dayEvents = eventsMap.get(dateKey) || [];
          const isCurrentDay = isToday(date);

          return (
            <div
              key={dateKey}
              onClick={() => {
                if (dayEvents.length > 0) {
                  setSelectedDate(dateKey);
                  setSelectedDateEvents(dayEvents);
                }
              }}
              style={{
                minHeight: '100px',
                padding: '8px',
                border: isCurrentDay ? '2px solid #A56C82' : '1px solid #e5e7eb',
                borderRadius: '8px',
                background: isCurrentDay ? '#FAF4F2' : 'white',
                position: 'relative',
                cursor: dayEvents.length > 0 ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (dayEvents.length > 0) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(165, 108, 130, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: isCurrentDay ? '700' : '600',
                color: isCurrentDay ? '#A56C82' : '#2C2C2C',
                marginBottom: '4px'
              }}>
                {date.getDate()}
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxHeight: '70px',
                overflowY: 'auto'
              }}>
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <div
                    key={`${event.booking.id}-${idx}`}
                    style={{
                      fontSize: '11px',
                      padding: '4px 6px',
                      background: '#A56C82',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s'
                    }}
                    title={`${event.booking.full_name} - ${formatTime(event.time)}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    <div style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {event.booking.full_name}
                    </div>
                    <div style={{ fontSize: '10px', opacity: 0.9 }}>
                      {formatTime(event.time)}
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div style={{
                    fontSize: '11px',
                    color: '#A56C82',
                    fontWeight: '600',
                    padding: '2px 4px'
                  }}>
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend/Stats */}
      <div style={{
        padding: '16px',
        background: '#FAF4F2',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ fontSize: '14px', color: '#2C2C2C' }}>
          <strong>{bookings.filter(b => b.preferred_date).length}</strong> bookings with dates
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Last updated: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDate && selectedDateEvents.length > 0 && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => {
              setSelectedDate(null);
              setSelectedDateEvents([]);
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '2px solid #f0f0f0',
                paddingBottom: '12px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2C2C2C',
                  fontFamily: 'Cormorant Garamond, serif'
                }}>
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedDateEvents([]);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedDateEvents.map((event, idx) => (
                  <div
                    key={`${event.booking.id}-${idx}`}
                    style={{
                      padding: '16px',
                      background: '#FAF4F2',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#2C2C2C',
                          marginBottom: '4px'
                        }}>
                          {event.booking.full_name}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#A56C82',
                          fontWeight: '600'
                        }}>
                          {formatTime(event.time)}
                        </div>
                      </div>
                    </div>
                    {event.booking.phone_number && (
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                        📞 {event.booking.phone_number}
                      </div>
                    )}
                    {event.booking.email && (
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                        ✉️ {event.booking.email}
                      </div>
                    )}
                    {event.booking.init_price && (
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '4px', fontWeight: '600' }}>
                        💰 ${event.booking.init_price}
                      </div>
                    )}
                    {event.booking.message && (
                      <div style={{
                        fontSize: '13px',
                        color: '#666',
                        marginTop: '8px',
                        padding: '8px',
                        background: 'white',
                        borderRadius: '4px',
                        fontStyle: 'italic'
                      }}>
                        "{event.booking.message}"
                      </div>
                    )}
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid #e5e7eb',
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBooking(event.booking);
                        }}
                        style={{
                          padding: '10px 20px',
                          background: '#64748b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'background 0.2s',
                          fontFamily: 'Work Sans, sans-serif',
                          boxShadow: '0 2px 4px rgba(100, 116, 139, 0.2)',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#475569';
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(100, 116, 139, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#64748b';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(100, 116, 139, 0.2)';
                        }}
                      >
                        Edit Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Booking Modal */}
      {editingBooking && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => {
              setEditingBooking(null);
              setEditDate('');
              setEditTime('');
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '2px solid #f0f0f0',
                paddingBottom: '12px'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#2C2C2C',
                  fontFamily: 'Cormorant Garamond, serif'
                }}>
                  Edit Booking - {editingBooking.full_name}
                </h3>
                <button
                  onClick={() => {
                    setEditingBooking(null);
                    setEditDate('');
                    setEditTime('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2C2C2C',
                    marginBottom: '8px',
                    fontFamily: 'Work Sans, sans-serif'
                  }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'Work Sans, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2C2C2C',
                    marginBottom: '8px',
                    fontFamily: 'Work Sans, sans-serif'
                  }}>
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'Work Sans, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '8px'
                }}>
                  <button
                    onClick={handleSaveBooking}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#A56C82',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'background 0.2s',
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8B5A6B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#A56C82';
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(editingBooking.id, editingBooking.full_name)}
                    style={{
                      padding: '12px 20px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'background 0.2s',
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626';
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

