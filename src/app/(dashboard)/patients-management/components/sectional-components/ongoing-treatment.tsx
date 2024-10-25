import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, ActivitySquare, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "cured", label: "Cured", color: "text-green-500" },
  { value: "defaulter", label: "Defaulter", color: "text-red-500" },
  { value: "improving", label: "Improving", color: "text-blue-500" },
  { value: "relapser", label: "Relapser", color: "text-orange-500" }
];

const OngoingTreatmentComponent = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Ongoing Treatment
        </h1>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
            <FormField
              control={control}
              name="ourPlanOfAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-50">
                      <ClipboardList className="h-4 w-4 text-cyan-500" />
                    </div>
                    <span className="font-medium text-gray-700">Our Plan of Action</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the plan of action..."
                      className={cn(
                        "min-h-[150px]",
                        "border border-gray-300",
                        "focus:ring-2",
                        "focus:ring-cyan-500",
                        "transition-all duration-200"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-50">
                      <ActivitySquare className="h-4 w-4 text-cyan-500" />
                    </div>
                    <span className="font-medium text-gray-700">Status</span>
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-cyan-500">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="flex items-center gap-2"
                        >
                          <span className={option.color}>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingTreatmentComponent;
