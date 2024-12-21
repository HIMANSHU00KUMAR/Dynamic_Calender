import { useState } from 'react';
import { Calendar } from '@/components/calendar/Calendar';
import { EventDialog } from '@/components/event/EventDialog';
import { EventList } from '@/components/event/EventList';
import { Event } from '@/types/event';
import { formatDate } from '@/lib/date-utils';
import { AppHeader } from '@/components/app/AppHeader';
import { useEvents } from '@/hooks/useEvents';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const { 
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    exportEvents
  } = useEvents();

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventListOpen(true);
    setFilteredEvents(events[formatDate(date)] || []);
  };

  const handleAddEvent = () => {
    setSelectedEvent(undefined);
    setIsEventDialogOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setFilteredEvents(events[formatDate(selectedDate)] || []);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setFilteredEvents(events[formatDate(selectedDate)] || []);
  };

  const handleFilter = (keyword: string) => {
    const date = formatDate(selectedDate);
    const dayEvents = events[date] || [];
    setFilteredEvents(
      keyword
        ? dayEvents.filter((event) =>
            event.title.toLowerCase().includes(keyword.toLowerCase())
          )
        : dayEvents
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/50 p-8">
      <div className="max-w-7xl mx-auto ">
        <AppHeader onAddEvent={handleAddEvent} onExport={exportEvents} />
        
        <div className="glass-card rounded-xl p-6 shimmer">
          <Calendar events={events} onDayClick={handleDayClick} />
        </div>

        <EventDialog
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
          event={selectedEvent}
        />

        <EventList
          isOpen={isEventListOpen}
          onClose={() => setIsEventListOpen(false)}
          events={filteredEvents}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          selectedDate={selectedDate}
          onFilter={handleFilter}
        />
      </div>
    </div>
  );
}