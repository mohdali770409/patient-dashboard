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
import { AlertCircle } from "lucide-react"; // Example icon

const ChiefComplaintComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Chief Complaint
        </h1>
      </div>

      <div className="p-6">
        <FormField
          control={control}
          name="chiefComplaint"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter chief complaint"
                  {...field}
                  className="min-h-[150px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500"
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

export default ChiefComplaintComponent;
