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
      
      <div className="mb-6">
        <h2 className="font-medium text-gray-400 mb-4">Treatment Received at Previous Hospital</h2>
        <div className="space-y-4">
          <FormField
            control={control}
            name="treatmentsAtPreviousHospital.treatmentReceivedAtTimeOfAdmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment Received at Time of Admission</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter treatment received at time of admission" 
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
            name="treatmentsAtPreviousHospital.dischargeWithFollowingTreatment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discharge with Following Treatment</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter discharge treatment details" 
                    {...field} 
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

    </div>
  );
};

export default TreatmentsComponent;
