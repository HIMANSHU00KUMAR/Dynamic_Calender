import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';

interface AppHeaderProps {
  onAddEvent: () => void;
  onExport: () => void;
}

export function AppHeader({ onAddEvent, onExport }: AppHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold gradient-text">
        Event Calendar
      </h1>
      <div className="flex gap-4">
        <Button 
          onClick={onAddEvent} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-primary/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
        <Button 
          variant="outline" 
          onClick={onExport} 
          className="border-primary/20 hover:border-primary/30 shadow hover:shadow-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Events
        </Button>
      </div>
    </div>
  );
}