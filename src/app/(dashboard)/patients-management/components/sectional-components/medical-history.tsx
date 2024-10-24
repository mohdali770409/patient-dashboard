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

  const historyFields = [
    {
      name: "historyOfPresentIllness",
      label: "History of Present Illness",
      placeholder: "Enter history of present illness"
    },
    {
      name: "pastHistory",
      label: "Past History",
      placeholder: "Enter past medical history"
    },
    {
      name: "personalHistory",
      label: "Personal History",
      placeholder: "Enter personal history"
    },
    {
      name: "familyHistory",
      label: "Family History",
      placeholder: "Enter family history"
    },
    {
      name: "historyOfMajorIllness",
      label: "History of Major Illness",
      placeholder: "Enter history of major illness"
    }
  ];

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">Medical History</h1>

      <div className="space-y-6">
        {historyFields.map((field) => (
          <div key={field.name} className="mb-6">
            <h2 className="font-medium text-gray-400 mb-3">{field.label}</h2>
            <FormField
              control={control}
              name={`medicalHistory.${field.name}`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={field.placeholder}
                      className="min-h-[150px]"
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistoryComponent;
