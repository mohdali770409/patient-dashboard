"use client";
import React, { useEffect, useState } from "react";

// shadcn imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PersonalDetailsComponent from "./sectional-components/personal-details";
import AddressComponent from "./sectional-components/address-details";
import MedicalHistoryComponent from "./sectional-components/medical-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/multi-select";

interface AddAndEditPatientComponentProps {
  data: any;
}

export const FormSchema = z.object({
  patientId: z.string().optional(),
  tokenNumber: z.string().optional(),
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z.string().optional(),
  phone: z.string().min(10, { message: "Phone Number must be of 10 digits." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address or leave it empty" })
    .or(z.literal("")) // Allow empty string as valid
    .optional(),
  age: z.string(),
  gender: z.string().optional(),
  street: z.string(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z.string(),
  historyOfMajorIllness: z.string().optional(),
  majorDiseases: z.array(z.string()).optional(),
});

const AddAndEditPatientComponent: React.FC<AddAndEditPatientComponentProps> = ({
  data,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditMode, setIsEditMode] = useState(!!data?._id);
  const [disease, setDisease] = useState<any[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: data?._id || "0",
      tokenNumber: data?.token || "0",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phone: data?.phone || "",
      email: data?.email || "",
      age: data?.age || "",
      gender: data?.gender || "",
      street: data?.street || "",
      locality: data?.locality || "",
      city: data?.city || "",
      state: data?.state || "",
      pinCode: data?.pinCode || "",
      historyOfMajorIllness: data?.historyOfMajorIllness || "",
      majorDiseases: data?.majorDiseases || [],
    },
  });

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    console.log("data", formData);
    setIsEditMode(true); // Allow access to advanced tab after submission
  };

  const diseases = [
    "Cancer",
    "Kidney Disease",
    "Diabetes",
    "Arthritis",
    "Musculoskeletal Disease",
  ];

  useEffect(() => {
    setDisease(
      diseases.map((disease) => ({
        value: disease.split(" ").join("").toLowerCase(),
        label: disease,
      }))
    );
  }, []);

  return (
    <div className="">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Details</TabsTrigger>
            <TabsTrigger value="advanced" disabled={!isEditMode}>
              Advanced Details
            </TabsTrigger>
          </TabsList>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <TabsContent value="basic">
              <PersonalDetailsComponent />
              <AddressComponent />
              <MedicalHistoryComponent />
            </TabsContent>

            <TabsContent value="advanced">
              <FormField
                control={form.control}
                name="majorDiseases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major Diseases</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={disease}
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <div className="flex gap-3 justify-end mt-5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddAndEditPatientComponent;
