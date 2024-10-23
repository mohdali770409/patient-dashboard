export const API ={
    domain: process.env.NEXT_PUBLIC_DOMAIN,

    endPoints: {
        addEditPatientBasicDetails: "/api/v1/patients/addEditPatientBasicDetails",
        getAllPatients:"/api/v1/patients/getAllPatients",
        getPatientsDetails:"/api/v1/patients/getPatientDetailsById",
        deletePatient:"/api/v1/patients/deletePatient",
    }

}