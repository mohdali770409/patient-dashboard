import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Droplets, 
  FlaskConical, 
  Microscope,
  MoreHorizontal,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

const LaboratoryAnalysisComponent = () => {
  const { control } = useFormContext();
  const [expandedSection, setExpandedSection] = useState<string>("bodyFl  uid");

  const bodyFluidFields = [
    { name: "bloodAnalysis", label: "Blood Analysis", icon: Droplets },
    { name: "csf", label: "CSF", icon: FlaskConical },
    { name: "asciticFluid", label: "ASCITIC Fluid", icon: FlaskConical },
    { name: "pleuralFluid", label: "PLEURAL Fluid", icon: FlaskConical },
    { name: "amnioticFluid", label: "AMNIOTIC Fluid", icon: FlaskConical },
    { name: "synvonialFluid", label: "SYNVONIAL Fluid", icon: FlaskConical },
    { name: "mucus", label: "MUCUS", icon: Droplets },
    { name: "others", label: "Others", icon: MoreHorizontal },
  ];

  const sections = [
    {
      id: "bodyFluid",
      title: "Body Fluid",
      icon: FlaskConical,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bodyFluidFields.map((field) => {
            const Icon = field.icon;
            return (
              <FormField
                key={field.name}
                control={control}
                name={`investigations.laboratoryAnalysis.bodyFluid.${field.name}`}
                render={({ field: formField }) => (
                  <FormItem className="bg-white rounded-lg p-4 shadow-sm">
                    <FormLabel className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-blue-500" />
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Enter ${field.label.toLowerCase()} details`}
                        className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      ),
    },
    // ... continue with other sections
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expandedSection === section.id;

        return (
          <div
            key={section.id}
            className={cn(
              "rounded-lg border transition-all duration-200",
              isExpanded ? "bg-gray-50" : "bg-white"
            )}
          >
            <button
              type="button"
              className="w-full px-4 py-3 flex items-center justify-between"
              onClick={() => setExpandedSection(isExpanded ? "" : section.id)}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium text-gray-700">{section.title}</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-4">{section.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaboratoryAnalysisComponent;
