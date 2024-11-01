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
import { Eye } from "lucide-react"; // Example icon
import { Calendar } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface LocalExamination {
  others: string;
  date: string;
  _id: string;
}

interface LocalExaminationComponentProps {
  existingExaminations?: LocalExamination[];
}

const LocalExaminationComponent: React.FC<LocalExaminationComponentProps> = ({ 
  existingExaminations = [] 
}) => {
  const { control, setValue } = useFormContext();

  // Format dates for display
  const dateOptions = useMemo(() => {
    return existingExaminations.map(exam => ({
      value: exam.date,
      label: new Date(exam.date).toLocaleDateString(),
      data: exam
    }));
  }, [existingExaminations]);

  // Handle date selection
  const handleDateSelect = (selectedDate: string) => {
    const selectedExam = existingExaminations.find(
      exam => exam.date === selectedDate
    );
    
    if (selectedExam) {
      setValue("localExamination.date", new Date(selectedExam.date));
      setValue("localExamination.others", selectedExam.others);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Local Examination
        </h1>
      </div>

      <div className="p-6 space-y-4">
        {existingExaminations.length > 0 && (
          <div className="mb-4">
            <FormLabel>View Previous Examinations</FormLabel>
            <Select onValueChange={handleDateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select date to view examination" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <FormField
          control={control}
          name="localExamination.date"
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
          name="localExamination.others"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Others</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional local examination details here"
                  {...field}
                  className="min-h-[150px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
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

export default LocalExaminationComponent;
