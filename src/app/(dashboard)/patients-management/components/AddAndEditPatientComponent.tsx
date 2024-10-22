"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import PersonalDetailsComponent from "./sectional-components/personal-details";
import AddressComponent from "./sectional-components/address-details";
import MedicalHistoryComponent from "./sectional-components/medical-history";
import DiagnosisComponent from "./sectional-components/diagnosis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralPhysicalExaminationComponent from "./sectional-components/general-physical-examination";
import LocalExaminationComponent from "./sectional-components/local-examination";
import SystemicExaminationComponent from "./sectional-components/systemic-examination";
import OtherSystemicExaminationComponent from "./sectional-components/other-systemic-examination";


export const BasicDetailsSchema = z.object({
  registrationNumber: z.string().min(1, { message: "Registration Number is required." }),
  tokenNumber: z.string().optional(),
  firstName: z.string().min(2, { message: "First Name must be at least 2 characters." }),
  lastName: z.string().optional(),
  phone: z.string().min(10, { message: "Phone Number must be of 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address or leave it empty" }).or(z.literal("")).optional(),
  religion: z.string().min(1, { message: "Religion is required." }),
  age: z.string(),
  gender: z.string().optional(),
  street: z.string(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z.string(),
});

export const AdvancedDetailsSchema = z.object({
  historyOfMajorIllness: z.string().optional(),
  majorDiseases: z.array(z.string()).optional(),
  provisionalDiagnosis: z.string().optional(),
  differentialDiagnosis: z.string().optional(),
  finalDiagnosis: z.string().optional(),
  vitalSigns: z.object({
    temperature: z.number().optional(),
    bloodPressure: z.string().optional(),
    pulseRate: z.number().optional(),
    spO2: z.number().optional(),
    respiratoryRate: z.number().optional(),
    date: z.date().default(() => new Date()),
  }),
  pilccod: z.object({
    pallor: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    icterus: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    lymphadenopathy: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    clubbing: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    cyanosis: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    oedema: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
    dehydration: z.object({
      value: z.enum(["positive", "negative"]),
      description: z.string().optional(),
    }),
  }),
  additionalHistory: z.object({
    feverHistory: z.string().optional(),
    tuberculosisHistory: z.string().optional(),
  }),
  localExamination: z.object({
    others: z.string().optional(),
  }),
  systemicExamination: z.object({
    inspection: z.string().optional(),
    palpation: z.string().optional(),
    percussion: z.string().optional(),
    auscultation: z.string().optional(),
  }),
  otherSystemicExamination: z.object({
    cns: z.object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
    }),
    renal: z.object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
    }),
    gastrointestinal: z.object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
    }),
    cardiovascular: z.object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
    }),
  }),
});

interface AddAndEditPatientComponentProps {
  data: any;
}

