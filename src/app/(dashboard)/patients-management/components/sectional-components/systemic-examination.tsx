import React, { useState } from "react";
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
  ChevronUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

const SystemicExaminationComponent: React.FC = () => {
  const { control } = useFormContext();
  const [expandedSection, setExpandedSection] = useState<string>("inspection");

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
