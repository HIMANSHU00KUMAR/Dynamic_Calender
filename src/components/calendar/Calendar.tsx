import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
import { getDaysInMonth, formatDate, isToday, isSameMonth } from '@/lib/date-utils';
import { Event } from '@/types/event';
import { CalendarDay } from './CalendarDay';

interface CalendarProps {
  events: { [date: string]: Event[] };
  onDayClick: (date: Date) => void;
}

export function Calendar({ events, onDayClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center font-semibold text-sm text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {days.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            events={events[formatDate(date)] || []}
            isToday={isToday(date)}
            isCurrentMonth={isSameMonth(date, currentDate.getMonth())}
            onClick={() => onDayClick(date)}
          />
        ))}
      </div>
    </div>
  );
}