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
import TreatmentsComponent from "./sectional-components/treatments";
import {
  addEditPatientAdvancedDetails,
  addEditPatientBasicDetails,
  addEditPatientOngoingTreatment,
} from "@/services/patient.service";
import { useToast } from "@/hooks/use-toast";
import OngoingTreatmentComponent from "./sectional-components/ongoing-treatment";
import SymptomsDiseases from "./sectional-components/symptoms-diseases";
import ChiefComplaintComponent from "./sectional-components/chief-complaint";
import InvestigationsComponent from "./sectional-components/investigations";
import ProvisionalDiagnosisComponent from "./sectional-components/provisional-diagnosis";
import DifferentialDiagnosisComponent from "./sectional-components/differential-diagnosis";
import FinalDiagnosisComponent from "./sectional-components/final-diagnosis";

import {
  CaseHistorySchema,
  OngoingTreatmentSchema,
  PatientParticularsSchema,
} from "@/schema/patients.schema";
import AppointmentsComponent from "@/components/appointment/appointments-component";

interface AddAndEditPatientComponentProps {
  data: any;
}

const AddAndEditPatientComponent: React.FC<AddAndEditPatientComponentProps> = ({
  data,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("patientParticulars");
  const [patientId, setPatientId] = useState(data?._id || "");
  const { toast } = useToast();

  const caseHistoryForm = useForm<z.infer<typeof CaseHistorySchema>>({
    resolver: zodResolver(CaseHistorySchema),
    defaultValues: {
      id: data?._id || "",
      historyOfMajorIllness: data?.historyOfMajorIllness || "",
      majorDiseases: data?.majorDiseases || [],
      provisionalDiagnosis: data?.provisionalDiagnosis || "",
      differentialDiagnosis: data?.differentialDiagnosis || "",
      finalDiagnosis: data?.finalDiagnosis || "",
      vitalSigns: {
        temperature:
          data?.vitalSigns[data?.vitalSigns?.length - 1]?.temperature ||
          undefined,
        bloodPressure:
          data?.vitalSigns[data?.vitalSigns?.length - 1]?.bloodPressure || "",
        pulseRate:
          data?.vitalSigns[data?.vitalSigns?.length - 1]?.pulseRate ||
          undefined,
        spO2: data?.vitalSigns[data?.vitalSigns?.length - 1]?.spO2 || undefined,
        respiratoryRate:
          data?.vitalSigns[data?.vitalSigns?.length - 1]?.respiratoryRate ||
          undefined,
        date: new Date(),
      },
      pilccod: {
        pallor: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.pallor?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.pallor?.description || "",
        },
        icterus: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.icterus?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.icterus?.description ||
            "",
        },
        lymphadenopathy: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.lymphadenopathy?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.lymphadenopathy
              ?.description || "",
        },
        clubbing: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.clubbing?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.clubbing?.description ||
            "",
        },
        cyanosis: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.cyanosis?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.cyanosis?.description ||
            "",
        },
        oedema: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.oedema?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.oedema?.description || "",
        },
        dehydration: {
          value:
            data?.pilccod[data?.pilccod?.length - 1]?.dehydration?.value ||
            "negative",
          description:
            data?.pilccod[data?.pilccod?.length - 1]?.dehydration
              ?.description || "",
        },
        date:  new Date(),
      },
      additionalHistory: {
        feverHistory:
          data?.additionalHistory[data?.additionalHistory?.length - 1]
            ?.feverHistory || "",
        tuberculosisHistory:
          data?.additionalHistory[data?.additionalHistory?.length - 1]
            ?.tuberculosisHistory || "",
      },
      localExamination: {
        others:
          data?.localExamination[data?.localExamination?.length - 1]?.others ||
          "",
        date:new Date(),
      },
      systemicExamination: {
        inspection:
          data?.systemicExamination[data?.systemicExamination?.length - 1]
            ?.inspection || "",
        palpation:
          data?.systemicExamination[data?.systemicExamination?.length - 1]
            ?.palpation || "",
        percussion:
          data?.systemicExamination[data?.systemicExamination?.length - 1]
            ?.percussion || "",
        auscultation:
          data?.systemicExamination[data?.systemicExamination?.length - 1]
            ?.auscultation || "",
        date:  new Date(),
      },
      otherSystemicExamination: {
        cns: {
          inspection:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cns?.inspection || "",
          palpation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cns?.palpation || "",
          percussion:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cns?.percussion || "",
          auscultation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cns?.auscultation || "",
        },
        renal: {
          inspection:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.renal?.inspection || "",
          palpation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.renal?.palpation || "",
          percussion:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.renal?.percussion || "",
          auscultation:
            data?.otherSystemicExamination?.renal?.auscultation || "",
        },
        gastrointestinal: {
          inspection:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.gastrointestinal?.inspection || "",
          palpation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.gastrointestinal?.palpation || "",
          percussion:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.gastrointestinal?.percussion || "",
          auscultation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.gastrointestinal?.auscultation || "",
        },
        cardiovascular: {
          inspection:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cardiovascular?.inspection || "",
          palpation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cardiovascular?.palpation || "",
          percussion:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cardiovascular?.percussion || "",
          auscultation:
            data?.otherSystemicExamination[
              data?.otherSystemicExamination?.length - 1
            ]?.cardiovascular?.auscultation || "",
        },
        date:new Date(),
      },
      treatmentsAtPreviousHospital: {
        treatmentReceivedAtTimeOfAdmission:
          data?.treatmentReceivedAtPreviousHospital
            ?.treatmentReceivedAtTimeOfAdmission?.[
            data?.treatmentReceivedAtPreviousHospital
              ?.treatmentReceivedAtTimeOfAdmission?.length - 1
          ]?.treatment || "",
        dischargeWithFollowingTreatment:
          data?.treatmentReceivedAtPreviousHospital
            ?.dischargeWithFollowingTreatment[
            data?.treatmentReceivedAtPreviousHospital
              ?.dischargeWithFollowingTreatment?.length - 1
          ]?.treatment || "",
      },
      medicalHistory: {
        historyOfPresentIllness:
          data?.medicalHistory?.historyOfPresentIllness || "",
        pastHistory: data?.medicalHistory?.pastHistory || "",
        personalHistory: data?.medicalHistory?.personalHistory || "",
        familyHistory: data?.medicalHistory?.familyHistory || "",
        historyOfMajorIllness:
          data?.medicalHistory?.historyOfMajorIllness || "",
      },
      investigations: {
        laboratoryAnalysis: data?.investigations[
          data?.investigations?.length - 1
        ]?.laboratoryAnalysis || {
          bodyFluid: {},
          urineAnalysis: "",
          stoolAnalysis: "",
          others: "",
        },
        imaging: data?.investigations[data?.investigations?.length - 1]
          ?.imaging || {
          xray: { report: "", images: [] },
          ct: { report: "", images: [] },
          cect: { report: "", images: [] },
          hrct: { report: "", images: [] },
          mri: { report: "", images: [] },
          hsg: { report: "", images: [] },
          usg: { report: "", images: [] },
          others: { report: "", images: [] },
        },
        biopsy:
          data?.investigations[data?.investigations?.length - 1]?.biopsy || "",
        markers:
          data?.investigations[data?.investigations?.length - 1]?.markers || "",
        date: new Date(),
      },
      chiefComplaint: {
        complaint:
          data?.chiefComplaint[data?.chiefComplaint?.length - 1]?.complaint ||
          "",
        date: new Date(),
      },
    },
  });

  const ongoingTreatmentForm = useForm<z.infer<typeof OngoingTreatmentSchema>>({
    resolver: zodResolver(OngoingTreatmentSchema),
    defaultValues: {
      id: data?._id || "",
      ourPlanOfAction: {
        treatment:
          data?.ourPlanOfAction[data?.ourPlanOfAction?.length - 1]?.treatment ||
          "",
        date:
          data?.ourPlanOfAction[data?.ourPlanOfAction?.length - 1]?.date ||
          new Date(),
      },
      status: data?.status || undefined,
    },
  });

  const patientParticularsForm = useForm<z.infer<typeof PatientParticularsSchema>>({
    resolver: zodResolver(PatientParticularsSchema),
    defaultValues: {
      id: data?._id || "",
      registrationNumber: data?.registrationNumber || "",
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
      symptomsAndDiseases: {
        symptoms: data?.symptomsAndDiseases?.symptoms || [],
        diseases: data?.symptomsAndDiseases?.diseases || [],
      },
    },
  });

  const onSubmitPatientParticulars = async (
    formData: z.infer<typeof PatientParticularsSchema>
  ) => {
    try {
      const response = await addEditPatientBasicDetails(formData);
      if (response) {
        toast({
          title: "Patient Particulars Saved Successfully",
          variant: "default",
        });
        setPatientId(response.patient._id);
        setActiveTab("caseHistory");
        caseHistoryForm.setValue("id", response.patient._id);
      }
    } catch (error) {
      toast({
        title: "Error Saving Patient Particulars",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const onSubmitCaseHistory = async (
    formData: z.infer<typeof CaseHistorySchema>
  ) => {
    try {
      const response = await addEditPatientAdvancedDetails(formData);
      if (response) {
        toast({
          title: "Case History Saved Successfully",
          variant: "default",
        });
        setActiveTab("ongoingTreatment");
      }
    } catch (error) {
      toast({
        title: "Error Saving Case History",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const onSubmitOngoingTreatment = async (
    formData: z.infer<typeof OngoingTreatmentSchema>
  ) => {
    try {
      const response = await addEditPatientOngoingTreatment({
        ...formData,
        id: patientId,
      });

      if (response) {
        toast({
          title: "Ongoing Treatment Saved Successfully",
          variant: "default",
        });
        router.back();
      }
    } catch (error) {
      toast({
        title: "Error Saving Ongoing Treatment",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="patientParticulars">
              Patient Particulars
            </TabsTrigger>
            <TabsTrigger value="caseHistory" disabled={!patientId}>
              Case History
            </TabsTrigger>
            <TabsTrigger value="ongoingTreatment" disabled={!patientId}>
              Ongoing Treatment
            </TabsTrigger>
            <TabsTrigger value="appointments" disabled={!patientId}>
              Appointments
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="patientParticulars">
          <Form {...patientParticularsForm}>
            <form
              onSubmit={patientParticularsForm.handleSubmit(
                onSubmitPatientParticulars
              )}
              className="space-y-8"
            >
              <PersonalDetailsComponent />
              <AddressComponent />
              <SymptomsDiseases />
              <div className="flex gap-3 justify-end mt-5">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Save & Continue</Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="caseHistory">
          <Form {...caseHistoryForm}>
            <form
              onSubmit={caseHistoryForm.handleSubmit(onSubmitCaseHistory)}
              className="space-y-8"
            >
              <ChiefComplaintComponent
                existingComplaints={data?.chiefComplaint || []}
              />
              <MedicalHistoryComponent />
              <GeneralPhysicalExaminationComponent
                existingVitalSigns={data?.vitalSigns || []}
                existingPILCCOD={data?.pilccod || []}
              />
              <LocalExaminationComponent
                existingExaminations={data?.localExamination || []}
              />
              <SystemicExaminationComponent
                existingExaminations={data?.systemicExamination || []}
              />
              <OtherSystemicExaminationComponent
                existingExaminations={data?.otherSystemicExamination || []}
              />
              <ProvisionalDiagnosisComponent />
              <InvestigationsComponent
                existingInvestigations={data?.investigations || []}
              />
              <DifferentialDiagnosisComponent />
              <FinalDiagnosisComponent />
              <TreatmentsComponent />
              <div className="flex gap-3 justify-end mt-5">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveTab("patientParticulars")}
                >
                  Back
                </Button>
                <Button type="submit">Save & Continue</Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="ongoingTreatment">
          <Form {...ongoingTreatmentForm}>
            <form
              onSubmit={ongoingTreatmentForm.handleSubmit(
                onSubmitOngoingTreatment
              )}
              className="space-y-8"
            >
              <OngoingTreatmentComponent
                existingTreatments={data?.ourPlanOfAction || []}
              />
              <div className="flex gap-3 justify-end mt-5">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveTab("caseHistory")}
                >
                  Back
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="appointments">
          <AppointmentsComponent patientId={patientId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddAndEditPatientComponent;
