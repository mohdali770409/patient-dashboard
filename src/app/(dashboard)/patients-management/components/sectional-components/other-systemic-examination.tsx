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

const systems = ["CNS", "Renal", "Gastrointestinal", "Cardiovascular"];
const examTypes = ["inspection", "palpation", "percussion", "auscultation"];

const OtherSystemicExaminationComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Other Systemic Examination</h1>
      
      {systems.map((system) => (
        <div key={system} className="mb-6">
          <h2 className="font-medium mb-3 text-gray-400">{system}</h2>
          {examTypes.map((examType) => (
            <FormField
              key={`${system}-${examType}`}
              control={control}
              name={`otherSystemicExamination.${system.toLowerCase()}.${examType}`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>{examType.charAt(0).toUpperCase() + examType.slice(1)}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Enter ${system} ${examType} details here`}
                      {...field} 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OtherSystemicExaminationComponent;
