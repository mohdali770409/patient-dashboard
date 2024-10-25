import React, { useState } from "react";
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
import { 
  TestTube, 
  ScanFace, 
  Microscope, 
  Target,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

const InvestigationsComponent = () => {
  const { control } = useFormContext();
  const [expandedSection, setExpandedSection] = useState<string>("laboratory");

  const sections = [
    {
      id: "laboratory",
      title: "Laboratory Analysis",
      icon: TestTube,
      color: "text-purple-500",
      component: LaboratoryAnalysisComponent
    },
    {
      id: "imaging",
      title: "Imaging",
      icon: ScanFace,
      color: "text-blue-500",
      component: ImagingComponent
    },
    {
      id: "biopsy",
      title: "Biopsy",
      icon: Microscope,
      color: "text-green-500",
      content: (
        <FormField
          control={control}
          name="investigations.biopsy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter biopsy details"
                  className="min-h-[150px] focus:ring-2 focus:ring-green-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
    {
      id: "markers",
      title: "Markers",
      icon: Target,
      color: "text-red-500",
      content: (
        <FormField
          control={control}
          name="investigations.markers"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter markers details"
                  className="min-h-[150px] focus:ring-2 focus:ring-red-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Investigations
        </h1>
      </div>

      <div className="p-6 space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          const Component = section.component;

          return (
            <div
              key={section.id}
              className={cn(
                "rounded-lg border transition-all duration-200",
                isExpanded ? "bg-gray-50 shadow-md" : "bg-white",
                "hover:shadow-lg"
              )}
            >
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => setExpandedSection(isExpanded ? "" : section.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", section.color)} />
                  <h2 className="font-medium text-gray-700">{section.title}</h2>
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
                <div className="p-4">
                  {Component ? <Component /> : section.content}
                </div>
              </div>
            </div>
          )}
        )}
      </div>
    </div>
  );
};

export default InvestigationsComponent;
