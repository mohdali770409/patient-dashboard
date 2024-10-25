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
import { 
  Clock, 
  History, 
  User, 
  Users, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const MedicalHistoryComponent: React.FC = () => {
  const { control } = useFormContext();
  const [expandedSection, setExpandedSection] = React.useState<string | null>("historyOfPresentIllness");

  const historyFields = [
    {
      name: "historyOfPresentIllness",
      label: "History of Present Illness",
      placeholder: "Enter history of present illness",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      name: "pastHistory",
      label: "Past History",
      placeholder: "Enter past medical history",
      icon: History,
      color: "text-purple-500"
    },
    {
      name: "personalHistory",
      label: "Personal History",
      placeholder: "Enter personal history",
      icon: User,
      color: "text-green-500"
    },
    {
      name: "familyHistory",
      label: "Family History",
      placeholder: "Enter family history",
      icon: Users,
      color: "text-orange-500"
    },
    {
      name: "historyOfMajorIllness",
      label: "History of Major Illness",
      placeholder: "Enter history of major illness",
      icon: AlertCircle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg">Medical History</h1>
      </div>

      <div className="p-6 space-y-6">
        {historyFields.map((field) => {
          const Icon = field.icon;
          const isExpanded = expandedSection === field.name;

          return (
            <div 
              key={field.name} 
              className={cn(
                "rounded-lg border transition-all duration-200",
                isExpanded ? "bg-gray-50" : "bg-white",
                "hover:shadow-md"
              )}
            >
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => setExpandedSection(isExpanded ? null : field.name)}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", field.color)} />
                  <h2 className="font-medium text-gray-700">{field.label}</h2>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div className={cn(
                "overflow-hidden transition-all duration-200",
                isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="p-4">
                  <FormField
                    control={control}
                    name={`medicalHistory.${field.name}`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={field.placeholder}
                            className={cn(
                              "min-h-[150px] transition-all duration-200",
                              "focus:ring-2 focus:ring-offset-2",
                              `focus:ring-${field.color.split('-')[1]}-500`
                            )}
                            {...formField}
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
        })}
      </div>
    </div>
  );
};

export default MedicalHistoryComponent;
