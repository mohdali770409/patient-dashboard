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

const bodyFluidFields = [
  { name: "bloodAnalysis", label: "Blood Analysis" },
  { name: "csf", label: "CSF" },
  { name: "asciticFluid", label: "ASCITIC Fluid" },
  { name: "pleuralFluid", label: "PLEURAL Fluid" },
  { name: "amnioticFluid", label: "AMNIOTIC Fluid" },
  { name: "synvonialFluid", label: "SYNVONIAL Fluid" },
  { name: "mucus", label: "MUCUS" },
  { name: "others", label: "Others" },
];

const LaboratoryAnalysisComponent = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="font-medium text-gray-400 mb-4">Laboratory Analysis</h2>

      {/* Body Fluid Section */}
      <div className="ml-4 space-y-6">
        <h3 className="font-medium text-gray-400 mb-3">Body Fluid</h3>
        {bodyFluidFields.map((field) => (
          <FormField
            key={field.name}
            control={control}
            name={`investigations.laboratoryAnalysis.bodyFluid.${field.name}`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Enter ${field.label.toLowerCase()} details`}
                    className="min-h-[100px]"
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      {/* Urine Analysis */}
      <div className="ml-4">
        <h3 className="font-medium text-gray-400 mb-3">Urine Analysis</h3>
        <FormField
          control={control}
          name="investigations.laboratoryAnalysis.urineAnalysis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter urine analysis details"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Stool Analysis */}
      <div className="ml-4">
        <h3 className="font-medium text-gray-400 mb-3">Stool Analysis</h3>
        <FormField
          control={control}
          name="investigations.laboratoryAnalysis.stoolAnalysis"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter stool analysis details"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Others */}
      <div className="ml-4">
        <h3 className="font-medium text-gray-400 mb-3">Others</h3>
        <FormField
          control={control}
          name="investigations.laboratoryAnalysis.others"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter other laboratory analysis details"
                  className="min-h-[100px]"
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

export default LaboratoryAnalysisComponent;
