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

const SymptomsDiseases = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name="symptomsAndDiseases"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Symptoms and Diseases</FormLabel>
            <FormControl>
              <MultiSelect
                options={symptomsAndDiseaseOptions}
                placeholder="Select symptoms and diseases"
                onValueChange={field.onChange}
                defaultValue={field.value}
                maxCount={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SymptomsDiseases;