const AddAndEditPatientComponent: React.FC<AddAndEditPatientComponentProps> = ({
  data,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditMode, setIsEditMode] = useState(!!data?._id);

  const basicForm = useForm<z.infer<typeof BasicDetailsSchema>>({
    resolver: zodResolver(BasicDetailsSchema),
    defaultValues: {
      registrationNumber: data?.registrationNumber || "",
      tokenNumber: data?.token || "0",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phone: data?.phone || "",
      email: data?.email || "",
      religion: data?.religion || "",
      age: data?.age || "",
      gender: data?.gender || "",
      street: data?.street || "",
      locality: data?.locality || "",
      city: data?.city || "",
      state: data?.state || "",
      pinCode: data?.pinCode || "",
    },
  });

  const advancedForm = useForm<z.infer<typeof AdvancedDetailsSchema>>({
    resolver: zodResolver(AdvancedDetailsSchema),
    defaultValues: {
      historyOfMajorIllness: data?.historyOfMajorIllness || "",
      majorDiseases: data?.majorDiseases || [],
      provisionalDiagnosis: data?.provisionalDiagnosis || "",
      differentialDiagnosis: data?.differentialDiagnosis || "",
      finalDiagnosis: data?.finalDiagnosis || "",
      vitalSigns: {
        temperature: data?.vitalSigns?.temperature || undefined,
        bloodPressure: data?.vitalSigns?.bloodPressure || "",
        pulseRate: data?.vitalSigns?.pulseRate || undefined,
        spO2: data?.vitalSigns?.spO2 || undefined,
        respiratoryRate: data?.vitalSigns?.respiratoryRate || undefined,
        date: new Date(),
      },
      pilccod: {
        pallor: {
          value: data?.pilccod?.pallor?.value || "negative",
          description: data?.pilccod?.pallor?.description || "",
        },
        icterus: {
          value: data?.pilccod?.icterus?.value || "negative",
          description: data?.pilccod?.icterus?.description || "",
        },
        lymphadenopathy: {
          value: data?.pilccod?.lymphadenopathy?.value || "negative",
          description: data?.pilccod?.lymphadenopathy?.description || "",
        },
        clubbing: {
          value: data?.pilccod?.clubbing?.value || "negative",
          description: data?.pilccod?.clubbing?.description || "",
        },
        cyanosis: {
          value: data?.pilccod?.cyanosis?.value || "negative",
          description: data?.pilccod?.cyanosis?.description || "",
        },
        oedema: {
          value: data?.pilccod?.oedema?.value || "negative",
          description: data?.pilccod?.oedema?.description || "",
        },
        dehydration: {
          value: data?.pilccod?.dehydration?.value || "negative",
          description: data?.pilccod?.dehydration?.description || "",
        },
      },
      additionalHistory: {
        feverHistory: data?.additionalHistory?.feverHistory || "",
        tuberculosisHistory: data?.additionalHistory?.tuberculosisHistory || "",
      },
      localExamination: {
        others: data?.localExamination?.others || "",
      },
      systemicExamination: {
        inspection: data?.systemicExamination?.inspection || "",
        palpation: data?.systemicExamination?.palpation || "",
        percussion: data?.systemicExamination?.percussion || "",
        auscultation: data?.systemicExamination?.auscultation || "",
      },
      otherSystemicExamination: {
        cns: {
          inspection: data?.otherSystemicExamination?.cns?.inspection || "",
          palpation: data?.otherSystemicExamination?.cns?.palpation || "",
          percussion: data?.otherSystemicExamination?.cns?.percussion || "",
          auscultation: data?.otherSystemicExamination?.cns?.auscultation || "",
        },
        renal: {
          inspection: data?.otherSystemicExamination?.renal?.inspection || "",
          palpation: data?.otherSystemicExamination?.renal?.palpation || "",
          percussion: data?.otherSystemicExamination?.renal?.percussion || "",
          auscultation: data?.otherSystemicExamination?.renal?.auscultation || "",
        },
        gastrointestinal: {
          inspection: data?.otherSystemicExamination?.gastrointestinal?.inspection || "",
          palpation: data?.otherSystemicExamination?.gastrointestinal?.palpation || "",
          percussion: data?.otherSystemicExamination?.gastrointestinal?.percussion || "",
          auscultation: data?.otherSystemicExamination?.gastrointestinal?.auscultation || "",
        },
        cardiovascular: {
          inspection: data?.otherSystemicExamination?.cardiovascular?.inspection || "",
          palpation: data?.otherSystemicExamination?.cardiovascular?.palpation || "",
          percussion: data?.otherSystemicExamination?.cardiovascular?.percussion || "",
          auscultation: data?.otherSystemicExamination?.cardiovascular?.auscultation || "",
        },
      },
    },
  });

  const onSubmitBasic = (formData: z.infer<typeof BasicDetailsSchema>) => {
    console.log("Basic Details:", formData);
    setIsEditMode(true);
    setActiveTab("advanced");
    // Handle basic details submission
  };

  const onSubmitAdvanced = (formData: z.infer<typeof AdvancedDetailsSchema>) => {
    console.log("Advanced Details:", formData);
    // Handle advanced details submission
    // Here, you would typically send this data to your API
    // The API should store the vital signs as a new entry in an array of historical readings
    // Example structure in the database:
    // vitalSignsHistory: [
    //   { temperature: 36.5, bloodPressure: "120/80", pulseRate: 72, spO2: 98, respiratoryRate: 16, date: "2023-04-20T10:30:00Z" },
    //   { temperature: 36.7, bloodPressure: "118/78", pulseRate: 70, spO2: 99, respiratoryRate: 15, date: "2023-04-21T11:15:00Z" },
    // ]
  };

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

        <TabsContent value="basic">
          <Form {...basicForm}>
            <form onSubmit={basicForm.handleSubmit(onSubmitBasic)} className="space-y-8">
              <PersonalDetailsComponent />
              <AddressComponent />
              <div className="flex gap-3 justify-end mt-5">
                <Button type="button" variant="secondary" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save & Continue</Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="advanced">
          <Form {...advancedForm}>
            <form onSubmit={advancedForm.handleSubmit(onSubmitAdvanced)} className="space-y-8">
              <GeneralPhysicalExaminationComponent />
              <LocalExaminationComponent />
              <SystemicExaminationComponent />
              <OtherSystemicExaminationComponent />
              <MedicalHistoryComponent />
              <DiagnosisComponent />
              <div className="flex gap-3 justify-end mt-5">
                <Button type="button" variant="secondary" onClick={() => setActiveTab("basic")}>
                  Back
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddAndEditPatientComponent;
