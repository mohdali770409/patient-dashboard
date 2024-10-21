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

const MedicalHistoryComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h2 className="font-semibold mb-3 text-gray-500">Medical History</h2>
      <FormField
        control={control}
        name="historyOfMajorIllness"
        render={({ field }) => (
          <FormItem>
            <FormLabel>History of Major Illness</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter any history of major illness here"
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MedicalHistoryComponent;