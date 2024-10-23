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

const TreatmentsComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Treatments</h1>
      
      <FormField
        control={control}
        name="treatments.previousHospitalRecord"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Treatment Record at Previous Hospital</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter treatment record from previous hospital" 
                {...field} 
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="treatments.previousHospitalPlan"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Next Plan of Previous Hospital</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter the next plan from previous hospital" 
                {...field} 
                className="min-h-[150px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="treatments.ourPlanOfAction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Our Plan of Action</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter our plan of action" 
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

export default TreatmentsComponent;
