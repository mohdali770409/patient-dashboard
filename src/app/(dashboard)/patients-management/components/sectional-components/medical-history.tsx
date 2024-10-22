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
import { MultiSelect } from "@/components/multi-select";

const MedicalHistoryComponent: React.FC = () => {
  const { control } = useFormContext();

  const diseases = [
    "Cancer",
    "Kidney Disease",
    "Diabetes",
    "Arthritis",
    "Musculoskeletal Disease",
  ];

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Medical History</h1>

      <div className="flex flex-col gap-6">
        <FormField
          control={control}
          name="historyOfMajorIllness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>History of Major Illness</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter history of major illness"
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

export default MedicalHistoryComponent;
