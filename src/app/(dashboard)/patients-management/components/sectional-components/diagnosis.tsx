import React from "react";
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
  Stethoscope, 
  FileQuestion, 
  FileCog, 
  FileCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

const DIAGNOSIS_FIELDS = [
  {
    name: "provisionalDiagnosis",
    label: "Provisional Diagnosis",
    icon: FileQuestion,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    placeholder: "Enter provisional diagnosis"
  },
  {
    name: "differentialDiagnosis",
    label: "Differential Diagnosis",
    icon: FileCog,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    placeholder: "Enter differential diagnosis"
  },
  {
    name: "finalDiagnosis",
    label: "Final Diagnosis",
    icon: FileCheck,
    color: "text-green-500",
    bgColor: "bg-green-50",
    placeholder: "Enter final diagnosis"
  }
];

const DiagnosisComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Diagnosis
        </h1>
      </div>

      <div className="p-6 space-y-6">
        {DIAGNOSIS_FIELDS.map((field) => {
          const Icon = field.icon;
          return (
            <div 
              key={field.name}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md"
            >
              <FormField
                control={control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 mb-3">
                      <div className={cn("p-2 rounded-lg", field.bgColor)}>
                        <Icon className={cn("h-4 w-4", field.color)} />
                      </div>
                      <span className="font-medium text-gray-700">{field.label}</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={field.placeholder}
                        className={cn(
                          "min-h-[120px]",
                          "border border-gray-300",
                          "focus:ring-2",
                          `focus:ring-${field.color.split('-')[1]}-500`,
                          "transition-all duration-200"
                        )}
                        {...formField}
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
  );
};

export default DiagnosisComponent;
