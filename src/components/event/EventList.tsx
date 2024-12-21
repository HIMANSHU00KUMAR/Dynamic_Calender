import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event } from '@/types/event';
import { formatEventTime } from '@/lib/date-utils';
import { Pencil, Trash2 } from 'lucide-react';

interface EventListProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
  selectedDate: Date;
  onFilter: (keyword: string) => void;
}

export function EventList({
  isOpen,
  onClose,
  events,
  onEditEvent,
  onDeleteEvent,
  selectedDate,
  onFilter,
}: EventListProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Events for {selectedDate.toLocaleDateString()}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <Input
            placeholder="Filter events..."
            onChange={(e) => onFilter(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-border"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatEventTime(event.startTime)} -{' '}
                        {formatEventTime(event.endTime)}
                      </p>
                      {event.description && (
                        <p className="text-sm mt-2">{event.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditEvent(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No events found
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}