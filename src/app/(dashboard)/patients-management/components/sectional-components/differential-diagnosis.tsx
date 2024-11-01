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
import { FileCog } from "lucide-react";
import { cn } from "@/lib/utils";

const DifferentialDiagnosisComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <FileCog className="h-5 w-5" />
          Differential Diagnosis
        </h1>
      </div>

      <div className="p-6">
        <FormField
          control={control}
          name="differentialDiagnosis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter differential diagnosis"
                  className={cn(
                    "min-h-[120px]",
                    "border border-gray-300",
                    "focus:ring-2",
                    "focus:ring-blue-500",
                    "transition-all duration-200"
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
  );
};

export default DifferentialDiagnosisComponent; 