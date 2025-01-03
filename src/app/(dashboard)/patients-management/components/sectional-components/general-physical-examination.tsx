import React, { useMemo } from "react";
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
import { 
  HeartPulse, 
  Thermometer, 
  Activity,  
  Gauge,
  Droplet,
  Sun,
  Network,
  HandMetal,
  CloudSnow,
  Waves,
  Droplets,
  Calendar
} from "lucide-react";
import { GiLungs as Lungs} from "react-icons/gi";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

const PILCCOD_ITEMS = [
  { 
    name: "pallor",
    icon: Droplet,
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  { 
    name: "icterus",
    icon: Sun,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  { 
    name: "lymphadenopathy",
    icon: Network,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  { 
    name: "clubbing",
    icon: HandMetal,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  { 
    name: "cyanosis",
    icon: CloudSnow,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50"
  },
  { 
    name: "oedema",
    icon: Waves,
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  { 
    name: "dehydration",
    icon: Droplets,
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  }
];

const VITAL_SIGNS = [
  {
    name: "temperature",
    label: "Temperature",
    unit: "°C",
    placeholder: "36.5",
    icon: Thermometer,
    color: "text-red-500",
    bgColor: "bg-red-50",
    type: "number",
    step: "0.1"
  },
  {
    name: "bloodPressure",
    label: "Blood Pressure",
    unit: "mmHg",
    placeholder: "120/80",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    type: "text"
  },
  {
    name: "pulseRate",
    label: "Pulse Rate",
    unit: "bpm",
    placeholder: "72",
    icon: HeartPulse,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    type: "number"
  },
  {
    name: "respiratoryRate",
    label: "Respiratory Rate",
    unit: "breaths/min",
    placeholder: "16",
    icon: Lungs,
    color: "text-green-500",
    bgColor: "bg-green-50",
    type: "number"
  },
  {
    name: "spO2",
    label: "SpO2",
    unit: "%",
    placeholder: "98",
    icon: Gauge,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    type: "number"
  }
];

interface VitalSign {
  temperature?: number;
  bloodPressure?: string;
  pulseRate?: number;
  spO2?: number;
  respiratoryRate?: number;
  date: string;
  _id: string;
}

interface PILCCOD {
  pallor: { value: 'positive' | 'negative'; description?: string };
  icterus: { value: 'positive' | 'negative'; description?: string };
  lymphadenopathy: { value: 'positive' | 'negative'; description?: string };
  clubbing: { value: 'positive' | 'negative'; description?: string };
  cyanosis: { value: 'positive' | 'negative'; description?: string };
  oedema: { value: 'positive' | 'negative'; description?: string };
  dehydration: { value: 'positive' | 'negative'; description?: string };
  date: string;
  _id: string;
}

interface GeneralPhysicalExaminationProps {
  existingVitalSigns?: any[];
  existingPILCCOD?: any[];
}

const GeneralPhysicalExaminationComponent: React.FC<GeneralPhysicalExaminationProps> = ({
  existingVitalSigns = [],
  existingPILCCOD = []
}) => {
  const { control, setValue } = useFormContext();

  // Format dates for vital signs
  const vitalSignsDateOptions = useMemo(() => {
    return existingVitalSigns.map(sign => ({
      value: sign.date,
      label: new Date(sign.date).toLocaleDateString(),
      data: sign
    }));
  }, [existingVitalSigns]);

  // Format dates for PILCCOD
  const pilccodDateOptions = useMemo(() => {
    return existingPILCCOD.map(record => ({
      value: record.date,
      label: new Date(record.date).toLocaleDateString(),
      data: record
    }));
  }, [existingPILCCOD]);

  // Handle vital signs date selection
  const handleVitalSignsDateSelect = (selectedDate: string) => {
    const selectedRecord = existingVitalSigns.find(
      sign => sign.date === selectedDate
    );
    
    if (selectedRecord) {
      setValue("vitalSigns.temperature", selectedRecord.temperature);
      setValue("vitalSigns.bloodPressure", selectedRecord.bloodPressure);
      setValue("vitalSigns.pulseRate", selectedRecord.pulseRate);
      setValue("vitalSigns.spO2", selectedRecord.spO2);
      setValue("vitalSigns.respiratoryRate", selectedRecord.respiratoryRate);
      setValue("vitalSigns.date", new Date(selectedRecord.date));
    }
  };

  // Handle PILCCOD date selection
  const handlePILCCODDateSelect = (selectedDate: string) => {
    const selectedRecord = existingPILCCOD.find(
      record => record.date === selectedDate
    );
    
    if (selectedRecord) {
      PILCCOD_ITEMS.forEach(item => {
        setValue(`pilccod.${item.name}.value`, selectedRecord[item.name].value);
        setValue(`pilccod.${item.name}.description`, selectedRecord[item.name].description);
      });
      setValue("pilccod.date", new Date(selectedRecord.date));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <HeartPulse className="h-5 w-5" />
          General Physical Examination
        </h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Vital Signs Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="font-medium text-gray-700 flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-indigo-500" />
            Vital Signs
          </h2>

          <div className="space-y-4">
            {existingVitalSigns.length > 0 && (
              <div className="mb-4">
                <FormLabel>View Previous Vital Signs</FormLabel>
                <Select onValueChange={handleVitalSignsDateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date to view vital signs" />
                  </SelectTrigger>
                  <SelectContent>
                    {vitalSignsDateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <FormField
              control={control}
              name="vitalSigns.date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VITAL_SIGNS.map((sign) => {
                const Icon = sign.icon;
                return (
                  <FormField
                    key={sign.name}
                    control={control}
                    name={`vitalSigns.${sign.name}`}
                    render={({ field }) => (
                      <FormItem className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
                        <FormLabel className="flex items-center gap-2 mb-3">
                          <div className={cn("p-2 rounded-lg", sign.bgColor)}>
                            <Icon className={cn("h-4 w-4", sign.color)} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{sign.label}</span>
                            <span className="text-xs text-gray-500">({sign.unit})</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={sign.type}
                              step={sign.step}
                              placeholder={sign.placeholder}
                              className={cn(
                                "pl-3 pr-8",
                                "border border-gray-300",
                                "focus:ring-2",
                                "focus:ring-indigo-500",
                                "transition-all duration-200"
                              )}
                              {...field}
                              onChange={(e) => {
                                if (sign.type === "number") {
                                  field.onChange(e.target.value ? parseFloat(e.target.value) : "");
                                } else {
                                  field.onChange(e.target.value);
                                }
                              }}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                              {sign.unit}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* PILCCOD Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="font-medium text-gray-700 flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-indigo-500" />
            PILCCOD
          </h2>

          <div className="space-y-4">
            {existingPILCCOD.length > 0 && (
              <div className="mb-4">
                <FormLabel>View Previous PILCCOD Records</FormLabel>
                <Select onValueChange={handlePILCCODDateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date to view PILCCOD" />
                  </SelectTrigger>
                  <SelectContent>
                    {pilccodDateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <FormField
              control={control}
              name="pilccod.date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILCCOD_ITEMS.map((item) => (
                <PILCCODField 
                  key={item.name} 
                  item={item} 
                  control={control} 
                />
              ))}
            </div>
          </div>
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
    </div>
  );
};

const PILCCODField: React.FC<{ 
  item: { 
    name: string; 
    icon: any; 
    color: string; 
    bgColor: string; 
  }; 
  control: any 
}> = ({ item, control }) => {
  const value = useWatch({
    control,
    name: `pilccod.${item.name}.value`,
  });

  const Icon = item.icon;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <FormField
        control={control}
        name={`pilccod.${item.name}.value`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <span className="capitalize">{item.name}</span>
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="focus:ring-2 focus:ring-indigo-500">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="positive">
                  <span className="text-red-500">Positive</span>
                </SelectItem>
                <SelectItem value="negative">
                  <span className="text-green-500">Negative</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {value === "positive" && (
        <FormField
          control={control}
          name={`pilccod.${item.name}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder={`Describe ${item.name} findings...`} 
                  className={cn(
                    "mt-2 min-h-[80px]",
                    "border border-gray-300",
                    "focus:ring-2",
                    "focus:ring-indigo-500",
                    "transition-all duration-200"
                  )}
                  {...field} 
                />
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
