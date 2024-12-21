import { useState, useEffect } from 'react';
import { Event, DayEvents } from '@/types/event';
import { formatDate } from '@/lib/date-utils';

export function useEvents() {
  const [events, setEvents] = useState<DayEvents>({});

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const date = formatDate(new Date(eventData.date));
    const newEvent = {
      ...eventData,
      id: crypto.randomUUID(),
    };
    
    setEvents(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newEvent]
    }));
  };

  const updateEvent = (eventId: string, eventData: Omit<Event, 'id'>) => {
    const date = formatDate(new Date(eventData.date));
    setEvents(prev => ({
      ...prev,
      [date]: (prev[date] || []).map((event) =>
        event.id === eventId
          ? { ...eventData, id: event.id }
          : event
      )
    }));
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => {
      const newEvents = { ...prev };
      Object.keys(newEvents).forEach(date => {
        newEvents[date] = newEvents[date].filter(event => event.id !== eventId);
        if (newEvents[date].length === 0) {
          delete newEvents[date];
        }
      });
      return newEvents;
    });
  };

  const exportEvents = () => {
    const data = JSON.stringify(events, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar-events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    exportEvents
  };
}