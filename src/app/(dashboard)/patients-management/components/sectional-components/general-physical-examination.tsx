import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PILCCOD_ITEMS = [
  "pallor",
  "icterus",
  "lymphadenopathy",
  "clubbing",
  "cyanosis",
  "oedema",
  "dehydration",
];

const GeneralPhysicalExaminationComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-gray-50 shadow-md px-6 pt-5 pb-10 rounded-md">
      <h1 className="font-semibold mb-3 text-gray-500">General Physical Examination</h1>
      
      {/* Vital Signs Section */}
      <h2 className="font-medium mb-3 text-gray-400">Vital Signs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <FormField
          control={control}
          name="vitalSigns.temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature (°C)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="36.5" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="vitalSigns.bloodPressure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Pressure (mmHg)</FormLabel>
              <FormControl>
                <Input placeholder="120/80" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="vitalSigns.pulseRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pulse Rate (bpm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="72" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="vitalSigns.respiratoryRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Respiratory Rate (breaths/min)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="16" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="vitalSigns.spO2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SpO2 (%)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="98" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* PILCCOD Section */}
      <h2 className="font-medium mb-3 text-gray-400">PILCCOD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PILCCOD_ITEMS.map((item) => (
          <PILCCODField key={item} name={item} control={control} />
        ))}
      </div>

      {/* History of Fever and Tuberculosis */}
      <h2 className="font-medium my-3 text-gray-400">Additional History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="additionalHistory.feverHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>History of Fever</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe fever history" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additionalHistory.tuberculosisHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>History of Tuberculosis</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe tuberculosis history" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const PILCCODField: React.FC<{ name: string; control: any }> = ({ name, control }) => {

    const value = useWatch({
    control,
    name: `pilccod.${name}.value`,
  });

  return (
    <div>
      <FormField
        control={control}
        name={`pilccod.${name}.value`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {value === "positive" && (
        <FormField
          control={control}
          name={`pilccod.${name}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={`Describe ${name}`} {...field} className="mt-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default GeneralPhysicalExaminationComponent;
