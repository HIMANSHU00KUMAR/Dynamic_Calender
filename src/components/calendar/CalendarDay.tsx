import { cn } from '@/lib/utils';
import { Event } from '@/types/event';
import { Badge } from '@/components/ui/badge';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export function CalendarDay({
  date,
  events,
  isToday,
  isCurrentMonth,
  onClick,
}: CalendarDayProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'calendar-day min-h-[120px] p-2 border border-border/30 rounded-lg',
        'hover:bg-accent/50 hover:border-primary/30',
        isCurrentMonth ? 'bg-card/80' : 'bg-card/40',
        isToday && 'ring-2 ring-primary/50 shadow-lg shadow-primary/20'
      )}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn(
            'text-sm font-medium',
            !isCurrentMonth && 'text-muted-foreground'
          )}
        >
          {date.getDate()}
        </span>
        {events.length > 0 && (
          <Badge variant="secondary" className="text-xs bg-primary/20 text-primary-foreground  hover:bg-primary/30">
            {events.length}
          </Badge>
        )}
      </div>
      <div className="mt-2 space-y-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={cn(
              "text-xs p-1.5 rounded-md transition-colors backdrop-blur-sm",
              event.color === 'work' && 'bg-blue-500/20 text-blue-200',
              event.color === 'personal' && 'bg-purple-500/20 text-purple-200',
              event.color === 'other' && 'bg-orange-500/20 text-orange-200',
              event.color === 'default' && 'bg-primary/20 text-primary'
            )}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
        {events.length > 3 && (
          <div className="text-xs text-primary/90 font-medium pl-1.5">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}