import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  dates: Date[];
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  dates,
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md">
      <Calendar className="h-4 w-4 text-white" />
      <Select
        value={selectedDate?.toISOString()}
        onValueChange={(value) => onDateChange(new Date(value))}
      >
        <SelectTrigger className="w-[180px] bg-transparent border-white/20 text-white">
          <SelectValue placeholder="Select date">
            {selectedDate ? format(selectedDate, 'dd MMM yyyy, HH:mm') : 'Select date'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {dates.map((date) => (
            <SelectItem key={date.toISOString()} value={date.toISOString()}>
              {format(date, 'dd MMM yyyy, HH:mm')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 