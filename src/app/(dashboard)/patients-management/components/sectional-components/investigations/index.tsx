import React from "react";
import LaboratoryAnalysisComponent from "./laboratory-analysis";
import ImagingComponent from "./imaging";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const InvestigationsComponent = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-6 text-gray-500">Investigations</h1>

      <div className="space-y-8">
        {/* Laboratory Analysis Section */}
        <LaboratoryAnalysisComponent />

        {/* Imaging Section */}
        <ImagingComponent />

        {/* Biopsy Section */}
        <div className="space-y-4">
          <h2 className="font-medium text-gray-400 mb-3">Biopsy</h2>
          <FormField
            control={control}
            name="investigations.biopsy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter biopsy details"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Markers Section */}
        <div className="space-y-4">
          <h2 className="font-medium text-gray-400 mb-3">Markers</h2>
          <FormField
            control={control}
            name="investigations.markers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter markers details"
                    className="min-h-[150px]"
                    {...field}
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

export default InvestigationsComponent;
