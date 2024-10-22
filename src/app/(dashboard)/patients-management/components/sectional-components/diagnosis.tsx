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

const DiagnosisComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Diagnosis</h1>

      <div className="flex flex-col gap-6">
        <FormField
          control={control}
          name="provisionalDiagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provisional Diagnosis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter provisional diagnosis"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="differentialDiagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Differential Diagnosis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter differential diagnosis"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="finalDiagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Diagnosis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter final diagnosis"
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

export default DiagnosisComponent;
