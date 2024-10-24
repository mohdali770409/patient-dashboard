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

const ChiefComplaintComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Chief Complaint</h1>
      
      <FormField
        control={control}
        name="chiefComplaint"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea 
                placeholder="Enter chief complaint" 
                {...field} 
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChiefComplaintComponent;
