import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/multi-select";
import { Stethoscope } from "lucide-react";

const symptomsAndDiseaseOptions = [
  // Symptoms
  { label: "Fever", value: "fever" },
  { label: "Headache", value: "headache" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Nausea", value: "nausea" },
  { label: "Vomiting", value: "vomiting" },
  { label: "Dizziness", value: "dizziness" },
  { label: "Chest Pain", value: "chest_pain" },
  { label: "Shortness of Breath", value: "shortness_of_breath" },
  { label: "Cough", value: "cough" },
  { label: "Itching", value: "itching" },
  { label: "Rash", value: "rash" },
  { label: "Joint Pain", value: "joint_pain" },
  { label: "Muscle Pain", value: "muscle_pain" },
  { label: "Back Pain", value: "back_pain" },
  { label: "Abdominal Pain", value: "abdominal_pain" },
  
  // Diseases
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Heart Disease", value: "heart_disease" },
  { label: "Stroke", value: "stroke" },
  { label: "Cancer", value: "cancer" },
  { label: "Asthma", value: "asthma" },
  { label: "Kidney Disease", value: "kidney_disease" },
  { label: "Liver Disease", value: "liver_disease" },
  { label: "Thyroid Disorder", value: "thyroid_disorder" },
  { label: "Tuberculosis", value: "tuberculosis" },
  { label: "HIV/AIDS", value: "hiv_aids" },
  { label: "Arthritis", value: "arthritis" },
  { label: "Osteoporosis", value: "osteoporosis" },
  { label: "Multiple Sclerosis", value: "multiple_sclerosis" },
  { label: "Epilepsy", value: "epilepsy" },
];

const SymptomsDiseases: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Symptoms and Diseases
        </h1>
      </div>

      <div className="p-6">
        <FormField
          control={control}
          name="symptomsAndDiseases"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-red-50">
                  <Stethoscope className="h-4 w-4 text-red-500" />
                </div>
                Select Symptoms and Diseases
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={symptomsAndDiseaseOptions}
                  placeholder="Select symptoms and diseases"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  maxCount={5}
                  className="focus:ring-2 focus:ring-red-500"
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

export default SymptomsDiseases;
