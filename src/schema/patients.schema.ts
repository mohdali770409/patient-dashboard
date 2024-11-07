import { z } from "zod";

export const CaseHistorySchema = z.object({
    id: z.string().optional(),
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
      date: z.date().default(() => new Date()),
    }),
    additionalHistory: z.object({
      feverHistory: z.string().optional(),
      tuberculosisHistory: z.string().optional(),
    }),
    localExamination: z.object({
      others: z.string().optional(),
      date: z.date().default(() => new Date()),
    }),
    systemicExamination: z.object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
      date: z.date().default(() => new Date()),
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
      date: z.date().default(() => new Date()),
    }),
    treatmentsAtPreviousHospital: z.object({
      treatmentReceivedAtTimeOfAdmission: z.string().optional(),
      dischargeWithFollowingTreatment: z.string().optional(),
    }),
    medicalHistory: z.object({
      historyOfPresentIllness: z.string().optional(),
      pastHistory: z.string().optional(),
      personalHistory: z.string().optional(),
      familyHistory: z.string().optional(),
      historyOfMajorIllness: z.string().optional(),
    }),
    investigations: z.object({
      laboratoryAnalysis: z.object({
        bodyFluid: z.object({
          bloodAnalysis: z.string().optional(),
          csf: z.string().optional(),
          asciticFluid: z.string().optional(),
          pleuralFluid: z.string().optional(),
          amnioticFluid: z.string().optional(),
          synvonialFluid: z.string().optional(),
          mucus: z.string().optional(),
          others: z.string().optional(),
        }),
        urineAnalysis: z.string().optional(),
        stoolAnalysis: z.string().optional(),
        others: z.string().optional(),
      }),
      imaging: z.object({
        xray: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        ct: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        cect: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        hrct: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        mri: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        hsg: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        usg: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
        others: z.object({
          report: z.string().optional(),
          images: z.array(z.string()).optional(),
        }),
      }),
      biopsy: z.string().optional(),
      markers: z.string().optional(),
      date: z.date().default(() => new Date()),
    }),
    chiefComplaint: z.object({
      complaint: z.string().min(1, { message: "Chief complaint is required" }),
      date: z.date().default(() => new Date()),
    }),
  });
  
  export const OngoingTreatmentSchema = z.object({
    id: z.string().optional(),
    ourPlanOfAction: z.object({
      treatment: z.string().min(1, "Plan of action is required"),
      date: z.date().default(() => new Date()),
    }),
    status: z.enum(["cured", "defaulter", "improving", "relapser"]),
  });
  
  export const PatientParticularsSchema = z.object({
    id: z.string().optional(),
    registrationNumber: z
      .string()
      .min(1, { message: "Registration Number is required." }),
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters." }),
    lastName: z.string().optional(),
    phone: z.string().min(10, { message: "Phone Number must be of 10 digits." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address or leave it empty" })
      .or(z.literal(""))
      .optional(),
    religion: z.string().min(1, { message: "Religion is required." }),
    age: z.string(),
    gender: z.string().optional(),
    street: z.string(),
    locality: z.string(),
    city: z.string(),
    state: z.string(),
    pinCode: z.string(),
    symptomsAndDiseases: z.array(z.string()).min(1, {
      message: "Please select at least one symptom or disease",
    }),
  });