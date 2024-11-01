import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChiefComplaint {
  complaint: string;
  date: string;
  _id: string;
}

interface ChiefComplaintComponentProps {
  existingComplaints?: ChiefComplaint[];
}

const ChiefComplaintComponent: React.FC<ChiefComplaintComponentProps> = ({ existingComplaints = [] }) => {
  const { control, setValue } = useFormContext();
  
  // Format dates for display
  const dateOptions = useMemo(() => {
    return existingComplaints.map(complaint => ({
      value: complaint.date,
      label: new Date(complaint.date).toLocaleDateString(),
      complaint: complaint.complaint
    }));
  }, [existingComplaints]);

  // Handle date selection
  const handleDateSelect = (selectedDate: string) => {
    const selectedComplaint = existingComplaints.find(
      c => c.date === selectedDate
    );
    
    if (selectedComplaint) {
      setValue("chiefComplaint.date", new Date(selectedComplaint.date));
      setValue("chiefComplaint.complaint", selectedComplaint.complaint);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Chief Complaint
        </h1>
      </div>

      <div className="p-6 space-y-4">
        {existingComplaints.length > 0 && (
          <div className="mb-4">
            <FormLabel>View Previous Complaints</FormLabel>
            <Select onValueChange={handleDateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select date to view complaint" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option, index) => (
                  <SelectItem key={`${option.value}-${index}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <FormField
          control={control}
          name="chiefComplaint.date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="chiefComplaint.complaint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complaint</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter chief complaint"
                  {...field}
                  className="min-h-[150px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ChiefComplaintComponent;
