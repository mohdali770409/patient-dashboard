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
  Brain, 

  Heart, 
  Eye,
  HandMetal,
  Activity,
  Stethoscope,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GiKidneys as Kidney } from "react-icons/gi";
import { GiStomach as Stomach } from "react-icons/gi";
import { Calendar } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

const systems = [
  { 
    name: "CNS", 
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50" 
  },
  { 
    name: "Renal", 
    icon: Kidney,
    color: "text-blue-500",
    bgColor: "bg-blue-50" 
  },
  { 
    name: "Gastrointestinal", 
    icon: Stomach,
    color: "text-green-500",
    bgColor: "bg-green-50" 
  },
  { 
    name: "Cardiovascular", 
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50" 
  }
];

const examTypes = [
  { name: "inspection", label: "Inspection", icon: Eye },
  { name: "palpation", label: "Palpation", icon: HandMetal },
  { name: "percussion", label: "Percussion", icon: Activity },
  { name: "auscultation", label: "Auscultation", icon: Stethoscope }
];

interface OtherSystemicExamination {
  cns: SystemExamFields;
  renal: SystemExamFields;
  gastrointestinal: SystemExamFields;
  cardiovascular: SystemExamFields;
  date: string;
  _id: string;
}

interface SystemExamFields {
  inspection: string;
  palpation: string;
  percussion: string;
  auscultation: string;
}

interface OtherSystemicExaminationComponentProps {
  existingExaminations?: any[];
}

const OtherSystemicExaminationComponent: React.FC<OtherSystemicExaminationComponentProps> = ({
  existingExaminations = []
}) => {
  const { control, setValue } = useFormContext();
  const [expandedSystem, setExpandedSystem] = useState<string>("CNS");
  const [expandedExam, setExpandedExam] = useState<string>("inspection");

  const dateOptions = useMemo(() => {
    return existingExaminations.map(exam => ({
      value: exam.date,
      label: new Date(exam.date).toLocaleDateString(),
      data: exam
    }));
  }, [existingExaminations]);

  const handleDateSelect = (selectedDate: string) => {
    const selectedExam = existingExaminations.find(
      exam => exam.date === selectedDate
    );
    
    if (selectedExam) {
      setValue("otherSystemicExamination.date", new Date(selectedExam.date));
      systems.forEach((system:any) => {
        examTypes.forEach((examType:any) => {
          setValue(
            `otherSystemicExamination.${system.name.toLowerCase()}.${examType.name}`,
            selectedExam[system.name.toLowerCase()][examType.name]
          );
        });
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Other Systemic Examination
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
          name="otherSystemicExamination.date"
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

        {systems.map((system) => {
          const SystemIcon = system.icon;
          const isSystemExpanded = expandedSystem === system.name;

          return (
            <div
              key={system.name}
              className={cn(
                "rounded-lg border transition-all duration-200",
                isSystemExpanded ? system.bgColor : "bg-white",
                "hover:shadow-md"
              )}
            >
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => setExpandedSystem(isSystemExpanded ? "" : system.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", system.bgColor)}>
                    <SystemIcon className={cn("h-5 w-5", system.color)} />
                  </div>
                  <h2 className="font-medium text-gray-700">{system.name}</h2>
                </div>
                {isSystemExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isSystemExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-4 space-y-4">
                  {examTypes.map((examType) => {
                    const ExamIcon = examType.icon;
                    const isExamExpanded = expandedExam === examType.name;

                    return (
                      <div
                        key={`${system.name}-${examType.name}`}
                        className="ml-4"
                      >
                        <FormField
                          control={control}
                          name={`otherSystemicExamination.${system.name.toLowerCase()}.${examType.name}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <ExamIcon className={cn("h-4 w-4", system.color)} />
                                {examType.label}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={`Enter ${system.name} ${examType.label.toLowerCase()} details`}
                                  className={cn(
                                    "min-h-[100px]",
                                    "transition-all duration-200",
                                    "focus:ring-2",
                                    `focus:ring-${system.color.split('-')[1]}-500`
                                  )}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherSystemicExaminationComponent;
