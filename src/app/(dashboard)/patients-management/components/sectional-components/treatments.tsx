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
import { GiMedicines as Medicine} from "react-icons/gi";

const TreatmentsComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Medicine className="h-5 w-5" />
          Treatments
        </h1>
      </div>

      <div className="p-6 space-y-6">
        <h2 className="font-medium text-gray-700 mb-4">Treatment Received at Previous Hospital</h2>
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
                    className="min-h-[150px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
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
                    className="min-h-[150px] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
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
