import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, ActivitySquare, Stethoscope, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

const STATUS_OPTIONS = [
  { value: "cured", label: "Cured", color: "text-green-500" },
  { value: "defaulter", label: "Defaulter", color: "text-red-500" },
  { value: "improving", label: "Improving", color: "text-blue-500" },
  { value: "relapser", label: "Relapser", color: "text-orange-500" }
];

interface Treatment {
  treatment: string;
  date: string;
  _id: string;
}

interface OngoingTreatmentComponentProps {
  existingTreatments?: Treatment[];
}

const OngoingTreatmentComponent: React.FC<OngoingTreatmentComponentProps> = ({
  existingTreatments = []
}) => {
  const { control, setValue } = useFormContext();

  // Format dates for display
  const treatmentDateOptions = useMemo(() => {
    return existingTreatments.map(treatment => ({
      value: treatment.date,
      label: new Date(treatment.date).toLocaleDateString(),
      treatment: treatment.treatment
    }));
  }, [existingTreatments]);

  // Handle date selection
  const handleTreatmentDateSelect = (selectedDate: string) => {
    const selectedTreatment = existingTreatments.find(
      t => t.date === selectedDate
    );
    
    if (selectedTreatment) {
      setValue("ourPlanOfAction.treatment", selectedTreatment.treatment);
      setValue("ourPlanOfAction.date", new Date(selectedTreatment.date));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Ongoing Treatment
        </h1>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="font-medium text-gray-700 flex items-center gap-2 mb-4">
              <ClipboardList className="h-5 w-5 text-cyan-500" />
              Our Plan of Action
            </h2>

            <div className="space-y-4">
              {existingTreatments && existingTreatments.length > 0 && (
                <div>
                  <FormLabel>View Previous Treatment Plans</FormLabel>
                  <Select onValueChange={handleTreatmentDateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date to view treatment plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatmentDateOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <FormField
                control={control}
                name="ourPlanOfAction.date"
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
                name="ourPlanOfAction.treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treatment Plan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the plan of action..."
                        className={cn(
                          "min-h-[150px]",
                          "border border-gray-300",
                          "rounded-md p-2",
                          "focus:ring-2",
                          "focus:ring-cyan-500"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-50">
                      <ActivitySquare className="h-4 w-4 text-cyan-500" />
                    </div>
                    <span className="font-medium text-gray-700">Status</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-cyan-500">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="flex items-center gap-2"
                        >
                          <span className={option.color}>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingTreatmentComponent;
