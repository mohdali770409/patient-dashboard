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

const LocalExaminationComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Local Examination</h1>
      
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
                className="min-h-[200px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LocalExaminationComponent;
