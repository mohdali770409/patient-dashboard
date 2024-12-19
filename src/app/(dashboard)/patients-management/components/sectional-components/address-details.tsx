import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, Building, Globe, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_COUNTRY = "IN"; // ISO code for India

const ADDRESS_FIELDS = [
  {
    name: "street",
    label: "Street",
    placeholder: "Enter street/village",
    icon: Home,
    required: false,
    type: "input"
  },
  {
    name: "locality",
    label: "Locality",
    placeholder: "Locality",
    icon: MapPin,
    required: true,
    type: "input"
  },
  {
    name: "state",
    label: "State",
    placeholder: "Select State",
    icon: Globe,
    required: true,
    type: "select"
  },
  {
    name: "city",
    label: "City",
    placeholder: "Select City",
    icon: Building,
    required: true,
    type: "select"
  },
  {
    name: "pinCode",
    label: "PIN Code",
    placeholder: "PIN Code",
    icon: Hash,
    required: true,
    type: "input"
  }
];

const AddressComponent: React.FC = () => {
  const { control, watch } = useFormContext();
  const selectedState = watch("state");

  const states = useMemo(() => {
    return State.getStatesOfCountry(DEFAULT_COUNTRY);
  }, []);

  const cities = useMemo(() => {
    return selectedState ? City.getCitiesOfState(DEFAULT_COUNTRY, selectedState) : [];
  }, [selectedState]);

  const getOptionsForField = (fieldName: string) => {
    switch (fieldName) {
      case "state":
        return states.map(state => ({
          value: state.isoCode,
          label: state.name
        }));
      case "city":
        return cities.map(city => ({
          value: city.name,
          label: city.name
        }));
      default:
        return [];
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Address Details
        </h1>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADDRESS_FIELDS.map((field) => (
            <div key={field.name} className={field.name === "pinCode" ? "md:col-span-1" : ""}>
              <FormField
                control={control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className={cn("flex items-center gap-2", field.required && "required")}>
                      <div className="p-2 rounded-lg bg-purple-50">
                        <field.icon className="h-4 w-4 text-purple-500" />
                      </div>
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          value={formField.value}
                        >
                          <SelectTrigger className="focus:ring-2 focus:ring-purple-500">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {getOptionsForField(field.name).map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          className="focus:ring-2 focus:ring-purple-500"
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
