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
import { Eye } from "lucide-react"; // Example icon

const LocalExaminationComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Local Examination
        </h1>
      </div>

      <div className="p-6">
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
