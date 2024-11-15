export const API ={
    domain: process.env.NEXT_PUBLIC_DOMAIN,

    endPoints: {

        // patient endpoints
        addEditPatientBasicDetails: "/api/v1/patients/addEditPatientBasicDetails",
        addEditPatientAdvancedDetails: "/api/v1/patients/addEditPatientAdvancedDetails",
        getAllPatients:"/api/v1/patients/getAllPatients",
        getPatientsDetails:"/api/v1/patients/getPatientDetailsById",
        deletePatient:"/api/v1/patients/deletePatient",
        addEditPatientOngoingTreatment:"/api/v1/patients/addEditPatientOngoingTreatment",

        // auth endpoints
        login: "/api/v1/auth/login",
    }

}