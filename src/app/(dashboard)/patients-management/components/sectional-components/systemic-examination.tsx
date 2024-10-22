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

const SystemicExaminationComponent: React.FC = () => {
  const { control } = useFormContext();

  const examinations = [
    { name: "inspection", label: "Inspection" },
    { name: "palpation", label: "Palpation" },
    { name: "percussion", label: "Percussion" },
    { name: "auscultation", label: "Auscultation" },
  ];

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Systemic Examination</h1>
      
      {examinations.map((exam) => (
        <FormField
          key={exam.name}
          control={control}
          name={`systemicExamination.${exam.name}`}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{exam.label}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`Enter ${exam.label.toLowerCase()} details here`}
                  {...field} 
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default SystemicExaminationComponent;
