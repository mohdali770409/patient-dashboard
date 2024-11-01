import React, { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  HandMetal, 
  Stethoscope, 
  Activity,
  ChevronDown,
  ChevronUp,
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SystemicExamination {
  inspection: string;
  palpation: string;
  percussion: string;
  auscultation: string;
  date: string;
  _id: string;
}

interface SystemicExaminationComponentProps {
  existingExaminations?: SystemicExamination[];
}

const SystemicExaminationComponent: React.FC<SystemicExaminationComponentProps> = ({
  existingExaminations = []
}) => {
  const { control, setValue } = useFormContext();
  const [expandedSection, setExpandedSection] = useState<string>("inspection");

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
      setValue("systemicExamination.date", new Date(selectedExam.date));
      setValue("systemicExamination.inspection", selectedExam.inspection);
      setValue("systemicExamination.palpation", selectedExam.palpation);
      setValue("systemicExamination.percussion", selectedExam.percussion);
      setValue("systemicExamination.auscultation", selectedExam.auscultation);
    }
  };

  const examinations = [
    { 
      name: "inspection", 
      label: "Inspection",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      ringColor: "focus:ring-blue-500"
    },
    { 
      name: "palpation", 
      label: "Palpation",
      icon: HandMetal,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      ringColor: "focus:ring-purple-500"
    },
    { 
      name: "percussion", 
      label: "Percussion",
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-50",
      ringColor: "focus:ring-green-500"
    },
    { 
      name: "auscultation", 
      label: "Auscultation",
      icon: Stethoscope,
      color: "text-red-500",
      bgColor: "bg-red-50",
      ringColor: "focus:ring-red-500"
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Systemic Examination
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
          name="systemicExamination.date"
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

        {examinations.map((exam) => {
          const Icon = exam.icon;
          const isExpanded = expandedSection === exam.name;

          return (
            <div
              key={exam.name}
              className={cn(
                "rounded-lg border transition-all duration-200",
                isExpanded ? exam.bgColor : "bg-white",
                "hover:shadow-md"
              )}
            >
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => setExpandedSection(isExpanded ? "" : exam.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", exam.bgColor)}>
                    <Icon className={cn("h-5 w-5", exam.color)} />
                  </div>
                  <h2 className="font-medium text-gray-700">{exam.label}</h2>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-4">
                  <FormField
                    control={control}
                    name={`systemicExamination.${exam.name}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={`Enter ${exam.label.toLowerCase()} details here`}
                            className={cn(
                              "min-h-[150px]",
                              "transition-all duration-200",
                              "focus:ring-2",
                              exam.ringColor
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemicExaminationComponent;
