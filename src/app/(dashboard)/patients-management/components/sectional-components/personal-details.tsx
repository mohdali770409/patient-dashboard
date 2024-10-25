import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { User, Phone, Mail, Hash, Users, Heart } from "lucide-react";

const PERSONAL_FIELDS = [
  {
    name: "registrationNumber",
    label: "Registration Number",
    placeholder: "Registration Number",
    icon: Hash,
    required: true,
    fullWidth: true
  },
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    icon: User,
    required: true
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    icon: User,
    required: true
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Phone Number",
    icon: Phone,
    required: true
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Choose Gender",
    icon: Users,
    required: true,
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "others", label: "Others" }
    ]
  },
  {
    name: "age",
    label: "Age",
    placeholder: "Enter Age",
    icon: User,
    required: true
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    icon: Mail,
    required: true
  },
  {
    name: "religion",
    label: "Religion",
    placeholder: "Choose Religion",
    icon: Heart,
    required: true,
    type: "select",
    options: [
      { value: "islam", label: "Islam" },
      { value: "hindu", label: "Hindu" },
      { value: "christianity", label: "Christianity" },
      { value: "jew", label: "Jew" },
      { value: "buddhist", label: "Buddhist" },
      { value: "jain", label: "Jain" },
      { value: "others", label: "Others" }
    ]
  }
];

const PersonalDetailsComponent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
        <h1 className="font-semibold text-white text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Patient Particulars
        </h1>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERSONAL_FIELDS.map((field) => (
            <div key={field.name} className={cn(field.fullWidth && "md:col-span-2")}>
              <FormField
                control={control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className={cn("flex items-center gap-2", field.required && "required")}>
                      <div className="p-2 rounded-lg bg-blue-50">
                        <field.icon className="h-4 w-4 text-blue-500" />
                      </div>
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          className="focus:ring-2 focus:ring-blue-500"
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

export default PersonalDetailsComponent;
